'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FaSyncAlt } from 'react-icons/fa';

const technologies = [
    { image: '/Python.png' },
    { image: '/pandas.png' },
    { image: '/numpy.png' },
    { image: '/TensorFlow.png' },
    { image: '/pytorch.png' },
    { image: '/Scikit_learn.png' },
    { image: '/Power-BI.png' },
    { image: '/Tableau.png' },
    { image: '/jupyter.png' },
    { image: '/aws.png' },
    { image: '/azure.png' },
    { image: '/docker.webp' },
];

export default function TechnologyStack() {
    const rowOneRef = useRef(null);
    const rowTwoRef = useRef(null);

    useEffect(() => {
        const animateRow = (row, direction = 1) => {
            const boxes = row.querySelectorAll('.scroll-item');
            const totalWidth = Array.from(boxes).reduce((acc, box) => acc + box.offsetWidth + 40, 0); 

            gsap.set(row, { x: 0 });

            gsap.to(row, {
                x: direction * -totalWidth / 2,
                duration: 30,
                ease: 'none',
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize((x) => {
                        let val = parseFloat(x);
                        const limit = totalWidth / 2;
                        if (direction === 1) {
                            // first row (right to left)
                            return val % (-limit);
                        } else {
                            // second row (left to right)
                            return ((val + limit) % limit) - limit;
                        }
                    }),
                },
            });
        };

        animateRow(rowOneRef.current, 1);
        animateRow(rowTwoRef.current, -1);
    }, []);

    const duplicatedTechs = [...technologies, ...technologies];

    return (
        <section className="py-32 bg-[#111] overflow-hidden text-white">
            {/* Title */}
            <div className="text-center mb-16 px-4">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-white">
                    Our <span className="text-[#09e5e5]">Technology</span> Stack
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto mt-4">
                    Empowering innovation with futuristic tools and frameworks
                </p>
            </div>

            {/* First Scrolling Row (Right to Left) */}
            <div className="w-full overflow-hidden mb-12">
                <div ref={rowOneRef} className="flex gap-10 w-max">
                    {duplicatedTechs.map((tech, index) => (
                        <div key={index} className="scroll-item flex items-center justify-center w-48 h-32 flex-shrink-0">
                            <img src={tech.image} alt="tech" className="h-full object-contain" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Second Scrolling Row (Left to Right) */}
            <div className="w-full overflow-hidden">
                <div ref={rowTwoRef} className="flex gap-10 w-max justify-end">
                    {duplicatedTechs.map((tech, index) => (
                        <div key={index} className="scroll-item flex items-center justify-center w-48 h-32 flex-shrink-0">
                            <img src={tech.image} alt="tech" className="h-full object-contain" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Section - Centered and Not Full Width */}
            <div className="mt-24 bg-gradient-to-r from-[#09e5e5]/10 to-[#a8ff57]/10 rounded-2xl p-10 border border-[#09e5e5]/20 backdrop-blur-md shadow-inner max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="md:w-2/3">
                        <h3 className="text-3xl font-bold mb-4 text-[#a8ff57]">
                            End-to-End Data Science Pipeline
                        </h3>
                        <p className="text-gray-300 mb-8">
                            Our futuristic pipeline handles every step — from data ingestion to AI-driven
                            insights and deployment.
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm text-white">
                            {[
                                'Data Acquisition',
                                'Data Cleaning',
                                'Feature Engineering',
                                'Model Training',
                                'Evaluation',
                                'Deployment',
                            ].map((step, i) => (
                                <div className="md:flex md:items-center" key={i}>
                                    <div className="w-8 h-8 rounded-full bg-[#09e5e5] text-black font-bold flex items-center justify-center md:mr-3">
                                        {i + 1}
                                    </div>
                                    <span>{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="md:w-1/3">
                        <div className="relative ">
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#09e5e5] to-[#a8ff57] opacity-30 blur-2xl "></div>
                            <div className="relative bg-[#111]/90 backdrop-blur-sm rounded-2xl p-8 border border-[#a8ff57]/30 shadow-lg">
                                <div className="flex flex-col items-center text-center">
                                    <FaSyncAlt
                                        className="w-16 h-16 mb-4 animate-spin-slow text-[#09e5e5]"
                                    />
                                    <div className="text-xl font-bold text-[#a8ff57]">Continuous Improvement</div>
                                    <p className="text-gray-400 mt-2 max-w-xs">
                                        Evolving models for future-proof scalability
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
