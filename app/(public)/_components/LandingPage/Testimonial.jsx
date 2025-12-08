'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials');
        const data = await res.json();
        
        if (data.success && data.testimonials && data.testimonials.length > 0) {
          setTestimonials(data.testimonials);
          setCurrentIndex(0);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
		<section className="py-20 bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold  mb-4">
						Success Stories
					</h2>
					<p className="text-xl text-muted-foreground">
						Hear from our community of thriving members
					</p>
				</div>

				{/* Testimonials Carousel */}
				<div className="relative max-w-4xl mx-auto">
					{loading ? (
						<Card className="shadow-xl border-none bg-background dark:shadow-red-200">
							<CardContent className="p-8 md:p-12">
								<div className="text-center space-y-4">
									<Skeleton className="h-12 w-24 mx-auto" />
									<Skeleton className="h-6 w-64 mx-auto" />
									<Skeleton className="h-24 w-full" />
									<div className="flex justify-center items-center space-x-4 pt-4">
										<Skeleton className="w-16 h-16 rounded-full" />
										<div className="space-y-2">
											<Skeleton className="h-4 w-32" />
											<Skeleton className="h-4 w-48" />
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					) : testimonials.length > 0 ? (
						<>
							<Card className="shadow-xl border-none bg-background dark:shadow-red-200">
								<CardContent className="p-8 md:p-12">
									<div className="text-center">
										{/* Quote Icon */}
										<Quote className="w-12 h-12 text-red-600 mx-auto mb-6 opacity-50" />

										{/* Stars */}
										<div className="flex justify-center mb-6">
											{[
												...Array(
													testimonials[currentIndex].rating
												),
											].map((_, i) => (
												<Star
													key={i}
													className="w-5 h-5 text-yellow-400 fill-current"
												/>
											))}
										</div>

										{/* Testimonial Text */}
										<blockquote className="text-xl md:text-2xl text-foreground   mb-8 leading-relaxed italic">
											"{testimonials[currentIndex].story}"
										</blockquote>

										{/* Author Info */}
										<div className="flex items-center justify-center space-x-4">
											<div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
												<span className="text-white font-bold text-lg">
													{testimonials[currentIndex].name.substring(0, 2).toUpperCase()}
												</span>
											</div>
											<div className="text-left">
												<div className="font-semibold text-foreground text-lg">
													{testimonials[currentIndex].name}
												</div>
												<div className="text-muted-foreground">
													Age {testimonials[currentIndex].age}{" "}
													•{" "}
													{
														testimonials[currentIndex]
															.condition
													}
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Pagination Dots */}
							<div className="flex justify-center mt-8 space-x-2">
								{testimonials.map((_, index) => (
									<button
										key={index}
										className={`w-3 h-3 rounded-full transition-colors duration-200 ${
											index === currentIndex
												? "bg-red-600"
												: "bg-gray-300"
										}`}
										onClick={() => setCurrentIndex(index)}
									/>
								))}
							</div>
						</>
					) : (
						<Card className="shadow-xl border-none bg-background dark:shadow-red-200">
							<CardContent className="p-8 md:p-12">
								<div className="text-center">
									<p className="text-muted-foreground">No testimonials available yet.</p>
								</div>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
			<div className="w-full mt-10 flex justify-center">
				<Button className='bg-red-600 font-medium w-1/4' onClick={() => router.push('/testimonials')}> GET STARTED</Button>
			</div>
		</section>
  );
};

export default Testimonials;