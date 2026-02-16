'use client';

import Image from 'next/image';
import { getThemeColors } from '../utils/themeUtils';

export default function FoodMood() {
  const theme = getThemeColors();
  const videos = [
    { id: 1, src: '/videos/food-mood/video1.mp4', gradient: `linear-gradient(135deg, ${theme.accent}, ${theme.tertiary})` },
    { id: 2, src: '/videos/food-mood/video2.mp4', gradient: `linear-gradient(135deg, ${theme.secondary}, ${theme.accent})` },
    { id: 3, src: '/videos/food-mood/video3.mp4', gradient: `linear-gradient(135deg, ${theme.accent}, ${theme.quaternary})` },
  ];

  const images = [
    { id: 1, src: '/images/food-mood/image1.jpg', alt: 'Food & Mood 1', gradient: `linear-gradient(135deg, ${theme.accent}, ${theme.tertiary})` },
    { id: 2, src: '/images/food-mood/image2.jpg', alt: 'Food & Mood 2', gradient: `linear-gradient(135deg, ${theme.secondary}, ${theme.accent})` },
    { id: 3, src: '/images/food-mood/image3.jpg', alt: 'Food & Mood 3', gradient: `linear-gradient(135deg, ${theme.accent}, ${theme.quaternary})` },
  ];

  return (
    <section 
      id="food-mood"
      className="py-20 md:py-32 px-6 relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, var(--color-background-secondary) 0%, var(--color-background-tertiary) 50%, var(--color-background-secondary) 100%)`,
      }}
    >
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: theme.accentRgba(0.1) }} />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: theme.tertiaryRgba(0.1), animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Título y descripción */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            <span className="text-white">🍴 Food &</span>{' '}
            <span 
              style={{ 
                color: theme.accent,
              }}
            >
              Mood
            </span>
          </h2>
          <div className="h-1 w-32 mx-auto rounded-full mb-6" style={{ background: `linear-gradient(to right, transparent, ${theme.accent}, ${theme.tertiary}, transparent)` }} />
          <p 
            className="text-lg md:text-xl text-gray-300 leading-relaxed"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Comer a veces es solo una excusa. En un café, por ejemplo, puede ser el lugar de concentración, trabajo o despeje; tal vez un espacio para encontrarse y hablar con alguien querido o con quien hace tiempo no se compartía. Capturamos esos momentos que despiertan los sentidos y cuentan la historia de un lugar donde el sabor y la experiencia van de la mano. El vapor del capuccino, el crujir del croissant al partirlo y el dulce irresistible de un postre son detalles que no solo mostramos, sino que transmitimos para crear una atmósfera cálida y auténtica. Nuestro contenido va más allá de presentar productos: conecta con quienes buscan disfrutar cada instante, ayudando a que la marca no solo se vea bien, sino que se sienta cerca y memorable.
          </p>
        </div>

        {/* Videos verticales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {videos.map((video, index) => (
            <div 
              key={video.id}
              className="group relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105"
              style={{
                boxShadow: `0 20px 60px -15px ${theme.accentRgba(0.3 + index * 0.1)}`,
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
                boxShadow: `0 20px 60px -15px ${theme.accentRgba(0.2 + index * 0.1)}`,
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
