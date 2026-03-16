'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { getThemeColors } from '../utils/themeUtils';

export default function Brands() {
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const theme = getThemeColors();

  const brands = [
    { id: 1, name: 'Changan', logo: '/images/brands/Changan.png', alt: 'Changan' },
    { id: 2, name: 'Humano Seguros', logo: '/images/brands/HumanoSeguro.png', alt: 'Humano Seguros' },
    { id: 3, name: 'Chef', logo: '/images/brands/ElChef.png', alt: 'Chef' },
    { id: 4, name: 'REMAX', logo: '/images/brands/Remax.png', alt: 'REMAX' },
    { id: 5, name: 'Samsung', logo: '/images/brands/Samsung.png', alt: 'Samsung' },
    { id: 6, name: 'Supermercado Nacional', logo: '/images/brands/SupermercadoNacional.png', alt: 'Supermercado Nacional' },
    { id: 7, name: 'Lanco', logo: '/images/brands/Lanco.png', alt: 'Lanco' },
    { id: 8, name: 'Patrón Tequila', logo: '/images/brands/Patron.png', alt: 'Patrón Tequila' },
    { id: 9, name: 'Ccn', logo: '/images/brands/Ccn.png', alt: 'CNN' },
  ];

  // Duplicar los logos para crear un loop infinito suave
  const duplicatedBrands = [...brands, ...brands];

  const handleHoverStart = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsAnyHovered(true);
  };

  const handleHoverEnd = () => {
    // Pequeño delay para evitar parpadeos
    hoverTimeoutRef.current = setTimeout(() => {
      setIsAnyHovered(false);
    }, 50);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      id="marcas"
      className="py-2 md:py-3 lg:py-4 relative overflow-hidden brands-section"
      style={{ background: `linear-gradient(35deg, #C5D0D9 0%, #EBEFF2 50%, #A3B2BF 100%)` }}
    >
      {/* Sombras internas superior e inferior */}
      <div className="brands-inner-shadow-top"></div>
      <div className="brands-inner-shadow-bottom"></div>


      {/* Carrusel infinito de logos - ancho completo */}
      <div className="relative overflow-hidden w-full">
        {/* Correa única - se mueve de izquierda a derecha */}
        <div className="flex gap-12 md:gap-16 lg:gap-20 items-center">
          <div
            className={`flex gap-12 md:gap-16 lg:gap-20 animate-scroll-left items-center ${isAnyHovered ? 'animate-paused' : ''}`}
          >
            {duplicatedBrands.map((brand, index) => (
              <BrandLogo
                key={`left-${brand.id}-${index}`}
                brand={brand}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
              />
            ))}
          </div>
          <div
            className={`flex gap-12 md:gap-16 lg:gap-20 animate-scroll-left items-center ${isAnyHovered ? 'animate-paused' : ''}`}
            aria-hidden="true"
          >
            {duplicatedBrands.map((brand, index) => (
              <BrandLogo
                key={`left-duplicate-${brand.id}-${index}`}
                brand={brand}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
          will-change: transform;
        }

        .animate-paused {
          animation-play-state: paused;
        }

        .brands-section {
          position: relative;
        }

        .brands-inner-shadow-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50px;
          background: linear-gradient(
            to bottom,
            rgba(50, 122, 223, 0.15) 0%,
            rgba(0, 0, 0, 0.08) 30%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 10;
        }

        .brands-inner-shadow-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50px;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.15) 0%,
            rgba(50, 122, 223, 0.08) 30%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 10;
        }
      `}</style>
    </section>
  );
}

function BrandLogo({
  brand,
  onHoverStart,
  onHoverEnd
}: {
  brand: { id: number; name: string; logo: string; alt: string };
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverStart();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverEnd();
  };

  return (
    <div
      className="flex items-center justify-center cursor-pointer"
      style={{
        padding: '12px 8px',
        minHeight: '70px',
        flexShrink: 0,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative w-28 h-14 md:w-36 md:h-16 lg:w-40 lg:h-20 transition-all duration-500 ease-out"
        style={{
          transform: isHovered ? 'scale(1.15) translateY(-8px)' : 'scale(1) translateY(0)',
          transformOrigin: 'center center',
        }}
      >
        <Image
          src={brand.logo}
          alt={brand.alt}
          fill
          className="object-contain transition-all duration-500"
          style={{
            filter: isHovered ? 'none' : 'grayscale(55%) brightness(0.9)',
          }}
        />
      </div>
    </div>
  );
}
