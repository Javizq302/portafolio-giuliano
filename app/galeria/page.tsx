'use client';

import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect, useRef, useCallback } from 'react';

// ────────────────────────────────
// Media item type
// ────────────────────────────────
interface MediaItem {
  id: number;
  src: string;
  type: 'image' | 'video' | 'gif';
}

// ────────────────────────────────
// Category definitions with auto-loaded media
// ────────────────────────────────
const categorias = [
  {
    id: 'colorlab',
    nombre: 'Color Lab',
    descripcion:
      'El color define cómo se siente una imagen. Nuestro trabajo de color no se limita a corregir, sino a entender qué quiere transmitir cada pieza y acompañarla visualmente. Buscamos coherencia, intención y carácter, cuidando cada plano para que el resultado se sienta natural y fiel a la identidad de la marca o del proyecto.',
    color: '#3b82f6',
    folder: 'colorlab',
    media: [
      ...Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        src: `/gallery/colorlab/image-${i + 1}-colorlab.png`,
        type: 'image' as const,
      })),
      { id: 16, src: '/gallery/colorlab/gif-1-colorlab.mp4', type: 'gif' as const },
      { id: 17, src: '/gallery/colorlab/gif-2-colorlab.mp4', type: 'gif' as const },
    ] as MediaItem[],
  },
  {
    id: 'musicvisuals',
    nombre: 'Music Visuals',
    descripcion:
      'El artista crea su música desde un lugar auténtico, con una identidad propia que busca conectar. Nuestro trabajo consiste en traducir esa esencia en imágenes que respeten y amplifiquen su mensaje. Trabajamos junto a la visión del artista para que cada videoclip refleje el concepto y la emoción detrás de la música.',
    color: '#8b5cf6',
    folder: 'musicvisuals',
    media: [
      ...Array.from({ length: 13 }, (_, i) => ({
        id: i + 1,
        src: `/gallery/musicvisuals/image-${i + 1}-musicvisuals.png`,
        type: 'image' as const,
      })),
      { id: 14, src: '/gallery/musicvisuals/video-1-musicvisuals.mp4', type: 'video' as const },
    ] as MediaItem[],
  },
  {
    id: 'personalbrands',
    nombre: 'Personal Brands',
    descripcion:
      'Trabajamos junto a creadores, emprendedores y profesionales para desarrollar contenido que represente quiénes son y cómo quieren ser percibidos. Construimos una presencia coherente y profesional que refuerza su identidad, asegurando que su mensaje llegue a la comunidad de forma clara y efectiva.',
    color: '#ec4899',
    folder: 'personalbrands',
    media: [
      ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => ({
        id: i,
        src: `/gallery/personalbrands/image-${i}-personalbrands.jpg`,
        type: 'image' as const,
      })),
      { id: 11, src: '/gallery/personalbrands/image-11-personalbrands.png', type: 'image' as const },
      { id: 12, src: '/gallery/personalbrands/video-1-personalbrands.mp4', type: 'video' as const },
      { id: 13, src: '/gallery/personalbrands/video-2-personalbrands.mp4', type: 'video' as const },
      { id: 14, src: '/gallery/personalbrands/video-3-personalbrands.mp4', type: 'video' as const },
      { id: 15, src: '/gallery/personalbrands/video-4-personalbrands.mp4', type: 'video' as const },
      { id: 16, src: '/gallery/personalbrands/video-5-personalbrands.MP4', type: 'video' as const },
      { id: 17, src: '/gallery/personalbrands/video-6-personalbrands.MP4', type: 'video' as const },
      { id: 18, src: '/gallery/personalbrands/video-7-personalbrands.mp4', type: 'video' as const },
      { id: 19, src: '/gallery/personalbrands/video-8-personalbrands.mp4.mp4', type: 'video' as const },
    ] as MediaItem[],
  },
  {
    id: 'livemoments',
    nombre: 'Live Moments',
    descripcion:
      'Captamos los momentos clave que hacen único cada evento, enfocándonos en mostrar exactamente lo que el cliente busca transmitir: exclusividad, fuerza, influencia o cualquier valor que defina su marca. Nuestro trabajo facilita que el cliente tenga contenido que represente su identidad y potencie su presencia.',
    color: '#10b981',
    folder: 'livemoments',
    media: [
      { id: 1, src: '/gallery/livemoments/image-1-livemoments.jpg', type: 'image' as const },
      { id: 2, src: '/gallery/livemoments/image-2-livemoments.jpg.jpg', type: 'image' as const },
      { id: 3, src: '/gallery/livemoments/image-3-livemoments.jpg.JPG', type: 'image' as const },
      { id: 4, src: '/gallery/livemoments/image-4-livemoments.jpg.JPG', type: 'image' as const },
      { id: 5, src: '/gallery/livemoments/image-5-livemoments.jpg.JPG', type: 'image' as const },
      { id: 6, src: '/gallery/livemoments/image-6-livemoments.jpg.JPG', type: 'image' as const },
      { id: 7, src: '/gallery/livemoments/image-7-livemoments.jpg.png', type: 'image' as const },
      { id: 8, src: '/gallery/livemoments/gif-1-livemoments.mp4', type: 'gif' as const },
      { id: 9, src: '/gallery/livemoments/gif-2-livemoments.mp4', type: 'gif' as const },
      { id: 10, src: '/gallery/livemoments/gif-3-livemoments.mp4', type: 'gif' as const },
      { id: 11, src: '/gallery/livemoments/gif-4-livemoments.mp4', type: 'gif' as const },
      { id: 12, src: '/gallery/livemoments/video-1-livemoments.MP4', type: 'video' as const },
      { id: 13, src: '/gallery/livemoments/video-2-livemoments.MP4', type: 'video' as const },
      { id: 14, src: '/gallery/livemoments/video-3-livemoments.mp4', type: 'video' as const },
    ] as MediaItem[],
  },
  {
    id: 'foodmood',
    nombre: 'Food Mood',
    descripcion:
      'Comer a veces es solo una excusa. Capturamos esos momentos que construyen la experiencia y definen la atmósfera de un lugar. El vapor del capuccino, el crujir del croissant y los pequeños detalles nos permiten contar una historia cercana y real. Creamos contenido que va más allá del producto.',
    color: '#f59e0b',
    folder: 'foodmood',
    media: [
      { id: 1, src: '/gallery/foodmood/image-1-foodmood.JPG', type: 'image' as const },
      { id: 2, src: '/gallery/foodmood/image-2-foodmood.JPG', type: 'image' as const },
      { id: 3, src: '/gallery/foodmood/image-4-foodmood.JPG', type: 'image' as const },
      { id: 4, src: '/gallery/foodmood/image-5-foodmood.PNG', type: 'image' as const },
      { id: 5, src: '/gallery/foodmood/video-1-foodmood.MP4', type: 'video' as const },
      { id: 6, src: '/gallery/foodmood/video-2-foodmood.mp4', type: 'video' as const },
      { id: 7, src: '/gallery/foodmood/video-3-foodmood.mp4', type: 'video' as const },
      { id: 8, src: '/gallery/foodmood/video-4-foodmood.mp4', type: 'video' as const },
      { id: 9, src: '/gallery/foodmood/video-5-foodmood.MP4', type: 'video' as const },
    ] as MediaItem[],
  },
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  CONFIGURACIÓN DEL PREVIEW COLLAGE (Hero)                              ║
// ║                                                                        ║
// ║  Para cada categoría, elige:                                           ║
// ║    - previewCount: cantidad de imágenes en el collage                  ║
// ║    - mediaIndices: índices exactos de qué fotos/videos mostrar         ║
// ║                    (basado en el orden del array 'media' de arriba,    ║
// ║                     empezando desde 0)                                 ║
// ║    - layout: controla el aspecto del collage para esa categoría        ║
// ║              'default'    → primera imagen ancha, el resto cuadradas   ║
// ║              'vertical'   → todas las imágenes en formato vertical     ║
// ║              'horizontal' → todas las imágenes en formato horizontal   ║
// ║              'square'     → todas las imágenes en formato cuadrado     ║
// ║                                                                        ║
// ║  Si mediaIndices está vacío [], se toman las primeras 'previewCount'   ║
// ║  fotos automáticamente.                                                ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const PREVIEW_COLLAGE_CONFIG: Record<string, { previewCount: number; mediaIndices: number[]; layout: 'default' | 'vertical' | 'horizontal' | 'square' }> = {
  colorlab: {
    previewCount: 2,          // Cantidad de fotos en el collage
    mediaIndices: [4, 1],  // Índices: image-1, image-2, image-3
    layout: 'horizontal',
  },
  musicvisuals: {
    previewCount: 1,
    mediaIndices: [0],
    layout: 'square',
  },
  personalbrands: {
    previewCount: 3,
    mediaIndices: [4, 1, 2],
    layout: 'default',
  },
  livemoments: {
    previewCount: 1,
    mediaIndices: [7],
    layout: 'vertical',
  },
  foodmood: {
    previewCount: 1,
    mediaIndices: [3],
    layout: 'vertical',
  },
};

// ────────────────────────────────
// Helper
// ────────────────────────────────
const hexToRgba = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// ════════════════════════════════
// MAIN PAGE COMPONENT
// ════════════════════════════════
export default function GaleriaPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const previewVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const cat = categorias[activeSection];

  // ── Switch section with transition ──
  const switchSection = useCallback(
    (index: number) => {
      if (index === activeSection || isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSection(index);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 350);
    },
    [activeSection, isTransitioning]
  );

  // ── Scroll to gallery ──
  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ── Hide scroll indicator on scroll ──
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 300);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Modal functions ──
  const openModal = (idx: number) => {
    setModalIndex(idx);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
    if (videoRef.current) videoRef.current.pause();
  }, []);

  const nextItem = useCallback(() => {
    if (videoRef.current) videoRef.current.pause();
    setModalIndex((prev) => (prev + 1) % cat.media.length);
  }, [cat.media.length]);

  const prevItem = useCallback(() => {
    if (videoRef.current) videoRef.current.pause();
    setModalIndex((prev) => (prev - 1 + cat.media.length) % cat.media.length);
  }, [cat.media.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextItem();
      if (e.key === 'ArrowLeft') prevItem();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeModal, nextItem, prevItem]);

  useEffect(() => {
    if (isModalOpen && videoRef.current) videoRef.current.load();
  }, [modalIndex, isModalOpen]);

  // ── Preview hover handlers ──
  const handlePreviewEnter = (idx: number) => {
    const v = previewVideoRefs.current[idx];
    if (v) v.play().catch(() => { });
  };
  const handlePreviewLeave = (idx: number) => {
    const v = previewVideoRefs.current[idx];
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  // Pick preview items based on PREVIEW_COLLAGE_CONFIG
  const collageConfig = PREVIEW_COLLAGE_CONFIG[cat.id];
  const previewItems = collageConfig && collageConfig.mediaIndices.length > 0
    ? collageConfig.mediaIndices
      .filter((i) => i >= 0 && i < cat.media.length)
      .map((i) => cat.media[i])
    : cat.media.slice(0, collageConfig?.previewCount ?? 3);

  return (
    <div className="min-h-screen" style={{ background: '#06080f' }}>
      <Navbar />

      {/* ════════════════════════════════ */}
      {/* HERO SECTION                     */}
      {/* ════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '100vh', paddingTop: '120px' }}>
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full blur-[180px] transition-all duration-1000"
            style={{
              width: '700px',
              height: '700px',
              top: '-10%',
              right: '-8%',
              background: `radial-gradient(circle, ${hexToRgba(cat.color, 0.1)} 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute rounded-full blur-[140px] transition-all duration-1000"
            style={{
              width: '500px',
              height: '500px',
              bottom: '0%',
              left: '-5%',
              background: `radial-gradient(circle, ${hexToRgba(cat.color, 0.06)} 0%, transparent 70%)`,
            }}
          />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-12">
            <span
              className="text-[11px] uppercase tracking-[0.3em] text-gray-600"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Portafolio
            </span>
            <span className="text-gray-700">/</span>
            <span
              className="text-[11px] uppercase tracking-[0.3em] text-gray-400"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Galería
            </span>
          </div>

          {/* ── Hero Content: Left info + Right preview ── */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-16 mb-16">
            {/* LEFT: Title + Description */}
            <div className="lg:w-[50%] flex-shrink-0">
              {/* Category number */}
              <div
                className={`transition-all duration-500 ease-out ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
              >
                <span
                  className="text-7xl md:text-8xl font-black block mb-2"
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    color: cat.color,
                    opacity: 0.1,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {String(activeSection + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Section title */}
              <div
                className={`transition-all duration-500 ease-out delay-75 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
              >
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-6"
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {cat.nombre.split(' ').map((word, i) => (
                    <span key={i} className="block">
                      {i === 0 ? (
                        <span className="text-white">{word}</span>
                      ) : (
                        <span style={{ color: cat.color }}>{word}</span>
                      )}
                    </span>
                  ))}
                </h1>
              </div>

              {/* Accent line */}
              <div
                className={`flex items-center gap-3 mb-8 transition-all duration-500 delay-100 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
              >
                <div
                  className="h-[2px] rounded-full transition-all duration-700"
                  style={{ width: '48px', background: cat.color }}
                />
                <div
                  className="w-2 h-2 rounded-full transition-all duration-700"
                  style={{ background: cat.color, boxShadow: `0 0 12px ${cat.color}` }}
                />
              </div>

              {/* Description */}
              <div
                className={`transition-all duration-500 ease-out delay-150 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
              >
                <p
                  className="text-base md:text-lg text-gray-400 leading-relaxed max-w-lg mb-8"
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 300, lineHeight: '1.85' }}
                >
                  {cat.descripcion}
                </p>

                {/* Media count badge */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500 mb-8"
                  style={{
                    background: hexToRgba(cat.color, 0.05),
                    borderColor: hexToRgba(cat.color, 0.15),
                  }}
                >
                  <span className="text-xs font-semibold" style={{ color: cat.color }}>
                    {cat.media.length}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500">
                    {cat.media.length === 1 ? 'pieza' : 'piezas'}
                  </span>
                </div>

                <div>
                  <button
                    onClick={scrollToGallery}
                    className="group inline-flex items-center gap-3 text-sm font-medium transition-all duration-300 cursor-pointer"
                    style={{ color: cat.color, fontFamily: 'var(--font-inter)' }}
                  >
                    <span>Ver galería completa</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: Preview collage */}
            <div
              className={`lg:w-[50%] w-full transition-all duration-600 ease-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            >
              <div className={`${collageConfig?.layout === 'vertical' ? 'flex justify-center' : 'grid grid-cols-2'} gap-3 max-w-lg ml-auto`}>
                {previewItems.map((item, idx) => (
                  <div
                    key={`${cat.id}-preview-${idx}`}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer group ${collageConfig?.layout === 'vertical'
                      ? 'w-72 aspect-[9/16]'
                      : collageConfig?.layout === 'horizontal'
                        ? 'col-span-2 aspect-[16/9]'
                        : collageConfig?.layout === 'square'
                          ? 'aspect-square'
                          : idx === 0
                            ? 'col-span-2 aspect-[16/9]'
                            : 'aspect-square'
                      }`}
                    onClick={() => {
                      scrollToGallery();
                    }}
                    onMouseEnter={() => item.type === 'video' && handlePreviewEnter(idx)}
                    onMouseLeave={() => item.type === 'video' && handlePreviewLeave(idx)}
                    ref={(el) => {
                      // Auto-play gifs in preview on mount
                      if (item.type === 'gif' && el) {
                        const vid = el.querySelector('video');
                        if (vid) vid.play().catch(() => { });
                      }
                    }}
                    style={{
                      boxShadow: `0 8px 40px ${hexToRgba(cat.color, 0.08)}`,
                    }}
                  >
                    {item.type === 'image' ? (
                      <Image
                        src={item.src}
                        alt={`${cat.nombre} preview ${idx + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    ) : item.type === 'gif' ? (
                      <video
                        src={item.src}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        playsInline
                        autoPlay
                        muted
                        loop
                      />
                    ) : (
                      <video
                        ref={(el) => {
                          previewVideoRefs.current[idx] = el;
                        }}
                        src={item.src}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        playsInline
                        preload="metadata"
                        muted
                        loop
                      />
                    )}
                    {/* Overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: `linear-gradient(to top, ${hexToRgba(cat.color, 0.3)}, transparent)` }}
                    />
                    {/* Border glow */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ boxShadow: `inset 0 0 0 1px ${hexToRgba(cat.color, 0.4)}` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Section Selector ── */}
          <div className="pb-12">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {categorias.map((c, i) => {
                const isActive = i === activeSection;
                return (
                  <button
                    key={c.id}
                    onClick={() => switchSection(i)}
                    className="relative px-5 py-3 rounded-full text-sm font-medium transition-all duration-500 cursor-pointer group overflow-hidden"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      background: isActive ? hexToRgba(c.color, 0.12) : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isActive ? hexToRgba(c.color, 0.4) : 'rgba(255,255,255,0.06)'}`,
                      color: isActive ? c.color : 'rgba(255,255,255,0.4)',
                      boxShadow: isActive ? `0 0 20px ${hexToRgba(c.color, 0.15)}` : 'none',
                    }}
                  >
                    {/* Glow dot */}
                    {isActive && (
                      <span
                        className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: c.color, boxShadow: `0 0 6px ${c.color}` }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="text-xs font-mono opacity-50">{String(i + 1).padStart(2, '0')}</span>
                      <span>{c.nombre}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll indicator — matches landing Hero style */}
        <div className={`fixed bottom-8 right-8 z-50 transition-opacity duration-700 ${showScrollIndicator ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <a
            href="#gallery-grid"
            onClick={(e) => { e.preventDefault(); scrollToGallery(); }}
            className="flex flex-col items-center gap-2 group cursor-pointer"
            style={{ textDecoration: 'none' }}
          >
            <span
              className="text-xs uppercase tracking-wider mb-2 transition-opacity"
              style={{
                fontFamily: 'var(--font-inter)',
                color: cat.color,
                opacity: 0.8,
              }}
            >
              Scroll
            </span>
            <div
              className="w-px h-16 relative overflow-hidden"
              style={{
                background: `linear-gradient(to bottom, ${hexToRgba(cat.color, 0.4)}, ${hexToRgba(cat.color, 0.15)})`,
              }}
            >
              <div
                className="absolute top-0 left-0 w-full h-1/3 gallery-scroll-indicator"
                style={{
                  background: cat.color,
                }}
              />
            </div>
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                background: cat.color,
                boxShadow: `0 0 15px ${hexToRgba(cat.color, 0.7)}`,
              }}
            />
          </a>
        </div>
      </section>

      {/* ════════════════════════════════ */}
      {/* GALLERY GRID                     */}
      {/* ════════════════════════════════ */}
      <section
        ref={galleryRef}
        className="relative py-16 md:py-24"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)', scrollMarginTop: '20px' }}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full blur-[200px] transition-all duration-1000"
            style={{
              width: '600px',
              height: '400px',
              top: '10%',
              right: '-5%',
              background: `radial-gradient(circle, ${hexToRgba(cat.color, 0.05)} 0%, transparent 70%)`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          {/* Section header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-[2px] rounded-full transition-all duration-700"
                style={{ background: cat.color }}
              />
              <h2
                className="text-2xl md:text-3xl font-bold text-white transition-all duration-500"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {cat.nombre}
              </h2>
            </div>
            <span className="text-sm text-gray-500" style={{ fontFamily: 'var(--font-inter)' }}>
              {cat.media.length} {cat.media.length === 1 ? 'pieza' : 'piezas'}
            </span>
          </div>

          {/* Masonry Grid */}
          <div
            className={`gallery-masonry transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
          >
            {cat.media.map((item, idx) => (
              <GalleryCard
                key={`${cat.id}-${item.id}`}
                item={item}
                catColor={cat.color}
                index={idx}
                onClick={() => openModal(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* ════════════════════════════════ */}
      {/* MODAL                            */}
      {/* ════════════════════════════════ */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.97)' }}
          onClick={closeModal}
        >
          {/* Stars */}
          <ModalStars />

          {/* Close */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 z-50 text-white/60 hover:text-white transition-all duration-300 cursor-pointer bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full w-14 h-14 flex items-center justify-center group"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <svg
              width="20"
              height="20"
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

          {/* Category info */}
          <div className="absolute top-6 left-6 z-50 flex items-center gap-3">
            <span
              className="text-sm font-medium"
              style={{ color: cat.color, fontFamily: 'var(--font-inter)' }}
            >
              {cat.nombre}
            </span>
            <span className="text-gray-700">·</span>
            <span className="text-sm text-gray-500" style={{ fontFamily: 'var(--font-inter)' }}>
              {modalIndex + 1} / {cat.media.length}
            </span>
          </div>

          {/* Content */}
          <div
            className="relative w-full h-full max-w-6xl mx-auto px-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev */}
            <button
              onClick={prevItem}
              className="absolute left-4 md:left-8 z-50 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white/50 hover:text-white p-4 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer group"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Media */}
            <div className="relative w-full flex items-center justify-center" style={{ height: '82vh' }}>
              {cat.media[modalIndex]?.type === 'video' ? (
                <video
                  ref={videoRef}
                  src={cat.media[modalIndex]?.src}
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl"
                  controls
                  playsInline
                  autoPlay
                  style={{ boxShadow: `0 0 80px ${hexToRgba(cat.color, 0.12)}` }}
                />
              ) : cat.media[modalIndex]?.type === 'gif' ? (
                <video
                  src={cat.media[modalIndex]?.src}
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl"
                  playsInline
                  autoPlay
                  muted
                  loop
                  style={{ boxShadow: `0 0 80px ${hexToRgba(cat.color, 0.12)}` }}
                />
              ) : (
                <div className="relative max-w-full max-h-full flex items-center justify-center" style={{ height: '82vh' }}>
                  <Image
                    src={cat.media[modalIndex]?.src || ''}
                    alt={`${cat.nombre} ${modalIndex + 1}`}
                    width={1920}
                    height={1080}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl"
                    style={{ boxShadow: `0 0 80px ${hexToRgba(cat.color, 0.12)}` }}
                    priority
                  />
                </div>
              )}
            </div>

            {/* Next */}
            <button
              onClick={nextItem}
              className="absolute right-4 md:right-8 z-50 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white/50 hover:text-white p-4 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer group"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Bottom dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4">
            <div className="text-center">
              <span className="text-sm uppercase tracking-widest" style={{ color: cat.color }}>
                {cat.media[modalIndex]?.type === 'video' ? 'Video' : cat.media[modalIndex]?.type === 'gif' ? 'GIF' : 'Imagen'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {cat.media.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (videoRef.current) videoRef.current.pause();
                    setModalIndex(i);
                  }}
                  className="transition-all duration-300 rounded-full cursor-pointer"
                  style={{
                    width: modalIndex === i ? '28px' : '6px',
                    height: '6px',
                    background: modalIndex === i ? cat.color : 'rgba(255,255,255,0.2)',
                    boxShadow: modalIndex === i ? `0 0 12px ${hexToRgba(cat.color, 0.5)}` : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════ */}
      {/* GLOBAL STYLES                    */}
      {/* ════════════════════════════════ */}
      <style jsx global>{`
        .gallery-masonry {
          columns: 2;
          column-gap: 12px;
        }

        @media (min-width: 768px) {
          .gallery-masonry {
            columns: 3;
            column-gap: 16px;
          }
        }

        @media (min-width: 1024px) {
          .gallery-masonry {
            columns: 4;
            column-gap: 16px;
          }
        }

        .gallery-masonry > * {
          break-inside: avoid;
          margin-bottom: 12px;
        }

        @media (min-width: 768px) {
          .gallery-masonry > * {
            margin-bottom: 16px;
          }
        }

        @keyframes modalStarTwinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }

        @keyframes galleryScrollIndicator {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(300%);
            opacity: 0;
          }
        }

        .gallery-scroll-indicator {
          animation: galleryScrollIndicator 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// ════════════════════════════════
// GALLERY CARD SUB-COMPONENT
// ════════════════════════════════
function GalleryCard({
  item,
  catColor,
  index,
  onClick,
}: {
  item: MediaItem;
  catColor: string;
  index: number;
  onClick: () => void;
}) {
  const videoCardRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleEnter = () => {
    setIsHovered(true);
    if (item.type === 'video' && videoCardRef.current) {
      videoCardRef.current.play().catch(() => { });
    }
  };

  const handleLeave = () => {
    setIsHovered(false);
    // Only pause regular videos, not gifs
    if (item.type === 'video' && videoCardRef.current) {
      videoCardRef.current.pause();
      videoCardRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.5s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered
          ? `0 20px 50px ${hexToRgba(catColor, 0.12)}, 0 0 0 1px ${hexToRgba(catColor, 0.15)}`
          : '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {item.type === 'image' ? (
        <Image
          src={item.src}
          alt={`Gallery item ${index + 1}`}
          width={800}
          height={600}
          className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      ) : item.type === 'gif' ? (
        <video
          ref={(el) => {
            if (el) {
              el.muted = true;
              el.play().catch(() => { });
            }
          }}
          src={item.src}
          className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
          playsInline
          autoPlay
          muted
          loop
        />
      ) : (
        <video
          ref={videoCardRef}
          src={item.src}
          className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
          playsInline
          preload="metadata"
          muted
          loop
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)',
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${hexToRgba(catColor, 0.35)}`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Play/View icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm scale-75 group-hover:scale-100 transition-transform duration-500"
          style={{
            background: hexToRgba(catColor, 0.15),
            border: `1px solid ${hexToRgba(catColor, 0.3)}`,
          }}
        >
          {item.type === 'video' ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: catColor, marginLeft: '2px' }}
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          ) : item.type === 'gif' ? (
            <span className="text-xs font-bold" style={{ color: catColor }}>GIF</span>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ color: catColor }}
            >
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          )}
        </div>
      </div>

      {/* Type badge */}
      {(item.type === 'video' || item.type === 'gif') && (
        <div className="absolute top-3 left-3 pointer-events-none">
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider backdrop-blur-sm"
            style={{
              background: 'rgba(0,0,0,0.5)',
              color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {item.type === 'video' ? (
              <>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Video
              </>
            ) : (
              <span>GIF</span>
            )}
          </div>
        </div>
      )}

      {/* Index number */}
      <div className="absolute bottom-3 right-3 pointer-events-none">
        <span
          className="text-xl font-black opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#fff' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}

// ════════════════════════════════
// MODAL STARS
// ════════════════════════════════
function ModalStars() {
  const [stars] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.8,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `modalStarTwinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.4)`,
          }}
        />
      ))}
    </div>
  );
}
