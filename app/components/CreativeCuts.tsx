'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getThemeColors } from '../utils/themeUtils';

const CDN = process.env.NEXT_PUBLIC_BUNNY_CDN_URL ?? '';

export default function CreativeCuts() {
  const theme = getThemeColors();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>>([]);
  const [shootingStars, setShootingStars] = useState<Array<{ id: number; x: number; y: number; angle: number; duration: number; length: number; curvature: number }>>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const shootingStarId = useRef(0);
  const [scrollY, setScrollY] = useState(0);

  // ── Scroll listener for metallic reflection ──
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Solo 2 videos
  const videos = [
    {
      id: 1,
      src: `${CDN}/videos/intencion-creativecut.mp4`,
      title: ' ',
      category: ' ',
    },
  ];

  // Generar estrellas al montar
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 80; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          delay: Math.random() * 5,
          duration: Math.random() * 3 + 2
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []);

  // Generar estrellas fugaces periódicamente
  useEffect(() => {
    const createShootingStar = () => {
      // Posiciones variadas: desde el borde superior o izquierdo
      const variant = Math.random();
      let x: number, y: number, angle: number;

      if (variant < 0.45) {
        // Desde el borde superior, cayendo hacia abajo-derecha
        x = Math.random() * 50 + 10;
        y = -5;
        angle = Math.random() * 25 + 30; // 30-55°
      } else if (variant < 0.75) {
        // Desde la esquina superior izquierda
        x = -5;
        y = Math.random() * 20 + 5;
        angle = Math.random() * 20 + 25; // 25-45°
      } else {
        // Desde el borde superior derecho, cayendo hacia abajo-izquierda (más raro)
        x = Math.random() * 30 + 60;
        y = -5;
        angle = Math.random() * 15 + 35; // 35-50°
      }

      // Velocidad variada pero rápida (1.2s a 2.5s)
      const duration = Math.random() * 1.3 + 1.2;

      // Largo de la cola variado
      const length = Math.random() * 100 + 100; // 100-200px

      // Curvatura sutil aleatoria (-8 a 8px de desviación perpendicular)
      const curvature = (Math.random() - 0.5) * 16;

      const newStar = {
        id: shootingStarId.current++,
        x, y, angle, duration, length, curvature,
      };
      setShootingStars(prev => [...prev, newStar]);

      // Remover después de la animación
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== newStar.id));
      }, (duration + 0.5) * 1000);
    };

    // Primera estrella fugaz después de 2 segundos
    const initialTimeout = setTimeout(createShootingStar, 2000);

    // Crear una nueva cada 4-8 segundos
    const interval = setInterval(() => {
      createShootingStar();
    }, Math.random() * 4000 + 4000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const openGallery = (index: number) => {
    setCurrentVideoIndex(index);
    setIsGalleryOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = useCallback(() => {
    setIsGalleryOpen(false);
    document.body.style.overflow = 'unset';
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const nextVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  }, [videos.length]);

  const prevVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, [videos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isGalleryOpen) return;
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') nextVideo();
      if (e.key === 'ArrowLeft') prevVideo();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGalleryOpen, closeGallery, nextVideo, prevVideo]);

  useEffect(() => {
    if (isGalleryOpen && videoRef.current) {
      videoRef.current.load();
    }
  }, [currentVideoIndex, isGalleryOpen]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    const video = previewRefs.current[index];
    if (video) {
      video.play().catch(() => { });
    }
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);
    const video = previewRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section
      id="creative-cuts"
      className="py-24 md:py-36 px-6 relative overflow-hidden min-h-screen flex items-center"
      style={{
        background: `linear-gradient(180deg, #0a0a0f 0%, #0d0d15 50%, #0a0a0f 100%)`,
      }}
    >
      {/* Capa de estrellas fijas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white star-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.5)`,
            }}
          />
        ))}
      </div>

      {/* Estrellas fugaces */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {shootingStars.map((star) => (
          <div
            key={star.id}
            className="absolute"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              transform: `rotate(${star.angle}deg)`,
              transformOrigin: '0 0',
            }}
          >
            <div
              className="shooting-star-trail"
              style={{
                animationDuration: `${star.duration}s`,
                width: `${star.length}px`,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ['--curve' as any]: `${star.curvature}px`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Nebulosas sutiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20"
          style={{ backgroundColor: theme.primaryRgba(0.3) }}
        />
        <div
          className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15"
          style={{ backgroundColor: theme.accentRgba(0.3) }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[100px] opacity-10"
          style={{ backgroundColor: theme.secondaryRgba(0.2) }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Título de sección */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-block relative">
            <h2
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              <span className="text-white">Creative</span>{' '}
              <span
                className="relative inline-block"
                style={{
                  backgroundImage: `linear-gradient(90deg, #6B7280 0%, #C0C7D0 15%, #FFFFFF 30%, #4B5563 45%, #D4D8DE 60%, #FFFFFF 75%, #A0A8B4 90%, #6B7280 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 100%',
                  backgroundPosition: `${(scrollY * 0.08) % 100}% 0%`,
                }}
              >
                Cut
              </span>
            </h2>
            {/* Línea decorativa con estrellas */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/30" />
              <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
              <div className="h-px w-32 bg-gradient-to-r from-white/30 via-white/50 to-white/30" />
              <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/30" />
            </div>
          </div>
          <p
            className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Llégale a lo que planteamos
          </p>
        </div>

        {/* Grid de 1 video cuadrado */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 md:gap-12 max-w-md mx-auto">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="creative-card group relative aspect-square rounded-3xl overflow-hidden cursor-pointer"
              onClick={() => openGallery(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {/* Borde con gradiente */}
              <div
                className="absolute inset-0 rounded-3xl p-[2px] z-0"
                style={{
                  background: `#958D9E`,
                }}
              >
                <div className="absolute inset-[2px] rounded-3xl bg-[#0a0a0f]" />
              </div>

              {/* Contenido interno */}
              <div className="absolute inset-[3px] rounded-3xl overflow-hidden z-10">
                {/* Video preview */}
                <video
                  ref={(el) => { previewRefs.current[index] = el; }}
                  src={video.src}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  playsInline
                  preload="metadata"
                  muted
                  loop
                />

                {/* Portada negra que se desvanece en hover */}
                <div
                  className="absolute inset-0 z-[5] transition-opacity duration-500 pointer-events-none"
                  style={{
                    backgroundColor: '#000',
                    opacity: hoveredIndex === index ? 0 : 1,
                  }}
                />

                {/* Overlay gradiente */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(180deg, transparent 0%, transparent 50%, rgba(0,0,0,0.8) 100%)',
                  }}
                />

                {/* Overlay hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${theme.primaryRgba(0.2)} 0%, transparent 70%)`,
                  }}
                />

                {/* Icono de play central */}
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                  <div
                    className="relative bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-full border-2 border-white/50 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-110"
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="ml-1 transition-transform duration-300 group-hover:scale-110"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>

                    {/* Anillo pulsante */}
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 animate-ping"
                      style={{
                        border: '2px solid white',
                        animationDuration: '2s'
                      }}
                    />
                  </div>
                </div>

                {/* Info del video */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                  <span
                    className="text-xs md:text-sm font-semibold uppercase tracking-widest mb-2 block opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ color: theme.accent }}
                  >
                    {video.category}
                  </span>
                  <h3
                    className="text-xl md:text-2xl font-bold text-white"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {video.title}
                  </h3>
                </div>

                {/* Efecto de brillo */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                  <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:animate-shine" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .star-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        /* Shooting star trail - the tail gradient */
        .shooting-star-trail {
          height: 2px;
          position: relative;
          opacity: 0;
          animation: shootStar ease-out forwards;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0) 0%,
            rgba(200,210,255,0.05) 15%,
            rgba(200,210,255,0.15) 35%,
            rgba(220,230,255,0.4) 60%,
            rgba(240,245,255,0.75) 82%,
            rgba(255,255,255,1) 100%
          );
          border-radius: 100px;
          filter: blur(0.3px);
        }

        /* Bright glowing head of the shooting star */
        .shooting-star-trail::before {
          content: '';
          position: absolute;
          right: -2px;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, #fff 0%, rgba(200,220,255,0.9) 40%, rgba(180,200,255,0.4) 70%, transparent 100%);
          border-radius: 50%;
          box-shadow:
            0 0 6px 2px rgba(255,255,255,0.95),
            0 0 14px 5px rgba(200,220,255,0.6),
            0 0 30px 8px rgba(180,200,255,0.25);
        }

        /* Subtle secondary glow around the tail */
        .shooting-star-trail::after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 60%;
          height: 8px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(200,220,255,0.03) 40%,
            rgba(200,220,255,0.08) 70%,
            rgba(220,240,255,0.12) 100%
          );
          border-radius: 100px;
          filter: blur(3px);
        }

        @keyframes shootStar {
          0% {
            transform: translateX(0) translateY(0) scaleX(0.3);
            opacity: 0;
          }
          8% {
            opacity: 1;
            transform: translateX(8vw) translateY(0) scaleX(1);
          }
          40% {
            transform: translateX(35vw) translateY(var(--curve, 0px)) scaleX(1);
            opacity: 0.9;
          }
          75% {
            opacity: 0.5;
            transform: translateX(70vw) translateY(calc(var(--curve, 0px) * 0.3)) scaleX(0.8);
          }
          100% {
            transform: translateX(110vw) translateY(0) scaleX(0.4);
            opacity: 0;
          }
        }

        .creative-card {
          animation: fadeInUp 0.8s ease-out forwards;
          box-shadow: 0 25px 80px -20px rgba(0, 0, 0, 0.8);
          transition: box-shadow 0.5s ease, transform 0.5s ease;
        }

        .creative-card:hover {
          box-shadow: 0 35px 100px -20px ${theme.primaryRgba(0.3)}, 0 0 60px -10px ${theme.accentRgba(0.2)};
          transform: translateY(-10px);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shine {
          from {
            transform: translateX(-100%) skewX(-12deg);
          }
          to {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        .group-hover\\:animate-shine {
          animation: shine 0.8s ease-out;
        }
      `}</style>

      {/* Galería Modal */}
      {isGalleryOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/98 backdrop-blur-xl flex items-center justify-center"
          onClick={closeGallery}
        >
          {/* Estrellas en el modal también */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            {stars.slice(0, 30).map((star) => (
              <div
                key={star.id}
                className="absolute rounded-full bg-white star-twinkle"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size * 0.8}px`,
                  height: `${star.size * 0.8}px`,
                  animationDelay: `${star.delay}s`,
                  animationDuration: `${star.duration}s`,
                }}
              />
            ))}
          </div>

          {/* Botón cerrar */}
          <button
            onClick={closeGallery}
            className="absolute top-6 right-6 z-50 text-white hover:text-gray-300 transition-all duration-300 cursor-pointer bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full w-14 h-14 flex items-center justify-center group"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-300 group-hover:rotate-90"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Contenedor del video */}
          <div
            className="relative w-full h-full max-w-7xl mx-auto px-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón anterior */}
            <button
              onClick={prevVideo}
              className="absolute left-4 md:left-8 z-50 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer group"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Video principal - vertical */}
            <div className="relative flex items-center justify-center" style={{ maxHeight: '85vh' }}>
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  boxShadow: `0 0 120px ${theme.primaryRgba(0.3)}`,
                  aspectRatio: '9 / 16',
                  height: '85vh',
                  maxWidth: '100%',
                }}
              >
                <video
                  ref={videoRef}
                  src={videos[currentVideoIndex].src}
                  className="w-full h-full object-contain bg-black"
                  controls
                  playsInline
                  autoPlay
                />
              </div>
            </div>

            {/* Botón siguiente */}
            <button
              onClick={nextVideo}
              className="absolute right-4 md:right-8 z-50 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer group"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Info y navegación inferior */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center gap-4">
              {/* Título del video */}
              <div className="text-center">
                <span className="text-sm uppercase tracking-widest" style={{ color: theme.accent }}>
                  {videos[currentVideoIndex].category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  {videos[currentVideoIndex].title}
                </h3>
              </div>

              {/* Indicadores */}
              <div className="flex items-center gap-3">
                {videos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentVideoIndex(idx)}
                    className={`transition-all duration-300 cursor-pointer rounded-full ${idx === currentVideoIndex
                      ? 'w-10 h-3'
                      : 'w-3 h-3 hover:opacity-100 opacity-50'
                      }`}
                    style={{
                      backgroundColor: idx === currentVideoIndex ? theme.accent : 'white'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
