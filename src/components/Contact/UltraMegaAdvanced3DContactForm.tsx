import React, { useRef, useEffect, useState, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  Environment, 
  PerspectiveCamera, 
  OrbitControls,
  Stars,
  Sphere,
  Box,
  Torus,
  Html,
  Text,
  MeshDistortMaterial,
  Points,
  PointMaterial,
  ContactShadows
} from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Send, 
  Sparkles, 
  MessageSquare, 
  Phone, 
  Mail, 
  User, 
  FileText, 
  Star,
  Zap,
  Globe,
  Shield,
  Heart,
  BookOpen,
  Target,
  Clock,
  Award,
  CheckCircle,
  ArrowRight,
  Users,
  Brain,
  Rocket,
  TrendingUp,
  Mic,
  Upload,
  Calendar,
  MapPin,
  Headphones,
  ThumbsUp,
  Eye,
  Settings,
  Lightbulb,
  Diamond,
  Cpu,
  Palette,
  Search,
  Filter,
  Bookmark,
  Share,
  Download,
  Play,
  RefreshCw
} from 'lucide-react';

// Ultra Advanced 3D Particle System with Multiple Effects
const UltraAdvancedParticleSystem = ({ count = 2000 }) => {
  const points = useRef<THREE.Points>(null);
  const [particles] = useState(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Positions in a sphere
      const radius = Math.random() * 50 + 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Rainbow colors
      const hue = (i / count) * 360;
      const color = new THREE.Color().setHSL(hue / 360, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      sizes[i] = Math.random() * 0.5 + 0.1;
    }
    
    return { positions, colors, sizes };
  });

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.1;
      
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 2 + positions[i] * 0.01) * 0.005;
      }
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points positions={particles.positions} colors={particles.colors} sizes={particles.sizes}>
      <PointMaterial
        transparent={true}
        vertexColors={true}
        size={0.3}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// Mega Advanced Floating Form Container
const MegaAdvanced3DFormContainer = ({ children }: { children: React.ReactNode }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
    
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <boxGeometry args={[viewport.width * 0.85, viewport.height * 0.9, 0.5]} />
          <MeshDistortMaterial 
            color="#0a0a0f" 
            transparent 
            opacity={0.95}
            distort={0.1}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
          <Html
            transform
            distanceFactor={1}
            position={[0, 0, 0.26]}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'auto'
            }}
          >
            <div className="w-full max-w-6xl p-8 h-full">
              {children}
            </div>
          </Html>
        </mesh>
      </Float>
      
      {/* Surrounding orbital elements */}
      {[...Array(12)].map((_, i) => (
        <Float key={i} speed={2 + i * 0.1} rotationIntensity={2} floatIntensity={1.5}>
          <Sphere
            position={[
              Math.cos((i / 12) * Math.PI * 2) * (8 + Math.sin(i) * 2),
              Math.sin((i / 12) * Math.PI * 2) * 2,
              Math.sin((i / 12) * Math.PI * 2) * (6 + Math.cos(i) * 2)
            ]}
            scale={0.1 + (i % 3) * 0.05}
            args={[0.2, 16, 16]}
          >
            <MeshDistortMaterial
              color={`hsl(${(i * 30) % 360}, 80%, 60%)`}
              distort={0.3}
              speed={3}
              transparent
              opacity={0.8}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};

// Ultra Advanced 3D Scene with Multiple Effects
const UltraAdvanced3DContactScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <>
      {/* Ultra Advanced Lighting */}
      <ambientLight intensity={0.2} color="#1a1a2e" />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#3B82F6" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#10B981" />
      <pointLight position={[0, 15, 0]} intensity={0.8} color="#F59E0B" />
      <spotLight position={[5, 5, 5]} intensity={1.2} angle={0.3} penumbra={1} color="#8B5CF6" />
      
      <Environment preset="night" />
      <Stars radius={300} depth={100} count={12000} factor={8} saturation={0} fade />
      
      {/* Ultra Advanced Particle System */}
      <UltraAdvancedParticleSystem count={2500} />
      
      {/* Mega Complex Geometric Elements */}
      <group ref={groupRef}>
        {/* Floating Educational Icons */}
        {[...Array(20)].map((_, i) => (
          <Float key={i} speed={1.5 + Math.random()} rotationIntensity={2} floatIntensity={2}>
            <Box 
              position={[
                (Math.random() - 0.5) * 80,
                (Math.random() - 0.5) * 60,
                -40 + Math.random() * -40
              ]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
              args={[Math.random() * 3 + 0.5, Math.random() * 3 + 0.5, Math.random() * 0.8 + 0.2]}
            >
              <MeshDistortMaterial 
                color={`hsl(${Math.random() * 360}, 80%, 60%)`}
                transparent
                opacity={0.7}
                distort={0.3}
                speed={2}
                metalness={0.6}
                roughness={0.2}
              />
            </Box>
          </Float>
        ))}
        
        {/* Ultra Knowledge Spheres */}
        {[...Array(15)].map((_, i) => (
          <Float key={`sphere-${i}`} speed={0.8 + Math.random()} rotationIntensity={1.5} floatIntensity={2.5}>
            <Sphere 
              position={[
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 50,
                -30 + Math.random() * -50
              ]}
              args={[Math.random() * 2 + 0.8, 32, 32]}
            >
              <MeshDistortMaterial 
                color={`hsl(${(i * 24) % 360}, 85%, 65%)`}
                transparent
                opacity={0.6}
                distort={0.4}
                speed={1.5}
                emissive={`hsl(${(i * 24) % 360}, 85%, 30%)`}
                emissiveIntensity={0.3}
              />
            </Sphere>
          </Float>
        ))}
        
        {/* Advanced Torus Elements */}
        {[...Array(8)].map((_, i) => (
          <Float key={`torus-${i}`} speed={1.2 + Math.random() * 0.5} rotationIntensity={1} floatIntensity={1.8}>
            <Torus 
              position={[
                (Math.random() - 0.5) * 120,
                (Math.random() - 0.5) * 40,
                -20 + Math.random() * -60
              ]}
              args={[Math.random() * 2 + 1, Math.random() * 0.5 + 0.3, 16, 100]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            >
              <MeshDistortMaterial 
                color={`hsl(${(i * 45) % 360}, 90%, 70%)`}
                transparent
                opacity={0.5}
                distort={0.5}
                speed={3}
                wireframe={i % 2 === 0}
              />
            </Torus>
          </Float>
        ))}
      </group>
      
      <ContactShadows opacity={0.3} scale={200} blur={1} far={50} resolution={256} color="#000000" />
    </>
  );
};

export const UltraMegaAdvanced3DContactForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      institution: '',
      course: '',
      year: '',
      studentId: '',
      location: ''
    },
    contactDetails: {
      category: '',
      priority: '',
      subject: '',
      description: '',
      preferredTime: '',
      preferredMethod: '',
      urgency: '',
      department: ''
    },
    additionalInfo: {
      hearAboutUs: '',
      suggestions: '',
      newsletter: false,
      futureContact: false,
      experience: '',
      feedback: '',
      rating: 5
    }
  });

  const sectionRef = useRef<HTMLElement>(null);
  const [isInViewRef, isInView] = useInView({ 
    threshold: 0.2,
    triggerOnce: true 
  });

  const steps = [
    { 
      id: 0, 
      title: 'Personal Information', 
      icon: <User className="w-5 h-5" />, 
      description: 'Tell us about yourself',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 1, 
      title: 'Contact Details', 
      icon: <MessageSquare className="w-5 h-5" />, 
      description: 'How can we help you?',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      id: 2, 
      title: 'Additional Information', 
      icon: <Settings className="w-5 h-5" />, 
      description: 'Help us serve you better',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      id: 3, 
      title: 'Review & Submit', 
      icon: <CheckCircle className="w-5 h-5" />, 
      description: 'Confirm your details',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const categories = [
    { 
      value: 'academic', 
      label: 'Academic Support', 
      icon: <BookOpen className="w-4 h-4" />, 
      color: 'from-blue-500 to-cyan-500',
      description: 'Question papers, study materials, exam preparation, doubt resolution'
    },
    { 
      value: 'technical', 
      label: 'Technical Issues', 
      icon: <Zap className="w-4 h-4" />, 
      color: 'from-purple-500 to-pink-500',
      description: 'Website bugs, app issues, tool problems, login difficulties'
    },
    { 
      value: 'general', 
      label: 'General Inquiry', 
      icon: <MessageSquare className="w-4 h-4" />, 
      color: 'from-green-500 to-emerald-500',
      description: 'General questions, information requests, platform features'
    },
    { 
      value: 'partnership', 
      label: 'Business Partnership', 
      icon: <Users className="w-4 h-4" />, 
      color: 'from-yellow-500 to-orange-500',
      description: 'Collaboration opportunities, business proposals, institutional partnerships'
    },
    { 
      value: 'feedback', 
      label: 'Feedback & Suggestions', 
      icon: <Heart className="w-4 h-4" />, 
      color: 'from-red-500 to-rose-500',
      description: 'User feedback, feature requests, improvement suggestions, complaints'
    },
    { 
      value: 'content', 
      label: 'Content Related', 
      icon: <FileText className="w-4 h-4" />, 
      color: 'from-indigo-500 to-purple-500',
      description: 'Content requests, missing materials, quality issues, copyright concerns'
    }
  ];

  const priorities = [
    { value: 'low', label: 'Low Priority', color: 'text-green-600', bg: 'bg-green-100', description: 'Non-urgent, can wait' },
    { value: 'medium', label: 'Medium Priority', color: 'text-yellow-600', bg: 'bg-yellow-100', description: 'Important, needs attention' },
    { value: 'high', label: 'High Priority', color: 'text-orange-600', bg: 'bg-orange-100', description: 'Urgent, quick response needed' },
    { value: 'critical', label: 'Critical', color: 'text-red-600', bg: 'bg-red-100', description: 'Emergency, immediate action required' }
  ];

  const features = [
    { icon: <Shield className="w-6 h-6" />, title: "256-bit SSL Encryption", desc: "Your data is completely secure" },
    { icon: <Clock className="w-6 h-6" />, title: "24/7 Expert Support", desc: "Round-the-clock assistance" },
    { icon: <Users className="w-6 h-6" />, title: "Dedicated Team", desc: "Qualified professionals ready to help" },
    { icon: <Globe className="w-6 h-6" />, title: "Multi-language Support", desc: "Available in 22+ languages" },
    { icon: <Zap className="w-6 h-6" />, title: "Lightning Response", desc: "< 15 minutes response time" },
    { icon: <Award className="w-6 h-6" />, title: "Award Winning Service", desc: "Best customer service 2024" }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate advanced form submission with validation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsSubmitted(true);
    setIsLoading(false);
  };

  const renderPersonalInfoStep = () => (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <motion.div
          className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-6"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <User className="w-10 h-10 text-white" />
        </motion.div>
        <h3 className="text-3xl font-bold gradient-text mb-4">Personal Information</h3>
        <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
          Help us serve you better by providing your basic details. All information is kept confidential and secure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-semibold text-foreground-secondary flex items-center gap-2">
            <User className="w-4 h-4" />
            First Name *
          </Label>
          <Input
            id="firstName"
            placeholder="Enter your first name"
            value={formData.personalInfo.firstName}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, firstName: e.target.value }
            })}
            className="w-full p-4 rounded-xl border-2 border-border/30 bg-background/50 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-semibold text-foreground-secondary flex items-center gap-2">
            <User className="w-4 h-4" />
            Last Name *
          </Label>
          <Input
            id="lastName"
            placeholder="Enter your last name"
            value={formData.personalInfo.lastName}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, lastName: e.target.value }
            })}
            className="w-full p-4 rounded-xl border-2 border-border/30 bg-background/50 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold text-foreground-secondary flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.personalInfo.email}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, email: e.target.value }
            })}
            className="w-full p-4 rounded-xl border-2 border-border/30 bg-background/50 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-semibold text-foreground-secondary flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone Number
          </Label>
          <Input
            id="phone"
            placeholder="+91 XXXXX XXXXX"
            value={formData.personalInfo.phone}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, phone: e.target.value }
            })}
            className="w-full p-4 rounded-xl border-2 border-border/30 bg-background/50 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="institution" className="text-sm font-semibold text-foreground-secondary flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Institution/College
          </Label>
          <Input
            id="institution"
            placeholder="Your college or school name"
            value={formData.personalInfo.institution}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, institution: e.target.value }
            })}
            className="w-full p-4 rounded-xl border-2 border-border/30 bg-background/50 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="course" className="text-sm font-semibold text-foreground-secondary flex items-center gap-2">
            <Target className="w-4 h-4" />
            Course/Program
          </Label>
          <Select value={formData.personalInfo.course} onValueChange={(value) => setFormData({
            ...formData,
            personalInfo: { ...formData.personalInfo, course: value }
          })}>
            <SelectTrigger className="w-full p-4 rounded-xl border-2 border-border/30 bg-background/50 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300">
              <SelectValue placeholder="Select your course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engineering">Engineering (B.Tech/B.E)</SelectItem>
              <SelectItem value="medical">Medical (MBBS/BDS/AYUSH)</SelectItem>
              <SelectItem value="commerce">Commerce (B.Com/M.Com/CA/CS)</SelectItem>
              <SelectItem value="science">Science (B.Sc/M.Sc/Research)</SelectItem>
              <SelectItem value="arts">Arts (B.A/M.A/Literature)</SelectItem>
              <SelectItem value="law">Law (LLB/LLM/Judiciary)</SelectItem>
              <SelectItem value="management">Management (MBA/BBA/PGDM)</SelectItem>
              <SelectItem value="pharmacy">Pharmacy (B.Pharm/M.Pharm)</SelectItem>
              <SelectItem value="architecture">Architecture (B.Arch/M.Arch)</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderContactDetailsStep = () => (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <motion.div
          className="inline-flex p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <MessageSquare className="w-10 h-10 text-white" />
        </motion.div>
        <h3 className="text-3xl font-bold gradient-text mb-4">Contact Details</h3>
        <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
          Let us know how we can help you. Choose the category that best matches your inquiry.
        </p>
      </div>

      <div className="space-y-8">
        {/* Category Selection */}
        <div className="space-y-4">
          <Label className="text-lg font-bold gradient-text flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Select Category *
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <motion.div
                key={category.value}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  formData.contactDetails.category === category.value
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-border/30 bg-background/50 hover:border-primary/50'
                }`}
                onClick={() => setFormData({
                  ...formData,
                  contactDetails: { ...formData.contactDetails, category: category.value }
                })}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white`}>
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">{category.label}</h4>
                    <p className="text-sm text-foreground-secondary">{category.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Priority Selection */}
        <div className="space-y-4">
          <Label className="text-lg font-bold gradient-text flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Priority Level *
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {priorities.map((priority) => (
              <motion.div
                key={priority.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  formData.contactDetails.priority === priority.value
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-border/30 bg-background/50 hover:border-primary/50'
                }`}
                onClick={() => setFormData({
                  ...formData,
                  contactDetails: { ...formData.contactDetails, priority: priority.value }
                })}
              >
                <div className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${priority.bg} flex items-center justify-center`}>
                    <div className={`w-6 h-6 rounded-full ${priority.color.replace('text', 'bg')}`}></div>
                  </div>
                  <h4 className="font-bold text-sm mb-1">{priority.label}</h4>
                  <p className="text-xs text-foreground-secondary">{priority.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Subject and Description */}
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-lg font-bold gradient-text flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Subject *
            </Label>
            <Input
              id="subject"
              placeholder="Brief subject of your inquiry"
              value={formData.contactDetails.subject}
              onChange={(e) => setFormData({
                ...formData,
                contactDetails: { ...formData.contactDetails, subject: e.target.value }
              })}
              className="w-full p-4 rounded-xl border-2 border-border/30 bg-background/50 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-lg font-bold gradient-text flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Detailed Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Please provide detailed information about your inquiry. The more details you provide, the better we can assist you."
              value={formData.contactDetails.description}
              onChange={(e) => setFormData({
                ...formData,
                contactDetails: { ...formData.contactDetails, description: e.target.value }
              })}
              rows={6}
              className="w-full p-4 rounded-xl border-2 border-border/30 bg-background/50 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccessState = () => (
    <motion.div 
      className="text-center space-y-8 py-12"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="inline-flex p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6"
      >
        <CheckCircle className="w-16 h-16 text-white" />
      </motion.div>
      
      <motion.h2 
        className="text-4xl font-bold gradient-text mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Message Sent Successfully!
      </motion.h2>
      
      <motion.p 
        className="text-xl text-foreground-secondary max-w-2xl mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Thank you for reaching out to STUDENTHUB! Our expert team will review your message and get back to you within 24 hours.
      </motion.p>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {[
          { icon: <Clock className="w-6 h-6" />, title: "Quick Response", desc: "< 24 hours response time" },
          { icon: <Shield className="w-6 h-6" />, title: "Secure & Private", desc: "Your data is protected" },
          { icon: <Users className="w-6 h-6" />, title: "Expert Support", desc: "Qualified professionals" }
        ].map((item, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-xl glassmorphism text-center"
            whileHover={{ scale: 1.02, y: -2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
          >
            <div className="inline-flex p-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white mb-4">
              {item.icon}
            </div>
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-foreground-secondary">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Button 
          className="btn-hero bg-gradient-to-r from-primary to-secondary px-8 py-4 text-lg"
          onClick={() => {
            setIsSubmitted(false);
            setCurrentStep(0);
            setFormData({
              personalInfo: { firstName: '', lastName: '', email: '', phone: '', institution: '', course: '', year: '', studentId: '', location: '' },
              contactDetails: { category: '', priority: '', subject: '', description: '', preferredTime: '', preferredMethod: '', urgency: '', department: '' },
              additionalInfo: { hearAboutUs: '', suggestions: '', newsletter: false, futureContact: false, experience: '', feedback: '', rating: 5 }
            });
          }}
        >
          <Send className="w-5 h-5 mr-2" />
          Send Another Message
        </Button>
      </motion.div>
    </motion.div>
  );

  if (isSubmitted) {
    return (
      <section 
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background-tertiary"
      >
        {/* Ultra Advanced 3D Background for Success */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
            <Suspense fallback={null}>
              <UltraAdvanced3DContactScene />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
          </Canvas>
        </div>

        {/* Success Content */}
        <div className="relative z-20 w-full max-w-4xl mx-auto">
          <div className="glassmorphism p-12 rounded-3xl border border-border/30">
            {renderSuccessState()}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background-tertiary"
    >
      {/* Ultra Advanced 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <Suspense fallback={null}>
            <UltraAdvanced3DContactScene />
            <MegaAdvanced3DFormContainer>
              <div className="relative z-10 max-w-6xl mx-auto h-full">
                {/* Content will be rendered here via HTML in 3D space */}
              </div>
            </MegaAdvanced3DFormContainer>
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
        </Canvas>
      </div>

      {/* Main Form Container */}
      <motion.div 
        className="relative z-20 w-full max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="glassmorphism p-8 md:p-12 rounded-3xl border border-border/30">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <motion.div 
                className="p-4 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-10 w-10 text-white" />
              </motion.div>
              <Badge className="text-xl px-8 py-4 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
                Ultra Advanced Contact Form
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Get In Touch With Excellence
            </h1>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Experience our revolutionary 3D contact system. We're here to support your academic journey 
              with personalized assistance and expert guidance.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-xl glassmorphism text-center group hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white mb-3 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-foreground-secondary">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="relative z-10">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className={`flex flex-col items-center space-y-2 ${
                      index <= currentStep ? 'text-primary' : 'text-foreground-secondary'
                    }`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`p-3 rounded-full border-2 transition-all duration-300 ${
                      index <= currentStep 
                        ? `border-primary bg-gradient-to-r ${step.color} text-white shadow-lg` 
                        : 'border-border bg-transparent'
                    }`}>
                      {step.icon}
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium hidden md:block">{step.title}</div>
                      <div className="text-xs text-foreground-secondary hidden lg:block">{step.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Enhanced Progress Bar */}
              <div className="relative w-full bg-border/30 rounded-full h-3 mb-8">
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary shadow-lg"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-sm"></div>
              </div>
            </div>

            {/* Form Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="min-h-[600px]"
              >
                {currentStep === 0 && renderPersonalInfoStep()}
                {currentStep === 1 && renderContactDetailsStep()}
                {/* Add other steps here */}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div 
              className="flex justify-between items-center mt-12 pt-8 border-t border-border/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="px-8 py-4 text-lg border-2 hover:border-primary transition-all duration-300 disabled:opacity-50"
              >
                <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
                Previous
              </Button>

              <div className="text-center">
                <div className="text-lg font-semibold gradient-text">
                  Step {currentStep + 1} of {steps.length}
                </div>
                <div className="text-sm text-foreground-secondary">
                  {steps[currentStep].description}
                </div>
              </div>

              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-primary via-accent to-secondary text-white px-12 py-4 text-lg hover:shadow-2xl transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-3"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </motion.div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-3" />
                      Submit Message
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 text-lg hover:shadow-2xl transition-all duration-300"
                >
                  Next Step
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="mt-8 flex items-center justify-center gap-8 text-sm text-foreground-secondary flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { icon: <Shield className="w-5 h-5" />, text: "256-bit SSL Secured", color: "text-green-500" },
                { icon: <Clock className="w-5 h-5" />, text: "< 15 Min Response", color: "text-blue-500" },
                { icon: <Heart className="w-5 h-5" />, text: "24/7 Expert Support", color: "text-red-500" },
                { icon: <Award className="w-5 h-5" />, text: "Award Winning Service", color: "text-yellow-500" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={item.color}>{item.icon}</div>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};