"use client"
import React, { useEffect, useState } from "react";
import { Play, Clock, CheckCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { fetchExercises } from "@/app/actions/public-actions";
import { toast } from "sonner";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname, useRouter } from "next/navigation";

export default function ExercisesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
	if (!pathname || pathname !== "/exercise") return;
	let mounted = true;
	const loadExercises = async () => {
	  setLoading(true);
	  try {
		const response = await fetchExercises();
		if (!response.success) {
		  toast.error(response.message || "Failed to load exercises");
		  return;
		}
		if (mounted) setExercises(response.allCourses || []);
	  } catch (err) {
		console.error(err);
		toast.error("Failed to load exercises");
	  } finally {
		if (mounted) setLoading(false);
	  }
	};
	loadExercises();
	return () => {
	  mounted = false;
	};
  }, [pathname]);

  const categories = [
	{ id: "all", name: "All exercises" },
	{ id: "cardio", name: "Cardio" },
	{ id: "strength", name: "Strength" },
	{ id: "flexibility", name: "Flexibility" },
	{ id: "balance", name: "Balance" },
  ];

  const filteredExercises = exercises
	.filter((exercise) => {
	  if (!exercise) return false;
	  if (activeCategory === "all") return true;
	  return (exercise.category || "").toLowerCase() === (activeCategory || "").toLowerCase();
	})
	.filter((exercise) => {
	  if (!query) return true;
	  const q = query.toLowerCase();
	  return (
		(exercise.title || "").toLowerCase().includes(q) ||
		(exercise.description || "").toLowerCase().includes(q)
	  );
	});

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const itemVariants = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };

  return (
	<div className="min-h-screen bg-background text-foreground">
	  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<motion.div className="text-center mb-12" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
		  <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Exercise Library</h1>
		  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Access your personalized collection of safe, expert-guided exercise videos designed specifically for mature adults managing chronic conditions.</p>
		</motion.div>

		<div className="my-6">
		  <Input placeholder="Search here" value={query} onChange={(e) => setQuery(e.target.value)} className="p-7 w-3/6 mx-auto text-[1.2rem] font-medium outline-gray-800 " />
		</div>

		<motion.div className="flex flex-wrap justify-center gap-4 mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
		  {categories.map((category, index) => (
			<motion.div key={category.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
			  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
				<Button
				  variant={activeCategory === category.id ? "default" : "outline"}
				  onClick={() => setActiveCategory(category.id)}
				  className={activeCategory === category.id ? "bg-red-600 hover:bg-red-700 text-white" : "border-red-600 text-red-600 hover:text-white"}
				>
				  {category.name}
				</Button>
			  </motion.div>
			</motion.div>
		  ))}
		</motion.div>

		{loading ? (
		  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{Array.from({ length: 6 }).map((_, i) => (
			  <div key={`skeleton-${i}`}>
				<Card className="overflow-hidden">
				  <div className="relative">
					<div className="w-full h-48 bg-muted rounded-md overflow-hidden">
					  <Skeleton className="w-full h-full" />
					</div>
					<div className="absolute bottom-4 left-4">
					  <Skeleton className="h-6 w-20 rounded-full" />
					</div>
				  </div>

				  <CardHeader>
					<CardTitle className="text-lg">
					  <Skeleton className="h-6 w-40" />
					</CardTitle>
					<div className="flex items-center justify-between text-sm text-muted-foreground">
					  <Skeleton className="h-5 w-16 rounded" />
					</div>
				  </CardHeader>

									<CardContent>
										<div className="text-muted-foreground mb-4 line-clamp-2">
											<Skeleton className="h-4 w-full mb-2" />
											<Skeleton className="h-4 w-3/4" />
										</div>
										<Skeleton className="h-10 w-full rounded-md" />
									</CardContent>
				</Card>
			  </div>
			))}
		  </div>
		) : (
		  <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" animate="visible">
			<AnimatePresence>
			  {filteredExercises.map((exercise) => (
				<motion.div key={exercise.id} variants={itemVariants} initial="hidden" animate="visible" transition={{ duration: 0.35 }}>
				  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
					<div className="relative">
					  <img src={exercise.thumbnailKey || exercise.thumbnail} alt={exercise.title} className="w-full h-48 object-cover" />
					  {exercise.isLocked && (
						<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
						  <Lock className="w-8 h-8 text-white" />
						</div>
					  )}
					  {exercise.completed && !exercise.isLocked && (
						<div className="absolute top-4 right-4 bg-green-600 rounded-full p-2">
						  <CheckCircle className="w-4 h-4 text-white" />
						</div>
					  )}
					  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center">
						<Clock className="w-4 h-4 mr-1" />
						{exercise.duration}
					  </div>
					</div>

					<CardHeader>
					  <CardTitle className="text-lg">{exercise.title}</CardTitle>
					  <div className="flex items-center justify-between text-sm text-muted-foreground">
						<span className="bg-gray-100 px-2 py-1 rounded">{exercise.level}</span>
					  </div>
					</CardHeader>

					<CardContent>
					  <p className="text-muted-foreground mb-4 line-clamp-2">{exercise.description}</p>

					  <div>
						{exercise.isLocked ? (
						  <Button
							className="w-full bg-yellow-600 text-white"
							onClick={async () => {
							  try {
								const res = await fetch('/api/auth/status');
								const json = await res.json();
								if (!json?.success) router.push(`/login?next=/pricing`);
								else router.push('/pricing');
							  } catch (err) {
								console.error(err);
								router.push('/pricing');
							  }
							}}
						  >
							<Lock className="w-4 h-4 mr-2" /> Upgrade to Access
						  </Button>
						) : (
						  <Link href={`/exercise/${exercise.id}/view`}>
							<Button className="w-full bg-red-600 hover:bg-red-700 text-white">
							  <Play className="w-4 h-4 mr-2" />
							  {exercise.completed ? 'Watch Again' : 'Start Exercise'}
							</Button>
						  </Link>
						)}
					  </div>
					</CardContent>
				  </Card>
				</motion.div>
			  ))}
			</AnimatePresence>
		  </motion.div>
		)}
{/* 
		<motion.div className="mt-16 bg-background rounded-2xl p-8" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
		  <h3 className="text-2xl font-bold mb-6 text-center">Your Progress</h3>
		  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
			{[{ icon: CheckCircle, value: '1', label: 'Exercises Completed', color: 'text-red-600' }, { icon: Clock, value: '20', label: 'Minutes Exercised', color: 'text-red-600' }, { icon: Play, value: exercises.length, label: 'Available exercises', color: 'text-red-600' }].map((stat, index) => (
			  <div key={index} className="text-center">
				<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><stat.icon className={`w-8 h-8 ${stat.color}`} /></div>
				<h4 className="text-xl font-semibold">{stat.value}</h4>
				<p className="text-muted-foreground">{stat.label}</p>
			  </div>
			))}
		  </div>
		</motion.div> */}
	  </div>
	</div>
  );
}
