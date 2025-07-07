'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
    FaPython, FaDocker, FaAws, FaDatabase, FaServer, FaCloud, FaChartBar,
    FaSyncAlt
} from 'react-icons/fa';

const technologies = [
    { name: 'Python', icon: <FaPython className="text-[#09e5e5]" /> },
    { name: 'Pandas', icon: <FaDatabase className="text-[#09e5e5]" /> },
    { name: 'NumPy', icon: <FaChartBar className="text-[#09e5e5]" /> },
    { name: 'TensorFlow', icon: <FaServer className="text-[#09e5e5]" /> },
    { name: 'PyTorch', icon: <FaCloud className="text-[#09e5e5]" /> },
    { name: 'Scikit-learn', icon: <FaChartBar className="text-[#09e5e5]" /> },
    { name: 'Power BI', icon: <FaChartBar className="text-[#09e5e5]" /> },
    { name: 'Tableau', icon: <FaChartBar className="text-[#09e5e5]" /> },
    { name: 'Jupyter', icon: <FaDatabase className="text-[#09e5e5]" /> },
    { name: 'AWS', icon: <FaAws className="text-[#09e5e5]" /> },
    { name: 'Azure', icon: <FaCloud className="text-[#09e5e5]" /> },
    { name: 'Docker', icon: <FaDocker className="text-[#09e5e5]" /> },
];

export default function TechnologyStack() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const techRef = useRef([]);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
            },
        });

        tl.fromTo(
            titleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 }
        );

        techRef.current.forEach((tech, i) => {
            tl.fromTo(
                tech,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.5 },
                i * 0.07
            );
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-24 px-6 bg-[#111] text-white overflow-hidden"
        >
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <h2
                        ref={titleRef}
                        className="text-4xl md:text-5xl font-extrabold tracking-wide text-white"
                    >
                        Our <span className="text-[#09e5e5]">Technology</span> Stack
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mt-4">
                        Empowering innovation with futuristic tools and frameworks
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {technologies.map((tech, index) => (
                        <div
                            key={index}
                            ref={(el) => (techRef.current[index] = el)}
                            className="bg-[#1a1a1a] rounded-2xl p-6 text-center border border-[#09e5e5]/10 hover:shadow-[0_0_25px_#09e5e5] transition-all transform hover:-translate-y-2"
                        >
                            <div className="flex justify-center items-center text-5xl mb-4">
                                {tech.icon}
                            </div>
                            <div className="font-semibold text-[#a8ff57] tracking-wide">
                                {tech.name}
                            </div>
                        </div>

                    ))}
                </div>

                <div className="mt-24 bg-gradient-to-r from-[#09e5e5]/10 to-[#a8ff57]/10 rounded-2xl p-10 border border-[#09e5e5]/20 backdrop-blur-md shadow-inner">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-2/3">
                            <h3 className="text-3xl font-bold mb-4 text-[#a8ff57]">
                                End-to-End Data Science Pipeline
                            </h3>
                            <p className="text-gray-300 mb-8">
                                Our futuristic pipeline handles every step — from data ingestion
                                to AI-driven insights and deployment.
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
                                        <div className="w-8 h-8 rounded-full bg-[#09e5e5] text-black font-bold flex items-center justify-center md:mr-3 ">
                                            {i + 1}
                                        </div>
                                        <span>{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="md:w-1/3">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#09e5e5] to-[#a8ff57] opacity-30 blur-2xl"></div>
                                <div className="relative bg-[#111]/90 backdrop-blur-sm rounded-2xl p-8 border border-[#a8ff57]/30 shadow-lg">
                                    <div className="flex flex-col items-center text-center">
                                        <FaSyncAlt className="text-[#09e5e5] text-7xl mb-4 animate-spin-slow" />
                                        <div className="text-xl font-bold text-[#a8ff57]">
                                            Continuous Improvement
                                        </div>
                                        <p className="text-gray-400 mt-2 max-w-xs">
                                            Evolving models for future-proof scalability
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
