'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const sections = [
    'Inicio',
    'Creative Cuts',
    'Still Frames',
    'Gallery',
    'Contacto',
  ];

  const sectionIds = [
    'inicio',
    'creative-cuts',
    'still-frames',
    'works',
    'contacto',
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, color: 'rgb(55, 122, 188)' });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isManualHover, setIsManualHover] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const detectActiveSectionRef = useRef<(() => void) | null>(null);
  const activeIndexRef = useRef<number | null>(null);

  type SectionScore = { index: number; score: number };

  const getColorFromPosition = (position: number): string => {
    const colors = [
      { r: 55, g: 122, b: 188, pos: 0 },
      { r: 48, g: 84, b: 192, pos: 50 },
      { r: 245, g: 158, b: 11, pos: 75 },
      { r: 128, g: 85, b: 11, pos: 100 },
    ];

    for (let i = 0; i < colors.length - 1; i++) {
      if (position >= colors[i].pos && position <= colors[i + 1].pos) {
        const range = colors[i + 1].pos - colors[i].pos;
        const t = (position - colors[i].pos) / range;
        const r = Math.round(colors[i].r + (colors[i + 1].r - colors[i].r) * t);
        const g = Math.round(colors[i].g + (colors[i + 1].g - colors[i].g) * t);
        const b = Math.round(colors[i].b + (colors[i + 1].b - colors[i].b) * t);
        return `rgb(${r}, ${g}, ${b})`;
      }
    }
    return 'rgb(55, 122, 188)';
  };

  const updateSliderPosition = (index: number) => {
    const link = linkRefs.current[index];
    if (link) {
      const container = link.parentElement;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        const left = linkRect.left - containerRect.left;
        const width = linkRect.width;
        const centerPosition = ((left + width / 2) / containerRect.width) * 100;
        const color = getColorFromPosition(centerPosition);
        setSliderStyle({ left, width, color });
      }
    }
  };

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const indexToUse = hoveredIndex !== null ? hoveredIndex : activeIndex;
    if (indexToUse !== null) {
      updateSliderPosition(indexToUse);
    }
  }, [hoveredIndex, activeIndex]);

  useEffect(() => {
    if (pathname === '/works' || pathname === '/galeria') {
      const worksIndex = sections.indexOf('Gallery');
      if (worksIndex !== -1) setActiveIndex(worksIndex);
      return;
    }

    const detectActiveSection = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const viewportCenter = scrollPosition + windowHeight / 2;
      const viewportTop = scrollPosition;
      const viewportBottom = scrollPosition + windowHeight;

      if (scrollPosition < 300) {
        const inicioIndex = sections.indexOf('Inicio');
        if (inicioIndex !== -1) {
          setActiveIndex((prev) => (prev !== inicioIndex ? inicioIndex : prev));
        }
        return;
      }

      let bestSection: SectionScore | null = null;

      sectionIds.forEach((sectionId, index) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = scrollPosition + rect.top;
          const elementBottom = elementTop + rect.height;
          const elementCenter = elementTop + rect.height / 2;
          const elementHeight = rect.height;

          const visibleTop = Math.max(viewportTop, elementTop);
          const visibleBottom = Math.min(viewportBottom, elementBottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visiblePercentage = elementHeight > 0 ? (visibleHeight / elementHeight) * 100 : 0;

          const distanceFromCenter = Math.abs(viewportCenter - elementCenter);
          const normalizedDistance = distanceFromCenter / windowHeight;
          const distanceFromTop = Math.abs(viewportTop - elementTop);
          const normalizedDistanceFromTop = distanceFromTop / windowHeight;

          let score = 0;

          if (rect.top < windowHeight && rect.bottom > 0) {
            score += (1 - Math.min(normalizedDistance, 1)) * 0.5;
            score += (visiblePercentage / 100) * 0.25;

            const viewportCenterZone = windowHeight * 0.5;
            if (distanceFromCenter < viewportCenterZone) {
              score += (1 - distanceFromCenter / viewportCenterZone) * 0.4;
            }
            if (distanceFromCenter < windowHeight * 0.1) score += 0.3;
            if (elementTop >= viewportTop && elementTop <= viewportCenter) {
              score += (1 - Math.min(normalizedDistanceFromTop, 1)) * 0.1;
            }
            if (elementHeight < windowHeight * 0.8 && distanceFromCenter < windowHeight * 0.3) {
              score += 0.2;
            }
            if (sectionId === 'works' && rect.top < windowHeight && rect.bottom > 0) {
              score += 0.25;
            }
          }

          let finalScore = score;
          if (activeIndexRef.current === index && score > 0.1) {
            finalScore = score * 1.3;
          }
          if (finalScore > 0 && (!bestSection || finalScore > bestSection.score)) {
            bestSection = { index, score: finalScore };
          }
        }
      });

      if (bestSection !== null) {
        const section = bestSection as SectionScore;
        const threshold = section.index === 3 ? 0.1 : 0.15;
        if (section.score > threshold) {
          setActiveIndex((prev) => (prev !== section.index ? section.index : prev));
        }
      }
    };

    detectActiveSectionRef.current = detectActiveSection;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (!isManualHover) detectActiveSection();
    };

    detectActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, isManualHover]);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  // Color del pill activo en mobile (basado en índice)
  const getMobileActiveColor = (index: number): string => {
    const position = (index / (sections.length - 1)) * 100;
    return getColorFromPosition(position);
  };

  return (
    <nav
      ref={navRef}
      className="w-full fixed top-0 z-50 transition-all duration-500"
      style={{
        background: `linear-gradient(135deg, #C5D0D9 0%, #A3B2BF 50%, #EBEFF2 100%)`,
        backdropFilter: 'blur(20px)',
        borderBottom: '2px solid transparent',
        borderImage: 'linear-gradient(90deg, #06b6d4 25%, #3b82f6 50%, #f59e0b 75%, #f97316 100%) 1',
      }}
    >
      {/* Barra principal */}
      <div className="container mx-auto px-6 lg:px-12">
        <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'}`}>

          {/* Logo / Nombre */}
          <div className="flex items-center gap-3">
            <a href="/#inicio" onClick={(e) => handleNavClick(e, 'inicio')}>
              <div className="relative w-10 h-10 md:w-12 md:h-12 transition-opacity hover:opacity-70 active:opacity-50 cursor-pointer">
                <Image
                  src="/images/LogoPortfolioNegro.png"
                  alt="Giuliano Medina Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </a>
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-orange-300 to-transparent" />
            <a
              href="/#inicio"
              onClick={(e) => handleNavClick(e, 'inicio')}
              className="text-sm md:text-base font-medium transition-opacity hover:opacity-70"
              style={{ fontFamily: 'var(--font-inter)', color: '#000000' }}
            >
              Giuliano Medina
            </a>
          </div>

          {/* Nav desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <div
              className="rounded-full px-4 py-2 flex items-center gap-1 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, rgba(55, 122, 188, 0.3) 25%, rgba(48, 84, 192, 0.3) 50%, rgba(245, 158, 11, 0.3) 75%, rgba(128, 58, 11, 0.3) 100%)`,
                border: `1px solid rgba(245, 158, 11, 0.3)`,
              }}
            >
              <div
                className="absolute top-0 h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  left: `${sliderStyle.left}px`,
                  width: `${sliderStyle.width}px`,
                  background: sliderStyle.color,
                  opacity: (hoveredIndex !== null || activeIndex !== null) ? 1 : 0,
                }}
              />
              {sections.map((section, index) => {
                const href = `/#${sectionIds[index]}`;
                const isActive = hoveredIndex === index || (hoveredIndex === null && activeIndex === index);
                return (
                  <a
                    key={section}
                    ref={(el) => { linkRefs.current[index] = el; }}
                    href={href}
                    className="text-xs md:text-sm transition-all duration-300 font-medium relative z-10 px-3 py-1.5 rounded-full"
                    style={{ fontFamily: 'var(--font-inter)', color: isActive ? '#ffffff' : '#000000' }}
                    onClick={(e) => handleNavClick(e, sectionIds[index])}
                    onMouseEnter={(e) => {
                      setIsManualHover(true);
                      setHoveredIndex(index);
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      setIsManualHover(false);
                      setHoveredIndex(null);
                      e.currentTarget.style.color = '#000000';
                      if (detectActiveSectionRef.current) detectActiveSectionRef.current();
                    }}
                  >
                    {section}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Hamburguesa → X (mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-0.5 origin-center transition-all duration-300"
              style={{
                background: '#000000',
                transform: isMobileMenuOpen ? 'translateY(4px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: '#000000',
                opacity: isMobileMenuOpen ? 0 : 1,
                transform: isMobileMenuOpen ? 'scaleX(0)' : 'none',
              }}
            />
            <span
              className="block w-6 h-0.5 origin-center transition-all duration-300"
              style={{
                background: '#000000',
                transform: isMobileMenuOpen ? 'translateY(-9px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-1">
        <div
          className="h-full w-full"
          style={{ background: 'linear-gradient(90deg, #06b6d4 25%, #3b82f6 50%, #f59e0b 75%, #f97316 100%)' }}
        />
      </div>

      {/* Dropdown móvil */}
      <div
        className="absolute top-full left-0 right-0 lg:hidden overflow-hidden"
        style={{
          maxHeight: isMobileMenuOpen ? '360px' : '0px',
          transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          background: `linear-gradient(180deg, #B8C6D0 0%, #CDDAE3 100%)`,
          boxShadow: isMobileMenuOpen ? '0 8px 32px rgba(0,0,0,0.15)' : 'none',
        }}
      >
        {/* Border inferior del dropdown */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: 'linear-gradient(90deg, #06b6d4 25%, #3b82f6 50%, #f59e0b 75%, #f97316 100%)' }}
        />

        <div className="px-6 py-3 flex flex-col gap-1">
          {sections.map((section, index) => {
            const isActive = activeIndex === index;
            const activeColor = getMobileActiveColor(index);
            return (
              <a
                key={section}
                href={`/#${sectionIds[index]}`}
                onClick={(e) => handleNavClick(e, sectionIds[index])}
                className="flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '1rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#ffffff' : '#1a1a1a',
                  background: isActive ? activeColor : 'transparent',
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-8px)',
                  transition: `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s, background 0.2s ease, color 0.2s ease`,
                }}
              >
                <span>{section}</span>
                {isActive && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
