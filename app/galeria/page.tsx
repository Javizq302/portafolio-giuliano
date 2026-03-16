'use client';

import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect, useRef, useCallback } from 'react';

const CDN = process.env.NEXT_PUBLIC_BUNNY_CDN_URL ?? '';

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
      // ── Row 1: c1-i1, c2-i1, c3-i1, c4-i1 ──
      { id: 1, src: `${CDN}/galeria/colorlab/image-colorlab-c1-i1.webp`, type: 'image' as const },
      { id: 2, src: `${CDN}/galeria/colorlab/image-colorlab-c2-i1.webp`, type: 'image' as const },
      { id: 3, src: `${CDN}/galeria/colorlab/image-colorlab-c3-i1.webp`, type: 'image' as const },
      { id: 4, src: `${CDN}/galeria/colorlab/image-colorlab-c4-i1.webp`, type: 'image' as const },
      // ── Row 2: c1-i2, c2-i2, c3-i2, c4-i2 ──
      { id: 5, src: `${CDN}/galeria/colorlab/image-colorlab-c1-i2.webp`, type: 'image' as const },
      { id: 6, src: `${CDN}/galeria/colorlab/image-colorlab-c2-i2.webp`, type: 'image' as const },
      { id: 7, src: `${CDN}/galeria/colorlab/image-colorlab-c3-i2.webp`, type: 'image' as const },
      { id: 8, src: `${CDN}/galeria/colorlab/image-colorlab-c4-i2.webp`, type: 'image' as const },
      // ── Row 3: c1-i3, c2-i3, c3-i3, c4-i3 ──
      { id: 9, src: `${CDN}/galeria/colorlab/image-colorlab-c1-i3.webp`, type: 'image' as const },
      { id: 10, src: `${CDN}/galeria/colorlab/gif-colorlab-c2-i3.mp4`, type: 'gif' as const },
      { id: 11, src: `${CDN}/galeria/colorlab/image-colorlab-c3-i3.webp`, type: 'image' as const },
      { id: 12, src: `${CDN}/galeria/colorlab/image-colorlab-c4-i3.webp`, type: 'image' as const },
      // ── Row 4 (horizontal): c5-i1, c5-i2, c5-i3, c5-i4 ──
      { id: 13, src: `${CDN}/galeria/colorlab/image-colorlab-c5-i1.webp`, type: 'image' as const },
      { id: 14, src: `${CDN}/galeria/colorlab/image-colorlab-c5-i2.webp`, type: 'image' as const },
      { id: 15, src: `${CDN}/galeria/colorlab/gif-colorlab-c5-i3.mp4`, type: 'gif' as const },
      { id: 16, src: `${CDN}/galeria/colorlab/image-colorlab-c5-i4.webp`, type: 'image' as const },
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
      { id: 1, src: `${CDN}/galeria/musicvisuals/image-1-musicvisuals.webp`, type: 'image' as const },
      { id: 2, src: `${CDN}/galeria/musicvisuals/image-2-musicvisuals.webp`, type: 'image' as const },
      { id: 3, src: `${CDN}/galeria/musicvisuals/image-3-musicvisuals.webp`, type: 'image' as const },
      { id: 5, src: `${CDN}/galeria/musicvisuals/image-5-musicvisuals.webp`, type: 'image' as const },
      { id: 6, src: `${CDN}/galeria/musicvisuals/image-6-musicvisuals.webp`, type: 'image' as const },
      { id: 7, src: `${CDN}/galeria/musicvisuals/image-7-musicvisuals.webp`, type: 'image' as const },
      { id: 8, src: `${CDN}/galeria/musicvisuals/image-8-musicvisuals.webp`, type: 'image' as const },
      { id: 9, src: `${CDN}/galeria/musicvisuals/image-9-musicvisuals.webp`, type: 'image' as const },
      { id: 10, src: `${CDN}/galeria/musicvisuals/image-10-musicvisuals.webp`, type: 'image' as const },
      { id: 11, src: `${CDN}/galeria/musicvisuals/image-11-musicvisuals.webp`, type: 'image' as const },
      { id: 12, src: `${CDN}/galeria/musicvisuals/image-12-musicvisuals.webp`, type: 'image' as const },
      { id: 13, src: `${CDN}/galeria/musicvisuals/image-13-musicvisuals.webp`, type: 'image' as const },
      { id: 14, src: `${CDN}/galeria/musicvisuals/image-14-musicvisuals.webp`, type: 'image' as const },
      { id: 15, src: `${CDN}/galeria/musicvisuals/video-1-musicvisuals.mp4`, type: 'video' as const },
      { id: 16, src: `${CDN}/galeria/musicvisuals/video-2-musicvisuals.mp4`, type: 'video' as const },
      { id: 17, src: `${CDN}/galeria/musicvisuals/video-3-musicvisuals.mp4`, type: 'video' as const },
      { id: 18, src: `${CDN}/galeria/musicvisuals/video-5-musicvisuals.mp4`, type: 'video' as const },
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
        src: `${CDN}/galeria/personalbrands/image-${i}-personalbrands.webp`,
        type: 'image' as const,
      })),
      { id: 11, src: `${CDN}/galeria/personalbrands/image-11-personalbrands.webp`, type: 'image' as const },
      { id: 12, src: `${CDN}/galeria/personalbrands/video-1-personalbrands.mp4`, type: 'video' as const },
      { id: 13, src: `${CDN}/galeria/personalbrands/video-2-personalbrands.MP4`, type: 'video' as const },
      { id: 14, src: `${CDN}/galeria/personalbrands/video-3-personalbrands.mp4`, type: 'video' as const },
      { id: 15, src: `${CDN}/galeria/personalbrands/video-4-personalbrands.mp4`, type: 'video' as const },
      { id: 16, src: `${CDN}/galeria/personalbrands/video-5-personalbrands.MP4`, type: 'video' as const },
      { id: 17, src: `${CDN}/galeria/personalbrands/video-6-personalbrands.MP4`, type: 'video' as const },
      { id: 18, src: `${CDN}/galeria/personalbrands/video-7-personalbrands.mp4`, type: 'video' as const },
      { id: 19, src: `${CDN}/galeria/personalbrands/video-8-personalbrands.mp4`, type: 'video' as const },
      { id: 20, src: `${CDN}/galeria/personalbrands/image-12-personalbrands.webp`, type: 'image' as const },
      { id: 21, src: `${CDN}/galeria/personalbrands/gif-13-personalbrands.mp4`, type: 'gif' as const },
      { id: 22, src: `${CDN}/galeria/personalbrands/gif-14-personalbrands.mp4`, type: 'gif' as const },
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
      { id: 1, src: `${CDN}/galeria/livemoments/image-1-livemoments.webp`, type: 'image' as const },
      { id: 2, src: `${CDN}/galeria/livemoments/image-2-livemoments.webp`, type: 'image' as const },
      { id: 3, src: `${CDN}/galeria/livemoments/image-3-livemoments.webp`, type: 'image' as const },
      { id: 4, src: `${CDN}/galeria/livemoments/image-4-livemoments.webp`, type: 'image' as const },
      { id: 5, src: `${CDN}/galeria/livemoments/image-5-livemoments.webp`, type: 'image' as const },
      { id: 6, src: `${CDN}/galeria/livemoments/image-6-livemoments.webp`, type: 'image' as const },
      { id: 8, src: `${CDN}/galeria/livemoments/gif-1-livemoments.mp4`, type: 'gif' as const },
      { id: 9, src: `${CDN}/galeria/livemoments/gif-2-livemoments.mp4`, type: 'gif' as const },
      { id: 10, src: `${CDN}/galeria/livemoments/gif-3-livemoments.mp4`, type: 'gif' as const },
      { id: 11, src: `${CDN}/galeria/livemoments/gif-4-livemoments.mp4`, type: 'gif' as const },
      { id: 12, src: `${CDN}/galeria/livemoments/video-1-livemoments.MP4`, type: 'video' as const },
      { id: 13, src: `${CDN}/galeria/livemoments/video-2-livemoments.MP4`, type: 'video' as const },
      { id: 14, src: `${CDN}/galeria/livemoments/video-3-livemoments.mp4`, type: 'video' as const },
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
      { id: 1, src: `${CDN}/galeria/foodmood/image-11-foodmood.webp`, type: 'image' as const },
      { id: 2, src: `${CDN}/galeria/foodmood/image-12-foodmood.webp`, type: 'image' as const },
      { id: 3, src: `${CDN}/galeria/foodmood/image-5-foodmood.webp`, type: 'image' as const },
      { id: 4, src: `${CDN}/galeria/foodmood/image-6-foodmood.webp`, type: 'image' as const },
      { id: 5, src: `${CDN}/galeria/foodmood/image-7-foodmood.webp`, type: 'image' as const },
      { id: 6, src: `${CDN}/galeria/foodmood/image-8-foodmood.webp`, type: 'image' as const },
      { id: 7, src: `${CDN}/galeria/foodmood/image-9-foodmood.webp`, type: 'image' as const },
      { id: 8, src: `${CDN}/galeria/foodmood/image-10-foodmood.webp`, type: 'image' as const },
      { id: 9, src: `${CDN}/galeria/foodmood/image-2-foodmood.webp`, type: 'image' as const },
      { id: 10, src: `${CDN}/galeria/foodmood/image-4-foodmood.webp`, type: 'image' as const },
      { id: 11, src: `${CDN}/galeria/foodmood/video-1-foodmood.MP4`, type: 'video' as const },
      { id: 12, src: `${CDN}/galeria/foodmood/video-2-foodmood.mp4`, type: 'video' as const },
      { id: 13, src: `${CDN}/galeria/foodmood/video-3-foodmood.mp4`, type: 'video' as const },
      { id: 14, src: `${CDN}/galeria/foodmood/video-4-foodmood.mp4`, type: 'video' as const },
      { id: 15, src: `${CDN}/galeria/foodmood/video-5-foodmood.MP4`, type: 'video' as const },
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
// ║              'default'         → primera imagen ancha, resto cuadradas ║
// ║              'default-rotated' → 2 cuadradas izq + 1 vertical der     ║
// ║              'vertical'        → todas en formato vertical             ║
// ║              'horizontal'      → todas en formato horizontal           ║
// ║              'square'          → todas en formato cuadrado             ║
// ║                                                                        ║
// ║  Si mediaIndices está vacío [], se toman las primeras 'previewCount'   ║
// ║  fotos automáticamente.                                                ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const PREVIEW_COLLAGE_CONFIG: Record<string, { previewCount: number; mediaIndices: number[]; layout: 'default' | 'default-rotated' | 'vertical' | 'horizontal' | 'square' }> = {
  colorlab: {
    previewCount: 2,          // Cantidad de fotos en el collage
    mediaIndices: [3, 0],  // Índices: image-1, image-2, image-3
    layout: 'horizontal',
  },
  musicvisuals: {
    previewCount: 1,
    mediaIndices: [12],
    layout: 'square',
  },
  personalbrands: {
    previewCount: 3,
    mediaIndices: [4, 1, 2],
    layout: 'default-rotated',
  },
  livemoments: {
    previewCount: 1,
    mediaIndices: [6],
    layout: 'vertical',
  },
  foodmood: {
    previewCount: 4,
    mediaIndices: [3, 6, 8, 9],
    layout: 'square',
  },
};

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  CONFIGURACIÓN DE FRAME DE PORTADA PARA VIDEOS (Music Visuals)           ║
// ║                                                                          ║
// ║  Asigna el segundo del video que se mostrará como portada.               ║
// ║  La key es el src del video, el value es el tiempo en segundos.          ║
// ║  Ejemplo: 15 = segundo 0:15 del video.                                   ║
// ║  Si el valor es 0, el video mostrará el primer frame por defecto.        ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const VIDEO_POSTER_CONFIG: Record<string, number> = {
  // ── Music Visuals ──
  [`${CDN}/galeria/musicvisuals/video-1-musicvisuals.mp4`]: 24.49,
  [`${CDN}/galeria/musicvisuals/video-2-musicvisuals.mp4`]: 7.89,
  [`${CDN}/galeria/musicvisuals/video-3-musicvisuals.mp4`]: 31,
  [`${CDN}/galeria/musicvisuals/video-4-musicvisuals.mp4`]: 16,
  // ── Personal Brands ──
  [`${CDN}/galeria/personalbrands/video-1-personalbrands.mp4`]: 13,
  [`${CDN}/galeria/personalbrands/video-2-personalbrands.MP4`]: 3.5,
  [`${CDN}/galeria/personalbrands/video-3-personalbrands.mp4`]: 5,
  [`${CDN}/galeria/personalbrands/video-4-personalbrands.mp4`]: 5,
  [`${CDN}/galeria/personalbrands/video-5-personalbrands.MP4`]: 7,
  [`${CDN}/galeria/personalbrands/video-6-personalbrands.MP4`]: 4,
  [`${CDN}/galeria/personalbrands/video-7-personalbrands.mp4`]: 8,
  [`${CDN}/galeria/personalbrands/video-8-personalbrands.mp4`]: 11,
  // ── Live Moments ──
  [`${CDN}/galeria/livemoments/video-1-livemoments.MP4`]: 51,
  [`${CDN}/galeria/livemoments/video-2-livemoments.MP4`]: 6.4,
  [`${CDN}/galeria/livemoments/video-3-livemoments.mp4`]: 0.6,
  // ── Food Mood ──
  [`${CDN}/galeria/foodmood/video-1-foodmood.MP4`]: 1.8,
  [`${CDN}/galeria/foodmood/video-2-foodmood.mp4`]: 1,
  [`${CDN}/galeria/foodmood/video-3-foodmood.mp4`]: 1.3,
  [`${CDN}/galeria/foodmood/video-4-foodmood.mp4`]: 8.5,
  [`${CDN}/galeria/foodmood/video-5-foodmood.MP4`]: 1,
};

// ────────────────────────────────
// Imágenes excluidas de la galería (solo portada/preview)
// Estas imágenes aparecen en el hero pero NO en el grid de la galería
// ────────────────────────────────
const GALLERY_EXCLUDE_SRCS = new Set([
  `${CDN}/galeria/musicvisuals/image-14-musicvisuals.webp`,
  `${CDN}/galeria/livemoments/gif-1-livemoments.mp4`,
]);

// ──────────────────────────────────────────────────────────────────────────────
// Color Lab — orden personalizado de imágenes para la galería modal
// ──────────────────────────────────────────────────────────────────────────────
// Al hacer click en cualquier imagen de Color Lab y abrir el lightbox,
// las flechas de navegación seguirán este orden de IDs.
// ──────────────────────────────────────────────────────────────────────────────
const COLORLAB_GALLERY_ORDER: number[] = [1, 5, 9, 2, 6, 10, 3, 7, 11, 4, 8, 12, 13, 14, 15, 16];

// ──────────────────────────────────────────────────────────────────────────────
// Music Visuals — orden personalizado para galerías separadas (videos / imágenes)
// ──────────────────────────────────────────────────────────────────────────────
// Music Visuals tiene DOS galerías independientes en el lightbox:
//   1. Galería de Videos  → al hacer click en un video, solo navegas entre videos
//   2. Galería de Imágenes → al hacer click en una imagen, solo navegas entre imágenes
// Cada array define el orden de IDs para su galería respectiva.
// ──────────────────────────────────────────────────────────────────────────────
const MV_VIDEO_ORDER: number[] = [15, 16, 17, 18];
const MV_IMAGE_ORDER: number[] = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13];

// ──────────────────────────────────────────────────────────────────────────────
// Personal Brands — orden personalizado para galerías separadas (videos / imágenes)
// ──────────────────────────────────────────────────────────────────────────────
// Mismo sistema que Music Visuals: DOS galerías independientes en el lightbox.
// GIFs se incluyen en la galería de imágenes.
// ──────────────────────────────────────────────────────────────────────────────
const PB_VIDEO_ORDER: number[] = [12, 13, 14, 15, 16, 17, 18, 19];
const PB_IMAGE_ORDER: number[] = [1, 2, 3, 4, 10, 22, 6, 5, 7, 8, 9, 21, 11];

// ──────────────────────────────────────────────────────────────────────────────
// Personal Brands — distribución de imágenes por columna
// ──────────────────────────────────────────────────────────────────────────────
// Cada sub-array contiene los ÍNDICES de las imágenes (dentro del array de
// imágenes filtrado, no del media completo) que van en esa columna.
// Ajusta la distribución para balancear la altura de las columnas.
// El layout usa justify-between, así que columnas más cortas tendrán
// un poco más de espacio entre imágenes — se ve como parte del diseño.
// ──────────────────────────────────────────────────────────────────────────────
const PB_IMAGE_COLUMNS: number[][] = [
  [0, 9, 6],   // Columna 1
  [1, 13, 7],   // Columna 2
  [2, 5, 8],   // Columna 3
  [3, 4, 12, 10],  // Columna 4
];

// ──────────────────────────────────────────────────────────────────────────────
// Live Moments — orden personalizado para galerías separadas (videos / imágenes)
// ──────────────────────────────────────────────────────────────────────────────
// GIFs se incluyen en la galería de imágenes (se tratan igual).
// ──────────────────────────────────────────────────────────────────────────────
const LM_VIDEO_ORDER: number[] = [12, 13, 14];
const LM_IMAGE_ORDER: number[] = [1, 2, 3, 4, 5, 6, 9, 10, 11];

// ──────────────────────────────────────────────────────────────────────────────
// Live Moments — distribución de imágenes+GIFs por columna (3 columnas)
// ──────────────────────────────────────────────────────────────────────────────
// Diseño "Staggered Mosaic": 3 columnas escalonadas para crear un efecto
// dinámico con todas las imágenes verticales. Los índices son posiciones dentro
// del array filtrado de images+gifs (no IDs del media).
// Col 1: arranca con padding superior para crear efecto escalonado
// Col 2: empieza sin padding (la más alta)
// Col 3: padding medio
// ──────────────────────────────────────────────────────────────────────────────
const LM_IMAGE_COLUMNS: number[][] = [
  [0, 3, 6],      // Columna 1 (3 items)
  [1, 4, 7],      // Columna 2 (3 items)
  [2, 5, 8],      // Columna 3 (3 items)
];
// Padding top en px para cada columna (efecto cascada)
const LM_COLUMN_OFFSETS: number[] = [60, 0, 30];

// ──────────────────────────────────────────────────────────────────────────────
// Food Mood — orden personalizado para galerías separadas (videos / imágenes)
// ──────────────────────────────────────────────────────────────────────────────
const FM_VIDEO_ORDER: number[] = [12, 11, 15, 13, 14];
const FM_IMAGE_ORDER: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// ──────────────────────────────────────────────────────────────────────────────
// Food Mood — distribución de imágenes por filas horizontales
// ──────────────────────────────────────────────────────────────────────────────
// Row 1: 4 imágenes | Row 2: 4 imágenes | Row 3: 2 imágenes centradas
const FM_IMAGE_ROWS: number[][] = [
  [0, 1, 2, 3],   // Fila 1 (4 items)
  [4, 5, 6, 7],   // Fila 2 (4 items)
  [8, 9],          // Fila 3 (2 items, centradas)
];

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
  const [modalGalleryType, setModalGalleryType] = useState<'all' | 'videos' | 'images'>('all');
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [carouselOffset, setCarouselOffset] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const previewVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const cat = categorias[activeSection];

  // ── Compute reordered media list for the modal ──
  // Color Lab: custom order for all items
  // Music Visuals: separate galleries for videos and images, each with custom order
  const modalMedia = (() => {
    const byId = new Map(cat.media.map((m) => [m.id, m]));
    if (cat.id === 'colorlab') {
      return COLORLAB_GALLERY_ORDER
        .filter((id) => byId.has(id))
        .map((id) => byId.get(id)!);
    }
    if (cat.id === 'musicvisuals') {
      if (modalGalleryType === 'videos') {
        return MV_VIDEO_ORDER
          .filter((id) => byId.has(id))
          .map((id) => byId.get(id)!);
      }
      if (modalGalleryType === 'images') {
        return MV_IMAGE_ORDER
          .filter((id) => byId.has(id))
          .map((id) => byId.get(id)!);
      }
    }
    if (cat.id === 'personalbrands') {
      if (modalGalleryType === 'videos') {
        return PB_VIDEO_ORDER
          .filter((id) => byId.has(id))
          .map((id) => byId.get(id)!);
      }
      if (modalGalleryType === 'images') {
        return PB_IMAGE_ORDER
          .filter((id) => byId.has(id))
          .map((id) => byId.get(id)!);
      }
    }
    if (cat.id === 'livemoments') {
      if (modalGalleryType === 'videos') {
        return LM_VIDEO_ORDER
          .filter((id) => byId.has(id))
          .map((id) => byId.get(id)!);
      }
      if (modalGalleryType === 'images') {
        return LM_IMAGE_ORDER
          .filter((id) => byId.has(id))
          .map((id) => byId.get(id)!);
      }
    }
    if (cat.id === 'foodmood') {
      if (modalGalleryType === 'videos') {
        return FM_VIDEO_ORDER
          .filter((id) => byId.has(id))
          .map((id) => byId.get(id)!);
      }
      if (modalGalleryType === 'images') {
        return FM_IMAGE_ORDER
          .filter((id) => byId.has(id))
          .map((id) => byId.get(id)!);
      }
    }
    return cat.media;
  })();

  // ── Switch section with transition ──
  const switchSection = useCallback(
    (index: number) => {
      if (index === activeSection || isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSection(index);
        setCarouselOffset(0);
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
  const openModal = (idx: number, galleryType: 'all' | 'videos' | 'images' = 'all') => {
    setModalGalleryType(galleryType);
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
    setModalIndex((prev) => (prev + 1) % modalMedia.length);
  }, [modalMedia.length]);

  const prevItem = useCallback(() => {
    if (videoRef.current) videoRef.current.pause();
    setModalIndex((prev) => (prev - 1 + modalMedia.length) % modalMedia.length);
  }, [modalMedia.length]);

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
              <div className={`${collageConfig?.layout === 'vertical'
                ? 'flex justify-center'
                : collageConfig?.layout === 'square' && previewItems.length === 1
                  ? 'flex items-center justify-center h-full'
                  : collageConfig?.layout === 'default-rotated'
                    ? 'grid grid-cols-2 grid-rows-2'
                    : 'grid grid-cols-2'
                } gap-3 max-w-lg ml-auto`}>
                {previewItems.map((item, idx) => (
                  <div
                    key={`${cat.id}-preview-${idx}`}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer group ${collageConfig?.layout === 'vertical'
                      ? 'w-80 aspect-[9/16]'
                      : collageConfig?.layout === 'horizontal'
                        ? 'col-span-2 aspect-[16/9]'
                        : collageConfig?.layout === 'square'
                          ? previewItems.length === 1
                            ? 'w-80 md:w-96 aspect-square'
                            : 'aspect-square'
                          : collageConfig?.layout === 'default-rotated'
                            ? idx === 0
                              ? 'aspect-[11/23]'
                              : 'aspect-square'
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
                      ...(collageConfig?.layout === 'default-rotated' && idx === 0
                        ? { gridColumn: '2', gridRow: '1 / 3' }
                        : {}),
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

        <div className={`relative z-10 mx-auto ${(cat.id === 'colorlab' || cat.id === 'musicvisuals' || cat.id === 'personalbrands' || cat.id === 'livemoments' || cat.id === 'foodmood') ? 'max-w-[1600px] px-4 md:px-8 lg:px-12' : 'max-w-7xl px-6 md:px-12 lg:px-20'}`}>
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

          {/* ── Color Lab: CSS Grid 4×4 Layout ── */}
          {cat.id === 'colorlab' ? (
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
            >
              {cat.media.map((item, idx) => {
                // Find the index in the reordered modalMedia so the lightbox starts at the right position
                const modalIdx = modalMedia.findIndex((m) => m.id === item.id);
                return (
                  <GalleryCard
                    key={`${cat.id}-${item.id}`}
                    item={item}
                    catColor={cat.color}
                    index={idx}
                    onClick={() => openModal(modalIdx !== -1 ? modalIdx : idx)}
                  />
                );
              })}
            </div>
          ) : cat.id === 'musicvisuals' ? (
            <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
              {/* Videos Section */}
              {(() => {
                const videos = cat.media.filter(m => m.type === 'video');
                const images = cat.media.filter(m => (m.type === 'image' || m.type === 'gif') && !GALLERY_EXCLUDE_SRCS.has(m.src));
                return (
                  <>
                    {videos.length > 0 && (() => {
                      const VISIBLE = 3;
                      const GAP = 16;
                      const maxOffset = Math.max(0, videos.length - VISIBLE);
                      const offset = Math.min(carouselOffset, maxOffset);
                      // Each card width = (100% - gaps) / VISIBLE
                      // translateX = offset * (cardWidth + gap) as percentage of container
                      const cardWidthPercent = (100 - (VISIBLE - 1) * GAP / 10) / VISIBLE; // approximate
                      return (
                        <div className="mb-6 relative">
                          {/* Outer wrapper — uses margin/padding trick to give shadow breathing room */}
                          <div
                            style={{
                              overflow: 'hidden',
                              margin: '-12px -12px -60px -12px',
                              padding: '12px 12px 60px 12px',
                            }}
                          >
                            {/* Sliding track */}
                            <div
                              className="flex gap-4"
                              style={{
                                transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                transform: `translateX(calc(-${offset} * (${100 / VISIBLE}% + ${GAP - GAP / VISIBLE}px)))`,
                              }}
                            >
                              {videos.map((video) => {
                                // Find position in the video-only ordered list
                                const videoOrderIdx = MV_VIDEO_ORDER.indexOf(video.id);
                                const startTime = VIDEO_POSTER_CONFIG[video.src] ?? 0;
                                return (
                                  <div
                                    key={`${cat.id}-video-${video.id}`}
                                    className="group relative rounded-2xl overflow-hidden cursor-pointer flex-shrink-0"
                                    style={{
                                      width: `calc((100% - ${(VISIBLE - 1) * GAP}px) / ${VISIBLE})`,
                                      transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.5s ease',
                                    }}
                                    onClick={() => openModal(videoOrderIdx !== -1 ? videoOrderIdx : 0, 'videos')}
                                    onMouseEnter={(e) => {
                                      const el = e.currentTarget;
                                      el.style.transform = 'translateY(-4px)';
                                      el.style.boxShadow = `0 20px 50px ${hexToRgba(cat.color, 0.12)}, 0 0 0 1px ${hexToRgba(cat.color, 0.15)}`;
                                      const vid = el.querySelector('video');
                                      if (vid) { vid.currentTime = 0; vid.play().catch(() => { }); }
                                    }}
                                    onMouseLeave={(e) => {
                                      const el = e.currentTarget;
                                      el.style.transform = 'translateY(0)';
                                      el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
                                      const vid = el.querySelector('video');
                                      if (vid) { vid.pause(); vid.currentTime = startTime; }
                                    }}
                                  >
                                    <video

                                      src={`${video.src}#t=${startTime}`}
                                      className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                                      playsInline
                                      preload="metadata"
                                      muted
                                      loop
                                    />
                                    {/* Gradient overlay */}
                                    <div
                                      className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                                      style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)' }}
                                    />
                                    {/* Hover border glow */}
                                    <div
                                      className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none opacity-0 group-hover:opacity-100"
                                      style={{ boxShadow: `inset 0 0 0 1px ${hexToRgba(cat.color, 0.35)}` }}
                                    />
                                    {/* Play icon */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none">
                                      <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm scale-75 group-hover:scale-100 transition-transform duration-500"
                                        style={{
                                          background: hexToRgba(cat.color, 0.15),
                                          border: `1px solid ${hexToRgba(cat.color, 0.3)}`,
                                        }}
                                      >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: cat.color, marginLeft: '2px' }}>
                                          <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                      </div>
                                    </div>
                                    {/* Video badge */}
                                    <div className="absolute top-3 left-3 pointer-events-none">
                                      <div
                                        className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider backdrop-blur-sm"
                                        style={{
                                          background: 'rgba(0,0,0,0.5)',
                                          color: 'rgba(255,255,255,0.7)',
                                          border: '1px solid rgba(255,255,255,0.1)',
                                        }}
                                      >
                                        <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                                        Video
                                      </div>
                                    </div>
                                    {/* Index number */}
                                    <div className="absolute bottom-3 right-3 pointer-events-none">
                                      <span
                                        className="text-xl font-black opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                                        style={{ fontFamily: 'var(--font-space-grotesk)', color: '#fff' }}
                                      >
                                        {String(videoOrderIdx + 1).padStart(2, '0')}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Navigation arrows */}
                          {maxOffset > 0 && (
                            <>
                              {/* Left arrow */}
                              <button
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110"
                                style={{
                                  background: hexToRgba(cat.color, 0.15),
                                  border: `1px solid ${hexToRgba(cat.color, 0.3)}`,
                                  backdropFilter: 'blur(12px)',
                                  boxShadow: `0 4px 20px ${hexToRgba(cat.color, 0.2)}`,
                                  opacity: offset > 0 ? 1 : 0.3,
                                  pointerEvents: offset > 0 ? 'auto' : 'none',
                                }}
                                onClick={() => setCarouselOffset(Math.max(0, offset - 1))}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={cat.color} strokeWidth="2.5">
                                  <path d="M15 18l-6-6 6-6" />
                                </svg>
                              </button>

                              {/* Right arrow */}
                              <button
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110"
                                style={{
                                  background: hexToRgba(cat.color, 0.15),
                                  border: `1px solid ${hexToRgba(cat.color, 0.3)}`,
                                  backdropFilter: 'blur(12px)',
                                  boxShadow: `0 4px 20px ${hexToRgba(cat.color, 0.2)}`,
                                  opacity: offset < maxOffset ? 1 : 0.3,
                                  pointerEvents: offset < maxOffset ? 'auto' : 'none',
                                }}
                                onClick={() => setCarouselOffset(Math.min(maxOffset, offset + 1))}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={cat.color} strokeWidth="2.5">
                                  <path d="M9 18l6-6-6-6" />
                                </svg>
                              </button>
                            </>
                          )}
                        </div>
                      );
                    })()}

                    {/* Subtle divider */}
                    {videos.length > 0 && images.length > 0 && (
                      <div className="flex items-center justify-center my-8">
                        <div
                          className="h-px w-full max-w-md rounded-full"
                          style={{
                            background: `linear-gradient(to right, transparent, ${hexToRgba(cat.color, 0.15)}, transparent)`,
                          }}
                        />
                      </div>
                    )}

                    {/* Images Grid — 3 columns */}
                    {images.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {images.map((image) => {
                          // Find position in the image-only ordered list
                          const imageOrderIdx = MV_IMAGE_ORDER.indexOf(image.id);
                          return (
                            <GalleryCard
                              key={`${cat.id}-img-${image.id}`}
                              item={image}
                              catColor={cat.color}
                              index={imageOrderIdx !== -1 ? imageOrderIdx : 0}
                              onClick={() => openModal(imageOrderIdx !== -1 ? imageOrderIdx : 0, 'images')}
                            />
                          );
                        })}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          ) : cat.id === 'personalbrands' ? (
            <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
              {(() => {
                const videos = cat.media.filter(m => m.type === 'video');
                const images = cat.media.filter(m => m.type === 'image' || m.type === 'gif');
                return (
                  <>
                    {/* Videos Section — horizontal row */}
                    {videos.length > 0 && (() => {
                      const VISIBLE = 4;
                      const GAP = 16;
                      const maxOffset = Math.max(0, videos.length - VISIBLE);
                      const offset = Math.min(carouselOffset, maxOffset);
                      return (
                        <div className="mb-6 relative">
                          {/* Outer wrapper — margin/padding trick for shadow breathing room */}
                          <div
                            style={{
                              overflow: 'hidden',
                              margin: '-12px -12px -60px -12px',
                              padding: '12px 12px 60px 12px',
                            }}
                          >
                            {/* Sliding track */}
                            <div
                              className="flex gap-4"
                              style={{
                                transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                transform: `translateX(calc(-${offset} * (${100 / VISIBLE}% + ${GAP - GAP / VISIBLE}px)))`,
                              }}
                            >
                              {videos.map((video) => {
                                // Find position in the video-only ordered list
                                const videoOrderIdx = PB_VIDEO_ORDER.indexOf(video.id);
                                const startTime = VIDEO_POSTER_CONFIG[video.src] ?? 0;
                                return (
                                  <div
                                    key={`${cat.id}-video-${video.id}`}
                                    className="group relative rounded-2xl overflow-hidden cursor-pointer flex-shrink-0"
                                    style={{
                                      width: `calc((100% - ${(VISIBLE - 1) * GAP}px) / ${VISIBLE})`,
                                      aspectRatio: '16 / 9',
                                      transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.5s ease',
                                    }}
                                    onClick={() => openModal(videoOrderIdx !== -1 ? videoOrderIdx : 0, 'videos')}
                                    onMouseEnter={(e) => {
                                      const el = e.currentTarget;
                                      el.style.transform = 'translateY(-4px)';
                                      el.style.boxShadow = `0 20px 50px ${hexToRgba(cat.color, 0.12)}, 0 0 0 1px ${hexToRgba(cat.color, 0.15)}`;
                                      const vid = el.querySelector('video');
                                      if (vid) vid.play().catch(() => { });
                                    }}
                                    onMouseLeave={(e) => {
                                      const el = e.currentTarget;
                                      el.style.transform = 'translateY(0)';
                                      el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
                                      const vid = el.querySelector('video');
                                      if (vid) { vid.pause(); vid.currentTime = startTime; }
                                    }}
                                  >
                                    <video

                                      src={`${video.src}#t=${startTime}`}
                                      className="absolute inset-0 w-full h-full object-cover block transition-transform duration-700 group-hover:scale-105"
                                      playsInline
                                      preload="metadata"
                                      muted
                                      loop
                                    />
                                    {/* Gradient overlay */}
                                    <div
                                      className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                                      style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)' }}
                                    />
                                    {/* Hover border glow */}
                                    <div
                                      className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none opacity-0 group-hover:opacity-100"
                                      style={{ boxShadow: `inset 0 0 0 1px ${hexToRgba(cat.color, 0.35)}` }}
                                    />
                                    {/* Play icon */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none">
                                      <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm scale-75 group-hover:scale-100 transition-transform duration-500"
                                        style={{
                                          background: hexToRgba(cat.color, 0.15),
                                          border: `1px solid ${hexToRgba(cat.color, 0.3)}`,
                                        }}
                                      >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: cat.color, marginLeft: '2px' }}>
                                          <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                      </div>
                                    </div>
                                    {/* Video badge */}
                                    <div className="absolute top-3 left-3 pointer-events-none">
                                      <div
                                        className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider backdrop-blur-sm"
                                        style={{
                                          background: 'rgba(0,0,0,0.5)',
                                          color: 'rgba(255,255,255,0.7)',
                                          border: '1px solid rgba(255,255,255,0.1)',
                                        }}
                                      >
                                        <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                                        Video
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Navigation arrows */}
                          {maxOffset > 0 && (
                            <>
                              {/* Left arrow */}
                              <button
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110"
                                style={{
                                  background: hexToRgba(cat.color, 0.15),
                                  border: `1px solid ${hexToRgba(cat.color, 0.3)}`,
                                  backdropFilter: 'blur(12px)',
                                  boxShadow: `0 4px 20px ${hexToRgba(cat.color, 0.2)}`,
                                  opacity: offset > 0 ? 1 : 0.3,
                                  pointerEvents: offset > 0 ? 'auto' : 'none',
                                }}
                                onClick={() => setCarouselOffset(Math.max(0, offset - 1))}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={cat.color} strokeWidth="2.5">
                                  <path d="M15 18l-6-6 6-6" />
                                </svg>
                              </button>

                              {/* Right arrow */}
                              <button
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110"
                                style={{
                                  background: hexToRgba(cat.color, 0.15),
                                  border: `1px solid ${hexToRgba(cat.color, 0.3)}`,
                                  backdropFilter: 'blur(12px)',
                                  boxShadow: `0 4px 20px ${hexToRgba(cat.color, 0.2)}`,
                                  opacity: offset < maxOffset ? 1 : 0.3,
                                  pointerEvents: offset < maxOffset ? 'auto' : 'none',
                                }}
                                onClick={() => setCarouselOffset(Math.min(maxOffset, offset + 1))}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={cat.color} strokeWidth="2.5">
                                  <path d="M9 18l6-6-6-6" />
                                </svg>
                              </button>
                            </>
                          )}
                        </div>
                      );
                    })()}

                    {/* Subtle divider */}
                    {videos.length > 0 && images.length > 0 && (
                      <div className="flex items-center justify-center my-8">
                        <div
                          className="h-px w-full max-w-md rounded-full"
                          style={{
                            background: `linear-gradient(to right, transparent, ${hexToRgba(cat.color, 0.15)}, transparent)`,
                          }}
                        />
                      </div>
                    )}

                    {/* Images — balanced columns for alignment */}
                    {images.length > 0 && (
                      <div className="flex gap-4 items-stretch">
                        {PB_IMAGE_COLUMNS.map((colIndices, colIdx) => (
                          <div
                            key={colIdx}
                            className="flex-1 flex flex-col"
                            style={{ justifyContent: 'space-between', gap: '16px' }}
                          >
                            {colIndices.map((imgIdx) => {
                              if (imgIdx >= images.length) return null;
                              const image = images[imgIdx];
                              // Find position in the image-only ordered list
                              const imageOrderIdx = PB_IMAGE_ORDER.indexOf(image.id);
                              return (
                                <GalleryCard
                                  key={`${cat.id}-img-${image.id}`}
                                  item={image}
                                  catColor={cat.color}
                                  index={imageOrderIdx !== -1 ? imageOrderIdx : 0}
                                  onClick={() => openModal(imageOrderIdx !== -1 ? imageOrderIdx : 0, 'images')}
                                />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          ) : cat.id === 'livemoments' ? (
            /* ── Live Moments: Videos on top + Staggered Mosaic below ── */
            <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
              {(() => {
                // Treat GIFs as images — merge them together
                const allVisual = cat.media.filter(m => (m.type === 'image' || m.type === 'gif') && !GALLERY_EXCLUDE_SRCS.has(m.src));
                const videos = cat.media.filter(m => m.type === 'video');

                return (
                  <>
                    {/* ── TOP: 3 Videos in a row ── */}
                    {videos.length > 0 && (
                      <div className="flex gap-3 md:gap-4 justify-center mb-4 md:mb-5">
                        {videos.map((video) => {
                          const videoOrderIdx = LM_VIDEO_ORDER.indexOf(video.id);
                          const startTime = VIDEO_POSTER_CONFIG[video.src] ?? 0;
                          return (
                            <div
                              key={`lm-vid-${video.id}`}
                              className="group relative rounded-2xl overflow-hidden cursor-pointer flex-1 aspect-square"
                              style={{
                                transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.5s ease',
                              }}
                              onClick={() => openModal(videoOrderIdx !== -1 ? videoOrderIdx : 0, 'videos')}
                              onMouseEnter={(e) => {
                                const el = e.currentTarget;
                                el.style.transform = 'translateY(-4px)';
                                el.style.boxShadow = `0 20px 50px ${hexToRgba(cat.color, 0.12)}, 0 0 0 1px ${hexToRgba(cat.color, 0.15)}`;
                                const vid = el.querySelector('video');
                                if (vid) vid.play().catch(() => { });
                              }}
                              onMouseLeave={(e) => {
                                const el = e.currentTarget;
                                el.style.transform = 'translateY(0)';
                                el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
                                const vid = el.querySelector('video');
                                if (vid) { vid.pause(); vid.currentTime = startTime; }
                              }}
                            >
                              <video

                                src={`${video.src}#t=${startTime}`}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                playsInline
                                preload="metadata"
                                muted
                                loop
                              />
                              {/* Gradient overlay */}
                              <div
                                className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                                style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)' }}
                              />
                              {/* Hover border glow */}
                              <div
                                className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none opacity-0 group-hover:opacity-100"
                                style={{ boxShadow: `inset 0 0 0 1px ${hexToRgba(cat.color, 0.35)}` }}
                              />
                              {/* Play icon */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none">
                                <div
                                  className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm scale-75 group-hover:scale-100 transition-transform duration-500"
                                  style={{
                                    background: hexToRgba(cat.color, 0.15),
                                    border: `1px solid ${hexToRgba(cat.color, 0.3)}`,
                                  }}
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: cat.color, marginLeft: '2px' }}>
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                  </svg>
                                </div>
                              </div>
                              {/* Video badge */}
                              <div className="absolute top-3 left-3 pointer-events-none">
                                <div
                                  className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider backdrop-blur-sm"
                                  style={{
                                    background: 'rgba(0,0,0,0.5)',
                                    color: 'rgba(255,255,255,0.7)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                  }}
                                >
                                  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                                  Video
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Subtle divider */}
                    {videos.length > 0 && allVisual.length > 0 && (
                      <div className="flex items-center justify-center my-8">
                        <div
                          className="h-px w-full max-w-md rounded-full"
                          style={{
                            background: `linear-gradient(to right, transparent, ${hexToRgba(cat.color, 0.15)}, transparent)`,
                          }}
                        />
                      </div>
                    )}

                    {/* ── BOTTOM: Staggered Mosaic — 3 offset columns ── */}
                    {allVisual.length > 0 && (
                      <div className="flex gap-4 items-start">
                        {LM_IMAGE_COLUMNS.map((colIndices, colIdx) => (
                          <div
                            key={colIdx}
                            className="flex-1 flex flex-col gap-4"
                            style={{ paddingTop: `${LM_COLUMN_OFFSETS[colIdx] ?? 0}px` }}
                          >
                            {colIndices.map((imgIdx) => {
                              if (imgIdx >= allVisual.length) return null;
                              const image = allVisual[imgIdx];
                              const imageOrderIdx = LM_IMAGE_ORDER.indexOf(image.id);
                              return (
                                <GalleryCard
                                  key={`${cat.id}-img-${image.id}`}
                                  item={image}
                                  catColor={cat.color}
                                  index={imageOrderIdx !== -1 ? imageOrderIdx : 0}
                                  onClick={() => openModal(imageOrderIdx !== -1 ? imageOrderIdx : 0, 'images')}
                                />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          ) : cat.id === 'foodmood' ? (
            /* ── Food Mood: Vertical video carousel + Staggered Mosaic below ── */
            <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
              {(() => {
                const allVisual = cat.media.filter(m => (m.type === 'image' || m.type === 'gif') && !GALLERY_EXCLUDE_SRCS.has(m.src));
                const videosRaw = cat.media.filter(m => m.type === 'video');
                const byIdRaw = new Map(videosRaw.map(v => [v.id, v]));
                const videos = FM_VIDEO_ORDER.map(id => byIdRaw.get(id)!).filter(Boolean);

                return (
                  <>
                    {/* ── TOP: Vertical Video Carousel ── */}
                    {videos.length > 0 && (() => {
                      const VISIBLE = 4;
                      const GAP = 16;
                      const maxOffset = Math.max(0, videos.length - VISIBLE);
                      const offset = Math.min(carouselOffset, maxOffset);
                      return (
                        <div className="mb-6 relative">
                          <div
                            style={{
                              overflow: 'hidden',
                              margin: '-12px -12px -60px -12px',
                              padding: '12px 12px 60px 12px',
                            }}
                          >
                            <div
                              className="flex gap-4"
                              style={{
                                transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                transform: `translateX(calc(-${offset} * (${100 / VISIBLE}% + ${GAP - GAP / VISIBLE}px)))`,
                              }}
                            >
                              {videos.map((video, idx) => {
                                const startTime = VIDEO_POSTER_CONFIG[video.src] ?? 0;
                                return (
                                  <div
                                    key={`${cat.id}-video-${video.id}`}
                                    className="group relative rounded-2xl overflow-hidden cursor-pointer flex-shrink-0"
                                    style={{
                                      width: `calc((100% - ${(VISIBLE - 1) * GAP}px) / ${VISIBLE})`,
                                      aspectRatio: '9 / 16',
                                      transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.5s ease',
                                    }}
                                    onClick={() => openModal(idx, 'videos')}
                                    onMouseEnter={(e) => {
                                      const el = e.currentTarget;
                                      el.style.transform = 'translateY(-4px)';
                                      el.style.boxShadow = `0 20px 50px ${hexToRgba(cat.color, 0.12)}, 0 0 0 1px ${hexToRgba(cat.color, 0.15)}`;
                                      const vid = el.querySelector('video');
                                      if (vid) vid.play().catch(() => { });
                                    }}
                                    onMouseLeave={(e) => {
                                      const el = e.currentTarget;
                                      el.style.transform = 'translateY(0)';
                                      el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
                                      const vid = el.querySelector('video');
                                      if (vid) { vid.pause(); vid.currentTime = startTime; }
                                    }}
                                  >
                                    <video

                                      src={`${video.src}#t=${startTime}`}
                                      className="absolute inset-0 w-full h-full object-cover block transition-transform duration-700 group-hover:scale-105"
                                      playsInline
                                      preload="metadata"
                                      muted
                                      loop
                                    />
                                    <div
                                      className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                                      style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)' }}
                                    />
                                    <div
                                      className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none opacity-0 group-hover:opacity-100"
                                      style={{ boxShadow: `inset 0 0 0 1px ${hexToRgba(cat.color, 0.35)}` }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none">
                                      <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm scale-75 group-hover:scale-100 transition-transform duration-500"
                                        style={{
                                          background: hexToRgba(cat.color, 0.15),
                                          border: `1px solid ${hexToRgba(cat.color, 0.3)}`,
                                        }}
                                      >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: cat.color, marginLeft: '2px' }}>
                                          <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                      </div>
                                    </div>
                                    <div className="absolute top-3 left-3 pointer-events-none">
                                      <div
                                        className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider backdrop-blur-sm"
                                        style={{
                                          background: 'rgba(0,0,0,0.5)',
                                          color: 'rgba(255,255,255,0.7)',
                                          border: '1px solid rgba(255,255,255,0.1)',
                                        }}
                                      >
                                        <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                                        Video
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Carousel arrows */}
                          {videos.length > VISIBLE && (
                            <>
                              <button
                                onClick={() => setCarouselOffset(Math.max(0, carouselOffset - 1))}
                                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 cursor-pointer"
                                style={{
                                  background: hexToRgba(cat.color, 0.15),
                                  border: `1px solid ${hexToRgba(cat.color, 0.35)}`,
                                  opacity: carouselOffset === 0 ? 0.3 : 1,
                                  pointerEvents: carouselOffset === 0 ? 'none' : 'auto',
                                }}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={cat.color} strokeWidth="2">
                                  <path d="M15 18l-6-6 6-6" />
                                </svg>
                              </button>
                              <button
                                onClick={() => setCarouselOffset(Math.min(maxOffset, carouselOffset + 1))}
                                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 cursor-pointer"
                                style={{
                                  background: hexToRgba(cat.color, 0.15),
                                  border: `1px solid ${hexToRgba(cat.color, 0.35)}`,
                                  opacity: offset >= maxOffset ? 0.3 : 1,
                                  pointerEvents: offset >= maxOffset ? 'none' : 'auto',
                                }}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={cat.color} strokeWidth="2">
                                  <path d="M9 18l6-6-6-6" />
                                </svg>
                              </button>
                            </>
                          )}
                        </div>
                      );
                    })()}

                    {/* Subtle divider */}
                    {videos.length > 0 && allVisual.length > 0 && (
                      <div className="flex items-center justify-center my-8">
                        <div
                          className="h-px w-full max-w-md rounded-full"
                          style={{
                            background: `linear-gradient(to right, transparent, ${hexToRgba(cat.color, 0.15)}, transparent)`,
                          }}
                        />
                      </div>
                    )}

                    {/* ── BOTTOM: Row-based grid — 4 / 4 / 2 centered ── */}
                    {allVisual.length > 0 && (
                      <div className="flex flex-col gap-4">
                        {FM_IMAGE_ROWS.map((rowIndices, rowIdx) => (
                          <div
                            key={rowIdx}
                            className="flex gap-4 justify-center"
                          >
                            {rowIndices.map((imgIdx) => {
                              if (imgIdx >= allVisual.length) return null;
                              const image = allVisual[imgIdx];
                              const imageOrderIdx = FM_IMAGE_ORDER.indexOf(image.id);
                              return (
                                <div
                                  key={`${cat.id}-img-${image.id}`}
                                  style={{ width: 'calc((100% - 48px) / 4)', aspectRatio: '4 / 5' }}
                                  className="flex-shrink-0 rounded-2xl overflow-hidden"
                                >
                                  <GalleryCard
                                    item={image}
                                    catColor={cat.color}
                                    index={imageOrderIdx !== -1 ? imageOrderIdx : 0}
                                    onClick={() => openModal(imageOrderIdx !== -1 ? imageOrderIdx : 0, 'images')}
                                    fillContainer
                                  />
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          ) : (
            /* ── Default: Masonry Grid for other categories ── */
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
          )}
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
            {/* Gallery type badge for Music Visuals */}
            {(cat.id === 'musicvisuals' || cat.id === 'personalbrands' || cat.id === 'livemoments' || cat.id === 'foodmood') && modalGalleryType !== 'all' && (
              <>
                <span className="text-gray-700">·</span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
                  style={{
                    background: hexToRgba(cat.color, 0.12),
                    border: `1px solid ${hexToRgba(cat.color, 0.25)}`,
                    color: cat.color,
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  {modalGalleryType === 'videos' ? (
                    <>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                      Galería de Videos
                    </>
                  ) : (
                    <>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                      Galería de Imágenes
                    </>
                  )}
                </span>
              </>
            )}
            <span className="text-gray-700">·</span>
            <span className="text-sm text-gray-500" style={{ fontFamily: 'var(--font-inter)' }}>
              {modalIndex + 1} / {modalMedia.length}
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
              {modalMedia[modalIndex]?.type === 'video' ? (
                <video
                  ref={videoRef}
                  src={modalMedia[modalIndex]?.src}
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl"
                  controls
                  playsInline
                  autoPlay
                  style={{ boxShadow: `0 0 80px ${hexToRgba(cat.color, 0.12)}` }}
                />
              ) : modalMedia[modalIndex]?.type === 'gif' ? (
                <video
                  src={modalMedia[modalIndex]?.src}
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
                    src={modalMedia[modalIndex]?.src || ''}
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
                {modalMedia[modalIndex]?.type === 'video' ? 'Video' : modalMedia[modalIndex]?.type === 'gif' ? 'GIF' : 'Imagen'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {modalMedia.map((_, i) => (
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
        .mv-video-carousel::-webkit-scrollbar {
          display: none;
        }

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

        /* ── Live Moments: old grid selectors removed, now using flex layout ── */
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
  fillContainer = false,
}: {
  item: MediaItem;
  catColor: string;
  index: number;
  onClick: () => void;
  fillContainer?: boolean;
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
      className={`group relative rounded-2xl overflow-hidden cursor-pointer ${fillContainer ? 'w-full h-full' : ''}`}
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
        fillContainer ? (
          <Image
            src={item.src}
            alt={`Gallery item ${index + 1}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <Image
            src={item.src}
            alt={`Gallery item ${index + 1}`}
            width={800}
            height={600}
            className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )
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
