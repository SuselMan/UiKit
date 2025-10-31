import React from 'react';
import classes from './Chip.module.css';
import Button from '../Button/Button';
import CloseIcon from '../../icons/x-mark.svg?react';

type ChipProps = {
    className?: string;
    children?: React.ReactNode;
    close?: () => void;
};

const Chip: React.FC<ChipProps> = ({ className = '', children, close }) => {
    return (
        <div className={`${classes.chip} ${className}`}>
            <span>{children}</span>
            <Button type="ghost" onClick={close}>
                <CloseIcon width={16} height={16} />
            </Button>
        </div>
    );
};

export default Chip;
