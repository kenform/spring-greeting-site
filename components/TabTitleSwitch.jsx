'use client';

import { useEffect } from 'react';

const ACTIVE_TITLE = 'С праздником весны 🌸';
const INACTIVE_TITLE = '🌸 С праздником весны';

export default function TabTitleSwitch() {
  useEffect(() => {
    const onVisibility = () => {
      document.title = document.hidden ? INACTIVE_TITLE : ACTIVE_TITLE;
    };

    // ensure correct title on first paint/hydration
    onVisibility();

    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return null;
}
