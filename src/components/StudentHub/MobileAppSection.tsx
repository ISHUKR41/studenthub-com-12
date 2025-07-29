import React, { useRef, useEffect } from 'react'; // Fixed Sync import
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Smartphone, 
  Download, 
  Star, 
  Wifi, 
  Battery, 
  Play, 
  Apple,
  Zap,
  Lock,
  RefreshCw,
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MobileAppSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.phone-mockup',
        { 
          y: 100,
          opacity: 0,
          rotationY: -30
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: phoneRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo('.app-feature',
        { 
          x: -50,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.features-list',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating animation for phone
      gsap.to('.phone-mockup', {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const appFeatures = [
    {
      icon: Wifi,
      title: "Offline Learning",
      description: "Download and study without internet connection"
    },
    {
      icon: RefreshCw,
      title: "Cloud Sync",
      description: "Seamless sync across all your devices"
    },
    {
      icon: Lock,
      title: "Secure Access",
      description: "Biometric login and encrypted data storage"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance for quick access"
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Real-time analytics and performance insights"
    }
  ];

  const appStats = [
    { value: "4.8", label: "App Store Rating", icon: Star },
    { value: "50M+", label: "Downloads", icon: Download },
    { value: "99.9%", label: "Uptime", icon: Zap },
    { value: "24/7", label: "Support", icon: Smartphone }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Smartphone className="h-8 w-8 text-primary" />
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Mobile Experience
            </Badge>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="gradient-text">Study Anywhere</span>
            <br />
            <span className="text-foreground">with Our Mobile App</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
            Take your learning journey with you. Our mobile app offers the complete 
            study experience optimized for smartphones and tablets.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* App Features */}
          <div className="features-list space-y-8">
            <div className="app-feature">
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Everything You Need in Your Pocket
              </h3>
              <p className="text-lg text-foreground-secondary mb-8">
                Access thousands of question papers, study materials, and AI tools 
                wherever you are. Learn during commute, breaks, or anywhere inspiration strikes.
              </p>
            </div>

            {appFeatures.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 10 }}
                className="app-feature flex items-start gap-4 p-4 rounded-2xl hover:bg-secondary/10 transition-all duration-300"
              >
                <div className="bg-primary/10 text-primary p-3 rounded-xl">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-foreground-secondary">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Download Buttons */}
            <div className="app-feature flex flex-col sm:flex-row gap-4 pt-6">
              <Button size="lg" className="flex items-center gap-3">
                <Play className="h-5 w-5" />
                Google Play Store
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="flex items-center gap-3">
                <Apple className="h-5 w-5" />
                App Store
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Phone Mockup */}
          <div ref={phoneRef} className="relative">
            <div className="phone-mockup relative mx-auto">
              {/* Phone Frame */}
              <div className="relative w-80 h-[640px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] shadow-2xl">
                  {/* Screen */}
                  <div className="absolute top-6 left-6 right-6 bottom-6 bg-background rounded-[2.5rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center p-4 text-xs font-medium">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <Wifi className="h-3 w-3" />
                        <Battery className="h-3 w-3" />
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="px-4 pb-4 space-y-4">
                      {/* Header */}
                      <div className="text-center py-4">
                        <h3 className="text-xl font-bold gradient-text">StudyHub</h3>
                        <p className="text-sm text-foreground-secondary">Your Learning Companion</p>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-3">
                        {appStats.map((stat, index) => (
                          <div key={index} className="glass p-3 rounded-xl text-center">
                            <stat.icon className="h-4 w-4 text-primary mx-auto mb-1" />
                            <div className="text-lg font-bold text-foreground">{stat.value}</div>
                            <div className="text-xs text-foreground-secondary">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Feature Preview */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground">Recent Activity</h4>
                        {[
                          "Physics Chapter 12 - 85% Complete",
                          "Mock Test #45 - Score: 89/100",
                          "Chemistry Notes - Downloaded"
                        ].map((activity, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-foreground-secondary">{activity}</span>
                          </div>
                        ))}
                      </div>

                      {/* Navigation Bar */}
                      <div className="flex justify-around py-3 border-t border-border">
                        {['Home', 'Study', 'Tests', 'Profile'].map((tab, index) => (
                          <div key={index} className="text-center">
                            <div className={`w-6 h-6 mx-auto mb-1 rounded ${index === 0 ? 'bg-primary' : 'bg-secondary'}`}></div>
                            <span className="text-xs text-foreground-secondary">{tab}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Home Button */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-secondary/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>

        {/* App Screenshots */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">
            App Screenshots & Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Dashboard",
                description: "Beautiful and intuitive home screen with quick access to all features"
              },
              {
                title: "Study Mode",
                description: "Distraction-free reading mode with highlighting and note-taking"
              },
              {
                title: "Progress Tracking",
                description: "Detailed analytics and progress visualization for all subjects"
              }
            ].map((screenshot, index) => (
              <Card key={index} className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-4 flex items-center justify-center">
                    <Smartphone className="h-16 w-16 text-primary/60" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {screenshot.title}
                  </h4>
                  <p className="text-sm text-foreground-secondary">
                    {screenshot.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};