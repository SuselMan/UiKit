import { useEffect } from 'react';

export function useClickOutside(
  refs: Array<React.RefObject<HTMLElement | null>>,
  onOutsideClick: () => void,
  enabled: boolean = true,
): void {
  useEffect(() => {
    if (!enabled) return () => {};

    const handleEvent = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      const isInside = refs.some((ref) => {
        const el = ref.current;
        return el ? el.contains(target) : false;
      });
      if (!isInside) {
        onOutsideClick();
      }
    };

    document.addEventListener('mousedown', handleEvent);
    document.addEventListener('touchstart', handleEvent, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleEvent);
      document.removeEventListener('touchstart', handleEvent);
    };
  }, [refs, onOutsideClick, enabled]);
}
