import { EmptyState } from "@/components/admin/common/EmptyState";
import { PageHeader } from "@/components/admin/common/PageHeader";
import { Toolbar } from "@/components/admin/common/Toolbar";

const FAQs = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="FAQs"
        description="Manage support content and recurring questions."
        actionLabel="Add FAQ"
      />

      <Toolbar placeholder="Search FAQs" actionLabel="Filter" />

      <EmptyState
        title="No FAQs available"
        description="The FAQ workspace is organized for future bulk editing and API-backed content loading."
        actionLabel="Create entry"
      />
    </div>
  );
};

export default FAQs;
