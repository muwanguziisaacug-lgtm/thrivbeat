'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Armchair, PartyPopper, MapPin, Clock, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { submitBookingRequest } from "@/app/actions/public-actions";


const BookingServices = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    groupSize: "",
    preferredDate: "",
    location: "",
    message: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitBookingRequest(formData);

      if (result.success) {
        toast.success("Booking Request Submitted", {
          description: "We'll get back to you within 24-48 hours to confirm your booking."
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceType: "",
          groupSize: "",
          preferredDate: "",
          location: "",
          message: "",
        });
      } else {
        toast.error("Error", {
          description: result.message || "Failed to submit booking request. Please try again.",
        });
      }
    } catch (error) {
      console.error("Booking submission error:", error);
      toast.error("Error", {
        description: "Failed to submit booking request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Book Group & Event Services
              </h1>
              <p className="text-lg text-muted-foreground">
                Bring wellness to your care home, community center, or special event. 
                Our experienced instructors deliver tailored sessions for all abilities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="h-full border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Armchair className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Chair-Based Classes</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-3xl font-bold text-primary mb-2">£5 <span className="text-sm font-normal text-muted-foreground">per person</span></p>
                    <p className="text-muted-foreground text-sm mb-4">Weekly recurring sessions</p>
                    <ul className="text-sm text-muted-foreground space-y-2 text-left">
                      <li className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        Ideal for care homes & residential facilities
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        45-60 minute sessions
                      </li>
                      <li className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        We come to your location
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="h-full border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <PartyPopper className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Event Booking</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-3xl font-bold text-primary mb-2">£35-£70 <span className="text-sm font-normal text-muted-foreground">per event</span></p>
                    <p className="text-muted-foreground text-sm mb-4">One-off special occasions</p>
                    <ul className="text-sm text-muted-foreground space-y-2 text-left">
                      <li className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        Wellness events & barbecues
                      </li>
                      <li className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        Corporate & community gatherings
                      </li>
                      <li className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Available across Scotland
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Request a Booking</CardTitle>
                  <p className="text-muted-foreground text-center">
                    Fill out the form below and we'll get back to you within 24-48 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Service Type */}
                    <div className="space-y-3">
                      <Label>Service Type *</Label>
                      <RadioGroup
                        value={formData.serviceType}
                        onValueChange={(value) => handleInputChange("serviceType", value)}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="chair-classes" id="chair-classes" />
                          <Label htmlFor="chair-classes" className="cursor-pointer">
                            Chair-Based Classes (£5/person)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="event-booking" id="event-booking" />
                          <Label htmlFor="event-booking" className="cursor-pointer">
                            Event Booking (£35-£70)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Contact Details */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="Your phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="groupSize">Estimated Group Size *</Label>
                        <Select
                          value={formData.groupSize}
                          onValueChange={(value) => handleInputChange("groupSize", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select group size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5-10">5-10 people</SelectItem>
                            <SelectItem value="10-20">10-20 people</SelectItem>
                            <SelectItem value="20-30">20-30 people</SelectItem>
                            <SelectItem value="30+">30+ people</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="preferredDate">Preferred Date</Label>
                        <Input
                          id="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location (Scotland) *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          placeholder="City or area"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Details</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us more about your requirements, venue type, any special needs..."
                        rows={4}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-red-600"
                      size="lg"
                      disabled={isSubmitting || !formData.serviceType || !formData.name || !formData.email || !formData.location}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">Prefer to speak with us directly?</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a href="tel:+441onal" className="flex items-center justify-center gap-2 text-primary hover:underline">
                    <Phone className="w-4 h-4" />
                    Call us
                  </a>
                  <a href="mailto:info@thrivbeat.com" className="flex items-center justify-center gap-2 text-primary hover:underline">
                    <Mail className="w-4 h-4" />
                    info@thrivbeat.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default BookingServices;