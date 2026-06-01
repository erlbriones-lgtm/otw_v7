import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  MapPin, 
  ChevronRight, 
  ChevronLeft,
  Send, 
  Compass, 
  BookOpen, 
  CheckCircle, 
  HelpCircle, 
  Clock, 
  QrCode, 
  Globe, 
  Award, 
  X, 
  RefreshCw,
  Terminal,
  Layers,
  Heart,
  Wifi,
  Battery,
  Signal,
  Phone
} from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Downloadables from "./components/Downloadables";
import HeritageMarquee from "./components/HeritageMarquee";
import TagBeats from "./components/TagBeats";
import HeritageDetailView from "./components/HeritageDetailView";
import AboutContact from "./components/AboutContact";
import PlanVisitModal from "./components/PlanVisitModal";

import { tagbilaranLandmarks, tagbilaranBarangays } from "./data";
import { detailedHeritageList } from "./data/heritageDetails";
import { Landmark, LocalStatusResponse, Barangay } from "./types";

export default function App() {
  // Navigation / Theme Styling Switch State
  const [activeView, setActiveView] = useState<"home" | "heritage" | "tagbeats" | "downloadables" | "about">("home");
  const [selectedDetailedHeritageId, setSelectedDetailedHeritageId] = useState<string | null>(null);
  const [showPlanVisitModal, setShowPlanVisitModal] = useState(false);

  // Core App states
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeLandmark, setActiveLandmark] = useState<Landmark | null>(tagbilaranLandmarks[0]);

  // Digital Tourism Visa Passport State
  const [visitorName, setVisitorName] = useState("");
  const [issuedVisaId, setIssuedVisaId] = useState<string>("");
  const [showVisaSuccess, setShowVisaSuccess] = useState(false);

  // Local temperature sync for dynamic Hero
  const [liveTemp, setLiveTemp] = useState<number>(31);
  const [liveWind, setLiveWind] = useState<string>("Gentle breeze");

  // State for active barangay card choosing game interaction
  const [activeBarangayIdx, setActiveBarangayIdx] = useState<number>(0);

  // Fetch local status metrics silently on load
  useEffect(() => {
    const checkLiveStats = async () => {
      try {
        const res = await fetch("/api/local-status");
        if (res.ok) {
          const data: LocalStatusResponse = await res.json();
          setLiveTemp(data.weather.temperature);
          setLiveWind(data.weather.condition);
        }
      } catch (e) {
        // Fallbacks already in place
      }
    };
    checkLiveStats();
  }, []);

  const categories = ["All", "Heritage"];

  const filteredLandmarks = selectedCategory === "All"
    ? tagbilaranLandmarks
    : tagbilaranLandmarks.filter(item => item.category === selectedCategory);

  const handleNextLandmark = () => {
    if (!activeLandmark || filteredLandmarks.length === 0) return;
    const currentIndex = filteredLandmarks.findIndex(l => l.id === activeLandmark.id);
    const nextIndex = (currentIndex + 1) % filteredLandmarks.length;
    setActiveLandmark(filteredLandmarks[nextIndex]);
  };

  const handlePrevLandmark = () => {
    if (!activeLandmark || filteredLandmarks.length === 0) return;
    const currentIndex = filteredLandmarks.findIndex(l => l.id === activeLandmark.id);
    const prevIndex = (currentIndex - 1 + filteredLandmarks.length) % filteredLandmarks.length;
    setActiveLandmark(filteredLandmarks[prevIndex]);
  };

  // Auto-slide effect for the Heritage Landmarks Slider
  useEffect(() => {
    if (activeView !== "home" || selectedDetailedHeritageId) return;

    const interval = setInterval(() => {
      handleNextLandmark();
    }, 15000); // Transitions every 15 seconds

    return () => clearInterval(interval);
  }, [activeView, selectedDetailedHeritageId, activeLandmark, filteredLandmarks]);

  const handleGenerateVisa = (e: FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim()) return;

    const serial = `TAG-${Math.floor(1000 + Math.random() * 9000)}-${visitorName.slice(0, 3).toUpperCase()}`;
    setIssuedVisaId(serial);
    setShowVisaSuccess(true);
  };

  // Exact vertical timeline events as seen/inspired by heritagetimeline.jpg
  const heritageMilestones = [
    {
      year: "1565",
      title: "Blood Compact Between Datu Sikatuna and Miguel Lopez de Legazpi",
      description: "A monumental event signifying foreign friendship and ancestral peace, establishing a sacred covenant sealed with blood in Bohol Barangay."
    },
    {
      year: "1595",
      title: "Construction of Baclayon Church",
      description: "Initiated by Jesuit missionaries, this limestone construction becomes one of the premier ancestral stone cathedrals in the Philippines."
    },
    {
      year: "1767",
      title: "Cathedral of St. Joseph the Worker Established",
      description: "Built in the civic heart of Tagbilaran, this majestic limestone and wood neoclassical cathedral becomes a fortress of heritage."
    },
    {
      year: "1966",
      title: "Charter Day of Tagbilaran City",
      description: "Presidential recognition as a chartered city, formalizing Tagbilaran as the administrative, cultural, and craft capital of Bohol."
    },
    {
      year: "2023",
      title: "Global Creative City Initiative nomination",
      description: "Nominated directly for Crafts and Folk Arts, showcasing classic terracota clay potteries and ancestral Dampas hand weaving guilds."
    },
    {
      year: "2026",
      title: "Creative Tech Hub Launch",
      description: "Uniting physical artisanry with high performance digital spaces to empower the next wave of local sustainable designers."
    }
  ];

  const getBackgroundStyle = () => {
    if (selectedDetailedHeritageId) {
      // Heritage & Tourism detail view page - glowing festival violet, intense raspberry pink, and hot volcano orange
      return "linear-gradient(135deg, #4A097A 0%, #C21359 45%, #E64A12 100%)";
    }
    switch (activeView) {
      case "home":
        // Beautiful lighter blended green gradient that matches the picture and smoothly transitions from the Hero background
        return "linear-gradient(to bottom, #056608 0px, #147917 100vh, #0c440e 140vh, #022403 100%)";
      case "heritage":
        // Luminous peacock teal into mystical vibrant emerald-jade and forest green
        return "linear-gradient(135deg, #013a30 0%, #036b5c 35%, #099482 70%, #0ea354 100%)";
      case "tagbeats":
        // Saulog festival page - deep royal grape, hot raspberry pink, energetic violet, and sunset orange
        return "linear-gradient(135deg, #440973 0%, #90044b 35%, #ca0e5b 70%, #e64c12 100%)";
      case "downloadables":
        // Electric sapphire blue, vibrant royal blue, deep-sea turquoise, and stunning glowing cyan
        return "linear-gradient(135deg, #081e7d 0%, #0c56b7 40%, #177ce0 75%, #00a4b3 100%)";
      case "about":
        // Beautiful green gradient matching the customized palette
        return "linear-gradient(135deg, #056608 0%, #147917 35%, #33A036 70%, #52C755 100%)";
      default:
        return "linear-gradient(135deg, #19053a 0%, #3e1273 35%, #5e269c 70%, #0d4eb0 100%)";
    }
  };

  const getFooterBackgroundStyle = () => {
    if (selectedDetailedHeritageId) {
      return "#1c0300"; // Deep lava/festival plum
    }
    switch (activeView) {
      case "home":
        return "#022403"; // Deep forest moss green
      case "heritage":
        return "#001410"; // Match deep emerald green
      case "tagbeats":
        return "#120208"; // Match deep Saulog grape
      case "downloadables":
        return "#020a1c"; // Match deep sea navy
      case "about":
        return "#022403"; // Match deep forest moss green
      default:
        return "#090214";
    }
  };

  const getFooterBorderColor = () => {
    if (selectedDetailedHeritageId) {
      return "rgba(230, 74, 18, 0.4)";
    }
    switch (activeView) {
      case "home":
        return "rgba(82, 199, 85, 0.4)";
      case "heritage":
        return "rgba(14, 163, 84, 0.4)";
      case "tagbeats":
        return "rgba(230, 76, 18, 0.4)";
      case "downloadables":
        return "rgba(0, 164, 179, 0.4)";
      case "about":
        return "rgba(82, 199, 85, 0.4)";
      default:
        return "rgba(13, 78, 176, 0.4)";
    }
  };

  return (
    <div 
      className="min-h-screen transition-all duration-500 font-sans overflow-x-hidden relative text-white" 
      style={{ background: getBackgroundStyle() }}
      id="digital-tourism-root"
    >
      
      {/* Background Decorative atmosphere layers calibrated per view */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" id="ambient-layers-luminous">
        {activeView === "home" && !selectedDetailedHeritageId && (
          <>
            <div className="absolute top-[-5%] left-[-10%] w-[650px] h-[650px] rounded-full blur-[140px] animate-float-1" style={{ background: "rgba(20, 121, 23, 0.2)" }} />
            <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[140px] animate-float-2" style={{ background: "rgba(82, 199, 85, 0.22)" }} />
            <div className="absolute top-[40%] left-[20%] w-[500px] h-[500px] rounded-full blur-[130px] animate-float-1" style={{ background: "rgba(36, 141, 39, 0.12)" }} />
          </>
        )}
        {activeView === "heritage" && !selectedDetailedHeritageId && (
          <>
            <div className="absolute top-[-5%] left-[-10%] w-[650px] h-[650px] rounded-full blur-[140px] animate-float-1" style={{ background: "rgba(0, 137, 123, 0.26)" }} />
            <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[140px] animate-float-2" style={{ background: "rgba(46, 125, 50, 0.26)" }} />
            <div className="absolute top-[40%] left-[20%] w-[500px] h-[500px] rounded-full blur-[130px] animate-float-1" style={{ background: "rgba(0, 150, 136, 0.2)" }} />
          </>
        )}
        {activeView === "tagbeats" && !selectedDetailedHeritageId && (
          <>
            <div className="absolute top-[-5%] left-[-10%] w-[650px] h-[650px] rounded-full blur-[140px] animate-float-1" style={{ background: "rgba(186, 104, 200, 0.26)" }} />
            <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[140px] animate-float-2" style={{ background: "rgba(255, 87, 34, 0.22)" }} />
            <div className="absolute top-[40%] left-[20%] w-[500px] h-[500px] rounded-full blur-[130px] animate-float-1" style={{ background: "rgba(233, 30, 99, 0.24)" }} />
          </>
        )}
        {activeView === "downloadables" && !selectedDetailedHeritageId && (
          <>
            <div className="absolute top-[-5%] left-[-10%] w-[650px] h-[650px] rounded-full blur-[140px] animate-float-1" style={{ background: "rgba(21, 101, 192, 0.26)" }} />
            <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[140px] animate-float-2" style={{ background: "rgba(0, 172, 193, 0.26)" }} />
            <div className="absolute top-[40%] left-[20%] w-[500px] h-[500px] rounded-full blur-[130px] animate-float-1" style={{ background: "rgba(13, 71, 161, 0.2)" }} />
          </>
        )}
        {activeView === "about" && !selectedDetailedHeritageId && (
          <>
            <div className="absolute top-[-5%] left-[-10%] w-[650px] h-[650px] rounded-full blur-[140px] animate-float-1" style={{ background: "rgba(20, 121, 23, 0.22)" }} />
            <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[140px] animate-float-2" style={{ background: "rgba(82, 199, 85, 0.2)" }} />
            <div className="absolute top-[40%] left-[20%] w-[500px] h-[500px] rounded-full blur-[130px] animate-float-1" style={{ background: "rgba(51, 160, 54, 0.16)" }} />
          </>
        )}
        {selectedDetailedHeritageId && (
          <>
            <div className="absolute top-[-5%] left-[-10%] w-[650px] h-[650px] rounded-full blur-[140px] animate-float-1" style={{ background: "rgba(123, 31, 162, 0.24)" }} />
            <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[140px] animate-float-2" style={{ background: "rgba(230, 74, 25, 0.22)" }} />
            <div className="absolute top-[40%] left-[20%] w-[500px] h-[500px] rounded-full blur-[130px] animate-float-1" style={{ background: "rgba(194, 24, 91, 0.24)" }} />
          </>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px]" opacity="0.6" />
      </div>

      {/* Dynamic Header Navbar with matching view controls */}
      <Navbar 
        activeView={selectedDetailedHeritageId ? ("" as any) : activeView} 
        setActiveView={(view) => {
          setSelectedDetailedHeritageId(null);
          setActiveView(view);
        }} 
        onPlanVisit={() => {
          setSelectedDetailedHeritageId(null);
          setShowPlanVisitModal(true);
        }}
      />

      {/* Dynamic Main Views container */}
      <AnimatePresence mode="wait">
        {selectedDetailedHeritageId ? (
          <motion.div
            key="heritage-detail-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <HeritageDetailView 
              heritage={detailedHeritageList.find(h => h.id === selectedDetailedHeritageId) || detailedHeritageList[0]}
              onBack={() => {
                setSelectedDetailedHeritageId(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </motion.div>
        ) : activeView === "home" ? (
          <motion.div
            key="home-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Immersive luxurious resort bedroom view from HOME.jpg */}
            <Hero 
              onSwitchToHeritage={() => setActiveView("heritage")}
              onPlanVisit={() => {
                setShowPlanVisitModal(true);
              }}
              weatherDescription={liveWind}
              temperature={liveTemp}
            />

            {/* Light high-end main catalog details */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-20 flex flex-col gap-24" id="home-view-main">
              
              {/* PART 1: THE HERITAGE & TECH INFOGRAPHIC GRID (Bento Layout with Saulog Palette) */}
              <section id="heritage-bento" className="scroll-mt-24 text-left">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6" id="bento-header-wrapper">
                  <div className="max-w-2xl text-left">

                    <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white animate-fade-in">
                      The Heritage &amp; <br />
                      <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FFD54F] via-[#ff5722] to-[#FFD54F] italic pr-4">Tourism Ecosystem</span>
                    </h2>
                    <p className="text-white text-sm sm:text-base leading-relaxed mt-4 font-sans font-medium">
                      Explore the historic legacy of Tagbilaran's most celebrated sacred spaces, ancestral landmarks, and immersive cultural archives below.
                    </p>
                  </div>

                  {/* Tabs */}
                  <div className="flex flex-wrap gap-2" id="category-scroller">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          const matches = cat === "All" ? tagbilaranLandmarks : tagbilaranLandmarks.filter(l => l.category === cat);
                          if (matches.length > 0) setActiveLandmark(matches[0]);
                        }}
                        className={`px-4 py-2.5 rounded-lg text-xs font-mono tracking-wider font-extrabold transition-all hover:cursor-pointer hover:scale-102 ${
                          selectedCategory === cat
                            ? "bg-white text-[#1A0533] border border-white shadow-lg btn-primary-custom"
                            : "bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.3)] hover:border-white/40 text-white badge-tag-custom"
                        }`}
                      >
                        {cat.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Refined Landmark Card Slider Explorer */}
                <div className="max-w-4xl mx-auto w-full relative group px-2" id="bento-grid-panel">
                  {/* Flanking Chevron Navigation Controls (Desktop hover only) */}
                  <div className="hidden md:block">
                    <button
                      onClick={handlePrevLandmark}
                      className="absolute left-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 bg-black/40 hover:bg-white/10 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg backdrop-blur-md z-20"
                      aria-label="Previous Landmark"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNextLandmark}
                      className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 bg-black/40 hover:bg-white/10 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg backdrop-blur-md z-20"
                      aria-label="Next Landmark"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Centered Active Landmark Detail View */}
                  <div id="bento-detail-viewer" className="w-full">
                    <AnimatePresence mode="wait">
                      {activeLandmark && (
                        <motion.div
                          key={activeLandmark.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="w-full rounded-3xl border border-[rgba(255,255,255,0.15)] bg-[rgba(0,0,0,0.35)] backdrop-blur-md overflow-hidden flex flex-col sm:grid sm:grid-cols-12 shadow-2xl text-left text-white glass-panel-custom"
                        >
                          {/* Banner Image left side (or top on mobile) */}
                          <div className="relative h-64 sm:h-auto sm:col-span-6 bg-black/10 overflow-hidden">
                            <img 
                              src={activeLandmark.imageUrl}
                              alt={activeLandmark.title}
                              className="w-full h-full min-h-[300px] object-cover opacity-95 transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/95 via-black/20 to-transparent" />
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-[9px] uppercase font-mono tracking-widest text-[#FFD54F] border border-white/25 flex items-center gap-1.5 font-bold badge-tag-custom">
                                <MapPin className="w-3 text-[#FFD54F]" /> EST: {activeLandmark.yearEstablished}
                              </span>
                            </div>
                          </div>

                          {/* Detail details on the right side */}
                          <div className="p-6 md:p-10 sm:col-span-6 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-center gap-4 mb-3">
                                <span className="text-[#FFD54F] font-mono text-[9px] uppercase tracking-widest font-extrabold block">
                                  {activeLandmark.category.toUpperCase()} • CULTURAL ANCHOR
                                </span>
                                <span className="font-mono text-xs text-white/40">
                                  {filteredLandmarks.findIndex(l => l.id === activeLandmark.id) + 1} / {filteredLandmarks.length}
                                </span>
                              </div>
                              <h3 className="text-white text-2xl sm:text-3.5xl font-display font-black tracking-tight mb-4">
                                {activeLandmark.title}
                              </h3>
                              <p className="text-white/90 text-sm leading-relaxed mb-6 font-medium">
                                {activeLandmark.description}
                              </p>
                              <div className="flex flex-col gap-2 mb-6 border-t border-white/10 pt-4">
                                <div className="flex items-start gap-2 text-xs text-white/70">
                                  <span className="font-mono text-[#FFD54F] shrink-0">HIGHLIGHT:</span>
                                  <span>{activeLandmark.highlight}</span>
                                </div>
                                <div className="flex items-start gap-2 text-xs text-white/70">
                                  <span className="font-mono text-[#FFD54F] shrink-0">LOCATION:</span>
                                  <span>{activeLandmark.location}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <button
                                onClick={() => {
                                  setSelectedDetailedHeritageId(activeLandmark.id);
                                  window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                                className="w-full py-3.5 rounded-xl bg-white hover:bg-white/95 text-[#1A0533] font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 btn-primary-custom"
                              >
                                <Sparkles className="w-4 h-4 text-[#1A0533]" /> View Detailed Page &amp; Photo Exhibits
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Navigation dots & Mobile tactile arrows below the card */}
                  <div className="flex items-center justify-between mt-8 max-w-lg mx-auto">
                    {/* Previous Mobile Arrow */}
                    <button
                      onClick={handlePrevLandmark}
                      className="md:hidden w-10 h-10 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center cursor-pointer active:scale-95 transition-all"
                      aria-label="Previous Landmark"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Pagination Indicator Dots */}
                    <div className="flex flex-wrap justify-center gap-2.5 mx-auto">
                      {filteredLandmarks.map((landmark) => (
                        <button
                          key={landmark.id}
                          onClick={() => setActiveLandmark(landmark)}
                          className={`h-2.5 rounded-full transition-all duration-300 ${
                            activeLandmark?.id === landmark.id 
                              ? "w-8 bg-[#FFD54F]" 
                              : "w-2.5 bg-white/20 hover:bg-white/40"
                          }`}
                          title={landmark.title}
                        />
                      ))}
                    </div>

                    {/* Next Mobile Arrow */}
                    <button
                      onClick={handleNextLandmark}
                      className="md:hidden w-10 h-10 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center cursor-pointer active:scale-95 transition-all"
                      aria-label="Next Landmark"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </section>



            </main>
          </motion.div>
        ) : activeView === "heritage" ? (
          /* HIGH-END INTERACTIVE HISTORIC AND CRAFTS GREEN SLIDER STYLE (inspired by displayher.jpg) */
          <motion.div
            key="heritage-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-16 pb-20 w-full flex flex-col items-center"
          >
            {/* DUAL INFINITE MARQUEE CAROUSEL SHOWCASE */}
            <HeritageMarquee onCardClick={(id) => {
              setSelectedDetailedHeritageId(id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }} />

            {/* HIGH-END INTERACTIVE TIMELINE PLACED DIRECTLY BELOW THE SLIDE DISPLAY */}
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 mt-24" id="chronology-timeline">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block px-3 py-1 bg-[rgba(255,255,255,0.2)] text-[#FFD54F] border border-[rgba(255,255,255,0.3)] rounded-full font-mono text-[10px] uppercase tracking-wider font-extrabold mb-3 badge-tag-custom">
                   HISTORICAL CHRONOLOGY
                </span>
                <h3 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight">
                  Tagbilaran Chronicles Timeline
                </h3>
                <p className="text-white text-xs sm:text-sm mt-3 leading-relaxed font-sans font-medium">
                  Deepen your connection with our long legacy of alliances, resistance, and creative growth by exploring key historical anchor events.
                </p>
              </div>

              {/* Vertical timeline body */}
              <div className="relative w-full text-left" id="timeline-v-body">
                {/* Central Glowing Festive Line */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#ff5722] via-[#FFD54F] to-[#2E7D32] opacity-70" />

                {/* Loop and render timeline modules */}
                <div className="space-y-12">
                  {heritageMilestones.map((milestone, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                      <div 
                        key={milestone.year}
                        className={`relative flex flex-col md:flex-row items-stretch md:items-center justify-between w-full md:w-11/12 mx-auto ${
                          isEven ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        {/* Timeline Dot Indicator */}
                        <div className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-6 md:top-auto w-3.5 h-3.5 rounded-full bg-[#FFD54F] border-2 border-white shadow-md z-10 animate-pulse" />

                        {/* Staggered card container */}
                        <div className="w-full md:w-[45%] text-left pl-10 md:pl-0">
                          <motion.div
                            whileHover={{ scale: 1.01, borderColor: "#FFD54F", boxShadow: "0 12px 28px rgba(255,255,255,0.05)" }}
                            className="relative p-6 sm:p-7 pl-8 sm:pl-9 rounded-2xl bg-[rgba(0,0,0,0.25)] backdrop-blur-md border border-[rgba(255,255,255,0.15)] hover:border-[#FFD54F] transition-all duration-300 shadow-sm overflow-hidden glass-panel-custom"
                          >
                            {/* Pure premium Accent left bar */}
                            <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-[#FFD54F] opacity-80 group-hover:opacity-100 transition-all duration-300" />

                            <span className="font-mono text-xl sm:text-2xl font-bold text-[#FFD54F] block">
                              {milestone.year}
                            </span>
                            <h4 className="font-sans font-black text-white text-base sm:text-lg tracking-tight mt-1.5 leading-snug">
                              {milestone.title}
                            </h4>
                            <p className="text-white text-xs sm:text-sm leading-relaxed mt-2.5 font-medium">
                              {milestone.description}
                            </p>
                            
                            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-end text-[10px] font-mono text-white/50 uppercase tracking-widest">
                              <span className="font-bold text-[#FFD54F]">
                                HISTORIC FACT ➔
                              </span>
                            </div>
                          </motion.div>
                        </div>

                        {/* Ghost spacer to maintain structure */}
                        <div className="hidden md:block w-[45%]" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        ) : activeView === "tagbeats" ? (
          <motion.div
            key="tagbeats-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <TagBeats />
          </motion.div>
        ) : activeView === "downloadables" ? (
          <motion.div
            key="downloadables-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Downloadables />
          </motion.div>
        ) : (
           /* LUXURIOUS ABOUT TAGBILARAN CITY VIEW */
           <motion.div
             key="about-view"
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -15 }}
             transition={{ duration: 0.5, ease: "easeOut" }}
             className="pt-32 pb-24 w-full flex flex-col items-center select-none"
             id="about-view"
           >
             {/* Elegant Top Badge & Hero Title */}
             <div className="max-w-4xl mx-auto text-center px-6 mb-16">
               <span className="inline-block px-3 py-1 bg-[rgba(255,255,255,0.2)] text-[#FFD54F] border border-[rgba(255,255,255,0.3)] rounded-full font-mono text-[10px] uppercase tracking-widest font-extrabold mb-4 badge-tag-custom">
                 THE CAPITAL OF PEACE &amp; FRIENDSHIP
               </span>
               <h1 className="font-display font-black text-white text-4xl sm:text-6xl tracking-tight leading-none mb-6">
                 Tagbilaran <span className="inline-block text-[#FFD54F] italic pr-3 text-accent-yellow em">City</span>
               </h1>
               <p className="text-white text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-medium">
                 Breathe in the living legacy of Bohol's premier creative gateway. From the historic 1565 sandugo covenant to our contemporary global creative nomination, Tagbilaran harmonizes raw heritage with forward-looking sustainable art.
               </p>
             </div>
 
             {/* Quick Stats Grid */}
             <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20" id="about-stats-grid">
               {[
                 { label: "FOUNDED (SANDUGO)", value: "1565", desc: "First treaty of international friendship", icon: Heart },
                 { label: "GLOBAL NOMINATION", value: "Crafts", desc: "Crafts & folk arts candidate network", icon: Award },
                 { label: "DISTRICT COMMUNITIES", value: "15", desc: "Unique barangays forming the city code", icon: MapPin },
                 { label: "CIVIC HEART", value: "Capital", desc: "Administrative & commercial core of Bohol", icon: Globe },
               ].map((stat, sIdx) => {
                 const StatIcon = stat.icon;
                 return (
                   <motion.div
                     key={sIdx}
                     whileHover={{ scale: 1.02 }}
                     className="bg-[rgba(0,0,0,0.25)] border border-[rgba(255,255,255,0.15)] p-6 rounded-2xl shadow-lg backdrop-blur-md text-left group glass-panel-custom"
                   >
                     <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white mb-4 group-hover:bg-white/25 transition-colors">
                       <StatIcon className="w-5 h-5" />
                     </div>
                     <span className="font-mono text-[9px] text-[#FFD54F] uppercase tracking-widest block font-bold">
                       {stat.label}
                     </span>
                     <span className="font-display font-black text-2xl sm:text-3xl text-white block mt-1">
                       {stat.value}
                     </span>
                     <p className="text-xs text-white mt-1.5 leading-relaxed font-sans font-medium">
                       {stat.desc}
                     </p>
                   </motion.div>
                 );
               })}
             </div>
 
             {/* Deep Pillars section */}
             <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-stretch" id="about-pillars">
               
               {/* Left Column Text / Narrative */}
               <div className="lg:col-span-5 flex flex-col justify-center text-left">
                 <span className="font-mono text-xs text-[#FFD54F] tracking-widest font-extrabold uppercase mb-2 block animate-pulse">
                   THE SOUL OF THE PORTAL
                 </span>
                 <h2 className="font-display font-black text-white text-3xl sm:text-4xl tracking-tight leading-tight mb-6">
                   Where Ancient Covenant Meets Digital Future
                 </h2>
                 <div className="space-y-6 text-white text-xs sm:text-sm leading-relaxed font-sans">
                   <p>
                     Tagbilaran is more than just a geographic capital; it is a spiritual anchor. In 1565, the blood compact between chieftain Sikatuna and explorer Legazpi set a permanent tone of peaceful diplomacy and horizontal alliance.
                   </p>
                   <p>
                     Today, that baseline of peace translates directly into standard-setting local safety, warm community-driven commerce, and a flourishing network of artists, potters, and developers. 
                   </p>
                   <p>
                     As a candidate for the <strong className="text-[#FFD54F]">Global Creative Cities Network</strong>, Tagbilaran represents Boholano craftsmanship—nurtured on the hillsides of Manga and inside the hand-weaving studios of Dampas—forged and celebrated for global eyes.
                   </p>
                 </div>
 
                 <div className="mt-8">
                   <button
                     onClick={() => {
                       setActiveView("heritage");
                       window.scrollTo({ top: 0, behavior: "smooth" });
                     }}
                     className="px-6 py-3 bg-white text-[#1A0533] hover:bg-white/95 font-mono text-xs font-bold uppercase rounded-xl transition-all shadow-md cursor-pointer hover:scale-102 btn-primary-custom"
                   >
                     Explore Heritage Collection
                   </button>
                 </div>
               </div>
 
               {/* Right Column Interactive Core Cards Grid */}
               <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6" id="about-pillars-grid">
                 <div className="bg-[rgba(0,0,0,0.25)] border border-[rgba(255,255,255,0.15)] backdrop-blur-md p-8 rounded-3xl flex flex-col justify-between text-left shadow-lg glass-panel-custom">
                   <div>
                     <span className="px-2.5 py-0.5 rounded bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.3)] text-[#FFD54F] font-mono text-[8px] font-bold uppercase tracking-widest badge-tag-custom">
                       PILLAR 01
                     </span>
                     <h4 className="font-sans font-black text-lg text-white mt-4 tracking-tight">
                       Sacred Alliance (Sandugo)
                     </h4>
                     <p className="text-xs text-white mt-3 leading-relaxed font-sans">
                       Commemorates the historic March 1565 treaty of peaceful friendship between native Boholano King Datu Sikatuna and Spanish Admiral Legazpi, cementing Tagbilaran's global legacy of harmonious diplomacy.
                     </p>
                   </div>
                   <button
                     onClick={() => {
                       setActiveView("heritage");
                       window.scrollTo({ top: 0, behavior: "smooth" });
                     }}
                     className="mt-6 px-4 py-2 bg-white text-[#1A0533] rounded-xl text-xs font-mono font-bold transition-all hover:bg-white/95 self-start active:scale-95 cursor-pointer btn-primary-custom"
                   >
                     View Collection ➔
                   </button>
                 </div>
 
                 <div className="bg-[rgba(0,0,0,0.25)] border border-[rgba(255,255,255,0.15)] backdrop-blur-md p-8 rounded-3xl flex flex-col justify-between text-left shadow-lg glass-panel-custom">
                   <div>
                     <span className="px-2.5 py-0.5 rounded bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.3)] text-[#FFD54F] font-mono text-[8px] font-bold uppercase tracking-widest badge-tag-custom">
                       PILLAR 02
                     </span>
                     <h4 className="font-sans font-black text-lg text-white mt-4 tracking-tight">
                       Global Creative Initiative Nominee
                     </h4>
                     <p className="text-xs text-white mt-3 leading-relaxed font-sans">
                       Evolving Boholano heritage crafts for modern eyes. We actively host ancient terracotta pottery workshops in Barangay Manga and Dampas weaving guilds, maintaining a living, thriving folk arts network.
                     </p>
                   </div>
                   <button
                     onClick={() => {
                       setActiveView("heritage");
                       window.scrollTo({ top: 0, behavior: "smooth" });
                     }}
                     className="mt-6 px-4 py-2 bg-white text-[#1A0533] rounded-xl text-xs font-mono font-bold transition-all hover:bg-white/95 self-start active:scale-95 cursor-pointer btn-primary-custom"
                   >
                     View Collection ➔
                   </button>
                 </div>
 
                 <div className="bg-[rgba(0,0,0,0.25)] border border-[rgba(255,255,255,0.15)] backdrop-blur-md p-8 rounded-3xl flex flex-col justify-between text-left shadow-lg glass-panel-custom">
                   <div>
                     <span className="px-2.5 py-0.5 rounded bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.3)] text-[#FFD54F] font-mono text-[8px] font-bold uppercase tracking-widest badge-tag-custom">
                       PILLAR 03
                     </span>
                     <h4 className="font-sans font-black text-lg text-white mt-4 tracking-tight">
                       Bohol's Academic Center
                     </h4>
                     <p className="text-xs text-white mt-3 leading-relaxed font-sans">
                       Home to the province's highest density of prestigious universities and creative research centers. Generating the intellectual capital and high-performance digital talent driving sustainability forward.
                     </p>
                   </div>
                   <button
                     onClick={() => {
                       setActiveView("heritage");
                       window.scrollTo({ top: 0, behavior: "smooth" });
                     }}
                     className="mt-6 px-4 py-2 bg-white text-[#1A0533] rounded-xl text-xs font-mono font-bold transition-all hover:bg-white/95 self-start active:scale-95 cursor-pointer btn-primary-custom"
                   >
                     View Collection ➔
                   </button>
                 </div>
 
                 <div className="bg-[rgba(0,0,0,0.25)] border border-[rgba(255,255,255,0.15)] backdrop-blur-md p-8 rounded-3xl flex flex-col justify-between text-left shadow-lg glass-panel-custom">
                   <div>
                     <span className="px-2.5 py-0.5 rounded bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.3)] text-[#FFD54F] font-mono text-[8px] font-bold uppercase tracking-widest badge-tag-custom">
                       OFFICIAL EMBLEM
                     </span>
                     <h4 className="font-sans font-black text-lg text-white mt-4 tracking-tight">
                       Bohol Seal of Authenticity
                     </h4>
                     <p className="text-xs text-white mt-3 leading-relaxed font-sans">
                       Every architectural limestone element, traditional forged steel bolo, and terracotta banga vessel is certified by local guilds to preserve authentic lineage craftsmanship.
                     </p>
                   </div>
                   <button
                     onClick={() => {
                       setActiveView("heritage");
                       window.scrollTo({ top: 0, behavior: "smooth" });
                     }}
                     className="mt-6 px-4 py-2 bg-white text-[#1A0533] rounded-xl text-xs font-mono font-bold transition-all hover:bg-white/95 self-start active:scale-95 cursor-pointer btn-primary-custom"
                   >
                     View Collection ➔
                   </button>
                 </div>
 
               </div>
 
             </div>
 


                    {/* Elegant Thematic Barangay Directory Showcase with Game Style card selection */}
             <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 mb-20" id="about-districts">
               <div className="text-center max-w-2xl mx-auto mb-10">
                 <span className="inline-block px-3 py-1 bg-[rgba(255,255,255,0.2)] text-[#FFD54F] border border-[rgba(255,255,255,0.3)] rounded-full font-mono text-[10px] uppercase tracking-wider font-extrabold mb-3 badge-tag-custom">
                   BARANGAY DIRECTORY
                 </span>
                 <h3 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight">
                   Explore Tagbilaran's Barangays
                 </h3>
                 <p className="text-white text-xs sm:text-sm mt-3 leading-relaxed font-sans font-medium">
                   We have mapped out the fifteen unique barangays of Tagbilaran City. Browse through each local community to uncover their defining legacy, identity, and story.
                 </p>
               </div>
 
               {/* Game Lobby Selector Board */}
               <div className="text-center relative max-w-4xl mx-auto" id="barangay-game-console">
                 
                 {/* Visual Background Gradients like a gaming dashboard */}
                 <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-[#ff5722]/10 blur-[100px] pointer-events-none" />
                 <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#ffaa00]/10 blur-[100px] pointer-events-none" />
 
                 {/* Main Interactive Deck */}
                 <div className="flex flex-col items-center gap-10 relative z-10 py-6">
                   
                   {/* Fanned Cards Arena */}
                   <div 
                     className="w-full relative h-[360px] sm:h-[400px] md:h-[510px] max-w-3xl mx-auto flex items-center justify-center overflow-visible select-none [--deck-offset:32px] sm:[--deck-offset:65px] md:[--deck-offset:125px] lg:[--deck-offset:160px] [--deck-y-offset:10px] sm:[--deck-y-offset:16px] md:[--deck-y-offset:24px] lg:[--deck-y-offset:30px]" 
                     id="barangay-fan-deck"
                   >
                     
                     {/* Map across all 15 districts but only display/fan the closest ones gracefully */}
                     {tagbilaranBarangays.map((item, idx) => {
                       const N = tagbilaranBarangays.length;
                       let diff = idx - activeBarangayIdx;
                       if (diff > N / 2) diff -= N;
                       if (diff < -N / 2) diff += N;
                       
                       const isVisible = Math.abs(diff) <= 2;
                       const isClickable = isVisible;
                       
                       // Compute custom layout based on dynamic circular distance diff
                       let transformStyle = "";
                       let opacityVal = 0;
                       let zIndexVal = 0;
                       
                       if (diff === 0) {
                         transformStyle = "translateX(0px) translateY(0px) scale(1.08) rotate(0deg)";
                         opacityVal = 1;
                         zIndexVal = 30;
                       } else if (diff === -1) {
                         transformStyle = "translateX(calc(-1 * var(--deck-offset))) translateY(calc(var(--deck-y-offset) * 1)) scale(0.88) rotate(-10deg)";
                         opacityVal = 0.85;
                         zIndexVal = 20;
                       } else if (diff === 1) {
                         transformStyle = "translateX(calc(1 * var(--deck-offset))) translateY(calc(var(--deck-y-offset) * 1)) scale(0.88) rotate(10deg)";
                         opacityVal = 0.85;
                         zIndexVal = 20;
                       } else if (diff === -2) {
                         transformStyle = "translateX(calc(-2 * var(--deck-offset))) translateY(calc(var(--deck-y-offset) * 2)) scale(0.76) rotate(-20deg)";
                         opacityVal = 0.55;
                         zIndexVal = 10;
                       } else if (diff === 2) {
                         transformStyle = "translateX(calc(2 * var(--deck-offset))) translateY(calc(var(--deck-y-offset) * 2)) scale(0.76) rotate(20deg)";
                         opacityVal = 0.55;
                         zIndexVal = 10;
                       } else {
                         transformStyle = "translateX(0px) translateY(0px) scale(0.5) rotate(0deg)";
                         opacityVal = 0;
                         zIndexVal = 0;
                       }
                       
                       // Define Thematic visual helpers for colors, badges, and background placeholders
                       const getTheme = (cat: string) => {
                         switch (cat) {
                           case "Historic":
                             return {
                               primary: "#ff5722",
                               accent: "border-[#ff5722]",
                               accentBg: "bg-[#ff5722]/10 text-[#ff5722]",
                               badge: "🛡️ HISTORIC",
                               svgAccent: "stroke-[#ff5722]/30 fill-[#ff5722]/5"
                             };
                           case "Coastal":
                             return {
                               primary: "#0288d1",
                               accent: "border-[#0288d1]",
                               accentBg: "bg-[#0288d1]/10 text-[#0288d1]",
                               badge: "🌊 COASTAL",
                               svgAccent: "stroke-[#0288d1]/30 fill-[#0288d1]/5"
                             };
                           case "Urban":
                             return {
                               primary: "#7b1fa2",
                               accent: "border-[#7b1fa2]",
                               accentBg: "bg-[#7b1fa2]/10 text-[#7b1fa2]",
                               badge: "🏢 URBAN",
                               svgAccent: "stroke-[#7b1fa2]/30 fill-[#7b1fa2]/5"
                             };
                           case "Inland":
                             return {
                               primary: "#2e7d32",
                               accent: "border-[#2e7d32]",
                               accentBg: "bg-[#2e7d32]/10 text-[#2e7d32]",
                               badge: "🌿 INLAND",
                               svgAccent: "stroke-[#2e7d32]/30 fill-[#2e7d32]/5"
                             };
                           case "Commercial":
                           default:
                             return {
                               primary: "#e65100",
                               accent: "border-[#e65100]",
                               accentBg: "bg-[#e65100]/10 text-[#e65100]",
                               badge: "🛒 COM & RETAIL",
                               svgAccent: "stroke-[#e65100]/30 fill-[#e65100]/5"
                             };
                         }
                       };
 
                       const theme = getTheme(item.category);
                       const initialLetter = item.name.replace("Barangay ", "").charAt(0);
 
                       return (
                         <div
                           key={item.name}
                           onClick={() => {
                             if (isClickable && diff !== 0) {
                               setActiveBarangayIdx(idx);
                             }
                           }}
                           style={{
                             transform: transformStyle,
                             opacity: isVisible ? opacityVal : 0,
                             zIndex: zIndexVal,
                             pointerEvents: isVisible && isClickable ? "auto" : "none"
                           }}
                           className={`absolute w-[215px] md:w-[295px] h-[350px] md:h-[460px] rounded-3xl bg-[rgba(0,0,0,0.25)] p-5 md:p-6 border-[3px] shadow-2xl transition-all duration-500 [transition-timing-function:cubic-bezier(0.25,1,0.28,1)] cursor-pointer group select-none flex flex-col justify-between overflow-hidden backdrop-blur-md glass-panel-custom ${
                             diff === 0 
                               ? "border-[#FFD54F] ring-8 ring-white/10 shadow-[0_30px_70px_rgba(255,255,255,0.15)] animate-shimmer" 
                               : "border-[rgba(255,255,255,0.15)] opacity-70 hover:opacity-100 hover:border-white/30"
                           }`}
                         >
                           {/* Card Double Border Framing Line for Collectible Card Feel */}
                           <div className="absolute inset-1.5 border border-white/10 rounded-[20px] pointer-events-none group-hover:border-white/20 transition-colors" />
 
                           {/* Card Top Information */}
                           <div className="relative z-10 w-full">
                             {/* Barangay Title Name block */}
                             <div className="mt-2 border-l-2 pl-2.5" style={{ borderColor: theme.primary }}>
                               <span className="text-[7.5px] font-mono text-white/60 tracking-[0.25em] font-extrabold uppercase block leading-none mb-1">
                                 BARANGAY
                               </span>
                               <h2 className="font-sans font-black text-xl md:text-3xl text-white tracking-tight leading-none uppercase">
                                 {item.name.replace("Barangay ", "")}
                               </h2>
                             </div>
                           </div>
 
                           {/* Center Giant Watermark Monogram representing ancient heraldry */}
                           <div className="relative flex items-center justify-center my-auto pointer-events-none select-none">
                             <div className="absolute text-[85px] md:text-[120px] font-sans font-black text-white/5 select-none uppercase tracking-tighter group-hover:scale-110 transition-transform duration-500">
                               {initialLetter}
                             </div>
                             
                             {/* Decorative badge around monogram */}
                             <div 
                               className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-dashed flex items-center justify-center opacity-70 group-hover:rotate-45 transition-transform duration-1000"
                               style={{ borderColor: theme.primary }}
                             />
                           </div>
 
                           {/* Footer Info details */}
                           <div className="relative z-10 w-full mt-auto pt-3 border-t border-dashed border-white/10 hidden">
                             <span className="text-[7px] font-mono text-white/60 uppercase tracking-widest font-extrabold block mb-1">
                               LEGENDARY HERITAGE FOCUS
                             </span>
                             <div className="flex items-center gap-1.5 text-[10px] md:text-[12px] font-sans font-bold text-white leading-none">
                               <span>🚀</span>
                               <span className="truncate text-white">{item.heritage}</span>
                             </div>
                           </div>
 
                           {/* OVERLAY CARD DETAILS SHEET (Revealed on hover of focused card) */}
                           {diff === 0 && (
                             <div className="absolute inset-0 bg-stone-900/90 p-5 md:p-6 flex flex-col justify-between transition-all duration-300 z-30 overflow-hidden text-left translate-y-full opacity-0 pointer-events-none group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto">
                               <div className="absolute inset-1.5 border border-white/10 rounded-[20px] pointer-events-none" />
                               <div className="relative z-10 flex-1 flex flex-col justify-between">
                                 <div>
                                   <div className="flex items-center justify-between">
                                     <span className="font-mono text-[8.5px] text-[#FFD54F] font-black tracking-widest uppercase text-accent-yellow">
                                       {item.category} GUILD
                                     </span>
                                     <span className="text-[7.5px] font-mono bg-white/15 text-white px-1.5 py-0.5 rounded">
                                       {item.name}
                                     </span>
                                   </div>
                                   
                                   <div className="mt-4">
                                     <p className="text-[10.5px] md:text-[13px] text-white leading-relaxed font-sans font-semibold">
                                       {item.desc}
                                     </p>
                                   </div>
                                 </div>
                               </div>
                             </div>
                           )}
                           
                         </div>
                       );
                     })}
 
                   </div>
 
                   {/* Manual Choice Controller buttons */}
                   <div className="flex items-center justify-center gap-6 relative z-10 mt-1 sm:mt-3">
                     
                     <button 
                       onClick={() => {
                         setActiveBarangayIdx(prev => prev === 0 ? tagbilaranBarangays.length - 1 : prev - 1);
                       }}
                       className="w-12 h-12 rounded-full border-2 border-white/10 hover:border-[#FFD54F] bg-white/5 hover:bg-[#FFD54F]/15 text-white flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 group"
                       title="Previous Barangay Card"
                     >
                       <span className="text-xl font-bold group-hover:text-[#FFD54F] transition-colors">◀</span>
                     </button>
 
                     <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-white/90">
                       Card Selection <span className="text-[#FFD54F] font-bold">{activeBarangayIdx + 1}</span> of <span className="text-white/60">{tagbilaranBarangays.length}</span>
                     </div>
 
                     <button 
                       onClick={() => {
                         setActiveBarangayIdx(prev => prev === tagbilaranBarangays.length - 1 ? 0 : prev + 1);
                       }}
                       className="w-12 h-12 rounded-full border-2 border-white/10 hover:border-[#FFD54F] bg-white/5 hover:bg-[#FFD54F]/15 text-white flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 group"
                       title="Next Barangay Card"
                     >
                       <span className="text-xl font-bold group-hover:text-[#FFD54F] transition-colors">▶</span>
                     </button>
 
                   </div>
 
                 </div>
 
               </div>
             </div>
             <AboutContact />
           </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER: Light Luxury Resort themed Footer */}
      <footer 
        className="relative z-10 px-6 sm:px-12 pb-16 pt-16 border-t transition-colors duration-500" 
        style={{ 
          backgroundColor: getFooterBackgroundStyle(), 
          borderTopColor: getFooterBorderColor() 
        }} 
        id="homepage-footer"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          {/* Legal Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/60 border-t border-white/10 pt-8 gap-4" id="footer-legal-strip">
            <div className="flex items-center gap-3">
              <Compass className="w-4 h-4 text-[#00f5d4] animate-spin-slow" />
              <span>© {new Date().getFullYear()} TAGBILARAN CITY TOURISM OFFICE • CMO STRATCOM</span>
            </div>
          </div>

        </div>
      </footer>

      <PlanVisitModal isOpen={showPlanVisitModal} onClose={() => setShowPlanVisitModal(false)} />

    </div>
  );
}
