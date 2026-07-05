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
import logo from "../../../assets/logo.webp";

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
      <div className="mb-6 px-2">
        <div className="flex items-center gap-3">
          <img src={logo} alt="TechVistar" className="h-11 w-11 rounded-full object-cover ring-2 ring-emerald-500/10" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">TechVistar</p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900">Admin Portal</h2>
            <p className="mt-1 text-xs text-slate-500">Content management</p>
          </div>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map(({ label, path, icon: Icon }) => {
          const isActive = location.pathname === path;

          return (
            <NavLink
              key={path}
              to={path}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-emerald-500/10 text-emerald-700 shadow-inner"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:shadow"
              }`}>
              <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span>{label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-slate-100 bg-slate-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
            TV
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Operations</p>
            <p className="text-xs text-slate-500">Internal tools</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
          <Sparkles className="h-4 w-4 text-emerald-500" />
          UI scaffolding ready for API integration
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
