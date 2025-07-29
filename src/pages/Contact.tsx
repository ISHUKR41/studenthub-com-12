import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/StudentHub/Header';
import Enhanced3DBackground from '@/components/Contact/Enhanced3DBackground';
import { FAQAccordion } from '@/components/Contact/FAQAccordion';
import EnhancedContactHero from '@/components/Contact/EnhancedContactHero';
import ServiceDetailsSection from '@/components/Contact/ServiceDetailsSection';
import ContactMethodsEnhanced from '@/components/Contact/ContactMethodsEnhanced';
import { UltraAdvancedMega3DContactForm } from '@/components/Contact/UltraAdvancedMega3DContactForm';
import { EnhancedParallaxContactSection } from '@/components/Contact/EnhancedParallaxContactSection';
import ComprehensiveContactFooter from '@/components/Contact/ComprehensiveContactFooter';
import EnhancedSupportTeamSection from '@/components/Contact/EnhancedSupportTeamSection';
import DetailedServiceShowcase from '@/components/Contact/DetailedServiceShowcase';
import { Enhanced3DVisualizationSection } from '@/components/Contact/Enhanced3DVisualizationSection';
import { ParallaxContainer, ParallaxScroll } from '@/components/ui/parallax-scroll';
import { ArrowUp, Sparkles, MessageSquare, Phone, Mail, Users } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Contact = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Don't initialize smooth scroll here since it's now global in App.tsx

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

  const faqData = [
    {
      id: 1,
      question: "How can I request missing books or study materials?",
      answer: "Simply use our Book Request Form! We have a 95% success rate in finding and uploading requested materials within 1-3 days. You'll receive WhatsApp notifications about the status.",
      category: 'academic' as const,
      popular: true
    },
    {
      id: 2,
      question: "What tools are available for free on STUDENTHUB?",
      answer: "All 30+ tools including PDF conversion, image editing, text tools, and study planners are completely free. No registration required for basic features.",
      category: 'general' as const,
      popular: true
    },
    {
      id: 3,
      question: "How fast is your support response time?",
      answer: "Email support: 24-48 hours for detailed responses. Live chat/forms: Under 2 hours. Phone support: Immediate during business hours (Mon-Fri 9AM-6PM IST).",
      category: 'technical' as const,
      popular: true
    },
    {
      id: 4,
      question: "Can I join study groups and communities?",
      answer: "Yes! We have active WhatsApp groups, Discord servers, and study partner matching for 50,000+ students. Connect with peers in your field of study.",
      category: 'general' as const,
      popular: false
    }
  ];

  return (
    <ParallaxContainer className="min-h-screen bg-background relative overflow-hidden" style={{ position: 'relative' }}>
      {/* Header Navigation */}
      <Header />
      
      {/* Spacing between header and content */}
      <div className="h-16 sm:h-20 lg:h-24"></div>
      
      {/* Revolutionary 3D Background Scene */}
      <Enhanced3DBackground />

      {/* Enhanced Hero Section with Parallax */}
      <ParallaxScroll speed={0.5} direction="up">
        <EnhancedContactHero />
      </ParallaxScroll>

      {/* Detailed Service Showcase */}
      <ParallaxScroll speed={0.3} direction="down">
        <DetailedServiceShowcase />
      </ParallaxScroll>

      {/* Enhanced Support Team Section */}
      <ParallaxScroll speed={0.4} direction="up">
        <EnhancedSupportTeamSection />
      </ParallaxScroll>

      {/* Revolutionary Contact Methods with Enhanced Features */}
      <ParallaxScroll speed={0.2} direction="down">
        <ContactMethodsEnhanced />
      </ParallaxScroll>

      {/* Enhanced Parallax Contact Methods */}
      <EnhancedParallaxContactSection />

      {/* ULTRA MEGA ADVANCED 3D Contact Form - MOST REVOLUTIONARY VERSION */}
      <UltraAdvancedMega3DContactForm />

      {/* Enhanced 3D Visualization Section */}
      <ParallaxScroll speed={0.3} direction="up">
        <Enhanced3DVisualizationSection />
      </ParallaxScroll>

      {/* Enhanced Support Statistics Section */}
      <ParallaxScroll speed={0.2} direction="down">
        <section className="py-20 px-4 bg-gradient-to-br from-background via-background-secondary to-background-tertiary relative overflow-hidden">
          <div className="absolute inset-0">
            <motion.div 
              className="absolute top-1/4 left-1/6 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center space-y-8 mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="p-4 bg-gradient-to-r from-accent via-primary to-secondary rounded-2xl">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-accent/20 to-secondary/20 text-accent border-accent/30">
                Industry-Leading Support
              </Badge>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold gradient-text">Support Excellence Metrics</h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Our commitment to exceptional support is reflected in our industry-leading performance metrics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <MessageSquare className="w-12 h-12" />, value: '98.7%', label: 'Resolution Rate', desc: 'First contact resolution', color: 'from-blue-500 to-cyan-500' },
              { icon: <Phone className="w-12 h-12" />, value: '< 15s', label: 'Response Time', desc: 'Average initial response', color: 'from-green-500 to-emerald-500' },
              { icon: <Mail className="w-12 h-12" />, value: '50K+', label: 'Monthly Queries', desc: 'Successfully handled', color: 'from-purple-500 to-pink-500' },
              { icon: <Users className="w-12 h-12" />, value: '4.9★', label: 'Satisfaction Score', desc: 'Based on 10K+ reviews', color: 'from-yellow-500 to-orange-500' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="relative p-8 rounded-3xl glassmorphism group hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative z-10 text-center space-y-4">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold gradient-text">{stat.value}</div>
                  <div className="font-semibold text-lg">{stat.label}</div>
                  <div className="text-sm text-foreground-secondary">{stat.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        </section>
      </ParallaxScroll>

      {/* Enhanced FAQ Section with Better UI */}
      <ParallaxScroll speed={0.4} direction="up">
        <section className="py-20 px-4 bg-background-secondary relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div 
            className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          />
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div 
            className="text-center space-y-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-xl">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <Badge className="px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30">
                Common Questions
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Frequently Asked Questions</h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Find instant answers to the most common questions about STUDENTHUB services and support
            </p>
          </motion.div>
          <FAQAccordion faqs={faqData} />
        </div>
        </section>
      </ParallaxScroll>

      {/* Quick Action Section */}
      <ParallaxScroll speed={0.2} direction="down">
        <section className="py-16 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-y border-border/30">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold gradient-text mb-4">Still Have Questions?</h3>
            <p className="text-lg text-foreground-secondary mb-8">
              Our expert support team is ready to assist you with any questions or concerns
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="btn-hero bg-gradient-to-r from-primary to-secondary px-8 py-3 text-lg"
                onClick={() => window.open('https://wa.me/919876543210?text=Hello! I need support from STUDENTHUB.', '_blank')}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                WhatsApp Support
              </Button>
              <Button 
                variant="outline" 
                className="px-8 py-3 text-lg hover:border-primary"
                onClick={() => window.open('mailto:support@studenthub.com', '_blank')}
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Support
              </Button>
            </div>
          </motion.div>
        </div>
        </section>
      </ParallaxScroll>

      {/* Comprehensive Contact Footer */}
      <ParallaxScroll speed={0.3} direction="up">
        <ComprehensiveContactFooter />
      </ParallaxScroll>

      {/* Enhanced Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-primary to-accent text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </ParallaxContainer>
  );
};

export default Contact;