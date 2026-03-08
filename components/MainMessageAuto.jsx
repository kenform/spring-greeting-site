'use client';

import { useMemo } from 'react';

export default function MainMessageAuto({ intro, variants = [] }) {
  const text = useMemo(() => {
    if (!variants.length) return '';
    const idx = Math.floor(Math.random() * variants.length);
    return variants[idx];
  }, [variants]);

  return (
    <article className="animate-fade-up mx-auto w-full max-w-[640px] space-y-4 rounded-2xl bg-white/62 px-5 py-6 sm:px-7 sm:py-7" style={{ animationDelay: '0.15s' }}>
      <p className="text-[1.02rem] leading-[1.64] text-[#453a57] sm:text-[1.12rem]">{intro}</p>
      <p className="text-[1.02rem] leading-[1.66] text-[#453a57] sm:text-[1.125rem]">{text}</p>
    </article>
  );
}
