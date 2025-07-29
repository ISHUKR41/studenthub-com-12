import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, Phone, Mail, MapPin, Clock, Users,
  ExternalLink, Copy, CheckCircle, Globe, Heart,
  Zap, Star, Award, TrendingUp, Target, Lightbulb
} from 'lucide-react';

const ContactMethodsEnhanced: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeMethod, setActiveMethod] = useState<string | null>(null);

  const contactMethods = [
    {
      id: 'whatsapp',
      title: 'WhatsApp Support',
      subtitle: 'Instant Personal Assistance',
      icon: <MessageSquare className="w-10 h-10" />,
      color: 'from-green-500 to-emerald-500',
      availability: '24/7 Available',
      responseTime: 'Instant Response',
      description: 'Get immediate help with your academic needs through our dedicated WhatsApp support.',
      features: [
        'Book request service',
        'Quick technical support',
        'Study material queries',
        'Account assistance'
      ],
      action: 'Start Chat',
      link: 'https://wa.me/919876543210?text=Hello! I need help from STUDENTHUB.',
      stats: { users: '50K+', satisfaction: '99%', response: '<5min' }
    },
    {
      id: 'email',
      title: 'Email Support',
      subtitle: 'Detailed & Comprehensive Help',
      icon: <Mail className="w-10 h-10" />,
      color: 'from-blue-500 to-cyan-500',
      availability: 'Always Open',
      responseTime: '2-6 Hours',
      description: 'Send detailed queries and get comprehensive solutions from our expert support team.',
      features: [
        'Technical documentation',
        'Account management',
        'Billing inquiries',
        'Partnership requests'
      ],
      action: 'Send Email',
      link: 'mailto:support@studenthub.com',
      email: 'support@studenthub.com',
      stats: { queries: '10K+', resolution: '98%', expert: 'PhD Team' }
    },
    {
      id: 'phone',
      title: 'Phone Support',
      subtitle: 'Direct Voice Assistance',
      icon: <Phone className="w-10 h-10" />,
      color: 'from-purple-500 to-pink-500',
      availability: 'Mon-Fri 9AM-6PM IST',
      responseTime: 'Immediate',
      description: 'Speak directly with our support experts for complex issues and urgent assistance.',
      features: [
        'Emergency support',
        'Technical consultation',
        'Account recovery',
        'Premium guidance'
      ],
      action: 'Call Now',
      link: 'tel:+919876543210',
      phone: '+91 98765 43210',
      stats: { experts: '20+', languages: '5+', satisfaction: '97%' }
    },
    {
      id: 'community',
      title: 'Community Forums',
      subtitle: 'Peer-to-Peer Learning',
      icon: <Users className="w-10 h-10" />,
      color: 'from-yellow-500 to-orange-500',
      availability: 'Always Active',
      responseTime: 'Community Driven',
      description: 'Join our vibrant community of students and get help from peers and experts.',
      features: [
        'Study group discussions',
        'Exam preparation tips',
        'Resource sharing',
        'Success stories'
      ],
      action: 'Join Community',
      link: '#community',
      stats: { members: '100K+', posts: '50K+', active: '24/7' }
    }
  ];

  const quickActions = [
    { icon: <Globe className="w-6 h-6" />, label: 'Visit Website', link: 'https://studenthub.com' },
    { icon: <MessageSquare className="w-6 h-6" />, label: 'Live Chat', link: '#chat' },
    { icon: <Star className="w-6 h-6" />, label: 'Leave Review', link: '#review' },
    { icon: <Award className="w-6 h-6" />, label: 'Success Stories', link: '#stories' }
  ];

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <section className="py-20 px-4 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 12,
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
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30">
              Get in Touch
            </Badge>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold gradient-text">Multiple Ways to Connect</h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Choose your preferred communication method and get the support you need, when you need it
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              onHoverStart={() => setActiveMethod(method.id)}
              onHoverEnd={() => setActiveMethod(null)}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="glassmorphism h-full group hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-start gap-6">
                      <motion.div 
                        className={`p-4 rounded-2xl bg-gradient-to-r ${method.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        animate={activeMethod === method.id ? { rotate: [0, 10, -10, 0] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {method.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold gradient-text">{method.title}</h3>
                        <p className="text-foreground-secondary font-semibold">{method.subtitle}</p>
                        <div className="flex flex-wrap gap-4 mt-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="text-foreground-secondary">{method.availability}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Zap className="w-4 h-4 text-accent" />
                            <span className="text-foreground-secondary">{method.responseTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-foreground-secondary">{method.description}</p>

                    {/* Features */}
                    <div className="space-y-2">
                      <h4 className="font-semibold">What you can get help with:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {method.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span className="text-sm text-foreground-secondary">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-background/30 rounded-xl">
                      {Object.entries(method.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold gradient-text">{value}</div>
                          <div className="text-xs text-foreground-secondary capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 btn-hero group-hover:scale-105 transition-transform"
                        onClick={() => window.open(method.link, '_blank')}
                      >
                        {method.action}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                      
                      {method.email && (
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="hover:border-primary"
                          onClick={() => copyEmail(method.email!)}
                        >
                          {copiedEmail ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      )}
                    </div>

                    {/* Contact Info */}
                    {(method.email || method.phone) && (
                      <div className="text-center p-3 bg-primary/5 rounded-lg">
                        <p className="text-sm font-mono text-primary">
                          {method.email || method.phone}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div 
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold gradient-text">Quick Actions</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                className="flex items-center gap-3 px-6 py-3 rounded-xl glassmorphism hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(action.link, '_blank')}
              >
                <span className="text-primary">{action.icon}</span>
                <span className="font-medium">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Success Indicators */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { icon: <Heart className="w-8 h-8" />, value: '99%', label: 'Satisfaction Rate' },
            { icon: <TrendingUp className="w-8 h-8" />, value: '<2h', label: 'Avg Response Time' },
            { icon: <Target className="w-8 h-8" />, value: '98%', label: 'Resolution Rate' },
            { icon: <Lightbulb className="w-8 h-8" />, value: '24/7', label: 'Availability' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 glassmorphism">
              <div className="text-primary mb-3">{stat.icon}</div>
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-foreground-secondary">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMethodsEnhanced;