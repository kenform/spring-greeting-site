'use client';

import { useEffect, useMemo, useState } from 'react';

const TYPE_SPEED_MS = 24;

function pickPair(total, prevPair = []) {
  if (total <= 1) return [0, 0];

  let first = Math.floor(Math.random() * total);
  let second = first;
  while (second === first) second = Math.floor(Math.random() * total);

  const nextPair = [first, second];
  if (prevPair.length === 2 && prevPair[0] === nextPair[0] && prevPair[1] === nextPair[1]) {
    second = (second + 1) % total;
    return [first, second];
  }

  return nextPair;
}

export default function ComplimentRotator({ compliments, rotateMinutes = 5 }) {
  const safeCompliments = useMemo(
    () => (Array.isArray(compliments) && compliments.length ? compliments : ['Светлой весны и тёплых дней.']),
    [compliments]
  );

  const [pair, setPair] = useState(() => pickPair(safeCompliments.length));
  const [typedText, setTypedText] = useState('');
  const [visible, setVisible] = useState(true);

  const fullText = useMemo(() => {
    const [a, b] = pair;
    const first = safeCompliments[a] || '';
    const second = safeCompliments[b] || '';
    return `${first} ${second}`.trim();
  }, [pair, safeCompliments]);

  useEffect(() => {
    setTypedText('');
    let charPos = 0;
    const typeTimer = setInterval(() => {
      charPos += 1;
      setTypedText(fullText.slice(0, charPos));
      if (charPos >= fullText.length) clearInterval(typeTimer);
    }, TYPE_SPEED_MS);

    return () => clearInterval(typeTimer);
  }, [fullText]);

  useEffect(() => {
    const duration = Math.max(1, rotateMinutes) * 60 * 1000;

    const rotateTimer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setPair((prev) => pickPair(safeCompliments.length, prev));
        setVisible(true);
      }, 300);
    }, duration);

    return () => clearInterval(rotateTimer);
  }, [rotateMinutes, safeCompliments.length]);

  const isTyping = typedText.length < fullText.length;

  return (
    <p className={`wish-line min-h-[72px] text-[1.08rem] leading-[1.58] text-[#4a3e5a] sm:text-[1.18rem] ${visible ? 'is-visible' : ''}`}>
      {typedText}
      <span className={`typing-caret ${isTyping ? 'opacity-100' : 'opacity-0'}`}>|</span>
    </p>
  );
}
