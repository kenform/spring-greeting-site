'use client';

import { useEffect, useMemo, useState } from 'react';

const BACK_COUNT = 24;
const FRONT_COUNT = 7;

function pickDepth(size) {
  if (size < 16) return 'far';
  if (size < 24) return 'mid';
  return 'near';
}

function makePetal(id, front = false) {
  const size = front ? 18 + Math.random() * 16 : 11 + Math.random() * 18;
  const depth = pickDepth(size);

  const baseDuration = front ? 13 + Math.random() * 11 : 15 + Math.random() * 15;
  const opacityBase = front ? 0.55 + Math.random() * 0.18 : 0.45 + Math.random() * 0.22;

  return {
    id,
    depth,
    left: `${Math.random() * 100}%`,
    startY: `${-8 - Math.random() * 12}%`,
    size,
    duration: `${baseDuration}s`,
    delay: `${Math.random() * 14}s`,
    drift: `${-40 + Math.random() * 80}px`,
    sway: `${-20 + Math.random() * 40}px`,
    spin: `${Math.random() * 320}deg`,
    blur: depth === 'far' ? (front ? '0.9px' : '1.5px') : depth === 'mid' ? '0.8px' : '0.25px',
    opacity: opacityBase,
    windKick: `${-18 + Math.random() * 36}px`
  };
}

export default function PetalField() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover)').matches) return;

    const onMove = (event) => {
      const x = ((event.clientX / window.innerWidth) - 0.5) * 4;
      const y = ((event.clientY / window.innerHeight) - 0.5) * 4;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const backPetals = useMemo(
    () => Array.from({ length: BACK_COUNT }, (_, i) => makePetal(`b-${i}`, false)),
    []
  );

  const frontPetals = useMemo(
    () => Array.from({ length: FRONT_COUNT }, (_, i) => makePetal(`f-${i}`, true)),
    []
  );

  const renderPetal = (petal, front = false) => (
    <svg
      key={petal.id}
      className={`petal-svg petal-${petal.depth} ${front ? 'petal-front' : 'petal-back'}`}
      viewBox="0 0 36 48"
      style={{
        left: petal.left,
        top: petal.startY,
        width: petal.size,
        height: petal.size * 1.2,
        animationDelay: petal.delay,
        animationDuration: petal.duration,
        filter: `blur(${petal.blur})`,
        ['--drift']: petal.drift,
        ['--sway']: petal.sway,
        ['--spin-start']: petal.spin,
        ['--petal-opacity']: petal.opacity,
        ['--wind-kick']: petal.windKick
      }}
    >
      <path d="M17.8 2.8C10.3 6.7 4.6 16.2 5.3 25.3c.8 10.1 8.5 18.6 12.9 20.2 4.6-1.6 12.5-10.2 13.2-20.3.6-9-5.2-18.4-12.8-22.4-.5-.3-.9-.3-1.4 0Z" fill="#f8b7d1" />
      <path d="M18 7.4c-3.9 2.2-8.2 8.4-8 15.8.2 7.4 4.6 14.2 8.1 16.9 3.6-2.7 8-9.5 8.2-16.9.2-7.4-4.1-13.6-8-15.8-.1-.1-.2-.1-.3 0Z" fill="#ffeaf3" opacity=".78" />
    </svg>
  );

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[4] overflow-hidden transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
        aria-hidden="true"
      >
        {backPetals.map((p) => renderPetal(p, false))}
      </div>

      <div
        className="pointer-events-none fixed inset-0 z-[11] overflow-hidden transition-transform duration-700 ease-out"
        style={{ transform: `translate3d(${offset.x * 0.65}px, ${offset.y * 0.65}px, 0)` }}
        aria-hidden="true"
      >
        {frontPetals.map((p) => renderPetal(p, true))}
      </div>
    </>
  );
}
