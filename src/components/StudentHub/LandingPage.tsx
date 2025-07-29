import React, { useEffect, useRef } from 'react';
import { Header } from './Header';
import { Enhanced3DHeroSection } from '@/components/Enhanced3DHeroSection';
import { ParallaxContainer, ParallaxScroll } from '@/components/ui/parallax-scroll';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { LiveExamNotifications } from './LiveExamNotifications';
import { QuestionBankShowcase } from './QuestionBankShowcase';
import { StatsCounter } from './StatsCounter';
import { EnhancedEducationShowcase } from './EnhancedEducationShowcase';
import { AIPersonalizationShowcase } from './AIPersonalizationShowcase';
import { InteractiveStatsSection } from './InteractiveStatsSection';
import { FeaturesGrid } from './FeaturesGrid';
import { StudyToolsShowcase } from './StudyToolsShowcase';
import { NewsSection } from './NewsSection';
import { CategoryCarousel } from './CategoryCarousel';
import { UniversityPartnerships } from './UniversityPartnerships';
import { GlobalCommunitySection } from './GlobalCommunitySection';
import { FutureTechSection } from './FutureTechSection';
import { HowItWorks } from './HowItWorks';
import { MobileAppSection } from './MobileAppSection';
import { TrendingDownloads } from './TrendingDownloads';
import { AchievementsSection } from './AchievementsSection';
import { TestimonialsCarousel } from './TestimonialsCarousel';
import { PricingSection } from './PricingSection';
import { FAQSection } from './FAQSection';
import { FooterSection } from './FooterSection';

export const LandingPage: React.FC = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <ParallaxContainer className="min-h-screen bg-background relative overflow-hidden">
      {/* Header */}
      <Header />
      
      {/* Spacing between header and content */}
      <div className="h-16 sm:h-20 lg:h-24"></div>
      
      {/* Enhanced 3D Hero Section - Optimized for Performance */}
      <Enhanced3DHeroSection />
      
      {/* Critical sections with optimized parallax */}
      <ParallaxScroll speed={0.2} direction="down">
        <LiveExamNotifications />
      </ParallaxScroll>
      
      <ParallaxScroll speed={0.3} direction="up">
        <QuestionBankShowcase />
      </ParallaxScroll>
      
      <StatsCounter />
      
      {/* Enhanced Education Showcase with optimized performance */}
      <EnhancedEducationShowcase />
      
      <ParallaxScroll speed={0.2} direction="down">
        <AIPersonalizationShowcase />
      </ParallaxScroll>

      <InteractiveStatsSection />

      <FeaturesGrid />

      <StudyToolsShowcase />
      
      <ParallaxScroll speed={0.3} direction="up">
        <NewsSection />
      </ParallaxScroll>
      
      <CategoryCarousel />

      <ParallaxScroll speed={0.2} direction="down">
        <UniversityPartnerships />
      </ParallaxScroll>
      
      <GlobalCommunitySection />
      
      <FutureTechSection />
      
      <HowItWorks />

      <MobileAppSection />
      
      <TrendingDownloads />

      <AchievementsSection />
      
      <TestimonialsCarousel />
      
      <PricingSection />
      
      <FAQSection />
      
      <FooterSection />
    </ParallaxContainer>
  );
};