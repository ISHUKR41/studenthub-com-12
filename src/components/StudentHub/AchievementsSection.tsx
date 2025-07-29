import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Award, Target, TrendingUp, Users } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AchievementsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.achievement-card', 
        { 
          y: 100, 
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: achievementsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo('.floating-trophy',
        { rotation: -10, y: 10 },
        { 
          rotation: 10, 
          y: -10, 
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const achievements = [
    {
      icon: Trophy,
      title: "Education Excellence Award 2024",
      description: "Recognized as India's leading online education platform",
      metric: "#1 Platform",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      icon: Star,
      title: "170M+ Success Stories",
      description: "Students achieving their academic dreams through our platform",
      metric: "98% Success Rate",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Award,
      title: "Best EdTech Innovation",
      description: "AI-powered learning solutions recognized globally",
      metric: "50+ Awards",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: Target,
      title: "Top Rank Achievers",
      description: "Students securing AIR 1-100 in major competitive exams",
      metric: "25K+ Toppers",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: TrendingUp,
      title: "Academic Improvement",
      description: "Average score improvement across all subjects",
      metric: "+85% Increase",
      color: "text-red-500",
      bgColor: "bg-red-500/10"
    },
    {
      icon: Users,
      title: "Expert Faculty Network",
      description: "IIT/AIIMS graduates and PhD holders as mentors",
      metric: "2000+ Experts",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10"
    }
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
            <Trophy className="h-8 w-8 text-primary floating-trophy" />
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Our Achievements
            </Badge>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="gradient-text">Recognized Excellence</span>
            <br />
            <span className="text-foreground">in Education</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
            From humble beginnings to becoming India's most trusted educational platform, 
            our journey is marked by continuous innovation and student success.
          </p>
        </motion.div>

        <div ref={achievementsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <Card key={index} className="achievement-card glass hover:scale-105 transition-all duration-300 border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className={`${achievement.bgColor} ${achievement.color} p-4 rounded-2xl w-fit mb-6`}>
                  <achievement.icon className="h-8 w-8" />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-foreground-secondary text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                  <div className={`${achievement.color} font-bold text-2xl`}>
                    {achievement.metric}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Awards Gallery */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">
            Recognition & Awards Gallery
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "Digital India Award 2024",
              "EdTech Company of the Year",
              "Best Learning Platform",
              "Innovation in Education",
              "Student Choice Award",
              "Excellence in Technology"
            ].map((award, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass p-6 rounded-2xl text-center"
              >
                <Award className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground">{award}</p>
                <p className="text-xs text-foreground-secondary mt-1">2024</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};