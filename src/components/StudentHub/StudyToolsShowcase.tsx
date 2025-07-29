import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Calculator, 
  FileText, 
  Image, 
  Zap, 
  Target, 
  Clock, 
  BarChart3, 
  Lightbulb, 
  Puzzle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StudyToolsShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeDemo, setActiveDemo] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tool-card',
        { 
          y: 100,
          opacity: 0,
          rotationX: 30
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.tools-grid',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo('.floating-element',
        { y: 0, rotation: 0 },
        {
          y: -20,
          rotation: 360,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          stagger: 0.5
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const studyTools = [
    {
      icon: Brain,
      title: "AI Study Planner",
      description: "Personalized study schedules based on your learning pace and exam dates",
      features: ["Smart scheduling", "Progress tracking", "Adaptive learning"],
      demo: "Creates optimal study plan for JEE in 6 months",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      category: "AI Powered"
    },
    {
      icon: Calculator,
      title: "Smart Calculator",
      description: "Advanced calculator with step-by-step solutions for complex problems",
      features: ["Equation solver", "Graph plotting", "Unit conversion"],
      demo: "Solves quadratic equations with detailed steps",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      category: "Mathematics"
    },
    {
      icon: FileText,
      title: "Note Maker Pro",
      description: "Create, organize and share beautiful study notes with rich formatting",
      features: ["Rich text editor", "Template library", "Collaboration"],
      demo: "Creates formatted notes from textbook chapters",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      category: "Productivity"
    },
    {
      icon: Image,
      title: "Diagram Generator",
      description: "Create scientific diagrams, flowcharts, and mind maps instantly",
      features: ["Pre-built templates", "Auto-generation", "Export options"],
      demo: "Generates cell structure diagram for biology",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      category: "Visual Learning"
    },
    {
      icon: Zap,
      title: "Quick Revision",
      description: "Lightning-fast revision with flashcards and quick quizzes",
      features: ["Smart flashcards", "Spaced repetition", "Progress tracking"],
      demo: "Reviews 50 chemistry formulas in 10 minutes",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      category: "Revision"
    },
    {
      icon: Target,
      title: "Goal Tracker",
      description: "Set and achieve your academic goals with smart milestone tracking",
      features: ["SMART goals", "Progress visualization", "Rewards system"],
      demo: "Tracks progress towards 95% in Physics",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      category: "Motivation"
    },
    {
      icon: Clock,
      title: "Pomodoro Timer",
      description: "Enhanced focus sessions with breaks and productivity analytics",
      features: ["Customizable intervals", "Focus analytics", "Break reminders"],
      demo: "25-min focused study session with analytics",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      category: "Focus"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Detailed insights into your learning patterns and improvement areas",
      features: ["Learning analytics", "Weak area identification", "Performance predictions"],
      demo: "Shows 23% improvement in Mathematics",
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
      category: "Analytics"
    },
    {
      icon: Lightbulb,
      title: "Doubt Solver AI",
      description: "Get instant explanations for any concept or problem you're stuck on",
      features: ["Instant answers", "Step-by-step solutions", "Related concepts"],
      demo: "Explains photosynthesis process in simple terms",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      category: "AI Assistant"
    }
  ];

  const toolCategories = ["All", "AI Powered", "Mathematics", "Productivity", "Visual Learning", "Revision"];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-secondary/5 to-background relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-20 left-20 text-4xl opacity-20">🧠</div>
        <div className="floating-element absolute top-40 right-20 text-4xl opacity-20">⚡</div>
        <div className="floating-element absolute bottom-40 left-40 text-4xl opacity-20">🎯</div>
        <div className="floating-element absolute bottom-20 right-40 text-4xl opacity-20">📊</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Smart Study Tools
            </Badge>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="gradient-text">AI-Powered</span>
            <br />
            <span className="text-foreground">Learning Tools</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed">
            Transform your study experience with our suite of intelligent tools designed to 
            boost productivity, enhance understanding, and accelerate your learning journey.
          </p>
        </motion.div>

        {/* Tool Categories Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {toolCategories.map((category, index) => (
            <Button
              key={index}
              variant={activeDemo === index ? "default" : "outline"}
              className="px-6 py-2"
              onClick={() => setActiveDemo(index)}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Tools Grid */}
        <div className="tools-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {studyTools.map((tool, index) => (
            <Card key={index} className="tool-card glass border-0 shadow-2xl hover:shadow-primary/20 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className={`${tool.bgColor} ${tool.color} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className="h-8 w-8" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {tool.category}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {tool.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm text-foreground-secondary">
                        <div className={`w-1.5 h-1.5 rounded-full ${tool.color.replace('text-', 'bg-')}`}></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium text-foreground mb-2">Demo:</p>
                    <p className="text-sm text-foreground-secondary italic">
                      "{tool.demo}"
                    </p>
                  </div>

                  <Button className="w-full group-hover:scale-105 transition-transform duration-300">
                    Try Tool
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass p-8 rounded-3xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold gradient-text mb-4">
              See Our Tools in Action
            </h3>
            <p className="text-lg text-foreground-secondary">
              Interactive demonstrations of how our tools can transform your study experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Demo Video/Animation Area */}
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Puzzle className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground">Interactive Demo</p>
                  <p className="text-sm text-foreground-secondary">Click tools to see them in action</p>
                </div>
              </div>
            </div>

            {/* Tool Benefits */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-foreground">Why Students Love Our Tools</h4>
              <div className="space-y-4">
                {[
                  {
                    icon: Zap,
                    title: "Save 40% Study Time",
                    description: "Intelligent tools eliminate manual work and optimize your learning"
                  },
                  {
                    icon: Target,
                    title: "Improve Focus by 60%",
                    description: "Distraction-free environment with built-in productivity features"
                  },
                  {
                    icon: BarChart3,
                    title: "Track Real Progress",
                    description: "Detailed analytics show exactly where you're improving"
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-xl">
                      <benefit.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground mb-1">{benefit.title}</h5>
                      <p className="text-sm text-foreground-secondary">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};