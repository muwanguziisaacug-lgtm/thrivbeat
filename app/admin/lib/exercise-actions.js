'use server'

import { prisma } from "@/lib/prisma"
import { requireSession } from "@/lib/require-session";
import { success } from "zod";
/**
 * Creates a new Exercise in the database
 * @param {Object} data - Exercise data
 * @param {string} data.title
 * @param {string} data.description
 * @param {string} data.thumbnailKey
 * @param {string} data.videoKey
 * @param {number} data.duration
 * @param {string} data.level
 * @param {string} data.category
 * @param {number} data.calories
 * @param {string} data.plan
 * @param {string} data.status
 * @param {string} data.userId
 * @param {Array<string>} data.equipments
 * @param {Array<string>} data.steps
 * @param {Array<string>} data.benefits
 * @returns {Promise<Object>} The created exercise
 */
export async function createExercise({
	title,
	description,
	thumbnailKey,
	videoKey,
	duration,
	level,
	category,
	calories,
	plan,
	status = "Draft",
	userId,
	equipments = [],
    steps = [],
    benefits = [],
}) {
	// Validate required fields
	if (!title || !description || !thumbnailKey || !videoKey || !userId) {
		throw new Error("Missing required fields");
	}
	// Create exercise
	const exercise = await prisma.exercise.create({
		data: {
			title,
			description,
			thumbnailKey,
			videoKey,
			duration: duration ? Number(duration) : null,
			level,
			category,
			calories: calories ? Number(calories) : null,
			plan,
			status,
			userId,
			equipments,
            steps,
            benefits,
		},
	});
	return exercise;
}

export async function getExercises() {
        const session = requireSession();

		if (!session) return { success: false, message: "Not Authenticated" };

    try {
        const exercises = await prisma.exercise.findMany({
            select: {
                id: true,
                title: true,
                thumbnailKey: true,
                duration: true,
                category: true,
                plan: true,
                status: true,
                description: true,
                level: true,
            }
        })
        
        if (!exercises) return { success: false, message: 'Failed to Fetch Exercises' }
        
        return { success: true, exercises }

    } catch (error) {
			return { success: false, message: "Internal Server Error" };
		}
}


export async function getExercise( exId ) {
    const session = requireSession()

    if (!session) return { success: false, message: 'Not Authenticated' }
    

    try {
        const exercise = await prisma.exercise.findUnique({
            where: { id: exId },
        });

        if (!exercise) return { success: false, message: 'Failed to get Exercise' }
        
        return { success: true, exercise }
    }
    catch (err) {
        return { success: false, message: 'UnExpected Error Occurred'}
    }
}

export async function updateExercise({
    id,
    title,
    description,
    thumbnailKey,
    videoKey,
    duration,
    level,
    category,
    calories,
    plan,
    status = "Draft",
    equipments = [],
    steps = [],
    benefits = [],
}) {
    if (!id || !title || !description || !thumbnailKey || !videoKey) {
        throw new Error("Missing required fields");
    }
    try {
        const updated = await prisma.exercise.update({
            where: { id },
            data: {
                title,
                description,
                thumbnailKey,
                videoKey,
                duration: duration ? Number(duration) : null,
                level,
                category,
                calories: calories ? Number(calories) : null,
                plan,
                status,
                equipments,
                steps,
                benefits,
            },
        });
        return { success: true, exercise: updated };
    } catch (err) {
        return { success: false, message: err.message || "Failed to update exercise" };
    }
}
// export const deleteExercise = () => {

// }