import React from 'react';
import { Header } from '@/components/StudentHub/Header';
import { EnhancedAboutPage } from '@/components/About/EnhancedAboutPage';

const About = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Header Navigation */}
      <Header />
      
      {/* Spacing between header and content */}
      <div className="h-16 sm:h-20 lg:h-24"></div>
      
      {/* Ultra Enhanced About Page with Complete Details */}
      <EnhancedAboutPage />
    </div>
  );
};

export default About;