"use server";

import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/require-session";
import { success } from "zod";

// if session is there but not enrolled then display courses but locked only the free ones that unlocked
export async function fetchExercises() {
  // Determine if user has an active subscription (do not redirect unauthenticated users)
  let session = null;
  try {
    session = await requireSession();
  } catch (err) {
    // requireSession may redirect in some failure cases; swallow and treat as unauthenticated
    console.error("fetchExercises: requireSession error", err);
    session = null;
  }

  let isSubscribed = false;
  if (session && session.user && session.user.id) {
    try {
      const sub = await prisma.subscription.findFirst({
        where: {
          userId: session.user.id,
          status: "active",
          OR: [{ endDate: { gt: new Date() } }, { endDate: null }],
        },
      });
      if (sub) isSubscribed = true;
    } catch (err) {
      console.error("fetchExercises: subscription check failed", err);
    }
  }

  try {
    const allCourses = await prisma.exercise.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        thumbnailKey: true,
        level: true,
        status: true,
        duration: true,
        description: true,
        plan: true,
      },
    });

    if (!allCourses)
      return { success: false, message: "Failed to get Exercises" };

    // mark premium exercises as locked when user is not subscribed or not logged in
    const mapped = allCourses.map((ex) => ({
      ...ex,
      isLocked: ex.plan === "PREMIUM" && !isSubscribed,
    }));

    return { success: true, allCourses: mapped };
  } catch (error) {
    return { success: false, message: "Failed to load Exercises" };
  }
}

export async function getSubscriptionStatus() {
  let session = null;
  try {
    session = await requireSession();
  } catch (err) {
    console.error("getSubscriptionStatus: requireSession error", err);
    return { success: false, message: "Login to continue" };
  }

  if (!session || !session.user || !session.user.id)
    return { success: false, message: "Login to continue" };

  try {
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: session.user.id,
        status: "active",
        OR: [{ endDate: { gt: new Date() } }, { endDate: null }],
      },
    });

    if (!subscription) return { success: false, message: "Not Subscribed" };

    return { success: true, message: "Subscribed", subscription };
  } catch (err) {
    console.error("getSubscriptionStatus: db error", err);
    return { success: false, message: "UnExpected Error Occured" };
  }
}

export async function getExercise(exId) {
  try {
    const exercise = await prisma.exercise.findUnique({
      where: { id: exId },
      select: {
        id: true,
        title: true,
        description: true,
        duration: true,
        category: true,
        plan: true,
        level: true,
        thumbnailKey: true,
        benefits: true,
        steps: true,
        videoKey: true,
      },
    });

    if (!exercise)
      return {
        success: false,
        message: "Failed to fetch the Exercise",
      };

    return { success: true, exercise };
  } catch (err) {
    return { success: false, message: "UnExpected Error Occured" };
  }
}

// check for the current user if is subscribed if not lock the things

export async function createSupport(data) {
  const { name, email, subject, message } = data;

  const support = await prisma.support.create({});
}

// email subscription

export async function EmailSubscription(data) {
  const { email } = data;

  if(!email) return { success: false, message: 'Email not found'}

  // let us first check whether the email exists

  try {
    const checkEmail = await prisma.emailsubscription.findFirst({
      where: { email },
    });

    if (checkEmail)
      return { success: false, message: "Email Already Available" };

    const emailSub = await prisma.subscription.create({
      data: {
        email,
      },
    });

    if (!emailSub) return { success: false, message: "Failed to Subscribe" };

	return { success: true, message: 'Subscribed Successfully'}

  } catch {
	return {
		success: false, message: 'Failed to Subscribe'
	}
  }
}

// Testimonial submission

export async function TestimonialForm(data) {
  const session = await requireSession()

  if (!session) return { success: false, message: 'Not authenticated'}
  // destructure data,
  const { name, rating, age, condition, achievement, story, email } = data

  if (!name || !rating || !condition || !achievement || !story || !age || !email) return { success: false, message: 'Please fill the required fields'}

  try {
      // create testimonial
      const testimonial = await prisma.testimonail.create({
        data: {
          name, 
          rating: parseInt(rating), 
          age: parseInt(age), 
          condition, 
          achievemnt: achievement, 
          story,
          email,
          userId: session.user.id
        }
      });

      if (!testimonial) return { success: false, message: 'Failed to submit'}

      return { success: true, message: 'Submitted Successfully'}
  } catch (err) {
    console.error('TestimonialForm error:', err);
    return { success: false, message: 'UnExpected Error Occured'}
  }

}

// community actions

// Gallery actions

export async function communityGallery(data) {

  const { caption, category, description, imageUrl, videoUrl} = data

  if (!caption || !category || !description || !imageUrl) return { success: false, message: 'Fill the required fields'}
  const session = await requireSession();

  if (!session) return { success: false, message: 'Not authenticated'}

  // verify if user is a admin
  try {

    const gallery = await prisma.gallery.create({
      data: { 
        caption, 
        category, 
        description, 
        imageUrl,
        videoUrl: videoUrl || null
      }
    });

    if (!gallery) return { success: false, message: 'Failed to create '}

    return { success: true, message: 'Created successfully'}
    
  } catch(err) {
    return { success: false, message: 'UnExpected Error Occured'}
  }

}

export async function communityEvents(data) {

  const { title, description, imageUrl, date, time, location, } = data

  if (!title || !description || !imageUrl || !date || !time || !location ) return { success: false, message: 'Fill the required fields'}
  const session = await requireSession();

  if (!session) return { success: false, message: 'Not authenticated'}

  // verify if user is a admin
  try {

    const events = await prisma.event.create({
      data: { title, description, imageUrl, date, time, location }
    });

    if (!events) return { success: false, message: 'Failed to create '}

    return { success: true, message: 'Created successfully'}
    
  } catch(err) {
    return { success: false, message: 'UnExpected Error Occured'}
  }

}
export async function communityFeaturedMembers(data) {

  const { name, badge, imageUrl } = data

  if (!name || !badge || !imageUrl) return { success: false, message: 'Fill the required fields'}
  const session = await requireSession();

  if (!session) return { success: false, message: 'Not authenticated'}

  // verify if user is a admin
  try {

    const member = await prisma.featuredMember.create({
      data: { name, badge, imageUrl }
    });

    if (!member) return { success: false, message: 'Failed to create '}

    return { success: true, message: 'Created successfully'}
    
  } catch {
    return { success: false, message: 'UnExpected Error Occured'}
  }

}


// delete 

export async function deleteGallery(id) {

  if (!id) return { success: false, message: 'Gallery not found'}
  const session = await requireSession();

  if (!session) return { success: false, message: 'Not authenticated'}

    try {

    const gallery = await prisma.gallery.delete({
      where: { id }
    })

    if (!gallery) return { success: false, message: 'Failed to delete '}

    return { success: true, message: 'Deleted successfully'}
    
  } catch {
    return { success: false, message: 'UnExpected Error Occured'}
  }
}

export async function deleteEvent(id) {

  if (!id) return { success: false, message: 'Event not found'}
  const session = await requireSession();

  if (!session) return { success: false, message: 'Not authenticated'}

    try {

    const event = await prisma.event.delete({
      where: { id }
    })

    if (!event) return { success: false, message: 'Failed to delete '}

    return { success: true, message: 'Deleted successfully'}
    
  } catch {
    return { success: false, message: 'UnExpected Error Occured'}
  }
}

export async function deleteMember(id) {

  if (!id) return { success: false, message: 'Member not found'}
  const session = await requireSession();

  if (!session) return { success: false, message: 'Not authenticated'}

    try {

    const member = await prisma.featuredMember.delete({
      where: { id }
    })

    if (!member) return { success: false, message: 'Failed to delete '}

    return { success: true, message: 'Deleted successfully'}
    
  } catch (err) {
    console.error('deleteMember error', err);
    return { success: false, message: 'UnExpected Error Occured'}
  }
}

// Booking form submission

export async function submitBookingRequest(formData) {
  const { name, email, phone, serviceType, groupSize, preferredDate, location, message } = formData;

  // Validate required fields
  if (!name || !email || !serviceType || !groupSize || !location) {
    return { success: false, message: 'Please fill all required fields' };
  }

  try {
    const { resend } = await import('@/lib/resend');
    const BookingEmailTemplate = (await import('@/components/EmailComponents/BookingEmailTemplate')).default;

    // Send email to ThrivBeat support
    const emailResponse = await resend.emails.send({
      from: 'bookings@thrivbeats.com',
      to: 'thrivbeats@yahoo.com',
      subject: `New Booking Request: ${serviceType === 'chair-classes' ? 'Chair-Based Classes' : 'Event Booking'}`,
      react: BookingEmailTemplate({
        name,
        email,
        phone,
        serviceType,
        groupSize,
        preferredDate,
        location,
        message,
      }),
    });

    if (emailResponse.error) {
      return { success: false, message: 'Failed to send booking request. Please try again.' };
    }

    return { success: true, message: 'Booking request submitted successfully! We will get back to you within 24-48 hours.' };
  } catch (error) {
    return { success: false, message: 'An error occurred while submitting your booking request.' };
  }
}