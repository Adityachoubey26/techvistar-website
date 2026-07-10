import type { LucideIcon } from 'lucide-react';
import {
  HelpCircle,
  ArrowUpNarrowWide,
  ArrowDownWideNarrow,
  Lock,
  Unlock,
} from 'lucide-react';
import { ICON_MAP as SERVICE_ICON_MAP } from '@/data/services';
import { getCmsIcon } from '@/lib/cmsIcons';

const ADMIN_ICON_MAP: Record<string, LucideIcon> = {
  ArrowUpNarrowWide,
  ArrowDownWideNarrow,
  Lock,
  Unlock,
  HelpCircle,
};

/** Resolve a CMS/admin icon name without importing the full lucide-react barrel. */
export function resolveLucideIcon(name: string): LucideIcon {
  return (
    ADMIN_ICON_MAP[name] ||
    SERVICE_ICON_MAP[name] ||
    getCmsIcon(name)
  );
}

export function renderLucideIcon(name: string, className = 'w-4 h-4') {
  const Icon = resolveLucideIcon(name);
  return <Icon className={className} />;
}
