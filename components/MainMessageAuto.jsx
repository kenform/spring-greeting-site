'use client';

import { useMemo } from 'react';

export default function MainMessageAuto({ intro, variants = [] }) {
  const text = useMemo(() => {
    if (!variants.length) return '';
    const idx = Math.floor(Math.random() * variants.length);
    return variants[idx];
  }, [variants]);

  return (
    <article className="animate-fade-up mx-auto w-full max-w-[565px] space-y-3.5 rounded-2xl bg-white/64 p-5 sm:p-6" style={{ animationDelay: '0.15s' }}>
      <p className="text-[1rem] leading-[1.62] text-[#4a3f5a] sm:text-[1.06rem]">{intro}</p>
      <p className="text-[1rem] leading-[1.62] text-[#4a3f5a] sm:text-[1.06rem]">{text}</p>
    </article>
  );
}
