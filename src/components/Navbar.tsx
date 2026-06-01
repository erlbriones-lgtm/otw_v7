import { useState, useEffect } from "react";
import { Compass, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const logoUrl = "/webp/TagbilaranLogo.webp";

interface NavbarProps {
  activeView: "home" | "heritage" | "tagbeats" | "downloadables" | "about";
  setActiveView: (view: "home" | "heritage" | "tagbeats" | "downloadables" | "about") => void;
  onPlanVisit?: () => void;
}

export default function Navbar({ activeView, setActiveView, onPlanVisit }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleNavClick = (view: "home" | "heritage" | "tagbeats" | "downloadables" | "about") => {
    setActiveView(view);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        id="main-nav-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled || isOpen
            ? "bg-[rgba(5,102,8,0.95)] md:bg-[rgba(0,0,0,0.3)] md:backdrop-blur-md border-b border-[rgba(255,255,255,0.15)] py-3 sm:py-3.5 shadow-lg"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between relative w-full h-10">
          {/* Logo Brand Link */}
          <div 
            onClick={() => handleNavClick("home")} 
            className="flex items-center gap-2.5 cursor-pointer group select-none relative z-50"
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
          <nav className="hidden xl:flex items-center justify-center gap-5 xl:gap-6 text-[13px] xl:text-[14px] font-jakarta tracking-wide font-extrabold absolute left-1/2 -translate-x-1/2 whitespace-nowrap" id="nav-links">
            <button
              onClick={() => handleNavClick("home")}
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
              onClick={() => handleNavClick("heritage")}
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
              onClick={() => handleNavClick("tagbeats")}
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
              onClick={() => handleNavClick("downloadables")}
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
              onClick={() => handleNavClick("about")}
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

          {/* Right Action side */}
          <div className="flex items-center gap-3 relative z-50">
            {/* Desktop Plan Your Visit CTA link */}
            <button
              onClick={() => {
                setIsOpen(false);
                if (onPlanVisit) onPlanVisit();
              }}
              className="hidden xl:flex items-center justify-center px-4 py-1.5 rounded-xl text-[12px] sm:text-[13px] font-jakarta font-extrabold uppercase tracking-wide text-[#056608] bg-[#FFD54F] hover:bg-[#FFD54F]/90 transition-all active:scale-95 cursor-pointer shadow-lg shadow-[#FFD54F]/10 hover:shadow-[#FFD54F]/20"
              id="nav-btn-plan-visit"
            >
              Plan Your Visit
            </button>

            {/* Mobile Burger Toggle UI */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex xl:hidden items-center justify-center p-2 rounded-xl text-white hover:text-[#FFD54F] hover:bg-white/10 active:scale-95 transition-all cursor-pointer h-10 w-10 border border-white/10"
              aria-label="Toggle Navigation Menu"
              id="nav-mobile-toggle"
            >
              {isOpen ? <X className="w-6 h-6 animate-pulse" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Floating Animated Mobile Sidebar Overlay for Premium touch experience */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed inset-0 z-40 bg-[rgba(3,44,5,0.98)] backdrop-blur-2xl flex flex-col justify-center px-8 sm:px-16 xl:hidden"
            id="mobile-drawer-overlay"
          >
            {/* Soft decorative background circles matching brand layout */}
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 rounded-full bg-[#FFD54F]/10 blur-[90px] pointer-events-none animate-pulse-slow" />
            <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 rounded-full bg-[#147917]/25 blur-[100px] pointer-events-none animate-pulse-slow" />
            
            <nav className="flex flex-col gap-6 sm:gap-8 text-left relative z-10" id="mobile-nav-links">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#FFD54F] font-extrabold uppercase border-b border-white/10 pb-2">
                City Cultural Guide Portal
              </span>
              {[
                { label: "HOME VIEW PORTAL", id: "home", view: "home" },
                { label: "HERITAGE COLLECTIVE", id: "heritage", view: "heritage" },
                { label: "SAULOG FESTIVAL HYMNS", id: "tagbeats", view: "tagbeats" },
                { label: "RESOURCE DIRECTORY", id: "downloadables", view: "downloadables" },
                { label: "THE CIVIC & EXECUTIVE HEART", id: "about", view: "about" }
              ].map((link, lIdx) => (
                <motion.button
                  key={link.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: lIdx * 0.08 }}
                  onClick={() => handleNavClick(link.view as any)}
                  className={`text-left font-jakarta text-lg sm:text-xl md:text-2xl font-bold tracking-wide uppercase transition-all py-1 cursor-pointer hover:translate-x-2 flex items-center justify-between group ${
                    activeView === link.view ? "text-[#FFD54F]" : "text-white/80"
                  }`}
                >
                  <span>{link.id.toUpperCase()}</span>
                  <div className="text-[9px] font-mono opacity-50 group-hover:opacity-100 transition-opacity tracking-widest text-[#FFD54F] capitalize">
                    {link.label.toLowerCase()} ➔
                  </div>
                </motion.button>
              ))}

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => {
                  setIsOpen(false);
                  if (onPlanVisit) onPlanVisit();
                }}
                className="mt-6 flex items-center justify-center py-3.5 sm:py-4 w-full rounded-2xl text-xs sm:text-sm font-jakarta font-black uppercase tracking-wide text-[#056608] bg-[#FFD54F] hover:bg-[#FFD54F]/90 active:scale-98 cursor-pointer shadow-xl shadow-[#FFD54F]/20"
                id="mobile-nav-btn-plan-visit"
              >
                Plan Your Visit Now
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
