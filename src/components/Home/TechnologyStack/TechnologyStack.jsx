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
                        <div key={index} className="scroll-item flex items-center justify-center w-36 h-auto flex-shrink-0">
                            <img src={tech.image} alt="tech" className="h-full object-contain" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Second Scrolling Row (Left to Right) */}
            <div className="w-full overflow-hidden">
                <div ref={rowTwoRef} className="flex gap-10 w-max justify-end">
                    {duplicatedTechs.map((tech, index) => (
                        <div key={index} className="scroll-item flex items-center justify-center w-36 h-auto flex-shrink-0">
                            <img src={tech.image} alt="tech" className="h-full object-contain" />
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
