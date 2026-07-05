import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DataTableProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export const DataTable = ({ title, description, children }: DataTableProps) => {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-slate-900">{title}</CardTitle>
        <p className="text-sm text-slate-500">{description}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default DataTable;
