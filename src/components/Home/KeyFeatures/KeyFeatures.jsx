'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiClock,
  FiCpu,
  FiLock,
  FiCloud,
  FiSettings,
  FiSearch,
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Real-time Analysis',
    description: 'Process and analyze streaming data with minimal latency',
    icon: <FiClock size={36} />,
  },
  {
    title: 'Custom ML Solutions',
    description: 'Tailor-made machine learning models for your specific needs',
    icon: <FiCpu size={36} />,
  },
  {
    title: 'Data Security',
    description: 'Enterprise-grade security protocols to protect your data',
    icon: <FiLock size={36} />,
  },
  {
    title: 'Cloud Scalability',
    description: 'Scale your data infrastructure with cloud-based solutions',
    icon: <FiCloud size={36} />,
  },
  {
    title: 'Automated Pipelines',
    description: 'End-to-end automation for data ingestion to deployment',
    icon: <FiSettings size={36} />,
  },
  {
    title: 'Explainable AI',
    description: 'Transparent models with clear decision-making processes',
    icon: <FiSearch size={36} />,
  },
];

export default function KeyFeatures() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    cardsRef.current.forEach((card, i) => {
      tl.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' },
        i * 0.1 + 0.2
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-20 px-6 bg-[#111] text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto  mb-16">
        <div className="flex items-center mb-4">
          <div className="w-2 h-10 bg-[#07c4c4] mr-4"></div>
          <h2 className="text-4xl font-bold leading-snug text-[#a8ff57]">Why Choose Our Solutions</h2>
        </div>
        <p className="text-gray-400 max-w-2xl  text-lg">
          Cutting-edge features designed to maximize your data&apos;s potential
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-[#111]/80 backdrop-blur-md rounded-xl p-6 border border-[#09e5e5]/20
              hover:border-[#a8ff57]/60 hover:shadow-[0_0_15px_#a8ff57] hover:scale-[1.05]
              transition-transform  duration-300 cursor-default flex items-start gap-6"
          >
            <div
              className="text-[#09e5e5] flex-shrink-0 mt-1"
              aria-hidden="true"
            >
              {feature.icon}
            </div>
            <div>
              <h3
                className="text-2xl font-semibold mb-2"
                style={{ color: 'white' }}
              >
                {feature.title}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
