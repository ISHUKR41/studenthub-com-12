import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  MessageSquare, 
  User, 
  Mail, 
  FileText, 
  Star,
  Sparkles,
  Zap,
  Globe,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Phone,
  Camera,
  Mic,
  Paperclip,
  Heart,
  Target,
  Rocket,
  Award
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import * as THREE from 'three';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select';
  required: boolean;
  placeholder: string;
  icon: React.ReactNode;
  options?: string[];
}

interface Ultra3DGoogleFormAdvancedProps {
  title?: string;
  description?: string;
  className?: string;
}

export const Ultra3DGoogleFormAdvanced: React.FC<Ultra3DGoogleFormAdvancedProps> = ({
  title = "Get Personalized Support",
  description = "Tell us about your academic needs and we'll provide tailored assistance",
  className = ""
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const { scrollYProgress } = useScroll({
    target: formRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);

  // Enhanced 3D Scene Setup
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true 
    });
    
    renderer.setSize(800, 600);
    renderer.setClearColor(0x000000, 0);
    sceneRef.current = scene;

    // Create floating form elements
    const createFormElement = (type: string, position: THREE.Vector3, color: number) => {
      let geometry;
      
      switch(type) {
        case 'input':
          geometry = new THREE.BoxGeometry(0.4, 0.08, 0.02);
          break;
        case 'button':
          geometry = new THREE.BoxGeometry(0.2, 0.06, 0.03);
          break;
        case 'text':
          geometry = new THREE.SphereGeometry(0.03, 16, 16);
          break;
        default:
          geometry = new THREE.OctahedronGeometry(0.04);
      }
      
      const material = new THREE.MeshBasicMaterial({ 
        color,
        transparent: true,
        opacity: 0.8
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      return mesh;
    };

    const formElements: THREE.Mesh[] = [];
    const elementTypes = ['input', 'button', 'text', 'star'];
    const colors = [0x3B82F6, 0x10B981, 0xF59E0B, 0xEF4444, 0x8B5CF6, 0xF97316];

    for (let i = 0; i < 40; i++) {
      const type = elementTypes[i % elementTypes.length];
      const color = colors[i % colors.length];
      const position = new THREE.Vector3(
        Math.random() * 6 - 3,
        Math.random() * 6 - 3,
        Math.random() * 4 - 2
      );
      
      const element = createFormElement(type, position, color);
      scene.add(element);
      formElements.push(element);
    }

    camera.position.z = 5;

    const animate = () => {
      formElements.forEach((element, index) => {
        element.rotation.x += 0.01 + (index % 3) * 0.002;
        element.rotation.y += 0.008 + (index % 2) * 0.003;
        element.position.y += Math.sin(Date.now() * 0.001 + index) * 0.003;
        element.position.x += Math.cos(Date.now() * 0.0008 + index) * 0.002;
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = 800 / 600;
      camera.updateProjectionMatrix();
      renderer.setSize(800, 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const formSteps = [
    {
      title: "Personal Information",
      description: "Tell us about yourself",
      fields: [
        {
          id: 'name',
          label: 'Full Name',
          type: 'text' as const,
          required: true,
          placeholder: 'Enter your full name...',
          icon: <User className="w-5 h-5" />
        },
        {
          id: 'email',
          label: 'Email Address',
          type: 'email' as const,
          required: true,
          placeholder: 'your.email@example.com',
          icon: <Mail className="w-5 h-5" />
        },
        {
          id: 'phone',
          label: 'Phone Number',
          type: 'text' as const,
          required: false,
          placeholder: '+91 98765 43210',
          icon: <Phone className="w-5 h-5" />
        }
      ]
    },
    {
      title: "Academic Information",
      description: "Your educational background",
      fields: [
        {
          id: 'education',
          label: 'Education Level',
          type: 'select' as const,
          required: true,
          placeholder: 'Select your education level',
          icon: <Award className="w-5 h-5" />,
          options: ['Class 9-10', 'Class 11-12', 'Undergraduate', 'Postgraduate', 'PhD', 'Working Professional']
        },
        {
          id: 'exam',
          label: 'Target Exam/Interest',
          type: 'select' as const,
          required: true,
          placeholder: 'Select your focus area',
          icon: <Target className="w-5 h-5" />,
          options: ['JEE Main/Advanced', 'NEET', 'UPSC', 'SSC', 'Banking Exams', 'State Board Exams', 'University Exams', 'General Study Material']
        },
        {
          id: 'subjects',
          label: 'Preferred Subjects',
          type: 'text' as const,
          required: false,
          placeholder: 'e.g., Physics, Chemistry, Mathematics...',
          icon: <FileText className="w-5 h-5" />
        }
      ]
    },
    {
      title: "Support Request",
      description: "How can we help you?",
      fields: [
        {
          id: 'supportType',
          label: 'Type of Support',
          type: 'select' as const,
          required: true,
          placeholder: 'Select support type',
          icon: <Heart className="w-5 h-5" />,
          options: ['Question Papers Request', 'Study Material', 'Technical Support', 'Book Recommendations', 'Study Planning', 'Career Guidance', 'Community Access', 'Other']
        },
        {
          id: 'message',
          label: 'Detailed Message',
          type: 'textarea' as const,
          required: true,
          placeholder: 'Please describe your specific needs, questions, or how we can assist you...',
          icon: <MessageSquare className="w-5 h-5" />
        },
        {
          id: 'urgency',
          label: 'Priority Level',
          type: 'select' as const,
          required: false,
          placeholder: 'How urgent is this?',
          icon: <Clock className="w-5 h-5" />,
          options: ['Low - General inquiry', 'Medium - Within this week', 'High - Within 24 hours', 'Urgent - Same day response needed']
        }
      ]
    }
  ];

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    if (validationErrors[fieldId]) {
      setValidationErrors(prev => ({ ...prev, [fieldId]: '' }));
    }
  };

  const validateStep = (stepIndex: number) => {
    const step = formSteps[stepIndex];
    const errors: Record<string, string> = {};
    
    step.fields.forEach(field => {
      if (field.required && !formData[field.id]) {
        errors[field.id] = `${field.label} is required`;
      }
      if (field.type === 'email' && formData[field.id] && !/\S+@\S+\.\S+/.test(formData[field.id])) {
        errors[field.id] = 'Please enter a valid email address';
      }
    });
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, formSteps.length - 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      toast({
        title: "Request Submitted Successfully! 🎉",
        description: "We'll get back to you within 24 hours. Check your email for confirmation."
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const isError = !!validationErrors[field.id];
    const isFocused = focusedField === field.id;
    
    return (
      <motion.div
        key={field.id}
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <label className="flex items-center gap-3 text-sm font-semibold text-foreground">
          <motion.div
            className={`p-2 rounded-lg transition-all duration-300 ${
              isFocused ? 'bg-primary text-white scale-110' : 'bg-background-secondary text-primary'
            }`}
            animate={{ rotate: isFocused ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {field.icon}
          </motion.div>
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        
        <div className="relative">
          {field.type === 'textarea' ? (
            <Textarea
              placeholder={field.placeholder}
              value={formData[field.id] || ''}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              onFocus={() => setFocusedField(field.id)}
              onBlur={() => setFocusedField(null)}
              className={`min-h-32 transition-all duration-300 ${
                isError ? 'border-red-500 ring-red-500/20' : 
                isFocused ? 'border-primary ring-primary/20 shadow-lg' : ''
              }`}
              rows={4}
            />
          ) : field.type === 'select' ? (
            <select
              value={formData[field.id] || ''}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              onFocus={() => setFocusedField(field.id)}
              onBlur={() => setFocusedField(null)}
              className={`w-full p-3 rounded-lg border bg-background text-foreground transition-all duration-300 ${
                isError ? 'border-red-500 ring-red-500/20' : 
                isFocused ? 'border-primary ring-primary/20 shadow-lg' : 'border-border'
              }`}
            >
              <option value="">{field.placeholder}</option>
              {field.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <Input
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.id] || ''}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              onFocus={() => setFocusedField(field.id)}
              onBlur={() => setFocusedField(null)}
              className={`transition-all duration-300 ${
                isError ? 'border-red-500 ring-red-500/20' : 
                isFocused ? 'border-primary ring-primary/20 shadow-lg' : ''
              }`}
            />
          )}
          
          {isError && (
            <motion.p
              className="text-red-500 text-sm mt-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {validationErrors[field.id]}
            </motion.p>
          )}
        </div>
      </motion.div>
    );
  };

  if (isSubmitted) {
    return (
      <motion.div
        ref={formRef}
        className={`relative py-20 px-4 overflow-hidden ${className}`}
        style={{ rotateX, rotateY, scale }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="w-32 h-32 mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-16 h-16 text-white" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-4"
          >
            <h3 className="text-4xl font-bold gradient-text">Request Submitted Successfully!</h3>
            <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
              Thank you for reaching out! Our support team will review your request and get back to you within 24 hours.
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <Badge className="px-4 py-2 bg-green-500/20 text-green-700 border-green-500/30">
                <Clock className="w-4 h-4 mr-2" />
                Response within 24 hours
              </Badge>
              <Badge className="px-4 py-2 bg-blue-500/20 text-blue-700 border-blue-500/30">
                <Mail className="w-4 h-4 mr-2" />
                Email confirmation sent
              </Badge>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  const currentStepData = formSteps[currentStep];
  const progress = ((currentStep + 1) / formSteps.length) * 100;

  return (
    <motion.section
      ref={formRef}
      className={`relative py-20 px-4 bg-gradient-to-br from-background via-background-secondary to-background-tertiary overflow-hidden ${className}`}
      style={{ rotateX, rotateY, scale }}
    >
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${10 + i * 12}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center space-y-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div 
              className="p-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Rocket className="h-8 w-8 text-white" />
            </motion.div>
            <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
              Advanced Support Form
            </Badge>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold gradient-text">{title}</h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">{description}</p>
          
          {/* Progress Indicator */}
          <div className="max-w-md mx-auto space-y-4">
            <div className="flex justify-between text-sm text-foreground-secondary">
              <span>Step {currentStep + 1} of {formSteps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-background-secondary rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glassmorphism border-2 border-primary/20 hover:border-primary/40 transition-all duration-500 shadow-2xl">
            <CardContent className="p-8 md:p-12">
              {/* Step Header */}
              <motion.div
                className="text-center space-y-4 mb-8"
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">{currentStepData.title}</h3>
                <p className="text-foreground-secondary">{currentStepData.description}</p>
              </motion.div>

              {/* Form Fields */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {currentStepData.fields.map(renderField)}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-8 pt-8 border-t border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="order-2 sm:order-1"
                >
                  Previous Step
                </Button>

                <div className="flex gap-2 order-1 sm:order-2">
                  {formSteps.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentStep ? 'bg-primary scale-125' :
                        index < currentStep ? 'bg-secondary' : 'bg-background-secondary'
                      }`}
                      whileHover={{ scale: 1.3 }}
                    />
                  ))}
                </div>

                {currentStep < formSteps.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    className="btn-hero order-3 group"
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="btn-hero order-3 group"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-4 h-4 mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          ⚡
                        </motion.div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                )}
              </motion.div>

              {/* Support Information */}
              <motion.div
                className="mt-8 pt-6 border-t border-border text-center space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <p className="text-sm text-foreground-secondary">
                  Need immediate help? Contact our support team directly
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Badge variant="outline" className="px-3 py-1">
                    <Mail className="w-3 h-3 mr-1" />
                    support@studenthub.com
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    <Phone className="w-3 h-3 mr-1" />
                    +91 98765 43210
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    <Clock className="w-3 h-3 mr-1" />
                    24/7 Support
                  </Badge>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
};