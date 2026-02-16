'use client';

import { getThemeColors } from '../utils/themeUtils';
import Image from 'next/image';

export default function Footer() {
  const theme = getThemeColors();

  return (
    <footer
      className="py-12 px-6 relative overflow-hidden border-t"
      style={{
        background: `linear-gradient(135deg, var(--color-background-secondary) 0%, var(--color-background) 100%)`,
        borderColor: theme.primaryRgba(0.2),
      }}
    >
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: theme.primaryRgba(0.05) }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: theme.accentRgba(0.05) }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo y nombre */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src="/images/LogoPortfolio.png"
                alt="Giuliano Medina Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-orange-300 to-transparent" />
            <span
              className="text-sm md:text-base font-medium"
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#e2e8f0',
              }}
            >
              Giuliano Medina
            </span>
          </div>

          {/* Enlaces de navegación */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="#inicio"
              className="text-sm transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#94a3b8',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              Inicio
            </a>
            <a
              href="#still-frames"
              className="text-sm transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#94a3b8',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              Still Frames
            </a>
            <a
              href="#creative-cuts"
              className="text-sm transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#94a3b8',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              Creative Cuts
            </a>
            <a
              href="/galeria"
              className="text-sm transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#94a3b8',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              Gallery
            </a>
            <a
              href="#contacto"
              className="text-sm transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#94a3b8',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              Contacto
            </a>
          </nav>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p
              className="text-xs text-gray-500"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              © {new Date().getFullYear()} Giuliano Medina. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

