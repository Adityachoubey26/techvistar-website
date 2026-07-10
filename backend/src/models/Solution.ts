/**
 * @file src/models/Solution.ts
 * @description Mongoose schema and model for Solutions CMS.
 */

import mongoose, { Schema } from 'mongoose';
import { BaseDocument } from '@/types/common';
import { ISeoFields, seoMongooseFields } from '@/utils/seoFields';

export interface ISolutionChallenge {
  title: string;
  points: string[];
  impact: string;
}

export interface ISolutionOurSolution {
  overview: string;
  capabilities: string[];
}

export interface ISolutionFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ISolutionHowItWorks {
  step: string;
  title: string;
  desc: string;
}

export interface ISolutionBenefits {
  roi: string;
  efficiency: string;
  scalability: string;
  security: string;
}

export interface ISolutionIndustry {
  name: string;
  slug: string;
}

export interface ISolutionMetric {
  label: string;
  value: string;
}

export interface ISolutionHeroFloatingCard {
  value: string;
  label: string;
  icon: string;
}

export interface ISolutionHeroStat {
  value: string;
  label: string;
  description: string;
  icon: string;
}

export interface ISolutionNavItem {
  id: string;
  label: string;
}

export interface ISolutionSectionCopy {
  backLinkText: string;
  overviewTitle: string;
  featuresTitle: string;
  featuresSubtitle: string;
  processTitle: string;
  processSubtitle: string;
  benefitsTitle: string;
  benefitsSubtitle: string;
  techStackTitle: string;
  techStackSubtitle: string;
  navItems: ISolutionNavItem[];
}

export interface ISolutionFAQ {
  q: string;
  a: string;
}

export interface ISolution extends BaseDocument, ISeoFields {
  title: string;
  slug: string;
  subtitle: string;
  icon: string;
  category: string;
  challenges: ISolutionChallenge;
  ourSolution: ISolutionOurSolution;
  features: ISolutionFeature[];
  howItWorks: ISolutionHowItWorks[];
  benefits: ISolutionBenefits;
  industries: ISolutionIndustry[];
  techStack: string[];
  metrics: ISolutionMetric[];
  faqs: ISolutionFAQ[];
  heroDescription?: string;
  heroBadge?: string;
  backLinkText?: string;
  dashboardImage?: string;
  dashboardImagePublicId?: string;
  heroFloatingCards?: ISolutionHeroFloatingCard[];
  heroStats?: ISolutionHeroStat[];
  sectionCopy?: ISolutionSectionCopy;
  relatedSolutionSlugs?: string[];
  status: 'draft' | 'active';
  displayOrder: number;
  featured: boolean;

  // Audit and Soft Delete
  isDeleted?: boolean;
  deletedAt?: Date | null;
  deletedBy?: string;
  createdBy?: string;
  updatedBy?: string;
}

const solutionSchema = new Schema<ISolution>(
  {
    title: {
      type: String,
      required: [true, 'Solution title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Solution slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    subtitle: {
      type: String,
      required: [true, 'Subtitle is required'],
      trim: true,
    },
    icon: {
      type: String,
      required: [true, 'Icon is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    challenges: {
      title: { type: String, required: true, trim: true },
      points: { type: [String], default: [] },
      impact: { type: String, required: true, trim: true },
    },
    ourSolution: {
      overview: { type: String, required: true, trim: true },
      capabilities: { type: [String], default: [] },
    },
    features: [
      {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        icon: { type: String, required: true, trim: true },
      },
    ],
    howItWorks: [
      {
        step: { type: String, required: true, trim: true },
        title: { type: String, required: true, trim: true },
        desc: { type: String, required: true, trim: true },
      },
    ],
    benefits: {
      roi: { type: String, required: true, trim: true },
      efficiency: { type: String, required: true, trim: true },
      scalability: { type: String, required: true, trim: true },
      security: { type: String, required: true, trim: true },
    },
    industries: [
      {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, trim: true },
      },
    ],
    techStack: {
      type: [String],
      default: [],
    },
    metrics: [
      {
        label: { type: String, required: true, trim: true },
        value: { type: String, required: true, trim: true },
      },
    ],
    faqs: [
      {
        q: { type: String, required: true, trim: true },
        a: { type: String, required: true, trim: true },
      },
    ],
    heroDescription: {
      type: String,
      trim: true,
      default: '',
    },
    heroBadge: {
      type: String,
      trim: true,
      default: '',
    },
    backLinkText: {
      type: String,
      trim: true,
      default: '',
    },
    dashboardImage: {
      type: String,
      trim: true,
      default: '',
    },
    dashboardImagePublicId: {
      type: String,
      trim: true,
      default: '',
    },
    heroFloatingCards: [
      {
        value: { type: String, trim: true, default: '' },
        label: { type: String, trim: true, default: '' },
        icon: { type: String, trim: true, default: 'Shield' },
      },
    ],
    heroStats: [
      {
        value: { type: String, trim: true, default: '' },
        label: { type: String, trim: true, default: '' },
        description: { type: String, trim: true, default: '' },
        icon: { type: String, trim: true, default: 'TrendingUp' },
      },
    ],
    sectionCopy: {
      backLinkText: { type: String, trim: true, default: '' },
      overviewTitle: { type: String, trim: true, default: '' },
      featuresTitle: { type: String, trim: true, default: '' },
      featuresSubtitle: { type: String, trim: true, default: '' },
      processTitle: { type: String, trim: true, default: '' },
      processSubtitle: { type: String, trim: true, default: '' },
      benefitsTitle: { type: String, trim: true, default: '' },
      benefitsSubtitle: { type: String, trim: true, default: '' },
      techStackTitle: { type: String, trim: true, default: '' },
      techStackSubtitle: { type: String, trim: true, default: '' },
      navItems: [
        {
          id: { type: String, trim: true, default: '' },
          label: { type: String, trim: true, default: '' },
        },
      ],
    },
    relatedSolutionSlugs: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['draft', 'active'],
      default: 'active',
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    ...seoMongooseFields,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    deletedBy: {
      type: String,
      default: '',
      trim: true,
    },
    createdBy: {
      type: String,
      default: '',
      trim: true,
    },
    updatedBy: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Slug auto-generation fallback
solutionSchema.pre('validate', function (this: any) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
});

// Indexes for query speed
solutionSchema.index({ status: 1, displayOrder: 1 });

export const Solution = mongoose.model<ISolution>('Solution', solutionSchema);
