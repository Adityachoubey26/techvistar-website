import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAdminServicesCmsConfig, updateServicesCmsConfig } from '@/services/servicesCmsConfig.service';
import { DEFAULT_SERVICES_CMS_CONFIG, ServicesCmsConfig } from '@/types/servicesCms';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Loader2, LayoutTemplate, Home, PanelRight, ClipboardList } from 'lucide-react';
import { CmsImageField } from '@/components/admin/common/CmsImageField';
import { CmsSectionCard, CmsFieldRow, CmsTwoCol } from '@/components/admin/common/CmsSettingsFields';
import { CmsPageLayout, CmsSectionAnchor } from '@/components/admin/common/CmsPageLayout';

const NAV_SECTIONS = [
  { id: 'landing',      label: 'Landing Page',    icon: LayoutTemplate },
  { id: 'home-section', label: 'Homepage Section', icon: Home          },
  { id: 'sidebar',      label: 'Sidebar Defaults', icon: PanelRight    },
  { id: 'consultation', label: 'Consultation Form', icon: ClipboardList },
];

const ServicesSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<ServicesCmsConfig>(DEFAULT_SERVICES_CMS_CONFIG);
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'servicesCmsConfig'],
    queryFn: getAdminServicesCmsConfig,
  });

  useEffect(() => {
    if (data) {
      setForm({
        landing: { ...DEFAULT_SERVICES_CMS_CONFIG.landing, ...(data.landing || {}) },
        homeSection: { ...DEFAULT_SERVICES_CMS_CONFIG.homeSection, ...(data.homeSection || {}) },
        sidebarDefaults: { ...DEFAULT_SERVICES_CMS_CONFIG.sidebarDefaults, ...(data.sidebarDefaults || {}) },
        consultationDefaults: { ...DEFAULT_SERVICES_CMS_CONFIG.consultationDefaults, ...(data.consultationDefaults || {}) },
      });
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: updateServicesCmsConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'servicesCmsConfig'] });
      queryClient.invalidateQueries({ queryKey: ['servicesCmsConfig'] });
      toast({ title: 'Saved', description: 'Services page settings updated.' });
      setIsDirty(false);
      setLastSaved(new Date());
    },
    onError: (err: Error) => {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    },
  });

  const patch = (section: keyof ServicesCmsConfig, key: string, value: string) => {
    setForm((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
    setIsDirty(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-slate-500">
        <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading settings...
      </div>
    );
  }

  return (
    <CmsPageLayout
      title="Services Page Settings"
      description="Manage the Services landing page, homepage section, and global sidebar / consultation defaults."
      sections={NAV_SECTIONS}
      onSave={() => saveMutation.mutate(form)}
      onDiscard={() => setIsDirty(false)}
      isSaving={saveMutation.isPending}
      isDirty={isDirty}
      lastSaved={lastSaved}
    >
      <CmsSectionAnchor id="landing">
        <CmsSectionCard title="Landing Page" description="Content for the /services landing page including hero and SEO." icon={LayoutTemplate}>
          <CmsTwoCol>
            {(['title', 'subtitle', 'seoTitle', 'offeringsLabel', 'learnMoreLabel'] as const).map((key) => (
              <CmsFieldRow key={key} label={key}>
                <Input
                  value={form.landing[key]}
                  onChange={(e) => patch('landing', key, e.target.value)}
                  className="h-10 rounded-xl border-slate-200 bg-slate-50/50 text-sm"
                />
              </CmsFieldRow>
            ))}
          </CmsTwoCol>
          <CmsFieldRow label="Description">
            <Input
              value={form.landing.description}
              onChange={(e) => patch('landing', 'description', e.target.value)}
              className="h-10 rounded-xl border-slate-200 bg-slate-50/50 text-sm"
            />
          </CmsFieldRow>
          <CmsFieldRow label="SEO Description">
            <Input
              value={form.landing.seoDescription}
              onChange={(e) => patch('landing', 'seoDescription', e.target.value)}
              className="h-10 rounded-xl border-slate-200 bg-slate-50/50 text-sm"
            />
          </CmsFieldRow>
          <CmsImageField
            label="Hero Background Image"
            value={form.landing.backgroundImage}
            onChange={(url) => patch('landing', 'backgroundImage', url)}
          />
        </CmsSectionCard>
      </CmsSectionAnchor>

      <CmsSectionAnchor id="home-section">
        <CmsSectionCard title="Homepage Services Section" description="Text and labels for the Services block on the homepage." icon={Home}>
          <CmsTwoCol>
            {(['tag', 'title', 'highlight', 'viewAllTitle', 'viewAllLinkText'] as const).map((key) => (
              <CmsFieldRow key={key} label={key}>
                <Input
                  value={form.homeSection[key]}
                  onChange={(e) => patch('homeSection', key, e.target.value)}
                  className="h-10 rounded-xl border-slate-200 bg-slate-50/50 text-sm"
                />
              </CmsFieldRow>
            ))}
          </CmsTwoCol>
          <CmsFieldRow label="Description">
            <Input
              value={form.homeSection.description}
              onChange={(e) => patch('homeSection', 'description', e.target.value)}
              className="h-10 rounded-xl border-slate-200 bg-slate-50/50 text-sm"
            />
          </CmsFieldRow>
        </CmsSectionCard>
      </CmsSectionAnchor>

      <CmsSectionAnchor id="sidebar">
        <CmsSectionCard title="Global Sidebar Defaults" description="Default content for service detail page sidebars." icon={PanelRight}>
          <CmsTwoCol>
            {(Object.keys(form.sidebarDefaults) as Array<keyof typeof form.sidebarDefaults>).map((key) => (
              <CmsFieldRow key={key} label={key}>
                <Input
                  value={form.sidebarDefaults[key]}
                  onChange={(e) => patch('sidebarDefaults', key, e.target.value)}
                  className="h-10 rounded-xl border-slate-200 bg-slate-50/50 text-sm"
                />
              </CmsFieldRow>
            ))}
          </CmsTwoCol>
        </CmsSectionCard>
      </CmsSectionAnchor>

      <CmsSectionAnchor id="consultation">
        <CmsSectionCard title="Global Consultation Form Defaults" description="Default labels and placeholder text for the consultation form." icon={ClipboardList}>
          <CmsTwoCol>
            {(Object.keys(form.consultationDefaults) as Array<keyof typeof form.consultationDefaults>).map((key) => (
              <CmsFieldRow key={key} label={key}>
                <Input
                  value={form.consultationDefaults[key]}
                  onChange={(e) => patch('consultationDefaults', key, e.target.value)}
                  className="h-10 rounded-xl border-slate-200 bg-slate-50/50 text-sm"
                />
              </CmsFieldRow>
            ))}
          </CmsTwoCol>
        </CmsSectionCard>
      </CmsSectionAnchor>
    </CmsPageLayout>
  );
};

export default ServicesSettings;
