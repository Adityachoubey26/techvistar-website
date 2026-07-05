import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const TopNavbar = () => {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Overview</p>
          <h1 className="text-xl font-semibold text-slate-900">Content management dashboard</h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500 sm:min-w-[260px]">
            <Search className="h-4 w-4" />
            <Input
              className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
              placeholder="Search sections"
            />
          </label>

          <Button variant="outline" size="sm" className="gap-2">
            <Bell className="h-4 w-4" />
            Alerts
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
