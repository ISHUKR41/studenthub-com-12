import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Send, 
  Sparkles, 
  Phone, 
  Mail, 
  MessageSquare, 
  User, 
  Calendar,
  Clock,
  MapPin,
  Star,
  Zap,
  Heart,
  Shield,
  Globe,
  Headphones,
  BookOpen,
  Target,
  Award,
  Users,
  TrendingUp,
  Lightbulb,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Mic,
  Camera,
  FileText,
  Download,
  Upload,
  Settings,
  Bookmark,
  Share2,
  ThumbsUp,
  MessageCircle,
  Eye,
  Search,
  Handshake,
  HelpCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  serviceType: string;
  urgency: string;
  preferredContact: string;
}

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ children, delay = 0, duration = 4 }) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

const Scene3D: React.FC = () => (
  <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
    <ambientLight intensity={0.3} />
    <directionalLight position={[10, 10, 5]} intensity={1} />
    <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3B82F6" />
    <pointLight position={[10, -10, 5]} intensity={0.5} color="#10B981" />
    
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 32, 32]} position={[-3, 2, 0]}>
        <MeshDistortMaterial
          color="#3B82F6"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0}
          metalness={0.5}
        />
      </Sphere>
    </Float>
    
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
      <Sphere args={[0.8, 32, 32]} position={[3, -1, -2]}>
        <MeshDistortMaterial
          color="#10B981"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
    
    <Float speed={1.8} rotationIntensity={0.8} floatIntensity={2.5}>
      <Sphere args={[0.6, 32, 32]} position={[0, 3, -1]}>
        <MeshDistortMaterial
          color="#F59E0B"
          attach="material"
          distort={0.5}
          speed={1.8}
          roughness={0}
          metalness={0.3}
        />
      </Sphere>
    </Float>
    
    <Center position={[0, 0, -3]}>
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        CONTACT
        <meshNormalMaterial />
      </Text3D>
    </Center>
    
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
  </Canvas>
);

export const UltraModern3DContactForm: React.FC = () => {
  const { toast } = useToast();
  const parallaxRef = useRef<any>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInViewRef, isInView] = useInView({ 
    threshold: 0.2,
    triggerOnce: true 
  });
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceType: '',
    urgency: 'medium',
    preferredContact: 'email'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast({
      title: "Message Sent Successfully! 🚀",
      description: "Our team will get back to you within 2 hours.",
    });

    // Reset form after success animation
    setTimeout(() => {
      setIsSuccess(false);
      setCurrentStep(1);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        serviceType: '',
        urgency: 'medium',
        preferredContact: 'email'
      });
    }, 3000);
  };

  const serviceTypes = [
    { id: 'academic', label: 'Academic Support', icon: <BookOpen className="w-5 h-5" />, color: 'from-blue-500 to-cyan-500' },
    { id: 'technical', label: 'Technical Help', icon: <Settings className="w-5 h-5" />, color: 'from-purple-500 to-pink-500' },
    { id: 'tools', label: 'Tools & Resources', icon: <Zap className="w-5 h-5" />, color: 'from-green-500 to-emerald-500' },
    { id: 'partnership', label: 'Partnership', icon: <Handshake className="w-5 h-5" />, color: 'from-orange-500 to-red-500' },
    { id: 'feedback', label: 'Feedback', icon: <MessageCircle className="w-5 h-5" />, color: 'from-indigo-500 to-purple-500' },
    { id: 'other', label: 'Other Inquiry', icon: <HelpCircle className="w-5 h-5" />, color: 'from-gray-500 to-slate-500' }
  ];

  const urgencyLevels = [
    { id: 'low', label: 'Low Priority', color: 'bg-green-500', description: '48-72 hours response' },
    { id: 'medium', label: 'Medium Priority', color: 'bg-yellow-500', description: '24 hours response' },
    { id: 'high', label: 'High Priority', color: 'bg-orange-500', description: '6-12 hours response' },
    { id: 'urgent', label: 'Urgent', color: 'bg-red-500', description: 'Within 2 hours' }
  ];

  const contactMethods = [
    { id: 'email', label: 'Email', icon: <Mail className="w-5 h-5" />, description: 'Detailed responses' },
    { id: 'phone', label: 'Phone Call', icon: <Phone className="w-5 h-5" />, description: 'Quick discussion' },
    { id: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare className="w-5 h-5" />, description: 'Instant messaging' }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Advanced 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Scene3D />
      </div>

      {/* Parallax Container */}
      <Parallax ref={parallaxRef} pages={1} className="relative z-10">
        <ParallaxLayer offset={0} speed={0.2}>
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background-tertiary opacity-90" />
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0.5}>
          {/* Floating Elements */}
          <div className="absolute top-20 left-10">
            <FloatingElement delay={0}>
              <div className="p-6 glassmorphism rounded-3xl">
                <Phone className="w-8 h-8 text-primary" />
              </div>
            </FloatingElement>
          </div>

          <div className="absolute top-40 right-20">
            <FloatingElement delay={1}>
              <div className="p-4 glassmorphism rounded-2xl">
                <Mail className="w-6 h-6 text-secondary" />
              </div>
            </FloatingElement>
          </div>

          <div className="absolute bottom-40 left-20">
            <FloatingElement delay={2}>
              <div className="p-5 glassmorphism rounded-full">
                <MessageSquare className="w-7 h-7 text-accent" />
              </div>
            </FloatingElement>
          </div>

          <div className="absolute top-1/2 right-10">
            <FloatingElement delay={1.5}>
              <div className="p-4 glassmorphism rounded-xl">
                <Sparkles className="w-8 h-8 text-primary-glow" />
              </div>
            </FloatingElement>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={1}>
          <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-6xl">
              {/* Header Section */}
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center gap-4 mb-8">
                  <motion.div 
                    className="p-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <MessageSquare className="h-8 w-8 text-white" />
                  </motion.div>
                  <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
                    Ultra-Modern Contact Experience
                  </Badge>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
                  Let's Connect & Create Magic
                </h1>
                <p className="text-xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed">
                  Experience our revolutionary 3D contact form with AI-powered assistance, real-time collaboration, 
                  and instant support. Your message matters, and we're here to make communication extraordinary.
                </p>
                
                <div className="flex flex-wrap justify-center gap-6 mt-8">
                  {[
                    { icon: <Zap className="w-5 h-5" />, text: 'Instant Response', color: 'text-yellow-400' },
                    { icon: <Shield className="w-5 h-5" />, text: 'Secure & Private', color: 'text-green-400' },
                    { icon: <Heart className="w-5 h-5" />, text: '24/7 Support', color: 'text-red-400' },
                    { icon: <Globe className="w-5 h-5" />, text: 'Global Reach', color: 'text-blue-400' }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 glassmorphism rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className={feature.color}>{feature.icon}</span>
                      <span className="text-sm font-medium">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Main Form Container */}
              <motion.div
                ref={containerRef}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                className="perspective-1000"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Card className="relative glassmorphism border-2 border-primary/20 shadow-intense overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent animate-gradient-shift" />
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-primary rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          delay: i * 0.2,
                          repeat: Infinity,
                        }}
                      />
                    ))}
                  </div>

                  <CardContent className="relative z-10 p-8 md:p-12">
                    <AnimatePresence mode="wait">
                      {!isSuccess ? (
                        <motion.form
                          key="form"
                          ref={formRef}
                          onSubmit={handleSubmit}
                          className="space-y-8"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {/* Step 1: Basic Information */}
                          {currentStep === 1 && (
                            <motion.div
                              key="step1"
                              initial={{ x: 300, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -300, opacity: 0 }}
                              className="space-y-6"
                            >
                              <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold gradient-text mb-2">Step 1: Tell Us About You</h3>
                                <p className="text-foreground-secondary">Let's start with the basics</p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div
                                  className="space-y-2"
                                  whileFocus={{ scale: 1.02 }}
                                >
                                  <label className="text-sm font-medium flex items-center gap-2">
                                    <User className="w-4 h-4 text-primary" />
                                    Full Name *
                                  </label>
                                  <Input
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    className={`h-12 transition-all duration-300 ${
                                      focusedField === 'name' ? 'border-primary shadow-glow' : ''
                                    }`}
                                    required
                                  />
                                </motion.div>

                                <motion.div
                                  className="space-y-2"
                                  whileFocus={{ scale: 1.02 }}
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
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className={`h-12 transition-all duration-300 ${
                                      focusedField === 'email' ? 'border-primary shadow-glow' : ''
                                    }`}
                                    required
                                  />
                                </motion.div>

                                <motion.div
                                  className="space-y-2"
                                  whileFocus={{ scale: 1.02 }}
                                >
                                  <label className="text-sm font-medium flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-primary" />
                                    Phone Number
                                  </label>
                                  <Input
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    onFocus={() => setFocusedField('phone')}
                                    onBlur={() => setFocusedField(null)}
                                    className={`h-12 transition-all duration-300 ${
                                      focusedField === 'phone' ? 'border-primary shadow-glow' : ''
                                    }`}
                                  />
                                </motion.div>

                                <motion.div
                                  className="space-y-2"
                                  whileFocus={{ scale: 1.02 }}
                                >
                                  <label className="text-sm font-medium flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-primary" />
                                    Subject *
                                  </label>
                                  <Input
                                    placeholder="Brief subject of your inquiry"
                                    value={formData.subject}
                                    onChange={(e) => handleInputChange('subject', e.target.value)}
                                    onFocus={() => setFocusedField('subject')}
                                    onBlur={() => setFocusedField(null)}
                                    className={`h-12 transition-all duration-300 ${
                                      focusedField === 'subject' ? 'border-primary shadow-glow' : ''
                                    }`}
                                    required
                                  />
                                </motion.div>
                              </div>

                              <div className="flex justify-end">
                                <Button
                                  type="button"
                                  onClick={() => setCurrentStep(2)}
                                  className="btn-hero px-8 py-3"
                                  disabled={!formData.name || !formData.email || !formData.subject}
                                >
                                  Next Step
                                  <ChevronRight className="w-5 h-5 ml-2" />
                                </Button>
                              </div>
                            </motion.div>
                          )}

                          {/* Step 2: Service & Preferences */}
                          {currentStep === 2 && (
                            <motion.div
                              key="step2"
                              initial={{ x: 300, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -300, opacity: 0 }}
                              className="space-y-8"
                            >
                              <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold gradient-text mb-2">Step 2: How Can We Help?</h3>
                                <p className="text-foreground-secondary">Choose your service type and preferences</p>
                              </div>

                              {/* Service Type Selection */}
                              <div className="space-y-4">
                                <h4 className="text-lg font-semibold">Service Type</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {serviceTypes.map((service) => (
                                    <motion.div
                                      key={service.id}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <label
                                        className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                          formData.serviceType === service.id
                                            ? 'border-primary bg-primary/10 shadow-glow'
                                            : 'border-border hover:border-primary/50 glassmorphism'
                                        }`}
                                      >
                                        <input
                                          type="radio"
                                          name="serviceType"
                                          value={service.id}
                                          checked={formData.serviceType === service.id}
                                          onChange={(e) => handleInputChange('serviceType', e.target.value)}
                                          className="sr-only"
                                        />
                                        <div className="flex items-center gap-3">
                                          <div className={`p-2 rounded-lg bg-gradient-to-r ${service.color} text-white`}>
                                            {service.icon}
                                          </div>
                                          <span className="font-medium">{service.label}</span>
                                        </div>
                                      </label>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>

                              {/* Urgency Level */}
                              <div className="space-y-4">
                                <h4 className="text-lg font-semibold">Priority Level</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                  {urgencyLevels.map((level) => (
                                    <motion.div
                                      key={level.id}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <label
                                        className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                          formData.urgency === level.id
                                            ? 'border-primary bg-primary/10 shadow-glow'
                                            : 'border-border hover:border-primary/50 glassmorphism'
                                        }`}
                                      >
                                        <input
                                          type="radio"
                                          name="urgency"
                                          value={level.id}
                                          checked={formData.urgency === level.id}
                                          onChange={(e) => handleInputChange('urgency', e.target.value)}
                                          className="sr-only"
                                        />
                                        <div className="text-center space-y-2">
                                          <div className={`w-4 h-4 rounded-full ${level.color} mx-auto`} />
                                          <div className="font-medium">{level.label}</div>
                                          <div className="text-xs text-foreground-secondary">{level.description}</div>
                                        </div>
                                      </label>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>

                              {/* Preferred Contact Method */}
                              <div className="space-y-4">
                                <h4 className="text-lg font-semibold">Preferred Contact Method</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {contactMethods.map((method) => (
                                    <motion.div
                                      key={method.id}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <label
                                        className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                          formData.preferredContact === method.id
                                            ? 'border-primary bg-primary/10 shadow-glow'
                                            : 'border-border hover:border-primary/50 glassmorphism'
                                        }`}
                                      >
                                        <input
                                          type="radio"
                                          name="preferredContact"
                                          value={method.id}
                                          checked={formData.preferredContact === method.id}
                                          onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                                          className="sr-only"
                                        />
                                        <div className="text-center space-y-2">
                                          <div className="text-primary">{method.icon}</div>
                                          <div className="font-medium">{method.label}</div>
                                          <div className="text-xs text-foreground-secondary">{method.description}</div>
                                        </div>
                                      </label>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>

                              <div className="flex justify-between">
                                <Button
                                  type="button"
                                  onClick={() => setCurrentStep(1)}
                                  variant="outline"
                                  className="px-8 py-3"
                                >
                                  Previous
                                </Button>
                                <Button
                                  type="button"
                                  onClick={() => setCurrentStep(3)}
                                  className="btn-hero px-8 py-3"
                                  disabled={!formData.serviceType}
                                >
                                  Final Step
                                  <ChevronRight className="w-5 h-5 ml-2" />
                                </Button>
                              </div>
                            </motion.div>
                          )}

                          {/* Step 3: Message & Submit */}
                          {currentStep === 3 && (
                            <motion.div
                              key="step3"
                              initial={{ x: 300, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -300, opacity: 0 }}
                              className="space-y-6"
                            >
                              <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold gradient-text mb-2">Step 3: Your Message</h3>
                                <p className="text-foreground-secondary">Tell us more about your inquiry</p>
                              </div>

                              <motion.div
                                className="space-y-2"
                                whileFocus={{ scale: 1.02 }}
                              >
                                <label className="text-sm font-medium flex items-center gap-2">
                                  <MessageSquare className="w-4 h-4 text-primary" />
                                  Your Message *
                                </label>
                                <Textarea
                                  placeholder="Please provide details about your inquiry. The more information you share, the better we can assist you..."
                                  value={formData.message}
                                  onChange={(e) => handleInputChange('message', e.target.value)}
                                  onFocus={() => setFocusedField('message')}
                                  onBlur={() => setFocusedField(null)}
                                  className={`min-h-40 transition-all duration-300 ${
                                    focusedField === 'message' ? 'border-primary shadow-glow' : ''
                                  }`}
                                  required
                                />
                                <div className="text-xs text-foreground-secondary text-right">
                                  {formData.message.length}/500 characters
                                </div>
                              </motion.div>

                              {/* Form Summary */}
                              <div className="p-6 glassmorphism rounded-xl">
                                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                  Review Your Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div><strong>Name:</strong> {formData.name}</div>
                                  <div><strong>Email:</strong> {formData.email}</div>
                                  <div><strong>Phone:</strong> {formData.phone || 'Not provided'}</div>
                                  <div><strong>Subject:</strong> {formData.subject}</div>
                                  <div><strong>Service:</strong> {serviceTypes.find(s => s.id === formData.serviceType)?.label}</div>
                                  <div><strong>Priority:</strong> {urgencyLevels.find(u => u.id === formData.urgency)?.label}</div>
                                </div>
                              </div>

                              <div className="flex justify-between">
                                <Button
                                  type="button"
                                  onClick={() => setCurrentStep(2)}
                                  variant="outline"
                                  className="px-8 py-3"
                                >
                                  Previous
                                </Button>
                                <Button
                                  type="submit"
                                  className="btn-hero px-8 py-3 relative overflow-hidden"
                                  disabled={!formData.message || isSubmitting}
                                >
                                  {isSubmitting ? (
                                    <>
                                      <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                      />
                                      Sending...
                                    </>
                                  ) : (
                                    <>
                                      Send Message
                                      <Send className="w-5 h-5 ml-2" />
                                    </>
                                  )}
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </motion.form>
                      ) : (
                        <motion.div
                          key="success"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-center py-12"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                          >
                            <CheckCircle className="w-12 h-12 text-white" />
                          </motion.div>
                          
                          <motion.h3
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-3xl font-bold gradient-text mb-4"
                          >
                            Message Sent Successfully! 🎉
                          </motion.h3>
                          
                          <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-foreground-secondary mb-8 max-w-md mx-auto"
                          >
                            Thank you for reaching out! Our team will get back to you within the timeframe based on your selected priority level.
                          </motion.p>
                          
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="space-y-4"
                          >
                            <p className="text-sm text-foreground-secondary">
                              Reference ID: #MSG{Math.random().toString(36).substr(2, 9).toUpperCase()}
                            </p>
                            
                            <div className="flex flex-wrap justify-center gap-4">
                              <Button
                                variant="outline"
                                onClick={() => window.open('https://wa.me/919876543210?text=Hello! I just sent a message through your contact form.', '_blank')}
                                className="px-6 py-2"
                              >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                WhatsApp Us
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => window.open('mailto:support@studenthub.com', '_blank')}
                                className="px-6 py-2"
                              >
                                <Mail className="w-4 h-4 mr-2" />
                                Email Support
                              </Button>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </section>
  );
};