'use client';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const services = [
  {
    title: 'Machine Learning Solutions',
    image: '/ml-solutions.jpg',
  },
  {
    title: 'Data Analytics & Visualization',
    image: '/ml-solutions.jpg',
  },
  {
    title: 'Natural Language Processing',
    image: '/ml-solutions.jpg',
  },
  {
    title: 'Predictive Modeling',
    image: '/ml-solutions.jpg',
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const underlineRef = useRef(null);
  const textRef = useRef(null);
  const imageRefs = useRef([]);
  const splitInstance = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Underline animation
      gsap.fromTo(underlineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        }
      );

      // Text animation
      splitInstance.current = new SplitText(textRef.current, {
        type: "lines,words",
        linesClass: "split-line"
      });

      gsap.from(splitInstance.current.words, {
        opacity: 0,
        y: "0.5em",
        duration: 0.8,
        stagger: 0.02,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });

      // Image animation - reveal hidden 20% at bottom while hiding 20% at top
      imageRefs.current.forEach((imgContainer) => {
        const img = imgContainer.querySelector('img');
        
        // Initial state - show only 80% (hide bottom 20%)
        gsap.set(img, {
          y: '20%', // Push image up to hide bottom 20%
          clipPath: 'inset(0% 0% 20% 0%)' // Clip bottom 20%
        });

        // Scroll animation
        gsap.to(img, {
          y: '0%', // Move to original position
          clipPath: 'inset(20% 0% 0% 0%)', // Now hide top 20% instead
          ease: "none",
          scrollTrigger: {
            trigger: imgContainer,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      if (splitInstance.current) {
        splitInstance.current.revert();
      }
    };
  }, []);

  return (
    <section id='services' ref={sectionRef} className="bg-[#0c0c0c] text-[#e8dcd7] py-20 px-6 md:px-20 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
          <div ref={headingRef} className="mb-8 md:mb-0 relative">
            <h3 className="text-3xl md:text-4xl text-[#a8ff57] font-medium mb-2">Our Services</h3>
            <div 
              ref={underlineRef}
              className="h-[2px] bg-[#09e5e5] mt-4 absolute left-0 bottom-0 origin-left scale-x-0 w-full"
            />
          </div>
          <div className="max-w-xl text-[#ccc] text-lg md:text-xl leading-relaxed">
            <p ref={textRef} className="opacity-100">
              We specialize in cutting-edge data science solutions tailored to your business needs. Our team combines technical expertise with domain knowledge to deliver actionable insights and intelligent systems that drive decision-making and innovation.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-16">
          {services.map((service, index) => (
            <div key={index} className="space-y-3 overflow-hidden">
              <div 
                ref={el => imageRefs.current[index] = el}
                className="h-64 overflow-hidden relative"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover grayscale absolute top-0 left-0"
                  style={{ willChange: 'transform, clip-path' }}
                />
              </div>
              <h4 className="text-lg md:text-xl text-[#09e5e5] leading-relaxed">{service.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}