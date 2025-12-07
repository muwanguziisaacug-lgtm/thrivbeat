'use client'
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
// import SubmitTestimonialForm from "@/components/SubmitTestimonialForm";

const TestimonialsPage = () => {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials');
        const data = await res.json();
        
        if (data.success && data.testimonials) {
          setTestimonials(data.testimonials);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);


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

        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20  lg:px-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            ) : testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Quote className="w-8 h-8 text-yellow-500/20 mb-4 fill-yellow-500" />
                      
                      {/* Rating */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        "{testimonial.story}"
                      </p>

                      {/* Achievement Badge */}
                      <div className="bg-primary/10 rounded-lg p-3 mb-4">
                        <p className="text-sm font-semibold text-primary">
                          ⭐ {testimonial.achievemnt}
                        </p>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center gap-3 border-t pt-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>{testimonial.name?.[0] || 'U'}</AvatarFallback>
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
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No testimonials yet. Be the first to share your story!</p>
              </div>
            )}
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
              <Button size="lg" className="text-lg px-8 bg-red-600" onClick={() => router.push('/testimonials/submit-form')}>
                Start Your Journey
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => router.push('/pricing')}>
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