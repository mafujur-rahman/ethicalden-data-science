'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

export default function Navbar() {
  const navbarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(navbarRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbarRef.current.classList.add('bg-[#111]', 'shadow-lg');
        navbarRef.current.classList.remove('bg-transparent');
      } else {
        navbarRef.current.classList.remove('bg-[#111]', 'shadow-lg');
        navbarRef.current.classList.add('bg-transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(".dropdown-menu",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav ref={navbarRef} className="fixed w-full z-50 bg-transparent transition-all duration-300 py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#a8ff57' }}></div>
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#09e5e5' }}></div>
          <h1 className="text-xl md:text-2xl font-bold ml-2">
            Data<span style={{ color: '#09e5e5' }}>Insight</span>
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-8">
          {['Services', 'Features', 'About', 'Use Cases', 'Contact'].map((item, idx) => (
            <a
              key={idx}
              href={`#${item.toLowerCase().replace(' ', '')}`}
              className="hover:text-[#a8ff57] transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <button className="bg-[#a8ff57] hover:bg-lime-300 text-[#111] font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>

        {/* Hamburger */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-3xl text-[#09e5e5] focus:outline-none">
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="dropdown-menu lg:hidden bg-[#111] text-white px-6 pt-4 pb-6 space-y-4 shadow-xl rounded-b-xl">
          {['Services', 'Features', 'About', 'Use Cases', 'Contact'].map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase().replace(' ', '')}`}
              onClick={() => setIsOpen(false)}
              className="block text-lg hover:text-[#a8ff57] transition-colors duration-200"
            >
              {item}
            </a>
          ))}
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full bg-[#a8ff57] hover:bg-lime-300 text-[#111] font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}
