'use client';

import Image from 'next/image';
import { getThemeColors } from '../utils/themeUtils';

export default function PersonalBrands() {
  const theme = getThemeColors();
  const videos = [
    { id: 1, src: '/videos/personal-brands/video1.mp4', gradient: `linear-gradient(135deg, ${theme.quaternary}, ${theme.tertiary})` },
    { id: 2, src: '/videos/personal-brands/video2.mp4', gradient: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` },
    { id: 3, src: '/videos/personal-brands/video3.mp4', gradient: `linear-gradient(135deg, ${theme.tertiary}, ${theme.quaternary})` },
  ];

  const images = [
    { id: 1, src: '/images/personal-brands/image1.jpg', alt: 'Personal Brand 1', gradient: `linear-gradient(135deg, ${theme.quaternary}, ${theme.tertiary})` },
    { id: 2, src: '/images/personal-brands/image2.jpg', alt: 'Personal Brand 2', gradient: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` },
    { id: 3, src: '/images/personal-brands/image3.jpg', alt: 'Personal Brand 3', gradient: `linear-gradient(135deg, ${theme.tertiary}, ${theme.quaternary})` },
  ];

  return (
    <section 
      id="personal-brands"
      className="py-20 md:py-32 px-6 relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, var(--color-background) 0%, var(--color-background-secondary) 50%, var(--color-background) 100%)`,
      }}
    >
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: theme.quaternaryRgba(0.1) }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: theme.tertiaryRgba(0.1), animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Título y descripción */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            <span className="text-white">👤 Personal</span>{' '}
            <span 
              style={{ 
                color: theme.quaternary,
              }}
            >
              Brands
            </span>
          </h2>
          <div className="h-1 w-32 mx-auto rounded-full mb-6" style={{ background: `linear-gradient(to right, transparent, ${theme.quaternary}, ${theme.tertiary}, transparent)` }} />
          <p 
            className="text-lg md:text-xl text-gray-300 leading-relaxed"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Hoy más que nunca, construir una marca personal sólida depende de cómo se comunica visualmente. Trabajamos junto a creadores, emprendedores y profesionales para construir contenido que represente quiénes son, lo que hacen y cómo quieren ser percibidos. Nos enfocamos en crear piezas que sumen valor real, reflejen autenticidad y resuelvan la necesidad de tener una presencia visual coherente, atractiva y profesional. Además, cuidamos que el contenido y la información que comparten llegue a su comunidad de la forma más clara, efectiva y comprensible posible.
          </p>
        </div>

        {/* Videos verticales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {videos.map((video, index) => (
            <div 
              key={video.id}
              className="group relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105"
              style={{
                boxShadow: `0 20px 60px -15px ${theme.quaternaryRgba(0.3 + index * 0.1)}`,
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl p-1" style={{ background: video.gradient }}>
                <div className="w-full h-full rounded-2xl bg-gray-900" />
              </div>
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <video
                  src={video.src}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  autoPlay
                />
              </div>
            </div>
          ))}
        </div>

        {/* Imágenes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {images.map((image, index) => (
            <div 
              key={image.id}
              className="group relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
              style={{
                boxShadow: `0 20px 60px -15px ${theme.quaternaryRgba(0.2 + index * 0.1)}`,
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl p-1" style={{ background: image.gradient }}>
                <div className="w-full h-full rounded-2xl bg-gray-900" />
              </div>
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
