import { EmptyState } from "@/components/admin/common/EmptyState";
import { PageHeader } from "@/components/admin/common/PageHeader";
import { Toolbar } from "@/components/admin/common/Toolbar";

const Solutions = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Solutions"
        description="Review and organize solution pages for the company website."
        actionLabel="Add Solution"
      />

      <Toolbar placeholder="Search solutions" actionLabel="Filter" />

      <EmptyState
        title="No solutions configured"
        description="This section is prepared for future content entry and API-backed listing."
        actionLabel="Create entry"
      />
    </div>
  );
};

export default Solutions;
