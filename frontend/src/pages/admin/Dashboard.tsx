import { DashboardHeader } from "@/components/admin/dashboard/DashboardHeader";
import { StatsCard } from "@/components/admin/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const dashboardStats = [
  { title: "Services", value: "08", description: "Published service entries" },
  { title: "Solutions", value: "12", description: "Solution areas listed" },
  { title: "Portfolio", value: "24", description: "Projects in showcase" },
  { title: "FAQs", value: "16", description: "Frequently asked questions" },
  { title: "Jobs", value: "06", description: "Open positions" },
  { title: "Applications", value: "43", description: "Pending review" },
  { title: "Contacts", value: "19", description: "New inquiries" },
  { title: "Newsletter", value: "1.2K", description: "Active subscribers" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Dashboard"
        description="A structured overview for internal content operations."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((item) => (
          <StatsCard key={item.title} {...item} />
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
