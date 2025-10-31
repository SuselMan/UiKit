import { useEffect, useRef } from 'react';

export const useClickOutside = <T extends HTMLElement = HTMLDivElement>(callback: () => void) => {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const element = ref.current as HTMLElement | null;
            if (element && !element.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [callback]);

    return ref;
};
