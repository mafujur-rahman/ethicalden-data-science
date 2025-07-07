'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef([]);

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
    )
      .fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.6'
      );

    statsRef.current.forEach((stat, i) => {
      tl.fromTo(
        stat,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' },
        `-=${0.3 - i * 0.05}`
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 px-6 bg-[#0c0c0c] text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Text Content */}
          <div className="lg:w-1/2">
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight"
            >
              Transforming Data into{' '}
              <span className="text-[#09e5e5] ">
                Business Value
              </span>
            </h2>

            <div ref={contentRef} className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                At DataInsight, we believe that data is the most valuable asset in the modern business landscape. Our mission is to empower organizations with actionable insights derived from their data.
              </p>

              <p>
                Founded in 2018 by a team of data scientists and engineers from leading tech companies, we've grown to become a trusted partner for businesses across multiple industries.
              </p>

              <p>
                Our approach combines cutting-edge machine learning techniques with deep domain expertise to deliver solutions that drive real business impact.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
                {[
                  { value: '150+', label: 'Projects' },
                  { value: '40+', label: 'Clients' },
                  { value: '25+', label: 'Team Members' },
                  { value: '98%', label: 'Client Retention' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    ref={(el) => (statsRef.current[i] = el)}
                    className="text-center"
                  >
                    <div className="text-4xl md:text-5xl font-bold text-[#a8ff57] ">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 mt-1 text-lg">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Visual Box */}
          <div className="lg:w-1/2 relative flex justify-center">
            <div
              className="relative w-72 h-72 rounded-xl border-2 border-[#09e5e5]/30 bg-[#111]"
              style={{ boxShadow: '0 0 20px 3px rgba(10,230,230,0.15)' }}
            >
              {/* Concentric Rings */}
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className="absolute rounded-full border"
                  style={{
                    borderColor: idx % 2 === 0 ? '#09e5e5' : '#a8ff57',
                    opacity: 0.15 + idx * 0.1,
                    top: 8 * idx,
                    left: 8 * idx,
                    right: 8 * idx,
                    bottom: 8 * idx,
                    animation: `ping 3s ease-in-out ${idx}s infinite`,
                    borderWidth: '2px',
                  }}
                />
              ))}

              {/* Center Circle */}
              <div
                className="absolute top-1/2 left-1/2 rounded-full flex items-center justify-center"
                style={{
                  width: 120,
                  height: 120,
                  backgroundColor: 'rgba(10,230,230,0.1)',
                  backdropFilter: 'blur(6px)',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 12px 3px #09e5e5',
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    backgroundColor: 'rgba(168,255,87,0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 10px 2px #a8ff57',
                  }}
                >
                  <span className="text-[#09e5e5] text-3xl font-extrabold select-none">
                    DS
                  </span>
                </div>
              </div>

              {/* Floating Dots */}
              <div
                className="absolute rounded-full bg-[#a8ff57] opacity-20"
                style={{
                  width: 16,
                  height: 16,
                  top: '25%',
                  left: '25%',
                  filter: 'blur(1.5px)',
                  animation: 'float 4s ease-in-out infinite',
                }}
              />
              <div
                className="absolute rounded-full bg-[#09e5e5] opacity-20"
                style={{
                  width: 12,
                  height: 12,
                  top: '35%',
                  right: '25%',
                  filter: 'blur(1.5px)',
                  animation: 'float 3.5s ease-in-out 0.5s infinite',
                }}
              />
              <div
                className="absolute rounded-full bg-[#09e5e5]"
                style={{
                  width: 20,
                  height: 20,
                  bottom: '25%',
                  left: '33%',
                  opacity: 0.15,
                  filter: 'blur(2px)',
                  animation: 'float 4.5s ease-in-out 1s infinite',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe animations in JSX */}
      <style>{`
        @keyframes ping {
          0%, 100% {
            transform: scale(1);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.3;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
}
