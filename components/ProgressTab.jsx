import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp, Flame, Target } from "lucide-react";

export default function ProgressTab() {
	const stats = [
		{ label: "Total Workouts", value: "24", icon: Target, change: "+12%" },
		{
			label: "Calories Burned",
			value: "3,240",
			icon: Flame,
			change: "+8%",
		},
		{ label: "Active Days", value: "18", icon: Calendar, change: "+5%" },
		{ label: "Progress", value: "75%", icon: TrendingUp, change: "+15%" },
	];

	const recentWorkouts = [
		{
			name: "Full Body Strength",
			date: "Mar 10, 2025",
			duration: "45 min",
			calories: 320,
		},
		{
			name: "Cardio Blast",
			date: "Mar 8, 2025",
			duration: "30 min",
			calories: 250,
		},
		{
			name: "Yoga Flow",
			date: "Mar 6, 2025",
			duration: "60 min",
			calories: 180,
		},
	];

	const enrolledCourses = [
		{ name: "Full Body Strength Training", progress: 75, lessons: "12/16" },
		{ name: "Advanced Cardio", progress: 45, lessons: "9/20" },
		{ name: "Flexibility & Mobility", progress: 90, lessons: "18/20" },
	];

	return (
		<div className="space-y-6">
			{/* Stats Overview */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{stats.map((stat, index) => (
					<Card key={index}>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between mb-2">
								<stat.icon className="h-5 w-5 text-muted-foreground" />
								<Badge variant="secondary" className="text-xs">
									{stat.change}
								</Badge>
							</div>
							<div className="text-2xl font-bold">
								{stat.value}
							</div>
							<p className="text-xs text-muted-foreground mt-1">
								{stat.label}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Enrolled Courses */}
			<Card>
				<CardHeader>
					<CardTitle>My Courses</CardTitle>
					<CardDescription>
						Track your learning progress
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{enrolledCourses.map((course, index) => (
						<div key={index} className="space-y-2">
							<div className="flex items-center justify-between">
								<div>
									<p className="font-medium">{course.name}</p>
									<p className="text-sm text-muted-foreground">
										{course.lessons} lessons completed
									</p>
								</div>
								<Button variant="outline" size="sm">
									Continue
								</Button>
							</div>
							<Progress value={course.progress} className="h-2" />
						</div>
					))}
				</CardContent>
			</Card>

			{/* Recent Workouts */}
			<Card>
				<CardHeader>
					<CardTitle>Recent Workouts</CardTitle>
					<CardDescription>Your workout history</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{recentWorkouts.map((workout, index) => (
							<div
								key={index}
								className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
							>
								<div>
									<p className="font-medium">
										{workout.name}
									</p>
									<div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
										<span>{workout.date}</span>
										<span>•</span>
										<span>{workout.duration}</span>
										<span>•</span>
										<span>{workout.calories} cal</span>
									</div>
								</div>
								<Button variant="ghost" size="sm">
									View
								</Button>
							</div>
						))}
					</div>
					<Button variant="outline" className="w-full mt-4">
						View All Workouts
					</Button>
				</CardContent>
			</Card>

			{/* Weekly Goal */}
			<Card>
				<CardHeader>
					<CardTitle>Weekly Goal</CardTitle>
					<CardDescription>
						4 out of 5 workouts completed
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Progress value={80} className="h-3 mb-4" />
					<p className="text-sm text-muted-foreground">
						Great job! Complete one more workout to reach your
						weekly goal.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
