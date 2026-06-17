import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowDownRight, Fingerprint, Zap, Layers, Activity, Check, Moon, Sun, Image as ImageIcon, MousePointer2, PenTool, Type, Square, DownloadCloud } from 'lucide-react';

import { PROJECTS_DATA } from './data/projects';
import { ProjectContent } from './components/Portfolio/ProjectContent';

const GlobalBackground = ({ isDark }: { isDark: boolean }) => (
  <div className={`fixed inset-0 pointer-events-none -z-50 overflow-hidden transition-colors duration-1000 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAFAFA]'}`}>
    {/* Textura de Ruido (Film Grain) muy elegante */}
    <div 
      className={`absolute inset-0 ${isDark ? 'opacity-[0.06]' : 'opacity-[0.08]'}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}
    />
    
    {/* Grid Lineal de Alta Costura (Más amplio y sutilmente más visible) */}
    <div className={`absolute inset-0 bg-[size:64px_64px] ${isDark ? 'bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] opacity-100' : 'bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] opacity-100'}`} />
    
    {/* Softbox / Luz de Acento Monocromática superior (Estática) */}
    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[60vh] max-w-[1200px] rounded-[100%] blur-[120px] ${isDark ? 'bg-white opacity-[0.04]' : 'bg-neutral-900 opacity-[0.02]'} transform-gpu`} />
  </div>
);

// COMPONENTE: Anatomía con Pestañas Interactivas y Auto-play (Estilo Premium)
// COMPONENTE: Anatomía Faux UI (Editor de Diseño Simulado)
const InteractiveAnatomySection = ({ isDark }: { isDark: boolean }) => {
  const [activePhase, setActivePhase] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.6 }); // Esperar a que el 60% sea visible

  useEffect(() => {
    if (!isAutoPlaying || !isInView) return;

    const timer = window.setInterval(() => {
      setActivePhase((prev) => (prev + 1) % 3);
    }, 4500);

    return () => {
      window.clearInterval(timer);
    };
  }, [isAutoPlaying, isInView]);

  const handleTabClick = (index: number) => {
    setActivePhase(index);
    setIsAutoPlaying(false); // Detener auto-play si el usuario interactúa
  };

  const phasesData = [
    {
      title: "Estructura Base.",
      subtitle: "Fase 01 / Wireframe",
      desc: "Trazamos el esqueleto UX perfecto en nuestro lienzo para maximizar la conversión."
    },
    {
      title: "Identidad Visual.",
      subtitle: "Fase 02 / Inyección",
      desc: "Inyectamos los colores corporativos y tipografía de manera automática y precisa."
    },
    {
      title: "Activo de Venta.",
      subtitle: "Fase 03 / Output",
      desc: "La ficha se renderiza y queda lista para capturar prospectos de alto valor."
    }
  ];

  return (
    <section ref={sectionRef} id="anatomia" className={`relative min-h-screen py-16 lg:py-20 flex items-center border-t transition-colors duration-500 ${isDark ? 'bg-[#0a0a0a]/30 border-white/10' : 'bg-white border-slate-200/50'} overflow-hidden`}>
      <div className="max-w-[1400px] mx-auto px-6 w-full flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LADO IZQUIERDO - Pestañas (Tabs) */}
        <div className="flex flex-col gap-2 w-full lg:col-span-5 xl:col-span-4 lg:order-1 relative z-10 max-w-lg mx-auto lg:mx-0">
          {phasesData.map((phase, idx) => {
            const isActive = activePhase === idx;
            return (
              <button 
                key={idx}
                onClick={() => handleTabClick(idx)}
                className={`text-left group relative p-5 lg:p-6 rounded-2xl transition-all duration-500 outline-none border-l-2 ${isActive ? 'border-[#0055FF] opacity-100' : 'border-transparent opacity-40 hover:opacity-70'}`}
              >
                {/* Fondo deslizante (Card Highlight) */}
                {isActive && (
                  <motion.div 
                    layoutId="activePhaseBackground"
                    className={`absolute inset-0 rounded-2xl ${isDark ? 'bg-[#1a1a1a] border border-white/5' : 'bg-slate-100 border border-slate-200/50'}`}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}

                <div className="relative z-10">
                  <span className={`text-[10px] font-semibold tracking-widest uppercase mb-2 block transition-colors ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>
                    {phase.subtitle}
                  </span>
                  <h3 className={`text-2xl md:text-3xl font-medium tracking-tight transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {phase.title.split(' ')[0]} <span className={`font-serif italic font-light ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>{phase.title.split(' ')[1]}</span>
                  </h3>
                  
                  {/* Descripción (Aparece y desaparece) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: "0.75rem" }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                          {phase.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            );
          })}
        </div>

        {/* LADO DERECHO - El Faux Editor */}
        <div className={`relative w-full lg:col-span-7 xl:col-span-8 h-[450px] lg:h-[520px] lg:order-2 flex flex-col rounded-2xl shadow-2xl overflow-hidden border transition-colors duration-500 ${isDark ? 'border-white/10 bg-[#121212]' : 'border-slate-300/60 bg-white'}`}>
          
          {/* Top Bar (macOS style) */}
          <div className={`h-12 px-4 flex items-center justify-between border-b transition-colors duration-500 ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-slate-100 border-slate-200'}`}>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
            </div>
            <div className={`text-[10px] font-semibold tracking-widest uppercase ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>
              SignalNote_Engine.sn
            </div>
            <div className="w-12"></div> {/* Spacer for centering */}
          </div>

          <div className="flex flex-1 overflow-hidden">
            
            {/* Left Toolbar */}
            <div className={`w-12 lg:w-14 hidden md:flex flex-col items-center py-4 gap-6 border-r transition-colors duration-500 ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-slate-100 border-slate-200'}`}>
              <MousePointer2 className={`w-4 h-4 ${isDark ? 'text-white' : 'text-slate-800'}`} />
              <PenTool className={`w-4 h-4 ${isDark ? 'text-neutral-600 hover:text-white' : 'text-slate-400 hover:text-slate-800'} transition-colors cursor-pointer`} />
              <Type className={`w-4 h-4 ${isDark ? 'text-neutral-600 hover:text-white' : 'text-slate-400 hover:text-slate-800'} transition-colors cursor-pointer`} />
              <Square className={`w-4 h-4 ${isDark ? 'text-neutral-600 hover:text-white' : 'text-slate-400 hover:text-slate-800'} transition-colors cursor-pointer`} />
            </div>

            {/* Canvas Area */}
            <div className={`flex-1 relative flex items-center justify-center overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0f0f0f]' : 'bg-slate-50'}`}>
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at center, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px', color: isDark ? 'white' : 'black' }}></div>
              
              {/* The "Artboard" containing the card */}
              <div className="relative w-full max-w-[300px] sm:max-w-[320px] aspect-[4/5] z-10 shadow-2xl">
                 
                 {/* Selection Box / Anchor points (Phase 1) */}
                 <AnimatePresence>
                   {activePhase === 0 && (
                     <motion.div 
                       initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                       className="absolute -inset-2 border border-[#00FFFF] z-50 pointer-events-none"
                     >
                       <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-[#00FFFF]"></div>
                       <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-[#00FFFF]"></div>
                       <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-[#00FFFF]"></div>
                       <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-[#00FFFF]"></div>
                     </motion.div>
                   )}
                 </AnimatePresence>

                 {/* The Card Content Container */}
                 <div className={`relative w-full h-full rounded-2xl overflow-hidden border transition-colors duration-500 ${isDark ? 'border-white/10 bg-neutral-900' : 'border-slate-200 bg-white'} shadow-2xl`}>
                    
                    {/* FASE 1: WIREFRAME */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activePhase === 0 ? 1 : 0, zIndex: activePhase === 0 ? 10 : 0 }}
                      transition={{ duration: 0.6 }}
                      className={`absolute inset-0 ${isDark ? 'bg-[#0a0a0a]' : 'bg-slate-50'} overflow-hidden`}
                      style={{ pointerEvents: activePhase === 0 ? 'auto' : 'none' }}
                    >
                      {/* Placeholder bg */}
                      <div className="absolute inset-0 m-3 rounded-xl border-2 border-dashed border-neutral-800 flex flex-col items-center justify-center">
                         <ImageIcon className={`w-8 h-8 lg:w-10 lg:h-10 mb-2 text-neutral-700`} />
                         <span className={`text-[10px] uppercase tracking-widest font-mono text-center px-4 text-neutral-600`}>
                           Outline Mode
                         </span>
                      </div>

                      <svg viewBox="0 0 1080 1350" className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="xMidYMid slice">
                        {/* Decorative Lines Outline */}
                        <path fill="none" stroke="#333" strokeWidth="6" strokeDasharray="10,10" d="M376.94,0.17v46a42,42,0,0,1-42,42H-0.06"/>
                        <path fill="none" stroke="#333" strokeWidth="6" strokeDasharray="10,10" d="M71.94,-0.83V282.62a35.55,35.55,0,0,1-35.55,35.55H-0.06"/>
                        {/* Logo Box Outline */}
                        <path fill="none" stroke="#333" strokeWidth="6" strokeDasharray="10,10" d="M758.62,0h321.87v155.08H789.54a30.92,30.92,0,0,1-30.92-30.92V0Z"/>
                        {/* Ribbon Outline */}
                        <path fill="none" stroke="#333" strokeWidth="6" strokeDasharray="10,10" d="M974.55,0h105.79v241.41h-62.05a43.74,43.74,0,0,1-43.74-43.74V0Z"/>
                      </svg>

                      <div className="absolute bottom-6 inset-x-6 z-20 pointer-events-none flex flex-col justify-end">
                        <div className="w-[70%] h-2 border border-dashed border-neutral-700 mb-[10px]"></div>
                        <div className="w-8 h-[2px] bg-neutral-700 mb-5"></div>
                        <div className="flex justify-between w-full mb-8">
                           <div className="w-[30%] h-6 border-2 border-dashed border-neutral-700 rounded-full"></div>
                           <div className="w-[30%] h-6 border-2 border-dashed border-neutral-700 rounded-full"></div>
                        </div>
                        <div className="w-[40%] h-4 border border-dashed border-neutral-700 mx-auto"></div>
                      </div>
                    </motion.div>

                    {/* FASE 2: INYECCIÓN IDENTIDAD */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activePhase === 1 ? 1 : 0, zIndex: activePhase === 1 ? 10 : 0 }}
                      transition={{ duration: 0.6 }}
                      className={`absolute inset-0 ${isDark ? 'bg-[#0f0f0f]' : 'bg-white'} overflow-hidden`}
                      style={{ pointerEvents: activePhase === 1 ? 'auto' : 'none' }}
                    >
                      {/* Placeholder bg */}
                      <div className="absolute inset-0 bg-[#ef007e]/5 border border-[#ef007e]/20 flex flex-col items-center justify-center">
                         <div className="w-20 h-20 bg-[#ef007e]/10 rounded-full blur-2xl absolute"></div>
                         <ImageIcon className={`w-8 h-8 lg:w-10 lg:h-10 mb-2 text-[#ef007e]/40`} />
                         <span className={`text-[10px] uppercase tracking-widest font-mono text-center px-4 text-[#ef007e]/60`}>
                           Awaiting asset
                         </span>
                      </div>

                      <svg viewBox="0 0 1080 1350" className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="xMidYMid slice">
                        {/* Decorative Lines */}
                        <path fill="none" stroke="#ef007e" strokeWidth="6" opacity="0.3" d="M376.94,0.17v46a42,42,0,0,1-42,42H-0.06"/>
                        <path fill="none" stroke="#2fc7ea" strokeWidth="6" d="M71.94,-0.83V282.62a35.55,35.55,0,0,1-35.55,35.55H-0.06" className="drop-shadow-[0_0_10px_rgba(47,199,234,0.3)]" />
                        {/* Logo Box */}
                        <path fill="#ef007e" opacity="0.1" d="M758.62,0h321.87v155.08H789.54a30.92,30.92,0,0,1-30.92-30.92V0Z"/>
                        {/* Ribbon */}
                        <path fill="#2fc7ea" opacity="0.5" d="M974.55,0h105.79v241.41h-62.05a43.74,43.74,0,0,1-43.74-43.74V0Z"/>
                      </svg>

                      <div className="absolute bottom-6 inset-x-6 z-20 pointer-events-none flex flex-col justify-end">
                        <div className="w-[70%] h-2 bg-white/20 rounded-full mb-[10px]"></div>
                        <div className="w-8 h-[2px] bg-[#ef007e] mb-5 shadow-[0_0_10px_rgba(239,0,126,0.5)]"></div>
                        <div className="flex justify-between w-full mb-8">
                           <div className="w-[30%] h-6 bg-[#ef007e]/80 border border-[#ef007e] rounded-full shadow-[0_0_15px_rgba(239,0,126,0.3)]"></div>
                           <div className="w-[30%] h-6 bg-[#ef007e]/80 border border-[#ef007e] rounded-full shadow-[0_0_15px_rgba(239,0,126,0.3)]"></div>
                        </div>
                        <div className="w-[40%] h-4 bg-[#ef007e]/40 rounded-full mx-auto shadow-[0_0_15px_rgba(239,0,126,0.2)]"></div>
                      </div>
                    </motion.div>

                    {/* FASE 3: OUTPUT FINAL (DISEÑO SVG) */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activePhase === 2 ? 1 : 0, zIndex: activePhase === 2 ? 10 : 0 }}
                      transition={{ duration: 0.6 }}
                      className={`absolute inset-0 bg-[#030300] overflow-hidden`}
                      style={{ pointerEvents: activePhase === 2 ? 'auto' : 'none' }}
                    >
                      {/* Background Image */}
                      <img 
                        src="/card-mac/Mesa de trabajo 2Reservas1.png" 
                        alt="Fondo Casa" 
                        className="absolute inset-0 w-full h-full object-cover scale-[1.02] transition-transform duration-1000 ease-out"
                      />
                      
                      {/* Pure SVG Overlay directly from the public file */}
                      <img
                        src="/card-mac/Mesa de trabajo 2reservas.svg"
                        alt="Diseño Original"
                        className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none drop-shadow-xl"
                      />

                      {/* Logo Overlay (Bypass browser SVG image block) */}
                      <div className="absolute top-0 right-0 w-[29.8%] h-[11.48%] z-30 flex items-center justify-center pointer-events-none p-1 sm:p-2">
                        <img src="/card-mac/Mesa de trabajo 2Reservas2.png" className="w-[80%] h-auto object-contain" alt="Logo Reserva" />
                      </div>
                    </motion.div>

                 </div>
              </div>
            </div>

            {/* Right Properties Panel */}
            <div className={`w-48 xl:w-64 hidden lg:flex flex-col border-l transition-colors duration-500 ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-slate-100 border-slate-200'}`}>
               <div className="p-5 flex flex-col gap-6">
                 
                 {/* Dynamic Panel based on Phase */}
                 {activePhase === 0 && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
                       <h5 className={`text-[11px] font-bold tracking-widest uppercase ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Layers</h5>
                       <div className="flex flex-col gap-2">
                         <div className={`h-7 rounded ${isDark ? 'bg-[#00FFFF]/10 border border-[#00FFFF]/20' : 'bg-cyan-100 border border-cyan-300'} flex items-center px-3 gap-2`}>
                           <div className="w-2 h-2 rounded-full bg-[#00FFFF]"></div>
                           <span className={`text-[11px] font-medium ${isDark ? 'text-[#00FFFF]' : 'text-cyan-800'}`}>Image_Bg</span>
                         </div>
                         <div className={`h-7 rounded flex items-center px-3 gap-2`}>
                           <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-neutral-700' : 'bg-slate-300'}`}></div>
                           <span className={`text-[11px] ${isDark ? 'text-neutral-500' : 'text-slate-500'}`}>Badges_Group</span>
                         </div>
                         <div className={`h-7 rounded flex items-center px-3 gap-2`}>
                           <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-neutral-700' : 'bg-slate-300'}`}></div>
                           <span className={`text-[11px] ${isDark ? 'text-neutral-500' : 'text-slate-500'}`}>Text_Nodes</span>
                         </div>
                       </div>
                    </motion.div>
                 )}
                 {activePhase === 1 && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
                       <h5 className={`text-[11px] font-bold tracking-widest uppercase ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Brand Variables</h5>
                       <div className="flex flex-col gap-4">
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded bg-[#ef007e] shadow-lg shadow-[#ef007e]/30 border border-white/20"></div>
                           <div className="flex flex-col">
                             <span className={`text-[11px] font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Primary</span>
                             <span className="text-[10px] text-[#ef007e] font-mono mt-0.5">HEX #EF007E</span>
                           </div>
                         </div>
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded bg-[#2fc7ea] shadow-lg shadow-[#2fc7ea]/30 border border-white/20"></div>
                           <div className="flex flex-col">
                             <span className={`text-[11px] font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Accent</span>
                             <span className="text-[10px] text-[#2fc7ea] font-mono mt-0.5">HEX #2FC7EA</span>
                           </div>
                         </div>
                         <div className={`p-3 rounded-lg border ${isDark ? 'bg-neutral-900 border-white/5' : 'bg-white border-slate-200'}`}>
                           <span className={`text-[10px] block mb-2 ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>Injecting Palette...</span>
                           <div className={`h-1 w-full rounded-full overflow-hidden ${isDark ? 'bg-neutral-800' : 'bg-slate-100'}`}>
                              <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-gradient-to-r from-[#ef007e] to-[#2fc7ea]" />
                           </div>
                         </div>
                       </div>
                    </motion.div>
                 )}
                 {activePhase === 2 && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
                       <h5 className={`text-[11px] font-bold tracking-widest uppercase ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Export Ready</h5>
                       <div className={`w-full p-4 rounded-lg border flex flex-col items-center justify-center gap-2 text-center ${isDark ? 'bg-neutral-900/50 border-[#ef007e]/30' : 'bg-pink-50 border-pink-200'}`}>
                         <DownloadCloud className="w-8 h-8 text-[#ef007e] mb-1" />
                         <span className={`text-[12px] font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Asset Generated</span>
                         <span className={`text-[10px] ${isDark ? 'text-neutral-500' : 'text-slate-500'}`}>2.4 MB • High-Res PNG</span>
                       </div>
                       <button className="w-full py-2.5 mt-2 bg-[#ef007e] text-white text-[11px] font-bold rounded-lg uppercase tracking-wider hover:bg-[#d1006c] transition-colors shadow-lg shadow-[#ef007e]/20">
                         Deploy Asset
                       </button>
                    </motion.div>
                 )}
               </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};


export default function App() {
  const [idx, setIdx] = useState(0); 
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('signalNote_theme');
    return savedTheme === 'dark'; // Si es 'dark', será true. Por defecto false (light).
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Guardar la preferencia cada vez que cambie
  useEffect(() => {
    localStorage.setItem('signalNote_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextProject = () => setIdx((prev) => (prev + 1) % PROJECTS_DATA.length);
  const prevProject = () => setIdx((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-700 ${isDarkMode ? 'bg-[#0a0a0a] text-neutral-200' : 'text-neutral-900'} selection:bg-[#0055FF] selection:text-white`}>
      
      <GlobalBackground isDark={isDarkMode} />

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div 
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#FAFAFA]'}`}
          >
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
               className="flex flex-col items-center transform-gpu"
            >
              <img src="/logo.svg" alt="signalNote Logo" className="w-24 md:w-32 h-auto mb-10" />
              
              <div className={`w-48 h-[2px] ${isDarkMode ? 'bg-white/10' : 'bg-neutral-200'} rounded-full overflow-hidden`}>
                <motion.div 
                  className="h-full w-full bg-gradient-to-r from-[#0055FF] to-[#FF00D4] origin-left transform-gpu"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 2.5, ease: [0.25, 1, 0.5, 1], delay: 0.8 }}
                  style={{ willChange: 'transform' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div key="main-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {/* HEADER NAVBAR & BANNER */}
      <div className="fixed top-0 w-full z-50 flex flex-col">
        {/* TOP BANNER */}
        <div className="bg-[#111111] text-neutral-300 text-center py-2.5 px-4 text-[11px] md:text-xs tracking-wider border-b border-white/10 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0055FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0055FF]"></span>
            </span>
            <span className="font-semibold text-white uppercase tracking-widest text-[10px]">Oferta Fundadora</span>
          </div>
          <span className="hidden md:inline text-neutral-600">|</span>
          <span>Ecosistema Visual completo por <span className="font-semibold text-white">USD $250/mes</span>.</span>
          <a href="#planes" className="text-[#0055FF] hover:text-white transition-colors md:ml-1 font-semibold underline underline-offset-4">Ver detalles</a>
        </div>

        {/* NAV PRINCIPAL */}
        <nav className={`w-full transition-all duration-500 border-b ${isScrolled ? (isDarkMode ? 'bg-[#0a0a0a]/90 border-white/10 backdrop-blur-xl py-3 md:py-4' : 'bg-[#FAFAFA]/95 border-neutral-200/50 backdrop-blur-xl py-3 md:py-4 shadow-sm') : 'bg-transparent border-transparent py-4'}`}>
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="signalNote Logo" className={`h-7 w-auto ${(!isScrolled || isDarkMode) ? 'brightness-0 invert' : ''} transition-all duration-500`} />
            <span className={`font-semibold tracking-tight transition-colors duration-500 ${!isScrolled ? 'text-white' : (isDarkMode ? 'text-white' : 'text-neutral-900')}`}>signalNote</span>
          </div>
          <div className={`hidden md:flex gap-6 items-center text-xs font-semibold uppercase tracking-widest transition-colors duration-500 ${!isScrolled ? 'text-white/80' : (isDarkMode ? 'text-neutral-400' : 'text-neutral-600')}`}>
            <a href="#manifiesto" className={`hover:text-white transition-colors`}>Sistema</a>
            <a href="#anatomia" className={`hover:text-white transition-colors`}>Anatomía</a>
            <a href="#portafolio" className={`hover:text-white transition-colors`}>Portafolio</a>
            <a href="#planes" className={`hover:text-white transition-colors`}>Planes</a>
            <a href="#" className={`hover:text-white transition-colors`}>Auditoría</a>
            
            <div className={`w-[1px] h-4 ${!isScrolled ? 'bg-white/30' : (isDarkMode ? 'bg-white/20' : 'bg-neutral-300')} mx-2 transition-colors duration-500`}></div>
            
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-full ${!isScrolled ? 'hover:bg-white/10 text-white' : (isDarkMode ? 'hover:bg-white/10 text-neutral-400 hover:text-white' : 'hover:bg-neutral-900/5 text-neutral-600 hover:text-neutral-900')} transition-colors flex items-center justify-center`}>
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </nav>
      </div>

      {/* 1. HERO SECTION (Video Full Bleed) */}
      <header className="relative w-full h-screen min-h-[700px] flex flex-col justify-center items-center overflow-hidden bg-neutral-950">
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full flex flex-col justify-center items-center"
        >
          {/* El Video de Fondo */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 transform-gpu"
            src="/hero-video.mp4" 
          />
          
          {/* El Overlay Oscuro (Opacidad fuerte para contrastar, optimizado sin blur) */}
          <div className="absolute inset-0 bg-neutral-950/70 sm:bg-neutral-950/80 z-0"></div>
          
          {/* Gradiente adicional abajo para asegurar que el scroll-down se mezcle lindo */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent z-0"></div>

          {/* El Contenido (Texto minimalista estilo Apple) encima del video */}
          <motion.div 
            className="relative z-10 flex flex-col items-center px-6 w-full max-w-4xl mx-auto transform-gpu mt-16 sm:mt-24"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { 
                opacity: 1, 
                transition: { staggerChildren: 0.15, delayChildren: 0.2 }
              }
            }}
          >
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
              className="inline-flex items-center gap-2 mb-10 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-[10px] sm:text-xs font-medium tracking-widest uppercase text-white shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              SignalNote
            </motion.div>
            
            <motion.h1 
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
              className="text-6xl sm:text-7xl md:text-9xl font-bold tracking-tighter leading-[0.9] text-white mb-6 drop-shadow-2xl"
            >
              Su creativo.<br />
              <span className="text-white/60">A otro nivel.</span>
            </motion.h1>
            
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
              className="text-xl md:text-3xl font-medium tracking-tight max-w-2xl text-neutral-300 drop-shadow-lg"
            >
              Ecosistemas visuales para el real estate de lujo.
            </motion.p>

            <motion.div 
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1, delay: 0.8 } } }}
              className="mt-20 flex flex-col items-center gap-3 text-white/40 cursor-pointer group"
              onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <span className="text-[10px] uppercase tracking-widest font-semibold group-hover:text-white transition-colors duration-300">Descubrir</span>
              <div className="relative w-[1px] h-16 bg-white/10 overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-white to-transparent"
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </header>

      {/* 2. MANIFIESTO & DIAGRAMA (Sección de Autoridad Técnica) */}
      <section id="manifiesto" className={`py-32 px-6 relative z-20 ${isDarkMode ? 'bg-neutral-950/40 border-white/10' : 'bg-white/40 border-neutral-200/50'} backdrop-blur-md border-y transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Lado Izquierdo: Los 3 Pilares */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className={`text-3xl md:text-4xl font-light tracking-tight mb-4 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                La marca no es arte. <br/>
                <span className={`font-serif italic ${isDarkMode ? 'text-neutral-400' : 'text-neutral-700'}`}>Es un activo operativo.</span>
              </h2>
              <p className={`font-light leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-neutral-700'}`}>
                El corretaje de alto nivel requiere activos visuales instantáneos. No puede permitirse cuellos de botella creativos ni inconsistencias que devalúen su inventario.
              </p>
            </motion.div>

            <motion.div 
              className="space-y-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
            >
              {[
                { icon: Layers, color: "text-[#0055FF]", title: "Sistematización", desc: "No hacemos flyers sueltos. Diseñamos un núcleo operativo (DesignOps) del que nacen todos sus activos comerciales, garantizando coherencia absoluta." },
                { icon: Zap, color: "text-[#FF00D4]", title: "Velocidad Operativa", desc: "Reducimos el Time-to-Market. Nuestra arquitectura de plantillas le permite a sus agentes desplegar campañas en minutos, no en días." },
                { icon: Fingerprint, color: isDarkMode ? "text-white" : "text-neutral-900", title: "Protección de Marca", desc: "Blindamos su identidad visual. Sus equipos externos ya no podrán devaluar el inventario con diseños improvisados." }
              ].map((item, i) => (
                <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="flex gap-4">
                  <div className={`mt-1 ${isDarkMode ? 'bg-neutral-900 border-white/10' : 'bg-white border-neutral-100'} shadow-sm w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.color}`}>
                    <item.icon size={18} />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'} mb-1`}>{item.title}</h4>
                    <p className={`text-sm font-light leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-neutral-700'}`}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Lado Derecho: Diagrama Interactivo de Alto Nivel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-7 relative h-[550px] ${isDarkMode ? 'bg-neutral-900/50 border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]' : 'bg-white/50 border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]'} backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center p-8 overflow-hidden group transition-colors duration-500`}
          >
            {/* Grid background subtil dentro de la tarjeta */}
            <div className={`absolute inset-0 [background-size:20px_20px] ${isDarkMode ? 'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-20' : 'bg-[radial-gradient(#000000_1px,transparent_1px)] opacity-[0.15]'}`} />
            
            {/* Líneas SVG Animadas */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                d="M 50% 50% L 25% 25% M 50% 50% L 75% 25% M 50% 50% L 25% 75% M 50% 50% L 75% 75%" 
                stroke="#E5E5E5" 
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none" 
              />
            </svg>

            {/* Nodo Central (Motor) */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className={`absolute z-10 w-36 h-36 ${isDarkMode ? 'bg-neutral-950 border-white/10' : 'bg-white border-neutral-100'} shadow-[0_0_40px_rgba(0,85,255,0.2)] rounded-full flex flex-col items-center justify-center group-hover:scale-105 transition-all duration-700 ease-out`}
            >
              <div className="absolute inset-0 rounded-full border border-[#0055FF]/30 animate-ping" style={{ animationDuration: '3s' }}></div>
              <Activity size={32} className="text-[#0055FF] mb-2" strokeWidth={1.5} />
              <span className={`text-sm font-semibold tracking-tight ${isDarkMode ? 'text-white' : ''}`}>signalNote</span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest mt-0.5">Core System</span>
            </motion.div>

            {/* Nodos Satélites (Assets) */}
            {[
              { label: 'Asset Captación', sub: 'Redes Sociales', x: '25%', y: '25%', delay: 0.8 },
              { label: 'Fichas de Venta', sub: 'Editorial', x: '75%', y: '25%', delay: 1.0 },
              { label: 'Identidad', sub: 'Carnets / Docs', x: '25%', y: '75%', delay: 1.2 },
              { label: 'Expansión', sub: 'Ads & Banners', x: '75%', y: '75%', delay: 1.4 }
            ].map((node, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: node.delay }}
                className={`absolute z-10 ${isDarkMode ? 'bg-neutral-900/90 border-white/10' : 'bg-white/90 border-neutral-100'} backdrop-blur-md px-5 py-3 rounded-xl shadow-lg flex flex-col items-center hover:-translate-y-1 transition-transform duration-300 cursor-default`}
                style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
              >
                <span className={`text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>{node.label}</span>
                <span className="text-[10px] text-neutral-400 mt-0.5">{node.sub}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <InteractiveAnatomySection isDark={isDarkMode} />

      {/* 3. SECCIÓN DE PORTAFOLIO */}
      <section id="portafolio" className="py-32 px-6 relative overflow-hidden min-h-screen flex flex-col justify-center">
        
        {/* Capa de luz de la marca proyectada al fondo */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-0 mix-blend-multiply opacity-60"
          animate={{ 
            background: `
              radial-gradient(circle at 85% 15%, ${PROJECTS_DATA[idx].brandConfig.gradientStart} 0%, transparent 50%),
              radial-gradient(circle at 15% 85%, ${PROJECTS_DATA[idx].brandConfig.gradientEnd} 0%, transparent 40%)
            ` 
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
              <h2 className={`text-sm font-semibold tracking-widest uppercase mb-2 flex items-center gap-2 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-700'}`}>
                <ArrowDownRight size={16} /> Portafolio
              </h2>
              <h3 className={`text-4xl md:text-5xl lg:text-6xl font-light tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'} transition-colors duration-500`}>
                Implementaciones <span className="font-serif italic font-medium text-neutral-600">de Marca.</span>
              </h3>
            </div>
            
            <div className="flex gap-3 mt-8 md:mt-0">
              <button 
                onClick={prevProject} 
                className={`w-14 h-14 rounded-full border ${isDarkMode ? 'border-white/10 bg-neutral-900/60 text-white hover:bg-neutral-800' : 'border-neutral-200/60 bg-white/60 text-neutral-900 hover:bg-white'} backdrop-blur-md flex items-center justify-center transition-all shadow-sm hover:shadow-md`}
              >
                <ChevronLeft size={24} strokeWidth={1} />
              </button>
              <button 
                onClick={nextProject} 
                className={`w-14 h-14 rounded-full border ${isDarkMode ? 'border-white/10 bg-neutral-900/60 text-white hover:bg-neutral-800' : 'border-neutral-200/60 bg-white/60 text-neutral-900 hover:bg-white'} backdrop-blur-md flex items-center justify-center transition-all shadow-sm hover:shadow-md`}
              >
                <ChevronRight size={24} strokeWidth={1} />
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <ProjectContent project={PROJECTS_DATA[idx]} isDark={isDarkMode} />
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN DE PLANES */}
      <section id="planes" className={`py-32 px-6 relative z-20 ${isDarkMode ? 'bg-[#0a0a0a]/40 border-white/10' : 'bg-white/40 border-neutral-200/50'} backdrop-blur-md border-t transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm font-semibold tracking-widest text-[#0055FF] uppercase mb-4 flex items-center justify-center gap-2">
              <Zap size={16} /> Inversión
            </h2>
            <h3 className={`text-4xl md:text-5xl font-light tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              Elija su <span className="font-serif italic font-medium text-neutral-600">nivel operativo.</span>
            </h3>
            <p className={`mt-6 font-light max-w-xl mx-auto ${isDarkMode ? 'text-neutral-400' : 'text-neutral-700'}`}>
              Sistemas diseñados para escalar, sin importar el tamaño de su equipo comercial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
            {/* Plan 1: Oferta Fundadora */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`${isDarkMode ? 'bg-neutral-900/60 border-white/10' : 'bg-white/60 border-neutral-200/60'} backdrop-blur-md rounded-[2rem] p-8 border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500`}
            >
              <h4 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'} mb-2`}>Ecosistema Visual</h4>
              <p className={`text-sm font-light mb-4 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-700'}`}>
                <span className="font-semibold text-[#0055FF]">Oferta Fundadora.</span> Transforma publicaciones aisladas en una estética visual consistente.
              </p>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-light tracking-tighter ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>$250</span>
                  <span className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-700'}`}>USD/mes</span>
                </div>
                <div className={`text-xs mt-2 space-y-1 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
                  <p className="flex items-center gap-1.5"><span className="font-semibold text-[#0055FF]">Precio fundador</span></p>
                  <p className="flex items-center gap-1.5"><span className="line-through">Valor regular del servicio: $350/mes</span></p>
                  <p className="flex items-center gap-1.5">Oferta válida por 3 meses</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  '12 posts (sustituibles x2 piezas simples)', 
                  '7 historias mensuales', 
                  'Rediseño y unificación visual', 
                  'Dirección estética coherente', 
                  'Hasta 2 rondas de ajustes'
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-neutral-600 font-light">
                    <Check size={16} className="text-[#0055FF] shrink-0 mt-0.5" /> <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="https://wa.me/584241930273?text=Hola%20SignalNote,%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20Oferta%20Fundadora%20del%20Ecosistema%20Visual."
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-full border ${isDarkMode ? 'border-white/20 text-white hover:bg-white hover:text-neutral-900' : 'border-neutral-200 text-neutral-900 hover:bg-neutral-900 hover:text-white'} text-sm font-semibold transition-colors duration-300 flex justify-center items-center`}
              >
                Obtener Oferta
              </a>
            </motion.div>

            {/* Plan 2: Rediseño de Logo */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="bg-neutral-900 rounded-[2rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden transform md:scale-105 z-10"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0055FF] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
              <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-semibold text-white tracking-widest uppercase mb-4">
                Identidad
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Rediseño de Logo</h4>
              <p className="text-sm text-neutral-400 font-light mb-6">Identidad profesional, funcional y alineada con su posicionamiento.</p>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-light tracking-tighter text-white">$170</span>
                  <span className="text-sm text-neutral-400">USD</span>
                </div>
                <div className="text-xs mt-2 space-y-1 text-neutral-400">
                  <p className="flex items-center gap-1.5"><span className="font-semibold text-[#0055FF]">Precio fundador</span></p>
                  <p className="flex items-center gap-1.5"><span className="line-through">Precio regular: $250</span></p>
                  <p className="flex items-center gap-1.5">Pago: 50% inicio / 50% final</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Análisis y 3 rutas bocetadas', 
                  'Desarrollo de propuesta y ajustes', 
                  'Logo en versiones principales y variantes', 
                  'Paleta de color y tipografías', 
                  'Manual básico de marca'
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-neutral-300 font-light">
                    <Check size={16} className="text-[#0055FF] shrink-0 mt-0.5" /> <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="https://wa.me/584241930273?text=Hola%20SignalNote,%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20servicio%20de%20Redise%C3%B1o%20de%20Logo."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full bg-white text-sm font-semibold text-neutral-900 hover:bg-[#0055FF] hover:text-white transition-colors duration-300 flex justify-center items-center"
              >
                Obtener Oferta
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-12 border-t text-center relative z-20 transition-colors duration-500 ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-[#FAFAFA] border-neutral-200/50'}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <span className={`font-semibold tracking-tight text-sm ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>signalNote</span>
          </div>
          
          {/* Skills / Software Logos */}
          <div className="flex items-center gap-5 py-2 px-5 rounded-full border border-neutral-200/40 dark:border-white/5 bg-neutral-100/30 dark:bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-neutral-300 dark:hover:border-white/10">
            <span className={`text-[9px] font-bold tracking-widest uppercase ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Skills / Software:
            </span>
            <div className="flex items-center gap-4">
              {/* Adobe Illustrator */}
              <div className="group relative cursor-pointer" title="Adobe Illustrator">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-neutral-400 dark:text-neutral-500 group-hover:text-[#FF9A00] transition-colors duration-300">
                  <path d="M10.53 10.73c-.1-.31-.19-.61-.29-.92-.1-.31-.19-.6-.27-.89-.08-.28-.15-.54-.22-.78h-.02c-.09.43-.2.86-.34 1.29-.15.48-.3.98-.46 1.48-.14.51-.29.98-.44 1.4h2.54c-.06-.211-.14-.46-.23-.721-.09-.269-.18-.559-.27-.859zM19.75.3H4.25C1.9.3 0 2.2 0 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zM14.7 16.83h-2.091c-.069.01-.139-.04-.159-.11l-.82-2.38H7.91l-.76 2.35c-.02.09-.1.15-.19.141H5.08c-.11 0-.14-.061-.11-.18L8.19 7.38c.03-.1.06-.21.1-.33.04-.21.06-.43.06-.65-.01-.05.03-.1.08-.11h2.59c.08 0 .12.03.13.08l3.65 10.3c.03.109 0 .16-.1.16zm3.4-.15c0 .11-.039.16-.129.16H16.01c-.1 0-.15-.061-.15-.16v-7.7c0-.1.041-.14.131-.14h1.98c.09 0 .129.05.129.14v7.7zm-.209-9.03c-.231.24-.571.37-.911.35-.33.01-.65-.12-.891-.35-.23-.25-.35-.58-.34-.92-.01-.34.12-.66.359-.89.242-.23.562-.35.892-.35.391 0 .689.12.91.35.22.24.34.56.33.89.01.34-.11.67-.349.92z" />
                </svg>
              </div>

              {/* Adobe Photoshop */}
              <div className="group relative cursor-pointer" title="Adobe Photoshop">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-neutral-400 dark:text-neutral-500 group-hover:text-[#31A8FF] transition-colors duration-300">
                  <path d="M9.85 8.42c-.37-.15-.77-.21-1.18-.2-.26 0-.49 0-.68.01-.2-.01-.34 0-.41.01v3.36c.14.01.27.02.39.02h.53c.39 0 .78-.06 1.15-.18.32-.09.6-.28.82-.53.21-.25.31-.59.31-1.03.01-.31-.07-.62-.23-.89-.17-.26-.41-.46-.7-.57zM19.75.3H4.25C1.9.3 0 2.2 0 4.55v14.899c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm-7.391 11.65c-.399.56-.959.98-1.609 1.22-.68.25-1.43.34-2.25.34-.24 0-.4 0-.5-.01s-.24-.01-.43-.01v3.209c.01.07-.04.131-.11.141H5.52c-.08 0-.12-.041-.12-.131V6.42c0-.07.03-.11.1-.11.17 0 .33 0 .56-.01.24-.01.49-.01.76-.02s.56-.01.87-.02c.31-.01.61-.01.91-.01.82 0 1.5.1 2.06.31.5.17.96.45 1.34.82.32.32.57.71.73 1.14.149.42.229.85.229 1.3.001.86-.199 1.57-.6 2.13zm7.091 3.89c-.28.4-.671.709-1.12.891-.49.209-1.09.318-1.811.318-.459 0-.91-.039-1.359-.129-.35-.061-.7-.17-1.02-.32-.07-.039-.121-.109-.111-.189v-1.74c0-.029.011-.07.041-.09.029-.02.06-.01.09.01.39.23.8.391 1.24.49.379.1.779.15 1.18.15.38 0 .65-.051.83-.141.16-.07.27-.24.27-.42 0-.141-.08-.27-.24-.4-.16-.129-.489-.279-.979-.471-.51-.18-.979-.42-1.42-.719-.31-.221-.569-.51-.761-.85-.159-.32-.239-.67-.229-1.021 0-.43.12-.84.341-1.21.25-.4.619-.72 1.049-.92.469-.239 1.059-.349 1.769-.349.41 0 .83.03 1.24.09.3.04.59.12.86.23.039.01.08.05.1.09.01.04.02.08.02.12v1.63c0 .04-.02.08-.05.1-.09.02-.14.02-.18 0-.3-.16-.62-.27-.96-.34-.37-.08-.74-.13-1.12-.13-.2-.01-.41.02-.601.07-.129.03-.24.1-.31.2-.05.08-.08.18-.08.27s.04.18.101.26c.09.11.209.2.34.27.229.12.47.23.709.33.541.18 1.061.43 1.541.73.33.209.6.49.789.83.16.318.24.67.23 1.029.011.471-.129.94-.389 1.331z" />
                </svg>
              </div>

              {/* Affinity Suite */}
              <div className="group relative cursor-pointer" title="Affinity Suite">
                <svg viewBox="0 0 512 512" className="w-5 h-5 transition-colors duration-300">
                  <path d="M510 113.76v284.48C510 459.922 459.921 510 398.24 510H113.76C52.078 510 2 459.922 2 398.24V113.76C2 52.079 52.078 2 113.76 2h284.48C459.921 2 510 52.079 510 113.76z" className="fill-neutral-400 dark:fill-neutral-500 group-hover:fill-[#A7F175] transition-colors duration-300" />
                  <path d="M240.452 347.541c-20.696 0-33.871-12.624-33.871-28.663 0-68.57 179.287-82.28 179.287-155.108 0-44.426-51.168-63.569-116.478-63.569-39.735 0-84.66 7.399-126.377 20.626v86.867c61.481-45.029 129.792-64.309 173.803-64.309 27.662 0 46.443 7.76 46.443 21.678 0 57.308-247.287 48.219-247.287 172.061 0 47.478 32.456 74.675 78.123 74.675 69.07 0 121.307-67.5 160.386-149.78l7.916 2.845c-20.592 50.289-63.171 105.424-71.484 140.864h88.92V222.371H359.31c-29.819 65.138-73.502 125.17-118.86 125.17h.002z" className="fill-[#FAFAFA] dark:fill-[#0a0a0a] transition-colors duration-500" />
                </svg>
              </div>
            </div>
          </div>

          <div className="text-[10px] font-semibold tracking-widest text-neutral-400 uppercase">
            PART OF <span className={isDarkMode ? 'text-white' : 'text-neutral-800'}>SIGNAL LABS</span>
          </div>
        </div>
      </footer>
        </motion.div>
      )}
    </div>
  );
}