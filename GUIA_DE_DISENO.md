# Guía de Diseño y Estructura (Design System)

Este documento establece las reglas fundamentales de diseño, estilos y estructura del proyecto **signalNote**. Su objetivo es garantizar la consistencia visual y técnica en todas las futuras actualizaciones o adiciones al código.

---

## 1. Filosofía de Diseño

- **Minimalismo Operativo:** Uso de espacios en blanco amplios, tipografía clara y reducción del ruido visual.
- **Glassmorphism (Efecto Cristal):** Se utiliza frecuentemente fondos translúcidos (`bg-white/60`, `bg-white/80`) combinados con desenfoque (`backdrop-blur-md` o `backdrop-blur-xl`) para dar profundidad sin usar sombras pesadas.
- **Micro-interacciones:** Todas las interacciones del usuario (hover, scroll) deben sentirse fluidas y "premium", al estilo Apple.

---

## 2. Paleta de Colores

### Colores Base (Sistema)
- **Fondo Global:** `#FAFAFA` (Gris extremadamente claro, casi blanco).
- **Textos Principales:** `text-neutral-900` para encabezados fuertes y legibilidad.
- **Textos Secundarios:** `text-neutral-500` para subtítulos, descripciones y placeholders.
- **Bordes Suaves:** `border-neutral-200/50` o `border-neutral-200/60` para delinear tarjetas de manera sutil.

### Colores de Acento (Ecosistema signalNote)
- **Cyan Signal:** `#2FC7EA` (Utilizado en orbes de luz, viñetas de marca y selección de texto).
- **Magenta Signal:** `#EF007E` (Utilizado para contraste en fondos y elementos de autoridad).

### Colores Dinámicos (Por Cliente)
Los proyectos del portafolio inyectan sus colores a través de la propiedad `brandConfig` (ej. `primary`, `gradientStart`, `gradientEnd`). Esto debe mantenerse dinámico mediante estilos en línea para sombras o textos.

---

## 3. Tipografía

El proyecto utiliza las fuentes predeterminadas del sistema a través de Tailwind, pero con pesos y combinaciones específicas:

- **Fuente Principal (Sans-serif):** Usada en la mayoría de la UI.
  - *Clases clave:* `font-sans`, `tracking-tight` o `tracking-tighter` para encabezados grandes.
- **Fuente Secundaria (Serif):** Usada estrictamente para generar contraste elegante (ej. "Sistemas que venden.").
  - *Clases clave:* `font-serif`, `italic`, `font-light`.
- **Micro-tipografía (Etiquetas y UI pequeña):** Usada en el navbar, etiquetas superiores y metadatos.
  - *Clases clave:* `text-[10px]` o `text-xs`, `uppercase`, `tracking-widest`, `font-semibold`.

---

## 4. Animaciones y Transiciones (Framer Motion)

Se utiliza `framer-motion` para garantizar que el movimiento se sienta natural.
**NUNCA usar transiciones lineales.**

- **Curva Estándar (Apple-like):** `ease: [0.16, 1, 0.3, 1]`
- **Duración base:** Entre `0.7s` y `1.2s` para elementos grandes de entrada.
- **Stagger:** Las listas (como las tarjetas Bento) deben aparecer secuencialmente usando `staggerChildren: 0.15` a `0.2`.

---

## 5. Estructura de Componentes

### Layouts Principales
- **Contenedores:** Se utiliza un ancho máximo estándar de `max-w-7xl` centrado con `mx-auto` y padding horizontal `px-6`.
- **Secciones:** Cada `<section>` debe tener un espaciado vertical amplio, típicamente `py-32`.

### Diseño Bento Box (Portafolio)
Las tarjetas de portafolio se organizan en un sistema de grilla de 12 columnas (`grid-cols-12`).
- Las tarjetas (`bentoItems`) usan el espacio basado en la propiedad `span` (ej. `col-span-12 md:col-span-8`).
- Tienen un efecto hover característico: `scale: 1.01` con una sombra dinámica coloreada por la marca y un resplandor de borde interno (`boxShadow: inset`).
- **Imágenes:** Las imágenes siempre cubren el contenedor completo con `object-cover` y un `overlay` en gradiente de negro a transparente para mantener el texto legible.

### Fondo Global (GlobalBackground)
No se deben usar colores planos para el cuerpo principal. El fondo siempre debe incluir:
1. Grid lineal (estilo papel milimetrado).
2. Orbes de luz desenfocados (`blur-[120px]`) fijos y animados con pulso (`animate-pulse`).

---

## 6. Reglas para Futuras Modificaciones

1. **No mezclar utilidades de CSS crudo:** Mantener el uso estricto de clases de Tailwind (v4) en todo lo posible.
2. **Consistencia en Hover:** Si agregas un botón o tarjeta nueva, DEBE tener un efecto de transición al pasar el cursor (ej. `hover:scale-[1.02]`, `hover:-translate-y-1`, o cambio de opacidad).
3. **Imágenes en la carpeta `/public`:** Todos los assets multimedia estáticos requeridos por los datos (`PROJECTS_DATA`) deben estar en la carpeta raíz `public` sin modificar su extensión referenciada.
4. **Respetar el Dark Mode:** Aunque el estado actual usa variables claras, los componentes base (`ProjectContent`) ya cuentan con lógica booleana `isDark` para cambiar entre modo oscuro/claro (ej. `text-white` vs `text-neutral-900`). Si creas un componente nuevo, considera sus dos variantes si aplica.
