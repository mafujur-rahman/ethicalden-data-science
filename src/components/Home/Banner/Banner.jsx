'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const codeContent = [
  {
    line: "import pandas as pd",
    tokens: [
      { text: "import", type: "keyword" },
      { text: " ", type: "plain" },
      { text: "pandas", type: "module" },
      { text: " as pd", type: "plain" },
    ],
  },
  {
    line: "import matplotlib.pyplot as plt",
    tokens: [
      { text: "import", type: "keyword" },
      { text: " ", type: "plain" },
      { text: "matplotlib.pyplot", type: "module" },
      { text: " as plt", type: "plain" },
    ],
  },
  { line: "", tokens: [] },
  {
    line: "data = pd.read_csv('data.csv')",
    tokens: [
      { text: "data", type: "variable" },
      { text: " = ", type: "plain" },
      { text: "pd.read_csv", type: "function" },
      { text: "('data.csv')", type: "string" },
    ],
  },
  {
    line: "summary = data.describe()",
    tokens: [
      { text: "summary", type: "variable" },
      { text: " = ", type: "plain" },
      { text: "data.describe", type: "function" },
      { text: "()", type: "plain" },
    ],
  },
  { line: "", tokens: [] },
  {
    line: "plt.plot(data['value'])",
    tokens: [
      { text: "plt.plot", type: "function" },
      { text: "(", type: "plain" },
      { text: "data['value']", type: "variable" },
      { text: ")", type: "plain" },
    ],
  },
  {
    line: "plt.show()",
    tokens: [
      { text: "plt.show", type: "function" },
      { text: "()", type: "plain" },
    ],
  },
];

const tokenColors = {
  keyword: '#a8ff57',  // lime green
  module: '#09e5e5',   // cyan
  function: '#09e5e5', // cyan
  variable: '#a8ff57', // lime green
  string: '#09e5e5',   // cyan
  plain: '#a8ff57',    // lime green
};

export default function Banner() {
  const titleRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const cursorRef = useRef(null);

  const [typedLines, setTypedLines] = useState(() =>
    Array(codeContent.length).fill('')
  );

  useEffect(() => {
    // Animate headings
    gsap.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: 'power3.out' }
    );
    gsap.fromTo(
      subtextRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: 'power3.out' }
    );
    gsap.fromTo(
      ctaRef.current,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.9, ease: 'power3.out' }
    );

    // Typing animation for code snippet
    let line = 0;
    let charIndex = 0;

    const typeChar = () => {
      if (line >= codeContent.length) return;

      const fullLine = codeContent[line].line;

      if (charIndex <= fullLine.length) {
        setTypedLines((prev) => {
          const newTyped = [...prev];
          newTyped[line] = fullLine.slice(0, charIndex);
          return newTyped;
        });
        charIndex++;
        setTimeout(typeChar, 40);
      } else {
        line++;
        charIndex = 0;
        setTimeout(typeChar, 180);
      }
    };
    typeChar();

    // Cursor blink animation
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        duration: 0.6,
      });
    }
  }, []);

  return (
    <section
      className="relative min-h-screen px-6 md:px-12 bg-[#0c0c0c] text-[#a8ff57] pt-76"
      aria-label="Data science banner with interactive code snippet"
    >
      <div className='flex flex-col lg:flex-row items-center justify-center gap-14  max-w-7xl mx-auto '>
        {/* Left Content */}
        <div className="max-w-3xl flex-1 text-center lg:text-left">
          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
            style={{ color: '#a8ff57' }}
          >
            <span>Smarter</span> Decisions <br />
            with <span style={{ color: '#09e5e5' }}>Data-Driven Power</span>
          </h1>
          <p
            ref={subtextRef}
            className="mt-6 max-w-lg mx-auto lg:mx-0 text-[#09e5e5] text-lg md:text-xl leading-relaxed"
          >
            Leverage AI-powered analytics, predictive modeling, and real-time dashboards to unlock true intelligence in your business decisions.
          </p>
          <div
            ref={ctaRef}
            className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-5 max-w-sm mx-auto lg:mx-0"
          >
            <button
              className="px-6 py-2 rounded-full bg-[#a8ff57] text-black font-semibold shadow-lg hover:scale-105 transform transition duration-300 focus:outline-none focus:ring-4 focus:ring-[#a8ff57]"
              aria-label="Get Started"
            >
              Get Started
            </button>
            <button
              className="px-6 py-2 rounded-full border-2 border-[#09e5e5] text-[#09e5e5] font-semibold hover:bg-[#09e5e5]/20 transition duration-300 focus:outline-none focus:ring-4 focus:ring-[#09e5e5]"
              aria-label="Explore Features"
            >
              Explore Features
            </button>
          </div>
        </div>

        {/* Right Content: Code snippet */}
        <div
          className="flex-1 rounded-2xl p-7 shadow-xl font-mono text-sm sm:text-base leading-relaxed max-h-[480px] overflow-y-auto scroll-smooth custom-scrollbar"
          role="region"
          aria-label="Data science code snippet"
          tabIndex={0}
          style={{
            background:
              'linear-gradient(135deg, #000000 0%, #0a2434 100%)',
            border: '2px solid #09e5e5',
           
          }}
        >
          <pre className="select-none">
            {typedLines.map((lineText, idx) => (
              <div key={idx} className="flex select-text">
                {/* Line number */}
                <span
                  className="text-[#09e5e5] w-10 text-right pr-4 select-none"
                  aria-hidden="true"
                >
                  {idx + 1}
                </span>
                {/* Syntax highlighted code */}
                <code
                  aria-live="polite"
                  aria-atomic="true"
                  className="whitespace-pre-wrap break-words"
                  style={{ color: '#a8ff57' }}
                >
                  {renderTokens(lineText, codeContent[idx]?.tokens)}
                </code>
                {/* Cursor blinking on last line */}
                {idx === typedLines.length - 1 && (
                  <span
                    ref={cursorRef}
                    className="inline-block ml-1 w-[8px] h-[20px] bg-[#09e5e5] rounded-sm align-bottom shadow-[0_0_12px_#09e5e5]"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </pre>
        </div>

      </div>
      <style jsx>{`
        /* Custom scrollbar for code panel */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #09e5e5;
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: content-box;
          transition: background-color 0.3s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #07b2b2;
        }
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #09e5e5 transparent;
        }
      `}</style>
    </section>
  );
}

// Helper to render syntax-highlighted tokens with partial text
function renderTokens(lineText, tokens = []) {
  if (!tokens || tokens.length === 0) return lineText;

  let remaining = lineText;
  const result = [];

  for (let i = 0; i < tokens.length; i++) {
    const { text, type } = tokens[i];
    if (!remaining) break;

    if (remaining.startsWith(text)) {
      result.push(
        <span
          key={i}
          style={{ color: tokenColors[type] || '#a8ff57' }}
          className="break-words"
        >
          {text}
        </span>
      );
      remaining = remaining.slice(text.length);
    } else {
      // Partial or no match fallback
      result.push(
        <span key={`fallback-${i}`} style={{ color: '#a8ff57' }}>
          {remaining}
        </span>
      );
      remaining = '';
    }
  }

  if (remaining.length > 0) {
    result.push(
      <span key="leftover" style={{ color: '#a8ff57' }}>
        {remaining}
      </span>
    );
  }

  return result;
}
