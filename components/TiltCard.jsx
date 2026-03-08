'use client';

import { useEffect, useMemo, useState } from 'react';

export default function TiltCard({ className = '', children }) {
  const [enabled, setEnabled] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setEnabled(window.matchMedia('(hover: hover)').matches);
  }, []);

  const transform = useMemo(() => {
    if (!enabled) return 'none';
    return `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`;
  }, [tilt, enabled]);

  const onMove = (event) => {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -(py * 1.4),
      y: px * 1.6
    });
  };

  const reset = () => setTilt({ x: 0, y: 0 });

  return (
    <section
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ transform, transition: 'transform 280ms ease-out' }}
    >
      {children}
    </section>
  );
}
