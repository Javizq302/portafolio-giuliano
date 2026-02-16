'use client';

import { getThemeColors } from '../utils/themeUtils';
import { useState } from 'react';

export default function Contacto() {
  const theme = getThemeColors();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const contactMethods = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)',
      hoverGradient: 'linear-gradient(135deg, #FD1D1D 0%, #833AB4 50%, #FCB045 100%)',
      link: 'https://instagram.com',
      description: 'Sígueme y ve mi trabajo diario',
      color: '#E4405F'
    },
    {
      id: 'email',
      name: 'Correo Electrónico',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
      gradient: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
      hoverGradient: `linear-gradient(135deg, ${theme.secondary} 0%, ${theme.primary} 100%)`,
      link: 'mailto:tu-email@ejemplo.com',
      description: 'Escríbeme directamente',
      color: theme.primary
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
      hoverGradient: 'linear-gradient(135deg, #128C7E 0%, #25D366 100%)',
      link: 'https://wa.me/1234567890',
      description: 'Chatea conmigo ahora',
      color: '#25D366'
    }
  ];

  return (
    <section
      id="contacto"
      className="py-20 md:py-32 px-6 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, var(--color-background) 0%, var(--color-background-secondary) 50%, var(--color-background) 100%)`,
      }}
    >
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ backgroundColor: theme.secondaryRgba(0.1) }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: theme.tertiaryRgba(0.1),
            animationDelay: '1s'
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: theme.primaryRgba(0.05),
            animationDelay: '2s'
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Título de sección */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            <span className="text-white">Contacto</span>
          </h2>
          <div className="h-1 w-32 mx-auto rounded-full" style={{ background: `linear-gradient(to right, transparent, ${theme.secondary}, ${theme.primary}, transparent)` }} />
          <p
            className="text-lg md:text-xl mt-6 text-gray-300"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            ¿Tienes un proyecto en mente? Hablemos
          </p>
        </div>

        {/* Tarjetas de contacto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {contactMethods.map((method) => (
            <a
              key={method.id}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block"
              onMouseEnter={() => setHoveredCard(method.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Tarjeta principal */}
              <div
                className="relative h-full p-8 rounded-3xl transition-all duration-500 transform"
                style={{
                  background: hoveredCard === method.id
                    ? method.hoverGradient
                    : `linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)`,
                  border: `2px solid ${hoveredCard === method.id ? method.color : theme.primaryRgba(0.3)}`,
                  backdropFilter: 'blur(20px)',
                  boxShadow: hoveredCard === method.id
                    ? `0 20px 60px ${method.color}40, 0 0 40px ${method.color}20`
                    : `0 10px 30px rgba(0, 0, 0, 0.3)`,
                  transform: hoveredCard === method.id ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                }}
              >
                {/* Efecto de brillo animado */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${method.color}20 0%, transparent 50%, ${method.color}10 100%)`,
                  }}
                />

                {/* Contenido */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icono con efecto */}
                  <div
                    className="mb-6 p-4 rounded-2xl transition-all duration-500 transform"
                    style={{
                      background: hoveredCard === method.id
                        ? method.gradient
                        : `linear-gradient(135deg, ${theme.primaryRgba(0.2)} 0%, ${theme.secondaryRgba(0.2)} 100%)`,
                      transform: hoveredCard === method.id ? 'rotate(5deg) scale(1.1)' : 'rotate(0) scale(1)',
                      boxShadow: hoveredCard === method.id
                        ? `0 10px 30px ${method.color}50`
                        : '0 5px 15px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <div
                      style={{
                        color: hoveredCard === method.id ? '#ffffff' : method.color,
                        filter: hoveredCard === method.id ? 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' : 'none',
                      }}
                      className="transition-all duration-500"
                    >
                      {method.icon}
                    </div>
                  </div>

                  {/* Nombre */}
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-3 transition-all duration-500"
                    style={{
                      fontFamily: 'var(--font-space-grotesk)',
                      color: hoveredCard === method.id ? '#ffffff' : '#ffffff',
                      textShadow: hoveredCard === method.id ? `0 0 20px ${method.color}` : 'none',
                    }}
                  >
                    {method.name}
                  </h3>

                  {/* Descripción */}
                  <p
                    className="text-sm md:text-base mb-6 transition-all duration-500"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      color: hoveredCard === method.id ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)',
                    }}
                  >
                    {method.description}
                  </p>

                  {/* Botón de acción */}
                  <div
                    className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-500 transform"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      background: hoveredCard === method.id
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${hoveredCard === method.id ? method.color : 'rgba(255, 255, 255, 0.2)'}`,
                      transform: hoveredCard === method.id ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    {hoveredCard === method.id ? '¡Haz clic!' : 'Contactar'}
                  </div>
                </div>

                {/* Partículas decorativas */}
                {hoveredCard === method.id && (
                  <>
                    <div
                      className="absolute top-4 right-4 w-2 h-2 rounded-full animate-ping"
                      style={{ backgroundColor: method.color }}
                    />
                    <div
                      className="absolute bottom-4 left-4 w-2 h-2 rounded-full animate-ping"
                      style={{
                        backgroundColor: method.color,
                        animationDelay: '0.5s'
                      }}
                    />
                  </>
                )}
              </div>

              {/* Sombra animada */}
              <div
                className="absolute -z-10 inset-0 rounded-3xl transition-all duration-500 blur-xl"
                style={{
                  background: hoveredCard === method.id
                    ? method.gradient
                    : 'rgba(0, 0, 0, 0.3)',
                  opacity: hoveredCard === method.id ? 0.6 : 0.3,
                  transform: hoveredCard === method.id ? 'scale(1.1)' : 'scale(1)',
                }}
              />
            </a>
          ))}
        </div>

        {/* Texto adicional */}
        <div className="text-center mt-12">
          <p
            className="text-base md:text-lg text-gray-400"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Elige tu método preferido y empecemos a trabajar juntos
          </p>
        </div>
      </div>
    </section>
  );
}
