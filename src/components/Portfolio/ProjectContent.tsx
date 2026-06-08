import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';
import type { Project } from '../../data/projects';

interface ProjectContentProps {
  project: Project;
  isDark?: boolean;
}

export const ProjectContent = ({ project, isDark = false }: ProjectContentProps) => {
  const textColor = isDark ? 'text-white' : 'text-neutral-900';
  const subTextColor = isDark ? 'text-neutral-400' : 'text-neutral-500';
  const bgColor = isDark ? 'bg-neutral-900/50 backdrop-blur-xl' : 'bg-white';
  const headerBgColor = isDark ? 'bg-neutral-950/40' : 'bg-[#FAFAFA]';
  const borderColor = isDark ? 'border-white/10' : 'border-neutral-200';
  const innerBorderColor = isDark ? 'border-white/5' : 'border-neutral-100';
  const mutedBgColor = isDark ? 'bg-neutral-950/80' : 'bg-[#F8F8F7]';
  const mockupBgColor = isDark ? 'bg-neutral-900' : 'bg-neutral-100';
  const mockupBorderColor = isDark ? 'border-white/5' : 'border-neutral-200/60';
  const mockupHoverBg = isDark ? 'group-hover:bg-neutral-800' : 'group-hover:bg-neutral-200/50';

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full relative z-10 ${bgColor} border ${borderColor} shadow-sm rounded-2xl overflow-hidden transition-colors duration-500`}
    >
      {/* 1. BRAND HEADER (Estilo Dossier) */}
      <div className={`p-12 md:p-20 flex flex-col items-center justify-center border-b ${innerBorderColor} ${headerBgColor} transition-colors duration-500`}>
        <div className={`w-24 h-24 mb-6 rounded-2xl ${isDark ? 'bg-neutral-900 border-white/10' : 'bg-white border-neutral-100'} shadow-sm border flex flex-col items-center justify-center transition-colors duration-500 overflow-hidden`}>
            {project.brandConfig.logoUrl ? (
                <img src={project.brandConfig.logoUrl} alt={`${project.clientName} Logo`} className={`max-w-full max-h-full object-contain ${isDark ? '' : 'mix-blend-multiply'}`} />
            ) : (
                <span className={`text-3xl font-serif italic ${isDark ? 'text-neutral-300' : 'text-neutral-800'}`}>{project.brandConfig.logoText}</span>
            )}
        </div>
        <h2 className={`text-4xl md:text-5xl font-light tracking-tight ${textColor} mb-4 text-center transition-colors duration-500`}>
          {project.clientName}
        </h2>
        <span className={`text-[10px] font-semibold tracking-widest uppercase ${subTextColor} px-4 py-1.5 border ${innerBorderColor} rounded-full ${isDark ? 'bg-neutral-900' : 'bg-white'} transition-colors duration-500`}>
          {project.category}
        </span>
      </div>

      {/* 2. SYSTEM DNA (Color & Typography) */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 border-b ${innerBorderColor} divide-y lg:divide-y-0 lg:divide-x ${isDark ? 'divide-white/5' : 'divide-neutral-100'}`}>
        
        {/* Color Palette */}
        <div className="p-12">
          <h4 className={`text-[10px] font-semibold tracking-widest uppercase ${subTextColor} mb-8`}>Color Palette</h4>
          <div className="flex gap-6">
            <div className="flex flex-col items-center gap-3">
              <div className={`w-16 h-16 rounded-full shadow-sm border ${innerBorderColor}`} style={{ backgroundColor: project.brandConfig.primary }}></div>
              <span className={`text-xs ${subTextColor} font-mono`}>{project.brandConfig.primary}</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className={`w-16 h-16 rounded-full shadow-sm border ${innerBorderColor} ${isDark ? 'bg-neutral-100' : 'bg-neutral-900'}`}></div>
              <span className={`text-xs ${subTextColor} font-mono`}>{isDark ? '#F5F5F5' : '#111111'}</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className={`w-16 h-16 rounded-full shadow-sm border ${innerBorderColor} ${isDark ? 'bg-neutral-800' : 'bg-white'}`}></div>
              <span className={`text-xs ${subTextColor} font-mono`}>{isDark ? '#262626' : '#FFFFFF'}</span>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className={`p-12 ${isDark ? 'bg-neutral-900/80 text-neutral-200' : 'bg-neutral-900 text-white'} flex items-center`}>
          <div className="w-full">
            <h4 className="text-[10px] font-semibold tracking-widest uppercase text-neutral-500 mb-6">Typography</h4>
            <div className="flex items-end gap-6 border-b border-neutral-800 pb-6">
              <span className="text-7xl font-light leading-none">Aa</span>
              <div>
                <p className="text-sm font-medium mb-1">Inter / Primary</p>
                <p className="text-[10px] text-neutral-500 font-mono">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. IMPLEMENTATION GRID (El Auto-Mockup) */}
      <div className={`p-6 md:p-12 ${mutedBgColor} transition-colors duration-500`}>
        <h4 className={`text-[10px] font-semibold tracking-widest uppercase ${subTextColor} mb-8 text-center`}>Visual Assets</h4>
        
        <div className="grid grid-cols-12 gap-6">
          {project.bentoItems.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 0.995 }}
              className={`flex flex-col ${item.span} group`}
            >
              {/* EL CONTENEDOR AUTO-MOCKUP */}
              <div className={`w-full ${item.height} ${mockupBgColor} border ${mockupBorderColor} rounded-xl p-8 md:p-12 flex items-center justify-center overflow-hidden transition-colors duration-500 ${mockupHoverBg}`}>
                
                {/* SI HAY IMAGEN, SE COMPORTA COMO UN PAPEL FÍSICO */}
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className={`max-w-full max-h-full object-contain ${isDark ? 'shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]' : 'shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]'} transition-shadow duration-500`} 
                  />
                ) : (
                  <div className={`text-center flex flex-col items-center ${isDark ? 'opacity-20' : 'opacity-40'}`}>
                    <ImageIcon size={32} className={`${subTextColor} mb-3`} />
                    <span className={`text-xs font-mono ${subTextColor}`}>{item.title} (Insertar JPG)</span>
                  </div>
                )}

              </div>
              <div className="mt-4 flex justify-between items-center px-2">
                <h4 className={`text-sm font-medium ${textColor}`}>{item.title}</h4>
                <p className={`text-xs ${subTextColor} font-serif italic`}>{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </motion.div>
  );
};
