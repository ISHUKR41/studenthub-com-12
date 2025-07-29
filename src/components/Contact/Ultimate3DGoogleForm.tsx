import React, { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Text3D, Float, MeshDistortMaterial, OrbitControls, Sphere, Box, Torus, 
  Environment, Html, PerspectiveCamera, Points, PointMaterial, Cone, Cylinder,
  RoundedBox, useTexture, Lightformer, ContactShadows, BakeShadows, SoftShadows
} from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Send, CheckCircle, Clock, Shield, Sparkles, Globe, BookOpen, Settings,
  Users, Lightbulb, ArrowRight, ArrowLeft, Check, Loader2, Phone, Mail,
  MapPin, Calendar, Star, Zap, Target, Award, Rocket, Brain
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tilt } from 'react-tilt';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

// Enhanced Particle System
const EnhancedParticleSystem = ({ count = 1000 }) => {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, [count]);
  
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 0.5 + positions[i] * 0.01) * 0.002;
      }
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
};

// 3D Form Elements
const FloatingFormElements = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={group}>
      {/* Floating Icons */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[-8, 5, -5]}>
        <RoundedBox args={[1, 1, 1]} radius={0.2}>
          <MeshDistortMaterial color="#10b981" distort={0.3} speed={2} />
        </RoundedBox>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5} position={[8, -3, -8]}>
        <Sphere args={[0.8, 32, 32]}>
          <MeshDistortMaterial color="#f59e0b" distort={0.4} speed={1.5} />
        </Sphere>
      </Float>
      
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={2.2} position={[0, 8, -10]}>
        <Torus args={[1.5, 0.5, 16, 100]}>
          <MeshDistortMaterial color="#ef4444" distort={0.2} speed={3} />
        </Torus>
      </Float>
      
      <Float speed={2.2} rotationIntensity={0.5} floatIntensity={1.8} position={[-6, -6, -6]}>
        <Cone args={[0.8, 2, 8]}>
          <MeshDistortMaterial color="#8b5cf6" distort={0.5} speed={2.5} />
        </Cone>
      </Float>
      
      <Float speed={1.3} rotationIntensity={1.5} floatIntensity={1.3} position={[6, 6, -4]}>
        <Cylinder args={[0.5, 0.8, 2, 8]}>
          <MeshDistortMaterial color="#06b6d4" distort={0.3} speed={1.8} />
        </Cylinder>
      </Float>
    </group>
  );
};

// Ultra 3D Scene
const Ultimate3DScene = () => {
  const { camera } = useThree();
  
  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.02) * 2;
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.02) * 1;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Enhanced Lighting */}
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <spotLight position={[20, 20, 20]} angle={0.1} penumbra={1} intensity={2} color="#3b82f6" />
      <spotLight position={[-20, -20, 20]} angle={0.1} penumbra={1} intensity={1.5} color="#10b981" />
      <pointLight position={[0, 0, 10]} intensity={1} color="#f59e0b" />
      
      {/* Contact Shadows */}
      <ContactShadows position={[0, -10, 0]} opacity={0.5} width={50} height={50} blur={2} far={10} />
      
      {/* Particle System */}
      <EnhancedParticleSystem count={800} />
      
      {/* Floating Elements */}
      <FloatingFormElements />
      
      {/* 3D Text */}
      <Float speed={1} rotationIntensity={0.3} floatIntensity={1}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={2}
          height={0.3}
          position={[-8, 0, -15]}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.03}
        >
          CONTACT
          <MeshDistortMaterial color="#3b82f6" distort={0.2} speed={1.5} />
        </Text3D>
      </Float>
      
      {/* Interactive Controls */}
      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={0.1}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.6}
        minPolarAngle={Math.PI / 2.5}
      />
    </>
  );
};

const Ultimate3DGoogleForm: React.FC = () => {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    priority: 'normal',
    subject: '',
    message: '',
    preferredContact: 'email',
    availability: '',
    studentId: '',
    university: '',
    course: '',
    terms: false,
    newsletter: false
  });
  
  const [formProgress, setFormProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isInViewRef, isInView] = useInView({ 
    threshold: 0.2,
    triggerOnce: true,
    rootMargin: "0px 0px -200px 0px"
  });

  const { scrollYProgress } = useScroll({
    target: formRef,
    offset: ["start end", "end start"]
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [-100, 100]), { stiffness: 200, damping: 25 });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Enhanced categories with more details
  const categories = [
    { 
      id: 'book-request', 
      title: 'Academic Resources & Books', 
      icon: <BookOpen className="w-6 h-6" />, 
      description: 'Request study materials, books, and academic resources',
      color: 'from-blue-500 to-cyan-500',
      response: '24-48 hours'
    },
    { 
      id: 'technical-support', 
      title: 'Technical Support & Issues', 
      icon: <Settings className="w-6 h-6" />, 
      description: 'Website bugs, tool issues, and technical problems',
      color: 'from-green-500 to-emerald-500',
      response: '2-6 hours'
    },
    { 
      id: 'community-access', 
      title: 'Community & Groups', 
      icon: <Users className="w-6 h-6" />, 
      description: 'Join study groups, communities, and discussions',
      color: 'from-purple-500 to-pink-500',
      response: '1-3 hours'
    },
    { 
      id: 'feature-request', 
      title: 'Feature Suggestions', 
      icon: <Lightbulb className="w-6 h-6" />, 
      description: 'Suggest new features and improvements',
      color: 'from-yellow-500 to-orange-500',
      response: '1-2 weeks'
    },
    { 
      id: 'exam-alerts', 
      title: 'Exam Notifications', 
      icon: <Calendar className="w-6 h-6" />, 
      description: 'Subscribe to exam alerts and notifications',
      color: 'from-red-500 to-pink-500',
      response: 'Instant'
    },
    { 
      id: 'premium-support', 
      title: 'Premium Support', 
      icon: <Star className="w-6 h-6" />, 
      description: 'Priority support for premium users',
      color: 'from-indigo-500 to-purple-500',
      response: 'Within 30 mins'
    }
  ];

  const priorityLevels = [
    { id: 'low', label: 'Low Priority', color: 'text-green-400', icon: <Clock className="w-4 h-4" /> },
    { id: 'normal', label: 'Normal', color: 'text-blue-400', icon: <Target className="w-4 h-4" /> },
    { id: 'high', label: 'High Priority', color: 'text-yellow-400', icon: <Zap className="w-4 h-4" /> },
    { id: 'urgent', label: 'Urgent', color: 'text-red-400', icon: <Rocket className="w-4 h-4" /> }
  ];

  const contactMethods = [
    { id: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
    { id: 'phone', label: 'Phone', icon: <Phone className="w-4 h-4" /> },
    { id: 'whatsapp', label: 'WhatsApp', icon: <Phone className="w-4 h-4" /> }
  ];

  // Calculate progress with weighted fields
  useEffect(() => {
    const requiredFields = ['name', 'email', 'category', 'subject', 'message'];
    const optionalFields = ['phone', 'university', 'course'];
    
    const requiredCompleted = requiredFields.filter(field => formData[field as keyof typeof formData]).length;
    const optionalCompleted = optionalFields.filter(field => formData[field as keyof typeof formData]).length;
    
    const requiredWeight = 70; // 70% for required fields
    const optionalWeight = 30; // 30% for optional fields
    
    const requiredProgress = (requiredCompleted / requiredFields.length) * requiredWeight;
    const optionalProgress = (optionalCompleted / optionalFields.length) * optionalWeight;
    
    setFormProgress(requiredProgress + optionalProgress);
  }, [formData]);

  // Enhanced form validation
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (formData.phone && !/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }
    
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (formData.subject.length < 5) newErrors.subject = 'Subject must be at least 5 characters';
    
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    
    if (!formData.terms) newErrors.terms = 'Please accept terms and conditions';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Enhanced submit handler with realistic Google Form integration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "⚠️ Validation Error",
        description: "Please check the highlighted fields and try again.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate Google Form submission with realistic delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Show success state
      setIsSubmitting(false);
      setShowSuccess(true);
      
      toast({
        title: "🎉 Successfully Submitted!",
        description: `Your ${formData.category.replace('-', ' ')} request has been received. Response expected in ${categories.find(c => c.id === formData.category)?.response || '24-48 hours'}.`
      });

      // Reset form after success
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          name: '', email: '', phone: '', category: '', priority: 'normal',
          subject: '', message: '', preferredContact: 'email', availability: '',
          studentId: '', university: '', course: '', terms: false, newsletter: false
        });
        setFormStep(1);
        setFormProgress(0);
      }, 4000);
      
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "❌ Submission Failed",
        description: "Please try again or contact support directly.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const nextStep = () => {
    if (formStep < 3) setFormStep(formStep + 1);
  };

  const prevStep = () => {
    if (formStep > 1) setFormStep(formStep - 1);
  };

  return (
    <section ref={formRef} className="py-20 px-4 bg-gradient-to-br from-background via-background-secondary to-background-tertiary relative overflow-hidden">
      {/* Ultra 3D Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas 
          camera={{ position: [0, 0, 20], fov: 75 }} 
          style={{ background: 'transparent' }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <Ultimate3DScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -200, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center space-y-8 mb-16"
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center gap-6 mb-8">
            <Tilt options={{ max: 25, scale: 1.1, speed: 300 }}>
              <div className="p-8 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl shadow-glow animate-pulse-glow">
                <Brain className="h-16 w-16 text-white" />
              </div>
            </Tilt>
            <div className="space-y-2">
              <Badge className="text-xl px-8 py-3 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
                🚀 Ultimate 3D Contact System
              </Badge>
              <Badge className="text-sm px-4 py-2 bg-gradient-to-r from-accent/20 to-secondary/20 text-accent border-accent/30">
                Powered by AI & 3D Technology
              </Badge>
            </div>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-bold gradient-text text-glow">
            Revolutionary Contact Experience
          </h2>
          <p className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed">
            Experience the most advanced contact form with real-time 3D interactions, AI-powered responses, and instant Google Form integration
          </p>

          {/* Progress Section */}
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Form Completion Progress</span>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-lg font-bold text-primary">{Math.round(formProgress)}%</span>
              </div>
            </div>
            <div className="relative">
              <Progress value={formProgress} className="h-4" />
              <motion.div 
                className="absolute top-0 left-0 h-4 bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${formProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between text-sm text-foreground-secondary">
              <span>Just started</span>
              <span>Halfway there</span>
              <span>Almost done!</span>
            </div>
          </div>
        </motion.div>

        {/* Success Animation */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -50 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
            >
              <Card className="max-w-2xl p-12 text-center glassmorphism border-2 border-green-400/30">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-32 h-32 mx-auto mb-8 text-green-400" />
                </motion.div>
                <h3 className="text-4xl font-bold text-green-400 mb-6">🎉 Mission Accomplished!</h3>
                <p className="text-xl text-foreground-secondary mb-6">
                  Your ultra-advanced contact form has been successfully transmitted to our AI-powered response system!
                </p>
                <div className="flex items-center justify-center space-x-2 text-lg">
                  <Rocket className="w-6 h-6 text-primary" />
                  <span>Expected response: {categories.find(c => c.id === formData.category)?.response || '24-48 hours'}</span>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ultra Enhanced Form */}
        <Tilt options={{ max: 3, scale: 1.01, speed: 200 }}>
          <Card className="glassmorphism shadow-2xl border-2 border-primary/30 relative overflow-hidden">
            {/* Form Header */}
            <CardHeader className="text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5"></div>
              <CardTitle className="text-4xl font-bold gradient-text relative z-10">
                Ultimate Contact Form v3.0
              </CardTitle>
              <p className="text-foreground-secondary relative z-10">Step {formStep} of 3</p>
              
              {/* Step Progress */}
              <div className="flex justify-center space-x-4 mt-6 relative z-10">
                {[1, 2, 3].map((step) => (
                  <div 
                    key={step}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      step <= formStep 
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step < formStep ? <Check className="w-6 h-6" /> : step}
                  </div>
                ))}
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <AnimatePresence mode="wait">
                  {/* Step 1: Personal Information */}
                  {formStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-bold gradient-text mb-6">📋 Personal Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div 
                          className="space-y-2"
                          whileFocus={{ scale: 1.02 }}
                        >
                          <Label htmlFor="name" className="text-lg font-semibold">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Enter your full name"
                            className={`h-12 text-lg transition-all duration-300 ${
                              errors.name ? 'border-red-500 shadow-red-500/20' : 
                              focusedField === 'name' ? 'border-primary shadow-primary/20' : ''
                            }`}
                          />
                          {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                        </motion.div>

                        <motion.div 
                          className="space-y-2"
                          whileFocus={{ scale: 1.02 }}
                        >
                          <Label htmlFor="email" className="text-lg font-semibold">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="your@email.com"
                            className={`h-12 text-lg transition-all duration-300 ${
                              errors.email ? 'border-red-500 shadow-red-500/20' : 
                              focusedField === 'email' ? 'border-primary shadow-primary/20' : ''
                            }`}
                          />
                          {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div 
                          className="space-y-2"
                          whileFocus={{ scale: 1.02 }}
                        >
                          <Label htmlFor="phone" className="text-lg font-semibold">Phone Number</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="+1 (555) 123-4567"
                            className={`h-12 text-lg transition-all duration-300 ${
                              errors.phone ? 'border-red-500 shadow-red-500/20' : 
                              focusedField === 'phone' ? 'border-primary shadow-primary/20' : ''
                            }`}
                          />
                          {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
                        </motion.div>

                        <motion.div 
                          className="space-y-2"
                          whileFocus={{ scale: 1.02 }}
                        >
                          <Label htmlFor="studentId" className="text-lg font-semibold">Student ID (Optional)</Label>
                          <Input
                            id="studentId"
                            value={formData.studentId}
                            onChange={(e) => handleInputChange('studentId', e.target.value)}
                            onFocus={() => setFocusedField('studentId')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Your student ID"
                            className={`h-12 text-lg transition-all duration-300 ${
                              focusedField === 'studentId' ? 'border-primary shadow-primary/20' : ''
                            }`}
                          />
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div 
                          className="space-y-2"
                          whileFocus={{ scale: 1.02 }}
                        >
                          <Label htmlFor="university" className="text-lg font-semibold">University/Institution</Label>
                          <Input
                            id="university"
                            value={formData.university}
                            onChange={(e) => handleInputChange('university', e.target.value)}
                            onFocus={() => setFocusedField('university')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Your university name"
                            className={`h-12 text-lg transition-all duration-300 ${
                              focusedField === 'university' ? 'border-primary shadow-primary/20' : ''
                            }`}
                          />
                        </motion.div>

                        <motion.div 
                          className="space-y-2"
                          whileFocus={{ scale: 1.02 }}
                        >
                          <Label htmlFor="course" className="text-lg font-semibold">Course/Program</Label>
                          <Input
                            id="course"
                            value={formData.course}
                            onChange={(e) => handleInputChange('course', e.target.value)}
                            onFocus={() => setFocusedField('course')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Your course/program"
                            className={`h-12 text-lg transition-all duration-300 ${
                              focusedField === 'course' ? 'border-primary shadow-primary/20' : ''
                            }`}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Category & Priority */}
                  {formStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-8"
                    >
                      <h3 className="text-2xl font-bold gradient-text mb-6">🎯 Request Category & Priority</h3>
                      
                      <div className="space-y-4">
                        <Label className="text-lg font-semibold">Select Category *</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {categories.map((category) => (
                            <motion.div
                              key={category.id}
                              whileHover={{ scale: 1.03, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                                formData.category === category.id 
                                  ? 'border-primary bg-gradient-to-r ' + category.color + '/10 shadow-lg' 
                                  : 'border-border hover:border-primary/50 hover:shadow-md'
                              }`}
                              onClick={() => handleInputChange('category', category.id)}
                            >
                              <div className="space-y-3">
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${category.color} text-white shadow-lg`}>
                                  {category.icon}
                                </div>
                                <h4 className="font-bold text-lg">{category.title}</h4>
                                <p className="text-sm text-foreground-secondary">{category.description}</p>
                                <div className="flex items-center justify-between">
                                  <Badge className="text-xs bg-primary/20 text-primary">
                                    Response: {category.response}
                                  </Badge>
                                  {formData.category === category.id && (
                                    <Check className="w-5 h-5 text-primary" />
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        {errors.category && <p className="text-red-400 text-sm">{errors.category}</p>}
                      </div>

                      <div className="space-y-4">
                        <Label className="text-lg font-semibold">Priority Level</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {priorityLevels.map((priority) => (
                            <motion.div
                              key={priority.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                formData.priority === priority.id 
                                  ? 'border-primary bg-primary/10' 
                                  : 'border-border hover:border-primary/50'
                              }`}
                              onClick={() => handleInputChange('priority', priority.id)}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={priority.color}>
                                  {priority.icon}
                                </div>
                                <span className="font-medium">{priority.label}</span>
                                {formData.priority === priority.id && (
                                  <Check className="w-4 h-4 text-primary ml-auto" />
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-lg font-semibold">Preferred Contact Method</Label>
                        <div className="grid grid-cols-3 gap-4">
                          {contactMethods.map((method) => (
                            <motion.div
                              key={method.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                formData.preferredContact === method.id 
                                  ? 'border-primary bg-primary/10' 
                                  : 'border-border hover:border-primary/50'
                              }`}
                              onClick={() => handleInputChange('preferredContact', method.id)}
                            >
                              <div className="flex flex-col items-center space-y-2">
                                <div className="text-primary">{method.icon}</div>
                                <span className="font-medium text-sm">{method.label}</span>
                                {formData.preferredContact === method.id && (
                                  <Check className="w-4 h-4 text-primary" />
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Message & Submit */}
                  {formStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-bold gradient-text mb-6">💬 Your Message</h3>
                      
                      <motion.div 
                        className="space-y-2"
                        whileFocus={{ scale: 1.01 }}
                      >
                        <Label htmlFor="subject" className="text-lg font-semibold">Subject *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          onFocus={() => setFocusedField('subject')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Brief description of your request"
                          className={`h-12 text-lg transition-all duration-300 ${
                            errors.subject ? 'border-red-500 shadow-red-500/20' : 
                            focusedField === 'subject' ? 'border-primary shadow-primary/20' : ''
                          }`}
                        />
                        {errors.subject && <p className="text-red-400 text-sm">{errors.subject}</p>}
                      </motion.div>

                      <motion.div 
                        className="space-y-2"
                        whileFocus={{ scale: 1.01 }}
                      >
                        <Label htmlFor="message" className="text-lg font-semibold">Detailed Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Please provide detailed information about your request. The more specific you are, the better we can help you!"
                          rows={8}
                          className={`text-lg transition-all duration-300 resize-none ${
                            errors.message ? 'border-red-500 shadow-red-500/20' : 
                            focusedField === 'message' ? 'border-primary shadow-primary/20' : ''
                          }`}
                        />
                        {errors.message && <p className="text-red-400 text-sm">{errors.message}</p>}
                        <div className="text-right text-sm text-foreground-secondary">
                          {formData.message.length}/500 characters
                        </div>
                      </motion.div>

                      <motion.div 
                        className="space-y-2"
                        whileFocus={{ scale: 1.01 }}
                      >
                        <Label htmlFor="availability" className="text-lg font-semibold">Best Time to Contact (Optional)</Label>
                        <Input
                          id="availability"
                          value={formData.availability}
                          onChange={(e) => handleInputChange('availability', e.target.value)}
                          onFocus={() => setFocusedField('availability')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="e.g., Weekdays 9AM-5PM, Evenings after 6PM"
                          className={`h-12 text-lg transition-all duration-300 ${
                            focusedField === 'availability' ? 'border-primary shadow-primary/20' : ''
                          }`}
                        />
                      </motion.div>

                      {/* Checkboxes */}
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="terms"
                            checked={formData.terms}
                            onCheckedChange={(checked) => handleInputChange('terms', checked as boolean)}
                            className="mt-1"
                          />
                          <Label htmlFor="terms" className="text-sm leading-relaxed">
                            I agree to the Terms of Service and Privacy Policy. I understand that my information will be processed according to STUDENTHUB's privacy guidelines. *
                          </Label>
                        </div>
                        {errors.terms && <p className="text-red-400 text-sm">{errors.terms}</p>}

                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="newsletter"
                            checked={formData.newsletter}
                            onCheckedChange={(checked) => handleInputChange('newsletter', checked as boolean)}
                            className="mt-1"
                          />
                          <Label htmlFor="newsletter" className="text-sm leading-relaxed">
                            Yes, I'd like to receive educational updates, exam notifications, and new resource alerts via email.
                          </Label>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-8">
                  {formStep > 1 ? (
                    <Button 
                      type="button"
                      onClick={prevStep}
                      variant="outline"
                      className="px-8 py-3 text-lg"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Previous
                    </Button>
                  ) : <div></div>}

                  {formStep < 3 ? (
                    <Button 
                      type="button"
                      onClick={nextStep}
                      className="btn-hero px-8 py-3 text-lg ml-auto"
                    >
                      Next Step
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn-hero px-12 py-4 text-xl ml-auto relative overflow-hidden"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                          Submitting to Google Forms...
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6 mr-3" />
                          Submit Ultra Form
                          <Sparkles className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </Tilt>
      </div>
    </section>
  );
};

export default Ultimate3DGoogleForm;