'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const sections = [
    'Inicio',
    'Creative Cuts',
    'Still Frames',
    'Gallery',
    'Contacto',
  ];

  // Mapeo de secciones a sus IDs correspondientes
  const sectionIds = [
    'inicio',
    'creative-cuts',
    'still-frames',
    'works',
    'contacto',
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, color: 'rgb(55, 122, 188)' });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isManualHover, setIsManualHover] = useState(false);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pathname = usePathname();
  const detectActiveSectionRef = useRef<(() => void) | null>(null);
  const activeIndexRef = useRef<number | null>(null);

  // Tipo para el sistema de puntuación de secciones
  type SectionScore = { index: number; score: number };

  // Función para interpolar color basado en posición
  const getColorFromPosition = (position: number): string => {
    // Colores del gradiente del fondo: rgba(55, 122, 188, 0.3) 0%, rgba(48, 84, 192, 0.3) 50%, rgba(245, 158, 11, 0.3) 75%, rgba(128, 85, 11, 0.3) 100%
    const colors = [
      { r: 55, g: 122, b: 188, pos: 0 },
      { r: 48, g: 84, b: 192, pos: 50 },
      { r: 245, g: 158, b: 11, pos: 75 },
      { r: 128, g: 85, b: 11, pos: 100 },
    ];

    // Encontrar entre qué dos colores está la posición
    for (let i = 0; i < colors.length - 1; i++) {
      if (position >= colors[i].pos && position <= colors[i + 1].pos) {
        const range = colors[i + 1].pos - colors[i].pos;
        const t = (position - colors[i].pos) / range;

        const r = Math.round(colors[i].r + (colors[i + 1].r - colors[i].r) * t);
        const g = Math.round(colors[i].g + (colors[i + 1].g - colors[i].g) * t);
        const b = Math.round(colors[i].b + (colors[i + 1].b - colors[i].b) * t);

        return `rgb(${r}, ${g}, ${b})`;
      }
    }

    return 'rgb(55, 122, 188)';
  };

  const updateSliderPosition = (index: number) => {
    const link = linkRefs.current[index];
    if (link) {
      const container = link.parentElement;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        const left = linkRect.left - containerRect.left;
        const width = linkRect.width;

        // Calcular posición porcentual del centro del botón dentro del contenedor
        const centerPosition = ((left + width / 2) / containerRect.width) * 100;
        const color = getColorFromPosition(centerPosition);

        setSliderStyle({
          left,
          width,
          color,
        });
      }
    }
  };

  // Sincronizar el ref con el estado
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const indexToUse = hoveredIndex !== null ? hoveredIndex : activeIndex;
    if (indexToUse !== null) {
      updateSliderPosition(indexToUse);
    }
  }, [hoveredIndex, activeIndex]);

  // Detectar sección activa basada en scroll
  useEffect(() => {
    // Si estamos en la página /works o /galeria, establecer Gallery como activo
    if (pathname === '/works' || pathname === '/galeria') {
      const worksIndex = sections.indexOf('Gallery');
      if (worksIndex !== -1) {
        setActiveIndex(worksIndex);
      }
      return;
    }

    // Función para detectar qué sección está visible
    const detectActiveSection = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const viewportCenter = scrollPosition + windowHeight / 2;
      const viewportTop = scrollPosition;
      const viewportBottom = scrollPosition + windowHeight;

      // Si estamos en la parte superior de la página, activar Inicio
      if (scrollPosition < 300) {
        const inicioIndex = sections.indexOf('Inicio');
        if (inicioIndex !== -1) {
          setActiveIndex((prevIndex) => {
            if (prevIndex !== inicioIndex) {
              return inicioIndex;
            }
            return prevIndex;
          });
        }
        return;
      }

      // Buscar la sección más relevante usando un sistema de puntuación
      let bestSection: SectionScore | null = null;

      sectionIds.forEach((sectionId, index) => {
        const element = document.getElementById(sectionId);
        if (element) {
          // Debug temporal - remover después
          // if (sectionId === 'works') {
          //   console.log('Gallery detectado:', {
          //     rect: element.getBoundingClientRect(),
          //     scrollPosition,
          //     viewportCenter,
          //     index
          //   });
          // }
          const rect = element.getBoundingClientRect();
          const elementTop = scrollPosition + rect.top;
          const elementBottom = elementTop + rect.height;
          const elementCenter = elementTop + rect.height / 2;
          const elementHeight = rect.height;

          // Calcular qué parte de la sección está visible
          const visibleTop = Math.max(viewportTop, elementTop);
          const visibleBottom = Math.min(viewportBottom, elementBottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visiblePercentage = elementHeight > 0 ? (visibleHeight / elementHeight) * 100 : 0;

          // Calcular distancia del centro de la sección al centro del viewport
          const distanceFromCenter = Math.abs(viewportCenter - elementCenter);
          const normalizedDistance = distanceFromCenter / windowHeight; // Normalizar por altura del viewport

          // Calcular qué tan cerca está el top de la sección del top del viewport
          // Esto ayuda a detectar mejor cuando entramos a una sección
          const distanceFromTop = Math.abs(viewportTop - elementTop);
          const normalizedDistanceFromTop = distanceFromTop / windowHeight;

          // Sistema de puntuación: combinamos varios factores
          // Optimizado para detectar mejor secciones pequeñas
          let score = 0;

          // Si la sección está visible en el viewport
          if (rect.top < windowHeight && rect.bottom > 0) {
            // 1. Proximidad al centro del viewport (peso: 50% - más importante)
            // Para secciones pequeñas, esto es crucial
            const centerProximityScore = 1 - Math.min(normalizedDistance, 1);
            score += centerProximityScore * 0.5;

            // 2. Porcentaje visible (peso: 25%)
            // Para secciones pequeñas, incluso si están 100% visibles, pueden ser pequeñas
            score += (visiblePercentage / 100) * 0.25;

            // 3. Bonus grande si el centro está muy cerca del centro del viewport
            // Zona central ampliada: 50% del viewport (25% arriba y abajo del centro)
            const viewportCenterZone = windowHeight * 0.5;
            if (distanceFromCenter < viewportCenterZone) {
              // Bonus proporcional a qué tan cerca está del centro
              const zoneProximity = 1 - (distanceFromCenter / viewportCenterZone);
              score += zoneProximity * 0.4; // Bonus hasta 0.4 puntos
            }

            // 4. Bonus adicional si el centro de la sección está exactamente en el centro del viewport
            // (dentro de 10% del viewport)
            const exactCenterZone = windowHeight * 0.1;
            if (distanceFromCenter < exactCenterZone) {
              score += 0.3; // Bonus extra significativo
            }

            // 5. Puntuación basada en proximidad al top cuando la sección está entrando (peso: 10%)
            // Esto ayuda a detectar cuando entramos a una sección
            if (elementTop >= viewportTop && elementTop <= viewportCenter) {
              score += (1 - Math.min(normalizedDistanceFromTop, 1)) * 0.1;
            }

            // 6. Bonus para secciones pequeñas: si la altura es menor que el viewport
            // y está bien centrada, dar bonus adicional
            if (elementHeight < windowHeight * 0.8 && distanceFromCenter < windowHeight * 0.3) {
              score += 0.2; // Bonus para secciones pequeñas bien centradas
            }

            // 7. Bonus especial para Gallery: si está visible, dar bonus adicional
            if (sectionId === 'works' && rect.top < windowHeight && rect.bottom > 0) {
              score += 0.25; // Bonus especial para Gallery
            }
          }

          // Si esta sección tiene mejor puntuación, actualizar
          // Agregar bonus si es la sección actualmente activa (sistema de retención)
          let finalScore = score;
          if (activeIndexRef.current === index && score > 0.1) {
            // Bonus de retención: 30% extra si ya está activa (evita saltos rápidos)
            finalScore = score * 1.3;
          }

          if (finalScore > 0 && (!bestSection || finalScore > bestSection.score)) {
            bestSection = { index, score: finalScore };
          }
        }
      });

      // Si encontramos una sección con buena puntuación, actualizar el índice activo
      // Umbral reducido para detectar mejor secciones pequeñas
      if (bestSection !== null) {
        const section = bestSection as SectionScore;
        // Umbral aún más bajo para Gallery (índice 3)
        const threshold = section.index === 3 ? 0.1 : 0.15;
        if (section.score > threshold) {
          const selectedIndex = section.index;
          setActiveIndex((prevIndex) => {
            if (prevIndex !== selectedIndex) {
              return selectedIndex;
            }
            return prevIndex;
          });
        }
      }
    };

    // Guardar referencia a la función para usarla cuando se sale del hover
    detectActiveSectionRef.current = detectActiveSection;

    // Detectar sección activa al hacer scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      // Solo actualizar si no hay hover manual activo
      if (!isManualHover) {
        detectActiveSection();
      }
    };

    // Detectar sección activa inicial
    detectActiveSection();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, isManualHover]);

  return (
    <nav
      className="w-full fixed top-0 z-50 transition-all duration-500"
      style={{
        background: isScrolled
          ? `linear-gradient(135deg, #C5D0D9 0%, #A3B2BF 50%, #EBEFF2 100%)`
          : `linear-gradient(135deg, #C5D0D9 0%, #A3B2BF 50%, #EBEFF2 100%)`,
        backdropFilter: 'blur(20px)',
        borderBottom: '2px solid transparent',
        borderImage: 'linear-gradient(90deg, #06b6d4 25%, #3b82f6 50%, #f59e0b 75%, #f97316 100%) 1',
        // boxShadow: isScrolled ? `0 10px 40px rgba(234, 147, 32, 0.3)` : `0 4px 20px rgba(234, 147, 32, 0.2)`,
      }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'}`}>
          {/* Logo/Nombre */}
          <div className="flex items-center gap-3">
            <a href="/#inicio">
              <div className="relative w-10 h-10 md:w-12 md:h-12 transition-opacity hover:opacity-70 active:opacity-50 cursor-pointer">
                <Image
                  src="/images/LogoPortfolioNegro.png"
                  alt="Giuliano Medina Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </a>
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-orange-300 to-transparent" />
            <a
              href="/#inicio"
              className="text-sm md:text-base font-medium hidden sm:block transition-opacity hover:opacity-70"
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#000000',
              }}
            >
              Giuliano Medina
            </a>
          </div>

          {/* Menú de navegación */}
          <div className="hidden lg:flex items-center gap-2">
            <div
              className="rounded-full px-4 py-2 flex items-center gap-1 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, rgba(55, 122, 188, 0.3) 25%, rgba(48, 84, 192, 0.3) 50%, rgba(245, 158, 11, 0.3) 75%, rgba(128, 58, 11, 0.3) 100%)`,
                border: `1px solid rgba(245, 158, 11, 0.3)`,
              }}
            >
              {/* Slider background - color basado en posición del botón */}
              <div
                className="absolute top-0 h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  left: `${sliderStyle.left}px`,
                  width: `${sliderStyle.width}px`,
                  background: sliderStyle.color,
                  opacity: (hoveredIndex !== null || activeIndex !== null) ? 1 : 0,
                }}
              />
              {sections.map((section, index) => {
                // Determinar la URL según la sección (siempre absoluta para funcionar desde cualquier página)
                const href = `/#${sectionIds[index]}`;

                // Determinar si este link está activo (hover manual o automático)
                const isActive = hoveredIndex === index || (hoveredIndex === null && activeIndex === index);

                return (
                  <a
                    key={section}
                    ref={(el) => { linkRefs.current[index] = el; }}
                    href={href}
                    className="text-xs md:text-sm transition-all duration-300 font-medium relative z-10 px-3 py-1.5 rounded-full"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      color: isActive ? '#ffffff' : '#000000',
                    }}
                    onMouseEnter={(e) => {
                      setIsManualHover(true);
                      setHoveredIndex(index);
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      setIsManualHover(false);
                      setHoveredIndex(null);
                      e.currentTarget.style.color = '#000000';
                      // Actualizar sección activa inmediatamente al salir del hover
                      if (detectActiveSectionRef.current) {
                        detectActiveSectionRef.current();
                      }
                    }}
                  >
                    {section}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Menú móvil - Botón hamburguesa */}
          <button
            className="lg:hidden p-2 rounded-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
            }}
          >
            <div className="w-6 h-0.5 mb-1.5" style={{ background: 'linear-gradient(to right, #8b5cf6, #ec4899)' }} />
            <div className="w-6 h-0.5 mb-1.5" style={{ background: 'linear-gradient(to right, #8b5cf6, #ec4899)' }} />
            <div className="w-6 h-0.5" style={{ background: 'linear-gradient(to right, #8b5cf6, #ec4899)' }} />
          </button>
        </div>
      </div>

      {/* Línea decorativa inferior con gradiente estático */}
      <div className="absolute bottom-0 left-0 right-0 h-1">
        <div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(90deg, #06b6d4 25%, #3b82f6 50%, #f59e0b 75%, #f97316 100%)',
          }}
        />
      </div>
    </nav>
  );
}
