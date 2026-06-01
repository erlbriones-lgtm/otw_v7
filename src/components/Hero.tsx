import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, Flame, Sparkles, MapPin, Compass } from "lucide-react";

const slide1 = "/webp/Poblacion%201,%20Tagbilaran%20City%20(1).webp";
const slide2 = "/webp/Taloto%20to%20Manga%20Coastline%20(1).webp";
const slide3 = "/webp/Poblacion%201,%20Tagbilaran%20City%20(2).webp";
const slide4 = "/webp/Taloto%20to%20Manga%20Coastline%20(6).webp";
const slide5 = "/webp/Old%20House%20in%20Poblacion%201%20(3).webp";

interface HeroProps {
  onSwitchToHeritage: () => void;
  onPlanVisit?: () => void;
  weatherDescription?: string;
  temperature?: number;
}

const SLIDE_IMAGES = [
  slide1,
  slide2,
  slide3,
  slide4,
  slide5
];

export default function Hero({ onSwitchToHeritage, onPlanVisit, weatherDescription, temperature }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % SLIDE_IMAGES.length);
    }, 5000); // Transitions sequentially every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="gateway-hero"
      className="relative min-h-screen flex items-center justify-start overflow-hidden bg-transparent px-8 sm:px-16 md:px-24 pt-24 pb-16"
    >
      {/* Immersive background slideshow displaying images slowly and sequentially */}
      <div 
        id="hero-background-media" 
        className="absolute inset-0 z-0 select-none overflow-hidden bg-[#056608]"
      >
        {/* Subtle dark overlay for readability as requested */}
        <div className="absolute inset-0 bg-black/15 z-20" />

        {/* Top and Bottom soft fading gradients matching parent theme */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#056608]/20 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#147917]/90 via-[#147917]/30 to-transparent z-20 pointer-events-none" />
        
        {/* Preloaded and cross-faded slides utilizing transition-opacity for max reliability */}
        {SLIDE_IMAGES.map((imgUrl, idx) => (
          <img 
            key={imgUrl}
            src={imgUrl}
            alt="Bohol Heritage Scene"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            style={{ 
              opacity: idx === currentImageIndex ? 0.95 : 0,
              transform: idx === currentImageIndex ? "scale(1.02)" : "scale(1.05)",
              zIndex: idx === currentImageIndex ? 10 : 0,
              transition: "opacity 1500ms ease-in-out, transform 1500ms ease-in-out"
            }}
          />
        ))}

        {/* Floating warm green and golden sunbeam layers */}
        <div className="absolute top-1/4 right-[20%] w-96 h-96 rounded-full bg-white/5 blur-[130px] mix-blend-screen" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-white/5 blur-[120px] mix-blend-screen" />
      </div>

      {/* Main Left-Aligned Content Box */}
      <div className="relative z-10 max-w-3xl text-left" id="hero-main-content">
        
        {/* Immersive small tag indicator */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 mb-4"
          id="hero-peace-badge"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#FFD54F] font-extrabold block">
            CITY OF PEACE AND FRIENDSHIP
          </span>
        </motion.div>

        {/* Large custom styled Tagbilaran title (where heritage meets tomorrow) */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.1] mb-6 block"
          id="hero-main-headline"
        >
          <span style={{ textShadow: "0px 2px 8px rgba(0,0,0,0.7)" }}>Tagbilaran: </span>
          <span className="text-white" style={{ textShadow: "0px 2px 8px rgba(0,0,0,0.7)" }}>Where</span>
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FFD54F] via-[#ff5722] to-[#FFD54F] italic mt-1 pb-1 pr-4">
            Heritage Meets
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFD54F] via-[#ff5722] to-[#FFD54F] mt-1 pr-1 font-extrabold">
            Tomorrow
          </span>
        </motion.h1>

        {/* Dynamic Glassmorphism Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:grid sm:grid-cols-3 lg:flex lg:flex-row items-stretch sm:items-center gap-2 p-2 sm:p-1.5 rounded-2xl bg-black/25 backdrop-blur-md border border-white/10 shadow-xl mt-4 w-full sm:max-w-2xl lg:max-w-none lg:w-auto"
          id="hero-glassmorphism-actions"
        >
          <button
            onClick={onSwitchToHeritage}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-1.5 rounded-xl text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#056608] bg-white hover:bg-white/95 transition-all active:scale-95 cursor-pointer shadow-md btn-primary-custom w-full lg:w-auto text-center whitespace-nowrap"
            id="hero-btn-explore"
          >
            <Compass className="w-3 h-3 text-[#056608]" />
            <span>Explore the City</span>
          </button>
          
          <button
            onClick={onSwitchToHeritage}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 sm:py-1.5 rounded-xl text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#FFD54F] bg-transparent hover:bg-white/15 border border-[#FFD54F] transition-all active:scale-95 cursor-pointer btn-secondary-custom w-full lg:w-auto text-center whitespace-nowrap"
            id="hero-btn-heritage"
          >
            <Sparkles className="w-3 h-3 text-[#FFD54F]" />
            <span>Discover our Heritage</span>
          </button>

          <button
            onClick={onPlanVisit}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 sm:py-1.5 rounded-xl text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#FFD54F] bg-transparent hover:bg-white/15 border border-[#FFD54F] transition-all active:scale-95 cursor-pointer btn-secondary-custom w-full lg:w-auto text-center whitespace-nowrap"
            id="hero-btn-music"
          >
            <Flame className="w-3 h-3 text-[#FFD54F]" />
            <span>City of Music</span>
          </button>
        </motion.div>
      </div>

      {/* Bounce scroll trigger indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 right-8 sm:right-16 md:right-24 z-10 flex flex-col items-end gap-1.5 opacity-50 cursor-pointer hover:opacity-100 transition-opacity"
        onClick={onSwitchToHeritage}
        id="hero-scroll-trigger"
      >
        <span className="font-mono text-[13px] uppercase tracking-widest text-white/90 font-bold">
          Scroll to discover
        </span>
        <ArrowDown className="w-5.5 h-5.5 text-[#FFD54F]" />
      </motion.div>
    </section>
  );
}
