'use client'
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
// import SubmitTestimonialForm from "@/components/SubmitTestimonialForm";

const TestimonialsPage = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 34,
      condition: "Weight Loss Journey",
      rating: 5,
      text: "ThrivBeat completely transformed my approach to fitness. I've lost 30 pounds in 4 months and feel more energetic than ever. The personalized workouts and supportive community made all the difference!",
      image: "/placeholder.svg",
      achievement: "Lost 30 lbs in 4 months"
    },
    {
      id: 2,
      name: "Michael Chen",
      age: 42,
      condition: "Back Pain Recovery",
      rating: 5,
      text: "After years of chronic back pain, ThrivBeat's specialized exercises helped me recover mobility I thought I'd lost forever. The instructors really understand proper form and injury prevention.",
      image: "/placeholder.svg",
      achievement: "Pain-free in 3 months"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      age: 28,
      condition: "Postpartum Fitness",
      rating: 5,
      text: "As a new mom, finding time to exercise was impossible. ThrivBeat's flexible schedule and effective short workouts helped me regain my strength and confidence. Highly recommended!",
      image: "/placeholder.svg",
      achievement: "Regained pre-pregnancy fitness"
    },
    {
      id: 4,
      name: "David Park",
      age: 55,
      condition: "Diabetes Management",
      rating: 5,
      text: "ThrivBeat's holistic approach to health helped me manage my diabetes better than medication alone. The combination of exercise and nutrition guidance has been life-changing.",
      image: "/placeholder.svg",
      achievement: "Improved A1C by 2 points"
    },
    {
      id: 5,
      name: "Jessica Williams",
      age: 31,
      condition: "Anxiety & Stress",
      rating: 5,
      text: "The mind-body connection in ThrivBeat's programs helped me manage my anxiety naturally. The yoga and meditation sessions are exactly what I needed in my daily routine.",
      image: "/placeholder.svg",
      achievement: "Reduced anxiety medication"
    },
    {
      id: 6,
      name: "Robert Taylor",
      age: 48,
      condition: "Heart Health",
      rating: 5,
      text: "My cardiologist recommended regular exercise, and ThrivBeat made it easy and safe. The heart-healthy programs are well-designed and the progress tracking keeps me motivated.",
      image: "/placeholder.svg",
      achievement: "Lowered blood pressure 20 points"
    },
    {
      id: 7,
      name: "Amanda Garcia",
      age: 26,
      condition: "Building Strength",
      rating: 5,
      text: "I never thought I could lift weights, but ThrivBeat's progressive programs made it accessible. I'm now stronger than I've ever been and loving every workout!",
      image: "/placeholder.svg",
      achievement: "Doubled strength in 6 months"
    },
    {
      id: 8,
      name: "James Wilson",
      age: 39,
      condition: "Busy Professional",
      rating: 5,
      text: "With my hectic work schedule, ThrivBeat's 20-minute workouts fit perfectly into my day. No more excuses - I'm in the best shape of my life without spending hours at the gym.",
      image: "/placeholder.svg",
      achievement: "Consistent fitness for 1 year"
    },
    {
      id: 9,
      name: "Lisa Anderson",
      age: 52,
      condition: "Joint Health",
      rating: 5,
      text: "ThrivBeat's low-impact exercises are perfect for my arthritis. I've improved my flexibility and reduced joint pain significantly. The instructors are knowledgeable and caring.",
      image: "/placeholder.svg",
      achievement: "Improved mobility 40%"
    }
  ];

  const stats = [
    { value: "50,000+", label: "Success Stories" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "95%", label: "Would Recommend" },
    { value: "2M+", label: "Workouts Completed" }
  ];

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Real Stories, Real Results
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover how thousands of people have transformed their lives with ThrivBeat. Their success stories could be your story too.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-primary/20 mb-4" />
                    
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </p>

                    {/* Achievement Badge */}
                    <div className="bg-primary/10 rounded-lg p-3 mb-4">
                      <p className="text-sm font-semibold text-primary">
                        ⭐ {testimonial.achievement}
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-3 border-t pt-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={testimonial.image} />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.age} • {testimonial.condition}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Testimonial Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Share Your Experience
            </h2>
            <p className="text-xl text-muted-foreground">
              Have a success story to tell? We'd love to hear from you!
            </p>
          </motion.div>
          {/* <SubmitTestimonialForm /> */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of satisfied members and start your transformation today. Your story could be next!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Start Your Journey
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Plans
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default TestimonialsPage;