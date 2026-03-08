'use client';

import { useEffect, useMemo, useState } from 'react';

const TYPE_SPEED_MS = 32;

export default function ComplimentRotator({ compliments, rotateMinutes = 5 }) {
  const safeCompliments = useMemo(
    () => (Array.isArray(compliments) && compliments.length ? compliments : ['Светлой весны и тёплых дней.']),
    [compliments]
  );

  const [index, setIndex] = useState(() => Math.floor(Math.random() * safeCompliments.length));
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const fullText = safeCompliments[index] || '';
    setTypedText('');

    let charPos = 0;
    const typeTimer = setInterval(() => {
      charPos += 1;
      setTypedText(fullText.slice(0, charPos));
      if (charPos >= fullText.length) clearInterval(typeTimer);
    }, TYPE_SPEED_MS);

    return () => clearInterval(typeTimer);
  }, [index, safeCompliments]);

  useEffect(() => {
    const duration = Math.max(1, rotateMinutes) * 60 * 1000;

    const rotateTimer = setInterval(() => {
      setIndex((prev) => {
        if (safeCompliments.length === 1) return prev;

        let next = prev;
        while (next === prev) {
          next = Math.floor(Math.random() * safeCompliments.length);
        }
        return next;
      });
    }, duration);

    return () => clearInterval(rotateTimer);
  }, [rotateMinutes, safeCompliments]);

  const isTyping = typedText.length < (safeCompliments[index] || '').length;

  return (
    <p className="min-h-[72px] text-lg leading-relaxed text-[#5f486d]">
      {typedText}
      <span className={`typing-caret ${isTyping ? 'opacity-100' : 'opacity-0'}`}>|</span>
    </p>
  );
}
