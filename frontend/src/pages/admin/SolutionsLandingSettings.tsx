import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { SeoManager } from '@/components/admin/common/SeoManager';
import { CmsImageField } from '@/components/admin/common/CmsImageField';
import { CmsSectionCard, CmsTextFields } from '@/components/admin/common/CmsSettingsFields';
import { CmsPageLayout, CmsSectionAnchor } from '@/components/admin/common/CmsPageLayout';
import { usePagesCmsSettings } from '@/hooks/usePagesCmsSettings';
import { seoFromItem } from '@/lib/seoAdmin';
import { Image, AlignLeft, Megaphone, Search } from 'lucide-react';

const NAV_SECTIONS = [
  { id: 'hero',  label: 'Hero',    icon: Image     },
  { id: 'intro', label: 'Intro',   icon: AlignLeft },
  { id: 'cta',   label: 'CTA',     icon: Megaphone },
  { id: 'seo',   label: 'SEO',     icon: Search    },
];

const SolutionsLandingSettings = () => {
  const { form, setForm, isLoading, save, isSaving } = usePagesCmsSettings('solutionsLanding');
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-slate-500">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Loading settings...
      </div>
    );
  }

  const patch = (section: 'hero' | 'intro' | 'cta', key: string, value: string) => {
    setForm((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    await save();
    setIsDirty(false);
    setLastSaved(new Date());
  };

  return (
    <CmsPageLayout
      title="Solutions Landing CMS"
      description="Manage Solutions listing page hero, intro, CTA, and SEO. Featured solutions come from the Solutions CRUD."
      sections={NAV_SECTIONS}
      onSave={handleSave}
      onDiscard={() => setIsDirty(false)}
      isSaving={isSaving}
      isDirty={isDirty}
      lastSaved={lastSaved}
    >
      <CmsSectionAnchor id="hero">
        <CmsSectionCard title="Hero" description="Headline and background image for the Solutions landing page." icon={Image}>
          <CmsTextFields
            twoColumn
            fields={[
              { key: 'eyebrow', label: 'Eyebrow' },
              { key: 'title', label: 'Title' },
              { key: 'description', label: 'Description', type: 'textarea', fullWidth: true },
            ]}
            values={form.hero as unknown as Record<string, string>}
            onChange={(k, v) => patch('hero', k, v)}
          />
          <CmsImageField label="Hero background" value={form.hero.backgroundImage || ''} onChange={(url) => patch('hero', 'backgroundImage', url)} />
        </CmsSectionCard>
      </CmsSectionAnchor>

      <CmsSectionAnchor id="intro">
        <CmsSectionCard title="Intro" description="Introduction section below the hero." icon={AlignLeft}>
          <CmsTextFields
            fields={[
              { key: 'title', label: 'Title' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ]}
            values={form.intro as unknown as Record<string, string>}
            onChange={(k, v) => patch('intro', k, v)}
          />
        </CmsSectionCard>
      </CmsSectionAnchor>

      <CmsSectionAnchor id="cta">
        <CmsSectionCard title="CTA" description="Call-to-action block at the bottom of the Solutions page." icon={Megaphone}>
          <CmsTextFields
            twoColumn
            fields={[
              { key: 'title', label: 'Title' },
              { key: 'buttonText', label: 'Button Text' },
              { key: 'description', label: 'Description', type: 'textarea', fullWidth: true },
              { key: 'buttonLink', label: 'Button Link', fullWidth: true },
            ]}
            values={form.cta as unknown as Record<string, string>}
            onChange={(k, v) => patch('cta', k, v)}
          />
        </CmsSectionCard>
      </CmsSectionAnchor>

      <CmsSectionAnchor id="seo">
        <CmsSectionCard title="SEO" description="Search engine optimisation for the Solutions listing page." icon={Search}>
          <SeoManager
            value={seoFromItem(form as unknown as Record<string, unknown>)}
            onChange={(seo) => { setForm((prev) => ({ ...prev, ...seo })); setIsDirty(true); }}
            pathPrefix="/solutions"
            defaultTitle={form.seoTitle || ''}
            defaultDescription={form.seoDescription || ''}
            defaultImage={form.hero.backgroundImage}
          />
        </CmsSectionCard>
      </CmsSectionAnchor>
    </CmsPageLayout>
  );
};

export default SolutionsLandingSettings;
