import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const CharacterV1 = ({ char, index, centerIndex, scrollYProgress }) => {
  const isSpace = char === ' ';
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [distanceFromCenter * 40, 0]
  );
  
  const rotateX = useTransform(
    scrollYProgress,
    [0, 1],
    [distanceFromCenter * 30, 0]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0.2, 1],
    [0, 1]
  );

  return (
    <motion.span
      className={cn("inline-block", isSpace && "w-3 md:w-5")}
      style={{
        x,
        rotateX,
        opacity,
      }}
    >
      {char}
    </motion.span>
  );
};

const GlobalReach = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 80%", "start 30%"]
  });

  const text = "Our Global Reach";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  const regions = [
    'Middle East',
    'Europe',
    'Asia',
    'North America',
    'Africa',
    'Oceania'
  ];

  const stats = [
    {
      value: '100+',
      label: 'Business Partners'
    },
    {
      value: '20+',
      label: 'Product Categories'
    },
    {
      value: '100%',
      label: 'Quality Commitment'
    },
    {
      value: 'Global',
      label: 'Export Network'
    }
  ];

  const videos = [
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_030107_874273ea-684a-4e90-bb96-8fdfde48d53d.mp4",
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_032424_3c9c2a9d-807b-4482-80e6-dd6d9dfd4545.mp4",
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260627_094019_4214ea73-b963-46a4-8327-61489192de99.mp4"
  ];
  
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % videos.length);
    }, 6000); // Crossfade every 6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full relative overflow-hidden py-24 md:py-32 px-6" ref={targetRef}>
      {/* 3-Video Crossfade Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {videos.map((vid, idx) => (
          <video
            key={idx}
            src={vid}
            autoPlay
            loop
            muted
            playsInline
            className={`w-[115%] h-[115%] max-w-none object-cover object-top absolute left-1/2 -translate-x-1/2 top-0 transition-opacity duration-[1200ms] ease-in-out ${idx === activeVideo ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        {/* Light overlay to ensure text readability against the videos */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[4px] z-10"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl flex flex-col items-center">
          <h2 
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-outfit uppercase tracking-tight mb-6 flex flex-wrap justify-center text-center"
            style={{ perspective: "800px" }}
          >
            {characters.map((char, index) => (
              <CharacterV1
                key={index}
                char={char}
                index={index}
                centerIndex={centerIndex}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </h2>
          <p className="text-slate-600 text-lg md:text-xl font-sans leading-relaxed">
            Serving international buyers with dependable export solutions and efficient global logistics.
          </p>
        </div>

        {/* Regions Row */}
        <div className="flex flex-wrap justify-center gap-4 mb-24 w-full">
          {regions.map((region, idx) => (
            <div 
              key={idx}
              className="px-6 md:px-10 py-4 bg-white/40 backdrop-blur-md border border-white/60 rounded-xl shadow-sm text-slate-800 font-bold font-sans text-center min-w-[120px] md:min-w-[140px] hover:bg-white/60 transition-colors cursor-default"
            >
              {region}
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-100 hover:-translate-y-1 transition-transform cursor-default"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-[#166534] font-outfit mb-3">
                {stat.value}
              </div>
              <div className="text-slate-500 font-medium font-sans">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalReach;
