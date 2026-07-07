export interface IIndustryStep {
  step: number;
  title: string;
  description: string;
}

export interface IIndustryCaseStudy {
  title: string;
  description: string;
  link?: string;
}

export interface IIndustryWhyChooseUs {
  title: string;
  description: string;
}

export interface IIndustryStat {
  value: string;
  label: string;
  iconType: string;
  colorTheme: string;
}

export interface IDetailedOffering {
  title: string;
  description: string;
  badges: string[];
  color: string;
  iconName: string;
}

export interface Industry {
  _id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  coverImage?: string;
  features: string[];
  technologies: string[];
  benefits: string[];
  displayOrder: number;
  status: 'draft' | 'active';
  seoTitle?: string;
  seoDescription?: string;

  // Rich CMS fields
  category: string;
  thumbnail: string;
  overview: string;
  overviewQuote?: string;
  offerings: string[];
  process: IIndustryStep[];
  caseStudies: IIndustryCaseStudy[];
  cta: string;
  featured: boolean;
  industries: string[];
  whyChooseUs: IIndustryWhyChooseUs[];
  stats: IIndustryStat[];
  detailedOfferings: IDetailedOffering[];
  dashboardImage?: string;

  // Audit properties
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  isDeleted?: boolean;
}
