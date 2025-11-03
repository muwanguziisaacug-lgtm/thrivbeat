"use client";
import React, { useEffect, useState } from "react";
import { getExercises } from "../../lib/exercise-actions";
import { toast } from "sonner";
import Image from "next/image";
import { Clock, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { capitalize } from "@/app/hooks/capitalize";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Exercise = () => {
	const [loading, setLoading] = useState(false);
    const [exercises, setExercises] = useState([]);
    
    const router = useRouter()


	useEffect(() => {
		setLoading(true);
		async function loadExercises() {
			try {
				const response = await getExercises();
				console.log(response);
				if (!response.success)
					toast.error(response.message || "Failed to list Exercises");
				const data = response.exercises;
				setExercises(data);
			} catch {
				setLoading(false);
				toast.error("UnExpected Error Occurred");
			} finally {
				setLoading(false);
			}
		}

		loadExercises();
	}, []);

	console.log(exercises);

	return (
		<div className="mt-20 ">
			<div>
				<div className="grid lg:grid-cols-3 mx-10 gap-4">
					{exercises.map((ex) => (
						<Card
							className="overflow-hidden hover:shadow-lg transition-shadow duration-300 pt-0"
							key={ex.id}
						>
							<div className="relative">
								<motion.img
									src="/bg.jpg"
									alt={ex.title}
									className="w-full h-48 object-cover"
									whileHover={{ scale: 1.05 }}
									transition={{ duration: 0.3 }}
								/>

								<motion.div
									className="absolute top-4 right-4 bg-red-200 bg-opacity-70 text-white  rounded-full text-sm flex items-center"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.4 }}
								>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button>
												<MoreVertical className="w-4 h-4 mr-1" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											align="end"
											className="w-32"
										>
											<DropdownMenuItem className="bg-gray-600 p-2 hover:border-none">
												<Link
													href={`/admin/dashboard/${ex.id}/view`}
												>
													Preview
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem className="bg-gray-600 p-2 hover:border-none">
												<Link
													href={`/admin/dashboard/${ex.id}/edit`}
												>
													Edit
												</Link>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</motion.div>
								<motion.div
									className="absolute top-4 left-4 bg-green-400 font-medium bg-opacity-70 text-white px-4 py-2 rounded-full text-sm flex items-center"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.4 }}
								>
									{/* <Clock className="w-4 h-4 mr-1" /> */}
									{ex.status}
								</motion.div>
								<motion.div
									className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm flex items-center"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.4 }}
								>
									<Clock className="w-4 h-4 mr-1" />
									{ex.duration}
								</motion.div>
								<motion.div
									className="absolute bottom-4 right-4 bg-red-500 bg-opacity-70 text-white px-4 py-2 rounded-full text-sm flex items-center"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.4 }}
								>
									{ex.plan}
								</motion.div>
							</div>

							<CardHeader>
								<CardTitle className="text-lg">
									{capitalize(ex.title)}
								</CardTitle>
								<div className="flex items-center justify-between text-sm text-muted-foreground">
									<span className="bg-gray-100 px-2 py-1 rounded">
										{ex.level}
									</span>
								</div>
							</CardHeader>

							<CardContent>
								<p className="text-muted-foreground mb-4 line-clamp-2">
									{capitalize(ex.description)}
								</p>
								<motion.div
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Button
										className="w-full bg-red-600 hover:bg-red-700 text-white"
										onClick={() =>
											router.push(
												`/admin/dashboard/${ex.id}/edit`
											)
										}
									>
										Edit
									</Button>
								</motion.div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};

export default Exercise;
