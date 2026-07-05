import { NavLink, useLocation } from "react-router-dom";
import {
  BriefcaseBusiness,
  Contact,
  FileText,
  LayoutDashboard,
  Mail,
  MessageSquareText,
  Package,
  Shapes,
  Sparkles,
  Wrench,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Services", path: "/admin/services", icon: Wrench },
  { label: "Solutions", path: "/admin/solutions", icon: Shapes },
  { label: "Portfolio", path: "/admin/portfolio", icon: Package },
  { label: "FAQs", path: "/admin/faqs", icon: MessageSquareText },
  { label: "Jobs", path: "/admin/jobs", icon: BriefcaseBusiness },
  { label: "Applications", path: "/admin/applications", icon: FileText },
  { label: "Contacts", path: "/admin/contacts", icon: Contact },
  { label: "Newsletter", path: "/admin/newsletter", icon: Mail },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col px-4 py-6">
      <div className="mb-8 px-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
          TechVistar
        </p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">Admin Panel</h2>
        <p className="mt-1 text-sm text-slate-500">Content management workspace</p>
      </div>

      <nav className="space-y-1">
        {navItems.map(({ label, path, icon: Icon }) => {
          const isActive = location.pathname === path;

          return (
            <NavLink
              key={path}
              to={path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            TV
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Operations</p>
            <p className="text-xs text-slate-500">Internal tools</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
          <Sparkles className="h-4 w-4" />
          UI scaffolding ready for API integration
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
