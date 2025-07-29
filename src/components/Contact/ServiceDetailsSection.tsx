import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, MessageSquare, Phone, Mail, Users, Award,
  Clock, CheckCircle, Star, TrendingUp, Zap, Shield,
  Globe, Heart, Lightbulb, Target, ArrowRight, Download
} from 'lucide-react';

const ServiceDetailsSection: React.FC = () => {
  const services = [
    {
      id: 'academic',
      title: 'Academic Support',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      description: 'Complete academic assistance for all your educational needs',
      features: [
        'Book Request Service - 95% success rate',
        'Research Paper Access - 10M+ papers',
        'Study Materials - 25,000+ resources',
        'Previous Year Papers - All universities'
      ],
      stats: { requests: '100K+', satisfaction: '98%', delivery: '24h' }
    },
    {
      id: 'technical',
      title: 'Technical Tools',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      description: 'Powerful online tools for productivity and learning',
      features: [
        'PDF Tools Suite - 30+ professional tools',
        'Image Processing - AI-powered editing',
        'Text Tools - Advanced text manipulation',
        'Study Planner - Smart scheduling'
      ],
      stats: { tools: '30+', users: '50K+', processed: '5M+' }
    },
    {
      id: 'community',
      title: 'Community Support',
      icon: <Users className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      description: 'Connect with fellow students and get peer support',
      features: [
        'Study Groups - Subject-specific communities',
        'Expert Q&A - Get answers from professionals',
        'Peer Tutoring - Learn from senior students',
        'Discussion Forums - Knowledge sharing'
      ],
      stats: { members: '50K+', groups: '500+', questions: '10K+' }
    },
    {
      id: 'support',
      title: '24/7 Support',
      icon: <MessageSquare className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-500',
      description: 'Round-the-clock assistance for all your queries',
      features: [
        'Live Chat Support - Instant responses',
        'WhatsApp Support - Personal assistance',
        'Email Support - Detailed solutions',
        'Phone Support - Direct expert help'
      ],
      stats: { response: '<2h', availability: '24/7', resolution: '95%' }
    }
  ];

  return (
    <section id="contact-services" className="py-20 px-4 bg-gradient-to-br from-background via-background-secondary to-background-tertiary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 right-1/6 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/6 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
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
            <div className="p-4 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl">
              <Award className="h-8 w-8 text-white" />
            </div>
            <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
              Our Services
            </Badge>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold gradient-text">Complete Service Portfolio</h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            From academic resources to technical tools, we provide everything you need for educational success
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="glassmorphism h-full group hover:shadow-2xl transition-all duration-500">
                <CardHeader className="text-center pb-6">
                  <div className={`inline-flex p-6 rounded-3xl bg-gradient-to-r ${service.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4`}>
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold gradient-text">{service.title}</CardTitle>
                  <p className="text-foreground-secondary">{service.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Features List */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Key Features:</h4>
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground-secondary text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-background/50 rounded-xl">
                    {Object.entries(service.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold gradient-text">{value}</div>
                        <div className="text-xs text-foreground-secondary capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button className="w-full btn-hero group-hover:scale-105 transition-transform">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-20 space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="p-12 glassmorphism rounded-3xl">
            <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Join thousands of students who trust STUDENTHUB for their academic journey. 
              Get instant access to all our services and start succeeding today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="btn-hero px-8 py-3 text-lg">
                <Download className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
              <Button variant="outline" className="px-8 py-3 text-lg hover:border-primary">
                <Phone className="w-5 h-5 mr-2" />
                Contact Sales
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceDetailsSection;