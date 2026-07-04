/**
 * @file src/services/newsletter.service.ts
 * @description Newsletter service containing business logic for newsletter subscriptions.
 */

import { Newsletter, INewsletter } from '@/models/Newsletter';
import { ApiError } from '@/utils/ApiError';
import { logger } from '@/utils/logger';

export interface CreateSubscriptionDTO {
  email: string;
  source: 'footer' | 'blog_popup' | 'contact_form' | 'hero';
}

export class NewsletterService {
  /**
   * Subscribes an email to the newsletter.
   * Prevents duplicates, handles resubscriptions cleanly.
   */
  async subscribe(data: CreateSubscriptionDTO): Promise<INewsletter> {
    const { email, source } = data;

    logger.info('[NewsletterService] Processing new subscription attempt', { email, source });

    const existing = await Newsletter.findOne({ email });

    if (existing) {
      if (existing.status === 'subscribed') {
        logger.warn('[NewsletterService] Duplicate subscription attempt rejected', { email });
        throw ApiError.conflict('This email address is already subscribed.');
      }

      // If previously unsubscribed, mark as resubscribed
      existing.status = 'subscribed';
      existing.source = source;
      await existing.save();

      logger.info('[NewsletterService] Unsubscribed email resubscribed successfully', {
        id: existing._id,
        email,
      });

      return existing;
    }

    const subscriber = new Newsletter({
      email,
      source,
      status: 'subscribed',
    });

    await subscriber.save();

    logger.info('[NewsletterService] New subscriber saved successfully', {
      id: subscriber._id,
      email,
    });

    return subscriber;
  }

  /**
   * CRUD: Get list of all subscribers (Admin Panel capability)
   */
  async getAllSubscribers(): Promise<INewsletter[]> {
    return Newsletter.find().sort({ createdAt: -1 });
  }

  /**
   * CRUD: Unsubscribe an email address (Admin Panel capability)
   */
  async unsubscribeEmail(email: string): Promise<INewsletter> {
    const subscriber = await Newsletter.findOne({ email });
    if (!subscriber) {
      throw ApiError.notFound('Subscriber email not found.');
    }
    if (subscriber.status === 'unsubscribed') {
      return subscriber;
    }
    subscriber.status = 'unsubscribed';
    await subscriber.save();
    logger.info('[NewsletterService] Subscriber unsubscribed', { email });
    return subscriber;
  }

  /**
   * CRUD: Delete subscriber permanently (Admin Panel capability)
   */
  async deleteSubscriber(id: string): Promise<void> {
    const result = await Newsletter.findByIdAndDelete(id);
    if (!result) {
      throw ApiError.notFound('Subscriber not found.');
    }
    logger.info('[NewsletterService] Subscriber deleted', { id });
  }
}

export const newsletterService = new NewsletterService();
