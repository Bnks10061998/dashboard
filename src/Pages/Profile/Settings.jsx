import React from "react";
import { Bell, Lock, User, Shield, Settings as SettingsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const settingsOptions = [
    {
      icon: <User className="w-5 h-5" />,
      label: "Account",
      description: "Manage your profile and personal info",
      onClick: () => navigate("/personal-details"),
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: "Notifications",
      description: "Control push and email notifications",
      onClick: () => alert("Go to Notifications Settings"),
    },
    {
      icon: <Shield className="w-5 h-5" />,
      label: "Privacy",
      description: "Adjust your privacy settings",
      onClick: () => alert("Go to Privacy Settings"),
    },
    {
      icon: <Lock className="w-5 h-5" />,
      label: "Security",
      description: "Update password and secure your account",
      onClick: () => alert("Go to Security Settings"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex items-center mb-6">
          <SettingsIcon className="w-6 h-6 text-blue-600 mr-2" />
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>

        <div className="space-y-4">
          {settingsOptions.map((option, idx) => (
            <div
              key={idx}
              onClick={option.onClick}
              className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition"
            >
              <div className="mt-1 text-blue-600">{option.icon}</div>
              <div>
                <p className="font-medium text-gray-800">{option.label}</p>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
