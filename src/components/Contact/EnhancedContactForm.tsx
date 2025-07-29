import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { Tilt } from 'react-tilt';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Send, ExternalLink, CheckCircle, Star, Clock, Shield,
  MessageSquare, FileText, Image, Video, Mic, Globe,
  Zap, Award, Heart, Target, Sparkles, Users, Rocket
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select';
  placeholder: string;
  required: boolean;
  options?: string[];
}

const EnhancedContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: '',
    priority: 'normal'
  });
  const [formProgress, setFormProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  // Form fields configuration
  const formFields: FormField[] = [
    {
      id: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      required: true
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'your.email@example.com',
      required: true
    },
    {
      id: 'category',
      label: 'Query Category',
      type: 'select',
      placeholder: 'Select category',
      required: true,
      options: [
        'Book/Material Request',
        'Technical Support',
        'General Support',
        'Community Access',
        'Account Issues',
        'Feature Request',
        'Bug Report',
        'Academic Guidance'
      ]
    },
    {
      id: 'subject',
      label: 'Subject',
      type: 'text',
      placeholder: 'Brief description of your inquiry',
      required: true
    },
    {
      id: 'message',
      label: 'Detailed Message',
      type: 'textarea',
      placeholder: 'Please describe your question or issue in detail. The more information you provide, the better we can assist you.',
      required: true
    }
  ];

  // Calculate form completion progress
  useEffect(() => {
    const requiredFields = formFields.filter(field => field.required);
    const completedFields = requiredFields.filter(field => 
      formData[field.id as keyof typeof formData]?.trim() !== ''
    );
    setFormProgress((completedFields.length / requiredFields.length) * 100);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Open Google Form
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSczWJI6cXslwpNgayBkuH0pnKfCZx0weAYi2lbnkLLpb76Myg/viewform", "_blank");
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    toast({
      title: "🚀 Redirecting to STUDENTHUB Contact Form!",
      description: "Your query details have been prepared. Complete the form for instant processing!"
    });

    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: '',
        priority: 'normal'
      });
      setShowSuccess(false);
    }, 3000);
  };

  const springProps = useSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(50px)' },
    config: { tension: 200, friction: 25 }
  });

  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Instant Processing",
      description: "AI-powered form routing to the right expert",
      color: "text-blue-500"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure & Private",
      description: "Your data is encrypted and protected",
      color: "text-green-500"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Quick Response",
      description: "Get replies within 2 hours guaranteed",
      color: "text-orange-500"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Expert Team",
      description: "Answered by qualified professionals",
      color: "text-purple-500"
    }
  ];

  const testimonials = [
    {
      text: "Got my complex query resolved within an hour. Amazing support!",
      author: "Priya S.",
      role: "B.Tech Student",
      rating: 5
    },
    {
      text: "The form made it so easy to explain my issue. Perfect solution!",
      author: "Arjun M.",
      role: "MBA Aspirant",
      rating: 5
    },
    {
      text: "Quick, professional, and exactly what I needed. Highly recommended!",
      author: "Sneha K.",
      role: "Research Scholar",
      rating: 5
    }
  ];

  return (
    <section id="contact-form" className="py-20 px-4 bg-background-secondary">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center space-y-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">
            Get Instant Expert Help
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Submit your query through our smart form system and get connected with the right expert instantly
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Form */}
          <animated.div style={springProps} className="lg:col-span-2">
            <Tilt options={{ max: 8, scale: 1.02, speed: 300 }}>
              <Card className="glassmorphism hover:shadow-2xl transition-all duration-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl gradient-text flex items-center gap-2">
                        <MessageSquare className="w-6 h-6" />
                        Smart Contact Form
                      </CardTitle>
                      <p className="text-foreground-secondary mt-2">
                        AI-powered form for faster resolution
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm text-foreground-secondary">Progress</div>
                        <div className="text-lg font-bold gradient-text">{Math.round(formProgress)}%</div>
                      </div>
                      <Progress 
                        value={formProgress} 
                        className="w-20 h-3" 
                      />
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <AnimatePresence>
                    {!showSuccess ? (
                      <motion.form 
                        onSubmit={handleSubmit} 
                        className="space-y-6"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {formFields.slice(0, 3).map((field, index) => (
                            <motion.div
                              key={field.id}
                              className={field.id === 'category' ? 'md:col-span-1' : ''}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Label htmlFor={field.id} className="text-sm font-medium">
                                {field.label} {field.required && <span className="text-red-500">*</span>}
                              </Label>
                              {field.type === 'select' ? (
                                <select
                                  id={field.id}
                                  name={field.id}
                                  value={formData[field.id as keyof typeof formData]}
                                  onChange={handleInputChange}
                                  required={field.required}
                                  className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                                >
                                  <option value="">{field.placeholder}</option>
                                  {field.options?.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                  ))}
                                </select>
                              ) : (
                                <Input
                                  id={field.id}
                                  name={field.id}
                                  type={field.type}
                                  value={formData[field.id as keyof typeof formData]}
                                  onChange={handleInputChange}
                                  required={field.required}
                                  placeholder={field.placeholder}
                                  className="mt-1 transition-all duration-200 focus:scale-[1.02]"
                                />
                              )}
                            </motion.div>
                          ))}
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Label htmlFor="subject">
                            Subject <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            placeholder="Brief description of your inquiry"
                            className="mt-1 transition-all duration-200 focus:scale-[1.02]"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <Label htmlFor="message">
                            Detailed Message <span className="text-red-500">*</span>
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            placeholder="Please describe your question or issue in detail. Include any error messages, steps you've tried, or specific requirements."
                            className="mt-1 min-h-[120px] transition-all duration-200 focus:scale-[1.02]"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Button 
                            type="submit" 
                            className="w-full btn-hero group relative overflow-hidden"
                            size="lg"
                            disabled={isSubmitting || formProgress < 100}
                          >
                            {isSubmitting ? (
                              <motion.div
                                className="flex items-center gap-2"
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                              >
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Processing...
                              </motion.div>
                            ) : (
                              <>
                                <Send className="w-5 h-5 mr-2" />
                                Submit Query & Open Advanced Form
                                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </motion.form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12 space-y-6"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                        </motion.div>
                        <h3 className="text-2xl font-bold gradient-text">Query Submitted Successfully!</h3>
                        <p className="text-foreground-secondary">
                          Redirecting to our comprehensive form for detailed processing...
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </Tilt>
          </animated.div>

          {/* Sidebar Features & Testimonials */}
          <div className="space-y-8">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="glassmorphism">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    Why Use Our Form?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-background/30 transition-colors duration-200"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className={`mt-1 ${feature.color}`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{feature.title}</h4>
                        <p className="text-xs text-foreground-secondary">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="glassmorphism">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-500" />
                    Our Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text">98%</div>
                      <div className="text-xs text-foreground-secondary">Resolution Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text">1.5h</div>
                      <div className="text-xs text-foreground-secondary">Avg Response</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text">4.9★</div>
                      <div className="text-xs text-foreground-secondary">Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text">24/7</div>
                      <div className="text-xs text-foreground-secondary">Available</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="glassmorphism">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Student Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {testimonials.map((testimonial, index) => (
                      <motion.div
                        key={index}
                        className="p-3 rounded-lg bg-background/20 border-l-2 border-l-accent"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex gap-1 mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-xs text-foreground-secondary italic mb-2">
                          "{testimonial.text}"
                        </p>
                        <div>
                          <p className="text-xs font-semibold">{testimonial.author}</p>
                          <p className="text-xs text-foreground-secondary">{testimonial.role}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedContactForm;