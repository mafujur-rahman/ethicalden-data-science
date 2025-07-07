'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Data Analytics",
    description: "Uncover hidden patterns and insights from your business data",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-[#09e5e5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    title: "Predictive Modeling",
    description: "Forecast future trends and behaviors with machine learning",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-[#a8ff57]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "AI & ML Solutions",
    description: "Build intelligent systems that learn and adapt to your needs",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-[#09e5e5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: "Data Visualization",
    description: "Transform complex data into intuitive, actionable dashboards",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-[#a8ff57]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    )
  }
];

export default function WhatWeDo() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    cardsRef.current.forEach((card, i) => {
      tl.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' },
        i * 0.12
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 px-6 bg-[#111] text-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-14 px-4">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-semibold tracking-tight"
          >
            Our{' '}
            <span className="text-[#09e5e5]">
              Data Science
            </span>{' '}
            Services
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-gray-400 text-lg leading-relaxed">
            We transform your data into actionable insights that drive business growth and innovation.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {services.map((service, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="relative bg-[#222] rounded-xl p-8 border border-[#333] transition
                hover:border-[#09e5e5] hover:bg-[#111] hover:shadow-lg hover:shadow-[#09e5e5]/40
                transform hover:-translate-y-1 hover:scale-[1.02] cursor-default"
            >
              <div className="mb-5 inline-flex items-center justify-center rounded-full p-3 bg-[#111]">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#a8ff57]">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
