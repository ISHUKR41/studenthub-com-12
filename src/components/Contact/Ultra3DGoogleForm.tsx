import React, { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useScroll } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Sphere, Box, Environment, Effects, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Send, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  ChevronRight, 
  Sparkles,
  Shield,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Globe,
  Zap,
  Brain
} from 'lucide-react';
import { toast } from 'sonner';

// 3D Floating Elements Component
const FloatingElement = ({ position, color, shape = 'sphere' }: { position: [number, number, number], color: string, shape?: 'sphere' | 'box' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + position[1]) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {shape === 'sphere' ? (
          <sphereGeometry args={[0.3, 32, 32]} />
        ) : (
          <boxGeometry args={[0.4, 0.4, 0.4]} />
        )}
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
};

// Enhanced 3D Scene
const Enhanced3DScene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4F46E5" />
      
      <Environment preset="city" />
      
      {/* Floating Elements */}
      <FloatingElement position={[-3, 2, -2]} color="#3B82F6" shape="sphere" />
      <FloatingElement position={[3, -1, -1]} color="#10B981" shape="box" />
      <FloatingElement position={[0, 3, -3]} color="#F59E0B" shape="sphere" />
      <FloatingElement position={[-2, -2, -2]} color="#EF4444" shape="box" />
      <FloatingElement position={[2, 0, -4]} color="#8B5CF6" shape="sphere" />
      
      {/* Enhanced Effects */}
      <Effects>
        <EffectComposer>
          <Bloom intensity={0.5} luminanceThreshold={0.9} />
          <ChromaticAberration offset={[0.001, 0.001]} />
        </EffectComposer>
      </Effects>
    </>
  );
};

export const Ultra3DGoogleForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    priority: '',
    message: '',
    agreeToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const steps = [
    { 
      id: 1, 
      title: 'Personal Info', 
      icon: <User className="w-5 h-5" />, 
      description: 'Tell us about yourself',
      fields: ['name', 'email', 'phone']
    },
    { 
      id: 2, 
      title: 'Request Details', 
      icon: <MessageSquare className="w-5 h-5" />, 
      description: 'What can we help you with?',
      fields: ['subject', 'category', 'priority']
    },
    { 
      id: 3, 
      title: 'Message', 
      icon: <Send className="w-5 h-5" />, 
      description: 'Share more details',
      fields: ['message']
    }
  ];

  const categories = [
    { value: 'book-request', label: 'Book/Paper Request', icon: '📚' },
    { value: 'technical-support', label: 'Technical Support', icon: '🔧' },
    { value: 'account-help', label: 'Account Help', icon: '👤' },
    { value: 'tools-issue', label: 'Tools Issue', icon: '⚡' },
    { value: 'partnership', label: 'Partnership', icon: '🤝' },
    { value: 'feedback', label: 'Feedback', icon: '💭' },
    { value: 'other', label: 'Other', icon: '❓' }
  ];

  const priorities = [
    { value: 'low', label: 'Low Priority', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-yellow-500' },
    { value: 'high', label: 'High Priority', color: 'bg-orange-500' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-500' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number) => {
    const stepFields = steps[step - 1].fields;
    return stepFields.every(field => {
      if (field === 'phone') return true; // Optional field
      const value = formData[field as keyof typeof formData];
      return typeof value === 'string' ? value.trim() !== '' : !!value;
    });
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) {
      toast.error('Please complete all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        className="min-h-screen flex items-center justify-center p-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="max-w-2xl w-full glassmorphism border-primary/30">
          <CardContent className="p-12 text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", duration: 0.6 }}
              className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-3xl font-bold gradient-text mb-4">Message Sent Successfully!</h3>
              <p className="text-lg text-foreground-secondary mb-6">
                Thank you for reaching out. Our team will review your message and respond within 24 hours.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="px-4 py-2 bg-primary/20 text-primary border-primary/30">
                  <Clock className="w-4 h-4 mr-2" />
                  Response within 24h
                </Badge>
                <Badge className="px-4 py-2 bg-green-500/20 text-green-400 border-green-500/30">
                  <Shield className="w-4 h-4 mr-2" />
                  100% Secure
                </Badge>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <section ref={containerRef} className="relative py-20 px-4 min-h-screen overflow-hidden">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Suspense fallback={null}>
            <Enhanced3DScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Animated Background Gradients */}
      <motion.div 
        className="absolute inset-0 z-10"
        style={{ y, opacity }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-20">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center space-y-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div 
              className="p-4 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              <Brain className="h-8 w-8 text-white" />
            </motion.div>
            <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30">
              Ultra-Modern 3D Contact System
            </Badge>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold gradient-text">
            Connect With Our
            <span className="block text-transparent bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text">
              Expert Team
            </span>
          </h2>
          
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Experience the future of student support with our AI-powered, 3D-enhanced contact system
          </p>

          {/* Enhanced Progress Indicator */}
          <div className="flex items-center justify-center space-x-4 mt-12">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <motion.div 
                  className={`relative group cursor-pointer`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                >
                  <div className={`
                    flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300
                    ${currentStep >= step.id 
                      ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg' 
                      : 'bg-background-secondary border border-border hover:border-primary/50'
                    }
                  `}>
                    <div className={`
                      p-2 rounded-lg
                      ${currentStep >= step.id ? 'bg-white/20' : 'bg-primary/10'}
                    `}>
                      {step.icon}
                    </div>
                    <div className="text-left hidden sm:block">
                      <div className="font-semibold text-sm">{step.title}</div>
                      <div className="text-xs opacity-80">{step.description}</div>
                    </div>
                  </div>
                  
                  {/* Step Indicator */}
                  <motion.div 
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center text-white text-xs font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: currentStep >= step.id ? 1 : 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    {step.id}
                  </motion.div>
                </motion.div>
                
                {index < steps.length - 1 && (
                  <ChevronRight className={`w-5 h-5 ${currentStep > step.id ? 'text-primary' : 'text-border'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Ultra-Modern Form */}
        <motion.div
          className="max-w-4xl mx-auto"
          layout
          transition={{ duration: 0.4 }}
        >
          <Card className="glassmorphism border-primary/20 shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <AnimatePresence mode="wait">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold gradient-text mb-2">Personal Information</h3>
                        <p className="text-foreground-secondary">Let us know who you are</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="space-y-2"
                        >
                          <label className="text-sm font-medium flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            Full Name *
                          </label>
                          <Input
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="h-12 border-2 hover:border-primary/50 focus:border-primary transition-all"
                          />
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="space-y-2"
                        >
                          <label className="text-sm font-medium flex items-center gap-2">
                            <Mail className="w-4 h-4 text-primary" />
                            Email Address *
                          </label>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="h-12 border-2 hover:border-primary/50 focus:border-primary transition-all"
                          />
                        </motion.div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="space-y-2"
                      >
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Phone className="w-4 h-4 text-primary" />
                          Phone Number (Optional)
                        </label>
                        <Input
                          type="tel"
                          placeholder="+91 12345 67890"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="h-12 border-2 hover:border-primary/50 focus:border-primary transition-all"
                        />
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Step 2: Request Details */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold gradient-text mb-2">Request Details</h3>
                        <p className="text-foreground-secondary">Help us understand your needs better</p>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="space-y-2"
                      >
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          Subject *
                        </label>
                        <Input
                          placeholder="Brief description of your request"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          className="h-12 border-2 hover:border-primary/50 focus:border-primary transition-all"
                        />
                      </motion.div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="space-y-2"
                        >
                          <label className="text-sm font-medium flex items-center gap-2">
                            <Globe className="w-4 h-4 text-primary" />
                            Category *
                          </label>
                          <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                            <SelectTrigger className="h-12 border-2 hover:border-primary/50 focus:border-primary">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map(category => (
                                <SelectItem key={category.value} value={category.value}>
                                  <div className="flex items-center gap-2">
                                    <span>{category.icon}</span>
                                    {category.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="space-y-2"
                        >
                          <label className="text-sm font-medium flex items-center gap-2">
                            <Zap className="w-4 h-4 text-primary" />
                            Priority *
                          </label>
                          <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                            <SelectTrigger className="h-12 border-2 hover:border-primary/50 focus:border-primary">
                              <SelectValue placeholder="Select priority level" />
                            </SelectTrigger>
                            <SelectContent>
                              {priorities.map(priority => (
                                <SelectItem key={priority.value} value={priority.value}>
                                  <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${priority.color}`} />
                                    {priority.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Message */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold gradient-text mb-2">Your Message</h3>
                        <p className="text-foreground-secondary">Share the details of your request</p>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.005 }}
                        className="space-y-2"
                      >
                        <label className="text-sm font-medium flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-primary" />
                          Detailed Message *
                        </label>
                        <Textarea
                          placeholder="Please provide detailed information about your request, including any specific requirements or questions you may have..."
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className="min-h-[200px] border-2 hover:border-primary/50 focus:border-primary transition-all resize-none"
                        />
                      </motion.div>

                      {/* Summary Card */}
                      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                        <CardContent className="p-6">
                          <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <Star className="w-5 h-5 text-primary" />
                            Request Summary
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div><strong>Name:</strong> {formData.name || 'Not provided'}</div>
                            <div><strong>Email:</strong> {formData.email || 'Not provided'}</div>
                            <div><strong>Category:</strong> {categories.find(c => c.value === formData.category)?.label || 'Not selected'}</div>
                            <div><strong>Priority:</strong> {priorities.find(p => p.value === formData.priority)?.label || 'Not selected'}</div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Enhanced Navigation Buttons */}
                <div className="flex justify-between items-center pt-8 border-t border-border/20">
                  {currentStep > 1 ? (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="px-8 py-3 border-2 hover:border-primary/50"
                      >
                        Previous Step
                      </Button>
                    </motion.div>
                  ) : (
                    <div></div>
                  )}

                  <div className="flex items-center gap-4">
                    {currentStep < 3 ? (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="btn-hero px-8 py-3 bg-gradient-to-r from-primary to-accent"
                        >
                          Next Step
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-hero px-8 py-3 bg-gradient-to-r from-accent to-secondary"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};