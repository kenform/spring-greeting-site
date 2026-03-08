'use client';

import { useMemo } from 'react';

const PARTICLES_COUNT = 14;

export default function GlowParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLES_COUNT }, (_, i) => ({
        id: i,
        left: `${6 + Math.random() * 88}%`,
        top: `${8 + Math.random() * 84}%`,
        size: 2 + Math.random() * 4,
        delay: `${Math.random() * 8}s`,
        duration: `${8 + Math.random() * 10}s`,
        driftX: `${-8 + Math.random() * 16}px`,
        driftY: `${-12 + Math.random() * 24}px`,
        opacity: 0.18 + Math.random() * 0.3
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="glow-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
            ['--drift-x']: p.driftX,
            ['--drift-y']: p.driftY
          }}
        />
      ))}
    </div>
  );
}
