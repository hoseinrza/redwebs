"use client";

import { useState } from "react";
import AdminSidebar, { AdminTab } from "./AdminSidebar";
import AdminTopBar from "./AdminTopBar";
import AdminDashboardScreen from "./screens/AdminDashboardScreen";
import AdminSprintsScreen from "./screens/AdminSprintsScreen";
import AdminServersScreen from "./screens/AdminServersScreen";
import AdminClientsScreen from "./screens/AdminClientsScreen";
import AdminFinanceScreen from "./screens/AdminFinanceScreen";
import AdminTeamScreen from "./screens/AdminTeamScreen";
import AdminLogsScreen from "./screens/AdminLogsScreen";
import AdminSettingsScreen from "./screens/AdminSettingsScreen";
import NewTaskModal from "./modals/NewTaskModal";
import NewClientModal from "./modals/NewClientModal";
import DeployModal from "./modals/DeployModal";
import { devTasks as initialDevTasks, clientAccounts as initialClientAccounts, DevTask, ClientAccount } from "@/lib/data/admin";

export default function AdminShell() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState("Super Admin (CTO)");

  // State for interactive tasks and clients
  const [tasks, setTasks] = useState<DevTask[]>(initialDevTasks);
  const [clients, setClients] = useState<ClientAccount[]>(initialClientAccounts);

  // Modals state
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [deployModalData, setDeployModalData] = useState<{
    isOpen: boolean;
    serverName: string;
    env: "production" | "staging" | "edge";
  }>({
    isOpen: false,
    serverName: "redwebs-prod-k8s-cluster-01",
    env: "production",
  });

  function handleAddTask(newTask: DevTask) {
    setTasks([newTask, ...tasks]);
  }

  function handleUpdateTaskStatus(taskId: string, newStatus: DevTask["status"]) {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  }

  function handleAddClient(newClient: ClientAccount) {
    setClients([newClient, ...clients]);
  }

  function openDeployModal(serverName = "redwebs-prod-k8s-cluster-01", env: "production" | "staging" | "edge" = "production") {
    setDeployModalData({
      isOpen: true,
      serverName,
      env,
    });
  }

  return (
    <div dir="rtl" className="flex min-h-screen bg-ink-50 text-ink-900 font-sans">
      {/* Admin Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onNavigate={setActiveTab}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentRole={currentRole}
        onChangeRole={setCurrentRole}
      />

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopBar
          activeTab={activeTab}
          onMenuClick={() => setSidebarOpen(true)}
          onOpenDeployModal={() => openDeployModal()}
          onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
          currentRole={currentRole}
        />

        <main className="flex-1">
          {activeTab === "dashboard" && (
            <AdminDashboardScreen
              onNavigate={(tab) => setActiveTab(tab as AdminTab)}
              onOpenDeployModal={openDeployModal}
              onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
            />
          )}

          {activeTab === "sprints" && (
            <AdminSprintsScreen
              onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
              tasks={tasks}
              onUpdateTaskStatus={handleUpdateTaskStatus}
            />
          )}

          {activeTab === "servers" && (
            <AdminServersScreen onOpenDeployModal={openDeployModal} />
          )}

          {activeTab === "clients" && (
            <AdminClientsScreen
              onOpenNewClientModal={() => setIsNewClientModalOpen(true)}
              clients={clients}
            />
          )}

          {activeTab === "finance" && <AdminFinanceScreen />}

          {activeTab === "team" && <AdminTeamScreen />}

          {activeTab === "logs" && <AdminLogsScreen />}

          {activeTab === "settings" && <AdminSettingsScreen />}
        </main>
      </div>

      {/* Global Modals */}
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        onAddTask={handleAddTask}
      />

      <NewClientModal
        isOpen={isNewClientModalOpen}
        onClose={() => setIsNewClientModalOpen(false)}
        onAddClient={handleAddClient}
      />

      <DeployModal
        isOpen={deployModalData.isOpen}
        serverName={deployModalData.serverName}
        environment={deployModalData.env}
        onClose={() => setDeployModalData((prev) => ({ ...prev, isOpen: false }))}
        onDeployCompleted={() => {
          // deployment finished
        }}
      />
    </div>
  );
}
