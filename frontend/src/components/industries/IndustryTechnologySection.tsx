import { Industry } from '@/data/industries';
import { Service } from '@/data/services';
import { TechnologySection } from '@/components/services/TechnologySection';

interface IndustryTechnologySectionProps {
  industry: Industry;
}

export const IndustryTechnologySection = ({ industry }: IndustryTechnologySectionProps) => {
  if (!industry.technologies || industry.technologies.length === 0) {
    return null;
  }

  const serviceShape = {
    technologies: industry.technologies,
  } as Service;

  return <TechnologySection service={serviceShape} />;
};

export default IndustryTechnologySection;
