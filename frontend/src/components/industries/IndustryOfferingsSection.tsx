import { Industry } from '@/data/industries';
import { Service } from '@/data/services';
import { SolutionsSection } from '@/components/services/SolutionsSection';
import { buildIndustryDetailedOfferings } from './buildIndustryOfferings';
import '@/components/ui/GlassIcons.css';

interface IndustryOfferingsSectionProps {
  industry: Industry;
}

/** Maps industry CMS offerings to the service-shaped block used by SolutionsSection. */
export const IndustryOfferingsSection = ({ industry }: IndustryOfferingsSectionProps) => {
  const detailedOfferings = buildIndustryDetailedOfferings(industry);

  if (detailedOfferings.length === 0) {
    return null;
  }

  const serviceShape = {
    detailedOfferings,
    offerings: detailedOfferings.map((offering) => offering.title),
  } as Service;

  return <SolutionsSection service={serviceShape} />;
};

export default IndustryOfferingsSection;
