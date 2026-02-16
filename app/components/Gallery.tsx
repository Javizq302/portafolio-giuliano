'use client';

import { getThemeColors } from '../utils/themeUtils';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Gallery() {
  const theme = getThemeColors();
  const accentColor = '#ec4899'; // Color rosa/magenta personalizado
  const secondaryColor = '#f59e0b'; // Color amarillo/naranja personalizado
  const tertiaryColor = '#10b981'; // Color verde personalizado
  const quaternaryColor = '#3b82f6'; // Color azul personalizado
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Función helper para convertir hex a rgba
  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="works"
      className="py-24 md:py-32 px-6 relative overflow-hidden"
      style={{
        background: 'transparent',
        position: 'relative',
      }}
    >
      {/* Efecto de grid animado de fondo */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(${theme.primary}40 1px, transparent 1px),
              linear-gradient(90deg, ${theme.primary}40 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite',
          }}
        />
      </div>

      {/* Líneas de conexión animadas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme.primary} stopOpacity="0" />
              <stop offset="50%" stopColor={accentColor} stopOpacity="0.5" />
              <stop offset="100%" stopColor={theme.secondary} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 0,50 Q 250,100 500,50 T 1000,50"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            style={{ animation: 'lineDraw 8s ease-in-out infinite' }}
          />
          <path
            d="M 0,150 Q 300,200 600,150 T 1200,150"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            style={{ animation: 'lineDraw 10s ease-in-out infinite reverse' }}
          />
        </svg>
      </div>

      {/* Partículas flotantes */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: theme.primary,
            opacity: Math.random() * 0.5 + 0.2,
            animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: `0 0 ${Math.random() * 10 + 5}px ${theme.primary}`,
          }}
        />
      ))}

      {/* Cursor follower effect */}
      <div
        className="absolute pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          width: isHovered ? '200px' : '100px',
          height: isHovered ? '200px' : '100px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.primaryRgba(0.1)} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          opacity: isHovered ? 0.8 : 0.3,
          zIndex: 1,
        }}
      />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Contenido principal centrado */}
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          {/* Título con efecto de glitch */}
          <div className="relative mb-8">
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 relative"
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                letterSpacing: '-0.02em',
              }}
            >
              <span
                className="block text-transparent bg-clip-text bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${secondaryColor} 0%, ${accentColor} 50%, ${theme.secondary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  textShadow: `0 0 80px ${theme.primaryRgba(0.5)}`,
                  filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.3))',
                }}
              >
                GALLERY
              </span>
              {/* Efecto de sombra duplicada para profundidad */}
              <span
                className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r blur-sm opacity-50"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${secondaryColor} 0%, ${accentColor} 50%, ${theme.secondary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  transform: 'translate(2px, 2px)',
                }}
              >
                Gallery
              </span>
            </h2>
          </div>

          {/* Línea decorativa animada */}
          <div className="relative w-48 h-1 mb-10 overflow-hidden">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${secondaryColor}, ${accentColor}, ${theme.secondary}, transparent)`,
                animation: 'shimmer 6s ease-in-out infinite',
              }}
            />
          </div>

          {/* Texto descriptivo */}
          <p
            className="text-lg md:text-xl mb-10 text-center max-w-2xl leading-relaxed"
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: 300,
            }}
          >
            Descubre mi universo creativo
            <br />
            <span style={{ color: accentColor, fontWeight: 400 }}>
              Cada proyecto es una historia única
            </span>
          </p>

          {/* Botón principal con efecto portal */}
          <Link
            href="/galeria"
            className="group relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Anillo exterior animado */}
            <div
              className="absolute inset-0 rounded-full border-2 transition-all duration-500"
              style={{
                borderColor: theme.primary,
                transform: isHovered ? 'scale(1.2) rotate(180deg)' : 'scale(1) rotate(0deg)',
                opacity: isHovered ? 0.5 : 0.3,
                animation: isHovered ? 'rotate 3s linear infinite' : 'none',
              }}
            />

            {/* Anillo medio */}
            <div
              className="absolute inset-0 rounded-full border transition-all duration-500"
              style={{
                borderColor: accentColor,
                transform: isHovered ? 'scale(1.1) rotate(-180deg)' : 'scale(1) rotate(0deg)',
                opacity: isHovered ? 0.7 : 0.4,
                animation: isHovered ? 'rotate 2s linear infinite reverse' : 'none',
              }}
            />

            {/* Botón principal */}
            <div
              className="relative px-12 py-5 rounded-full font-bold text-lg transition-all duration-500 overflow-hidden"
              style={{
                fontFamily: 'var(--font-inter)',
                background: isHovered
                  ? `linear-gradient(135deg, ${theme.primary}, ${accentColor}, ${theme.secondary})`
                  : `linear-gradient(135deg, ${theme.primaryRgba(0.2)}, ${theme.secondaryRgba(0.2)})`,
                color: '#ffffff',
                backdropFilter: 'blur(20px)',
                border: `2px solid ${isHovered ? accentColor : theme.primaryRgba(0.5)}`,
                boxShadow: isHovered
                  ? `0 0 40px ${theme.primaryRgba(0.6)}, 0 0 80px ${hexToRgba(accentColor, 0.4)}, inset 0 0 40px ${theme.primaryRgba(0.2)}`
                  : `0 10px 30px ${theme.primaryRgba(0.3)}`,
                transform: isHovered ? 'scale(1.05) translateY(-2px)' : 'scale(1)',
              }}
            >
              {/* Efecto de brillo interno */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, transparent 0%, ${hexToRgba(accentColor, 0.3)} 50%, transparent 100%)`,
                  animation: isHovered ? 'shimmer 2s ease-in-out infinite' : 'none',
                }}
              />

              <span className="relative z-10 flex items-center gap-3">
                <span>Explorar Galería</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform duration-500"
                  style={{ transform: isHovered ? 'translateX(5px)' : 'translateX(0)' }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            {/* Partículas que emanan del botón */}
            {isHovered && [...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: '50%',
                  top: '50%',
                  width: '4px',
                  height: '4px',
                  backgroundColor: accentColor,
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-60px)`,
                  animation: `particleFloat 1.5s ease-out forwards`,
                  animationDelay: `${i * 0.1}s`,
                  boxShadow: `0 0 10px ${accentColor}`,
                }}
              />
            ))}
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes lineDraw {
          0%, 100% { stroke-dasharray: 0, 1000; opacity: 0; }
          50% { stroke-dasharray: 1000, 0; opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(5px); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes particleFloat {
          0% { 
            opacity: 1; 
            transform: translate(-50%, -50%) translateY(0) scale(1);
          }
          100% { 
            opacity: 0; 
            transform: translate(-50%, -50%) translateY(-80px) scale(0);
          }
        }
      `}</style>
    </section>
  );
}
