import { EmptyState } from "@/components/admin/common/EmptyState";
import { PageHeader } from "@/components/admin/common/PageHeader";
import { Toolbar } from "@/components/admin/common/Toolbar";

const Jobs = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Jobs"
        description="Coordinate current openings and internal career content."
        actionLabel="Add Job"
      />

      <Toolbar placeholder="Search jobs" actionLabel="Filter" />

      <EmptyState
        title="No jobs listed"
        description="This page is ready for future job management workflows and list views."
        actionLabel="Create entry"
      />
    </div>
  );
};

export default Jobs;
