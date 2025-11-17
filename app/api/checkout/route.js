
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/require-session";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function getPriceId(plan, period) {
  // Expect environment variables like STRIPE_PRICE_BASIC_MONTHLY, STRIPE_PRICE_BASIC_YEARLY, etc.
  const key = `STRIPE_PRICE_${plan}_${period}`;
  const envVal = process.env[key];
  if (envVal) {
    // If the env value is a product id (prod_...), list prices for that product and pick matching interval
    if (typeof envVal === 'string' && envVal.startsWith('prod_')) {
      try {
        const prices = await stripe.prices.list({ product: envVal, active: true, limit: 10 });
        const interval = period === 'MONTHLY' ? 'month' : 'year';
        const found = prices.data.find((p) => p.recurring && p.recurring.interval === interval);
        if (found) return found.id;
      } catch (err) {
        console.warn('Error listing prices for product (from STRIPE_PRICE_* env):', envVal, err?.message || err);
      }
    }

    // Otherwise assume the env value is directly a price id
    return envVal;
  }

  // Fallback: if you provided a PRODUCT id in env (e.g. PREMIUM_PRODUCT_ID), try to find an existing price for that product
  const productKey = `${plan}_PRODUCT_ID`;
  const productId = process.env[productKey];
  if (productId) {
    try {
      const prices = await stripe.prices.list({ product: productId, active: true, limit: 10 });
      // period from API is 'month' or 'year'
      const interval = period === 'MONTHLY' ? 'month' : 'year';
      const found = prices.data.find((p) => p.recurring && p.recurring.interval === interval);
      if (found) return found.id;
    } catch (err) {
      console.warn('Error listing prices for product', productId, err?.message || err);
    }
  }

  return null;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { plan, period } = body;

    if (!plan || !period) {
      return NextResponse.json({ error: 'Missing plan or period' }, { status: 400 });
    }
  console.log('[checkout] request body:', { plan, period, providedUserId: body.userId });

  // Try to obtain the logged-in user's id from the server session first
    let userId = undefined;
    try {
      const session = await requireSession();
      if (session && typeof session === 'object') {
        if (session.user && session.user.id) userId = session.user.id;
        else if (session.id) userId = session.id;
      }
    } catch (err) {
      console.warn('requireSession error (allowing anonymous checkout):', err?.message || err);
    }

    // If not found in session, allow client to pass userId (for backward compatibility)
    if (!userId && body.userId) userId = body.userId;

    const planUpper = String(plan).toUpperCase();

    // If user is logged in, prevent starting another subscription if they already have an active one
    if (userId) {
      const existing = await prisma.subscription.findFirst({ where: { userId, status: 'active' } });
      if (existing) {
        return NextResponse.json({ error: 'User already has an active subscription' }, { status: 400 });
      }
    }

    // Handle FREE plan without going through Stripe
  if (planUpper === 'FREE') {
      if (!userId) {
        return NextResponse.json({ error: 'Login required to subscribe to free plan' }, { status: 401 });
      }

      // Upsert free subscription for user
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
      const startDate = new Date();
      let endDate = null;
      if (period === 'MONTHLY') {
        endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);
      } else if (period === 'YEARLY') {
        endDate = new Date(startDate);
        endDate.setFullYear(endDate.getFullYear() + 1);
      }

      await prisma.subscription.upsert({
        where: { userId_plan: { userId: userId, plan: 'FREE' } },
        create: {
          userId: userId,
          plan: 'FREE',
          period: period === 'MONTHLY' ? 'MONTHLY' : 'YEARLY',
          stripeSubscriptionId: null,
          startDate: startDate,
          endDate: endDate,
          status: 'active',
        },
        update: {
          period: period === 'MONTHLY' ? 'MONTHLY' : 'YEARLY',
          status: 'active',
          startDate: startDate,
          endDate: endDate,
        },
      });

      return NextResponse.json({ url: `${baseUrl}/dashboard` });
    }

    const priceId = await getPriceId(planUpper, period);
    if (!priceId) {
      console.error('[checkout] Missing price id for', planUpper, period);
      return NextResponse.json({ error: `Price not configured for ${planUpper} ${period}` }, { status: 500 });
    }

    // Optionally fetch customer email if userId provided
    let customer_email = undefined;
    if (userId) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (user?.email) customer_email = user.email;
    }

    let stripeSession;
    try {
      stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}failed`,
      ...(customer_email ? { customer_email } : {}),
      metadata: { userId: userId || '', plan: planUpper, period },
      });
    } catch (err) {
      console.error('[checkout] stripe.sessions.create error:', err?.message || err);
      return NextResponse.json({ error: 'Stripe session creation failed', details: err?.message || String(err) }, { status: 500 });
    }

    if (!stripeSession || !stripeSession.url) {
      console.error('[checkout] stripe session missing url or object:', stripeSession);
      return NextResponse.json({ error: 'Stripe returned no session url', details: stripeSession }, { status: 500 });
    }

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error('[checkout] unexpected error:', error?.message || error);
    return NextResponse.json({ error: "Failed to create session", details: error?.message || String(error) }, { status: 500 });
  }
}
