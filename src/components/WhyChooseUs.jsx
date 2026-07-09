import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PackageCheck, Leaf, Ship, TrendingDown, RefreshCcw, Headphones, Globe, Clock } from 'lucide-react';
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

const WhyChooseUs = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 80%", "start 30%"] // Starts when top hits 80% of viewport, ends at 30%
  });

  const text = "Why Choose Us";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  const features = [
    {
      icon: PackageCheck,
      title: 'Quality Assurance',
      desc: 'Multi-level quality checks before shipment.'
    },
    {
      icon: Leaf,
      title: 'Premium Sourcing',
      desc: 'Direct from farms to ensure freshness.'
    },
    {
      icon: Ship,
      title: 'Global Logistics',
      desc: 'Efficient sea and air freight partnerships.'
    },
    {
      icon: TrendingDown,
      title: 'Competitive Pricing',
      desc: 'Value-driven cost structures.'
    },
    {
      icon: RefreshCcw,
      title: 'Reliable Supply Chain',
      desc: 'Uninterrupted availability of goods.'
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      desc: '24/7 customer service assistance.'
    },
    {
      icon: Globe,
      title: 'International Standards',
      desc: 'Compliant with global import regulations.'
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
      desc: 'Strict adherence to delivery schedules.'
    }
  ];

  const [activeVideo, setActiveVideo] = useState(0);

  const videos = [
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_030107_874273ea-684a-4e90-bb96-8fdfde48d53d.mp4",
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_032424_3c9c2a9d-807b-4482-80e6-dd6d9dfd4545.mp4",
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260627_094019_4214ea73-b963-46a4-8327-61489192de99.mp4"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % videos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const regions = [
    'Middle East',
    'Europe',
    'Asia',
    'North America',
    'Africa',
    'Oceania'
  ];

  const stats = [
    { value: '100+', label: 'Business Partners' },
    { value: '20+', label: 'Product Categories' },
    { value: '100%', label: 'Quality Commitment' },
    { value: 'Global', label: 'Export Network' }
  ];

  const reachText = "Our Global Reach";
  const reachCharacters = reachText.split("");
  const reachCenterIndex = Math.floor(reachCharacters.length / 2);

  return (
    <section id="about" className="w-full relative overflow-hidden py-24 md:py-32 px-6" ref={targetRef}>
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
            className={`w-[115%] h-[115%] max-w-none object-cover object-top absolute left-1/2 -translate-x-1/2 top-0 brightness-[1.3] transition-opacity duration-[1200ms] ease-in-out ${idx === activeVideo ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        {/* Light overlay to ensure text readability */}
        <div className="absolute inset-0 bg-white/85 backdrop-blur-[4px] z-10"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <h2 
            className="text-4xl md:text-5xl font-extrabold text-slate-900 font-outfit uppercase tracking-tight mb-4 flex justify-center"
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
          <p className="text-slate-600 text-lg md:text-xl font-sans max-w-2xl text-center">
            We are the preferred partner for importers worldwide, delivering unmatched value and trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-32">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 bg-[#166534] rounded-[10px] flex items-center justify-center text-white shadow-sm shadow-green-900/20">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 font-sans mb-1.5 leading-tight">{feature.title}</h3>
                  <p className="text-[15px] text-slate-600 font-sans leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Reach Content */}
        <div className="flex flex-col items-center">
          <div className="text-center mb-16 max-w-3xl flex flex-col items-center">
            <h2 
              className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-outfit uppercase tracking-tight mb-6 flex flex-wrap justify-center text-center"
              style={{ perspective: "800px" }}
            >
              {reachCharacters.map((char, index) => (
                <CharacterV1
                  key={index}
                  char={char}
                  index={index}
                  centerIndex={reachCenterIndex}
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
                <div className="text-slate-600 font-medium font-sans">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
