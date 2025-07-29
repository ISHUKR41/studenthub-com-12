import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Ultra-smooth scroll with enhanced performance
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3), // Ultra-smooth cubic easing
      smoothWheel: true,
      wheelMultiplier: 0.8, // Reduced for ultra-smooth scrolling
      touchMultiplier: 1.0,
      infinite: false,
      lerp: 0.08, // Ultra-smooth interpolation
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    });

    lenisRef.current = lenis;

    // Optimize RAF for better performance
    function raf(time: number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
        requestAnimationFrame(raf);
      }
    }

    requestAnimationFrame(raf);

    // Handle resize
    const handleResize = () => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return lenisRef.current;
};