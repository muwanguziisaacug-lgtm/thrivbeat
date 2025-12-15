import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
const ServicesComponent = () => {
  return (
    <section className="py-20 lg:px-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our range of specialized fitness services designed to
            support your health journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sports Massage */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group h-full">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop"
                  alt="Sports Massage"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white">
                    Sports Massage
                  </h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Professional sports massage therapy to help relieve muscle
                  tension, improve circulation, and accelerate recovery. Perfect
                  for managing chronic pain and enhancing mobility.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Deep tissue therapy
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Injury recovery support
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Improved flexibility
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Community Chair Exercises */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group h-full">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="/trhivbeatsimage.jpg"
                  alt="Chair Exercises"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white">
                    Community Chair Exercises
                  </h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Low-impact seated exercises designed for all ability levels.
                  Build strength, improve balance, and boost cardiovascular
                  health from the comfort of a chair.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Safe for limited mobility
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Community group sessions
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Expert-led classes
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Aerobic Exercises */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group h-full">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="/aerobic.jpeg"
                  alt="Aerobic Exercises"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white">
                    Aerobic Exercises
                  </h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Heart-healthy aerobic workouts tailored for mature adults.
                  Improve your cardiovascular fitness with guided
                  low-to-moderate intensity routines.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Heart health focus
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Adaptable intensity
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Fun group environment
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesComponent;
