import { Link } from "react-router";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { PlatformOverview } from "../components/PlatformOverview";
import { 
  Brain, 
  BookOpen, 
  Gamepad2, 
  BarChart3, 
  Compass, 
  Target,
  Sparkles,
  Users,
  Heart,
  Lightbulb
} from "lucide-react";

export function Explore() {
  const modules = [
    {
      title: "AI Social Coach",
      description: "Practice understanding social situations with real-world scenarios. Learn what people really mean when they speak.",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      link: "/social-coach",
      features: ["8+ scenarios", "Tone detection", "Response suggestions"],
      forWho: "Children with social communication challenges"
    },
    {
      title: "Hyperfocus Learning Engine",
      description: "Turn your interests into learning opportunities! Math, reading, and activities based on what you love.",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      link: "/learning-engine",
      features: ["6 interest topics", "Personalized content", "Interactive activities"],
      forWho: "All neurodivergent learners"
    },
    {
      title: "Dyslexia Support Games",
      description: "Fun word games, phonetic exercises, and read-aloud practice with visual tracking.",
      icon: Gamepad2,
      color: "from-green-500 to-emerald-500",
      link: "/dyslexia-games",
      features: ["Word scramble", "Phonetic matching", "Read aloud tracking"],
      forWho: "Children with dyslexia & reading challenges"
    },
    {
      title: "Parent Dashboard",
      description: "Track your child's progress, view insights, and get actionable guidance for better support.",
      icon: BarChart3,
      color: "from-orange-500 to-red-500",
      link: "/parent-dashboard",
      features: ["Activity tracking", "Progress insights", "Communication strategies"],
      forWho: "Parents & caregivers"
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: "Personalized Learning",
      description: "Content adapts to each child's interests and needs"
    },
    {
      icon: Heart,
      title: "Built with Care",
      description: "Designed specifically for neurodivergent children"
    },
    {
      icon: Users,
      title: "Family Support",
      description: "Tools for both children and their parents"
    },
    {
      icon: Lightbulb,
      title: "Evidence-Based",
      description: "Based on educational and therapeutic best practices"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Everything You Need in One Place
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Four powerful modules working together to support neurodivergent children and their families
            </p>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Choose Your Path
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each module is designed to address specific challenges and build essential skills
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Card key={module.title} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className={`h-3 bg-gradient-to-r ${module.color}`}></div>
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{module.title}</h3>
                      <p className="text-gray-600 mb-4">{module.description}</p>
                      
                      <div className="mb-4">
                        <Badge variant="outline" className="text-xs">
                          For: {module.forWho}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-sm text-gray-700 mb-3">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {module.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                          <Sparkles className="w-3 h-3 text-purple-600" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link to={module.link}>
                    <Button className={`w-full bg-gradient-to-r ${module.color} hover:opacity-90`}>
                      Start Using This Module
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Benefits Section */}
        <Card className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Why Choose NeuroKids Platform?
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="text-center">
                  <div className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* CTA Section */}
        <Card className="p-8 bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Jump into any module and start exploring! Each one is designed to be fun, engaging, and educational.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/social-coach">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Try Social Coach
              </Button>
            </Link>
            <Link to="/learning">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20">
                Explore Learning
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}