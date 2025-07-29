import React from 'react';
import { UltraAdvancedAboutPage } from './UltraAdvancedAboutPage';
import { EnhancedMissionVisionSection } from './EnhancedMissionVisionSection';
import { EnhancedJourneyTimelineSection } from './EnhancedJourneyTimelineSection';
import { Enhanced3DAboutScene } from './Enhanced3DAboutScene';
import { ParallaxContainer, ParallaxScroll } from '@/components/ui/parallax-scroll';

export const EnhancedAboutPage: React.FC = () => {
  return (
    <ParallaxContainer className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced 3D Background Scene */}
      <Enhanced3DAboutScene isPlaying={true} />
      
      {/* Ultra Advanced Hero Section with Enhanced Details */}
      <ParallaxScroll speed={0.5} direction="up">
        <UltraAdvancedAboutPage />
      </ParallaxScroll>
      
      {/* Enhanced Mission, Vision & Values Section */}
      <ParallaxScroll speed={0.3} direction="down">
        <EnhancedMissionVisionSection />
      </ParallaxScroll>
      
      {/* Enhanced Journey Timeline Section */}
      <ParallaxScroll speed={0.4} direction="up">
        <EnhancedJourneyTimelineSection />
      </ParallaxScroll>
    </ParallaxContainer>
  );
};