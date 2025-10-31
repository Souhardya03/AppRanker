import {
  Building2,
  Target,
  Users,
  Award,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

      {/* Main content */}
      <div className="h-full w-full flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 h-full max-h-[900px]">
          {/* Left column - Main intro */}
          <Card className="lg:col-span-2 p-6 md:p-8 bg-white/80 backdrop-blur-sm border-none shadow-xl flex flex-col justify-between overflow-hidden">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4 md:mb-6">
                <Sparkles className="w-4 h-4" />
                About Us
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
                Crafting Digital
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}
                  Excellence
                </span>
              </h1>

              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                We're a passionate team dedicated to building innovative
                solutions that transform businesses and delight users. With
                expertise spanning design, development, and strategy, we turn
                ambitious ideas into reality.
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="text-center p-3 md:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                    500+
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Projects
                  </div>
                </div>
                <div className="text-center p-3 md:p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                  <div className="text-2xl md:text-3xl font-bold text-indigo-600 mb-1">
                    50+
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Clients
                  </div>
                </div>
                <div className="text-center p-3 md:p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">
                    8+
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">Years</div>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex-1">
                Get In Touch
              </Button>
              <Button variant="outline" className="flex-1 border-gray-300">
                View Portfolio
              </Button>
            </div>
          </Card>

          {/* Right column - Features & Contact */}
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Values cards */}
            <Card className="p-4 md:p-6 bg-white/80 backdrop-blur-sm border-none shadow-xl flex-1">
              <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-gray-900">
                Our Values
              </h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm md:text-base text-gray-900">
                      Innovation First
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600">
                      Pushing boundaries daily
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm md:text-base text-gray-900">
                      Team Spirit
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600">
                      Collaboration is key
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm md:text-base text-gray-900">
                      Excellence
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600">
                      Quality in every detail
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact card */}
            <Card className="p-4 md:p-6 bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-none shadow-xl">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <Building2 className="w-5 h-5" />
                <h3 className="text-base md:text-lg font-semibold">Contact</h3>
              </div>
              <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                <div className="flex items-center gap-2 opacity-90">
                  <Mail className="w-4 h-4" />
                  <span>hello@company.com</span>
                </div>
                <div className="flex items-center gap-2 opacity-90">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 opacity-90">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}