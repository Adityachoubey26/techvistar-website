import { EmptyState } from "@/components/admin/common/EmptyState";
import { PageHeader } from "@/components/admin/common/PageHeader";
import { Toolbar } from "@/components/admin/common/Toolbar";

const Applications = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Applications"
        description="Review incoming applications in a structured workspace."
        actionLabel="Export"
      />

      <Toolbar placeholder="Search applications" actionLabel="Filter" />

      <EmptyState
        title="No application data"
        description="This screen is prepared for future application review flows and API-backed lists."
        actionLabel="Refresh"
      />
    </div>
  );
};

export default Applications;
