import { EmptyState } from "@/components/admin/common/EmptyState";
import { PageHeader } from "@/components/admin/common/PageHeader";
import { Toolbar } from "@/components/admin/common/Toolbar";

const Newsletter = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Newsletter"
        description="Manage newsletter audience and campaign content placeholders."
        actionLabel="Create Campaign"
      />

      <Toolbar placeholder="Search subscribers" actionLabel="Filter" />

      <EmptyState
        title="No newsletter content"
        description="This section is ready for future email list management and campaign UI integration."
        actionLabel="Create entry"
      />
    </div>
  );
};

export default Newsletter;
