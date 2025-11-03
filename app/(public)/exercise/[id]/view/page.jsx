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
import { Clock, Users, TrendingUp, Play, ArrowLeft, CheckCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { getExercise, getSubscriptionStatus } from "@/app/actions/public-actions";
import { toast } from "sonner";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

	export default function ExerciseViewPage() {
		const { id } = useParams();
		const navigate = useRouter();
		const [isPlaying, setIsPlaying] = useState(false);
		const [videoSrc, setVideoSrc] = useState(null);
		const [videoLoading, setVideoLoading] = useState(false);
		const [loading, setIsLoading] = useState(false);
		const [error, setError] = useState(null);
		const [exercise, setExercise] = useState();
		const [subscription, setSubscription] = useState(null);
		const [showDialog, setShowDialog] = useState(false);


		console.log(exercise)

		// Router helper for redirects (use the existing `navigate` instance)

		const handleUpgrade = async () => {
			try {
				const res = await fetch('/api/auth/status');
				const json = await res.json();
				if (!json?.success) {
					// not logged in -> send to login, preserve next
					navigate.push(`/login?next=/pricing`);
					return;
				}
				// logged in -> go to pricing
				navigate.push('/pricing');
			} catch (err) {
				console.error('handleUpgrade error', err);
				navigate.push('/pricing');
			}
		};

		useEffect(() => {
			setIsLoading(true);
			const loadExercise = async () => {
				try {
					const response = await getExercise(id);
					if (!response.success) {
						setIsLoading(false);
						setError(response.message);
						toast.error(response.message);
						return;
					}
					setExercise(response.exercise);
				} catch {
					setIsLoading(false);
					setError("UnExpected Error Occurred Try Again");
					toast.error("UnExpected Error Occurred Try Again");
				} finally {
					setIsLoading(false);
				}
			};
			const loadSubscription = async () => {
				try {
					const sub = await getSubscriptionStatus();
					setSubscription(sub.success);
				} catch {
					setSubscription(false);
				}
			};
			loadExercise();
			loadSubscription();
		}, [id]);

		// when playback is requested, fetch signed video url (if needed)
		useEffect(() => {
			if (!isPlaying) return;
			// already have src
			if (videoSrc) return;

			// if exercise.videoKey is already a full public URL, use it directly
			if (exercise?.videoKey && /^https?:\/\//i.test(exercise.videoKey)) {
				setVideoSrc(exercise.videoKey);
				setVideoLoading(false);
				return;
			}
			const fetchVideo = async () => {
				setVideoLoading(true);
				try {
					const res = await fetch('/api/s3/video-url', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ exerciseId: id }),
						// include cookies so server-side session check can read them
						credentials: 'include',
					});

					// try to parse JSON, but be resilient to non-JSON error bodies
					let json = null;
					try {
						json = await res.json().catch(() => null);
					} catch (parseErr) {
						json = null;
					}

					if (!res.ok) {
						// try to extract a helpful body string for logging
						let bodyText = null;
						if (json) bodyText = JSON.stringify(json);
						else {
							try { bodyText = await res.text(); } catch (e) { bodyText = null; }
						}
						console.error('video-url fetch failed', { status: res.status, statusText: res.statusText, body: bodyText });

						const errMsg = (json && json.error) || (bodyText && bodyText.toString()) || 'Failed to get video url';
						if (typeof errMsg === 'string' && errMsg.includes('Not authenticated')) {
							navigate.push(`/login?next=/pricing`);
							return;
						}
						if (typeof errMsg === 'string' && errMsg.includes('Not subscribed')) {
							navigate.push('/pricing');
							return;
						}
						throw new Error(errMsg);
					}

					if (!json || !json.url) {
						console.error('video-url: missing url in response', { status: res.status, body: json });
						throw new Error('No url returned from server');
					}

					setVideoSrc(json.url);
				} catch (err) {
					console.error('fetchVideo error', err);
					setIsPlaying(false);
					toast.error('Unable to play video.');
				} finally {
					setVideoLoading(false);
				}
			};
			fetchVideo();
		}, [isPlaying, id, videoSrc, navigate]);

		const isLocked = exercise?.plan === "PREMIUM" && !subscription;

		let stepsArr = [];
		if (exercise?.steps) {
			if (Array.isArray(exercise.steps)) stepsArr = exercise.steps;
			else if (typeof exercise.steps === "string") {
				try { stepsArr = JSON.parse(exercise.steps); } catch { stepsArr = []; }
			}
		}
		let benefitsArr = [];
		if (exercise?.benefits) {
			if (Array.isArray(exercise.benefits)) benefitsArr = exercise.benefits;
			else if (typeof exercise.benefits === "string") {
				try { benefitsArr = JSON.parse(exercise.benefits); } catch { benefitsArr = []; }
			}
		}

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
																				alt={exercise?.title || "Exercise thumbnail"}
																				className="w-full h-full object-cover"
																			/>
																		) : null}
																		<div className="absolute inset-0 flex items-center justify-center bg-black/40">
																			<Button
																				size="lg"
																				className="rounded-full h-16 w-16"
																				onClick={() => (isLocked ? handleUpgrade() : setIsPlaying(true))}
																			>
																				<Play className="h-8 w-8" />
																			</Button>
																		</div>
																	</>
																) : (
																	<div className="w-full h-full flex items-center justify-center">
																			{isLocked ? (
																				<div className="flex flex-col items-center justify-center w-full h-full">
																					<p className="text-lg font-semibold mb-4">Upgrade to access this video</p>
																					<Dialog open={showDialog} onOpenChange={setShowDialog}>
																						<DialogContent>
																							<DialogHeader>
																								<DialogTitle>Upgrade Required</DialogTitle>
																							</DialogHeader>
																							<p className="mb-4">This is a premium exercise. Please upgrade your subscription to access the video.</p>
																							<Button className="w-full" onClick={handleUpgrade}>Upgrade Now</Button>
																						</DialogContent>
																					</Dialog>
																				</div>
																			) : (
																			videoLoading ? (
																				<div className="flex items-center justify-center w-full h-full">Loading video...</div>
																			) : (
																				( exercise?.videoKey) ? (
																					<video
																						src={videoSrc || exercise.videoKey}
																						controls
																						autoPlay
																						playsInline
																						className="w-full h-full object-cover rounded-t-lg"
																					/>
																				) : null
																			)
																		)}
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
										<TabsTrigger value="steps">
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
													About This Exercise
												</CardTitle>
											</CardHeader>
											<CardContent>
												<p className="text-muted-foreground mb-4">
													{exercise?.description}
												</p>
												<div className="flex flex-wrap gap-2 mb-2">
													<Badge>{exercise?.level}</Badge>
													<Badge>{exercise?.category}</Badge>
													<Badge>{exercise?.plan}</Badge>
													{exercise?.duration && <Badge><Clock className="inline w-4 h-4 mr-1" />{exercise.duration} min</Badge>}
												</div>
												{benefitsArr.length > 0 && (
													<>
														<h4 className="font-semibold mt-4 mb-2">Benefits</h4>
														<ul className="list-disc ml-6 text-muted-foreground">
															{benefitsArr.map((b, i) => (
																<li key={i}>{b}</li>
															))}
														</ul>
													</>
												)}
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
												{isLocked ? (
													<div className="flex flex-col items-center justify-center py-8">
														<p className="mb-4 text-lg font-semibold">Upgrade to view steps</p>
														<Button onClick={handleUpgrade}>Upgrade Now</Button>
													</div>
												) : (
													<div className="space-y-3">
														{stepsArr.length > 0 ? stepsArr.map((step, index) => (
															<div
																key={index}
																className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
															>
																<div className="flex items-center gap-3">
																	<div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
																		{index + 1}
																	</div>
																	<span className="font-medium">
																		{typeof step === "string" ? step : step.name || JSON.stringify(step)}
																	</span>
																</div>
															</div>
														)) : <p className="text-muted-foreground">No steps provided.</p>}
													</div>
												)}
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
														{exercise?.instructor?.[0] || "I"}
													</div>
													<div>
														<h3 className="font-semibold text-lg">
															{exercise?.instructor || "Sharon Jakisa"}
														</h3>
														<p className="text-sm text-muted-foreground mt-1">
															Certified fitness trainer with over 10 years of experience in strength training and conditioning. Specializes in building comprehensive workout programs.
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
										<CardTitle>
											{isLocked ? (
												<Button className="w-full" onClick={handleUpgrade}>
													Upgrade to Access
												</Button>
											) : (
												<span className="text-green-600 font-semibold">You have access</span>
											)}
										</CardTitle>
										</CardHeader>
									<CardContent className="flex flex-col gap-4">
										<div>
											<h2 className="text-xl font-medium ">
												What you will get
											</h2>
											<ul className="flex flex-col gap-2 mt-2 text-sm ">
												{benefitsArr.length > 0 ? benefitsArr.map((b, i) => (
													<li className="text-muted-foreground" key={i}>{b}</li>
												)) : <li className="text-muted-foreground">No benefits listed.</li>}
											</ul>
										</div>
									</CardContent>
								</Card>
							</div>
							{/* Upgrade Dialog */}
							<Dialog open={showDialog} onOpenChange={setShowDialog}>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Upgrade Required</DialogTitle>
									</DialogHeader>
									<p className="mb-4">This is a premium exercise. Please upgrade your subscription to access all content.</p>
									<Button className="w-full">Upgrade Now</Button>
								</DialogContent>
							</Dialog>
						</div>
					)}
				</main>
			</div>
		);
	}
// ...existing code...
