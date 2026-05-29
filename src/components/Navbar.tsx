import { useState, useEffect } from "react";
import { Compass } from "lucide-react";
import { motion } from "motion/react";
const logoUrl = "/webp/TagbilaranLogo.webp";

interface NavbarProps {
  activeView: "home" | "heritage" | "tagbeats" | "downloadables" | "about";
  setActiveView: (view: "home" | "heritage" | "tagbeats" | "downloadables" | "about") => void;
  onPlanVisit?: () => void;
}

export default function Navbar({ activeView, setActiveView, onPlanVisit }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLightStyle = false; // Always dark theme optimized for the premium green layout

  return (
    <motion.header
      id="main-nav-header"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[rgba(0,0,0,0.25)] backdrop-blur-md border-b border-[rgba(255,255,255,0.15)] py-3.5 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative">
        {/* Core Green logo shield from heritagetimeline.jpg - updated with Official Seal */}
        <div 
          onClick={() => {
            setActiveView("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }} 
          className="flex items-center gap-2.5 cursor-pointer group select-none md:absolute md:left-6 lg:left-12"
          id="nav-logo"
        >
          {!logoFailed ? (
            <img 
              src={logoUrl} 
              alt="Tagbilaran Official Seal" 
              onError={() => setLogoFailed(true)}
              className="w-8 h-8 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105" 
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/25 text-[#FFD54F] group-hover:scale-105 transition-transform duration-300 shadow-sm">
              <Compass className="w-4 h-4 animate-[spin_10s_linear_infinite]" />
            </div>
          )}
          <span className="font-jakarta font-extrabold tracking-wide text-sm sm:text-base md:text-lg transition-colors leading-none text-white drop-shadow-md">
            Tagbilaran City
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="flex items-center justify-center gap-5 sm:gap-7 text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] font-jakarta tracking-wide font-extrabold md:mx-auto" id="nav-links">
          <button
            onClick={() => {
              setActiveView("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`transition-colors hover:cursor-pointer pb-1 border-b-2 hover:text-[#FFD54F] ${
              activeView === "home"
                ? "text-[#FFD54F] border-[#FFD54F]"
                : "text-white/80 hover:text-[#FFD54F] border-transparent"
            }`}
            id="link-home"
          >
            HOME
          </button>
          
          <button
            onClick={() => {
              setActiveView("heritage");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`transition-colors hover:cursor-pointer pb-1 border-b-2 hover:text-[#FFD54F] ${
              activeView === "heritage"
                ? "text-[#FFD54F] border-[#FFD54F]"
                : "text-white/80 hover:text-[#FFD54F] border-transparent"
            }`}
            id="link-heritage"
          >
            HERITAGE
          </button>
          
          <button
            onClick={() => {
              setActiveView("tagbeats");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`transition-colors hover:cursor-pointer pb-1 border-b-2 hover:text-[#FFD54F] ${
              activeView === "tagbeats"
                ? "text-[#FFD54F] border-[#FFD54F]"
                : "text-white/80 hover:text-[#FFD54F] border-transparent"
            }`}
            id="link-tagbeats"
          >
            TAGBEATS
          </button>

          <button
            onClick={() => {
              setActiveView("downloadables");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`transition-colors hover:cursor-pointer pb-1 border-b-2 hover:text-[#FFD54F] ${
              activeView === "downloadables"
                ? "text-[#FFD54F] border-[#FFD54F]"
                : "text-white/80 hover:text-[#FFD54F] border-transparent"
            }`}
            id="link-downloadables"
          >
            DOWNLOADABLES
          </button>

          <button
            onClick={() => {
              setActiveView("about");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`transition-colors hover:cursor-pointer pb-1 border-b-2 hover:text-[#FFD54F] ${
              activeView === "about"
                ? "text-[#FFD54F] border-[#FFD54F]"
                : "text-white/80 hover:text-[#FFD54F] border-transparent"
            }`}
            id="link-about"
          >
            ABOUT
          </button>
        </nav>

        {/* Plan Your Visit CTA button on the far right */}
        <button
          onClick={onPlanVisit || (() => {
            setActiveView("tagbeats");
            window.scrollTo({ top: 0, behavior: "smooth" });
          })}
          className="flex items-center justify-center px-4 py-1.5 rounded-xl text-[12px] sm:text-[13px] font-jakarta font-extrabold uppercase tracking-wide text-[#056608] bg-[#FFD54F] hover:bg-[#FFD54F]/90 transition-all active:scale-95 cursor-pointer md:absolute md:right-6 lg:right-12 shadow-lg shadow-[#FFD54F]/10 hover:shadow-[#FFD54F]/20"
          id="nav-btn-plan-visit"
        >
          Plan Your Visit
        </button>
      </div>
    </motion.header>
  );
}
