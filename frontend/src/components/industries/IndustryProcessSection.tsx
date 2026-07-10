import { Industry } from '@/data/industries';
import { Service } from '@/data/services';
import { ProcessSection } from '@/components/services/ProcessSection';

interface IndustryProcessSectionProps {
  industry: Industry;
}

export const IndustryProcessSection = ({ industry }: IndustryProcessSectionProps) => {
  if (!industry.process || industry.process.length === 0) {
    return null;
  }

  const serviceShape = {
    process: industry.process,
  } as Service;

  return <ProcessSection service={serviceShape} />;
};

export default IndustryProcessSection;
