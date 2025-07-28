'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaHospitalAlt,
  FaMoneyBillWave,
  FaShoppingCart,
  FaChartBar,
  FaIndustry,
  FaTruck,
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    name: 'Healthcare',
    description: 'Predictive diagnostics, patient outcome optimization, and resource allocation',
    icon: <FaHospitalAlt className="text-[#09e5e5] text-xl" />,
  },
  {
    name: 'Finance',
    description: 'Fraud detection, risk assessment, algorithmic trading, and customer segmentation',
    icon: <FaMoneyBillWave className="text-[#a8ff57] text-xl" />,
  },
  {
    name: 'E-commerce',
    description: 'Personalized recommendations, demand forecasting, and churn prediction',
    icon: <FaShoppingCart className="text-[#09e5e5] text-xl" />,
  },
  {
    name: 'Marketing',
    description: 'Customer journey analysis, campaign optimization, and sentiment analysis',
    icon: <FaChartBar className="text-[#a8ff57] text-xl" />,
  },
  {
    name: 'Manufacturing',
    description: 'Predictive maintenance, quality control, and supply chain optimization',
    icon: <FaIndustry className="text-[#09e5e5] text-xl" />,
  },
  {
    name: 'Transportation',
    description: 'Route optimization, demand forecasting, and fleet management',
    icon: <FaTruck className="text-[#a8ff57] text-xl" />,
  },
];

export default function UseCases() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef([]);
  const chartRef = useRef(null);

  useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top 80%',
    },
  });

  tl.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 });

  itemsRef.current.forEach((el, i) => {
    tl.fromTo(
      el,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
      i * 0.15
    );
  });

  gsap.fromTo(
    chartRef.current,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: 0.5,
      ease: 'power3.out',
    }
  );

}, []);


  return (
    <section ref={sectionRef} id="usecases" className="py-20 px-6 bg-[#0c0c0c] text-white">
      <div className="max-w-screen-xl mx-auto">
        <div className=" mb-16">
          <div className="flex items-center mb-4">
          <div className="w-2 h-10 bg-[#07c4c4] mr-4"></div>
          <h2 className="text-4xl font-bold leading-snug text-[#a8ff57]">Industry Applications</h2>
        </div>
          <p className="text-gray-400 max-w-2xl  mt-4">
            Our data science solutions drive innovation across diverse sectors
          </p>
        </div>

        <div className="relative max-w-screen-xl mx-auto mb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {industries.map((industry, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="flex items-start gap-6 border-b border-[#09e5e5]/20 pb-6"
            >
              <div className="text-3xl min-w-[2rem]">{industry.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-[#a8ff57]">{industry.name}</h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {industry.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
