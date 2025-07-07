'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const OverlayAnim = () => {
  const overlayRef = useRef(null);

  useEffect(() => {
    document.body.style.visibility = 'visible';
    
    const overlay = overlayRef.current;

    gsap.set(overlay, {
      '--clip-height': '100%',
      opacity: 1,
      pointerEvents: 'auto'
    });

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" }
    });

    tl.to(overlay, {
      '--clip-height': '0%',
      duration: 1.5,
      onComplete: () => {
        overlay.style.pointerEvents = 'none';
      }
    });

    return () => tl.kill();
  }, []);

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[9999] pointer-events-auto"
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% var(--clip-height), 0 var(--clip-height))',
        background: 'linear-gradient(135deg, #a8ff57, #09e5e5, #111)',
        color: 'white'
      }}
    />
  );
};
