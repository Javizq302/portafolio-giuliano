'use client';

import { useState, useEffect, useRef } from 'react';
import { getThemeColors } from '../utils/themeUtils';

// Coordenadas de la constelación de Sagitario (normalizadas 0-100)
// Basado en la forma tradicional del arquero
const sagittariusStars = [
    // Tetera (parte principal)
    { id: 1, x: 25, y: 65, name: 'Kaus Australis', size: 'normal' },
    { id: 2, x: 30, y: 50, name: 'Kaus Media', size: 'normal' },
    { id: 3, x: 35, y: 38, name: 'Kaus Borealis', size: 'normal' },
    { id: 4, x: 45, y: 35, name: 'Phi Sgr', size: 'normal' },
    { id: 5, x: 50, y: 45, name: 'Nunki', size: 'featured', video: '/videos/creative-cuts/video1.mp4' },
    { id: 6, x: 45, y: 58, name: 'Ascella', size: 'normal' },
    { id: 7, x: 35, y: 62, name: 'Tau Sgr', size: 'normal' },
    // Flecha y arco
    { id: 8, x: 55, y: 28, name: 'Sigma Sgr', size: 'normal' },
    { id: 9, x: 65, y: 22, name: 'Alnasl', size: 'featured', video: '/videos/creative-cuts/video2.mp4' },
    { id: 10, x: 60, y: 55, name: 'Pi Sgr', size: 'normal' },
    { id: 11, x: 70, y: 48, name: 'Omega Sgr', size: 'normal' },
    // Estrellas adicionales
    { id: 12, x: 75, y: 35, name: 'Rho Sgr', size: 'normal' },
    { id: 13, x: 20, y: 78, name: 'Eta Sgr', size: 'normal' },
];

// Conexiones entre estrellas (líneas de la constelación)
const connections = [
    [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 1], // Tetera
    [2, 7], // Diagonal tetera
    [4, 8], [8, 9], // Flecha
    [5, 10], [10, 11], // Extensión
    [11, 12], // Punta
    [1, 13], // Base
];

export default function CreativeCuts2() {
    const theme = getThemeColors();
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);
    const [backgroundStars, setBackgroundStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);
    const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

    // Generar estrellas de fondo
    useEffect(() => {
        const stars = [];
        for (let i = 0; i < 100; i++) {
            stars.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 1.5 + 0.5,
                delay: Math.random() * 5
            });
        }
        setBackgroundStars(stars);
    }, []);

    const handleStarHover = (starId: number | null) => {
        setHoveredStar(starId);

        // Reproducir video si es una estrella destacada
        if (starId !== null) {
            const star = sagittariusStars.find(s => s.id === starId);
            if (star?.video && videoRefs.current[starId]) {
                videoRefs.current[starId]?.play().catch(() => { });
            }
        }

        // Pausar todos los videos cuando no hay hover
        Object.entries(videoRefs.current).forEach(([id, video]) => {
            if (video && Number(id) !== starId) {
                video.pause();
                video.currentTime = 0;
            }
        });
    };

    const getFeaturedStars = () => sagittariusStars.filter(s => s.size === 'featured');

    return (
        <section
            id="creative-cuts-2"
            className="relative min-h-screen py-20 overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #0a1628 0%, #0d1f3c 30%, #102a4c 50%, #0d1f3c 70%, #0a1628 100%)',
            }}
        >
            {/* Efecto de nebulosa sutil */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
                    style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)' }}
                />
                <div
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15"
                    style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)' }}
                />
            </div>

            {/* Estrellas de fondo */}
            <div className="absolute inset-0 pointer-events-none">
                {backgroundStars.map((star) => (
                    <div
                        key={star.id}
                        className="absolute rounded-full bg-white star-bg-twinkle"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            animationDelay: `${star.delay}s`,
                            opacity: 0.4,
                        }}
                    />
                ))}
            </div>

            {/* Título */}
            <div className="container mx-auto px-6 mb-16 relative z-10">
                <div className="text-center">
                    <h2
                        className="text-4xl md:text-6xl lg:text-7xl font-bold leading-none mb-4"
                        style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                        <span className="text-white">Explora el </span>
                        <span
                            style={{
                                backgroundImage: 'linear-gradient(135deg, #818cf8, #a78bfa, #c4b5fd)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Universo
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-inter)' }}>
                        Haz hover sobre las estrellas brillantes para descubrir el contenido
                    </p>
                </div>
            </div>

            {/* Contenedor de la constelación */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="relative w-full max-w-4xl mx-auto aspect-[4/3]">

                    {/* SVG para las líneas de conexión */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                                <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
                                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                            </linearGradient>
                        </defs>

                        {connections.map(([from, to], index) => {
                            const fromStar = sagittariusStars.find(s => s.id === from);
                            const toStar = sagittariusStars.find(s => s.id === to);
                            if (!fromStar || !toStar) return null;

                            return (
                                <line
                                    key={index}
                                    x1={fromStar.x}
                                    y1={fromStar.y}
                                    x2={toStar.x}
                                    y2={toStar.y}
                                    stroke="url(#lineGradient)"
                                    strokeWidth="0.3"
                                    className="constellation-line"
                                />
                            );
                        })}
                    </svg>

                    {/* Estrellas de la constelación */}
                    {sagittariusStars.map((star) => {
                        const isFeatured = star.size === 'featured';
                        const isHovered = hoveredStar === star.id;

                        return (
                            <div
                                key={star.id}
                                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${isFeatured ? 'cursor-pointer z-20' : 'z-10'}`}
                                style={{
                                    left: `${star.x}%`,
                                    top: `${star.y}%`,
                                }}
                                onMouseEnter={() => isFeatured && handleStarHover(star.id)}
                                onMouseLeave={() => isFeatured && handleStarHover(null)}
                            >
                                {/* Estrella */}
                                <div
                                    className={`relative rounded-full ${isFeatured ? 'featured-star' : ''}`}
                                    style={{
                                        width: isFeatured ? '20px' : '8px',
                                        height: isFeatured ? '20px' : '8px',
                                        background: isFeatured
                                            ? 'radial-gradient(circle, #ffffff 0%, #a5b4fc 50%, #6366f1 100%)'
                                            : 'radial-gradient(circle, #ffffff 0%, #cbd5e1 100%)',
                                        boxShadow: isFeatured
                                            ? '0 0 20px 5px rgba(129, 140, 248, 0.6), 0 0 40px 10px rgba(129, 140, 248, 0.3), 0 0 60px 15px rgba(129, 140, 248, 0.1)'
                                            : '0 0 8px 2px rgba(255, 255, 255, 0.4)',
                                        transition: 'all 0.3s ease',
                                        transform: isHovered ? 'scale(1.3)' : 'scale(1)',
                                    }}
                                >
                                    {/* Anillo pulsante para estrellas destacadas */}
                                    {isFeatured && (
                                        <div
                                            className="absolute inset-0 rounded-full animate-ping"
                                            style={{
                                                border: '2px solid rgba(129, 140, 248, 0.5)',
                                                animationDuration: '2s',
                                            }}
                                        />
                                    )}
                                </div>

                                {/* Video tooltip para estrellas destacadas */}
                                {isFeatured && star.video && (
                                    <div
                                        className={`absolute z-30 transition-all duration-500 ease-out ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                                            }`}
                                        style={{
                                            width: '320px',
                                            left: star.id === 5 ? '-340px' : '30px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                        }}
                                    >
                                        <div
                                            className="relative rounded-2xl overflow-hidden shadow-2xl"
                                            style={{
                                                boxShadow: '0 0 50px rgba(99, 102, 241, 0.4), 0 25px 50px rgba(0, 0, 0, 0.5)',
                                                border: '2px solid rgba(129, 140, 248, 0.3)',
                                            }}
                                        >
                                            {/* Línea conectora */}
                                            <div
                                                className={`absolute top-1/2 ${star.id === 5 ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'} w-8 h-px`}
                                                style={{
                                                    background: 'linear-gradient(90deg, rgba(129, 140, 248, 0.5), transparent)',
                                                    transform: star.id === 5 ? 'translateX(100%) scaleX(-1)' : 'translateX(-100%)',
                                                }}
                                            />

                                            <video
                                                ref={(el) => { videoRefs.current[star.id] = el; }}
                                                src={star.video}
                                                className="w-full aspect-video object-cover"
                                                muted
                                                loop
                                                playsInline
                                                preload="metadata"
                                            />

                                            {/* Overlay con info */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                                <p className="text-white text-sm font-medium" style={{ fontFamily: 'var(--font-inter)' }}>
                                                    {star.name}
                                                </p>
                                                <p className="text-gray-400 text-xs mt-1">
                                                    Click para ver completo
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Indicadores de estrellas interactivas */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-16 flex items-center gap-4">
                        {getFeaturedStars().map((star, index) => (
                            <div
                                key={star.id}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
                            >
                                <div
                                    className="w-3 h-3 rounded-full featured-star"
                                    style={{
                                        background: 'radial-gradient(circle, #ffffff 0%, #a5b4fc 50%, #6366f1 100%)',
                                        boxShadow: '0 0 10px rgba(129, 140, 248, 0.6)',
                                    }}
                                />
                                <span className="text-gray-300 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
                                    {star.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .star-bg-twinkle {
          animation: bgTwinkle 4s ease-in-out infinite;
        }

        @keyframes bgTwinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        .featured-star {
          animation: featuredTwinkle 2s ease-in-out infinite;
        }

        @keyframes featuredTwinkle {
          0%, 100% {
            filter: brightness(1);
            transform: scale(1);
          }
          50% {
            filter: brightness(1.3);
            transform: scale(1.1);
          }
        }

        .constellation-line {
          opacity: 0.6;
          animation: linePulse 4s ease-in-out infinite;
        }

        @keyframes linePulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
        </section>
    );
}
