"use client";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
const Hero = () => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
		},
	};

	return (
		<section className="bg-transparent relative h-[50vh] md:h-screen text-foreground">
			<div className="absolute inset-0 -z-50">
				<div className="absolute inset-0 z-10 hero-video-blur"></div>
				<video src="/video-bg.mp4" muted loop autoPlay ></video>
			</div>
			<div className="grid place-content-center">
				<div className="max-w-4xl mt-10 lg:mt-32 h-full">
					{/* Content */}
					<motion.div
						className="text-center lg:text-left"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						<motion.h1
							className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-center"
							variants={itemVariants}
							transition={{ duration: 0.6 }}
						>
							Get Fit{" "}
							<span className="text-red-600">for You</span>
						</motion.h1>
						<motion.p
							className=" text-base lg:text-xl text-white leading-relaxed max-w-3xl text-center p-3 lg:mt-10"
							variants={itemVariants}
							transition={{ duration: 0.6 }}
						>
							ThrivBeat empowers mature adults with safe, guided
							exercise programs designed to support
							chronic-condition recovery and lifelong heart
							health.
						</motion.p>

						{/* Key Benefits */}
						{/* <motion.div
							className="mt-8 space-y-4 w-52 mx-auto"
							variants={itemVariants}
							transition={{ duration: 0.6 }}
						>
							{[
								{
									icon: Heart,
									text: "Heart-healthy exercise programs",
								},
								{
									icon: Shield,
									text: "Safe for chronic conditions",
								},
								{ icon: Users, text: "Expert-guided routines" },
							].map((benefit, index) => (
								<motion.div
									key={index}
									className="flex items-center justify-center lg:justify-start space-x-3"
									whileHover={{ scale: 1.05, x: 10 }}
									transition={{ duration: 0.2 }}
								>
									<benefit.icon className="w-5 h-5 text-red-600" />
									<span className="text-white">
										{benefit.text}
									</span>
								</motion.div>
							))}
						</motion.div> */}

						{/* CTA Buttons */}
						<motion.div
                            className=" mt-5 
                            lg:mt-20 flex flex-col sm:flex-row gap-4 justify-center lg:justify-evenly"
							variants={itemVariants}
							transition={{ duration: 0.6 }}
						>
							<Link href="/shop">
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									transition={{ duration: 0.2 }}
								>
									<Button
										size="lg"
										className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-3"
									>
										Start Your Journey
									</Button>
								</motion.div>
							</Link>
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								transition={{ duration: 0.2 }}
							>
								<Button
									size="lg"
									variant="outline"
									className="border-red-600 text-red-600 hover:text-red-600 bg-transparent text-lg px-8 py-3"
								>
									Watch Demo
								</Button>
							</motion.div>
						</motion.div>
					</motion.div>

					{/* Hero Image */}
					{/* <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-red-100 to-red-200 rounded-2xl h-96 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <motion.div 
                  className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Heart className="w-12 h-12 text-white fill-current" />
                </motion.div>
                <p className="text-red-800 font-semibold">Safe • Effective • Supportive</p>
              </div>
            </motion.div>
            
  
            <motion.div 
              className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Shield className="w-6 h-6 text-red-600" />
            </motion.div>
            <motion.div 
              className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg"
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -10, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1.5
              }}
            >
              <Users className="w-6 h-6 text-red-600" />
            </motion.div>
          </motion.div> */}
				</div>
			</div>
		</section>
	);
};

export default Hero;
