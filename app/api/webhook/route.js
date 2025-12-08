import Stripe from "stripe";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature error:", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  const data = event.data.object;

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        // When mode=subscription, the session contains subscription id
        const userId = data.metadata?.userId || '';
        const plan = (data.metadata?.plan || '').toUpperCase();
        const period = (data.metadata?.period || '').toUpperCase();
        const stripeSubscriptionId = data.subscription || (data.subscription_id || null);

        // Map incoming plan names to Prisma Plan enum values
        const planMap = {
          BASIC: 'BASIC',
          STANDARD: 'STANDARD',
          PREMIUM: 'PREMIUM',
          FREE: 'FREE',
        };

        const dbPlan = planMap[plan] || 'PREMIUM';

        // compute start and end dates
        const startDate = new Date();
        let endDate = null;
        if (period === 'MONTHLY') {
          endDate = new Date(startDate);
          endDate.setMonth(endDate.getMonth() + 1);
        } else if (period === 'YEARLY') {
          endDate = new Date(startDate);
          endDate.setFullYear(endDate.getFullYear() + 1);
        }

        // Upsert subscription: prefer matching stripeSubscriptionId, otherwise fall back to userId+plan
        if (stripeSubscriptionId) {
          await prisma.subscription.upsert({
            where: { stripeSubscriptionId: stripeSubscriptionId },
            create: {
              userId: userId,
              plan: dbPlan,
              period: period === 'MONTHLY' ? 'MONTHLY' : 'YEARLY',
              stripeSubscriptionId: stripeSubscriptionId,
              startDate: startDate,
              endDate: endDate,
              status: 'active',
            },
            update: {
              plan: dbPlan,
              period: period === 'MONTHLY' ? 'MONTHLY' : 'YEARLY',
              status: 'active',
              startDate: startDate,
              endDate: endDate,
              stripeSubscriptionId: stripeSubscriptionId,
            },
          });
        } else if (userId) {
          // fallback: update any existing subscription for user
          await prisma.subscription.upsert({
            where: { userId_plan: { userId: userId, plan: dbPlan } },
            create: {
              userId: userId,
              plan: dbPlan,
              period: period === 'MONTHLY' ? 'MONTHLY' : 'YEARLY',
              stripeSubscriptionId: stripeSubscriptionId,
              startDate: startDate,
              endDate: endDate,
              status: 'active',
            },
            update: {
              period: period === 'MONTHLY' ? 'MONTHLY' : 'YEARLY',
              status: 'active',
              startDate: startDate,
              endDate: endDate,
              stripeSubscriptionId: stripeSubscriptionId || undefined,
            },
          });
        } else {
          // no userId and no stripeSubscriptionId - create a record to track if possible
          await prisma.subscription.create({
            data: {
              userId: userId || '',
              plan: dbPlan,
              period: period === 'MONTHLY' ? 'MONTHLY' : 'YEARLY',
              stripeSubscriptionId: stripeSubscriptionId,
              startDate: startDate,
              endDate: endDate,
              status: 'active',
            },
          });
        }
        break;
      }

      case 'invoice.payment_failed': {
        // invoice object: subscription field contains the subscription id
        const subscriptionId = data.subscription || data.lines?.data?.[0]?.subscription;
        if (subscriptionId) {
          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: subscriptionId },
            data: { status: 'past_due' },
          });
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscriptionId = data.id;
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscriptionId },
          data: { status: 'canceled', endDate: new Date() },
        });
        break;
      }

      case 'customer.subscription.updated': {
        const subscriptionId = data.id;
        const status = data.status;
        if (subscriptionId) {
          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: subscriptionId },
            data: { status: status },
          });
        }
        break;
      }

      default:
    }
  } catch (err) {
    console.error('Error handling webhook event', err);
    return new NextResponse('Webhook handling error', { status: 500 });
  }

  return new NextResponse('ok', { status: 200 });
}
