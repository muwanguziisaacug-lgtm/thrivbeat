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

const SubmitTestimonialForm = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [condition, setCondition] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [achievement, setAchievement] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!rating) {
      toast({
        title: "Please select a rating",
        variant: "destructive",
      });
      return;
    }

    // Mock submission
    toast({
      title: "Thank you for your testimonial!",
      description: "Your feedback has been submitted successfully.",
    });

    // Reset form
    setRating(0);
    setName("");
    setAge("");
    setCondition("");
    setTestimonial("");
    setAchievement("");
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Share Your Success Story</CardTitle>
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
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </motion.button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground">
                You rated {rating} out of 5 stars
              </p>
            )}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>

          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
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
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="Weight Loss Journey"
            />
          </div>

          {/* Achievement */}
          <div className="space-y-2">
            <Label htmlFor="achievement">Your Achievement</Label>
            <Input
              id="achievement"
              value={achievement}
              onChange={(e) => setAchievement(e.target.value)}
              placeholder="Lost 30 lbs in 4 months"
            />
          </div>

          {/* Testimonial */}
          <div className="space-y-2">
            <Label htmlFor="testimonial">Your Story *</Label>
            <Textarea
              id="testimonial"
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
              placeholder="Share your experience with ThrivBeat..."
              className="min-h-[120px]"
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" size="lg" className="w-full">
            Submit Testimonial
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SubmitTestimonialForm;