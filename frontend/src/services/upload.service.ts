/**
 * @file src/services/upload.service.ts
 * @description Client service for CMS image uploads to Cloudinary via the backend API.
 */

import { getAccessToken } from "@/services/auth.service";
import type { UploadedImageData, UploadApiResponse } from "@/types/upload";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const UPLOAD_CONSTRAINTS = {
  maxFileSizeBytes: 5 * 1024 * 1024, // 5 MB
  acceptedMimeTypes: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/svg+xml",
  ] as const,
  acceptedExtensions: [".jpg", ".jpeg", ".png", ".webp", ".svg"] as const,
  fieldName: "image",
} as const;

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

function mapUploadResponse(data: UploadApiResponse): UploadedImageData {
  return {
    imageUrl: data.url,
    publicId: data.publicId,
    width:    data.width,
    height:   data.height,
    format:   data.format,
  };
}

/**
 * Uploads an image file with XMLHttpRequest so upload progress can be tracked.
 */
export function uploadImageFile(
  file: File,
  onProgress?: (percent: number) => void
): Promise<UploadedImageData> {
  return new Promise((resolve, reject) => {
    const token = getAccessToken();
    const formData = new FormData();
    formData.append(UPLOAD_CONSTRAINTS.fieldName, file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_BASE_URL}/api/upload/image`);
    xhr.withCredentials = true;

    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }

    xhr.upload.onprogress = (event) => {
      if (!onProgress || !event.lengthComputable) return;
      onProgress(Math.min(100, Math.round((event.loaded / event.total) * 100)));
    };

    xhr.onload = () => {
      let payload: ApiEnvelope<UploadApiResponse> | null = null;

      try {
        payload = JSON.parse(xhr.responseText) as ApiEnvelope<UploadApiResponse>;
      } catch {
        payload = null;
      }

      if (xhr.status >= 200 && xhr.status < 300 && payload?.data) {
        resolve(mapUploadResponse(payload.data));
        return;
      }

      reject(new Error(payload?.message || "Image upload failed"));
    };

    xhr.onerror = () => reject(new Error("Network error while uploading image"));
    xhr.onabort = () => reject(new Error("Image upload was cancelled"));

    xhr.send(formData);
  });
}

/**
 * Validates a file before upload (type + size).
 */
export function validateImageFile(file: File): string | null {
  const extension = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;
  const mimeAllowed = (UPLOAD_CONSTRAINTS.acceptedMimeTypes as readonly string[]).includes(file.type);
  const extAllowed = (UPLOAD_CONSTRAINTS.acceptedExtensions as readonly string[]).includes(extension);

  if (!mimeAllowed || !extAllowed) {
    return "Invalid file type. Only JPG, JPEG, PNG, WEBP, and SVG are allowed.";
  }

  if (file.size > UPLOAD_CONSTRAINTS.maxFileSizeBytes) {
    return "File is too large. Maximum allowed size is 5 MB.";
  }

  return null;
}
