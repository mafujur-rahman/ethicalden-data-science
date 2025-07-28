'use client';
import React from 'react';
import { FaChartLine, FaDatabase, FaRobot } from 'react-icons/fa';
import { MdAnalytics } from 'react-icons/md';

const AboutUs = () => {
  return (
    <section className="relative py-20 px-6 md:px-20 text-white">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/about.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        ></div>
        <div className="absolute inset-0 bg-[#111] bg-opacity-60"></div>
      </div>
      
      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="py-16 flex flex-col md:flex-row justify-between items-start">

          {/* Left Content */}
          <div className="max-w-xl mb-10 md:mb-0">
            <div className="flex items-center mb-4">
              <div className="w-2 h-20 bg-[#07c4c4] mr-4"></div>
              <h2 className="text-4xl font-bold leading-snug text-[#a8ff57]">About Our <br />Data Science Solutions</h2>
            </div>
            <p className="text-gray-200 text-base mb-6">
              We transform raw data into actionable insights. Our team of expert data scientists leverages cutting-edge technologies to solve complex business challenges through advanced analytics and machine learning.
            </p>
            <button className="bg-[#a8ff57] ] text-gray-900 px-6 py-3 font-semibold text-sm tracking-widest transition duration-300 rounded-full">
              EXPLORE OUR WORK
            </button>
          </div>

          {/* Right Content */}
          <div className="text-white">
            <h3 className="text-[#07c4c4] text-xl font-semibold mb-6">Our Expertise</h3>

            {/* Item 1 */}
            <div className="flex items-start mb-6">
              <MdAnalytics className="text-[#09e5e5] text-3xl mr-4 mt-1" />
              <div>
                <h4 className="font-bold text-white">Predictive Analytics</h4>
                <p className="text-gray-200 text-sm">
                  Harness historical data to forecast future trends and behaviors with precision.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start mb-6">
              <FaDatabase className="text-[#09e5e5] text-2xl mr-4 mt-1" />
              <div>
                <h4 className="font-bold text-white">Data Engineering</h4>
                <p className="text-gray-200 text-sm">
                  Build robust data pipelines and infrastructure for seamless data flow.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start">
              <FaRobot className="text-[#09e5e5] text-2xl mr-4 mt-1" />
              <div>
                <h4 className="font-bold text-white">Machine Learning</h4>
                <p className="text-gray-200 text-sm">
                  Develop intelligent systems that learn and improve from experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;