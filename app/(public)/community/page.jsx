"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, Heart, TrendingUp, Award, Calendar, Play, Camera, Video } from "lucide-react";
import Image from "next/image";

const Community = () => {
  const stats = [
    { icon: Users, label: "Active Members", value: "10,000+" },
    { icon: MessageCircle, label: "Discussions", value: "50,000+" },
    { icon: Heart, label: "Success Stories", value: "5,000+" },
    { icon: Award, label: "Achievements", value: "100,000+" }
  ];

  // Deterministic trending topics + counts to avoid SSR/CSR hydration mismatches
  const trendingTopics = [
    "Weight Loss Tips",
    "Home Workouts",
    "Meal Prep Ideas",
    "Yoga Challenges",
    "Running Motivation",
  ];
  const trendingCounts = trendingTopics.map((_, i) => ((i + 1) * 137 + 23) % 1000);



  const [events, setEvents] = useState([]);
  const [featuredMembers, setFeaturedMembers] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);


  async function fetchCommunityData() {
    try {
      setLoading(true);
      const res = await fetch('/api/community/data');
      const json = await res.json();

      if (json?.success) {
        // map returned records to the shapes the UI expects
        setEvents((json.events || []).map(ev => ({
          id: ev.id,
          title: ev.title,
          date: ev.date,
          time: ev.time,
          participants: ev.participants || 0,
          image: ev.imageUrl || ev.image || null,
        })));

        setFeaturedMembers((json.featuredMembers || []).map(m => ({
          id: m.id,
          name: m.name,
          image: m.imageUrl || m.image || null,
          badge: m.badge,
        })));

        setGalleryImages((json.gallery || []).map(g => ({
          id: g.id,
          url: g.imageUrl,
          caption: g.caption,
          category: g.category,
        })));
      }
    } catch (err) {
      console.error('fetchCommunityData error', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCommunityData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section with Video Background */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920&h=800&fit=crop"
            alt="Community workout"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
              Join Our Thriving Community
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Connect with thousands of members on their fitness journey. Share experiences, get support, and achieve your goals together.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Join the Community
              </Button>
            </div> */}
          </motion.div>
        </div>
      </section>

      {/* Featured Members Carousel */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Featured Community Members</h2>
          <div className="flex justify-center gap-6 flex-wrap">
            {featuredMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-3">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-primary shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                    <Badge className="text-xs whitespace-nowrap">{member.badge}</Badge>
                  </div>
                </div>
                <p className="font-semibold text-foreground text-sm mt-4">{member.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Photo Gallery */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Camera className="w-6 h-6 text-primary" />
              Community Gallery
            </h2>
            <Button variant="outline" size="sm">
              View All Photos
            </Button>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {galleryImages.map((g) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 1 * 0.05 }}
                className="aspect-square rounded-lg overflow-hidden group cursor-pointer relative"
              >
                <Image
                  src={g.url}
                  fill
                  alt={`Community photo `}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold text-foreground mb-6">Community Activities</h2>

            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden py-0">
                  <div className="relative h-48 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-primary-foreground">
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      <p className="text-sm opacity-90">{event.date} at {event.time}</p>
                    </div>
                  </div>
                  {/* <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{event.participants} interested</span>
                      </div>
                      <Button size="sm">Join Event</Button>
                    </div>
                  </CardContent> */}
                </Card>
              </motion.div>
            ))}
          </div>

          <aside className="space-y-6">
            {/* <Card className="overflow-hidden">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=220&fit=crop" alt="Featured video" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <motion.div whileHover={{ scale: 1.1 }} className="w-14 h-14 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg">
                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                  </motion.div>
                </div>
                <Badge className="absolute top-3 left-3 bg-red-600">
                  <Video className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold text-foreground">Morning Yoga Session</h4>
                <p className="text-sm text-muted-foreground">Join our live workout stream</p>
              </CardContent>
            </Card> */}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" />Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.map((event, index) => (
                  <div key={index} className="flex gap-3 pb-4 border-b last:border-0 last:pb-0">
                    <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0"><img src={event.image} alt={event.title} className="w-full h-full object-cover" /></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground text-sm truncate">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">{event.date} at {event.time}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Users className="w-3 h-3" />{event.participants} interested</p>
                    </div>
                  </div>
                ))}
                {/* <Button className="w-full" variant="outline">View All Events</Button> */}
              </CardContent>
            </Card>

            {/* <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" />Trending Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between py-2 hover:bg-accent rounded-md px-2 cursor-pointer transition-colors">
                      <span className="text-foreground">{topic}</span>
                      <Badge variant="secondary">{trendingCounts[index]}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}

            {/* <Card className="bg-primary/5">
              <CardHeader><CardTitle>Community Guidelines</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Be respectful and supportive</p>
                <p>• Share constructive feedback</p>
                <p>• No spam or self-promotion</p>
                <p>• Keep content appropriate</p>
                <Button variant="link" className="p-0 h-auto text-primary">Read Full Guidelines</Button>
              </CardContent>
            </Card> */}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Community;