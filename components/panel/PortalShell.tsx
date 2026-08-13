"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/panel/Sidebar";
import TopBar from "@/components/panel/TopBar";
import { PortalScreen } from "@/components/panel/types";
import DashboardScreen from "@/components/panel/screens/DashboardScreen";
import ProjectsScreen from "@/components/panel/screens/ProjectsScreen";
import ProjectDetailScreen from "@/components/panel/screens/ProjectDetailScreen";
import MessagesScreen from "@/components/panel/screens/MessagesScreen";
import InvoicesScreen from "@/components/panel/screens/InvoicesScreen";
import FilesScreen from "@/components/panel/screens/FilesScreen";
import NotificationsScreen from "@/components/panel/screens/NotificationsScreen";
import SettingsScreen from "@/components/panel/screens/SettingsScreen";

const DEFAULT_CLIENT = { name: "آرمان محمدی", email: "arman@example.com", phone: "۰۹۱۲ ۳۴۵ ۶۷۸۹" };
const UNREAD_COUNT = 5;

export default function PortalShell() {
  const [screen, setScreen] = useState<PortalScreen>("dashboard");
  const [detailId, setDetailId] = useState("aramesh");
  const [client, setClient] = useState(DEFAULT_CLIENT);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("redwebs-customer");
      if (raw) {
        const customer = JSON.parse(raw) as { name?: string; email?: string; phone?: string };
        setClient((prev) => ({
          name: customer.name || prev.name,
          email: customer.email || prev.email,
          phone: customer.phone || prev.phone,
        }));
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  function openProject(id: string) {
    setDetailId(id);
    setScreen("detail");
  }

  return (
    <div dir="rtl" className="flex min-h-screen bg-ink-50 text-ink-900">
      <Sidebar
        active={screen}
        onNavigate={setScreen}
        unreadCount={UNREAD_COUNT}
        clientName={client.name}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          screen={screen}
          onNewProject={() => setScreen("projects")}
          onNotificationsClick={() => setScreen("notifications")}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {screen === "dashboard" && (
          <DashboardScreen
            onOpenProject={openProject}
            onGoProjects={() => setScreen("projects")}
            onGoInvoices={() => setScreen("invoices")}
          />
        )}
        {screen === "projects" && <ProjectsScreen onOpenProject={openProject} />}
        {screen === "detail" && (
          <ProjectDetailScreen projectId={detailId} onBack={() => setScreen("projects")} />
        )}
        {screen === "messages" && <MessagesScreen />}
        {screen === "invoices" && <InvoicesScreen />}
        {screen === "files" && <FilesScreen />}
        {screen === "notifications" && <NotificationsScreen />}
        {screen === "settings" && <SettingsScreen client={client} />}
      </div>
    </div>
  );
}
