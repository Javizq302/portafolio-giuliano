'use client';

import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';
import { getThemeColors } from '../utils/themeUtils';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const theme = getThemeColors();

  useEffect(() => {
    // Establecer isLoaded inmediatamente
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Mostrar el indicador después de un pequeño delay para asegurar que se renderice
    const showTimeout = setTimeout(() => {
      if (window.scrollY < 300) {
        setShowScrollIndicator(true);
      }
    }, 500);

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Mostrar el indicador solo cuando estamos en la parte superior (primeros 300px)
      // Ocultar cuando hacemos scroll hacia abajo
      if (scrollY < 300) {
        setShowScrollIndicator(true);
      } else {
        setShowScrollIndicator(false);
      }
    };

    // Verificar estado inicial
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(showTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      id="inicio"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fondo con gradientes sutiles */}
      <div className="absolute inset-0">
        {/* Gradiente base */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, var(--color-background) 0%, var(--color-background-secondary) 30%, var(--color-background-tertiary) 60%, var(--color-background-secondary) 100%)`,
          }}
        />

        {/* Capas de color sutiles */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(135deg, ${theme.primaryRgba(0.1)} 0%, ${theme.secondaryRgba(0.1)} 50%, ${theme.accentRgba(0.1)} 100%)`,
          }}
        />

        {/* Efectos de luz suaves */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: theme.primaryRgba(0.05) }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: theme.secondaryRgba(0.05) }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ backgroundColor: theme.accentRgba(0.02) }} />

        {/* Efecto de grain en el fondo - Ajusta opacity (0-1) y baseFrequency (0.5-2.0) para cambiar intensidad */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.5, // Ajusta este valor (0.1 = sutil, 0.5 = más intenso)
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      {/* Elementos decorativos organizados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
        {/* Líneas decorativas diagonales en esquinas */}
        <div
          className="absolute top-1/4 left-0 w-32 h-px opacity-20"
          style={{
            background: `linear-gradient(to right, transparent, ${theme.primaryRgba(0.3)}, transparent)`,
            transform: 'rotate(-45deg)',
            transformOrigin: 'left center',
          }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-40 h-px opacity-20"
          style={{
            background: `linear-gradient(to left, transparent, ${theme.secondaryRgba(0.3)}, transparent)`,
            transform: 'rotate(45deg)',
            transformOrigin: 'right center',
          }}
        />
        <div
          className="absolute top-0 right-1/3 w-24 h-px opacity-15"
          style={{
            background: `linear-gradient(to left, transparent, ${theme.accentRgba(0.3)}, transparent)`,
            transform: 'rotate(30deg)',
            transformOrigin: 'right center',
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-28 h-px opacity-15"
          style={{
            background: `linear-gradient(to right, transparent, ${theme.tertiaryRgba(0.3)}, transparent)`,
            transform: 'rotate(-30deg)',
            transformOrigin: 'left center',
          }}
        />

        {/* Líneas horizontales organizadas */}
        <div
          className="absolute top-1/5 left-1/4 w-24 h-px opacity-15"
          style={{
            background: `linear-gradient(to right, transparent, ${theme.primaryRgba(0.25)}, transparent)`,
          }}
        />
        <div
          className="absolute top-2/5 right-1/4 w-32 h-px opacity-15"
          style={{
            background: `linear-gradient(to left, transparent, ${theme.secondaryRgba(0.25)}, transparent)`,
          }}
        />
        <div
          className="absolute bottom-1/5 left-1/3 w-20 h-px opacity-15"
          style={{
            background: `linear-gradient(to right, transparent, ${theme.accentRgba(0.25)}, transparent)`,
          }}
        />
        <div
          className="absolute bottom-2/5 right-1/3 w-28 h-px opacity-15"
          style={{
            background: `linear-gradient(to left, transparent, ${theme.quaternaryRgba(0.25)}, transparent)`,
          }}
        />

        {/* Líneas verticales organizadas */}
        <div
          className="absolute top-1/4 left-1/5 h-32 w-px opacity-15"
          style={{
            background: `linear-gradient(to bottom, transparent, ${theme.primaryRgba(0.25)}, transparent)`,
          }}
        />
        <div
          className="absolute top-1/3 right-1/5 h-40 w-px opacity-15"
          style={{
            background: `linear-gradient(to bottom, transparent, ${theme.secondaryRgba(0.25)}, transparent)`,
          }}
        />
        <div
          className="absolute bottom-1/4 left-2/5 h-28 w-px opacity-15"
          style={{
            background: `linear-gradient(to top, transparent, ${theme.accentRgba(0.25)}, transparent)`,
          }}
        />
        <div
          className="absolute bottom-1/3 right-2/5 h-36 w-px opacity-15"
          style={{
            background: `linear-gradient(to top, transparent, ${theme.quaternaryRgba(0.25)}, transparent)`,
          }}
        />

        {/* Puntos decorativos organizados en cuadrícula */}
        {/* Fila superior */}
        <div
          className="absolute top-1/6 left-1/6 w-2 h-2 rounded-full opacity-20"
          style={{
            backgroundColor: theme.primaryRgba(0.5),
            boxShadow: `0 0 8px ${theme.primaryRgba(0.3)}`,
          }}
        />
        <div
          className="absolute top-1/6 left-1/2 w-2 h-2 rounded-full opacity-20"
          style={{
            backgroundColor: theme.secondaryRgba(0.5),
            boxShadow: `0 0 8px ${theme.secondaryRgba(0.3)}`,
          }}
        />
        <div
          className="absolute top-1/6 right-1/6 w-2 h-2 rounded-full opacity-20"
          style={{
            backgroundColor: theme.accentRgba(0.5),
            boxShadow: `0 0 8px ${theme.accentRgba(0.3)}`,
          }}
        />

        {/* Fila media superior */}
        <div
          className="absolute top-1/3 left-1/4 w-2.5 h-2.5 rounded-full opacity-25"
          style={{
            backgroundColor: theme.primaryRgba(0.5),
            boxShadow: `0 0 10px ${theme.primaryRgba(0.3)}`,
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-2.5 h-2.5 rounded-full opacity-25"
          style={{
            backgroundColor: theme.secondaryRgba(0.5),
            boxShadow: `0 0 10px ${theme.secondaryRgba(0.3)}`,
          }}
        />

        {/* Fila media */}
        <div
          className="absolute top-1/2 left-1/5 w-3 h-3 rounded-full opacity-20"
          style={{
            backgroundColor: theme.accentRgba(0.5),
            boxShadow: `0 0 12px ${theme.accentRgba(0.3)}`,
          }}
        />
        <div
          className="absolute top-1/2 right-1/5 w-3 h-3 rounded-full opacity-20"
          style={{
            backgroundColor: theme.quaternaryRgba(0.5),
            boxShadow: `0 0 12px ${theme.quaternaryRgba(0.3)}`,
          }}
        />

        {/* Fila media inferior */}
        <div
          className="absolute bottom-1/3 left-1/4 w-2.5 h-2.5 rounded-full opacity-25"
          style={{
            backgroundColor: theme.primaryRgba(0.5),
            boxShadow: `0 0 10px ${theme.primaryRgba(0.3)}`,
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 rounded-full opacity-25"
          style={{
            backgroundColor: theme.secondaryRgba(0.5),
            boxShadow: `0 0 10px ${theme.secondaryRgba(0.3)}`,
          }}
        />

        {/* Fila inferior */}
        <div
          className="absolute bottom-1/6 left-1/6 w-2 h-2 rounded-full opacity-20"
          style={{
            backgroundColor: theme.accentRgba(0.5),
            boxShadow: `0 0 8px ${theme.accentRgba(0.3)}`,
          }}
        />
        <div
          className="absolute bottom-1/6 left-1/2 w-2 h-2 rounded-full opacity-20"
          style={{
            backgroundColor: theme.quaternaryRgba(0.5),
            boxShadow: `0 0 8px ${theme.quaternaryRgba(0.3)}`,
          }}
        />
        <div
          className="absolute bottom-1/6 right-1/6 w-2 h-2 rounded-full opacity-20"
          style={{
            backgroundColor: theme.primaryRgba(0.5),
            boxShadow: `0 0 8px ${theme.primaryRgba(0.3)}`,
          }}
        />

        {/* Formas geométricas sutiles adicionales */}
        <div
          className="absolute top-1/3 right-1/4 w-2 h-2 rotate-45 opacity-30"
          style={{
            backgroundColor: theme.accentRgba(0.4),
            boxShadow: `0 0 20px ${theme.accentRgba(0.2)}`,
          }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-3 h-3 rounded-full opacity-25"
          style={{
            backgroundColor: theme.primaryRgba(0.4),
            boxShadow: `0 0 15px ${theme.primaryRgba(0.2)}`,
          }}
        />
        <div
          className="absolute top-2/5 left-2/3 w-2 h-2 rotate-45 opacity-25"
          style={{
            backgroundColor: theme.secondaryRgba(0.4),
            boxShadow: `0 0 15px ${theme.secondaryRgba(0.2)}`,
          }}
        />
        <div
          className="absolute bottom-2/5 right-2/3 w-2.5 h-2.5 rounded-full opacity-20"
          style={{
            backgroundColor: theme.quaternaryRgba(0.4),
            boxShadow: `0 0 12px ${theme.quaternaryRgba(0.2)}`,
          }}
        />
      </div>

      {/* Contenedor principal con layout moderno */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center min-h-screen pt-38 pb-20" style={{ paddingLeft: 'clamp(4rem, 8vw, 12rem)' }}>

        {/* Lado izquierdo - Texto */}
        <div
          className={`text-center lg:text-left space-y-8 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
        >
          <div className="space-y-6">
            <h1
              className="font-bold leading-tight flex flex-col"
              style={{ fontFamily: "Froople, Arial, sans-serif" }}
            >
              <span
                className="text-white block"
                style={{
                  fontFamily: "Froople, Arial, sans-serif",
                  letterSpacing: '0.04em',
                  fontSize: 'clamp(2.5rem, 5vw, 6rem)',
                }}
              >
                GIULIANO
              </span>
              <span
                className="block relative"
                style={{
                  fontFamily: "Froople, Arial, sans-serif",
                  color: '#ED961A',
                  letterSpacing: '0.04em',
                  fontSize: 'clamp(2.5rem, 5vw, 6rem)',
                  textShadow: '0 0 3px rgba(237, 150, 26, 0.2), 0 0 9px rgba(237, 150, 26, 0.1), 0 0 12px rgba(237, 150, 26, 0.1)',
                  paddingLeft: 'clamp(3rem, 6vw, 8rem)',
                  marginTop: 'clamp(-0.9rem, -2vw, -2rem)',
                }}
              >
                MEDINA
              </span>
            </h1>

            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="h-px w-16" style={{ background: `linear-gradient(to right, transparent, ${theme.primary}, ${theme.secondary})` }} />
              <p
                className="text-xl md:text-2xl lg:text-3xl text-gray-300 uppercase font-light"
                style={{ fontFamily: 'var(--font-inter)', letterSpacing: '0.03em' }}
              >
                Productora
              </p>
              <div className="h-px w-16" style={{ background: `linear-gradient(to left, transparent, ${theme.primary}, ${theme.secondary})` }} />
            </div>
          </div>

          <p
            className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Disfrutamos el proceso de convertir ideas en imágenes reales, sólidas y funcionales
          </p>

          {/* Badge sutil con información adicional */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start items-center pt-2">
            <div
              className="px-4 py-2 rounded-full text-sm backdrop-blur-sm border"
              style={{
                fontFamily: 'var(--font-inter)',
                borderColor: theme.primaryRgba(0.2),
                backgroundColor: theme.primaryRgba(0.05),
                color: theme.primaryRgba(0.8),
              }}
            >
              Visual Storyteller
            </div>
            <div
              className="px-4 py-2 rounded-full text-sm backdrop-blur-sm border"
              style={{
                fontFamily: 'var(--font-inter)',
                borderColor: theme.secondaryRgba(0.2),
                backgroundColor: theme.secondaryRgba(0.05),
                color: theme.secondaryRgba(0.8),
              }}
            >
              Videographer
            </div>
            <div
              className="px-4 py-2 rounded-full text-sm backdrop-blur-sm border"
              style={{
                fontFamily: 'var(--font-inter)',
                borderColor: theme.accentRgba(0.2),
                backgroundColor: theme.accentRgba(0.05),
                color: theme.accentRgba(0.8),
              }}
            >
              Creative Director
            </div>
            <div
              className="px-4 py-2 rounded-full text-sm backdrop-blur-sm border"
              style={{
                fontFamily: 'var(--font-inter)',
                borderColor: theme.quaternaryRgba(0.2),
                backgroundColor: theme.quaternaryRgba(0.05),
                color: theme.quaternaryRgba(0.8),
              }}
            >
              Color Grader
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
            <a
              href="#creative-cuts"
              className="px-8 py-4 font-semibold rounded-full transition-all duration-300"
              style={{
                fontFamily: 'var(--font-inter)',
                background: 'rgba(247, 152, 27, 0.87)',
                boxShadow: '0 5px 20px rgba(220, 190, 150, 0.2)',
                color: '#000000',
                backdropFilter: 'blur(10px)',
                border: '2px solid transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(247, 152, 27, 0.87)';
                e.currentTarget.style.background = 'rgba(215, 145, 55, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.background = 'rgba(247, 152, 27, 0.87)';
              }}
            >
              Ver Trabajos
            </a>
            <a
              href="#contacto"
              className="px-8 py-4 border-2 rounded-full transition-all duration-300 backdrop-blur-sm"
              style={{
                fontFamily: 'var(--font-inter)',
                borderColor: theme.primaryRgba(0.5),
                color: '#ffffff',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.primaryRgba(0.2);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Contacto
            </a>
          </div>
        </div>

        {/* Lado derecho - Imagen moderna */}
        <div
          className={`relative flex items-center justify-center transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
        >
          <div className="relative w-full max-w-md -mt-12">
            {/* Efecto de brillo de fondo */}
            <div className="absolute inset-0 rounded-3xl blur-3xl scale-110" style={{ background: `linear-gradient(135deg, ${theme.primaryRgba(0.1)}, ${theme.secondaryRgba(0.1)}, ${theme.accentRgba(0.1)})` }} />

            {/* Contenedor de imagen con diseño moderno */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg bg-gray-900">
              {/* Imagen principal */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden z-10">
                <div className="absolute inset-0" style={{ top: '-15%', bottom: '0' }}>
                  <Image
                    src="/images/hero/FotoGiulianoSinFondoGrain.webp"
                    alt="Giuliano Medina - Filmmaker"
                    fill
                    className="object-cover"
                    priority
                    quality={95}
                    style={{
                      filter: 'contrast(1.05)',
                      objectPosition: '99% center'
                    }}
                  />
                </div>

                {/* Overlay sutil solo en la parte inferior */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              {/* Imagen duplicada - debe estar visible encima del div interior azul pero debajo del borde */}
              <div
                className="absolute rounded-3xl overflow-hidden pointer-events-none"
                style={{
                  zIndex: 21,
                  top: '4px',
                  left: '4px',
                  right: '4px',
                  bottom: '4px',
                }}
              >
                <div className="relative w-full h-full" style={{ aspectRatio: '3/4' }}>
                  <div className="absolute inset-0" style={{ top: '-15%', bottom: '0' }}>
                    <Image
                      src="/images/hero/FotoGiulianoSinFondoGrain.webp"
                      alt=""
                      fill
                      className="object-cover"
                      priority
                      style={{
                        filter: 'contrast(1.05)',
                        objectPosition: '99% center'
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </div>

              {/* Borde con gradiente independiente encima de la foto */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  zIndex: 20,
                  background: 'linear-gradient(100deg, #f97316 25%, #f59e0b 50%, #3b82f6 75%, #06b6d4 100%)',
                  padding: '2px',
                }}
              >
                {/* Área interior que cubre el centro con el mismo fondo, ocultando el gradiente */}
                <div
                  className="rounded-3xl"
                  style={{
                    width: 'calc(100% - 4px)',
                    height: 'calc(100% - 4px)',
                    margin: '2px',
                    background: '#111827', // gray-900 - mismo que el contenedor
                    position: 'relative',
                    zIndex: -2,
                  }}
                />
              </div>
            </div>

            {/* Decoraciones flotantes */}
            <div className="absolute -top-6 -right-6 w-24 h-24 border-2 rounded-2xl rotate-12" style={{ borderColor: 'rgba(215, 145, 55, 0.5)' }} />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 border-2 rounded-2xl -rotate-12" style={{ borderColor: 'rgba(55, 122, 188, 0.3)' }} />

            {/* Puntos decorativos */}
            <div className="absolute top-1/4 -left-4 w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(55, 121, 188, 0.65)' }} />
            <div className="absolute bottom-1/4 -right-4 w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(215, 145, 55, 0.5)' }} />
            <div className="absolute top-1/2 -right-8 w-2 h-2 rounded-full" style={{ backgroundColor: 'rgba(128, 58, 11, 0.5)' }} />
          </div>
        </div>
      </div>

      {/* Indicador de scroll - esquina inferior derecha */}
      <div
        className={`fixed bottom-8 right-8 transition-opacity duration-700 z-50 ${isLoaded && showScrollIndicator ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        style={{
          willChange: 'opacity',
        }}
      >
        <a
          href="#creative-cuts"
          className="flex flex-col items-center gap-2 group cursor-pointer"
          style={{ textDecoration: 'none' }}
        >
          <span
            className="text-xs uppercase tracking-wider mb-2 transition-opacity"
            style={{
              fontFamily: 'var(--font-inter)',
              color: theme.primary,
              opacity: 0.8,
            }}
          >
            Scroll
          </span>
          <div
            className="w-px h-16 relative overflow-hidden"
            style={{
              background: `linear-gradient(to bottom, ${theme.primaryRgba(0.4)}, ${theme.secondaryRgba(0.4)}, ${theme.accentRgba(0.4)})`,
            }}
          >
            <div
              className="absolute top-0 left-0 w-full h-1/3 animate-scroll-indicator"
              style={{
                background: `linear-gradient(to bottom, ${theme.primary}, ${theme.secondary})`,
              }}
            />
          </div>
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              boxShadow: `0 0 15px ${theme.primaryRgba(0.7)}`,
            }}
          />
        </a>
      </div>

      <style jsx>{`
        @keyframes gradientText {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes scroll-indicator {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(300%);
            opacity: 0;
          }
        }
        
        .animate-scroll-indicator {
          animation: scroll-indicator 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
