import React from 'react';
import { MegaEnhanced3DAboutPage } from './MegaEnhanced3DAboutPage';
import { ParallaxContainer, ParallaxScroll } from '@/components/ui/parallax-scroll';

export const EnhancedAboutPage: React.FC = () => {
  return (
    <ParallaxContainer className="min-h-screen bg-background relative overflow-hidden">
      {/* Mega Enhanced 3D About Page - Complete redesign with all details */}
      <ParallaxScroll speed={0.3} direction="up">
        <MegaEnhanced3DAboutPage />
      </ParallaxScroll>
    </ParallaxContainer>
  );
};