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
        imageUrl: '/Recurso 18historia zoom.webp' 
      },
      { 
        title: 'Identidad Operativa', 
        subtitle: 'Carnet Corporativo', 
        span: 'col-span-12 md:col-span-4', 
        height: 'h-[500px]', 
        imageUrl: '/Gemini_Generated_Image_5fas4k5fas4k5fas.webp' 
      },
      { 
        title: 'Autoridad / Gamificación', 
        subtitle: 'Top Cerrador del Mes', 
        span: 'col-span-12 md:col-span-5', 
        height: 'h-[400px]',
        imageUrl: '/Gemini_Generated_Image_w3o2qxw3o2qxw3o2.webp' 
      },
      { 
        title: 'Cultura Organizacional', 
        subtitle: 'Día de las Madres', 
        span: 'col-span-12 md:col-span-7', 
        height: 'h-[400px]',
        imageUrl: '/ChatGPT Image Jun 10, 2026, 11_57_56 PM.webp' 
      }
    ]
  }
];
