'use client';

import { useEffect, useState } from 'react';

export default function AtmosphericBackground() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event) => {
      const x = ((event.clientX / window.innerWidth) - 0.5) * 10;
      const y = ((event.clientY / window.innerHeight) - 0.5) * 10;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div
        className="absolute inset-[-2%] bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out"
        style={{
          backgroundImage: "url('/spring-bg.jpg')",
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(1.06)`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2b203638] via-[#3f2f4d4d] to-[#1d1a2963]" />
      <div className="absolute inset-0 backdrop-blur-[2.5px]" />
    </>
  );
}
