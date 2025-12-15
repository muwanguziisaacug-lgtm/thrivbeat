'use client'
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Target, Users, Award, Play, Shield, Clock, Sparkles, CheckCircle2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ServicesComponent from "./Services";

const About = () => {

  const router = useRouter();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/community/data');
        const data = await res.json();
        if (data && data.gallery) {
          setGallery(data.gallery.slice(0, 6));
        }
      } catch (err) {
      } finally {
        setGalleryLoading(false);
      }
    };

    fetchGallery();
  }, []);
  const features = [
    {
      icon: Heart,
      title: "Heart-Centered Approach",
      description: "Every exercise is designed with cardiovascular health in mind, perfect for post-heart attack recovery and ongoing heart wellness.",
      image: "/01.jpg"
    },
    {
      icon: Target,
      title: "Condition-Specific Programs",
      description: "Tailored routines for managing hypertension, type 2 diabetes, arthritis, and other chronic conditions with safety as our priority.",
      image: "/02.jpg"
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Led by certified fitness professionals who specialize in mature adult health and chronic condition management.",
      image: "/03.jpg"
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Join thousands of adults who have improved their strength, mobility, and confidence through our programs.",
      image: "/04.jpg"
    }
  ];



  const values = [
    { icon: Shield, title: "Safety First", description: "Every exercise is designed with your safety and comfort in mind" },
    { icon: Clock, title: "At Your Pace", description: "Progress through programs at the speed that works for you" },
    { icon: Sparkles, title: "Quality Content", description: "Professional-grade videos with clear, easy-to-follow instructions" },
    { icon: Heart, title: "Compassionate Care", description: "We understand the unique challenges of managing chronic conditions" }
  ];


  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 ">
          <Image
            src="/05.jpg"
            fill
            alt="ThrivBeat fitness"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              About ThrivBeat
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              Empowering mature adults to reclaim their health, strength, and vitality through safe, 
              expert-guided exercise programs designed for those managing chronic conditions.
            </p>
            <div className="flex flex-wrap justify-evenly gap-4 w-full mx-auto">
              <Button size="lg" variant="secondary" className="text-lg px-8" onClick={ () => router.push('/exercise')}>
                Start Your Journey
              </Button>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Mission Section */}
      <section className="py-20 px-5 lg:px-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At ThrivBeat, we believe that age is just a number and chronic conditions don't have 
                to define your limits. Our mission is to provide accessible, safe, and effective 
                exercise programs that help mature adults build strength, improve cardiovascular 
                health, and enhance overall well-being.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We understand the unique challenges faced by those managing heart disease, 
                hypertension, type 2 diabetes, arthritis, and other conditions. That's why every 
                program is crafted with care by medical professionals and certified fitness experts.
              </p>
              <ul className="space-y-3">
                {["Safe exercises for chronic conditions", "Expert-led video programs", "Community support", "Personalized progress tracking"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src={"/ceo.jpg"}
                alt="Fitness training"
                className="rounded-2xl shadow-2xl object-cover"
              />
              {/* <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">Years Experience</div>
              </div> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              See ThrivBeat in Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch how our programs have transformed lives and discover what makes ThrivBeat different.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer max-w-5xl mx-auto"
            onClick={() => setIsVideoOpen(true)}
          >
            <img
              src="/trhivbeatsimage.jpg"
              alt="ThrivBeat exercise program preview"
              className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center shadow-lg mb-4"
              >
                <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" />
              </motion.div>
              <p className="text-white text-xl md:text-2xl font-semibold">Watch Our Story</p>
              <p className="text-white/80 text-sm md:text-base mt-2">See real transformations from our members</p>
            </div>
          </motion.div>
        </div>

        {/* Video Modal */}
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
            >
              <video
                autoPlay
                controls
                className="w-full h-full"
              >
                <source src="/thrivbeatsabout.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </section>

      <ServicesComponent />

      {/* Features Grid */}
      <section className="py-20 lg:px-20  ">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose ThrivBeat?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We understand the unique fitness needs of mature adults managing chronic conditions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group h-full">
                  <div className="relative h-[350px]  overflow-hidden">
                    <Image
                      src={feature.image}
                      width={200}
                      height={200}
                      alt={feature.title}
                      className="w-full h-full object-cover  transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Our Core Values
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-primary-foreground mb-2">{value.title}</h3>
                <p className="text-primary-foreground/80">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-20 lg:px-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our team of medical professionals and certified fitness experts are dedicated to your success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-4 mx-auto w-48 h-48 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Gallery Section */}
      <section className="py-20 bg-muted/30 lg:px-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Programs in Action
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryLoading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="relative group overflow-hidden rounded-xl aspect-[4/3] bg-muted/10"
                  >
                    <div className="w-full h-full animate-pulse bg-muted/20" />
                  </motion.div>
                ))
              : gallery.length > 0
              ? gallery.map((image, index) => (
                  <motion.div
                    key={image.id || index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative group overflow-hidden rounded-xl aspect-[4/3]"
                  >
                    <img
                      src={image.imageUrl}
                      alt={image.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="font-semibold text-sm md:text-base">{image.caption}</p>
                    </div>
                  </motion.div>
                ))
              : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No gallery items found.</p>
                </div>
              )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-12 md:p-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
              Join thousands of members who have transformed their health with ThrivBeat's 
              expert-guided exercise programs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 bg-red-600 text-white font-medium">
                Get Started Today
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;