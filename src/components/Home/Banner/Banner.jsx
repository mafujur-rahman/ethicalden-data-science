'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Banner() {
  const heroRef = useRef(null);
  const svgRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const mousePos = useRef({ x: 0, y: 0 });

  const titleRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      mousePos.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
    }
  }, []);

  useEffect(() => {
    if (windowSize.width === 0 || windowSize.height === 0) return;

    const initialNodes = [];
    for (let i = 0; i < 25; i++) {
      initialNodes.push({
        id: i,
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        rBase: 2 + Math.random() * 2,
        r: 2 + Math.random() * 2,
        pulseDirection: Math.random() > 0.5 ? 1 : -1,
        pulseSpeed: 0.005 + Math.random() * 0.01,
      });
    }
    setNodes(initialNodes);
  }, [windowSize]);

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      setNodes(oldNodes => {
        const width = windowSize.width;
        const height = windowSize.height;

        const newNodes = oldNodes.map(node => {
          let { x, y, vx, vy, rBase, r, pulseDirection, pulseSpeed, id } = node;

          x += vx;
          y += vy;

          if (x < rBase || x > width - rBase) vx = -vx;
          if (y < rBase || y > height - rBase) vy = -vy;

          let newR = r + pulseDirection * pulseSpeed;
          if (newR > rBase * 1.2) pulseDirection = -1;
          if (newR < rBase * 0.8) pulseDirection = 1;

          return { id, x, y, vx, vy, rBase, r: newR, pulseDirection, pulseSpeed };
        });

        return newNodes;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [windowSize]);

  useEffect(() => {
    gsap.fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power4.out' });
    gsap.fromTo(subtextRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power4.out' });
    gsap.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.7, ease: 'power4.out' });
  }, []);

  useEffect(() => {
    const handleMouseMove = e => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const maxDistance = 160;
  const centerX = windowSize.width / 2;
  const centerY = windowSize.height / 2;

  const lines = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const nodeA = nodes[i];
      const nodeB = nodes[j];

      const offsetAx = (mousePos.current.x - centerX) * 0.02;
      const offsetAy = (mousePos.current.y - centerY) * 0.02;
      const offsetBx = (mousePos.current.x - centerX) * 0.02;
      const offsetBy = (mousePos.current.y - centerY) * 0.02;

      const dx = (nodeA.x + offsetAx) - (nodeB.x + offsetBx);
      const dy = (nodeA.y + offsetAy) - (nodeB.y + offsetBy);
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDistance) {
        const pulse = 0.45 + 0.25 * Math.sin(Date.now() / 1000 + i + j);
        const opacity = pulse * (1 - dist / maxDistance);
        lines.push({
          x1: nodeA.x + offsetAx,
          y1: nodeA.y + offsetAy,
          x2: nodeB.x + offsetBx,
          y2: nodeB.y + offsetBy,
          key: `${nodeA.id}-${nodeB.id}`,
          opacity,
        });
      }
    }
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 text-white pt-20 bg-[#0c0c0c]"
    >
      {/* SVG network background */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          zIndex: 0,
          willChange: 'transform',
          shapeRendering: 'geometricPrecision',
        }}
      >
        {lines.map(({ x1, y1, x2, y2, key, opacity }) => (
          <line
            key={key}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#09e5e5"
            strokeWidth={0.9}
            strokeOpacity={opacity}
            style={{ transition: 'stroke-opacity 0.2s ease-out' }}
          />
        ))}

        {nodes.map(({ id, x, y, r }) => {
          const offsetX = (mousePos.current.x - centerX) * 0.02;
          const offsetY = (mousePos.current.y - centerY) * 0.02;
          return (
            <circle
              key={id}
              cx={x + offsetX}
              cy={y + offsetY}
              r={r}
              fill="#09e5e5"
              fillOpacity={0.9}
              filter="drop-shadow(0 0 6px #09e5e5)"
            />
          );
        })}
      </svg>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight "
        >
          <span className="text-[#a8ff57]">Empowering</span> Intelligence <br />
          with <span className="text-[#09e5e5]">Data-Driven Decisions</span>
        </h1>

        <p
          ref={subtextRef}
          className="mt-6 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Experience a smarter future through AI-powered analytics and real-time insights — reimagined with precision.
        </p>

        <div
          ref={ctaRef}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="relative px-8 py-3 bg-[#a8ff57] text-[#111] font-bold rounded-full hover:scale-105 transition-all duration-300 ">
            Get Started
          </button>
          <button className="relative px-8 py-3 border-2 border-[#09e5e5] text-[#09e5e5] rounded-full hover:bg-[#09e5e5]/10 transition-all duration-300 ">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
