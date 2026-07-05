import { EmptyState } from "@/components/admin/common/EmptyState";
import { PageHeader } from "@/components/admin/common/PageHeader";
import { Toolbar } from "@/components/admin/common/Toolbar";

const Services = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Services"
        description="Manage service entries for the public website."
        actionLabel="Add Service"
      />

      <Toolbar placeholder="Search services" actionLabel="Filter" />

      <EmptyState
        title="No service items yet"
        description="The services list is ready for future content management workflows and backend integration."
        actionLabel="Create entry"
      />
    </div>
  );
};

export default Services;
