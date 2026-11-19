import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import classes from './Modal.module.css';
import { useClickOutside } from '../../hooks/clickOutside';
import CloseIcon from '../../icons/x-mark.svg?react';
import Button from '../Button/Button';
type ModalProps = {
    children?: React.ReactNode;
    close?: () => void;
    title?: React.ReactNode;
    isCloseShown?: boolean;
    className?: string;
};
const Modal: React.FC<ModalProps> = ({ children, close = () => { }, title, isCloseShown = true, className, }) => {
    const ref = useClickOutside(close);
    const closeRef = useRef(close);
    closeRef.current = close;
    useEffect(() => {
        let previous = document.activeElement as HTMLElement | null;
        while (previous?.shadowRoot?.activeElement)
            previous = previous.shadowRoot.activeElement as HTMLElement;
        const modal = ref.current;
        const focusable = () => Array.from(modal?.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),[tabindex="0"]') || []);
        focusable()[0]?.focus();
        const keydown = (e: KeyboardEvent) => { if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            closeRef.current();
        } if (e.key === 'Tab') {
            const list = focusable(), first = list[0], last = list.at(-1);
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last?.focus();
            }
            else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first?.focus();
            }
        } };
        document.addEventListener('keydown', keydown);
        return () => { document.removeEventListener('keydown', keydown); if (previous?.isConnected)
            previous.focus(); };
    }, []);
    return (<div className={clsx(classes.overlay)}>
      <div ref={ref} className={clsx(classes.modal, className)} role="dialog" aria-modal="true" aria-label={typeof title === 'string' ? title : undefined}>
        <div className={classes.header}>
          <h2>{title}</h2>
          {isCloseShown && (<Button type="ghost" className={classes.closeButton} aria-label="Закрыть" onClick={close}>
            <CloseIcon />
          </Button>)}
        </div>
        <div className={classes.body}>{children}</div>
      </div>
    </div>);
};
export default Modal;
