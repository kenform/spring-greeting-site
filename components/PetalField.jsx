'use client';

import { useEffect, useMemo, useState } from 'react';

const PETALS_COUNT = 24;

function pickDepth(size) {
  if (size < 16) return 'far';
  if (size < 24) return 'mid';
  return 'near';
}

export default function PetalField() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover)').matches) return;

    const onMove = (event) => {
      const x = ((event.clientX / window.innerWidth) - 0.5) * 5;
      const y = ((event.clientY / window.innerHeight) - 0.5) * 5;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const petals = useMemo(
    () =>
      Array.from({ length: PETALS_COUNT }, (_, i) => {
        const size = 12 + Math.random() * 20; // small / medium / large
        const depth = pickDepth(size);
        return {
          id: i,
          left: `${(i * 100) / PETALS_COUNT + Math.random() * 8}%`,
          size,
          delay: `${Math.random() * 10}s`,
          duration: `${11 + Math.random() * 18}s`, // varied speeds
          drift: `${-34 + Math.random() * 68}px`,
          sway: `${-18 + Math.random() * 36}px`,
          spin: `${Math.random() * 260}deg`,
          opacity: 0.45 + Math.random() * 0.25,
          blur: depth === 'far' ? '1.5px' : depth === 'mid' ? '0.9px' : '0.2px',
          depth
        };
      }),
    []
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden transition-transform duration-500 ease-out"
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <svg
          key={petal.id}
          className={`petal-svg petal-${petal.depth}`}
          viewBox="0 0 36 48"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.2,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            opacity: petal.opacity,
            filter: `blur(${petal.blur})`,
            ['--drift']: petal.drift,
            ['--sway']: petal.sway,
            ['--spin-start']: petal.spin
          }}
        >
          <path d="M17.8 2.8C10.3 6.7 4.6 16.2 5.3 25.3c.8 10.1 8.5 18.6 12.9 20.2 4.6-1.6 12.5-10.2 13.2-20.3.6-9-5.2-18.4-12.8-22.4-.5-.3-.9-.3-1.4 0Z" fill="#f8b7d1" />
          <path d="M18 7.4c-3.9 2.2-8.2 8.4-8 15.8.2 7.4 4.6 14.2 8.1 16.9 3.6-2.7 8-9.5 8.2-16.9.2-7.4-4.1-13.6-8-15.8-.1-.1-.2-.1-.3 0Z" fill="#ffeaf3" opacity=".78" />
        </svg>
      ))}
    </div>
  );
}
