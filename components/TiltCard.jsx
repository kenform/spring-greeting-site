'use client';

import { useEffect, useRef } from 'react';

export default function TiltCard({ className = '', children }) {
  const cardRef = useRef(null);
  const enabledRef = useRef(false);
  const rafRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    enabledRef.current = window.matchMedia('(hover: hover)').matches;
  }, []);

  const applyTilt = () => {
    rafRef.current = null;
    if (!cardRef.current || !enabledRef.current) return;
    const { x, y } = targetRef.current;
    cardRef.current.style.transform = `perspective(1200px) rotateX(${x}deg) rotateY(${y}deg)`;
  };

  const onMove = (event) => {
    if (!enabledRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    targetRef.current = {
      x: -(py * 1.4),
      y: px * 1.6
    };
    if (!rafRef.current) rafRef.current = requestAnimationFrame(applyTilt);
  };

  const reset = () => {
    targetRef.current = { x: 0, y: 0 };
    if (!enabledRef.current) return;
    if (!rafRef.current) rafRef.current = requestAnimationFrame(applyTilt);
  };

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  return (
    <section
      ref={cardRef}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ transform: 'none', transition: 'transform 280ms ease-out' }}
    >
      {children}
    </section>
  );
}
