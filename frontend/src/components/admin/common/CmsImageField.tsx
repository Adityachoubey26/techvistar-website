/**
 * @file CmsImageField.tsx
 * @description Shared admin media field — ImageUpload + MongoDB stored-value input.
 * Matches the Services CMS media UX exactly for consistent migration.
 */

import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/admin/common/ImageUpload";
import { IMAGE_MAP as SERVICE_IMAGE_MAP } from "@/data/services";
import { IMAGE_MAP as PROJECT_IMAGE_MAP } from "@/data/projects";

export interface CmsImageFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
}

/** Resolve legacy IMAGE_MAP keys (services + portfolio) and absolute URLs for preview. */
export function resolveCmsMediaSrc(value: string): string {
  if (!value) return "";
  if (SERVICE_IMAGE_MAP[value]) return SERVICE_IMAGE_MAP[value];
  if (PROJECT_IMAGE_MAP[value]) return PROJECT_IMAGE_MAP[value];
  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("/") ||
    value.includes("cloudinary.com")
  ) {
    return value;
  }
  return value;
}

export function CmsImageField({
  label,
  value,
  onChange,
  helperText = "JPG, JPEG, PNG, WEBP, or SVG — max 5 MB",
  placeholder = "Cloudinary URL or legacy IMAGE_MAP key",
  disabled = false,
}: CmsImageFieldProps) {
  const previewSrc = resolveCmsMediaSrc(value);

  return (
    <div className="space-y-3 p-4 bg-slate-50 border border-slate-200/50 rounded-xl">
      <ImageUpload
        label={label}
        value={previewSrc || value || ""}
        helperText={helperText}
        disabled={disabled}
        onChange={(data) => {
          onChange(data?.imageUrl ?? "");
        }}
      />
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Stored value (saved to MongoDB)
        </label>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="h-9 rounded-lg bg-white border-slate-200 font-mono text-[11px]"
        />
      </div>
    </div>
  );
}

export default CmsImageField;
