'use client';

import Image from 'next/image';
import { getThemeColors } from '../utils/themeUtils';

export default function GradeLab() {
  const theme = getThemeColors();
  const videos = [
    { id: 1, src: '/videos/grade-lab/video1.mp4', gradient: `linear-gradient(135deg, ${theme.primary}, ${theme.quaternary})` },
    { id: 2, src: '/videos/grade-lab/video2.mp4', gradient: `linear-gradient(135deg, ${theme.secondary}, ${theme.primary})` },
    { id: 3, src: '/videos/grade-lab/video3.mp4', gradient: `linear-gradient(135deg, ${theme.quaternary}, ${theme.primary})` },
  ];

  const images = [
    { id: 1, src: '/images/grade-lab/image1.jpg', alt: 'Grade Lab 1', gradient: `linear-gradient(135deg, ${theme.primary}, ${theme.quaternary})` },
    { id: 2, src: '/images/grade-lab/image2.jpg', alt: 'Grade Lab 2', gradient: `linear-gradient(135deg, ${theme.secondary}, ${theme.primary})` },
    { id: 3, src: '/images/grade-lab/image3.jpg', alt: 'Grade Lab 3', gradient: `linear-gradient(135deg, ${theme.quaternary}, ${theme.primary})` },
  ];

  return (
    <section 
      id="grade-lab"
      className="py-20 md:py-32 px-6 relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, var(--color-background-secondary) 0%, var(--color-background-tertiary) 50%, var(--color-background-secondary) 100%)`,
      }}
    >
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: theme.primaryRgba(0.1) }} />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: theme.secondaryRgba(0.1), animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Título y descripción */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            <span className="text-white">🎨 Grade</span>{' '}
            <span 
              style={{ 
                color: theme.primary,
              }}
            >
              Lab
            </span>
          </h2>
          <div className="h-1 w-32 mx-auto rounded-full mb-6" style={{ background: `linear-gradient(to right, transparent, ${theme.primary}, ${theme.secondary}, transparent)` }} />
          <p 
            className="text-lg md:text-xl text-gray-300 leading-relaxed"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            El color define cómo se siente una imagen. Por eso, nuestro trabajo de color no se limita a corregir, sino a entender qué quiere transmitir cada pieza y acompañarla visualmente. Buscamos coherencia, intención y carácter, cuidando cada plano para que el resultado se sienta natural y fiel a la identidad de la marca o del proyecto. A través del color resolvemos inconsistencias visuales y le damos una estética sólida que eleva el contenido sin forzarlo.
          </p>
        </div>

        {/* Videos verticales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {videos.map((video, index) => (
            <div 
              key={video.id}
              className="group relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105"
              style={{
                boxShadow: `0 20px 60px -15px ${theme.primaryRgba(0.3 + index * 0.1)}`,
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
                boxShadow: `0 20px 60px -15px ${theme.primaryRgba(0.2 + index * 0.1)}`,
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
