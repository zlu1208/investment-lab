"use client";

import { useState } from "react";
import Card from "@/app/components/Card";

export default function Settings() {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    currency: "USD",
    theme: "dark",
    notifications: true,
    apiKey: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
    console.log("Saved settings:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Manage your account and application preferences
        </p>
      </div>

      {/* Account Settings */}
      <Card>
        <h2 className="text-lg font-semibold text-black dark:text-white mb-6">
          Account Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </Card>

      {/* Preferences */}
      <Card>
        <h2 className="text-lg font-semibold text-black dark:text-white mb-6">
          Preferences
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Currency
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>JPY</option>
              <option>CAD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Theme
            </label>
            <select
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
              className="w-4 h-4 rounded border-zinc-300"
            />
            <label className="ml-3 text-sm font-medium text-black dark:text-white">
              Enable email notifications for portfolio updates
            </label>
          </div>
        </div>
      </Card>

      {/* API Configuration */}
      <Card>
        <h2 className="text-lg font-semibold text-black dark:text-white mb-6">
          API Configuration
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Add your API keys for data providers
          </p>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Market Data API Key
            </label>
            <input
              type="password"
              name="apiKey"
              value={formData.apiKey}
              onChange={handleChange}
              placeholder="Enter your API key"
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
              Your API key is encrypted and stored securely
            </p>
          </div>
        </div>
      </Card>

      {/* Data Management */}
      <Card>
        <h2 className="text-lg font-semibold text-black dark:text-white mb-6">
          Data Management
        </h2>
        <div className="space-y-3">
          <button className="w-full px-4 py-2 text-left border border-zinc-300 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition">
            <span className="font-medium text-black dark:text-white">
              📥 Export Portfolio Data
            </span>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              Download your portfolio as CSV
            </p>
          </button>
          <button className="w-full px-4 py-2 text-left border border-zinc-300 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition">
            <span className="font-medium text-black dark:text-white">
              🔄 Sync with Exchange
            </span>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              Connect your broker account
            </p>
          </button>
          <button className="w-full px-4 py-2 text-left border border-red-300 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition">
            <span className="font-medium text-red-600 dark:text-red-400">
              🗑️ Delete All Data
            </span>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              Permanently remove all data (cannot be undone)
            </p>
          </button>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Save Settings
        </button>
        <button className="px-6 py-2 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition font-medium">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}
