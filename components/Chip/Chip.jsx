import React from 'react';
import classes from './Chip.module.css';
import Button from '../Button/Button';
import CloseIcon from '../../icons/x-mark.svg?react';

const Chip = ({ className, children, close }) => {
    return (
        <div className={`${classes.chip} ${className}`}>
            <span>{children}</span>
            <Button variant="ghost" onClick={close}>
                <CloseIcon width={16} height={16} />
            </Button>
        </div>
    );
};

export default Chip;
