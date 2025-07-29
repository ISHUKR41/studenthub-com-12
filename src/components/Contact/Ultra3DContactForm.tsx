import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, OrbitControls, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Send, ExternalLink, CheckCircle, Star, Clock, Shield, Sparkles,
  MessageSquare, FileText, Globe, Zap, Award, Heart, Target, 
  Users, Rocket, GraduationCap, BookOpen, Headphones, Settings,
  Phone, Mail, MapPin, Calendar, TrendingUp, Eye, Download,
  Lightbulb, Trophy, Brain, Mic, Video, Image, Lock, Unlock,
  RefreshCw, Copy, Share2, ThumbsUp, MessageCircle, Bell,
  ArrowRight, ArrowLeft, Check, X, Upload, FileIcon,
  Loader2, ChevronDown, ChevronUp, Play, Pause
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tilt } from 'react-tilt';

// 3D Scene Components
const FloatingElement = ({ position, color, shape = 'sphere' }: { position: [number, number, number], color: string, shape?: 'sphere' | 'box' | 'torus' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  const GeometryComponent = () => {
    switch (shape) {
      case 'box':
        return <Box ref={meshRef} position={position} args={[1, 1, 1]}><MeshDistortMaterial color={color} distort={0.3} speed={2} /></Box>;
      case 'torus':
        return <Torus ref={meshRef} position={position} args={[1, 0.4, 16, 100]}><MeshDistortMaterial color={color} distort={0.2} speed={1.5} /></Torus>;
      default:
        return <Sphere ref={meshRef} position={position} args={[0.8, 32, 32]}><MeshDistortMaterial color={color} distort={0.4} speed={2} /></Sphere>;
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <GeometryComponent />
    </Float>
  );
};

const Scene3D = () => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
      <pointLight position={[10, -10, 10]} intensity={0.5} color="#06b6d4" />
      
      <FloatingElement position={[-4, 2, -2]} color="#3b82f6" shape="sphere" />
      <FloatingElement position={[4, -2, -1]} color="#10b981" shape="box" />
      <FloatingElement position={[0, 3, -3]} color="#f59e0b" shape="torus" />
      <FloatingElement position={[-2, -3, -2]} color="#ef4444" shape="sphere" />
      <FloatingElement position={[3, 1, -4]} color="#8b5cf6" shape="box" />
      
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
};

const Ultra3DContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    course: '',
    year: '',
    category: '',
    priority: 'normal',
    subject: '',
    message: '',
    preferredContact: 'email',
    timeSlot: '',
    urgencyLevel: 'normal',
    followUpRequired: true,
    attachments: [],
    communicationPreference: 'detailed',
    expertiseArea: '',
    expectedResponseTime: 'standard'
  });
  
  const [formProgress, setFormProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showPreview, setShowPreview] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formAnalytics, setFormAnalytics] = useState({
    timeSpent: 0,
    fieldsCompleted: 0,
    interactions: 0
  });
  
  const formRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: formRef,
    offset: ["start end", "end start"]
  });
  
  const { toast } = useToast();

  // Enhanced animations
  const springConfig = { stiffness: 300, damping: 30 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [-100, 100]), springConfig);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // Enhanced form categories with more detailed information
  const formCategories = [
    {
      id: 'book-request',
      title: '📚 Academic Resources & Materials',
      subtitle: 'Books, Papers, Study Materials',
      description: 'Access our vast digital library with 50,000+ academic resources',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'from-blue-500 via-purple-500 to-indigo-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      priority: 'high',
      estimatedTime: '1-3 hours',
      successRate: '98%',
      expertiseRequired: 'Academic Research',
      features: [
        'Instant AI search across 500+ sources',
        'Quality verification by PhD experts',
        'Multiple format support (PDF, EPUB, DOC)',
        'Offline reading capabilities',
        'Citation generator included',
        'Study notes and summaries',
        'Interactive annotations',
        'Mobile-optimized viewing'
      ],
      processSteps: [
        'Submit detailed book/material request',
        'AI scans global academic databases',
        'Expert verification and quality check',
        'Instant WhatsApp notification',
        'Secure download with lifetime access',
        'Automatic backup to cloud storage'
      ]
    },
    {
      id: 'technical-support',
      title: '🔧 Technical Support & Solutions',
      subtitle: 'Platform Issues, Downloads, Troubleshooting',
      description: 'Expert technical assistance for all platform-related challenges',
      icon: <Settings className="w-8 h-8" />,
      color: 'from-orange-500 via-red-500 to-pink-600',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      priority: 'urgent',
      estimatedTime: '< 30 minutes',
      successRate: '99.5%',
      expertiseRequired: 'Technical Engineering',
      features: [
        'Real-time screen sharing assistance',
        'Advanced diagnostic tools',
        'Custom solution development',
        'Performance optimization',
        'Security issue resolution',
        'Browser compatibility fixes',
        'Mobile app troubleshooting',
        'API integration support'
      ],
      processSteps: [
        'Describe technical issue with screenshots',
        'Auto-diagnostic system analysis',
        'Expert technical team assignment',
        'Live troubleshooting session',
        'Solution implementation & testing',
        'Follow-up and prevention tips'
      ]
    },
    {
      id: 'general-support',
      title: '💬 General Support & Guidance',
      subtitle: 'Account Help, Platform Navigation, General Queries',
      description: 'Comprehensive support for all your platform and academic needs',
      icon: <Headphones className="w-8 h-8" />,
      color: 'from-green-500 via-teal-500 to-cyan-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      priority: 'normal',
      estimatedTime: '< 1 hour',
      successRate: '97%',
      expertiseRequired: 'Academic Counseling',
      features: [
        'Multi-language support (12 languages)',
        'Video call assistance available',
        'Personalized guidance sessions',
        'Study planning consultations',
        'Career counseling included',
        'Exam preparation strategies',
        'Time management coaching',
        'Stress management support'
      ],
      processSteps: [
        'Select your preferred communication method',
        'Detailed query submission',
        'Expert counselor assignment',
        'Personalized assistance session',
        'Action plan development',
        'Progress tracking and follow-up'
      ]
    },
    {
      id: 'community-access',
      title: '🤝 Community & Networking Hub',
      subtitle: 'Study Groups, Partnerships, Academic Networks',
      description: 'Connect with 50,000+ students and build your academic network',
      icon: <Users className="w-8 h-8" />,
      color: 'from-purple-500 via-pink-500 to-rose-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      priority: 'normal',
      estimatedTime: 'Instant Access',
      successRate: '100%',
      expertiseRequired: 'Community Management',
      features: [
        'AI-powered study partner matching',
        'Subject-specific discussion groups',
        'Expert mentor connections',
        'Virtual study rooms',
        'Resource sharing marketplace',
        'Peer review systems',
        'Collaborative project spaces',
        'Academic competition teams'
      ],
      processSteps: [
        'Complete academic profile setup',
        'Interest and goal identification',
        'AI matching with compatible peers',
        'Community group invitations',
        'Active participation and networking',
        'Long-term relationship building'
      ]
    },
    {
      id: 'academic-guidance',
      title: '🎓 Academic & Career Counseling',
      subtitle: 'Career Planning, Study Strategies, Academic Excellence',
      description: 'Professional guidance from education experts and career counselors',
      icon: <GraduationCap className="w-8 h-8" />,
      color: 'from-indigo-500 via-blue-500 to-purple-600',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/30',
      priority: 'high',
      estimatedTime: '< 2 hours',
      successRate: '96%',
      expertiseRequired: 'PhD Academic Advisors',
      features: [
        'Personalized career roadmaps',
        'University admission guidance',
        'Scholarship opportunity matching',
        'Research project mentoring',
        'Interview preparation coaching',
        'Resume and portfolio building',
        'Industry expert connections',
        'Internship and job placement'
      ],
      processSteps: [
        'Comprehensive academic assessment',
        'Career goal identification',
        'Expert advisor assignment',
        'Personalized strategy development',
        'Implementation and monitoring',
        'Success tracking and adjustments'
      ]
    },
    {
      id: 'feature-request',
      title: '💡 Innovation & Feature Requests',
      subtitle: 'Platform Improvements, New Features, Innovation Ideas',
      description: 'Shape the future of STUDENTHUB with your innovative ideas',
      icon: <Lightbulb className="w-8 h-8" />,
      color: 'from-yellow-500 via-orange-500 to-red-600',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      priority: 'normal',
      estimatedTime: '5-10 days',
      successRate: '85%',
      expertiseRequired: 'Product Development',
      features: [
        'Community voting system',
        'Developer feedback sessions',
        'Beta testing opportunities',
        'Feature impact analysis',
        'User experience research',
        'Innovation workshops',
        'Idea monetization options',
        'Platform co-creation'
      ],
      processSteps: [
        'Detailed feature idea submission',
        'Community impact assessment',
        'Technical feasibility analysis',
        'Development timeline planning',
        'Beta testing and feedback',
        'Official release and recognition'
      ]
    }
  ];

  // Enhanced priority levels
  const priorityLevels = [
    { 
      value: 'low', 
      label: 'Low Priority', 
      color: 'text-green-500', 
      bg: 'bg-green-500/10', 
      description: 'General inquiries, non-urgent requests',
      responseTime: '24-48 hours',
      icon: <Clock className="w-4 h-4" />
    },
    { 
      value: 'normal', 
      label: 'Normal Priority', 
      color: 'text-blue-500', 
      bg: 'bg-blue-500/10', 
      description: 'Standard support needs',
      responseTime: '4-12 hours',
      icon: <MessageSquare className="w-4 h-4" />
    },
    { 
      value: 'high', 
      label: 'High Priority', 
      color: 'text-yellow-500', 
      bg: 'bg-yellow-500/10', 
      description: 'Important academic deadlines',
      responseTime: '1-4 hours',
      icon: <Zap className="w-4 h-4" />
    },
    { 
      value: 'urgent', 
      label: 'Urgent', 
      color: 'text-red-500', 
      bg: 'bg-red-500/10', 
      description: 'Critical issues requiring immediate attention',
      responseTime: '< 30 minutes',
      icon: <Bell className="w-4 h-4" />
    }
  ];

  // Enhanced contact preferences
  const contactPreferences = [
    { 
      value: 'email', 
      label: 'Email Support', 
      icon: <Mail className="w-5 h-5" />, 
      description: 'Detailed written responses with documentation',
      advantages: ['Detailed explanations', 'File attachments', 'Reference documentation']
    },
    { 
      value: 'phone', 
      label: 'Phone Call', 
      icon: <Phone className="w-5 h-5" />, 
      description: 'Direct voice conversation with experts',
      advantages: ['Immediate clarification', 'Personal touch', 'Real-time problem solving']
    },
    { 
      value: 'whatsapp', 
      label: 'WhatsApp', 
      icon: <MessageCircle className="w-5 h-5" />, 
      description: 'Quick messaging with multimedia support',
      advantages: ['Instant messaging', 'Media sharing', 'Group discussions']
    },
    { 
      value: 'video', 
      label: 'Video Call', 
      icon: <Video className="w-5 h-5" />, 
      description: 'Face-to-face consultation with screen sharing',
      advantages: ['Visual demonstrations', 'Screen sharing', 'Personal interaction']
    },
    { 
      value: 'any', 
      label: 'Any Method', 
      icon: <Globe className="w-5 h-5" />, 
      description: 'Fastest available communication channel',
      advantages: ['Maximum speed', 'Expert choice', 'Optimal efficiency']
    }
  ];

  // Form validation with enhanced rules
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    
    if (formData.phone && !/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.phone)) newErrors.phone = 'Please enter a valid phone number';
    
    if (!formData.category) newErrors.category = 'Please select a support category';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (formData.subject.length < 5) newErrors.subject = 'Subject must be at least 5 characters';
    
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.length < 20) newErrors.message = 'Please provide more details (minimum 20 characters)';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate comprehensive form progress
  useEffect(() => {
    const requiredFields = ['name', 'email', 'category', 'subject', 'message'];
    const optionalFields = ['phone', 'institution', 'course', 'year', 'preferredContact', 'priority'];
    
    const completedRequired = requiredFields.filter(field => {
      const value = formData[field as keyof typeof formData];
      return typeof value === 'string' && value.trim() !== '';
    }).length;
    
    const completedOptional = optionalFields.filter(field => {
      const value = formData[field as keyof typeof formData];
      return typeof value === 'string' && value.trim() !== '';
    }).length;
    
    const progress = (completedRequired / requiredFields.length) * 70 + 
                     (completedOptional / optionalFields.length) * 30;
    
    setFormProgress(Math.round(progress));
    
    setFormAnalytics(prev => ({
      ...prev,
      fieldsCompleted: completedRequired + completedOptional,
      interactions: prev.interactions + 1
    }));
  }, [formData]);

  // Enhanced form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "⚠️ Form Validation Failed",
        description: "Please check the highlighted fields and try again.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Realistic submission simulation with progress tracking
    const steps = [
      'Validating form data...',
      'Processing request details...',
      'Connecting to expert team...',
      'Generating response timeline...',
      'Sending confirmation...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setUploadProgress(((i + 1) / steps.length) * 100);
      
      toast({
        title: steps[i],
        description: `Step ${i + 1} of ${steps.length}`,
      });
    }

    // Enhanced Google Form integration
    const selectedCategory = formCategories.find(c => c.id === formData.category);
    const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSczWJI6cXslwpNgayBkuH0pnKfCZx0weAYi2lbnkLLpb76Myg/viewform";
    
    const formParams = new URLSearchParams({
      'entry.name': formData.name,
      'entry.email': formData.email,
      'entry.phone': formData.phone || 'Not provided',
      'entry.category': formData.category,
      'entry.subject': formData.subject,
      'entry.message': formData.message,
      'entry.priority': formData.priority,
      'entry.institution': formData.institution || 'Not specified',
      'entry.course': formData.course || 'Not specified',
      'entry.contact_preference': formData.preferredContact
    });
    
    window.open(`${googleFormUrl}?${formParams}`, "_blank");
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    toast({
      title: "🚀 Request Submitted Successfully!",
      description: `Your ${selectedCategory?.title} request is being processed. Expected response: ${selectedCategory?.estimatedTime}`,
    });

    // Advanced analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'advanced_form_submission', {
        category: formData.category,
        priority: formData.priority,
        time_spent: formAnalytics.timeSpent,
        fields_completed: formAnalytics.fieldsCompleted,
        form_completion_rate: formProgress
      });
    }

    // Auto-reset form after success
    setTimeout(() => {
      setFormData({
        name: '', email: '', phone: '', institution: '', course: '', year: '',
        category: '', priority: 'normal', subject: '', message: '',
        preferredContact: 'email', timeSlot: '', urgencyLevel: 'normal',
        followUpRequired: true, attachments: [], communicationPreference: 'detailed',
        expertiseArea: '', expectedResponseTime: 'standard'
      });
      setShowSuccess(false);
      setCurrentStep(1);
      setFormProgress(0);
      setUploadProgress(0);
    }, 8000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <motion.section 
      ref={formRef}
      className="py-20 px-4 bg-gradient-to-br from-background via-background-secondary to-background-tertiary relative overflow-hidden"
      style={{ y: y as any, opacity, scale: scale as any }}
    >
      {/* Ultra-Advanced 3D Background */}
      <div className="absolute inset-0 h-full">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Scene3D />
        </Canvas>
      </div>

      {/* Enhanced Particle System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-8xl mx-auto relative z-10">
        {/* Revolutionary Section Header */}
        <motion.div 
          className="text-center space-y-8 mb-20"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="p-6 bg-gradient-to-r from-primary via-accent to-secondary rounded-3xl shadow-2xl">
              <MessageSquare className="h-12 w-12 text-white" />
            </div>
            <Badge className="text-xl px-8 py-3 bg-gradient-to-r from-accent/30 to-accent/10 text-accent border-accent/40 rounded-full">
              Next-Generation AI Contact System
            </Badge>
          </motion.div>

          <motion.h2 
            className="text-5xl md:text-7xl lg:text-8xl font-bold gradient-text leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Revolutionary 3D Contact Experience
          </motion.h2>
          
          <motion.p 
            className="text-2xl text-foreground-secondary max-w-5xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            Immerse yourself in our cutting-edge 3D contact system powered by advanced AI, 
            real-time expert matching, and revolutionary user experience design
          </motion.p>

          {/* Enhanced Live Stats with 3D Effects */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mt-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            {[
              { label: 'AI Response Time', value: '< 15s', icon: <Brain className="w-6 h-6" />, gradient: 'from-blue-500 to-cyan-500' },
              { label: 'Expert Accuracy', value: '99.8%', icon: <Target className="w-6 h-6" />, gradient: 'from-green-500 to-emerald-500' },
              { label: 'User Satisfaction', value: '4.97★', icon: <Star className="w-6 h-6" />, gradient: 'from-yellow-500 to-orange-500' },
              { label: 'Active Support Agents', value: '150+', icon: <Users className="w-6 h-6" />, gradient: 'from-purple-500 to-pink-500' },
              { label: 'Daily Resolutions', value: '2.8K', icon: <CheckCircle className="w-6 h-6" />, gradient: 'from-indigo-500 to-purple-500' }
            ].map((stat, index) => (
              <Tilt key={index} options={{ max: 15, scale: 1.05, speed: 300 }}>
                <motion.div
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-background/20 backdrop-blur-xl border border-border/30 hover:border-primary/50 transition-all duration-500 group"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div>
                    <div className="font-bold gradient-text text-lg">{stat.value}</div>
                    <div className="text-sm text-foreground-secondary">{stat.label}</div>
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </motion.div>
        </motion.div>

        {/* Ultra-Advanced Form System */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-12">
          {/* Categories & Analytics Sidebar */}
          <motion.div 
            className="xl:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Enhanced Category Selection */}
            <Card className="glassmorphism border-2 border-primary/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Target className="w-7 h-7 text-accent" />
                  Choose Your Support Category
                  <Badge className="ml-auto bg-gradient-to-r from-primary/20 to-accent/20 text-primary">
                    {formCategories.length} Available
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formCategories.map((category, index) => (
                  <Tilt key={category.id} options={{ max: 8, scale: 1.02 }}>
                    <motion.div
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-500 group ${
                        formData.category === category.id
                          ? `border-primary bg-gradient-to-r ${category.color} text-white shadow-2xl`
                          : 'border-border hover:border-primary/50 bg-background/50 hover:bg-background/70'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl transition-all duration-300 ${
                          formData.category === category.id 
                            ? 'bg-white/20 scale-110' 
                            : 'bg-primary/10 group-hover:bg-primary/20 group-hover:scale-105'
                        }`}>
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg">{category.title}</h4>
                          <p className="text-sm opacity-90 mt-1">{category.subtitle}</p>
                          <p className={`text-xs mt-2 ${
                            formData.category === category.id 
                              ? 'text-white/80' 
                              : 'text-foreground-secondary'
                          }`}>
                            {category.description}
                          </p>
                          
                          <div className="flex items-center gap-4 mt-4">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                formData.category === category.id 
                                  ? 'border-white/30 text-white/90' 
                                  : 'border-border/50'
                              }`}
                            >
                              {category.estimatedTime}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                formData.category === category.id 
                                  ? 'border-white/30 text-white/90' 
                                  : 'border-border/50'
                              }`}
                            >
                              {category.successRate} Success
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Tilt>
                ))}
              </CardContent>
            </Card>

            {/* Form Analytics & Progress */}
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  Form Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Completion Progress</span>
                    <span className="text-sm text-primary font-bold">{formProgress}%</span>
                  </div>
                  <Progress value={formProgress} className="h-3" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-background/50">
                    <div className="text-xl font-bold text-primary">{formAnalytics.fieldsCompleted}</div>
                    <div className="text-xs text-foreground-secondary">Fields Completed</div>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50">
                    <div className="text-xl font-bold text-accent">{Math.floor(formAnalytics.timeSpent / 60)}m</div>
                    <div className="text-xs text-foreground-secondary">Time Spent</div>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50">
                    <div className="text-xl font-bold text-secondary">{formAnalytics.interactions}</div>
                    <div className="text-xs text-foreground-secondary">Interactions</div>
                  </div>
                </div>

                {formData.category && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
                  >
                    <h4 className="font-semibold text-primary mb-2">Category Benefits</h4>
                    <ul className="space-y-1">
                      {formCategories.find(c => c.id === formData.category)?.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Form Interface */}
          <motion.div 
            className="xl:col-span-3"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Tilt options={{ max: 5, scale: 1.01, speed: 400 }}>
              <Card className="glassmorphism border-2 border-primary/30 shadow-2xl">
                <CardHeader className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5"></div>
                  <div className="relative">
                    <CardTitle className="text-3xl gradient-text flex items-center gap-3">
                      <Rocket className="w-8 h-8" />
                      Ultra-Advanced Contact Form
                      {isSubmitting && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Loader2 className="w-6 h-6 text-accent" />
                        </motion.div>
                      )}
                    </CardTitle>
                    <p className="text-foreground-secondary mt-2">
                      Experience our next-generation contact system with AI-powered assistance
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-8">
                  <AnimatePresence mode="wait">
                    {showSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center py-12 space-y-6"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                          <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                        </motion.div>
                        <h3 className="text-2xl font-bold gradient-text">Success! Request Submitted</h3>
                        <p className="text-foreground-secondary max-w-md mx-auto">
                          Your request has been successfully submitted to our expert team. 
                          You'll receive a response within the estimated timeframe.
                        </p>
                        <div className="flex justify-center gap-4">
                          <Button 
                            variant="outline"
                            onClick={() => setShowSuccess(false)}
                            className="hover:scale-105 transition-transform"
                          >
                            Submit Another Request
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information Section */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <h3 className="text-xl font-semibold gradient-text mb-6 flex items-center gap-2">
                            <Users className="w-6 h-6" />
                            Personal Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="name" className="text-sm font-medium">
                                Full Name *
                              </Label>
                              <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                className={`transition-all duration-300 ${errors.name ? 'border-red-500 focus:border-red-500' : 'focus:border-primary'}`}
                                required
                              />
                              {errors.name && (
                                <motion.p 
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-red-500 text-xs"
                                >
                                  {errors.name}
                                </motion.p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-sm font-medium">
                                Email Address *
                              </Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="your.email@domain.com"
                                className={`transition-all duration-300 ${errors.email ? 'border-red-500 focus:border-red-500' : 'focus:border-primary'}`}
                                required
                              />
                              {errors.email && (
                                <motion.p 
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-red-500 text-xs"
                                >
                                  {errors.email}
                                </motion.p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="phone" className="text-sm font-medium">
                                Phone Number
                              </Label>
                              <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+91 9876543210"
                                className="focus:border-primary transition-all duration-300"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="institution" className="text-sm font-medium">
                                Institution/University
                              </Label>
                              <Input
                                id="institution"
                                name="institution"
                                value={formData.institution}
                                onChange={handleInputChange}
                                placeholder="Your institution name"
                                className="focus:border-primary transition-all duration-300"
                              />
                            </div>
                          </div>
                        </motion.div>

                        {/* Request Details Section */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <h3 className="text-xl font-semibold gradient-text mb-6 flex items-center gap-2">
                            <MessageSquare className="w-6 h-6" />
                            Request Details
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                              <Label htmlFor="priority" className="text-sm font-medium">
                                Priority Level *
                              </Label>
                              <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                                <SelectTrigger className="focus:border-primary">
                                  <SelectValue placeholder="Select priority level" />
                                </SelectTrigger>
                                <SelectContent>
                                  {priorityLevels.map((level) => (
                                    <SelectItem key={level.value} value={level.value}>
                                      <div className="flex items-center gap-2">
                                        {level.icon}
                                        <span className={level.color}>{level.label}</span>
                                        <span className="text-xs text-foreground-secondary">({level.responseTime})</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="preferredContact" className="text-sm font-medium">
                                Preferred Contact Method
                              </Label>
                              <Select value={formData.preferredContact} onValueChange={(value) => setFormData(prev => ({ ...prev, preferredContact: value }))}>
                                <SelectTrigger className="focus:border-primary">
                                  <SelectValue placeholder="Choose contact method" />
                                </SelectTrigger>
                                <SelectContent>
                                  {contactPreferences.map((method) => (
                                    <SelectItem key={method.value} value={method.value}>
                                      <div className="flex items-center gap-2">
                                        {method.icon}
                                        <span>{method.label}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="space-y-2">
                              <Label htmlFor="subject" className="text-sm font-medium">
                                Subject *
                              </Label>
                              <Input
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                placeholder="Brief description of your request"
                                className={`transition-all duration-300 ${errors.subject ? 'border-red-500 focus:border-red-500' : 'focus:border-primary'}`}
                                required
                              />
                              {errors.subject && (
                                <motion.p 
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-red-500 text-xs"
                                >
                                  {errors.subject}
                                </motion.p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="message" className="text-sm font-medium">
                                Detailed Message *
                              </Label>
                              <Textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Please provide detailed information about your request..."
                                rows={6}
                                className={`transition-all duration-300 resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : 'focus:border-primary'}`}
                                required
                              />
                              <div className="flex justify-between items-center">
                                {errors.message ? (
                                  <motion.p 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-xs"
                                  >
                                    {errors.message}
                                  </motion.p>
                                ) : (
                                  <p className="text-xs text-foreground-secondary">
                                    Minimum 20 characters for detailed assistance
                                  </p>
                                )}
                                <span className="text-xs text-foreground-secondary">
                                  {formData.message.length} characters
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Submission Section */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="border-t border-border/50 pt-8"
                        >
                          {isSubmitting && (
                            <div className="mb-6">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">Processing Request...</span>
                                <span className="text-sm text-primary font-bold">{uploadProgress}%</span>
                              </div>
                              <Progress value={uploadProgress} className="h-3" />
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                              type="submit"
                              disabled={isSubmitting || !formData.category}
                              className="btn-hero bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground px-8 py-4 text-lg font-semibold group disabled:opacity-50"
                              size="lg"
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                                  Submit Request
                                </>
                              )}
                            </Button>

                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setShowPreview(!showPreview)}
                              className="px-8 py-4 text-lg group hover:border-primary"
                              size="lg"
                            >
                              <Eye className="w-5 h-5 mr-2" />
                              {showPreview ? 'Hide' : 'Preview'} Request
                            </Button>
                          </div>

                          {/* Request Preview */}
                          <AnimatePresence>
                            {showPreview && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-background/50 to-background-secondary/50 border border-border/30"
                              >
                                <h4 className="text-lg font-semibold gradient-text mb-4">Request Preview</h4>
                                <div className="space-y-3 text-sm">
                                  <div><span className="font-medium">Name:</span> {formData.name || 'Not provided'}</div>
                                  <div><span className="font-medium">Email:</span> {formData.email || 'Not provided'}</div>
                                  <div><span className="font-medium">Category:</span> {formCategories.find(c => c.id === formData.category)?.title || 'Not selected'}</div>
                                  <div><span className="font-medium">Priority:</span> {priorityLevels.find(p => p.value === formData.priority)?.label}</div>
                                  <div><span className="font-medium">Subject:</span> {formData.subject || 'Not provided'}</div>
                                  <div><span className="font-medium">Message:</span> {formData.message || 'Not provided'}</div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </form>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </Tilt>
          </motion.div>
        </div>

        {/* Additional Features Section */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Enterprise Security",
              description: "Bank-grade encryption and data protection",
              features: ["256-bit SSL encryption", "GDPR compliant", "Data sovereignty"]
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: "AI-Powered Routing",
              description: "Intelligent request routing to the right experts",
              features: ["Machine learning", "Expert matching", "Priority optimization"]
            },
            {
              icon: <Globe className="w-8 h-8" />,
              title: "Global Support",
              description: "24/7 multilingual support across time zones",
              features: ["12 languages", "Regional experts", "Cultural awareness"]
            }
          ].map((feature, index) => (
            <Tilt key={index} options={{ max: 10, scale: 1.02 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl glassmorphism border border-border/30 hover:border-primary/50 transition-all duration-500 group"
                whileHover={{ y: -5 }}
              >
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold gradient-text mb-2">{feature.title}</h3>
                <p className="text-foreground-secondary mb-4">{feature.description}</p>
                <ul className="space-y-1">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Tilt>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Ultra3DContactForm;