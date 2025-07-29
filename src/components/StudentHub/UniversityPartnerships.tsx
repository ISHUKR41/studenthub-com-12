import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Users, GraduationCap, Trophy, Star } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const UniversityPartnerships: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const partnershipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.university-card',
        { 
          y: 80,
          opacity: 0,
          rotationY: 15
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: partnershipRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo('.partnership-stat',
        { scale: 0, rotation: 180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: '.stats-container',
            start: "top 80%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const topUniversities = [
    {
      name: "Indian Institute of Technology",
      shortName: "IIT",
      location: "All Campuses",
      students: "50,000+",
      collaboration: "Research & Curriculum Development",
      achievement: "Top Engineering Institute",
      ranking: "#1",
      logo: "🏛️"
    },
    {
      name: "All India Institute of Medical Sciences",
      shortName: "AIIMS",
      location: "Delhi & Branches",
      students: "25,000+",
      collaboration: "Medical Education Content",
      achievement: "Premier Medical Institute",
      ranking: "#1",
      logo: "🏥"
    },
    {
      name: "Indian Institute of Management",
      shortName: "IIM",
      location: "All Campuses",
      students: "30,000+",
      collaboration: "Management Studies",
      achievement: "Top B-School",
      ranking: "#1",
      logo: "💼"
    },
    {
      name: "University of Delhi",
      shortName: "DU",
      location: "New Delhi",
      students: "400,000+",
      collaboration: "Liberal Arts & Sciences",
      achievement: "Central University",
      ranking: "#2",
      logo: "📚"
    },
    {
      name: "Banaras Hindu University",
      shortName: "BHU",
      location: "Varanasi",
      students: "30,000+",
      collaboration: "Research & Development",
      achievement: "Oldest University",
      ranking: "#3",
      logo: "🕌"
    },
    {
      name: "Jawaharlal Nehru University",
      shortName: "JNU",
      location: "New Delhi",
      students: "8,000+",
      collaboration: "Social Sciences",
      achievement: "Research Excellence",
      ranking: "#4",
      logo: "🌟"
    }
  ];

  const partnershipStats = [
    { icon: Building2, value: "1000+", label: "Partner Institutions" },
    { icon: Users, value: "5M+", label: "Student Network" },
    { icon: GraduationCap, value: "500+", label: "Academic Programs" },
    { icon: Trophy, value: "50+", label: "Joint Certifications" }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-secondary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Building2 className="h-8 w-8 text-primary" />
            <Badge variant="secondary" className="text-lg px-4 py-2">
              University Partnerships
            </Badge>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="gradient-text">Trusted by</span>
            <br />
            <span className="text-foreground">India's Top Institutions</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed">
            Collaborating with premier educational institutions to provide world-class learning 
            experiences and ensure our content meets the highest academic standards.
          </p>
        </motion.div>

        {/* Partnership Statistics */}
        <div className="stats-container grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partnershipStats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="partnership-stat glass p-6 rounded-2xl text-center"
            >
              <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-foreground-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Top Universities */}
        <div ref={partnershipRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topUniversities.map((university, index) => (
            <Card key={index} className="university-card glass border-0 shadow-2xl hover:shadow-primary/20 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-4xl mb-4">{university.logo}</div>
                  <Badge variant="outline" className="border-primary text-primary">
                    Rank {university.ranking}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {university.shortName}
                    </h3>
                    <p className="text-sm text-foreground-secondary">
                      {university.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                    <MapPin className="h-4 w-4" />
                    {university.location}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                    <Users className="h-4 w-4" />
                    {university.students} students
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium text-foreground mb-2">
                      Collaboration Area:
                    </p>
                    <p className="text-sm text-foreground-secondary">
                      {university.collaboration}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-foreground">
                      {university.achievement}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Collaboration Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">
            Benefits of Our University Partnerships
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Expert Curriculum",
                description: "Content reviewed and approved by top faculty",
                icon: "📖"
              },
              {
                title: "Industry Alignment",
                description: "Courses aligned with current industry needs",
                icon: "🔄"
              },
              {
                title: "Research Access",
                description: "Access to latest research and developments",
                icon: "🔬"
              },
              {
                title: "Career Guidance",
                description: "Direct placement opportunities and mentorship",
                icon: "🎯"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass p-6 rounded-2xl text-center"
              >
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h4 className="text-lg font-bold text-foreground mb-2">
                  {benefit.title}
                </h4>
                <p className="text-sm text-foreground-secondary">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};