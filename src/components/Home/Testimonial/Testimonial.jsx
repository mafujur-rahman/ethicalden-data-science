'use client';
import { FaStar } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Chief Data Officer at HealthAnalytics",
    content: [
      "The predictive modeling solution developed by Joseph's team revolutionized our patient readmission forecasting. Their ensemble approach combining XGBoost with neural networks achieved 94% accuracy.",
      "The automated feature engineering pipeline they implemented reduced our data preparation time by 65%, and their clear documentation made the transition seamless for our team."
    ],
    color: "#a8ff57",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Mark Johnson",
    role: "Director of AI at FinTech Global",
    content: [
      "Their NLP-powered sentiment analysis system for our customer feedback increased our prediction accuracy by 40% compared to our previous solution.",
      "The real-time dashboard they built using D3.js helped our team identify emerging market trends weeks before our competitors."
    ],
    color: "#07c4c4",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Head of Data Science at RetailAI",
    content: [
      "The recommendation engine they developed boosted our cross-sell revenue by 28% in the first quarter. Their knowledge of graph databases for customer journey mapping was exceptional.",
      "The A/B testing framework they implemented helped us optimize our algorithms continuously with statistical rigor."
    ],
    color: "#a8ff57",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: 4,
    name: "David Kim",
    role: "CTO at AutoVision",
    content: [
      "Their computer vision team delivered a state-of-the-art object detection model that outperformed our in-house models by 15% mAP on our validation set.",
      "The model compression techniques they applied reduced our inference time by 70% without significant accuracy loss, enabling real-time processing on edge devices."
    ],
    color: "#07c4c4",
    image: "https://randomuser.me/api/portraits/men/75.jpg"
  },
  {
    id: 5,
    name: "Elena Rodriguez",
    role: "VP of Analytics at ClimateTrack",
    content: [
      "Their time-series forecasting models for renewable energy production achieved 92% accuracy even during volatile weather conditions.",
      "The anomaly detection system they built identified equipment failures 3 days earlier than our previous threshold-based system, saving us millions in maintenance costs."
    ],
    color: "#a8ff57",
    image: "https://randomuser.me/api/portraits/women/63.jpg"
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Head of BI at LogisticsCorp",
    content: [
      "Their route optimization algorithms reduced our fuel costs by 18% while maintaining delivery timelines. The genetic algorithm approach was particularly effective for our complex constraints.",
      "The live ETA prediction system they built using streaming data improved our customer satisfaction scores by 22 percentage points."
    ],
    color: "#07c4c4",
    image: "https://randomuser.me/api/portraits/men/81.jpg"
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const testimonialRefs = useRef([]);
  const arrowRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize animations
  useEffect(() => {
    gsap.from(containerRef.current, {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: "power3.out"
    });

    // Arrow animation
    gsap.to(arrowRef.current, {
      duration: 0.6,
      x: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const nextIndex = (currentIndex + 1) % testimonials.length;
    animateTransition(nextIndex);
  };

  const animateTransition = (newIndex) => {
    const currentCard = testimonialRefs.current[currentIndex];
    const nextCard = testimonialRefs.current[newIndex];

    // Position next card to the right and above current card
    gsap.set(nextCard, { 
      x: '100%', 
      opacity: 0, 
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 10
    });

    // Animate in next card over current card
    gsap.to(nextCard, {
      duration: 0.5,
      x: '0%',
      opacity: 1,
      ease: "power2.out",
      onComplete: () => {
        // Now fade out the current card
        gsap.to(currentCard, {
          duration: 0.3,
          opacity: 0,
          ease: "power1.out",
          onComplete: () => {
            // Reset states
            gsap.set(currentCard, { 
              opacity: 1,
              display: 'none',
              zIndex: 0 
            });
            gsap.set(nextCard, { 
              position: 'relative', 
              zIndex: 0 
            });
            setCurrentIndex(newIndex);
            setIsAnimating(false);
          }
        });
      }
    });
  };

  return (
    <section id='contact' className="min-h-screen bg-[#0c0c0c] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between">
        {/* Testimonial Section - Left Side */}
        <div ref={containerRef} className="w-full lg:w-[48%] text-center lg:text-left">
          <h2 className="text-4xl  text-[#a8ff57] mb-2">Client Testimonials</h2>
          <p className="text-white text-sm mb-10">
            How our data science solutions have driven measurable business impact
          </p>

          <div className="relative h-[350px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                ref={el => testimonialRefs.current[index] = el}
                className={`w-full bg-white rounded-xl shadow-lg px-6 py-8 md:px-10 md:py-10 flex flex-col items-start gap-4 text-left ${index === currentIndex ? 'block relative' : 'hidden'}`}
                style={{ borderTop: `4px solid ${testimonial.color}` }}
              >
                <div className="absolute -left-6 -top-4 w-16 md:w-24 h-16 md:h-24 rounded-full border-4 border-white overflow-hidden shadow-md bg-gray-200">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="pl-10">
                  <h4 className="text-gray-900 font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>

                <div className="absolute top-6 right-6 flex space-x-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={16} />
                  ))}
                </div>

                {testimonial.content.map((paragraph, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Slider Indicators & Arrow */}
          <div className="flex items-center justify-center lg:justify-start space-x-4 relative mt-8">
            <div className="flex space-x-2">
              {testimonials.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-[#07c4c4] w-4' : 'bg-gray-300'}`}
                ></div>
              ))}
            </div>
            <button 
              ref={arrowRef}
              onClick={handleNext}
              className="absolute right-0 lg:relative lg:right-auto lg:ml-4 text-black py-3 px-5 rounded-full shadow-md hover:scale-105 transition-all duration-300 disabled:opacity-50"
              style={{ backgroundColor: testimonials[currentIndex].color }}
              disabled={isAnimating}
            >
              →
            </button>
          </div>
        </div>

        {/* Contact Section - Right Side */}
        <div className="w-full lg:w-[48%] flex flex-col items-center lg:items-end justify-center text-white mt-10 lg:mt-0">
          <div className="w-full max-w-md">
            <h2 className="text-4xl text-[#a8ff57] mb-2 text-center lg:text-left">Get In Touch</h2>
            <p className="text-sm mb-8 text-center lg:text-left">
              Interested in how our data science solutions can transform your business? Reach out to discuss your project.
            </p>

            <form className="w-full space-y-6 border border-gray-700 rounded-xl p-8 bg-[#0c0c0c]">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a8ff57] transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a8ff57] transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a8ff57] transition-all"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#07c4c4] text-black font-medium py-3 px-6 rounded-full hover:bg-[#a8ff57] transition-all duration-300 flex items-center justify-center"
              >
                Send Message
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}