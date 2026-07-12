'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// On every client-side route change, scroll to the top and move focus into the
// main content region so keyboard and screen-reader users land on the new
// page's heading instead of remaining in the header navigation. The first
// mount is skipped so the initial page load keeps its normal focus (letting
// users reach the skip link first).
export default function RouteFocus() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    window.scrollTo(0, 0);
    const main = document.getElementById('main-content');
    main?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
