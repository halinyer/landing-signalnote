import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Image as ImageIcon, ArrowDownRight, Fingerprint, Zap, Layers, Activity, Check } from 'lucide-react';

const PROJECTS_DATA = [
  {
    id: 'framework-01',
    clientName: 'Dream Home',
    category: 'Infraestructura Inmobiliaria',
    brandConfig: {
      primary: '#D6007A', // El Fucsia/Magenta de Dream Home
      gradientStart: 'rgba(214, 0, 122, 0.15)',
      gradientEnd: 'rgba(214, 0, 122, 0.02)',
      logoText: 'DH',
      logoUrl: null, 
    },
    bentoItems: [
      { 
        title: 'Cierres & Conversión', 
        subtitle: 'Plantilla de Reserva Exitosa', 
        span: 'col-span-12 md:col-span-8', 
        height: 'h-[500px]', 
        imageUrl: '/Recurso 18historia zoom.png' 
      },
      { 
        title: 'Identidad Operativa', 
        subtitle: 'Carnet Corporativo', 
        span: 'col-span-12 md:col-span-4', 
        height: 'h-[500px]', 
        imageUrl: '/WhatsApp Image 2026-06-05 at 6.41.08 PM.jpeg' 
      },
      { 
        title: 'Autoridad / Gamificación', 
        subtitle: 'Top Cerrador del Mes', 
        span: 'col-span-12 md:col-span-5', 
        height: 'h-[400px]',
        imageUrl: '/WhatsApp Image 2026-06-03 at 10.15.57 PM.jpeg' 
      },
      { 
        title: 'Cultura Organizacional', 
        subtitle: 'Día de las Madres', 
        span: 'col-span-12 md:col-span-7', 
        height: 'h-[400px]',
        imageUrl: '/Maracay_Mesa de trabajo 1 copia 3.jpg' 
      }
    ]
  },
  {
    id: 'framework-02',
    clientName: 'Dermaclinic Estética',
    category: 'Ecosistema Visual Médico',
    brandConfig: {
      primary: '#EF007E',
      gradientStart: 'rgba(239, 0, 126, 0.12)',
      gradientEnd: 'rgba(255, 160, 122, 0.08)',
      logoText: 'DC',
      logoUrl: null, 
    },
    bentoItems: [
      { title: 'Tratamientos', subtitle: 'Catálogo Visual', span: 'col-span-12 md:col-span-6', height: 'h-64' },
      { title: 'Antes/Después', subtitle: 'Comprobación', span: 'col-span-12 md:col-span-6', height: 'h-64' },
      { title: 'Autoridad', subtitle: 'Perfil Médico', span: 'col-span-12', height: 'h-56' }
    ]
  }
];

const ProjectContent = ({ project, isDark = false, showLogo = false }: any) => {
  const textColor = isDark ? 'text-white' : 'text-neutral-900';
  const subTextColor = isDark ? 'text-neutral-400' : 'text-neutral-500';
  const cardBg = isDark ? 'bg-neutral-900/50' : 'bg-white/80 backdrop-blur-md';
  const cardBorder = isDark ? 'border-white/10' : 'border-neutral-200/60';
  const imgPlaceholderBg = isDark ? 'bg-neutral-800' : 'bg-neutral-50/50';

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} // Curva Apple-like
      className="w-full relative z-10"
    >
      <div className="mb-10 flex flex-col md:flex-row md:items-center gap-6">
        {showLogo && (
          <div className={`w-20 h-20 shrink-0 rounded-2xl border ${cardBorder} shadow-sm flex items-center justify-center overflow-hidden bg-white/50 backdrop-blur-sm`}>
            {project.brandConfig.logoUrl ? (
              <img src={project.brandConfig.logoUrl} alt={`${project.clientName} Logo`} className="w-full h-full object-contain p-2" />
            ) : (
              <span className={`text-2xl font-serif font-semibold tracking-tighter ${textColor}`}>
                {project.brandConfig.logoText}
              </span>
            )}
          </div>
        )}

        <div>
          <h3 className={`text-sm font-semibold tracking-widest uppercase mb-2`} style={{ color: project.brandConfig.primary }}>
            {project.category}
          </h3>
          <h2 className={`text-4xl md:text-5xl font-light tracking-tight ${textColor}`}>
            {project.clientName}
          </h2>
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-12 gap-4"
        initial="hidden"
        animate="show"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
      >
        {project.bentoItems.map((item: any, i: number) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            whileHover={{ scale: 1.01, boxShadow: `0 20px 40px -10px ${project.brandConfig.gradientStart}` }}
            className={`relative overflow-hidden ${cardBg} border ${cardBorder} rounded-xl flex flex-col transition-all duration-500 group ${item.span} ${item.height}`}
          >
            {/* Contenedor de la Imagen */}
            <div className={`w-full h-full absolute inset-0 ${imgPlaceholderBg} overflow-hidden`}>
               {item.imageUrl ? (
                 <img 
                   src={item.imageUrl} 
                   alt={item.title} 
                   className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ease-out" 
                 />
               ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-neutral-300">
                    <ImageIcon size={24} className={isDark ? 'text-neutral-700' : 'text-neutral-300'} />
                    <span className={`text-[10px] mt-2 font-medium tracking-widest uppercase ${subTextColor}`}>Contenedor JPG</span>
                 </div>
               )}
              
              {/* Overlay suave para legibilidad del texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Resplandor de marca */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                   style={{ boxShadow: `inset 0 0 0 1px ${project.brandConfig.primary}50` }} />
            </div>

            {/* Caja de Texto Superpuesta */}
            <div className={`absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out`}>
              <h4 className="text-sm font-semibold tracking-wide uppercase text-white drop-shadow-md">{item.title}</h4>
              <p className="text-xs mt-1 text-neutral-200 drop-shadow-md">{item.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const GlobalBackground = () => (
  <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-[#FAFAFA]">
    {/* Grid Lineal (Lovable Style) */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
    {/* Orbes de luz fijos y sutiles */}
    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#2FC7EA] rounded-full blur-[120px] opacity-15 animate-pulse" style={{ animationDuration: '8s' }} />
    <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#EF007E] rounded-full blur-[120px] opacity-10 animate-pulse" style={{ animationDuration: '12s' }} />
  </div>
);

export default function App() {
  const [idx, setIdx] = useState(0); 
  const nextProject = () => setIdx((prev) => (prev + 1) % PROJECTS_DATA.length);
  const prevProject = () => setIdx((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);

  return (
    <div className="min-h-screen text-neutral-900 font-sans selection:bg-[#2FC7EA] selection:text-white">
      
      <GlobalBackground />

      {/* HEADER NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#FAFAFA]/70 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-neutral-900 animate-pulse"></div>
            <span className="font-semibold tracking-tight text-neutral-900">signalNote</span>
          </div>
          <div className="hidden md:flex gap-8 text-xs font-semibold uppercase tracking-widest text-neutral-500">
            <a href="#manifiesto" className="hover:text-neutral-900 transition-colors">Sistema</a>
            <a href="#portafolio" className="hover:text-neutral-900 transition-colors">Portafolio</a>
            <a href="#planes" className="hover:text-neutral-900 transition-colors">Planes</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">Auditoría</a>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION (Pura tipografía y peso visual) */}
      <header className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl z-10 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 mb-8 bg-white/60 backdrop-blur-md border border-neutral-200/60 px-4 py-2 rounded-full text-[10px] sm:text-xs font-medium tracking-widest uppercase text-neutral-600 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FC7EA]"></span>
            Agencia de Infraestructura Visual
          </div>
          
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-semibold tracking-tighter leading-[0.95] text-neutral-900 mb-8">
            Diseño que escala. <br />
            <span className="font-serif italic font-light text-neutral-500">Sistemas que venden.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-neutral-500 font-light max-w-2xl leading-relaxed">
            Eliminamos la improvisación de su marca. Construimos ecosistemas visuales modulares para que su equipo comercial opere con máxima velocidad.
          </p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-16 flex flex-col items-center gap-2 text-neutral-400"
          >
            <span className="text-[10px] uppercase tracking-widest font-semibold">Descubra el Sistema</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-300 to-transparent"></div>
          </motion.div>
        </motion.div>
      </header>

      {/* 2. MANIFIESTO & DIAGRAMA (Sección de Autoridad Técnica) */}
      <section id="manifiesto" className="py-32 px-6 relative z-20 bg-white/40 backdrop-blur-md border-y border-neutral-200/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Lado Izquierdo: Los 3 Pilares */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4 text-neutral-900">
                La marca no es arte. <br/>
                <span className="font-serif italic text-neutral-500">Es un activo operativo.</span>
              </h2>
              <p className="text-neutral-500 font-light leading-relaxed">
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
                { icon: Layers, color: "text-[#2FC7EA]", title: "Sistematización", desc: "No hacemos flyers sueltos. Diseñamos un núcleo operativo (DesignOps) del que nacen todos sus activos comerciales, garantizando coherencia absoluta." },
                { icon: Zap, color: "text-[#EF007E]", title: "Velocidad Operativa", desc: "Reducimos el Time-to-Market. Nuestra arquitectura de plantillas le permite a sus agentes desplegar campañas en minutos, no en días." },
                { icon: Fingerprint, color: "text-neutral-900", title: "Protección de Marca", desc: "Blindamos su identidad visual. Sus equipos externos ya no podrán devaluar el inventario con diseños improvisados." }
              ].map((item, i) => (
                <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="flex gap-4">
                  <div className={`mt-1 bg-white border border-neutral-100 shadow-sm w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.color}`}>
                    <item.icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-neutral-500 font-light leading-relaxed">{item.desc}</p>
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
            className="lg:col-span-7 relative h-[550px] bg-white/50 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] flex items-center justify-center p-8 overflow-hidden group"
          >
            {/* Grid background subtil dentro de la tarjeta */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />
            
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
              className="absolute z-10 w-36 h-36 bg-white rounded-full shadow-2xl border border-neutral-100 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-700 ease-out"
            >
              <div className="absolute inset-0 rounded-full border border-[#2FC7EA]/30 animate-ping" style={{ animationDuration: '3s' }}></div>
              <Activity size={32} className="text-[#2FC7EA] mb-2" strokeWidth={1.5} />
              <span className="text-sm font-semibold tracking-tight">signalNote</span>
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
                className="absolute z-10 bg-white/90 backdrop-blur-md px-5 py-3 rounded-xl shadow-lg border border-neutral-100 flex flex-col items-center hover:-translate-y-1 transition-transform duration-300 cursor-default"
                style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
              >
                <span className="text-xs font-semibold text-neutral-800">{node.label}</span>
                <span className="text-[10px] text-neutral-400 mt-0.5">{node.sub}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
              <h2 className="text-sm font-semibold tracking-widest text-neutral-500 uppercase mb-2 flex items-center gap-2">
                <ArrowDownRight size={16} /> Portafolio
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-neutral-900">
                Implementaciones <span className="font-serif italic font-medium text-neutral-600">de Marca.</span>
              </h3>
            </div>
            
            <div className="flex gap-3 mt-8 md:mt-0">
              <button 
                onClick={prevProject} 
                className="w-14 h-14 rounded-full border border-neutral-200/60 bg-white/60 backdrop-blur-md flex items-center justify-center text-neutral-900 hover:bg-white transition-all shadow-sm hover:shadow-md"
              >
                <ChevronLeft size={24} strokeWidth={1} />
              </button>
              <button 
                onClick={nextProject} 
                className="w-14 h-14 rounded-full border border-neutral-200/60 bg-white/60 backdrop-blur-md flex items-center justify-center text-neutral-900 hover:bg-white transition-all shadow-sm hover:shadow-md"
              >
                <ChevronRight size={24} strokeWidth={1} />
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <ProjectContent project={PROJECTS_DATA[idx]} isDark={false} showLogo={true} />
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN DE PLANES */}
      <section id="planes" className="py-32 px-6 relative z-20 bg-white/40 backdrop-blur-md border-t border-neutral-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm font-semibold tracking-widest text-[#2FC7EA] uppercase mb-4 flex items-center justify-center gap-2">
              <Zap size={16} /> Inversión
            </h2>
            <h3 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900">
              Elija su <span className="font-serif italic font-medium text-neutral-600">nivel operativo.</span>
            </h3>
            <p className="mt-6 text-neutral-500 font-light max-w-xl mx-auto">
              Sistemas diseñados para escalar, sin importar el tamaño de su equipo comercial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Plan 1: Esencial */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/60 backdrop-blur-md rounded-[2rem] p-8 border border-neutral-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <h4 className="text-xl font-semibold text-neutral-900 mb-2">Esencial</h4>
              <p className="text-sm text-neutral-500 font-light mb-6">Para agentes independientes y corredores autónomos.</p>
              <div className="mb-8">
                <span className="text-4xl font-light tracking-tighter text-neutral-900">$99</span>
                <span className="text-sm text-neutral-500">/mes</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['1 Usuario', 'Plantillas de Cierre Básicas', 'Exportación en JPG/PNG', 'Soporte Estándar'].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-neutral-600 font-light">
                    <Check size={16} className="text-[#2FC7EA]" /> {feat}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-full border border-neutral-200 text-sm font-semibold text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors duration-300">
                Comenzar
              </button>
            </motion.div>

            {/* Plan 2: Agencia (Recomendado) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="bg-neutral-900 rounded-[2rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden transform md:scale-105 z-10"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2FC7EA] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
              <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-semibold text-white tracking-widest uppercase mb-4">
                Destacado
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Agencia</h4>
              <p className="text-sm text-neutral-400 font-light mb-6">El ecosistema ideal para equipos de alto rendimiento.</p>
              <div className="mb-8">
                <span className="text-4xl font-light tracking-tighter text-white">$249</span>
                <span className="text-sm text-neutral-400">/mes</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Hasta 5 Usuarios', 'Sistema DesignOps Completo', 'Identidad Operativa (Carnets, Docs)', 'Soporte Prioritario', 'Actualizaciones Mensuales'].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-neutral-300 font-light">
                    <Check size={16} className="text-[#2FC7EA]" /> {feat}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-full bg-white text-sm font-semibold text-neutral-900 hover:bg-[#2FC7EA] hover:text-white transition-colors duration-300">
                Actualizar a Agencia
              </button>
            </motion.div>

            {/* Plan 3: Enterprise */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="bg-white/60 backdrop-blur-md rounded-[2rem] p-8 border border-neutral-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <h4 className="text-xl font-semibold text-neutral-900 mb-2">Enterprise</h4>
              <p className="text-sm text-neutral-500 font-light mb-6">Para infraestructuras masivas y franquicias.</p>
              <div className="mb-8">
                <span className="text-4xl font-light tracking-tighter text-neutral-900">Custom</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Usuarios Ilimitados', 'Auditoría de Marca Incluida', 'Integración CRM Personalizada', 'Consultoría Estratégica 1:1'].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-neutral-600 font-light">
                    <Check size={16} className="text-[#EF007E]" /> {feat}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-full border border-neutral-200 text-sm font-semibold text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors duration-300">
                Contactar Ventas
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#FAFAFA] py-12 border-t border-neutral-200/50 text-center relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
             <span className="font-semibold tracking-tight text-neutral-900 text-sm">signalNote</span>
          </div>
          <div className="text-[10px] font-semibold tracking-widest text-neutral-400 uppercase">
            Part of the <span className="text-neutral-800">SIGNAL</span> Ecosystem
          </div>
        </div>
      </footer>

    </div>
  );
}