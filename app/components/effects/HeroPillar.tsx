'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// WebGL code is only downloaded when the pillar is actually going to animate.
const LightPillar = dynamic(() => import('./LightPillar'), { ssr: false });

// Brand colors: dark orange on top (same as "Medina" / Contact button), blue at the bottom.
const PILLAR_TOP_COLOR = '#E08A14';
const PILLAR_BOTTOM_COLOR = '#3b82f6';
// Horizontal offset of the pillar (0 = centered). Higher moves it further right.
// Implemented by widening the canvas from the left edge (center = 50% + offset),
// so no uncovered strip appears on the left.
const PILLAR_OFFSET_X = 12;

/** Animate only on desktop, with motion allowed and WebGL2 available. */
function canAnimate(): boolean {
  if (!window.matchMedia('(min-width: 1024px)').matches) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

/**
 * Decorative hero background: a static orange glow (always) plus the animated
 * light pillar on capable desktops. Fades out toward the bottom of the hero.
 */
export default function HeroPillar() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const update = () => setAnimate(canAnimate());
    update();
    const queries = [
      window.matchMedia('(min-width: 1024px)'),
      window.matchMedia('(prefers-reduced-motion: reduce)'),
    ];
    queries.forEach((q) => q.addEventListener('change', update));
    return () => queries.forEach((q) => q.removeEventListener('change', update));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        mixBlendMode: 'screen',
        maskImage: 'linear-gradient(to bottom, black 40%, transparent 95%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 95%)',
      }}
    >
      {/* Static fallback glow (also shown under the pillar) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(55% 65% at 50% 0%, rgba(224, 138, 20, 0.18), transparent)',
        }}
      />
      {animate && (
        <LightPillar
          topColor={PILLAR_TOP_COLOR}
          bottomColor={PILLAR_BOTTOM_COLOR}
          intensity={0.9}
          glowAmount={0.002}
          bloom={0.4}
          rotationSpeed={0.2}
          pillarWidth={3}
          pillarRotation={45}
          fade={0.35}
          quality="medium"
          mixBlendMode="normal"
          interactive={false}
          clickPulse={false}
          // Shift the pillar right so its core runs between the text and the photo
          style={{ width: `${100 + PILLAR_OFFSET_X * 2}%` }}
        />
      )}
    </div>
  );
}
