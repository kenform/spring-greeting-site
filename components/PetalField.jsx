'use client';

import { useMemo } from 'react';

const PETALS_COUNT = 18;

export default function PetalField() {
  const petals = useMemo(
    () =>
      Array.from({ length: PETALS_COUNT }, (_, i) => ({
        id: i,
        left: `${(i * 100) / PETALS_COUNT + Math.random() * 6}%`,
        size: 8 + Math.random() * 18,
        delay: `${Math.random() * 9}s`,
        duration: `${15 + Math.random() * 14}s`,
        drift: `${-28 + Math.random() * 56}px`,
        spin: `${Math.random() * 260}deg`,
        opacity: 0.22 + Math.random() * 0.38
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 0.72,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            opacity: petal.opacity,
            ['--drift']: petal.drift,
            ['--spin-start']: petal.spin
          }}
        />
      ))}
    </div>
  );
}
