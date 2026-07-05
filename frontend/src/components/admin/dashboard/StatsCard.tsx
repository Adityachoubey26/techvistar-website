import type { LucideIcon } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string;
  description: string;
  Icon?: LucideIcon;
};

export const StatsCard = ({ title, value, description, Icon }: StatsCardProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        </div>

        {Icon ? (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <Icon className="h-6 w-6" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StatsCard;
