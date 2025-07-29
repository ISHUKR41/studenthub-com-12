import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, HelpCircle, Lightbulb, CheckCircle } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'academic' | 'billing';
  popular: boolean;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'general', label: 'General', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'technical', label: 'Technical', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'academic', label: 'Academic', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'billing', label: 'Billing', icon: <CheckCircle className="w-4 h-4" /> }
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const getCategoryColor = (category: string) => {
    const colors = {
      general: 'from-blue-500 to-blue-600',
      technical: 'from-green-500 to-green-600', 
      academic: 'from-purple-500 to-purple-600',
      billing: 'from-orange-500 to-orange-600'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <motion.div 
        className="flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-full
              font-medium transition-all duration-300 border-2
              ${activeCategory === category.id
                ? 'bg-primary text-primary-foreground border-primary shadow-lg scale-105'
                : 'bg-background/50 text-foreground-secondary border-border hover:border-primary/50 hover:bg-primary/10'
              }
            `}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.icon}
            <span>{category.label}</span>
            {category.id !== 'all' && (
              <span className="text-xs bg-primary/20 px-2 py-1 rounded-full">
                {faqs.filter(faq => faq.category === category.id).length}
              </span>
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* FAQ List */}
      <motion.div 
        className="space-y-4"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.05,
                layout: { duration: 0.3 }
              }}
            >
              <Card className={`
                overflow-hidden border-2 transition-all duration-500
                ${openFAQ === faq.id 
                  ? 'border-primary/50 shadow-xl shadow-primary/10 bg-primary/5' 
                  : 'border-border hover:border-primary/30 hover:shadow-lg'
                }
                glassmorphism group
              `}>
                <motion.button
                  onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                  className="w-full text-left p-6 focus:outline-none"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Question Icon */}
                      <motion.div 
                        className={`
                          p-2 rounded-lg bg-gradient-to-br ${getCategoryColor(faq.category)}
                          flex items-center justify-center min-w-[40px] h-10
                        `}
                        animate={openFAQ === faq.id ? { 
                          rotate: 360,
                          scale: 1.1 
                        } : { 
                          rotate: 0,
                          scale: 1 
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <HelpCircle className="w-5 h-5 text-white" />
                      </motion.div>
                      
                      {/* Question Text */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <motion.h3 
                            className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300"
                            animate={openFAQ === faq.id ? { x: 5 } : { x: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {faq.question}
                          </motion.h3>
                          
                          {faq.popular && (
                            <motion.span 
                              className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3, type: "spring" }}
                            >
                              🔥 Popular
                            </motion.span>
                          )}
                        </div>
                        
                        <span className={`
                          text-xs px-2 py-1 rounded-full font-medium
                          bg-gradient-to-r ${getCategoryColor(faq.category)} text-white
                        `}>
                          {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Chevron Icon */}
                    <motion.div
                      animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="ml-4"
                    >
                      <ChevronDown className="w-6 h-6 text-foreground-secondary group-hover:text-primary transition-colors duration-300" />
                    </motion.div>
                  </div>
                </motion.button>

                {/* Answer Content */}
                <AnimatePresence>
                  {openFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ 
                        duration: 0.4,
                        ease: "easeInOut"
                      }}
                      className="overflow-hidden"
                    >
                      <CardContent className="px-6 pb-6 pt-0">
                        <motion.div 
                          className="ml-14 space-y-4"
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        >
                          {/* Answer Content */}
                          <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                            <motion.p 
                              className="text-foreground-secondary leading-relaxed"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            >
                              {faq.answer}
                            </motion.p>
                          </div>
                          
                          {/* Helpful Actions */}
                          <motion.div 
                            className="flex items-center space-x-4 text-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                          >
                            <motion.button 
                              className="flex items-center space-x-2 text-green-500 hover:text-green-400 transition-colors duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Helpful</span>
                            </motion.button>
                            
                            <motion.button 
                              className="flex items-center space-x-2 text-foreground-secondary hover:text-primary transition-colors duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <HelpCircle className="w-4 h-4" />
                              <span>Need more help?</span>
                            </motion.button>
                          </motion.div>
                        </motion.div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredFAQs.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <HelpCircle className="w-10 h-10 text-primary" />
          </motion.div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No questions found</h3>
          <p className="text-foreground-secondary">Try selecting a different category or contact our support team.</p>
        </motion.div>
      )}
    </div>
  );
};