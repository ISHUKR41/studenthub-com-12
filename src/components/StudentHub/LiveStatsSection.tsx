import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, TrendingUp, Users, Clock, Download, BookOpen, Target, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const LiveStatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [liveStats, setLiveStats] = useState({
    activeUsers: 156789,
    downloadsToday: 45632,
    questionsAnswered: 234567,
    studyHours: 1234567,
    successRate: 97.8,
    newRegistrations: 2345
  });

  useEffect(() => {
    // Simulate live stats updates
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 50),
        downloadsToday: prev.downloadsToday + Math.floor(Math.random() * 20),
        questionsAnswered: prev.questionsAnswered + Math.floor(Math.random() * 30),
        studyHours: prev.studyHours + Math.floor(Math.random() * 100),
        successRate: 97.8 + Math.random() * 0.4,
        newRegistrations: prev.newRegistrations + Math.floor(Math.random() * 10)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.live-stat-card',
        { 
          scale: 0.8,
          opacity: 0,
          y: 50
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: '.stats-grid',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Pulsing animation for live indicators
      gsap.to('.live-indicator', {
        scale: 1.2,
        opacity: 0.7,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const realTimeStats = [
    {
      icon: Users,
      label: "Active Users Right Now",
      value: formatNumber(liveStats.activeUsers),
      trend: "+12.5%",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      isLive: true
    },
    {
      icon: Download,
      label: "Downloads Today",
      value: formatNumber(liveStats.downloadsToday),
      trend: "+23.8%",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      isLive: true
    },
    {
      icon: Target,
      label: "Questions Answered",
      value: formatNumber(liveStats.questionsAnswered),
      trend: "+45.2%",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      isLive: true
    },
    {
      icon: Clock,
      label: "Study Hours This Month",
      value: formatNumber(liveStats.studyHours),
      trend: "+67.3%",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      isLive: false
    },
    {
      icon: TrendingUp,
      label: "Success Rate",
      value: liveStats.successRate.toFixed(1) + "%",
      trend: "+2.1%",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      isLive: false
    },
    {
      icon: Zap,
      label: "New Registrations",
      value: formatNumber(liveStats.newRegistrations),
      trend: "+89.4%",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      isLive: true
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-background to-secondary/5 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Activity className="h-8 w-8 text-primary animate-pulse" />
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full live-indicator"></div>
                Live Statistics
              </div>
            </Badge>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="gradient-text">Real-Time</span>
            <br />
            <span className="text-foreground">Platform Activity</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
            Watch our platform come alive! See live statistics of students learning, 
            downloading resources, and achieving their academic goals in real-time.
          </p>
        </motion.div>

        <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {realTimeStats.map((stat, index) => (
            <Card key={index} className="live-stat-card glass border-0 shadow-2xl hover:shadow-primary/20 transition-all duration-300 relative">
              <CardContent className="p-8">
                {stat.isLive && (
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-red-500 font-medium">LIVE</span>
                  </div>
                )}
                
                <div className={`${stat.bgColor} ${stat.color} p-4 rounded-2xl w-fit mb-6`}>
                  <stat.icon className="h-8 w-8" />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-foreground-secondary mb-2">
                      {stat.label}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-foreground">
                        {stat.value}
                      </span>
                      <span className="text-sm font-medium text-green-500">
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Live Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Live Activity Feed */}
            <Card className="glass border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Activity className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Live Activity Feed</h3>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-auto"></div>
                </div>
                <div className="space-y-4">
                  {[
                    "Student from Delhi just downloaded JEE Physics papers",
                    "NEET aspirant completed Mock Test #47",
                    "New registration from Mumbai - Engineering student",
                    "CBSE Class 12 student accessed Chemistry notes",
                    "CAT preparation - Quantitative Aptitude practice started"
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/10"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-foreground-secondary">{activity}</span>
                      <span className="text-xs text-foreground-secondary/60 ml-auto">now</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="glass border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Performance Metrics</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-foreground-secondary">Server Response Time</span>
                      <span className="text-sm font-medium text-green-500">98ms</span>
                    </div>
                    <div className="w-full bg-secondary/20 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-[95%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-foreground-secondary">Platform Uptime</span>
                      <span className="text-sm font-medium text-green-500">99.9%</span>
                    </div>
                    <div className="w-full bg-secondary/20 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-[99.9%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-foreground-secondary">User Satisfaction</span>
                      <span className="text-sm font-medium text-blue-500">4.9/5</span>
                    </div>
                    <div className="w-full bg-secondary/20 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full w-[98%]"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};