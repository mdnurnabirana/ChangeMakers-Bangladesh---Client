import { useState } from "react";
import { Outlet } from "react-router";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-text">
      <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? "sm:ml-64" : "sm:ml-20"
        }`}
      >
        <Topbar setIsSidebarOpen={setIsSidebarOpen} />

        <main className="p-4 sm:p-6">
          <div className="min-h-[calc(100vh-88px)] bg-primary/10 rounded-xl p-4 sm:p-6 shadow-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;