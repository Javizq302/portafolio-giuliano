'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { getThemeColors } from '../utils/themeUtils';

const CDN = process.env.NEXT_PUBLIC_BUNNY_CDN_URL ?? '';

export default function StillFrames() {
  const theme = getThemeColors();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>>([]);

  // Generar estrellas al montar
  useEffect(() => {
    const newStars = [];
    for (let i = 0; i < 60; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      });
    }
    setStars(newStars);
  }, []);

  // New Data Structure for 8 items: 3 Horizontal, 4 Vertical, 1 Square
  // Order optimized for correct packing in a 3-column dense grid:
  // 1. V1 (Vertical)
  // 2. H1 (Horizontal)
  // 3. V2 (Vertical)
  // 4. V3 (Vertical)
  // 5. S1 (Square)
  // 6. H2 (Horizontal)
  // 7. V4 (Vertical)
  // 8. H3 (Horizontal)
  const projects = [
    {
      id: 1,
      src: `${CDN}/images/stillframes/still_frames_1ver.webp`,
      title: ' ',
      category: ' ',
      format: 'vertical'
    },
    {
      id: 2,
      src: `${CDN}/images/stillframes/still_frames_1h.webp`,
      alt: ' ',
      title: ' ',
      category: ' ',
      format: 'horizontal'
    },
    {
      id: 3,
      src: `${CDN}/images/stillframes/still_frames_2ver.webp`,
      alt: ' ',
      title: ' ',
      category: ' ',
      format: 'vertical'
    },
    {
      id: 4,
      src: `${CDN}/images/stillframes/still_frames_3v.webp`,
      alt: ' ',
      title: ' ',
      category: ' ',
      format: 'vertical'
    },
    {
      id: 5,
      src: `${CDN}/images/stillframes/still_frames_1q.webp`,
      alt: ' ',
      title: ' ',
      category: ' ',
      format: 'square'
    },
    {
      id: 6,
      src: `${CDN}/images/stillframes/still_frames_2h.webp`, // Reusing
      alt: ' ',
      title: ' ',
      category: ' ',
      format: 'horizontal'
    },
    {
      id: 7,
      src: `${CDN}/images/stillframes/sd.webp`, // Reusing
      alt: ' ',
      title: ' ',
      category: ' ',
      format: 'vertical'
    },
    {
      id: 8,
      src: `${CDN}/images/stillframes/still_frames_3h.webp`, // Reusing
      alt: ' ',
      title: ' ',
      category: ' ',
      format: 'horizontal'
    },
  ];

  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = useCallback(() => {
    setIsGalleryOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isGalleryOpen) return;
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGalleryOpen, closeGallery, nextImage, prevImage]);

  return (
    <section
      id="still-frames"
      className="py-12 md:py-20 px-6 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, var(--color-background-secondary) 0%, var(--color-background-tertiary) 50%, var(--color-background-secondary) 100%)`,
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: theme.accentRgba(0.1) }} />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: theme.tertiaryRgba(0.1) }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Title */}
        <div className="text-center mb-10">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            <span className="text-white">Still</span>{' '}
            <span
              style={{
                color: theme.secondary,
                backgroundImage: `linear-gradient(135deg, ${theme.secondary}, ${theme.accent})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                textShadow: `0 0 80px ${theme.primaryRgba(0.5)}`,
                filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.3))',
              }}
            >
              Frames
            </span>
          </h2>
          <div className="h-1 w-32 mx-auto rounded-full" style={{ background: `linear-gradient(to right, transparent, ${theme.accent}, ${theme.tertiary}, transparent)` }} />
        </div>

        {/* Puzzle Collage */}
        <div className="still-frames-collage">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`still-frame-card format-${project.format} group`}
            >
              <div
                className="relative w-full h-full rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                onClick={() => openGallery(index)}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={project.src}
                    alt={project.alt || project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay - Darkens on hover */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />

                  {/* Click to view - Hover */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div
                      className="bg-transparent border border-white/50 px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 ease-out backdrop-blur-sm"
                    >
                      <span
                        className="text-sm font-medium uppercase tracking-widest text-white"
                      >
                        Ver
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .still-frames-collage {
          display: grid;
          grid-template-columns: repeat(1, 1fr); /* Mobile default */
          gap: 1rem;
        }

        .still-frame-card {
          position: relative;
          min-height: 300px;
        }

        /* Tablet Layout (2 Cols + Auto Flow) */
        @media (min-width: 640px) and (max-width: 1023px) {
          .still-frames-collage {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-flow: dense;
          }
          
          .format-horizontal {
            grid-column: span 2;
          }
          
          .format-vertical {
            grid-row: span 2;
          }
        }

        /* Desktop Layout (Fixed 3x5 Grid) */
        @media (min-width: 1024px) {
          .still-frames-collage {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(5, 300px); /* Fixed row height */
          }
          
          /* Specific Grid Assignments for 3x5 Puzzle */
          
          /* Item 1: Vertical 1 (Top Left) */
          .still-frames-collage > :nth-child(1) {
            grid-column: 1 / 2;
            grid-row: 1 / 3;
          }
          /* ... rest of desktop styles ... */
          /* Item 2: Horizontal 1 (Top Right) */
          .still-frames-collage > :nth-child(2) {
            grid-column: 2 / 4;
            grid-row: 1 / 2;
          }

          /* Item 3: Vertical 2 (Middle Center) */
          .still-frames-collage > :nth-child(3) {
            grid-column: 2 / 3;
            grid-row: 2 / 4;
          }

          /* Item 4: Vertical 3 (Middle Right) */
          .still-frames-collage > :nth-child(4) {
            grid-column: 3 / 4;
            grid-row: 2 / 4;
          }

          /* Item 5: Square 1 (Middle Left) */
          .still-frames-collage > :nth-child(5) {
            grid-column: 1 / 2;
            grid-row: 3 / 4;
          }

          /* Item 6: Horizontal 2 (Bottom Left) */
          .still-frames-collage > :nth-child(6) {
            grid-column: 1 / 3;
            grid-row: 4 / 5;
          }

          /* Item 7: Vertical 4 (Bottom Right) */
          .still-frames-collage > :nth-child(7) {
            grid-column: 3 / 4;
            grid-row: 4 / 6;
          }

          /* Item 8: Horizontal 3 (Bottom Left - Row 5) */
          .still-frames-collage > :nth-child(8) {
            grid-column: 1 / 3;
            grid-row: 5 / 6;
          }
        }

        .sf-star-twinkle {
          animation: sfTwinkle 3s ease-in-out infinite;
        }

        @keyframes sfTwinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/98 backdrop-blur-xl flex items-center justify-center"
          onClick={closeGallery}
        >
          {/* Estrellas en el modal */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            {stars.map((star) => (
              <div
                key={star.id}
                className="absolute rounded-full bg-white sf-star-twinkle"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size * 0.8}px`,
                  height: `${star.size * 0.8}px`,
                  animationDelay: `${star.delay}s`,
                  animationDuration: `${star.duration}s`,
                  boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.5)`,
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

          {/* Contenedor principal */}
          <div
            className="relative w-full h-full max-w-7xl mx-auto px-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón anterior */}
            <button
              onClick={prevImage}
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

            {/* Imagen principal */}
            <div className="relative max-w-5xl flex items-center justify-center">
              <Image
                src={projects[currentImageIndex].src}
                alt={projects[currentImageIndex].alt || projects[currentImageIndex].title}
                width={1920}
                height={1080}
                className="rounded-2xl"
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '90vw',
                  maxHeight: '85vh',
                  boxShadow: `0 0 120px ${theme.primaryRgba(0.3)}`,
                }}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
            </div>

            {/* Botón siguiente */}
            <button
              onClick={nextImage}
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
              {/* Título de la imagen */}
              <div className="text-center">
                <span className="text-sm uppercase tracking-widest" style={{ color: theme.accent }}>
                  {projects[currentImageIndex].category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  {projects[currentImageIndex].title}
                </h3>
              </div>

              {/* Indicadores */}
              <div className="flex items-center gap-3">
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`transition-all duration-300 cursor-pointer rounded-full ${idx === currentImageIndex
                      ? 'w-10 h-3'
                      : 'w-3 h-3 hover:opacity-100 opacity-50'
                      }`}
                    style={{
                      backgroundColor: idx === currentImageIndex ? theme.primary : 'white'
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
