'use client'
import { getExercise } from '@/app/admin/lib/exercise-actions'
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
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
import { Clock, Users, TrendingUp, Play, ArrowLeft, CheckCircle } from "lucide-react";
import Image from "next/image";

const PreviewExercise = () => {
    const [exercise, setExercise ] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
        const [isPlaying, setIsPlaying] = useState(false);
    
        const [steps, setSteps] = useState({
            exercises: [
                { name: "Warm-up", duration: "5 min" },
                { name: "Squats", duration: "10 min" },
                { name: "Push-ups", duration: "8 min" },
                { name: "Lunges", duration: "10 min" },
                { name: "Plank", duration: "7 min" },
                { name: "Cool-down", duration: "5 min" },
            ],
        });
    const { id } = useParams()
    const navigate = useRouter()



    useEffect(() => {
        setLoading(true)
        const loadExercise = async () => {
            try {
                const response = await getExercise(id);

            if (!response.success) toast.error(response.message)
            
            const data = response.exercise
            setExercise(data)
            } catch {
                setLoading(false)
                toast.error('Internal Server Error')
            } finally {
                setLoading(false)
            }
        }
        loadExercise()
    }, [])
  return (
		<div className="min-h-screen bg-background">
			<header className="border-b bg-card sticky top-0 z-10">
				<div className="container mx-auto px-4 py-4">
					<Button variant="ghost" onClick={() => navigate.back()}>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back
					</Button>
				</div>
			</header>

			<main className="container mx-auto px-4 py-8">
				{loading ? (
					<p>Loading..........</p>
				) : error ? (
					<p>{error}</p>
				) : (
					<div className="grid lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2 space-y-6">
							{/* Video Player */}
							<Card>
								<CardContent className="p-0">
									<div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
										{!isPlaying ? (
											<>
												{exercise?.thumbnailKey ? (
													<Image
														src={exercise.thumbnailKey}
														width={300}
														height={300}
														alt={exercise?.title}
														className="w-full h-full object-cover"
													/>
												) : null}
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

							{/* exercise Details Tabs */}
							<Tabs defaultValue="overview" className="w-full">
								<TabsList className="grid w-full grid-cols-3">
									<TabsTrigger value="overview">
										Overview
									</TabsTrigger>
									<TabsTrigger value="curriculum">
										Steps
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
											<CardTitle>
												About This exercise
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-muted-foreground mb-4">
												{exercise?.description}
											</p>
										</CardContent>
									</Card>
								</TabsContent>

								<TabsContent value="steps" className="mt-6">
									<Card>
										<CardHeader>
											<CardTitle>
												Exercise Steps
											</CardTitle>
											<CardDescription>
												Complete workout breakdown
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="space-y-3">
												{steps?.exercises.map(
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
																	{
																		exercise.name
																	}
																</span>
															</div>
															{/* <span className="text-sm text-muted-foreground">
																{
																	exercise.duration
																}
															</span> */}
														</div>
													)
												)}
											</div>
										</CardContent>
									</Card>
								</TabsContent>

								<TabsContent
									value="instructor"
									className="mt-6"
								>
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
														{/* {exercise.instructor} */}
														Sharon Jakisa
													</h3>
													<p className="text-sm text-muted-foreground mt-1">
														Certified fitness
														trainer with over 10
														years of experience in
														strength training and
														conditioning.
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
								{/* if not subscribed on not signed in */}
								<CardHeader>
									<CardTitle>
										<Button className="w-full ">
											🎉🎉 Enjoy Your Exercise
										</Button>
									</CardTitle>
								</CardHeader>
								<CardContent className="flex flex-col gap-4">
									<div>
										<h2 className="text-xl font-medium ">
											What you will get
										</h2>
										<ul className="flex flex-col gap-2 mt-2 text-sm ">
											<li className="text-muted-foreground">
												Build overall body strength
											</li>
											<li className="text-muted-foreground">
												Improve cardiovascular health
											</li>
											<li className="text-muted-foreground">
												Increase flexibility and
												mobility
											</li>
											<li className="text-muted-foreground">
												Boost metabolism
											</li>
										</ul>
									</div>

									<div>
										<h2 className="text-xl font-medium ">
											Steps to Follow
										</h2>
										<ul className="flex flex-col gap-2 mt-4 text-sm ">
											<li className="text-muted-foreground flex items-center gap-1">
												<CheckCircle className="size-4 text-green-600" />
												Build overall body strength
											</li>
											<li className="text-muted-foreground flex items-center gap-1">
												<CheckCircle className="size-4 text-green-600" />
												Improve cardiovascular health
											</li>
											<li className="text-muted-foreground flex items-center gap-1">
												<CheckCircle className="size-4 text-green-600" />
												Increase flexibility and
												mobility
											</li>
											<li className="text-muted-foreground flex items-center gap-1">
												<CheckCircle className="size-4 text-green-600" />
												Boost metabolism
											</li>
										</ul>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				)}
			</main>
		</div>
  );
}

export default PreviewExercise