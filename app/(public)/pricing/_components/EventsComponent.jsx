import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Armchair, Calendar, Check, Users } from 'lucide-react'
import React from 'react'

const EventsComponent = () => {
  return (
        <div className="mb-16 mt-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Group & Event Services
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Chair-Based Exercise Classes */}
              <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Armchair className="w-8 h-8 text-primary" />
                  </div>
                  <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                    Ideal for Care Homes
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Chair-Based Exercise Classes
                  </CardTitle>
                  <p className="text-gray-600 mt-2">
                    Weekly group sessions perfect for care homes, community centers, and residential facilities.
                  </p>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-primary">£5</div>
                    <div className="text-gray-600">per person</div>
                  </div>
                  <ul className="space-y-3 mb-6 text-left">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Weekly recurring sessions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Safe chair-based exercises</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Professional instructor visits your location</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Suitable for all mobility levels</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    Enquire About Classes
                  </Button>
                </CardContent>
              </Card>

              {/* Event Booking */}
              <Card className="border-2 border-secondary/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <div className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                    One-Off Events
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Event Booking
                  </CardTitle>
                  <p className="text-gray-600 mt-2">
                    Book our instructors for wellness events, barbecues, team building, and community gatherings.
                  </p>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-gray-900">£35 - £70</div>
                    <div className="text-gray-600">per event</div>
                  </div>
                  <ul className="space-y-3 mb-6 text-left">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Wellness & fitness events</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Barbecues & outdoor activities</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Corporate team building</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Community gatherings</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    Request a Quote
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

  )
}

export default EventsComponent