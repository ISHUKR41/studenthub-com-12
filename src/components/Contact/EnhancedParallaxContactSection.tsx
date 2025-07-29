import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Parallax } from 'react-parallax';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Globe, 
  Headphones,
  Star,
  Zap,
  Shield,
  Heart,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const EnhancedParallaxContactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 300, damping: 30 });
  const y1 = useTransform(smoothProgress, [0, 1], [0, -50]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const y3 = useTransform(smoothProgress, [0, 1], [0, -150]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "24/7 Phone Support",
      description: "Instant help when you need it most",
      value: "+91-8000-123-456",
      color: "from-blue-500 to-cyan-500",
      action: "Call Now",
      stats: "< 30 sec response",
      available: "Always Available"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "WhatsApp Support",
      description: "Quick chat support in your language",
      value: "Chat on WhatsApp",
      color: "from-green-500 to-emerald-500",
      action: "Start Chat",
      stats: "98% satisfaction",
      available: "Instant Response"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Support",
      description: "Detailed support for complex queries",
      value: "support@studenthub.com",
      color: "from-purple-500 to-pink-500",
      action: "Send Email",
      stats: "24h response",
      available: "Priority Support"
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Live Chat",
      description: "Real-time assistance with AI + human support",
      value: "Start Live Chat",
      color: "from-orange-500 to-red-500",
      action: "Chat Now",
      stats: "5 min avg response",
      available: "9 AM - 9 PM"
    }
  ];

  const supportFeatures = [
    { icon: <Shield className="w-6 h-6" />, title: "100% Secure", description: "Your data is completely safe" },
    { icon: <Globe className="w-6 h-6" />, title: "Multi-Language", description: "Support in 22+ languages" },
    { icon: <Users className="w-6 h-6" />, title: "Expert Team", description: "Qualified academic advisors" },
    { icon: <Clock className="w-6 h-6" />, title: "Quick Response", description: "Average 15 minute response" },
    { icon: <Heart className="w-6 h-6" />, title: "Student-First", description: "We prioritize your success" },
    { icon: <Award className="w-6 h-6" />, title: "Award Winning", description: "Best student support 2024" }
  ];

  const successMetrics = [
    { value: "170M+", label: "Students Helped", icon: <Users className="w-6 h-6" /> },
    { value: "98.7%", label: "Resolution Rate", icon: <Star className="w-6 h-6" /> },
    { value: "15 sec", label: "Avg Response", icon: <Zap className="w-6 h-6" /> },
    { value: "24/7", label: "Availability", icon: <Clock className="w-6 h-6" /> }
  ];

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <Parallax strength={300} className="min-h-screen">
        {/* Background Layers */}
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background-tertiary" />
        
        <motion.div 
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          style={{ y: y1 }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          style={{ y: y2 }}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />

        {/* Main Content */}
          <motion.div 
            className="relative z-10 py-20 px-4"
            style={{ opacity }}
          >
            <div className="max-w-7xl mx-auto">
              {/* Enhanced Header */}
              <motion.div 
                className="text-center space-y-8 mb-20"
                style={{ scale }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center gap-4 mb-8">
                  <motion.div 
                    className="p-4 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", duration: 0.3 }}
                  >
                    <Sparkles className="h-8 w-8 text-white" />
                  </motion.div>
                  <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30">
                    24/7 Premium Support Experience
                  </Badge>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-bold gradient-text">
                  Revolutionary
                  <span className="block text-transparent bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text">
                    Support System
                  </span>
                </h2>
                
                <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
                  Experience next-generation student support with AI-powered assistance, 
                  expert human advisors, and lightning-fast response times
                </p>

                {/* Success Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                  {successMetrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      className="text-center p-6 rounded-2xl glassmorphism group hover:shadow-xl transition-all duration-300"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5, scale: 1.05 }}
                    >
                      <div className="flex justify-center mb-3">
                        <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white group-hover:scale-110 transition-transform">
                          {metric.icon}
                        </div>
                      </div>
                      <div className="text-3xl font-bold gradient-text">{metric.value}</div>
                      <div className="text-sm text-foreground-secondary">{metric.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Enhanced Contact Methods Grid */}
              <div className="grid lg:grid-cols-2 gap-8 mb-20">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group cursor-pointer"
                  >
                    <Card className="h-full glassmorphism border-primary/20 hover:border-primary/40 transition-all duration-500 overflow-hidden">
                      <CardContent className="p-8 relative">
                        {/* Animated Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                        
                        <div className="relative z-10">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-6">
                            <div className={`p-4 bg-gradient-to-r ${method.color} rounded-2xl text-white group-hover:scale-110 transition-transform duration-300`}>
                              {method.icon}
                            </div>
                            <div className="text-right text-sm">
                              <Badge className="mb-2 bg-green-500/20 text-green-400 border-green-500/30">
                                {method.available}
                              </Badge>
                              <div className="text-foreground-secondary">{method.stats}</div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="space-y-4">
                            <h3 className="text-2xl font-bold">{method.title}</h3>
                            <p className="text-foreground-secondary text-lg">{method.description}</p>
                            <div className="text-lg font-semibold text-primary">{method.value}</div>
                          </div>

                          {/* Action Button */}
                          <motion.div 
                            className="mt-6"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button 
                              className={`w-full h-12 bg-gradient-to-r ${method.color} text-white border-0 group-hover:shadow-xl transition-all duration-300`}
                            >
                              {method.action}
                              <TrendingUp className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Support Features */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="glassmorphism border-primary/20">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold gradient-text mb-4">Why Choose Our Support?</h3>
                      <p className="text-lg text-foreground-secondary">
                        Industry-leading support backed by cutting-edge technology and human expertise
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {supportFeatures.map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start space-x-4 p-4 rounded-xl hover:bg-background-secondary/50 transition-colors"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.6 }}
                          viewport={{ once: true }}
                          whileHover={{ x: 5 }}
                        >
                          <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg text-white flex-shrink-0">
                            {feature.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{feature.title}</h4>
                            <p className="text-sm text-foreground-secondary">{feature.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
      </Parallax>
    </div>
  );
};