/**
 * @file src/models/Newsletter.ts
 * @description Mongoose schema and model for Newsletter subscriptions.
 *
 * ARCHITECTURE DECISION:
 *   Tracks active email subscriptions. Enforces standard validations,
 *   unique constraint on email, and source tracking.
 */

import mongoose, { Schema } from 'mongoose';
import { BaseDocument } from '@/types/common';
import { VALIDATION } from '@/constants';

export interface INewsletter extends BaseDocument {
  email: string;
  status: 'subscribed' | 'unsubscribed';
  source: typeof VALIDATION.NEWSLETTER_SOURCES[number];
}

const newsletterSchema = new Schema<INewsletter>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [VALIDATION.EMAIL_REGEX, 'Please fill a valid email address'],
    },
    status: {
      type: String,
      enum: ['subscribed', 'unsubscribed'],
      default: 'subscribed',
    },
    source: {
      type: String,
      enum: VALIDATION.NEWSLETTER_SOURCES,
      default: 'footer',
    },
  },
  {
    timestamps: true,
  }
);

newsletterSchema.index({ status: 1 });

export const Newsletter = mongoose.model<INewsletter>('Newsletter', newsletterSchema);
