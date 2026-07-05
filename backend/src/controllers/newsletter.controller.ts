/**
 * @file src/controllers/newsletter.controller.ts
 * @description Controller for the Newsletter module. Handles requests and formats responses.
 */

import { Request, Response, NextFunction } from 'express';
import { validateNewsletterInput } from '@/validators/newsletter.validator';
import { newsletterService } from '@/services/newsletter.service';
import { ApiResponse } from '@/utils/ApiResponse';
import { ApiError } from '@/utils/ApiError';
import { HTTP_STATUS } from '@/constants';

/**
 * POST /api/newsletter
 * Subscribes a new email address to the newsletter.
 */
export async function subscribeNewsletter(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const validatedData = validateNewsletterInput(req.body);

    const subscriber = await newsletterService.subscribe(validatedData);

    ApiResponse.success(
      res,
      subscriber,
      'Thank you for subscribing to our newsletter.',
      HTTP_STATUS.CREATED
    );
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/newsletter (CRUD / Admin Panel future interface)
 * Lists all subscribers.
 */
export async function listSubscribers(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const subscribers = await newsletterService.getAllSubscribers();
    ApiResponse.success(
      res,
      subscribers,
      'Subscribers list retrieved successfully',
      HTTP_STATUS.OK
    );
  } catch (err) {
    next(err);
  }
}

/**
 * PATCH /api/newsletter/unsubscribe (CRUD / Admin Panel future interface)
 * Unsubscribes a subscriber.
 */
export async function unsubscribeNewsletter(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email } = req.body;
    if (!email) {
      throw ApiError.badRequest('Email address is required to unsubscribe');
    }
    const subscriber = await newsletterService.unsubscribeEmail(email);
    ApiResponse.success(
      res,
      subscriber,
      'Unsubscribed successfully',
      HTTP_STATUS.OK
    );
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/newsletter/:id (CRUD / Admin Panel future interface)
 * Deletes subscriber document.
 */
export async function deleteSubscriber(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    await newsletterService.deleteSubscriber(id);
    ApiResponse.success(
      res,
      null,
      'Subscriber deleted successfully',
      HTTP_STATUS.OK
    );
  } catch (err) {
    next(err);
  }
}
