import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, Settings, Users, Lightbulb, Calendar, Star, 
  Zap, Target, Award, Clock, TrendingUp, CheckCircle,
  ArrowRight, Download, Upload, FileText, Image, Globe,
  Brain, Rocket, Shield, Heart, MessageSquare, Phone
} from 'lucide-react';

const DetailedServiceShowcase: React.FC = () => {
  const [activeService, setActiveService] = useState('academic');

  const services = {
    academic: {
      title: "Academic Resources & Support",
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      description: "Comprehensive academic support including books, papers, and study materials",
      features: [
        {
          icon: <BookOpen className="w-6 h-6" />,
          title: "Book Request Service",
          description: "Request any academic book or study material",
          stats: "95% success rate, 24-48 hour delivery",
          benefits: ["Free PDF downloads", "Physical book delivery", "International titles", "Latest editions"]
        },
        {
          icon: <FileText className="w-6 h-6" />,
          title: "Research Papers",
          description: "Access to millions of research papers and journals",
          stats: "10M+ papers, 500+ journals",
          benefits: ["IEEE papers", "Springer content", "Research gate access", "Citation tools"]
        },
        {
          icon: <Target className="w-6 h-6" />,
          title: "Study Materials",
          description: "Curated study materials for all subjects",
          stats: "50K+ materials, 200+ universities",
          benefits: ["Subject-wise notes", "Previous year papers", "Solution manuals", "Video lectures"]
        },
        {
          icon: <Award className="w-6 h-6" />,
          title: "Academic Consultation",
          description: "One-on-one guidance from academic experts",
          stats: "PhD consultants, 90% satisfaction",
          benefits: ["Research guidance", "Thesis support", "Publication help", "Career advice"]
        }
      ],
      pricing: {
        free: ["Basic book requests", "Limited downloads", "Community access"],
        premium: ["Unlimited requests", "Priority delivery", "Expert consultation", "Advanced tools"]
      },
      testimonials: [
        { name: "Priya Sharma", course: "PhD Computer Science", text: "Got my thesis references within hours!" },
        { name: "Rahul Kumar", course: "Engineering", text: "Incredible collection of textbooks and papers." }
      ]
    },
    technical: {
      title: "Technical Support & Tools",
      icon: <Settings className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      description: "Technical assistance and powerful online tools for students",
      features: [
        {
          icon: <Settings className="w-6 h-6" />,
          title: "Website Technical Support",
          description: "Help with website issues and bug reports",
          stats: "< 2 hour response, 99% resolution",
          benefits: ["Bug fixes", "Feature requests", "Account issues", "Data recovery"]
        },
        {
          icon: <Zap className="w-6 h-6" />,
          title: "PDF Tools Suite",
          description: "30+ professional PDF manipulation tools",
          stats: "5M+ files processed monthly",
          benefits: ["Merge & split", "Compress & optimize", "Convert formats", "Add security"]
        },
        {
          icon: <Image className="w-6 h-6" />,
          title: "Image Processing",
          description: "Advanced image editing and conversion tools",
          stats: "10+ formats, AI-powered",
          benefits: ["Resize & crop", "Format conversion", "Background removal", "OCR extraction"]
        },
        {
          icon: <Brain className="w-6 h-6" />,
          title: "AI Study Tools",
          description: "AI-powered study assistance and planning",
          stats: "Machine learning algorithms",
          benefits: ["Study planner", "Smart flashcards", "Progress tracking", "Personalized tips"]
        }
      ],
      pricing: {
        free: ["Basic tools", "Standard quality", "Limited usage"],
        premium: ["Advanced features", "High quality", "Unlimited usage", "API access"]
      },
      testimonials: [
        { name: "Alex Johnson", course: "Data Science", text: "The AI study planner changed my learning approach!" },
        { name: "Sarah Lee", course: "Design", text: "PDF tools saved me hours of work daily." }
      ]
    },
    community: {
      title: "Community & Networking",
      icon: <Users className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      description: "Connect with fellow students and join study communities",
      features: [
        {
          icon: <Users className="w-6 h-6" />,
          title: "Study Groups",
          description: "Join subject-specific study groups",
          stats: "500+ active groups, 50K+ members",
          benefits: ["Subject groups", "University groups", "Exam preparation", "Project collaboration"]
        },
        {
          icon: <MessageSquare className="w-6 h-6" />,
          title: "Discussion Forums",
          description: "Ask questions and share knowledge",
          stats: "10K+ daily messages",
          benefits: ["Q&A sections", "Expert answers", "Peer support", "Knowledge sharing"]
        },
        {
          icon: <Calendar className="w-6 h-6" />,
          title: "Virtual Events",
          description: "Attend webinars and study sessions",
          stats: "100+ events monthly",
          benefits: ["Expert sessions", "Skill workshops", "Career guidance", "Networking events"]
        },
        {
          icon: <Award className="w-6 h-6" />,
          title: "Mentorship Program",
          description: "Get guidance from senior students and professionals",
          stats: "1000+ mentors available",
          benefits: ["Career guidance", "Skill development", "Industry insights", "Personal growth"]
        }
      ],
      pricing: {
        free: ["Basic group access", "Limited events", "Community support"],
        premium: ["All groups", "Premium events", "Direct mentorship", "Priority support"]
      },
      testimonials: [
        { name: "Mike Chen", course: "MBA", text: "Found amazing study partners and mentors!" },
        { name: "Lisa Wong", course: "Medicine", text: "The community helped me through tough times." }
      ]
    },
    innovation: {
      title: "Innovation & Future Features",
      icon: <Lightbulb className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
      description: "Cutting-edge features and future educational technology",
      features: [
        {
          icon: <Brain className="w-6 h-6" />,
          title: "AI-Powered Learning",
          description: "Personalized learning paths with AI",
          stats: "Machine learning algorithms",
          benefits: ["Adaptive learning", "Progress prediction", "Weak area identification", "Custom recommendations"]
        },
        {
          icon: <Globe className="w-6 h-6" />,
          title: "Global University Network",
          description: "Connect with universities worldwide",
          stats: "200+ partner universities",
          benefits: ["Exchange programs", "International courses", "Global networking", "Cultural exchange"]
        },
        {
          icon: <Rocket className="w-6 h-6" />,
          title: "VR/AR Learning",
          description: "Immersive learning experiences",
          stats: "Beta testing phase",
          benefits: ["Virtual labs", "3D visualizations", "Interactive models", "Simulation training"]
        },
        {
          icon: <TrendingUp className="w-6 h-6" />,
          title: "Analytics Dashboard",
          description: "Detailed learning analytics and insights",
          stats: "Real-time tracking",
          benefits: ["Performance metrics", "Time tracking", "Goal setting", "Progress reports"]
        }
      ],
      pricing: {
        free: ["Basic analytics", "Limited AI features", "Community feedback"],
        premium: ["Full analytics", "Advanced AI", "Beta access", "Priority features"]
      },
      testimonials: [
        { name: "David Park", course: "AI Research", text: "The AI features are incredibly advanced!" },
        { name: "Emma Taylor", course: "Engineering", text: "VR labs make complex concepts so clear." }
      ]
    }
  };

  const currentService = services[activeService as keyof typeof services];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background via-background-secondary to-background-tertiary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center space-y-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl">
              <Rocket className="h-8 w-8 text-white" />
            </div>
            <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
              Comprehensive Services
            </Badge>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold gradient-text">Our Complete Service Portfolio</h2>
          <p className="text-xl text-foreground-secondary max-w-4xl mx-auto">
            Discover our full range of services designed to support every aspect of your educational journey
          </p>
        </motion.div>

        {/* Service Tabs */}
        <Tabs value={activeService} onValueChange={setActiveService} className="space-y-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent h-auto p-0">
            {Object.entries(services).map(([key, service]) => (
              <TabsTrigger
                key={key}
                value={key}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 data-[state=active]:border-primary data-[state=active]:bg-gradient-to-r ${service.color}/10 ${
                  activeService === key ? 'border-primary shadow-lg' : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${service.color} text-white`}>
                    {service.icon}
                  </div>
                  <span className="font-semibold text-sm">{service.title}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <TabsContent value={activeService} className="space-y-12">
                {/* Service Header */}
                <Card className="glassmorphism border-2 border-primary/30">
                  <CardHeader className="text-center">
                    <div className={`inline-flex p-6 rounded-3xl bg-gradient-to-r ${currentService.color} text-white shadow-2xl mb-6`}>
                      {currentService.icon}
                    </div>
                    <CardTitle className="text-4xl font-bold gradient-text">{currentService.title}</CardTitle>
                    <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
                      {currentService.description}
                    </p>
                  </CardHeader>
                </Card>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {currentService.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="glassmorphism h-full transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 border-transparent hover:border-primary/30">
                        <CardContent className="p-8 space-y-6">
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-r ${currentService.color} text-white`}>
                              {feature.icon}
                            </div>
                            <div>
                              <h4 className="text-xl font-bold">{feature.title}</h4>
                              <p className="text-sm text-foreground-secondary">{feature.description}</p>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-background/30 rounded-lg">
                            <p className="text-sm font-semibold text-primary">{feature.stats}</p>
                          </div>

                          <div className="space-y-2">
                            <h5 className="font-semibold">Key Benefits:</h5>
                            <div className="grid grid-cols-2 gap-2">
                              {feature.benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                  <span className="text-sm">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Button className="w-full btn-hero">
                            Learn More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Pricing Comparison */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Card className="glassmorphism border-2 border-border">
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">Free Plan</CardTitle>
                      <p className="text-foreground-secondary">Essential features to get started</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {currentService.pricing.free.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full mt-6">
                        Get Started Free
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="glassmorphism border-2 border-primary/50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent"></div>
                    <CardHeader className="text-center">
                      <Badge className="mb-2 bg-gradient-to-r from-primary to-accent text-white">Most Popular</Badge>
                      <CardTitle className="text-2xl">Premium Plan</CardTitle>
                      <p className="text-foreground-secondary">Full access to all features</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {currentService.pricing.premium.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      <Button className="w-full btn-hero mt-6">
                        Upgrade to Premium
                        <Star className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Testimonials */}
                <motion.div 
                  className="space-y-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <h3 className="text-3xl font-bold gradient-text text-center">What Students Say</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentService.testimonials.map((testimonial, index) => (
                      <Card key={index} className="glassmorphism">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="text-3xl">👨‍🎓</div>
                            <div className="space-y-2">
                              <p className="text-foreground-secondary italic">"{testimonial.text}"</p>
                              <div>
                                <p className="font-semibold">{testimonial.name}</p>
                                <p className="text-sm text-foreground-secondary">{testimonial.course}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="glassmorphism border-2 border-primary/30 p-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold gradient-text">Ready to Get Started?</h3>
              <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
                Join over 100,000 students who are already using our services to excel in their academic journey
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="btn-hero px-8 py-3">
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Your Journey
                </Button>
                <Button variant="outline" className="px-8 py-3">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact Support
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DetailedServiceShowcase;