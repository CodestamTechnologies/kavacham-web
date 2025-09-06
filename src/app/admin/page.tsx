"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AstrologerManagement from "@/components/admin/AstrologerManagement";
import UserManagement from "@/components/admin/UserManagement";
import "./admin.css";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "astrologers":
        return <AstrologerManagement />;
      case "users":
        return <UserManagement />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 lg:ml-64">
          <div className="p-4 pt-20 lg:p-8 lg:pt-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}