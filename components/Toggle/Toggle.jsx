import React from 'react';
import classes from './Toggle.module.css';
import clsx from 'clsx';

const Toggle = ({ checked, callback, className, ...props }) => {
    return (
        <div
            className={clsx(
                classes.toggle,
                checked && classes.checked,
                className,
            )}
            onClick={callback}
        >
            <div className={clsx(classes.circle)} />
        </div>
    );
};

export default Toggle;
