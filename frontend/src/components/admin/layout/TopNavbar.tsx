import { Bell, Search, Menu, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getCurrentAdmin, logoutAdmin } from "@/services/auth.service";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import logo from "../../../assets/logo.webp";
import { useState } from "react";

type TopNavbarProps = {
  onOpenSidebar?: () => void;
};

export const TopNavbar = ({ onOpenSidebar }: TopNavbarProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data } = useQuery({ queryKey: ["auth", "me"], queryFn: getCurrentAdmin, retry: false, staleTime: 300000 });
  const [search, setSearch] = useState("");

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      toast({ title: "Logged out", description: "You have been signed out.", });
      navigate("/admin/login", { replace: true });
    } catch {
      toast({ title: "Logout failed", description: "Please try again." });
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button className="lg:hidden" onClick={onOpenSidebar} aria-label="Open sidebar">
            <Menu className="h-6 w-6 text-slate-700" />
          </button>
          <img src={logo} alt="TechVistar" className="h-9 w-9 rounded-full object-cover ring-2 ring-emerald-500/10" />
          <div>
            <p className="text-sm font-medium text-slate-500">Admin Portal</p>
            <h1 className="text-lg font-semibold text-slate-900">Content operations</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500">
              <Search className="h-4 w-4" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                placeholder="Search"
              />
            </label>
          </div>

          <button className="hidden items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:shadow" title="Notifications">
            <Bell className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3 rounded-md bg-white px-3 py-2 shadow-sm">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-900">{data?.name ?? "Admin User"}</span>
              <span className="text-xs text-slate-500">{data?.email ?? "admin@techvistar.com"}</span>
            </div>
            <div className="h-9 w-9 flex-shrink-0">
              <div className="h-9 w-9 overflow-hidden rounded-full border border-slate-100">
                <img src={logo} alt="avatar" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
