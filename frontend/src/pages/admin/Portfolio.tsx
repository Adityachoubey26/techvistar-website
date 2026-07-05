import { EmptyState } from "@/components/admin/common/EmptyState";
import { PageHeader } from "@/components/admin/common/PageHeader";
import { Toolbar } from "@/components/admin/common/Toolbar";

const Portfolio = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Portfolio"
        description="Maintain featured projects and portfolio highlights."
        actionLabel="Add Project"
      />

      <Toolbar placeholder="Search portfolio" actionLabel="Filter" />

      <EmptyState
        title="No portfolio items yet"
        description="This workspace is structured so portfolio entries can be added without reworking the layout."
        actionLabel="Create entry"
      />
    </div>
  );
};

export default Portfolio;
