import type { LucideIcon } from 'lucide-react';
import {
  Circle,
  Cpu,
  Shield,
  Users,
  ClipboardCheck,
  DollarSign,
  Layers,
  Globe,
  Smartphone,
  Palette,
  Brain,
  Laptop,
  Cloud,
  Briefcase,
  Heart,
  Clock,
  Star,
  Zap,
  Target,
  Award,
} from 'lucide-react';

const CMS_ICON_MAP: Record<string, LucideIcon> = {
  Cpu,
  Shield,
  Users,
  ClipboardCheck,
  DollarSign,
  Layers,
  Globe,
  Smartphone,
  Palette,
  Brain,
  Laptop,
  Cloud,
  Briefcase,
  Heart,
  Clock,
  Star,
  Zap,
  Target,
  Award,
};

export function getCmsIcon(name: string): LucideIcon {
  return CMS_ICON_MAP[name] || Circle;
}

export const CMS_ICON_OPTIONS = [
  'Cpu', 'Shield', 'Users', 'ClipboardCheck', 'DollarSign', 'Layers',
  'Globe', 'Smartphone', 'Palette', 'Brain', 'Laptop', 'Cloud',
  'Briefcase', 'Heart', 'Clock', 'Star', 'Zap', 'Target', 'Award',
] as const;
