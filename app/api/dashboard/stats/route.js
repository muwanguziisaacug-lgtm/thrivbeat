import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Helper to get date X days ago
const getDateXDaysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export async function GET(req) {
  try {
    const last90Days = getDateXDaysAgo(90);
    const last30Days = getDateXDaysAgo(30);
    const last7Days = getDateXDaysAgo(7);

    // Get total users
    const totalUsers = await prisma.user.count();

    // Get active exercises
    const activeExercises = await prisma.exercise.count({
      where: {
        status: "Published"
      }
    });

    // Get total progress entries
    const totalProgress = await prisma.progress.count();

    // Get daily user activity for the last 90 days
    const dailyActivity = await prisma.progress.groupBy({
      by: ['createdAt'],
      _count: {
        userId: true
      },
      where: {
        createdAt: {
          gte: last90Days
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    // Calculate device statistics (this is a placeholder - replace with your actual tracking logic)
    const deviceStats = dailyActivity.map(day => {
      const total = day._count.userId;
      // Assuming roughly 60% mobile, 40% desktop - replace with real tracking
      return {
        date: day.createdAt.toISOString().split('T')[0],
        mobile: Math.round(total * 0.6),
        desktop: Math.round(total * 0.4)
      };
    });

    // Calculate completion rates
    const completionStats = await prisma.exercise.findMany({
      select: {
        id: true,
        _count: {
          select: {
            Progress: true
          }
        }
      },
      where: {
        status: "Published"
      }
    });

    const avgCompletionRate = completionStats.reduce((acc, curr) => 
      acc + curr._count.Progress, 0) / (completionStats.length || 1);

    // Calculate period activity
    const last7DaysActivity = await prisma.progress.count({
      where: {
        createdAt: {
          gte: last7Days
        }
      }
    });

    const last30DaysActivity = await prisma.progress.count({
      where: {
        createdAt: {
          gte: last30Days
        }
      }
    });

    return NextResponse.json({
      overview: {
        totalUsers,
        activeExercises,
        totalProgress,
        avgCompletionRate: Math.round(avgCompletionRate * 10) / 10
      },
      activity: {
        last7Days: last7DaysActivity,
        last30Days: last30DaysActivity,
        total: totalProgress
      },
      deviceStats
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}