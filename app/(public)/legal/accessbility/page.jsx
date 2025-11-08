'use client'
import { motion } from "framer-motion";
import { Eye, Keyboard, Volume2, MousePointer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Accessibility = () => {
  const features = [
    {
      icon: Eye,
      title: "Visual Accessibility",
      items: [
        "High contrast mode support",
        "Adjustable text sizes",
        "Screen reader compatibility",
        "Clear visual hierarchy",
        "Alt text for all images"
      ]
    },
    {
      icon: Keyboard,
      title: "Keyboard Navigation",
      items: [
        "Full keyboard accessibility",
        "Tab order optimization",
        "Skip to content links",
        "Keyboard shortcuts",
        "Focus indicators"
      ]
    },
    {
      icon: Volume2,
      title: "Audio & Video",
      items: [
        "Closed captions available",
        "Transcripts provided",
        "Audio descriptions",
        "Adjustable playback speed",
        "Volume controls"
      ]
    },
    {
      icon: MousePointer,
      title: "Interactive Elements",
      items: [
        "Large clickable areas",
        "Clear button labels",
        "Error prevention",
        "Consistent navigation",
        "Form validation"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 max-w-6xl"
      >
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Accessibility Statement</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

          <div className="space-y-6 text-muted-foreground">
            <p className="leading-relaxed">
              ThrivBeat is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>
            <p className="leading-relaxed">
              We strive to conform to Level AA of the Web Content Accessibility Guidelines (WCAG) 2.1. These guidelines explain how to make web content more accessible for people with disabilities and user-friendly for everyone.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Commitment</h2>
            <p className="text-muted-foreground leading-relaxed">
              We believe that everyone deserves equal access to health and fitness resources. Our accessibility efforts include regular audits, user testing with assistive technologies, and continuous improvements based on user feedback.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Assistive Technology Compatibility</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our website is designed to be compatible with the following assistive technologies:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Screen readers (JAWS, NVDA, VoiceOver)</li>
              <li>Voice recognition software</li>
              <li>Screen magnification tools</li>
              <li>Alternative input devices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Known Limitations</h2>
            <p className="text-muted-foreground leading-relaxed">
              Despite our efforts, some content may not yet be fully accessible. We are actively working to address these limitations and appreciate your patience as we continue to improve.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Feedback</h2>
            <p className="text-muted-foreground leading-relaxed">
              We welcome your feedback on the accessibility of ThrivBeat. If you encounter any accessibility barriers or have suggestions for improvement, please contact us at accessibility@thrivbeat.com. We aim to respond to accessibility feedback within 3 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Content</h2>
            <p className="text-muted-foreground leading-relaxed">
              Some content on our platform may be provided by third parties. While we encourage our partners to maintain accessibility standards, we may not have control over the accessibility of all third-party content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Continuous Improvement</h2>
            <p className="text-muted-foreground leading-relaxed">
              Accessibility is an ongoing effort. We regularly review our website and update our practices to ensure we meet or exceed accessibility standards. This statement will be updated as we make improvements to our platform.
            </p>
          </section>
        </div>
      </motion.main>
    </div>
  );
};

export default Accessibility;