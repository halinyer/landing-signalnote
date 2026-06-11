import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowDownRight, Fingerprint, Zap, Layers, Activity, Check, Moon, Sun, Image as ImageIcon } from 'lucide-react';

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

// COMPONENTE: Anatomía con Scrollytelling (Optimizado para Móvil estilo Stripe)
const InteractiveAnatomySection = ({ isDark }: { isDark: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // OPACIDADES Y DESPLAZAMIENTOS EN Y (Matriz estricta de 0 a 1 para evitar bugs de extrapolación)
  const text1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.3, 1], [1, 1, 0, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.25, 0.3, 1], [0, 0, -50, -50]); 
  const text1Display = useTransform(text1Opacity, (v) => v > 0 ? "flex" : "none");

  const text2Opacity = useTransform(scrollYProgress, [0, 0.3, 0.4, 0.6, 0.7, 1], [0, 0, 1, 1, 0, 0]);
  const text2Y = useTransform(scrollYProgress, [0, 0.3, 0.4, 0.6, 0.7, 1], [50, 50, 0, 0, -50, -50]); 
  const text2Display = useTransform(text2Opacity, (v) => v > 0 ? "flex" : "none");

  const text3Opacity = useTransform(scrollYProgress, [0, 0.7, 0.8, 1], [0, 0, 1, 1]);
  const text3Y = useTransform(scrollYProgress, [0, 0.7, 0.8, 1], [50, 50, 0, 0]); 
  const text3Display = useTransform(text3Opacity, (v) => v > 0 ? "flex" : "none");

  const step1ImgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.35, 1], [1, 1, 0, 0]); 
  const step1Display = useTransform(step1ImgOpacity, (v) => v > 0 ? "flex" : "none");

  const step2ImgOpacity = useTransform(scrollYProgress, [0, 0.25, 0.45, 0.75, 1], [0, 0, 1, 0, 0]); 
  const step2Display = useTransform(step2ImgOpacity, (v) => v > 0 ? "flex" : "none");

  const step3ImgOpacity = useTransform(scrollYProgress, [0, 0.65, 0.85, 1], [0, 0, 1, 1]); 
  const step3Display = useTransform(step3ImgOpacity, (v) => v > 0 ? "flex" : "none");
  
  const mockupScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

  return (
    <section id="anatomia" ref={containerRef} className={`relative h-[300vh] border-t transition-colors duration-500 ${isDark ? 'bg-[#0a0a0a]/30 border-white/10' : 'bg-white border-slate-200/50'}`}>
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-24 items-center pt-20 lg:pt-0">
          
          {/* LADO DERECHO (Móvil: Arriba) - El Mockup */}
          <div className="relative w-full aspect-square md:aspect-[4/5] max-h-[40vh] lg:max-h-[75vh] flex items-center justify-center lg:order-2">
            <motion.div style={{ scale: mockupScale }} className={`relative w-full max-w-sm lg:max-w-full h-full rounded-[1.5rem] lg:rounded-[2rem] shadow-2xl overflow-hidden border transition-colors duration-500 ${isDark ? 'border-white/10 bg-neutral-900' : 'border-slate-200/50 bg-white'}`}>
              
              {/* FASE 1: WIREFRAME */}
              <motion.div style={{ opacity: step1ImgOpacity, display: step1Display }} className={`absolute inset-0 p-4 lg:p-6 flex-col gap-3 transition-colors duration-500 ${isDark ? 'bg-neutral-950' : 'bg-slate-50'}`}>
                 <div className={`w-full aspect-[4/3] rounded-xl border-2 border-dashed flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-slate-200/50 border-slate-300'}`}>
                    <ImageIcon className={`w-8 h-8 lg:w-10 lg:h-10 ${isDark ? 'text-neutral-800' : 'text-slate-300'}`} />
                 </div>
                 
                 <div className="flex justify-between items-center mt-2">
                   <div className={`h-4 w-1/3 rounded-md transition-colors duration-500 ${isDark ? 'bg-neutral-800' : 'bg-slate-200'}`}></div>
                   <div className={`h-4 w-1/4 rounded-md transition-colors duration-500 ${isDark ? 'bg-neutral-800' : 'bg-slate-200'}`}></div>
                 </div>
                 <div className={`h-6 w-3/4 rounded-md mt-1 transition-colors duration-500 ${isDark ? 'bg-neutral-900' : 'bg-slate-300'}`}></div>
                 
                 <div className="flex gap-2 mt-2">
                    <div className={`h-3 w-12 rounded-full transition-colors duration-500 ${isDark ? 'bg-neutral-800' : 'bg-slate-200'}`}></div>
                    <div className={`h-3 w-12 rounded-full transition-colors duration-500 ${isDark ? 'bg-neutral-800' : 'bg-slate-200'}`}></div>
                 </div>

                 <div className={`mt-auto h-12 w-full rounded-xl transition-colors duration-500 ${isDark ? 'bg-neutral-800' : 'bg-slate-200'}`}></div>
              </motion.div>

              {/* FASE 2: INYECCIÓN IDENTIDAD */}
              <motion.div style={{ opacity: step2ImgOpacity, display: step2Display }} className={`absolute inset-0 p-4 lg:p-6 flex-col gap-3 transition-colors duration-500 ${isDark ? 'bg-neutral-900' : 'bg-white'}`}>
                 <div className={`w-full aspect-[4/3] rounded-xl flex items-center justify-center transition-colors duration-500 bg-[#0055FF]/10 border border-[#0055FF]/20`}>
                    <div className="w-16 h-16 bg-[#0055FF]/30 rounded-full blur-xl"></div>
                 </div>
                 
                 <div className="flex justify-between items-center mt-2">
                   <div className={`h-4 w-1/3 rounded-md transition-colors duration-500 bg-[#0055FF]/20`}></div>
                   <div className={`h-4 w-1/4 rounded-md transition-colors duration-500 bg-[#0055FF]/20`}></div>
                 </div>
                 <div className={`h-6 w-3/4 rounded-md mt-1 transition-colors duration-500 ${isDark ? 'bg-neutral-800' : 'bg-slate-900'}`}></div>
                 
                 <div className="flex gap-2 mt-2">
                    <div className={`h-3 w-12 rounded-full transition-colors duration-500 bg-[#0055FF]/10`}></div>
                    <div className={`h-3 w-12 rounded-full transition-colors duration-500 bg-[#0055FF]/10`}></div>
                 </div>

                 <div className="mt-auto h-12 w-full bg-[#0055FF] rounded-xl shadow-lg shadow-[#0055FF]/20"></div>
              </motion.div>

              {/* FASE 3: OUTPUT FINAL */}
              <motion.div style={{ opacity: step3ImgOpacity, display: step3Display }} className={`absolute inset-0 flex-col transition-colors duration-500 ${isDark ? 'bg-neutral-950' : 'bg-white'}`}>
                <div className="relative w-full aspect-[4/3]">
                  <img 
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop" 
                    alt="Luxury Mansion" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-neutral-900 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    Exclusiva
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[#0055FF] font-semibold text-lg">$5,450,000</span>
                    <span className={`text-[10px] font-medium tracking-widest ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>MLS 4920</span>
                  </div>
                  
                  <h4 className={`text-xl font-medium tracking-tight mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    1240 Miami Beach Blvd
                  </h4>
                  
                  <div className="flex gap-4 mb-auto">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>5</span>
                      <span className={`text-xs ${isDark ? 'text-neutral-500' : 'text-slate-500'}`}>Beds</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>6</span>
                      <span className={`text-xs ${isDark ? 'text-neutral-500' : 'text-slate-500'}`}>Baths</span>
                    </div>
                  </div>

                  <button className="w-full mt-4 h-12 bg-[#0055FF] hover:bg-[#0044CC] text-white rounded-xl font-medium transition-colors duration-300 shadow-lg shadow-[#0055FF]/25">
                    Agendar Visita
                  </button>
                </div>
              </motion.div>

            </motion.div>
          </div>

          {/* LADO IZQUIERDO (Móvil: Abajo) - Contenedor de Textos */}
          <div className="relative h-[200px] lg:h-[350px] flex items-center w-full lg:order-1 text-center lg:text-left">
            
            <motion.div 
              style={{ opacity: text1Opacity, y: text1Y, display: text1Display }} 
              className="absolute inset-0 flex-col justify-start lg:justify-center pointer-events-none w-full"
            >
              <span className={`text-[10px] font-semibold tracking-widest uppercase mb-3 block ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>Fase 01 / Wireframe</span>
              <h3 className={`text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4 transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Estructura <span className={`font-serif italic font-light transition-colors duration-500 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Base.</span>
              </h3>
              <p className={`text-sm md:text-base lg:text-lg font-light max-w-md mx-auto lg:mx-0 leading-relaxed transition-colors duration-500 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                Definimos el esqueleto de la ficha de propiedad para maximizar el impacto visual y la retención del comprador.
              </p>
            </motion.div>

            <motion.div 
              style={{ opacity: text2Opacity, y: text2Y, display: text2Display }} 
              className="absolute inset-0 flex-col justify-start lg:justify-center pointer-events-none w-full"
            >
              <span className={`text-[10px] font-semibold tracking-widest uppercase mb-3 block ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>Fase 02 / Inyección</span>
              <h3 className={`text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4 transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Identidad <span className={`font-serif italic font-light transition-colors duration-500 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Visual.</span>
              </h3>
              <p className={`text-sm md:text-base lg:text-lg font-light max-w-md mx-auto lg:mx-0 leading-relaxed transition-colors duration-500 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                Inyectamos de forma estricta sus colores corporativos, tipografía y estilo premium. Imposible romper la marca.
              </p>
            </motion.div>

            <motion.div 
              style={{ opacity: text3Opacity, y: text3Y, display: text3Display }} 
              className="absolute inset-0 flex-col justify-start lg:justify-center pointer-events-none w-full"
            >
              <span className={`text-[10px] font-semibold tracking-widest uppercase mb-3 block ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>Fase 03 / Output</span>
              <h3 className={`text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4 transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Activo de <span className={`font-serif italic font-light transition-colors duration-500 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Venta.</span>
              </h3>
              <p className={`text-sm md:text-base lg:text-lg font-light max-w-md mx-auto lg:mx-0 leading-relaxed transition-colors duration-500 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                La ficha de propiedad cobra vida, lista para que su equipo la despliegue y atraiga a clientes de alto valor.
              </p>
            </motion.div>

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
      {/* HEADER NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? (isDarkMode ? 'bg-[#0a0a0a]/80 border-white/10 backdrop-blur-xl py-4' : 'bg-[#FAFAFA]/90 border-neutral-200/50 backdrop-blur-xl py-4 shadow-sm') : 'bg-transparent border-transparent py-6'}`}>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Plan 1: Básico */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`${isDarkMode ? 'bg-neutral-900/60 border-white/10' : 'bg-white/60 border-neutral-200/60'} backdrop-blur-md rounded-[2rem] p-8 border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500`}
            >
              <h4 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'} mb-2`}>Básico</h4>
              <p className={`text-sm font-light mb-6 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-700'}`}>Mantenimiento de presencia digital y diseño base.</p>
              <div className="mb-8">
                <span className={`text-4xl font-light tracking-tighter ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>$199</span>
                <span className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-700'}`}>/mes</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['12 publicaciones al mes', '8 historias', 'Diseño gráfico', 'Reporte mensual'].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-neutral-600 font-light">
                    <Check size={16} className="text-[#0055FF]" /> {feat}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-full border ${isDarkMode ? 'border-white/20 text-white hover:bg-white hover:text-neutral-900' : 'border-neutral-200 text-neutral-900 hover:bg-neutral-900 hover:text-white'} text-sm font-semibold transition-colors duration-300`}>
                Comenzar
              </button>
            </motion.div>

            {/* Plan 2: Profesional (Recomendado) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="bg-neutral-900 rounded-[2rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden transform md:scale-105 z-10"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0055FF] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
              <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-semibold text-white tracking-widest uppercase mb-4">
                Destacado
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Profesional</h4>
              <p className="text-sm text-neutral-400 font-light mb-6">Gestión activa y campañas para generar prospectos.</p>
              <div className="mb-8">
                <span className="text-4xl font-light tracking-tighter text-white">$599</span>
                <span className="text-sm text-neutral-400">/mes</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['16 publicaciones', '12 historias', 'Community management', 'Meta Ads'].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-neutral-300 font-light">
                    <Check size={16} className="text-[#0055FF]" /> {feat}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-full bg-white text-sm font-semibold text-neutral-900 hover:bg-[#0055FF] hover:text-white transition-colors duration-300">
                Actualizar a Profesional
              </button>
            </motion.div>

            {/* Plan 3: Premium */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className={`${isDarkMode ? 'bg-neutral-900/60 border-white/10' : 'bg-white/60 border-neutral-200/60'} backdrop-blur-md rounded-[2rem] p-8 border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500`}
            >
              <h4 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'} mb-2`}>Premium</h4>
              <p className={`text-sm font-light mb-6 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-700'}`}>Marketing integral y producción visual de alto nivel.</p>
              <div className="mb-8">
                <span className={`text-4xl font-light tracking-tighter ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>$1,299</span>
                <span className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-700'}`}>/mes</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Todo lo anterior', 'Producción audiovisual', 'Estrategia de marketing', 'Reunión semanal'].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-neutral-600 font-light">
                    <Check size={16} className="text-[#FF00D4]" /> {feat}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-full border ${isDarkMode ? 'border-white/20 text-white hover:bg-white hover:text-neutral-900' : 'border-neutral-200 text-neutral-900 hover:bg-neutral-900 hover:text-white'} text-sm font-semibold transition-colors duration-300`}>
                Contactar Ventas
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-12 border-t text-center relative z-20 transition-colors duration-500 ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-[#FAFAFA] border-neutral-200/50'}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
             <span className={`font-semibold tracking-tight text-sm ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>signalNote</span>
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