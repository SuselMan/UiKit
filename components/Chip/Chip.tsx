import React, { SyntheticEvent } from 'react';
import classes from './Chip.module.css';
import Button from '../Button/Button';
import CloseIcon from '../../icons/x-mark.svg?react';
export type ChipProps = {
    className?: string;
    children?: React.ReactNode;
    close?: () => void;
    onClick?: () => void;
    selected?: boolean;
    disabled?: boolean;
    id?: string;
    'aria-label'?: string;
    'data-group'?: string;
};
const Chip = ({ className = '', children, close, onClick, selected, disabled, ...props }: ChipProps) => {
    const onClose = (e: SyntheticEvent) => { e.stopPropagation(); close?.(); };
    if (onClick)
        return <Button {...props} className={`${classes.choice} ${className}`} type={selected ? 'active' : 'primary'} shape="pill" size="sm" onClick={onClick} disabled={disabled} aria-pressed={selected}>{children}</Button>;
    return <div {...props} className={`${classes.chip} ${className}`}><span>{children}</span>{close && <Button type="ghost" aria-label="Удалить" onClick={onClose}><CloseIcon width={16} height={16}/></Button>}</div>;
};
export default Chip;
