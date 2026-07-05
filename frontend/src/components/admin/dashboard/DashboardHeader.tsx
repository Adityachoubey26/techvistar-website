type DashboardHeaderProps = {
  title: string;
  description: string;
};

export const DashboardHeader = ({ title, description }: DashboardHeaderProps) => {
  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  );
};

export default DashboardHeader;
