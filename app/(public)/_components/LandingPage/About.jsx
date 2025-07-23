
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, Award } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Heart,
      title: "Heart-Centered Approach",
      description: "Every exercise is designed with cardiovascular health in mind, perfect for post-heart attack recovery and ongoing heart wellness."
    },
    {
      icon: Target,
      title: "Condition-Specific Programs",
      description: "Tailored routines for managing hypertension, type 2 diabetes, arthritis, and other chronic conditions with safety as our priority."
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Led by certified fitness professionals who specialize in mature adult health and chronic condition management."
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Join thousands of adults who have improved their strength, mobility, and confidence through our programs."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose ThrivBeat?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We understand the unique fitness needs of mature adults. Our mission is to help you 
            regain strength, improve mobility, and enhance your quality of life through safe, 
            effective exercise programs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h3>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              At ThrivBeat, we believe that age is just a number and chronic conditions don't have 
              to define your limits. Our carefully crafted exercise programs are designed to help 
              mature adults build strength, improve cardiovascular health, and enhance overall 
              well-being in a safe, supportive environment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;