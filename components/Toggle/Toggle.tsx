import React from 'react';
import classes from './Toggle.module.css';
import clsx from 'clsx';

type ToggleProps = {
    checked: boolean;
    callback: () => void;
    className?: string;
};

const Toggle: React.FC<ToggleProps> = ({ checked, callback, className }) => {
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
