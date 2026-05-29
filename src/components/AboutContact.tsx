import { Phone, Globe } from "lucide-react";

export default function AboutContact() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 mt-6 mb-16 text-left" id="about-official-contact">
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-950/40 to-stone-900/50 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
        
        {/* Inner Decorative Accent */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#FFD54F]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/10 mb-8">
          <div>
            <span className="text-[9px] font-mono text-[#FFD54F] tracking-[0.25em] font-extrabold uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              OFFICIAL CITY PORTAL • DIRECTORY
            </span>
            <h3 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight mt-3">
              A Heritage City Awakens
            </h3>
            <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-xl font-medium">
              For official administrative concerns, tourist arrangements, cultural inquiries, and city updates, connect directly with our local executive departments.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end text-left md:text-right">
            <span className="text-[#FFD54F] font-serif text-lg font-black tracking-wider block">
              Behold... BOHOL
            </span>
            <span className="text-[10px] font-mono text-white/50 tracking-widest block uppercase mt-0.5">
              Tagbilaran Cultural Hub
            </span>
          </div>
        </div>

        {/* Contact Details Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Mayor's Office */}
          <div className="bg-black/20 border border-white/5 rounded-2xl p-6 hover:border-[#FFD54F]/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#FFD54F]/10 border border-[#FFD54F]/20 flex items-center justify-center text-[#FFD54F]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans font-extrabold text-sm text-white uppercase tracking-wider">
                  City Mayor's Office
                </h4>
                <span className="text-[9px] font-mono text-white/40 block uppercase">
                  Executive Administration
                </span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs font-mono text-white/80">
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-white/50">BABA HOTLINE</span>
                <span className="text-[#FFD54F] font-bold text-sm">411-2222</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-white/50">OFFICE LINE 01</span>
                <span className="text-white font-bold">(038) 412-3715</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-white/50">OFFICE LINE 02</span>
                <span className="text-white font-bold">(038) 422-8011</span>
              </div>
              <div className="flex items-center justify-between pt-1.5">
                <span className="text-white/50">FAX MACHINE</span>
                <span className="text-white/70">(038) 501-9350</span>
              </div>
            </div>
          </div>

          {/* Card 2: Tourism Office */}
          <div className="bg-black/20 border border-white/5 rounded-2xl p-6 hover:border-[#FFD54F]/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <Globe className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <h4 className="font-sans font-extrabold text-sm text-white uppercase tracking-wider">
                  City Tourism Office
                </h4>
                <span className="text-[9px] font-mono text-white/40 block uppercase">
                  Tourism &amp; Cultural Affairs
                </span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs font-mono text-white/80">
              <div className="flex flex-col gap-2 p-3 bg-white/5 border border-white/10 rounded-xl mb-3">
                <span className="text-[10px] font-mono text-[#00f5d4] uppercase font-bold tracking-wider">For Tours &amp; Information Contact:</span>
                <p className="text-xs font-sans text-white/95 leading-relaxed font-semibold">
                  Reach out to coordinate heritage walks, digital guides, pottery workshops, and city permits.
                </p>
              </div>
              
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-white/50">DIRECT TELEPHONE</span>
                <span className="text-white font-bold text-sm text-[#00f5d4]">(038) 411-2222</span>
              </div>
              <div className="flex items-center justify-between pt-1.5">
                <span className="text-white/50">EXTENSION CODE</span>
                <span className="text-[#00f5d4] font-black uppercase bg-[#00f5d4]/10 px-2 py-0.5 rounded text-[10px]">
                  Local 167
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
