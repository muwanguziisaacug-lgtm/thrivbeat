"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, TrendingUp, Play, ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { getExercise } from "@/app/actions/public-actions";
import { toast } from "sonner";

export default function CourseView() {
	const { id } = useParams();
	const navigate = useRouter();
	const [isPlaying, setIsPlaying] = useState(false);
	const [loading, setIsLoading] = useState(false);

	const [exercise, setExercise] = useState();

	useEffect(() => {
		setIsLoading(true);
		const loadExercise = async () => {
			try {
				const response = await getExercise(id);

				if (!response.success) {
					setIsLoading(false);
					toast.error(response.message);
                }
                const data = response.exercise

                setExercise(data)
            } catch {
                setIsLoading(false)
                toast.error('UnExpected Error Occurred Try Again')
            }
        };
        
        loadExercise()
    });
    

	// Mock data
	const course = {
		id: id || "1",
		name: "Full Body Strength Training",
		instructor: "Jane Smith",
		duration: 45,
		capacity: 20,
		enrolled: 12,
		difficulty: "Intermediate",
		price: 29.99,
		description:
			"A comprehensive full-body workout designed to build strength, endurance, and flexibility. Perfect for intermediate level fitness enthusiasts.",
		videoUrl: "https://example.com/video.mp4",
		thumbnail:
			"https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
		exercises: [
			{ name: "Warm-up", duration: "5 min" },
			{ name: "Squats", duration: "10 min" },
			{ name: "Push-ups", duration: "8 min" },
			{ name: "Lunges", duration: "10 min" },
			{ name: "Plank", duration: "7 min" },
			{ name: "Cool-down", duration: "5 min" },
		],
		benefits: [
			"Build overall body strength",
			"Improve cardiovascular health",
			"Increase flexibility and mobility",
			"Boost metabolism",
		],
	};

	return (
		<div className="min-h-screen bg-background">
			<header className="border-b bg-card sticky top-0 z-10">
				<div className="container mx-auto px-4 py-4">
					<Button variant="ghost" onClick={() => navigate(-1)}>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back
					</Button>
				</div>
			</header>

			<main className="container mx-auto px-4 py-8">
				<div className="grid lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-6">
						{/* Video Player */}
						<Card>
							<CardContent className="p-0">
								<div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
									{!isPlaying ? (
										<>
											<img
												src={course.thumbnail}
												alt={course.name}
												className="w-full h-full object-cover"
											/>
											<div className="absolute inset-0 flex items-center justify-center bg-black/40">
												<Button
													size="lg"
													className="rounded-full h-16 w-16"
													onClick={() =>
														setIsPlaying(true)
													}
												>
													<Play className="h-8 w-8" />
												</Button>
											</div>
										</>
									) : (
										<div className="w-full h-full flex items-center justify-center">
											<p className="text-muted-foreground">
												Video Player Placeholder
											</p>
										</div>
									)}
								</div>
							</CardContent>
						</Card>

						{/* Course Details Tabs */}
						<Tabs defaultValue="overview" className="w-full">
							<TabsList className="grid w-full grid-cols-3">
								<TabsTrigger value="overview">
									Overview
								</TabsTrigger>
								<TabsTrigger value="curriculum">
									Curriculum
								</TabsTrigger>
								<TabsTrigger value="instructor">
									Instructor
								</TabsTrigger>
							</TabsList>

							<TabsContent
								value="overview"
								className="space-y-4 mt-6"
							>
								<Card>
									<CardHeader>
										<CardTitle>About This Course</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-muted-foreground mb-4">
											{course.description}
										</p>
										<h4 className="font-semibold mb-2">
											Benefits
										</h4>
										<ul className="space-y-2">
											{course.benefits.map(
												(benefit, index) => (
													<li
														key={index}
														className="flex items-start gap-2"
													>
														<TrendingUp className="h-4 w-4 mt-1 text-primary" />
														<span>{benefit}</span>
													</li>
												)
											)}
										</ul>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="curriculum" className="mt-6">
								<Card>
									<CardHeader>
										<CardTitle>Course Curriculum</CardTitle>
										<CardDescription>
											Complete workout breakdown
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-3">
											{course.exercises.map(
												(exercise, index) => (
													<div
														key={index}
														className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
													>
														<div className="flex items-center gap-3">
															<div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
																{index + 1}
															</div>
															<span className="font-medium">
																{exercise.name}
															</span>
														</div>
														<span className="text-sm text-muted-foreground">
															{exercise.duration}
														</span>
													</div>
												)
											)}
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="instructor" className="mt-6">
								<Card>
									<CardHeader>
										<CardTitle>
											Meet Your Instructor
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="flex items-start gap-4">
											<div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-2xl font-bold">
												JS
											</div>
											<div>
												<h3 className="font-semibold text-lg">
													{course.instructor}
												</h3>
												<p className="text-sm text-muted-foreground mt-1">
													Certified fitness trainer
													with over 10 years of
													experience in strength
													training and conditioning.
													Specializes in building
													comprehensive workout
													programs.
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>

					{/* Sidebar */}
					<div className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle className="text-3xl">
									${course.price}
								</CardTitle>
								<CardDescription>
									One-time payment
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<Button
									className="w-full"
									size="lg"
									onClick={() => navigate("/checkout")}
								>
									Enroll Now
								</Button>

								<div className="space-y-3 pt-4 border-t">
									<div className="flex items-center gap-3 text-sm">
										<Clock className="h-4 w-4 text-muted-foreground" />
										<span>{course.duration} minutes</span>
									</div>
									<div className="flex items-center gap-3 text-sm">
										<Users className="h-4 w-4 text-muted-foreground" />
										<span>
											{course.enrolled}/{course.capacity}{" "}
											enrolled
										</span>
									</div>
									<div className="flex items-center gap-3 text-sm">
										<TrendingUp className="h-4 w-4 text-muted-foreground" />
										<Badge variant="secondary">
											{course.difficulty}
										</Badge>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">
									Course Includes
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2 text-sm">
								<div className="flex items-center gap-2">
									<div className="h-1.5 w-1.5 rounded-full bg-primary" />
									<span>Lifetime access</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="h-1.5 w-1.5 rounded-full bg-primary" />
									<span>HD video quality</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="h-1.5 w-1.5 rounded-full bg-primary" />
									<span>Progress tracking</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="h-1.5 w-1.5 rounded-full bg-primary" />
									<span>Certificate of completion</span>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}
