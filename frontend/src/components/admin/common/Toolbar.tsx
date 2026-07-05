import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ToolbarProps = {
  placeholder?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const Toolbar = ({ placeholder = "Search", actionLabel, onAction }: ToolbarProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500 sm:min-w-[260px]">
        <Search className="h-4 w-4" />
        <Input
          className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
          placeholder={placeholder}
        />
      </label>

      {actionLabel ? (
        <Button onClick={onAction} size="sm">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
};

export default Toolbar;
