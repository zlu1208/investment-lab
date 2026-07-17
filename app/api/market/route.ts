import { NextResponse } from "next/server";

function normalizeAlphaVantage(data: Record<string, unknown>) {
  const quote = data["Global Quote"] as Record<string, string> | undefined;
  if (!quote) return null;

  const price = Number(quote["05. price"] ?? quote.price ?? 0);
  const change = Number(quote["09. change"] ?? quote.change ?? 0);
  const changePercent = Number(
    String(quote["10. change percent"] ?? quote.changePercent ?? "0").replace("%", "")
  );

  return {
    symbol: quote["01. symbol"] ?? "",
    price,
    change,
    changePercent,
    source: "alpha-vantage",
  };
}

function normalizeYahoo(data: Record<string, unknown>) {
  const result = (data as Record<string, unknown>).chart as Record<string, unknown> | undefined;
  const first = Array.isArray(result?.result) ? result.result[0] : null;
  if (!first) return null;

  const meta = (first as Record<string, unknown>).meta as Record<string, unknown> | undefined;
  const price = Number(meta?.regularMarketPrice ?? 0);
  const change = Number(meta?.regularMarketChange ?? 0);
  const changePercent = Number(meta?.regularMarketChangePercent ?? 0);

  return {
    symbol: String(meta?.symbol ?? ""),
    price,
    change,
    changePercent,
    source: "yahoo-finance",
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get("symbol");

    if (!symbol) {
      return NextResponse.json({ error: "Missing symbol parameter" }, { status: 400 });
    }

    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    if (apiKey) {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(
        symbol
      )}&apikey=${encodeURIComponent(apiKey)}`;

      const resp = await fetch(url);
      if (resp.ok) {
        const data = await resp.json();
        const normalized = normalizeAlphaVantage(data as Record<string, unknown>);
        if (normalized) {
          return NextResponse.json(normalized);
        }
      }
    }

    const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1d&interval=1d`;
    const yahooResp = await fetch(yahooUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    });

    if (!yahooResp.ok) {
      return NextResponse.json({ error: "Failed to fetch market data" }, { status: yahooResp.status });
    }

    const yahooData = await yahooResp.json();
    const normalized = normalizeYahoo(yahooData as Record<string, unknown>);
    if (!normalized) {
      return NextResponse.json({ error: "No quote data returned" }, { status: 404 });
    }

    return NextResponse.json(normalized);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
