'use client';

import { useEffect, useRef } from 'react';

export default function AtmosphericBackground() {
  const bgRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover)').matches) return;

    let rafId = null;
    let nextX = 0;
    let nextY = 0;

    const apply = () => {
      rafId = null;
      if (!bgRef.current) return;
      bgRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0) scale(1.06)`;
    };

    const onMove = (event) => {
      nextX = ((event.clientX / window.innerWidth) - 0.5) * 10;
      nextY = ((event.clientY / window.innerHeight) - 0.5) * 10;
      if (!rafId) rafId = requestAnimationFrame(apply);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={bgRef}
        className="absolute inset-[-2%] bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out"
        style={{
          backgroundImage: "url('/spring-bg.png')",
          transform: 'translate3d(0, 0, 0) scale(1.06)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2b203638] via-[#3f2f4d4d] to-[#1d1a2963]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(28,22,36,0.16)_100%)]" />
      <div className="absolute inset-0 backdrop-blur-[2.5px]" />
    </>
  );
}
