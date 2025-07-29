import React, { useRef, useEffect } from 'react';
import { useTransform, useScroll, motion, useMotionValue } from 'framer-motion';

interface ParallaxScrollProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = ''
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' 
      ? [0, -200 * speed] 
      : direction === 'down' 
      ? [0, 200 * speed]
      : [0, 0]
  );

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'left' 
      ? [0, -200 * speed] 
      : direction === 'right' 
      ? [0, 200 * speed]
      : [0, 0]
  );

  return (
    <motion.div
      ref={elementRef}
      style={{ 
        y: direction === 'up' || direction === 'down' ? y : 0,
        x: direction === 'left' || direction === 'right' ? x : 0 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  className = '',
  style
}) => {
  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={{ position: 'relative', ...style }}
    >
      {children}
    </div>
  );
};