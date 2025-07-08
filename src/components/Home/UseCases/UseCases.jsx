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

  const circle = chartRef.current.querySelector('#progressCircle');
  const percentageText = chartRef.current.querySelector('#percentageText');

  // Animate circular progress
  gsap.fromTo(
    circle,
    { strokeDashoffset: 471 },
    {
      strokeDashoffset: 471 - (471 * 92) / 100,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: chartRef.current,
        start: 'top 80%',
      },
    }
  );

  // Animate number count (using timeline to avoid error)
  const countObj = { val: 0 };
  const countTl = gsap.timeline({
    scrollTrigger: {
      trigger: chartRef.current,
      start: 'top 80%',
    },
  });

  countTl.to(countObj, {
    val: 92,
    duration: 2,
    ease: 'power2.out',
    onUpdate: () => {
      percentageText.textContent = `${Math.round(countObj.val)}%`;
    },
  });
}, []);


  return (
    <section ref={sectionRef} id="usecases" className="py-20 px-6 bg-[#0c0c0c] text-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl font-bold">
            Industry <span className="text-[#a8ff57]">Applications</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            Our data science solutions drive innovation across diverse sectors
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto mb-24 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
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

        <div
          ref={chartRef}
          className="relative max-w-6xl mx-auto bg-[#0c0c0c] border border-[#09e5e5]/30 p-10 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <div className="relative w-full flex justify-center items-center">
            <svg width="220" height="220" viewBox="0 0 220 220">
              <circle
                cx="110"
                cy="110"
                r="100"
                stroke="#09e5e5"
                strokeWidth="2"
                fill="none"
              />
              <circle
                id="progressCircle"
                cx="110"
                cy="110"
                r="75"
                stroke="#a8ff57"
                strokeWidth="8"
                fill="none"
                strokeDasharray="471"
                strokeDashoffset="471"
                strokeLinecap="round"
              />
              <text
                id="percentageText"
                x="110"
                y="115"
                fill="#09e5e5"
                fontSize="28"
                fontWeight="bold"
                textAnchor="middle"
              >
                0%
              </text>
            </svg>
          </div>

          <div>
            <h4 className="text-2xl font-bold text-[#a8ff57] mb-6">Retail Sales Prediction</h4>
            <div className="space-y-4">
              <div>
                <h5 className="text-lg font-semibold text-[#09e5e5]">Challenge</h5>
                <p className="text-gray-300">
                  A national retail chain needed to optimize inventory across 200+ stores,
                  reducing waste while maintaining high product availability.
                </p>
              </div>
              <div>
                <h5 className="text-lg font-semibold text-[#09e5e5]">Solution</h5>
                <p className="text-gray-300">
                  We developed a machine learning model that predicted sales with 92% accuracy by
                  analyzing historical data, seasonality, promotions, and local events.
                </p>
              </div>
              <div>
                <h5 className="text-lg font-semibold text-[#09e5e5]">Results</h5>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>23% reduction in overstock inventory</li>
                  <li>15% increase in sales of perishable goods</li>
                  <li>$4.2M annual savings in inventory costs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
