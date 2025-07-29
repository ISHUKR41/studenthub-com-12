import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { Tilt } from 'react-tilt';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, MessageSquare, Phone, MapPin, Clock, Star,
  ExternalLink, CheckCircle, Zap, Users, Globe,
  Shield, Heart, Award, Calendar, MessageCircle
} from 'lucide-react';

interface ContactMethod {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  action: string;
  href: string;
  stats: string;
  availability: string;
  responseTime: string;
  color: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
  advantages: string[];
  bestFor: string[];
}

const ContactMethodsGrid: React.FC = () => {
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null);

  const contactMethods: ContactMethod[] = [
    {
      icon: <Mail className="w-12 h-12" />,
      title: "📧 Email Support",
      subtitle: "Professional & Detailed Help",
      description: "Get comprehensive assistance with detailed responses from our expert support team. Perfect for complex queries that require documentation and follow-up.",
      features: [
        "24-48 hour detailed response",
        "File attachments supported", 
        "Follow-up guaranteed",
        "Expert team review",
        "Detailed troubleshooting guides",
        "Priority escalation available"
      ],
      action: "Send Email",
      href: "mailto:ishu_2312res305@iitp.ac.in",
      stats: "5,000+ emails resolved",
      availability: "24/7 Email Processing",
      responseTime: "< 24 hours",
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20", 
      glowColor: "shadow-blue-500/30",
      advantages: [
        "Perfect for complex technical issues",
        "Detailed documentation provided",
        "Permanent record for future reference",
        "Can attach screenshots/files",
        "No time restrictions"
      ],
      bestFor: [
        "Technical troubleshooting",
        "Account-related issues", 
        "Feature requests",
        "Bug reports",
        "Academic guidance"
      ]
    },
    {
      icon: <MessageSquare className="w-12 h-12" />,
      title: "💬 Live Chat & Forms",
      subtitle: "Instant Response System",
      description: "Connect through our smart form system for real-time assistance and quick problem solving with immediate notifications and smart routing.",
      features: [
        "Instant form processing",
        "Smart categorization",
        "Priority handling", 
        "Multi-language support",
        "Auto-routing to experts",
        "Real-time status updates"
      ],
      action: "Start Conversation",
      href: "https://docs.google.com/forms/d/e/1FAIpQLSczWJI6cXslwpNgayBkuH0pnKfCZx0weAYi2lbnkLLpb76Myg/viewform",
      stats: "15,000+ queries resolved",
      availability: "24/7 Form Processing",
      responseTime: "< 2 hours",
      color: "from-green-500 to-emerald-700",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      glowColor: "shadow-green-500/30",
      advantages: [
        "Fastest response time",
        "AI-powered query routing",
        "Structured problem solving",
        "Progress tracking available",
        "Mobile-optimized interface"
      ],
      bestFor: [
        "Quick questions",
        "General support",
        "Book requests",
        "Platform navigation help",
        "Emergency assistance"
      ]
    },
    {
      icon: <Phone className="w-12 h-12" />,
      title: "📞 Phone Support", 
      subtitle: "Direct Voice Assistance",
      description: "Call us directly for urgent matters and get immediate voice support from our experienced team members with real-time problem solving.",
      features: [
        "Direct voice support",
        "Emergency assistance line",
        "Technical troubleshooting",
        "Academic guidance",
        "Screen sharing available",
        "Callback option available"
      ],
      action: "Call Now",
      href: "tel:+917541024846",
      stats: "2,000+ calls handled",
      availability: "Mon-Fri 9AM-6PM IST",
      responseTime: "Immediate",
      color: "from-orange-500 to-red-700",
      bgColor: "bg-orange-500/10", 
      borderColor: "border-orange-500/20",
      glowColor: "shadow-orange-500/30",
      advantages: [
        "Immediate human interaction",
        "Real-time problem solving",
        "Personal touch and empathy", 
        "Complex issue resolution",
        "Emergency support available"
      ],
      bestFor: [
        "Urgent technical issues",
        "Account recovery",
        "Payment problems",
        "Emergency support",
        "Complex troubleshooting"
      ]
    }
  ];

  const springProps = useSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(50px)' },
    config: { tension: 200, friction: 25 }
  });

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center space-y-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">
            Multiple Ways to Reach Us
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Choose your preferred communication method and get expert assistance tailored to your needs
          </p>
        </motion.div>

        {/* Methods Grid */}
        <animated.div style={springProps}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <Tilt key={index} options={{ max: 15, scale: 1.05, speed: 300 }}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  onHoverStart={() => setHoveredMethod(method.title)}
                  onHoverEnd={() => setHoveredMethod(null)}
                >
                  <Card className={`h-full glassmorphism hover:shadow-2xl transition-all duration-500 group relative overflow-hidden ${method.borderColor} border-2`}>
                    {/* Gradient Border Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                    
                    <CardHeader className="relative z-10">
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className={`p-4 rounded-xl bg-gradient-to-r ${method.color} text-white`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {method.icon}
                        </motion.div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{method.title}</CardTitle>
                          <p className="text-sm text-foreground-secondary">{method.subtitle}</p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="relative z-10 space-y-6">
                      <p className="text-foreground-secondary leading-relaxed">
                        {method.description}
                      </p>

                      {/* Key Stats */}
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-background/30">
                          <span className="text-sm text-foreground-secondary">Response Time</span>
                          <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                            {method.responseTime}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-background/30">
                          <span className="text-sm text-foreground-secondary">Availability</span>
                          <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
                            {method.availability}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-background/30">
                          <span className="text-sm text-foreground-secondary">Track Record</span>
                          <Badge variant="secondary" className="bg-purple-500/10 text-purple-500">
                            {method.stats}
                          </Badge>
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Key Features
                        </h4>
                        <div className="space-y-2">
                          {method.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              className="flex items-center gap-2 text-sm"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: featureIndex * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                              <span>{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Best For Section */}
                      {hoveredMethod === method.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            Best For
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {method.bestFor.map((item, itemIndex) => (
                              <Badge 
                                key={itemIndex}
                                variant="outline"
                                className="text-xs"
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Action Button */}
                      <Button 
                        className={`w-full btn-hero bg-gradient-to-r ${method.color} group`}
                        size="lg"
                        onClick={() => window.open(method.href, '_blank')}
                      >
                        {method.action}
                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>

                      {/* Trust Indicators */}
                      <div className="flex items-center justify-center gap-4 pt-4 border-t border-border/20">
                        <div className="flex items-center gap-1 text-xs text-foreground-secondary">
                          <Shield className="w-3 h-3" />
                          <span>Secure</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-foreground-secondary">
                          <Clock className="w-3 h-3" />
                          <span>Reliable</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-foreground-secondary">
                          <Heart className="w-3 h-3" />
                          <span>Caring</span>
                        </div>
                      </div>
                    </CardContent>

                    {/* Hover Effect Particles */}
                    {hoveredMethod === method.title && (
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-2 h-2 bg-gradient-to-r ${method.color} rounded-full`}
                            style={{
                              left: `${20 + i * 15}%`,
                              top: `${30 + i * 10}%`,
                            }}
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 0.7, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </Card>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </animated.div>

        {/* Additional Support Info */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="glassmorphism max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex flex-wrap justify-center items-center gap-8">
                <div className="flex items-center gap-2 text-foreground-secondary">
                  <Globe className="w-5 h-5 text-blue-500" />
                  <span>Global Support</span>
                </div>
                <div className="flex items-center gap-2 text-foreground-secondary">
                  <Users className="w-5 h-5 text-green-500" />
                  <span>50K+ Students Served</span>
                </div>
                <div className="flex items-center gap-2 text-foreground-secondary">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span>Excellence Award 2024</span>
                </div>
                <div className="flex items-center gap-2 text-foreground-secondary">
                  <MessageCircle className="w-5 h-5 text-purple-500" />
                  <span>Multi-language Support</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMethodsGrid;