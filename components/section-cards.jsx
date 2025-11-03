"use client";

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SectionCards() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/dashboard/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="@container/card">
            <CardHeader>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-5 w-16" />
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-32" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 lg:px-6">
        <Card className="p-6">
          <CardTitle className="text-red-500">Error loading dashboard data</CardTitle>
          <CardDescription>{error}</CardDescription>
        </Card>
      </div>
    );
  }

  const { overview, activity } = stats || {};
  const weeklyChange = activity ? 
    Math.round(((activity.last7Days / (activity.last30Days / 4)) - 1) * 100) : 0;
  const monthlyChange = activity ?
    Math.round(((activity.last30Days / (activity.total / 3)) - 1) * 100) : 0;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {overview?.totalUsers?.toLocaleString() || '0'}
          </CardTitle>
          <CardAction>
            <Badge variant={weeklyChange >= 0 ? "outline" : "destructive"}>
              {weeklyChange >= 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {weeklyChange}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {weeklyChange >= 0 ? 'Growing' : 'Declining'} this week
            {weeklyChange >= 0 ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
          </div>
          <div className="text-muted-foreground">
            Based on weekly activity
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {activity?.last7Days?.toLocaleString() || '0'}
          </CardTitle>
          <CardAction>
            <Badge variant={monthlyChange >= 0 ? "outline" : "destructive"}>
              {monthlyChange >= 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {monthlyChange}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {monthlyChange >= 0 ? 'Trending up' : 'Trending down'} this month
            {monthlyChange >= 0 ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
          </div>
          <div className="text-muted-foreground">
            Compared to last month
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Exercises</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {overview?.totalExercises?.toLocaleString() || '0'}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {overview?.completionRate >= 50 ? <IconTrendingUp /> : <IconTrendingDown />}
              {overview?.completionRate || 0}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Completion rate
            {overview?.completionRate >= 50 ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
          </div>
          <div className="text-muted-foreground">
            Average completion rate
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Recent Activity</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {activity?.last24Hours?.toLocaleString() || '0'}
          </CardTitle>
          <CardAction>
            <Badge variant={activity?.last24Hours > (activity?.last7Days / 7) ? "outline" : "destructive"}>
              {activity?.last24Hours > (activity?.last7Days / 7) ? <IconTrendingUp /> : <IconTrendingDown />}
              Today
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Active in last 24 hours
            {activity?.last24Hours > (activity?.last7Days / 7) ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
          </div>
          <div className="text-muted-foreground">
            Compared to daily average
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
