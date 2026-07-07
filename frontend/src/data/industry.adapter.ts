/**
 * @file src/data/industry.adapter.ts
 * @description Adapts and decorates Industry documents for UI rendering matching the original data structure and verifying image bindings.
 */

import { 
  Heart, GraduationCap, Landmark, ShoppingCart, Factory, Home, Truck, Sprout, Utensils, Zap, HelpCircle, LucideIcon 
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { IMAGE_MAP } from "./services";
import { INDUSTRIES } from "./industries";

const ICON_MAP: Record<string, LucideIcon> = {
  Heart,
  GraduationCap,
  Landmark,
  ShoppingCart,
  Factory,
  Home,
  Truck,
  Sprout,
  Utensils,
  Zap,
  // Fallbacks
  Shield: Heart,
  Brain: GraduationCap,
  Database: Landmark,
  Globe: ShoppingCart,
  Smartphone: ShoppingCart,
  Palette: Sprout,
  Cpu: Zap,
  Cloud: Zap,
  Workflow: Truck,
  Boxes: Factory,
  Briefcase: Landmark,
  Building: Landmark,
  Layers: Factory,
  Rocket: Sprout
};

const COLOR_MAP: Record<string, string> = {
  healthcare: 'from-emerald-500 to-teal-600',
  education: 'from-blue-500 to-indigo-600',
  finance: 'from-f5-158 to-f5-158', 
  banking: 'from-indigo-500 to-cyan-600',
  retail: 'from-rose-500 to-red-650',
  'retail-ecommerce': 'from-rose-500 to-red-650',
  manufacturing: 'from-orange-500 to-amber-600',
  logistics: 'from-violet-500 to-purple-600',
  'real-estate': 'from-cyan-500 to-blue-600',
  travel: 'from-amber-500 to-orange-600',
  automobile: 'from-slate-500 to-zinc-600',
  saas: 'from-emerald-500 to-blue-600'
};

/**
 * Robust image key resolver conforming to Sprint 2 requirements.
 */
export function resolveImage(value: string): string {
  if (!value) return "";
  
  // Absolute URLs (Cloudinary, etc.) do NOT map through IMAGE_MAP
  if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/") || value.startsWith("data:")) {
    return value;
  }
  
  // 1. Try direct match in IMAGE_MAP
  if (IMAGE_MAP[value]) {
    return IMAGE_MAP[value];
  }
  
  // 2. Convert snake_case or kebab-case to camelCase
  // e.g. service_creative_design -> serviceCreativeDesign
  const camelized = value
    .replace(/_([a-z])/g, (_, g) => g.toUpperCase())
    .replace(/-([a-z])/g, (_, g) => g.toUpperCase());
    
  if (IMAGE_MAP[camelized]) {
    return IMAGE_MAP[camelized];
  }
  
  // 3. Fallback map for custom database seed names to exact import handles
  const legacyMap: Record<string, string> = {
    'service_webdevlopment': 'serviceWebDev',
    'mobile_phone_devloper': 'serviceMobileApp',
    'ui_ux_designer': 'serviceUiUx',
    'Ai_and_atomation': 'serviceAiAutomation',
    'Claud_Devops': 'serviceCloudDevops',
    'digital_marketing': 'serviceDigitalMarketing',
    'custom_software_devlopment': 'serviceCustomSoftware',
    'service_web_dev': 'serviceWebDev',
    'service_mobile_app': 'serviceMobileApp',
    'service_ui_ux': 'serviceUiUx',
    'service_ai_automation': 'serviceAiAutomation',
    'service_cloud_devops': 'serviceCloudDevops'
  };
  
  const mappedKey = legacyMap[value];
  if (mappedKey && IMAGE_MAP[mappedKey]) {
    return IMAGE_MAP[mappedKey];
  }
  
  // 4. Warning trigger for missing keys
  console.warn(`[ImageAudit] Missing image mapping or reference key inside IMAGE_MAP: "${value}"`);
  return value;
}

export function decorateIndustry(apiIndustry: any): any {
  const idStr = apiIndustry.slug || apiIndustry.id || apiIndustry._id || '';
  const industriesColor = COLOR_MAP[idStr] || 'from-emerald-500 to-teal-600';
  
  // Resolve Lucide Icon component
  let resolvedIcon: LucideIcon = Heart;
  if (apiIndustry.icon) {
    if (ICON_MAP[apiIndustry.icon]) {
      resolvedIcon = ICON_MAP[apiIndustry.icon];
    } else if ((LucideIcons as any)[apiIndustry.icon]) {
      resolvedIcon = (LucideIcons as any)[apiIndustry.icon];
    }
  }

  // Find original static industry matching by slug for assets fallback
  const originalInd = INDUSTRIES.find(i => i.slug === apiIndustry.slug);

  // Resolve cover / hero image using helper
  const coverImage = resolveImage(apiIndustry.coverImage) || (originalInd ? originalInd.heroImage : "");
  const thumbnail = resolveImage(apiIndustry.thumbnail) || (originalInd ? originalInd.heroImage : "");
  const dashboardImage = resolveImage(apiIndustry.dashboardImage);
  const heroImage = coverImage || thumbnail || (originalInd ? originalInd.heroImage : 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop');

  // Map challenges from whyChooseUs
  const challenges = Array.isArray(apiIndustry.whyChooseUs) 
    ? apiIndustry.whyChooseUs.map((w: any) => ({ title: w.title, description: w.description }))
    : [
        { title: 'Operational Rigor', description: 'Aligning business processes with digital transformations.' },
        { title: 'Regulatory Guardrails', description: 'Ensuring strict compliance with localized data protection policies.' }
      ];

  // Map solutions from detailedOfferings / features
  const solutions = Array.isArray(apiIndustry.detailedOfferings) && apiIndustry.detailedOfferings.length > 0
    ? apiIndustry.detailedOfferings.map((d: any) => ({ title: d.title, description: d.description }))
    : Array.isArray(apiIndustry.features)
      ? apiIndustry.features.map((f: string) => ({ title: f, description: `High performance implementation of ${f}.` }))
      : [];

  // Map statistics
  const statistics = Array.isArray(apiIndustry.stats)
    ? apiIndustry.stats.map((s: any) => ({ value: s.value, label: s.label, description: '' }))
    : [];

  // Map services slugs (relational mapping)
  const servicesSlugs = Array.isArray(apiIndustry.industries) && apiIndustry.industries.length > 0
    ? apiIndustry.industries
    : ['web-development', 'mobile-app-development', 'ui-ux-design'];

  // Map case studies from caseStudies object array
  const caseStudiesSlugs = Array.isArray(apiIndustry.caseStudies)
    ? apiIndustry.caseStudies.map((c: any) => c.slug || c.title?.toLowerCase().replace(/\s+/g, '-')).filter(Boolean)
    : [];

  // Mapped dynamic FAQ
  const faqs = Array.isArray(apiIndustry.faqs) ? apiIndustry.faqs : [];

  return {
    id: idStr,
    slug: apiIndustry.slug,
    title: apiIndustry.title,
    shortDescription: apiIndustry.shortDescription,
    description: apiIndustry.fullDescription || apiIndustry.shortDescription,
    heroImage,
    coverImage,
    thumbnail,
    dashboardImage,
    icon: resolvedIcon,
    industriesColor,
    challenges,
    solutions,
    services: servicesSlugs,
    technologies: apiIndustry.technologies || [],
    caseStudies: caseStudiesSlugs,
    faqs,
    statistics,
    cta: {
      title: apiIndustry.ctaLabel || apiIndustry.cta || 'Let\'s partner up to discuss your project',
      subtitle: apiIndustry.overview || '',
      buttonText: 'Get in Touch',
      buttonLink: '/contact'
    }
  };
}
