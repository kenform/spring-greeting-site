'use client';

import { useEffect, useMemo, useState } from 'react';

const PETALS_COUNT = 18;

export default function PetalField() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover)').matches) return;

    const onMove = (event) => {
      const x = ((event.clientX / window.innerWidth) - 0.5) * 6;
      const y = ((event.clientY / window.innerHeight) - 0.5) * 6;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

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
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden transition-transform duration-500 ease-out"
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
      aria-hidden="true"
    >
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
