import React, { useEffect, useRef } from 'react';
import Button from '../Button/Button';
import classes from './ScrollNav.module.css';
export type ScrollNavItem = {
    id: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
};
export type ScrollNavProps = {
    items: ScrollNavItem[];
    value: string;
    onChange: (id: string) => void;
    label: string;
    className?: string;
};
const ScrollNav = ({ items, value, onChange, label, className = '' }: ScrollNavProps) => {
    const ref = useRef<HTMLElement>(null);
    useEffect(() => { const nav = ref.current, active = nav?.querySelector<HTMLElement>('[aria-current="page"]'); if (nav && active)
        nav.scrollTo({ left: active.offsetLeft - (nav.clientWidth - active.offsetWidth) / 2, behavior: 'smooth' }); }, [value]);
    return <nav ref={ref} aria-label={label} className={`${classes.nav} ${className}`} onKeyDown={e => { if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key))
        return; const buttons = Array.from(ref.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') || []); const index = buttons.indexOf(document.activeElement as HTMLButtonElement); if (index < 0)
        return; e.preventDefault(); const next = e.key === 'Home' ? 0 : e.key === 'End' ? buttons.length - 1 : (index + (e.key === 'ArrowRight' ? 1 : buttons.length - 1)) % buttons.length; buttons[next]?.focus(); }}>{items.map(item => <Button key={item.id} size="sm" type={item.id === value ? 'active' : 'ghost'} className={classes.item} disabled={item.disabled} aria-current={item.id === value ? 'page' : undefined} onClick={() => onChange(item.id)}>{item.icon && <span className={classes.icon} aria-hidden="true">{item.icon}</span>}<span className={classes.label}>{item.label}</span></Button>)}</nav>;
};
export default ScrollNav;
