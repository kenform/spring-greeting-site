'use client';

import { useMemo } from 'react';

export default function MainMessageAuto({ intro, variants = [] }) {
  const text = useMemo(() => {
    if (!variants.length) return '';
    const idx = Math.floor(Math.random() * variants.length);
    return variants[idx];
  }, [variants]);

  return (
    <article className="animate-fade-up mx-auto w-full max-w-[646px] rounded-2xl bg-white/62 px-5 py-6 sm:px-8 sm:py-7" style={{ animationDelay: '0.15s' }}>
      <p className="text-[0.94rem] font-medium leading-[1.48] text-[#6a5a79] sm:text-[0.98rem]">{intro}</p>
      <div className="mt-3 h-px w-20 bg-gradient-to-r from-[#ceb2dc]/70 to-transparent" aria-hidden="true" />
      <p className="mt-4 text-[1.05rem] leading-[1.66] text-[#433754] sm:text-[1.125rem]">{text}</p>
    </article>
  );
}
