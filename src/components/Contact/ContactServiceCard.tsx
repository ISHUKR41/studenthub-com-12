import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface ContactServiceCardProps {
  service: {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
    action: string;
    onClick: () => void;
    gradient: string;
    bgColor: string;
    borderColor: string;
    stats?: string;
    responseTime?: string;
  };
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

export const ContactServiceCard: React.FC<ContactServiceCardProps> = ({
  service,
  index,
  isHovered,
  onHover
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10
      }}
      onHoverStart={() => onHover(service.id)}
      onHoverEnd={() => onHover(null)}
      className="h-full"
    >
      <Card className={`
        relative overflow-hidden border-2 transition-all duration-500 h-full
        ${service.borderColor} ${service.bgColor}
        ${isHovered 
          ? 'transform scale-105 shadow-2xl shadow-primary/20 border-primary/50' 
          : 'hover:scale-102 hover:shadow-lg'
        }
        glassmorphism group cursor-pointer
      `}>
        <CardContent className="p-8 h-full flex flex-col">
          {/* Animated Background Gradient */}
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Icon with Animation */}
          <motion.div 
            className={`
              w-20 h-20 rounded-2xl ${service.bgColor} border-2 ${service.borderColor}
              flex items-center justify-center mb-6 relative overflow-hidden
              shadow-lg group-hover:shadow-xl transition-all duration-300
            `}
            animate={isHovered ? { 
              rotateY: 360,
              scale: 1.1
            } : { 
              rotateY: 0,
              scale: 1 
            }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
          >
            <motion.div
              animate={isHovered ? { 
                scale: 1.2,
                rotate: 360 
              } : { 
                scale: 1,
                rotate: 0 
              }}
              transition={{ duration: 0.5 }}
              className="text-primary relative z-10"
            >
              {service.icon}
            </motion.div>
            
            {/* Animated Background Pattern */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
              animate={isHovered ? { 
                rotate: 180,
                scale: 1.2 
              } : { 
                rotate: 0,
                scale: 1 
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Content */}
          <div className="flex-1 space-y-4">
            <motion.h3 
              className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300"
              animate={isHovered ? { x: 10 } : { x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {service.title}
            </motion.h3>
            
            <motion.p 
              className="text-foreground-secondary leading-relaxed"
              animate={isHovered ? { x: 5 } : { x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {service.description}
            </motion.p>

            {/* Features List */}
            <motion.div 
              className="space-y-3"
              animate={isHovered ? { x: 8 } : { x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {service.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1 + idx * 0.1 
                  }}
                >
                  <motion.div
                    animate={isHovered ? { 
                      scale: 1.2,
                      rotate: 360 
                    } : { 
                      scale: 1,
                      rotate: 0 
                    }}
                    transition={{ 
                      duration: 0.5,
                      delay: idx * 0.1 
                    }}
                  >
                    <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                  </motion.div>
                  <span className="text-sm text-foreground-secondary">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats and Response Time */}
            {(service.stats || service.responseTime) && (
              <motion.div 
                className="flex flex-wrap gap-2 pt-4"
                animate={isHovered ? { y: -5 } : { y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {service.stats && (
                  <Badge variant="secondary" className="text-xs">
                    {service.stats}
                  </Badge>
                )}
                {service.responseTime && (
                  <Badge variant="outline" className="text-xs">
                    ⚡ {service.responseTime}
                  </Badge>
                )}
              </motion.div>
            )}
          </div>

          {/* Action Button */}
          <motion.div
            className="mt-6"
            animate={isHovered ? { y: -10 } : { y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={service.onClick}
              className={`
                w-full bg-gradient-to-r ${service.gradient} 
                hover:shadow-xl group/btn relative overflow-hidden
                transition-all duration-300
              `}
              size="lg"
            >
              {/* Button Background Animation */}
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                animate={isHovered ? { x: "100%" } : { x: "-100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>{service.action}</span>
                <motion.div
                  animate={isHovered ? { x: 5 } : { x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </span>
            </Button>
          </motion.div>

          {/* Hover Effect Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            animate={isHovered ? { 
              background: [
                "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(16, 185, 129, 0.05))",
                "linear-gradient(45deg, rgba(16, 185, 129, 0.05), rgba(245, 158, 11, 0.05))",
                "linear-gradient(45deg, rgba(245, 158, 11, 0.05), rgba(59, 130, 246, 0.05))"
              ]
            } : {}}
            transition={{ 
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut"
            }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};