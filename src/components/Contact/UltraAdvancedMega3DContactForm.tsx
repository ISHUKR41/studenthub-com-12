import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Plane, Text, Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Send, 
  Sparkles, 
  Globe, 
  Zap, 
  Shield, 
  Clock, 
  MessageSquare,
  Phone,
  Mail,
  User,
  FileText,
  Star,
  CheckCircle,
  ArrowRight,
  Brain,
  Rocket,
  Heart
} from 'lucide-react';

// 3D Animated Sphere Component
const AnimatedSphere = ({ position, color, speed = 1 }: { position: [number, number, number], color: string, speed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.3;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * speed * 0.8) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 2) * 0.3;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.1} floatIntensity={0.2}>
      <Sphere ref={meshRef} position={position} args={[0.8, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={speed * 2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

// Floating Particles Component
const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#3b82f6" transparent opacity={0.6} />
    </points>
  );
};

// 3D Scene Component
const ContactForm3DScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#10b981" />
      <pointLight position={[10, -10, 5]} intensity={0.8} color="#f59e0b" />
      
      <AnimatedSphere position={[-4, 2, -2]} color="#3b82f6" speed={1} />
      <AnimatedSphere position={[4, -2, -3]} color="#10b981" speed={1.2} />
      <AnimatedSphere position={[0, 3, -4]} color="#f59e0b" speed={0.8} />
      <AnimatedSphere position={[-3, -1, 2]} color="#ef4444" speed={1.5} />
      <AnimatedSphere position={[3, 1, 1]} color="#8b5cf6" speed={0.9} />
      
      <FloatingParticles />
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};

export const UltraAdvancedMega3DContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    priority: '',
    message: '',
    attachment: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const { toast } = useToast();

  const formSteps = [
    { id: 1, title: 'Personal Info', icon: <User className="w-5 h-5" />, fields: ['name', 'email', 'phone'] },
    { id: 2, title: 'Request Details', icon: <FileText className="w-5 h-5" />, fields: ['subject', 'category', 'priority'] },
    { id: 3, title: 'Message', icon: <MessageSquare className="w-5 h-5" />, fields: ['message'] }
  ];

  const categories = [
    { value: 'book-request', label: 'Book Request', icon: '📚' },
    { value: 'technical-support', label: 'Technical Support', icon: '🔧' },
    { value: 'account-help', label: 'Account Help', icon: '👤' },
    { value: 'feature-request', label: 'Feature Request', icon: '💡' },
    { value: 'partnership', label: 'Partnership', icon: '🤝' },
    { value: 'other', label: 'Other', icon: '💬' }
  ];

  const priorities = [
    { value: 'low', label: 'Low Priority', color: 'from-green-500 to-emerald-600', time: '48-72 hours' },
    { value: 'medium', label: 'Medium Priority', color: 'from-yellow-500 to-orange-600', time: '24-48 hours' },
    { value: 'high', label: 'High Priority', color: 'from-red-500 to-pink-600', time: '2-4 hours' },
    { value: 'urgent', label: 'Urgent', color: 'from-purple-500 to-indigo-600', time: '< 1 hour' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number) => {
    const stepFields = formSteps[step - 1].fields;
    return stepFields.every(field => formData[field as keyof typeof formData] !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      toast({
        title: "Message Sent Successfully! 🎉",
        description: "Our team will respond within the specified timeframe based on your priority level."
      });

      // Reset form after success
      setTimeout(() => {
        setIsSuccess(false);
        setCurrentStep(1);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          category: '',
          priority: '',
          message: '',
          attachment: null
        });
      }, 3000);

    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen py-20 px-4 bg-gradient-to-br from-background via-primary/5 to-secondary/5 overflow-hidden">
      {/* Ultra-Advanced 3D Background */}
      <div className="absolute inset-0 z-0">
        <ContactForm3DScene />
      </div>

      {/* Animated Background Overlays */}
      <div className="absolute inset-0 z-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, ${['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][i % 4]} 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center space-y-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div 
              className="p-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl shadow-2xl"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>
            <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
              Ultra-Advanced Contact Form
            </Badge>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold gradient-text leading-tight">
            Contact Us in
            <br />
            <span className="gradient-text-accent">3D Style</span>
          </h2>
          <p className="text-xl md:text-2xl text-foreground-secondary leading-relaxed max-w-4xl mx-auto">
            Experience the future of communication with our ultra-modern, AI-powered contact form
            featuring stunning 3D visuals and intelligent assistance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            className="relative p-8 rounded-3xl glassmorphism shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                {formSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className={`flex items-center space-x-2 ${
                      currentStep >= step.id ? 'text-primary' : 'text-foreground-secondary'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`p-2 rounded-full ${
                      currentStep >= step.id 
                        ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                        : 'bg-muted text-foreground-secondary'
                    }`}>
                      {step.icon}
                    </div>
                    <span className="font-medium hidden sm:block">{step.title}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                  className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ width: '33%' }}
                  animate={{ width: `${(currentStep / formSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        onHoverStart={() => setHoveredField('name')}
                        onHoverEnd={() => setHoveredField(null)}
                      >
                        <label className="block text-sm font-medium mb-2 text-foreground">
                          <User className="w-4 h-4 inline mr-2" />
                          Full Name *
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter your full name"
                          className={`transition-all duration-300 ${
                            hoveredField === 'name' ? 'border-primary shadow-glow' : ''
                          }`}
                          required
                        />
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        onHoverStart={() => setHoveredField('email')}
                        onHoverEnd={() => setHoveredField(null)}
                      >
                        <label className="block text-sm font-medium mb-2 text-foreground">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your.email@example.com"
                          className={`transition-all duration-300 ${
                            hoveredField === 'email' ? 'border-primary shadow-glow' : ''
                          }`}
                          required
                        />
                      </motion.div>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onHoverStart={() => setHoveredField('phone')}
                      onHoverEnd={() => setHoveredField(null)}
                    >
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number *
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        className={`transition-all duration-300 ${
                          hoveredField === 'phone' ? 'border-primary shadow-glow' : ''
                        }`}
                        required
                      />
                    </motion.div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        <FileText className="w-4 h-4 inline mr-2" />
                        Subject *
                      </label>
                      <Input
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Brief description of your request"
                        className="transition-all duration-300 hover:border-primary hover:shadow-glow"
                        required
                      />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <label className="block text-sm font-medium mb-2 text-foreground">
                          <Brain className="w-4 h-4 inline mr-2" />
                          Category *
                        </label>
                        <Select onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger className="transition-all duration-300 hover:border-primary">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                <span className="flex items-center">
                                  <span className="mr-2">{category.icon}</span>
                                  {category.label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02 }}>
                        <label className="block text-sm font-medium mb-2 text-foreground">
                          <Zap className="w-4 h-4 inline mr-2" />
                          Priority Level *
                        </label>
                        <Select onValueChange={(value) => handleInputChange('priority', value)}>
                          <SelectTrigger className="transition-all duration-300 hover:border-primary">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            {priorities.map((priority) => (
                              <SelectItem key={priority.value} value={priority.value}>
                                <div className="flex items-center justify-between w-full">
                                  <span>{priority.label}</span>
                                  <Badge className={`ml-2 bg-gradient-to-r ${priority.color} text-white text-xs`}>
                                    {priority.time}
                                  </Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        <MessageSquare className="w-4 h-4 inline mr-2" />
                        Your Message *
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Please describe your request in detail..."
                        rows={6}
                        className="transition-all duration-300 hover:border-primary hover:shadow-glow resize-none"
                        required
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-3"
                  >
                    Previous
                  </Button>
                )}
                
                <div className="ml-auto">
                  {currentStep < formSteps.length ? (
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={!validateStep(currentStep)}
                      className="btn-hero px-6 py-3"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting || !validateStep(currentStep)}
                      className="btn-hero px-8 py-3 group"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 mr-2"
                          >
                            <Sparkles className="w-4 h-4" />
                          </motion.div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                          Send Message
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>

            {/* Success Animation */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-gradient-to-br from-green-500/90 to-emerald-600/90 rounded-3xl flex items-center justify-center backdrop-blur-lg"
                >
                  <div className="text-center text-white space-y-4">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <CheckCircle className="w-16 h-16 mx-auto" />
                    </motion.div>
                    <h3 className="text-2xl font-bold">Message Sent!</h3>
                    <p>We'll get back to you soon.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Information & Stats */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  icon: <Phone className="w-6 h-6" />,
                  title: "Call Us",
                  value: "+91 98765 43210",
                  subtitle: "Mon-Fri 9AM-6PM IST",
                  gradient: "from-blue-500 to-cyan-600",
                  action: () => window.open('tel:+919876543210')
                },
                {
                  icon: <Mail className="w-6 h-6" />,
                  title: "Email Us",
                  value: "support@studenthub.com",
                  subtitle: "Response within 24 hours",
                  gradient: "from-emerald-500 to-teal-600",
                  action: () => window.open('mailto:support@studenthub.com')
                },
                {
                  icon: <MessageSquare className="w-6 h-6" />,
                  title: "WhatsApp",
                  value: "Instant Support",
                  subtitle: "Quick responses guaranteed",
                  gradient: "from-green-500 to-emerald-600",
                  action: () => window.open('https://wa.me/919876543210?text=Hello! I need support from STUDENTHUB.')
                }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl glassmorphism cursor-pointer group hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={contact.action}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${contact.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                      {contact.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {contact.title}
                      </h3>
                      <p className="text-foreground text-sm">{contact.value}</p>
                      <p className="text-xs text-foreground-secondary">{contact.subtitle}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-foreground-secondary group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Support Stats */}
            <div className="p-6 rounded-2xl glassmorphism">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
                <Star className="w-5 h-5 mr-2 text-accent" />
                Support Excellence
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '98.7%', label: 'Satisfaction', icon: <Heart className="w-4 h-4" /> },
                  { value: '< 15m', label: 'Avg Response', icon: <Clock className="w-4 h-4" /> },
                  { value: '50K+', label: 'Queries Solved', icon: <CheckCircle className="w-4 h-4" /> },
                  { value: '24/7', label: 'Availability', icon: <Globe className="w-4 h-4" /> }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-border/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center justify-center mb-2 text-primary">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs text-foreground-secondary">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <Shield className="w-4 h-4" />, text: "Secure & Private" },
                { icon: <Zap className="w-4 h-4" />, text: "Lightning Fast" },
                { icon: <Rocket className="w-4 h-4" />, text: "AI-Powered" }
              ].map((badge, index) => (
                <Badge
                  key={index}
                  className="px-3 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30"
                >
                  {badge.icon}
                  <span className="ml-2">{badge.text}</span>
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};