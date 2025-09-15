'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      name: "Margaret Thompson",
      age: 67,
      condition: "Post-heart attack recovery",
      rating: 5,
      text: "ThrivBeat gave me the confidence to exercise again after my heart attack. The programs are gentle yet effective, and I feel stronger every day.",
      image: "MT"
    },
    {
      name: "Robert Chen",
      age: 72,
      condition: "Type 2 Diabetes & Hypertension", 
      rating: 5,
      text: "My doctor is amazed at my progress! My blood pressure has improved significantly since starting ThrivBeat's exercise programs.",
      image: "RC"
    },
    {
      name: "Dorothy Williams",
      age: 69,
      condition: "Arthritis Management",
      rating: 5,
      text: "I thought my joint pain would keep me from being active. ThrivBeat's gentle exercises have reduced my stiffness and improved my mobility tremendously.",
      image: "DW"
    },
    {
      name: "Frank Rodriguez",
      age: 74,
      condition: "General Fitness",
      rating: 5,
      text: "At 74, I'm in the best shape I've been in years! The instructors understand our unique needs and make every workout feel achievable.",
      image: "FR"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
									"{testimonials[currentIndex].text}"
								</blockquote>

								{/* Author Info */}
								<div className="flex items-center justify-center space-x-4">
									<div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
										<span className="text-white font-bold text-lg">
											{testimonials[currentIndex].image}
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
				</div>
			</div>
		</section>
  );
};

export default Testimonials;