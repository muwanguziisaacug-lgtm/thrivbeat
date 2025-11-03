'use server'

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
					OR: [
						{ endDate: { gt: new Date() } },
						{ endDate: null },
					],
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

		if (!allCourses) return { success: false, message: "Failed to get Exercises" };

		// mark premium exercises as locked when user is not subscribed or not logged in
		const mapped = allCourses.map((ex) => ({
			...ex,
			isLocked: ex.plan === "PREMIUM" && !isSubscribed,
		}));

		return { success: true, allCourses: mapped };
	} catch (error) {
		console.log(error);
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
				OR: [
					{ endDate: { gt: new Date() } },
					{ endDate: null },
				],
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
        }
    catch (err) {
            console.log(err)
            return { success: false, message: 'UnExpected Error Occured'}
        }

}

// check for the current user if is subscribed if not lock the things



export async function createSupport(data) {
    
    const { name, email, subject, message } = data

    const support = await prisma.support.create({
        
    })
}


// define where the user is enrolled or not