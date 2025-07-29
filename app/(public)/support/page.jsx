'use client'
import { useState } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageCircle,
  Search,
  Book,
  Video,
  CreditCard,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";


const Support = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqData = [
    {
      category: "Getting Started",
      icon: Book,
      questions: [
        {
          question: "How do I sign up for ThrivBeat?",
          answer: "Simply click 'Subscribe Now' on our homepage, choose your plan, and complete the secure checkout process. You'll receive instant access to your dashboard and can start exercising right away!"
        },
        {
          question: "What equipment do I need?",
          answer: "Most of our exercises require no equipment at all! Some routines may use a sturdy chair, light weights (or water bottles), or a yoga mat. We always provide alternatives for every exercise."
        },
        {
          question: "How often should I exercise?",
          answer: "We recommend starting with 2-3 sessions per week and gradually increasing as you feel comfortable. Our programs are designed to be gentle and progressive, perfect for building consistency."
        }
      ]
    },
    {
      category: "Video & Technical",
      icon: Video,
      questions: [
        {
          question: "Why won't my videos play?",
          answer: "First, check your internet connection. If the issue persists, try refreshing your browser or clearing your cache. For mobile users, ensure you have the latest app version installed."
        },
        {
          question: "Can I download videos for offline viewing?",
          answer: "Currently, our videos are streaming-only to ensure you always have access to the latest content and safety updates. However, you can access them anytime with an internet connection."
        },
        {
          question: "What if the video quality is poor?",
          answer: "Video quality automatically adjusts based on your internet speed. For better quality, ensure you have a stable connection and try closing other applications that might be using bandwidth."
        }
      ]
    },
    {
      category: "Health & Safety",
      icon: HelpCircle,
      questions: [
        {
          question: "Are these exercises safe for my condition?",
          answer: "Our exercises are specifically designed for mature adults with chronic conditions. However, we always recommend consulting with your healthcare provider before starting any new exercise program, especially if you have specific health concerns."
        },
        {
          question: "What if I feel pain during exercise?",
          answer: "Stop immediately if you feel any pain. Our motto is 'listen to your body.' Every exercise includes modifications, and you should never push through pain. When in doubt, consult your healthcare provider."
        },
        {
          question: "Can I modify the exercises?",
          answer: "Absolutely! Every routine includes multiple modification options. Our instructors demonstrate seated alternatives, reduced intensity versions, and adaptations for different mobility levels."
        }
      ]
    },
    {
      category: "Billing & Account",
      icon: CreditCard,
      questions: [
        {
          question: "How do I cancel my subscription?",
          answer: "You can cancel anytime from your account settings or by contacting our support team. Your access will continue until the end of your current billing period."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards and PayPal. All payments are processed securely through encrypted connections."
        },
        {
          question: "Can I get a refund?",
          answer: "We offer a 7-day free trial, and if you're not satisfied within the first 30 days, we'll provide a full refund. Contact our support team to process your refund request."
        }
      ]
    }
  ];

  const filteredFaqs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How Can We Help?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Find answers to common questions or reach out to our support team. 
              We're here to ensure your fitness journey is smooth and successful.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>

          {/* Quick Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Speak directly with our support team
                </p>
                <Button variant="outline" className="border-red-600 text-red-600">
                  1-800-THRIVBEAT
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get detailed help via email
                </p>
                <Button variant="outline" className="border-red-600 text-red-600">
                  support@thrivbeat.com
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">WhatsApp Chat</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Quick questions? Chat instantly
                </p>
                <Button className="bg-green-600 hover:bg-green-700">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>

            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No results found for "{searchTerm}". Try a different search term or contact our support team.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredFaqs.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <category.icon className="w-6 h-6 text-red-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {category.category}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {category.questions.map((faq, faqIndex) => {
                        const globalIndex = categoryIndex * 100 + faqIndex;
                        return (
                          <Card key={faqIndex} className="shadow-sm">
                            <CardHeader>
                              <button
                                className="flex items-center justify-between w-full text-left"
                                onClick={() => toggleFaq(globalIndex)}
                              >
                                <CardTitle className="text-lg font-medium text-gray-900">
                                  {faq.question}
                                </CardTitle>
                                {openFaq === globalIndex ? (
                                  <ChevronUp className="w-5 h-5 text-gray-500" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-gray-500" />
                                )}
                              </button>
                            </CardHeader>
                            {openFaq === globalIndex && (
                              <CardContent className="pt-0">
                                <p className="text-gray-700 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </CardContent>
                            )}
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Still Need Help Section */}
          <div className="mt-16">
            <Card className="bg-red-50 border-red-200 shadow-lg">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Still Need Help?
                </h3>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  Can't find what you're looking for? Our friendly support team is standing by 
                  to help you get the most out of your ThrivBeat experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-red-600 hover:bg-red-700">
                    Contact Support
                  </Button>
                  <Button variant="outline" className="border-red-600 text-red-600">
                    Schedule a Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;