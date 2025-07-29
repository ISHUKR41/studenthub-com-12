import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/StudentHub/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowUp, 
  Sparkles, 
  MessageSquare, 
  Phone, 
  Mail, 
  Users,
  Send,
  MapPin,
  Clock,
  Heart
} from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const ContactSimple = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Initialize smooth scrolling only for this page
  useSmoothScroll();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header Navigation */}
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 mb-8">
              <Heart className="w-4 h-4 mr-2" />
              We're Here to Help
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
              Get in Touch
            </h1>
            
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto mb-12">
              Have questions? Need support? Want to share feedback? We'd love to hear from you! 
              Our dedicated team is here to assist you 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "Live Chat",
                description: "Get instant help with our 24/7 live chat support",
                action: "Start Chat",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Phone className="w-8 h-8" />,
                title: "Call Us",
                description: "Speak directly with our support experts",
                action: "Call Now",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: <Mail className="w-8 h-8" />,
                title: "Email Support",
                description: "Send us your questions via email",
                action: "Send Email",
                color: "from-purple-500 to-pink-500"
              }
            ].map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full glassmorphism border-primary/20 hover:border-primary/40 transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${method.color} text-white mb-6 group-hover:scale-110 transition-transform`}>
                      {method.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4">{method.title}</h3>
                    <p className="text-foreground-secondary mb-6">{method.description}</p>
                    
                    <Button className="w-full">
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4 bg-gradient-to-br from-background-secondary to-background">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Send us a Message
            </h2>
            <p className="text-xl text-foreground-secondary">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glassmorphism border-primary/20">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input 
                        type="text" 
                        className="w-full p-4 rounded-xl border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input 
                        type="email" 
                        className="w-full p-4 rounded-xl border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <input 
                      type="text" 
                      className="w-full p-4 rounded-xl border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors"
                      placeholder="What is this about?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea 
                      rows={6}
                      className="w-full p-4 rounded-xl border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <Button className="w-full py-4 text-lg bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Support Stats */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Support Excellence
            </h2>
            <p className="text-xl text-foreground-secondary">
              Our commitment to exceptional support is reflected in our metrics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <MessageSquare className="w-12 h-12" />, value: '98.7%', label: 'Resolution Rate', color: 'from-blue-500 to-cyan-500' },
              { icon: <Clock className="w-12 h-12" />, value: '< 15s', label: 'Response Time', color: 'from-green-500 to-emerald-500' },
              { icon: <Mail className="w-12 h-12" />, value: '50K+', label: 'Monthly Queries', color: 'from-purple-500 to-pink-500' },
              { icon: <Users className="w-12 h-12" />, value: '4.9★', label: 'Satisfaction Score', color: 'from-yellow-500 to-orange-500' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <Card className="text-center p-8 glassmorphism border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-4`}>
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                    <div className="text-sm text-foreground-secondary">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-primary to-accent text-white rounded-full shadow-lg hover:scale-110 transition-transform z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
};

export default ContactSimple;