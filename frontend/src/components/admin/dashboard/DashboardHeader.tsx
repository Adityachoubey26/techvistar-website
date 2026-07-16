import { motion } from "framer-motion";
import { Bell, Calendar, Download, RefreshCw, Search, Sun } from "lucide-react";
import { format } from "date-fns";

type DashboardHeaderProps = {
  title?: string;
  description?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
};

export const DashboardHeader = ({
  title = "Dashboard",
  description = "Welcome back, Admin! Here's what's happening with your platform today.",
  onRefresh,
  isRefreshing,
}: DashboardHeaderProps) => {
  const currentDate = format(new Date(), "MMM dd, yyyy");
  const lastSync = format(new Date(), "hh:mm a");

  return (
    <div className="w-full space-y-4">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
        {/* Left Side: Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-xl font-bold tracking-tight text-slate-800 font-sans">{title}</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">{description}</p>
        </motion.div>

        {/* Right Side: Header Actions (Date, Search, Bell, Theme, Avatar) */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="flex flex-wrap items-center gap-2 sm:gap-2.5"
        >
          {/* Date range selection badge */}
          <div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Jul 10, 2026 - Jul 16, 2026</span>
          </div>

          {/* Search Button */}
          <button
            type="button"
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notifications Bell with count */}
          <button
            type="button"
            className="relative p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 border border-white text-[8px] font-bold text-white shadow-sm">
              9
            </span>
          </button>

          {/* Theme Selector (Sun icon) */}
          <button
            type="button"
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
            aria-label="Toggle theme"
          >
            <Sun className="w-4 h-4" />
          </button>

          {/* User Profile Avatar */}
          <div className="h-8 w-8 rounded-full border border-slate-200 bg-slate-100 shadow-sm overflow-hidden flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-slate-500 uppercase">AD</span>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons Row (Export & Refresh) */}
      <div className="flex items-center justify-end gap-2.5 pt-1">
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex h-8.5 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 shadow-sm hover:bg-slate-50 transition"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-slate-400 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Sync</span>
          </button>
        )}
        
        <button
          type="button"
          className="inline-flex h-8.5 items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 text-xs font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-emerald-700 transition"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Export Report</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
