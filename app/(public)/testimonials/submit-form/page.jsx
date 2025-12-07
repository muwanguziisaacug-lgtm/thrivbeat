'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SubmitTestimonialForm = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [condition, setCondition] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [achievement, setAchievement] = useState("");

  const [form, setForm ] = useState({
    name: '',
    email: '',
    age: '',
    condition: '',
    achievement: '',
    story: '',
    rating: 0
  });

  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/testimonials/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || 'Failed to submit')
        return;
      }

      toast.success(data.message || 'Thanks for your support')
      // Reset form
      setForm({
        name: '',
        email: '',
        age: '',
        condition: '',
        achievement: '',
        story: '',
        rating: 0
      });
      setTimeout(() => {
        router.push('/testimonials')
      }, 1500);
      
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('UnExpected Error Occurred')
    }
    
  };

  return (
    <Card className="max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl text-red-600">Share Your Success Story</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="space-y-2">
            <Label>Your Rating *</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  onClick={() => setForm({...form, rating: star})}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="focus:outline-none "
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </motion.button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground">
                You rated {form.rating} out of 5 stars
              </p>
            )}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Your Email *</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              placeholder="john@example.com"
              required
            />
          </div>

          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={form.age}
              onChange={(e) => setForm({...form, age: e.target.value})}
              placeholder="35"
              min="1"
              max="120"
            />
          </div>
          
          {/* Condition/Goal */}
          <div className="space-y-2">
            <Label htmlFor="condition">Your Fitness Goal or Condition</Label>
            <Input
              id="condition"
              value={form.condition}
              onChange={(e) => setForm({...form, condition: e.target.value})}
              placeholder="Weight Loss Journey"
            />
          </div>

          {/* Achievement */}
          <div className="space-y-2">
            <Label htmlFor="achievement">Your Achievement</Label>
            <Input
              id="achievement"
              value={form.achievement}
              onChange={(e) => setForm({...form, achievement: e.target.value})}
              placeholder="Lost 30 lbs in 4 months"
            />
          </div>

          {/* Testimonial */}
          <div className="space-y-2">
            <Label htmlFor="testimonial">Your Story *</Label>
            <Textarea
              id="testimonial"
              value={form.testimonial}
              onChange={(e) => setForm({...form, story: e.target.value})}
              placeholder="Share your experience with ThrivBeat..."
              className="min-h-[120px]"
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" size="lg" className="w-full bg-red-600 hover:bg-red-700">
            Submit Testimonial
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SubmitTestimonialForm;