'use client';

import { getThemeColors } from '../utils/themeUtils';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function WorksPage() {
  const theme = getThemeColors();

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
      <Navbar />
      <main className="w-full pt-20">
        <section 
          className="py-20 md:py-32 px-6 relative overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, var(--color-background) 0%, var(--color-background-secondary) 50%, var(--color-background) 100%)`,
          }}
        >
          {/* Efectos de fondo */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: theme.primaryRgba(0.1) }} />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: theme.accentRgba(0.1) }} />
          </div>

          <div className="container mx-auto max-w-7xl relative z-10">
            {/* Título de página */}
            <div className="text-center mb-16">
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                <span className="text-white">Works</span>
              </h1>
              <div className="h-1 w-32 mx-auto rounded-full" style={{ background: `linear-gradient(to right, transparent, ${theme.primary}, ${theme.accent}, transparent)` }} />
              <p 
                className="text-lg md:text-xl mt-6 text-gray-300"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Colección completa de trabajos y proyectos
              </p>
            </div>

            {/* Contenido placeholder */}
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <p 
                className="text-lg text-gray-400 text-center"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Esta página está en desarrollo. Próximamente verás aquí todos los trabajos.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

