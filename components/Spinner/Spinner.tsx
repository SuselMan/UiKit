import React from 'react';
import clsx from 'clsx';
import SpinnerIcon from '../../icons/spinner.svg?react';
import classes from './Spinner.module.css';

export type SpinnerSize = 'lg' | 'md' | 'sm';

type SpinnerProps = {
    size: SpinnerSize;
};

const Spinner: React.FC<SpinnerProps> = ({ size }) => {
    const size2Class: Record<SpinnerSize, string> = {
        lg: classes.lg,
        md: classes.md,
        sm: classes.sm,
    };

    return (
        <span className={clsx(classes.spinner, size2Class[size])} role="status" aria-label="Loading">
            <SpinnerIcon aria-hidden="true" focusable="false" />
        </span>
    );
};

export default Spinner;


