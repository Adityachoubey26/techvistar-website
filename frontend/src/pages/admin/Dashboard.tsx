import { DashboardHeader } from "@/components/admin/dashboard/DashboardHeader";
import { StatsCard } from "@/components/admin/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Wrench,
  Shapes,
  Package,
  MessageSquareText,
  BriefcaseBusiness,
  FileText,
  Contact,
  Mail,
} from "lucide-react";

const dashboardStats = [
  { title: "Services", value: "08", description: "Published service entries", icon: Wrench },
  { title: "Solutions", value: "12", description: "Solution areas listed", icon: Shapes },
  { title: "Portfolio", value: "24", description: "Projects in showcase", icon: Package },
  { title: "FAQs", value: "16", description: "Frequently asked questions", icon: MessageSquareText },
  { title: "Jobs", value: "06", description: "Open positions", icon: BriefcaseBusiness },
  { title: "Applications", value: "43", description: "Pending review", icon: FileText },
  { title: "Contacts", value: "19", description: "New inquiries", icon: Contact },
  { title: "Newsletter", value: "1.2K", description: "Active subscribers", icon: Mail },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Dashboard"
        description="A structured overview for internal content operations."
      />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((item) => (
          <StatsCard key={item.title} title={item.title} value={item.value} description={item.description} Icon={item.icon} />
        ))}
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-slate-900">Recent activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            Placeholder section for upcoming integration with backend analytics and activity feeds.
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            This dashboard is prepared for future React Query and API wiring.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
