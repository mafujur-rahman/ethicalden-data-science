'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const topics = [
  {
    title: 'AI Adoption',
    text: 'Enterprises leveraging AI show a 30% boost in efficiency.',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
  },
  {
    title: 'Cloud Growth',
    text: 'Over 90% of businesses have adopted multi-cloud strategies.',
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
  },
  {
    title: 'Data-Driven Decisions',
    text: 'Companies using real-time analytics outperform competitors by 25%.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
];

export default function IndustryInsights() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const linesRef = useRef([]);

  useEffect(() => {
    // Title animation - staggered characters
    const titleChars = titleRef.current.querySelectorAll('span');
    gsap.from(titleChars, {
      opacity: 0,
      y: 30,
      rotationX: -90,
      stagger: 0.05,
      duration: 0.8,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 85%',
      },
    });

    // Card fade and lift on scroll
    cardsRef.current.forEach((card, index) => {
      gsap.set(card, {
        opacity: 0,
        y: 30,
      });

      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
        },
      });

      // Hover zoom and lift animation
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.03,
          y: -10,
          duration: 0.4,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    });

    // Connection lines
    gsap.from(linesRef.current, {
      scaleX: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cardsRef.current[0],
        start: 'top 90%',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 bg-[#0c0c0c] text-white overflow-hidden px-4"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold tracking-tight text-white"
          >
            {Array.from("Industry Insights").map((char, i) => (
              <span key={i} className="inline-block min-w-[10px]">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
          <p className="text-[#a8ff57] text-lg max-w-2xl mx-auto mt-6 tracking-wider">
            Stay ahead with data-backed trends from the frontier of innovation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Decorative connection lines */}
          <div
            ref={el => (linesRef.current[0] = el)}
            className="hidden md:block absolute top-1/4 left-1/3 w-1/3 h-[2px] bg-gradient-to-r from-[#09e5e5] to-[#a8ff57] z-0"
          ></div>
          <div
            ref={el => (linesRef.current[1] = el)}
            className="hidden md:block absolute top-1/4 right-1/3 w-1/3 h-[2px] bg-gradient-to-l from-[#09e5e5] to-[#a8ff57] z-0"
          ></div>

          {topics.map((topic, i) => (
            <div
              key={i}
              ref={el => (cardsRef.current[i] = el)}
              className="insight-card relative border border-[#09e5e5]/30 bg-gradient-to-br from-[#0f1729]/80 to-[#0d1b30]/80 p-8 rounded-2xl backdrop-blur-lg transition-transform transform duration-300 hover:scale-[1.03]"
              style={{ boxShadow: 'none' }}
            >
              {/* Card icon */}
              <div className="relative mb-6">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-[#a8ff57]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={topic.icon}
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#a8ff57] mb-3 tracking-wider">
                {topic.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{topic.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <div className="inline-block overflow-hidden">
            <p className="text-gray-400 text-lg tracking-wider font-light translate-y-full opacity-0">
              Data-driven insights powering tomorrow's innovations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
