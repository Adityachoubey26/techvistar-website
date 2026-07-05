import { EmptyState } from "@/components/admin/common/EmptyState";
import { PageHeader } from "@/components/admin/common/PageHeader";
import { Toolbar } from "@/components/admin/common/Toolbar";

const Contacts = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Contacts"
        description="Monitor inquiries and contact form submissions."
        actionLabel="Export"
      />

      <Toolbar placeholder="Search contacts" actionLabel="Filter" />

      <EmptyState
        title="No contacts yet"
        description="This view is structured to support future contact management and filtering workflows."
        actionLabel="Refresh"
      />
    </div>
  );
};

export default Contacts;
