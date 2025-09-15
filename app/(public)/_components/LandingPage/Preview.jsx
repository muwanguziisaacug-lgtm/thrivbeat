
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Clock, Users, Target } from "lucide-react";

const PreviewSection = () => {
  return (
		<section className="py-20 bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Experience ThrivBeat Today
					</h2>
					<p className="text-xl text-muted-foreground">
						Get a taste of our gentle, effective exercise programs
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Video Preview */}
					<div className="relative">
						<Card className="overflow-hidden shadow-2xl">
							<div className="relative bg-gradient-to-br from-red-100 to-red-200 h-80 flex items-center justify-center">
								<Button
									size="lg"
									className="bg-white text-red-600 hover:bg-gray-50 rounded-full w-20 h-20 shadow-lg"
								>
									<Play className="w-8 h-8 ml-1" />
								</Button>

								{/* Video Overlay Info */}
								<div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded-lg">
									<div className="flex items-center space-x-2">
										<Clock className="w-4 h-4" />
										<span className="text-sm">
											12 min • Gentle Cardio
										</span>
									</div>
								</div>
							</div>
						</Card>

						<div className="mt-6 text-center">
							<h3 className="text-xl font-semibold  mb-2">
								Free Sample: Chair-Based Cardio
							</h3>
							<p className="text-muted-foreground">
								Perfect for beginners or those with mobility
								limitations
							</p>
						</div>
					</div>

					{/* Features & Benefits */}
					<div className="space-y-8">
						<div>
							<h3 className="text-2xl font-bold  mb-6">
								What You'll Get Access To:
							</h3>
						</div>

						<div className="space-y-4">
							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
									<Target className="w-6 h-6 text-red-600" />
								</div>
								<div>
									<h4 className="font-semibold  mb-1">
										50+ Targeted Exercise Videos
									</h4>
									<p className="text-muted-foreground">
										From gentle stretching to strength
										building, all designed for your safety
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
									<Users className="w-6 h-6 text-red-600" />
								</div>
								<div>
									<h4 className="font-semibold mb-1">
										Expert Instruction
									</h4>
									<p className="text-muted-foreground">
										Certified trainers specializing in
										mature adult fitness and chronic
										conditions
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
									<Clock className="w-6 h-6 text-red-600" />
								</div>
								<div>
									<h4 className="font-semibold mb-1">
										Flexible Scheduling
									</h4>
									<p className="text-muted-foreground">
										Exercise at your own pace, on your
										schedule, from the comfort of home
									</p>
								</div>
							</div>
						</div>

						<div className="pt-6">
							<Button className="bg-red-600 hover:bg-red-700 text-lg px-8 py-3 text-white cursor-pointer">
								Start Your Free Trial
							</Button>
							<p className="text-sm text-muted-foreground mt-2">
								No commitment • Cancel anytime • 7-day free
								trial
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
  );
};

export default PreviewSection;