import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Plane, Html, Float, Stars, Environment } from '@react-three/drei';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Star, 
  Sparkles, 
  Zap, 
  Globe,
  Book,
  Users,
  Lightbulb,
  Heart,
  Shield,
  Trophy,
  Rocket,
  Brain,
  Target,
  Award,
  Clock,
  CheckCircle,
  TrendingUp,
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  UserCheck,
  Headphones,
  ThumbsUp,
  Eye,
  Search,
  Filter,
  Bookmark,
  Share,
  Settings,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Advanced 3D Particle System
const AdvancedParticleSystem = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [particles] = useState(() => {
    const temp = [];
    for (let i = 0; i < 200; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        ],
        color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6'][Math.floor(Math.random() * 7)],
        size: Math.random() * 0.15 + 0.05,
        speed: Math.random() * 0.02 + 0.01
      });
    }
    return temp;
  });

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      groupRef.current.children.forEach((child, index) => {
        child.position.y += Math.sin(clock.getElapsedTime() + index) * 0.001;
        child.rotation.x += particles[index].speed;
        child.rotation.z += particles[index].speed * 0.5;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle, index) => (
        <Float key={index} speed={2 + Math.random()} rotationIntensity={1} floatIntensity={2}>
          <Sphere position={particle.position as [number, number, number]} args={[particle.size]}>
            <meshStandardMaterial 
              color={particle.color} 
              emissive={particle.color} 
              emissiveIntensity={0.4}
              transparent
              opacity={0.8}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};

// Animated Form Container with Advanced 3D Effects
const Ultra3DFormContainer = ({ children }: { children: React.ReactNode }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[viewport.width * 0.9, viewport.height * 0.95, 0.3]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          transparent 
          opacity={0.92}
          emissive="#3B82F6"
          emissiveIntensity={0.05}
          metalness={0.8}
          roughness={0.2}
        />
        <Html
          transform
          distanceFactor={1}
          position={[0, 0, 0.16]}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'auto'
          }}
        >
          <div className="w-full max-w-6xl p-8">
            {children}
          </div>
        </Html>
      </mesh>
    </Float>
  );
};

// Ultra Advanced Background Scene
const UltraAdvanced3DScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <>
      {/* Advanced Lighting Setup */}
      <ambientLight intensity={0.3} color="#4F46E5" />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#3B82F6" />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#10B981" />
      <spotLight position={[0, 20, 10]} intensity={1} angle={0.3} penumbra={1} color="#F59E0B" />
      
      <Environment preset="night" />
      <Stars radius={200} depth={80} count={8000} factor={6} saturation={0} fade />
      
      {/* Advanced Particle System */}
      <AdvancedParticleSystem />
      
      {/* Rotating Geometric Elements */}
      <group ref={groupRef}>
        {/* Floating Educational Icons */}
        {[...Array(15)].map((_, i) => (
          <Float key={i} speed={1 + Math.random()} rotationIntensity={2} floatIntensity={1.5}>
            <Box 
              position={[
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 60,
                -30 + Math.random() * -30
              ]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
              args={[Math.random() * 2 + 0.5, Math.random() * 2 + 0.5, Math.random() * 0.5 + 0.2]}
            >
              <meshStandardMaterial 
                color={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][Math.floor(Math.random() * 5)]}
                transparent
                opacity={0.7}
                metalness={0.5}
                roughness={0.3}
              />
            </Box>
          </Float>
        ))}
        
        {/* Floating Knowledge Spheres */}
        {[...Array(8)].map((_, i) => (
          <Float key={`sphere-${i}`} speed={0.5 + Math.random()} rotationIntensity={1} floatIntensity={2}>
            <Sphere 
              position={[
                (Math.random() - 0.5) * 80,
                (Math.random() - 0.5) * 40,
                -20 + Math.random() * -40
              ]}
              args={[Math.random() * 1.5 + 0.8, 32, 32]}
            >
              <meshStandardMaterial 
                color={['#EC4899', '#14B8A6', '#F97316', '#6366F1'][Math.floor(Math.random() * 4)]}
                transparent
                opacity={0.5}
                emissive={['#EC4899', '#14B8A6', '#F97316', '#6366F1'][Math.floor(Math.random() * 4)]}
                emissiveIntensity={0.2}
              />
            </Sphere>
          </Float>
        ))}
      </group>
    </>
  );
};

export const MegaAdvanced3DContactHub: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      institution: '',
      course: '',
      year: ''
    },
    contactDetails: {
      category: '',
      priority: '',
      subject: '',
      description: '',
      attachments: [] as File[],
      preferredTime: '',
      preferredMethod: ''
    },
    additionalInfo: {
      hearAboutUs: '',
      suggestions: '',
      newsletter: false,
      futureContact: false
    }
  });

  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(mouseX, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / (rect.width / 2) * 5);
    mouseY.set((e.clientY - centerY) / (rect.height / 2) * -5);
  };

  const steps = [
    { id: 0, title: 'Personal Information', icon: <UserCheck className="w-5 h-5" /> },
    { id: 1, title: 'Contact Details', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 2, title: 'Additional Information', icon: <Settings className="w-5 h-5" /> },
    { id: 3, title: 'Review & Submit', icon: <CheckCircle className="w-5 h-5" /> }
  ];

  const categories = [
    { 
      value: 'academic', 
      label: 'Academic Support', 
      icon: <Book className="w-4 h-4" />, 
      color: 'from-blue-500 to-cyan-500',
      description: 'Question papers, study materials, exam preparation'
    },
    { 
      value: 'technical', 
      label: 'Technical Issues', 
      icon: <Zap className="w-4 h-4" />, 
      color: 'from-purple-500 to-pink-500',
      description: 'Website bugs, app issues, tool problems'
    },
    { 
      value: 'general', 
      label: 'General Inquiry', 
      icon: <MessageSquare className="w-4 h-4" />, 
      color: 'from-green-500 to-emerald-500',
      description: 'General questions, information requests'
    },
    { 
      value: 'partnership', 
      label: 'Business Partnership', 
      icon: <Users className="w-4 h-4" />, 
      color: 'from-yellow-500 to-orange-500',
      description: 'Collaboration, business proposals, institutional partnerships'
    },
    { 
      value: 'feedback', 
      label: 'Feedback & Suggestions', 
      icon: <Heart className="w-4 h-4" />, 
      color: 'from-red-500 to-rose-500',
      description: 'User feedback, feature requests, improvement suggestions'
    },
    { 
      value: 'content', 
      label: 'Content Related', 
      icon: <BookOpen className="w-4 h-4" />, 
      color: 'from-indigo-500 to-purple-500',
      description: 'Content requests, missing materials, quality issues'
    }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-green-500', bg: 'bg-green-100' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { value: 'high', label: 'High', color: 'text-orange-500', bg: 'bg-orange-100' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-500', bg: 'bg-red-100' }
  ];

  const contactMethods = [
    { value: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
    { value: 'phone', label: 'Phone Call', icon: <Phone className="w-4 h-4" /> },
    { value: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare className="w-4 h-4" /> },
    { value: 'video', label: 'Video Call', icon: <Users className="w-4 h-4" /> }
  ];

  const supportFeatures = [
    { icon: <Shield className="w-6 h-6" />, title: "End-to-End Encryption", desc: "Your data is completely secure" },
    { icon: <Clock className="w-6 h-6" />, title: "24/7 Support", desc: "Round-the-clock assistance" },
    { icon: <Users className="w-6 h-6" />, title: "Expert Team", desc: "Qualified professionals" },
    { icon: <Globe className="w-6 h-6" />, title: "Multi-language", desc: "Support in 22+ languages" },
    { icon: <Zap className="w-6 h-6" />, title: "Instant Response", desc: "< 2 hours response time" },
    { icon: <Trophy className="w-6 h-6" />, title: "Award Winning", desc: "Best customer service 2024" }
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
    
    // Simulate comprehensive form submission
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsSubmitted(true);
    setIsLoading(false);
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingDuration(0);
    
    const timer = setInterval(() => {
      setRecordingDuration(prev => prev + 1);
    }, 1000);

    setTimeout(() => {
      setIsRecording(false);
      clearInterval(timer);
    }, 10000); // Stop after 10 seconds for demo
  };

  const renderPersonalInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <UserCheck className="w-8 h-8 text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold gradient-text mb-2">Personal Information</h3>
        <p className="text-foreground-secondary">Help us serve you better with your details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">First Name *</label>
          <Input
            placeholder="Enter your first name"
            value={formData.personalInfo.firstName}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, firstName: e.target.value }
            })}
            className="w-full p-3 rounded-xl border border-border/30 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Last Name *</label>
          <Input
            placeholder="Enter your last name"
            value={formData.personalInfo.lastName}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, lastName: e.target.value }
            })}
            className="w-full p-3 rounded-xl border border-border/30 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email Address *</label>
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={formData.personalInfo.email}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, email: e.target.value }
            })}
            className="w-full p-3 rounded-xl border border-border/30 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <Input
            placeholder="+91 XXXXX XXXXX"
            value={formData.personalInfo.phone}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, phone: e.target.value }
            })}
            className="w-full p-3 rounded-xl border border-border/30 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Institution/College</label>
          <Input
            placeholder="Your college or school name"
            value={formData.personalInfo.institution}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, institution: e.target.value }
            })}
            className="w-full p-3 rounded-xl border border-border/30 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Course/Program</label>
          <Select value={formData.personalInfo.course} onValueChange={(value) => setFormData({
            ...formData,
            personalInfo: { ...formData.personalInfo, course: value }
          })}>
            <SelectTrigger className="w-full p-3 rounded-xl border border-border/30 bg-background/50">
              <SelectValue placeholder="Select your course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="medical">Medical (MBBS/BDS)</SelectItem>
              <SelectItem value="commerce">Commerce</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="arts">Arts</SelectItem>
              <SelectItem value="law">Law</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderContactDetailsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl mb-4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <MessageSquare className="w-8 h-8 text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold gradient-text mb-2">Contact Details</h3>
        <p className="text-foreground-secondary">Tell us how we can help you</p>
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-sm font-medium mb-3">What type of support do you need? *</label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((category) => (
            <motion.button
              key={category.value}
              type="button"
              onClick={() => {
                setSelectedCategory(category.value);
                setFormData({
                  ...formData,
                  contactDetails: { ...formData.contactDetails, category: category.value }
                });
              }}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                selectedCategory === category.value
                  ? `border-primary bg-gradient-to-r ${category.color} text-white`
                  : 'border-border/30 hover:border-primary/50 bg-background/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3 mb-2">
                {category.icon}
                <span className="font-semibold">{category.label}</span>
              </div>
              <p className="text-xs opacity-80">{category.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Priority Selection */}
      <div>
        <label className="block text-sm font-medium mb-3">Priority Level *</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {priorities.map((priority) => (
            <motion.button
              key={priority.value}
              type="button"
              onClick={() => {
                setSelectedPriority(priority.value);
                setFormData({
                  ...formData,
                  contactDetails: { ...formData.contactDetails, priority: priority.value }
                });
              }}
              className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                selectedPriority === priority.value
                  ? `border-primary ${priority.bg} ${priority.color}`
                  : 'border-border/30 hover:border-primary/50 bg-background/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-center">
                <div className="font-semibold">{priority.label}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium mb-2">Subject *</label>
        <Input
          placeholder="Brief subject of your inquiry"
          value={formData.contactDetails.subject}
          onChange={(e) => setFormData({
            ...formData,
            contactDetails: { ...formData.contactDetails, subject: e.target.value }
          })}
          className="w-full p-3 rounded-xl border border-border/30 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* Description with Voice Recording */}
      <div>
        <label className="block text-sm font-medium mb-2">Detailed Description *</label>
        <div className="relative">
          <Textarea
            placeholder="Please describe your issue or inquiry in detail..."
            rows={5}
            value={formData.contactDetails.description}
            onChange={(e) => setFormData({
              ...formData,
              contactDetails: { ...formData.contactDetails, description: e.target.value }
            })}
            className="w-full p-3 rounded-xl border border-border/30 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
          />
          
          {/* Voice Recording Button */}
          <motion.button
            type="button"
            onClick={startRecording}
            className={`absolute bottom-3 right-3 p-2 rounded-full ${
              isRecording ? 'bg-red-500' : 'bg-primary'
            } text-white hover:scale-110 transition-all`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isRecording ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </motion.button>
          
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-12 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm"
            >
              Recording: {recordingDuration}s
            </motion.div>
          )}
        </div>
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="block text-sm font-medium mb-3">Preferred Contact Method</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {contactMethods.map((method) => (
            <motion.button
              key={method.value}
              type="button"
              onClick={() => setFormData({
                ...formData,
                contactDetails: { ...formData.contactDetails, preferredMethod: method.value }
              })}
              className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                formData.contactDetails.preferredMethod === method.value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border/30 hover:border-primary/50 bg-background/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-2 justify-center">
                {method.icon}
                <span className="text-sm font-medium">{method.label}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background-tertiary">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 to-accent/5">
          {/* Canvas temporarily disabled to fix font loading error */}
        </div>
        
        <motion.div 
          className="relative z-10 text-center space-y-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="w-40 h-40 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity }
            }}
          >
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <CheckCircle className="w-20 h-20 text-white" />
            </motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-6xl font-bold gradient-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Message Sent Successfully!
          </motion.h2>
          
          <motion.p 
            className="text-2xl text-foreground-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Thank you for reaching out! Our expert team will respond within 2 hours.
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Card className="glassmorphism p-6 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-bold mb-2">Response Time</h3>
              <p className="text-foreground-secondary">Within 2 hours</p>
            </Card>
            
            <Card className="glassmorphism p-6 text-center">
              <Shield className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Ticket Created</h3>
              <p className="text-foreground-secondary">#SH{Date.now().toString().slice(-6)}</p>
            </Card>
            
            <Card className="glassmorphism p-6 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Priority</h3>
              <p className="text-foreground-secondary">{selectedPriority || 'Medium'}</p>
            </Card>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(0);
                setFormData({
                  personalInfo: { firstName: '', lastName: '', email: '', phone: '', institution: '', course: '', year: '' },
                  contactDetails: { category: '', priority: '', subject: '', description: '', attachments: [], preferredTime: '', preferredMethod: '' },
                  additionalInfo: { hearAboutUs: '', suggestions: '', newsletter: false, futureContact: false }
                });
              }}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 text-lg"
            >
              Send Another Message
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="px-8 py-3 text-lg"
            >
              Back to Home
            </Button>
          </motion.div>
        </motion.div>
      </section>
    );
  }

  return (
    <section 
      id="contact-form" 
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background-tertiary"
      onMouseMove={handleMouseMove}
    >
      {/* Ultra Advanced 3D Background - Temporarily disabled to fix font loading error */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 to-accent/5">
        {/* 3D Canvas temporarily disabled */}
      </div>

      {/* Main Form Container */}
      <motion.div 
        className="relative z-20 w-full max-w-7xl mx-auto"
        style={{ 
          rotateX: rotateX.get(),
          rotateY: rotateY.get(),
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Features & Support Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header Info */}
            <div className="space-y-4">
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="p-4 bg-gradient-to-r from-primary to-secondary rounded-2xl">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <div>
                  <Badge className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30 mb-2">
                    Ultra Advanced Contact Hub
                  </Badge>
                  <h2 className="text-3xl font-bold gradient-text">
                    Connect with Excellence
                  </h2>
                </div>
              </motion.div>
              
              <motion.p 
                className="text-lg text-foreground-secondary leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Experience our revolutionary multi-step contact system with 3D interactions, 
                voice recording, and AI-powered support routing.
              </motion.p>
            </div>

            {/* Support Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold gradient-text">Why Choose Our Support?</h3>
              <div className="grid grid-cols-1 gap-3">
                {supportFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-3 glassmorphism rounded-lg hover:shadow-lg transition-all duration-300 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg text-primary group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{feature.title}</h4>
                      <p className="text-xs text-foreground-secondary">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Live Support Stats */}
            <motion.div 
              className="p-6 glassmorphism rounded-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
            >
              <h3 className="text-lg font-bold gradient-text mb-4">Live Support Statistics</h3>
              <div className="space-y-3">
                {[
                  { label: "Average Response Time", value: "< 2 hours", color: "text-green-500" },
                  { label: "Issues Resolved Today", value: "1,247", color: "text-blue-500" },
                  { label: "Customer Satisfaction", value: "98.7%", color: "text-yellow-500" },
                  { label: "Online Support Agents", value: "24", color: "text-purple-500" }
                ].map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-foreground-secondary">{stat.label}</span>
                    <span className={`font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Main Form Area */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative p-8 glassmorphism rounded-3xl shadow-2xl backdrop-blur-lg border border-primary/20">
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-accent to-secondary p-[2px]">
                <div className="w-full h-full rounded-3xl bg-background"></div>
              </div>
              
              <div className="relative z-10">
                {/* Progress Steps */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    {steps.map((step, index) => (
                      <motion.div
                        key={step.id}
                        className={`flex items-center space-x-2 ${
                          index <= currentStep ? 'text-primary' : 'text-foreground-secondary'
                        }`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={`p-2 rounded-full border-2 ${
                          index <= currentStep 
                            ? 'border-primary bg-primary text-white' 
                            : 'border-border bg-transparent'
                        } transition-all duration-300`}>
                          {step.icon}
                        </div>
                        <span className="text-sm font-medium hidden md:block">{step.title}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-border/30 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Form Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentStep === 0 && renderPersonalInfoStep()}
                    {currentStep === 1 && renderContactDetailsStep()}
                    {/* Add other steps here */}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/30">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="px-6 py-3"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <div className="text-sm text-foreground-secondary">
                    Step {currentStep + 1} of {steps.length}
                  </div>

                  {currentStep === steps.length - 1 ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3"
                    >
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-2"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </motion.div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Message
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 flex items-center justify-center gap-6 text-sm text-foreground-secondary">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>SSL Secured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>Quick Response</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>Expert Support</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Action Elements */}
      <motion.div 
        className="absolute top-20 right-20 hidden xl:block"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          y: { duration: 4, repeat: Infinity },
          rotate: { duration: 6, repeat: Infinity }
        }}
      >
        <div className="p-4 glassmorphism rounded-2xl">
          <Target className="w-8 h-8 text-primary" />
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-20 left-20 hidden xl:block"
        animate={{ 
          x: [0, 15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          x: { duration: 5, repeat: Infinity },
          scale: { duration: 3, repeat: Infinity }
        }}
      >
        <div className="p-4 glassmorphism rounded-2xl">
          <Lightbulb className="w-8 h-8 text-accent" />
        </div>
      </motion.div>
    </section>
  );
};