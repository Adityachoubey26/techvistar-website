import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import { useState } from "react";

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="h-full border-r border-slate-200 bg-white">
            <Sidebar />
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {mobileOpen ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-80 overflow-y-auto bg-white p-4 shadow-lg">
              <Sidebar />
            </div>
          </div>
        ) : null}

        <div className="flex min-h-screen flex-1 flex-col">
          <TopNavbar onOpenSidebar={() => setMobileOpen(true)} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
