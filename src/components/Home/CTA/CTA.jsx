'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

export default function CTA() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const buttonRef = useRef(null);
    const particlesRef = useRef([]);
    const hologramRef = useRef(null);
    const pathRef = useRef(null);

    useEffect(() => {
        const titleChars = titleRef.current.querySelectorAll('span');
        gsap.set(titleChars, { opacity: 0, y: 30, rotationX: -90 });

        gsap.to(titleChars, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: 0.05,
            duration: 0.8,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 90%',
            },
        });

        gsap.from(buttonRef.current, {
            opacity: 0,
            y: 30,
            scale: 0.8,
            duration: 1.2,
            ease: 'elastic.out(1, 0.8)',
            scrollTrigger: {
                trigger: buttonRef.current,
                start: 'top 90%',
            },
        });

        const buttonGlow = gsap.to(buttonRef.current, {
            boxShadow: '0 0 25px rgba(168, 255, 87, 0.8)',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });

        const hologramTimeline = gsap.timeline({ repeat: -1 });
        hologramTimeline
            .to(hologramRef.current, {
                backgroundPosition: '100% 100%',
                duration: 15,
                ease: 'none',
            })
            .to(hologramRef.current, {
                backgroundPosition: '0% 0%',
                duration: 15,
                ease: 'none',
            });

        const particles = [];
        for (let i = 0; i < 12; i++) {
            particles.push({
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 4 + 1,
                speed: Math.random() * 0.5 + 0.2,
            });
        }

        gsap.to(particles, {
            duration: 30,
            x: '+=100',
            y: '+=50',
            ease: 'none',
            repeat: -1,
            modifiers: {
                x: x => parseFloat(x) % 100,
                y: y => parseFloat(y) % 100,
            },
            onUpdate: () => {
                particles.forEach((particle, i) => {
                    if (particlesRef.current[i]) {
                        gsap.set(particlesRef.current[i], {
                            x: `${particle.x}%`,
                            y: `${particle.y}%`,
                        });
                    }
                });
            },
        });

        const floatingElements = gsap.utils.toArray('.floating-element');
        floatingElements.forEach((el, i) => {
            const duration = 8 + Math.random() * 4;
            const yoyo = Math.random() > 0.5;

            gsap.to(el, {
                motionPath: {
                    path: pathRef.current,
                    align: pathRef.current,
                    alignOrigin: [0.5, 0.5],
                    start: Math.random(),
                    end: Math.random(),
                },
                duration: duration,
                repeat: -1,
                yoyo: yoyo,
                ease: 'sine.inOut',
            });
        });

        return () => {
            buttonGlow.kill();
            hologramTimeline.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section
            id="contact"
            className="relative py-24 md:py-32 overflow-hidden px-4 bg-[#0c0c0c]"
        >
            <div className="max-w-6xl mx-auto relative z-10">
                <div
                    ref={hologramRef}
                    className="relative border border-[#09e5e5]/30 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 md:p-14 overflow-hidden"
                >
                    <h2
                        ref={titleRef}
                        className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight tracking-wide"
                    >
                        {
                            "Ready to Transform with Data?".split(' ').map((word, wordIndex) => (
                                <span key={wordIndex} className="inline-block whitespace-nowrap mr-2">
                                    {Array.from(word).map((char, charIndex) => (
                                        <span key={charIndex} className="inline-block min-w-0">
                                            {char}
                                        </span>
                                    ))}
                                </span>
                            ))
                        }
                    </h2>



                    <p className="text-[#a8ff57] text-base sm:text-lg md:text-xl mb-8 md:mb-10">
                        Join the next generation of businesses reshaping industries through
                        intelligent decision-making
                    </p>

                    <div className="relative">
                        <button
                            ref={buttonRef}
                            className="relative px-8 sm:px-10 py-4 sm:py-5 bg-[#a8ff57] text-black font-bold text-base sm:text-xl rounded-full overflow-hidden group"
                            style={{
                                boxShadow: '0 0 15px rgba(168, 255, 87, 0.5)',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <span className="relative z-10">Get Started Now</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
