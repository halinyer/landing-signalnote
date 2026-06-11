export interface BrandConfig {
  primary: string;
  gradientStart: string;
  gradientEnd: string;
  logoText: string;
  logoUrl: string | null;
}

export interface BentoItem {
  title: string;
  subtitle: string;
  span: string;
  height: string;
  imageUrl?: string | null;
}

export interface Project {
  id: string;
  clientName: string;
  category: string;
  brandConfig: BrandConfig;
  bentoItems: BentoItem[];
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'framework-01',
    clientName: 'Dream Home',
    category: 'Infraestructura Inmobiliaria',
    brandConfig: {
      primary: '#D6007A', // El Fucsia/Magenta de Dream Home
      gradientStart: 'rgba(214, 0, 122, 0.15)',
      gradientEnd: 'rgba(214, 0, 122, 0.02)',
      logoText: 'DH',
      logoUrl: '/Dream Home.png', 
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
        imageUrl: '/Gemini_Generated_Image_5fas4k5fas4k5fas.png' 
      },
      { 
        title: 'Autoridad / Gamificación', 
        subtitle: 'Top Cerrador del Mes', 
        span: 'col-span-12 md:col-span-5', 
        height: 'h-[400px]',
        imageUrl: '/Gemini_Generated_Image_w3o2qxw3o2qxw3o2.png' 
      },
      { 
        title: 'Cultura Organizacional', 
        subtitle: 'Día de las Madres', 
        span: 'col-span-12 md:col-span-7', 
        height: 'h-[400px]',
        imageUrl: '/ChatGPT Image Jun 10, 2026, 11_57_56 PM.png' 
      }
    ]
  },
  {
    id: 'framework-02',
    clientName: 'Dermaclinic Estética',
    category: 'Ecosistema Visual Médico',
    brandConfig: {
      primary: '#FF00D4',
      gradientStart: 'rgba(255, 0, 212, 0.12)',
      gradientEnd: 'rgba(255, 160, 122, 0.08)',
      logoText: 'DC',
      logoUrl: null, // Dejar en null activa el placeholder modular
    },
    bentoItems: [
      { title: 'Tratamientos', subtitle: 'Catálogo Visual', span: 'col-span-12 md:col-span-6', height: 'h-[400px]', imageUrl: null },
      { title: 'Antes/Después', subtitle: 'Comprobación', span: 'col-span-12 md:col-span-6', height: 'h-[400px]', imageUrl: null },
      { title: 'Autoridad', subtitle: 'Perfil Médico', span: 'col-span-12', height: 'h-[450px]', imageUrl: null }
    ]
  },
  {
    id: 'framework-03',
    clientName: 'Vanguard Realty',
    category: 'Diseño Editorial Inmobiliario',
    brandConfig: {
      primary: '#003366', // Deep Blue
      gradientStart: 'rgba(0, 51, 102, 0.15)',
      gradientEnd: 'rgba(212, 175, 55, 0.08)', // Gold touch
      logoText: 'VR',
      logoUrl: null, 
    },
    bentoItems: [
      { 
        title: 'Cierres & Conversión', 
        subtitle: 'Flyer de Reserva/Vendido', 
        span: 'col-span-12 md:col-span-8', 
        height: 'h-[500px]', 
        imageUrl: '/mockup_vendido.png' 
      },
      { 
        title: 'Identidad Operativa', 
        subtitle: 'Carnet de Agente', 
        span: 'col-span-12 md:col-span-4', 
        height: 'h-[500px]', 
        imageUrl: '/mockup_carnet.png' 
      },
      { 
        title: 'Autoridad / Gamificación', 
        subtitle: 'Top Cerrador del Mes', 
        span: 'col-span-12 md:col-span-5', 
        height: 'h-[400px]',
        imageUrl: '/mockup_topseller.png' 
      },
      { 
        title: 'Expansión de Marca', 
        subtitle: 'Banner Corporativo', 
        span: 'col-span-12 md:col-span-7', 
        height: 'h-[400px]',
        imageUrl: '/mockup_equipo.png' 
      }
    ]
  }
];
