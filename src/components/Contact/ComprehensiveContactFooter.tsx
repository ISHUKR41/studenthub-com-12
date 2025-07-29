import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Award, Shield, Clock, Users, Star, CheckCircle, 
  Globe, Zap, Heart, TrendingUp, MessageCircle, 
  Phone, Mail, Calendar, Target, Rocket, Eye,
  BookOpen, GraduationCap, Settings, Headphones
} from 'lucide-react';

const ComprehensiveContactFooter: React.FC = () => {
  const supportStats = [
    { label: 'Total Queries Resolved', value: '250K+', icon: <CheckCircle className="w-5 h-5" />, color: 'text-green-500' },
    { label: 'Average Response Time', value: '1.2 hours', icon: <Clock className="w-5 h-5" />, color: 'text-blue-500' },
    { label: 'Customer Satisfaction', value: '4.9/5', icon: <Star className="w-5 h-5" />, color: 'text-yellow-500' },
    { label: 'Support Languages', value: '12+', icon: <Globe className="w-5 h-5" />, color: 'text-purple-500' }
  ];

  const certifications = [
    { name: 'ISO 27001 Certified', description: 'Information Security Management' },
    { name: 'GDPR Compliant', description: 'Data Protection & Privacy' },
    { name: 'SOC 2 Type II', description: 'Security & Availability' },
    { name: 'Educational Excellence Award 2024', description: 'Ministry of Education Recognition' }
  ];

  const emergencyContacts = [
    {
      title: 'Emergency Technical Support',
      description: 'Critical system issues & urgent technical problems',
      contact: '+91-7541-024-846',
      availability: '24/7',
      response: 'Immediate',
      icon: <Settings className="w-6 h-6" />
    },
    {
      title: 'Academic Emergency Line',
      description: 'Exam day issues & urgent academic support',
      contact: 'emergency@studenthub.com',
      availability: '24/7',
      response: '< 30 minutes',
      icon: <GraduationCap className="w-6 h-6" />
    }
  ];

  const socialMediaStats = [
    { platform: 'WhatsApp Communities', members: '50K+', engagement: '95%' },
    { platform: 'Discord Servers', members: '25K+', engagement: '88%' },
    { platform: 'Telegram Channels', members: '75K+', engagement: '92%' },
    { platform: 'LinkedIn Groups', members: '15K+', engagement: '85%' }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background to-background-secondary">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Comprehensive Support Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Our Support Excellence
            </h2>
            <p className="text-foreground-secondary max-w-2xl mx-auto">
              Real numbers from our commitment to providing exceptional student support
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {supportStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glassmorphism text-center hover:shadow-xl transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className={`inline-flex p-3 rounded-full bg-background/20 ${stat.color} mb-3`}>
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                    <div className="text-sm text-foreground-secondary">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Emergency Support Contacts
            </h2>
            <p className="text-foreground-secondary max-w-2xl mx-auto">
              For critical issues that need immediate attention, use these dedicated emergency channels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="glassmorphism border-l-4 border-l-red-500 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-500/10 rounded-lg text-red-500">
                      {contact.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{contact.title}</CardTitle>
                      <p className="text-sm text-foreground-secondary">{contact.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground-secondary">Contact:</span>
                      <span className="font-semibold text-primary">{contact.contact}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground-secondary">Availability:</span>
                      <Badge className="bg-green-500/10 text-green-500">{contact.availability}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground-secondary">Response Time:</span>
                      <Badge className="bg-blue-500/10 text-blue-500">{contact.response}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Social Media & Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Join Our Thriving Communities
            </h2>
            <p className="text-foreground-secondary max-w-2xl mx-auto">
              Connect with thousands of students across multiple platforms for peer support and networking
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialMediaStats.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glassmorphism hover:shadow-xl transition-all duration-300 text-center">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-2">{platform.platform}</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="text-2xl font-bold gradient-text">{platform.members}</div>
                        <div className="text-xs text-foreground-secondary">Active Members</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-green-500">{platform.engagement}</div>
                        <div className="text-xs text-foreground-secondary">Engagement Rate</div>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline" size="sm">
                      Join Community
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Security & Certifications
            </h2>
            <p className="text-foreground-secondary max-w-2xl mx-auto">
              Your data and privacy are protected by industry-leading security standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glassmorphism hover:shadow-xl transition-all duration-300 text-center">
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <Shield className="w-12 h-12 text-green-500 mx-auto" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{cert.name}</h3>
                    <p className="text-sm text-foreground-secondary">{cert.description}</p>
                    <Badge className="mt-3 bg-green-500/10 text-green-500">Verified</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="glassmorphism max-w-4xl mx-auto">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold gradient-text mb-4">
                Still Have Questions?
              </h3>
              <p className="text-foreground-secondary mb-6 max-w-2xl mx-auto">
                Our expert support team is ready to help you succeed. Don't hesitate to reach out - 
                we're here to support your academic journey every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-hero">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Live Chat
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="w-5 h-5 mr-2" />
                  Schedule Call
                </Button>
                <Button size="lg" variant="outline">
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ComprehensiveContactFooter;