import React from 'react';
import clsx from 'clsx';
import classes from './Notification.module.css';

const Notification = ({
    children,
    className = '',
    type = '',
    size = 'md',
    ...props
}) => {
    const type2Class = {
        neutral: classes.neutral,
        warning: classes.warning,
        error: classes.error,
        success: classes.success,
    };

    const size2Class = {
        lg: classes.lg,
        md: classes.md,
        sm: classes.sm,
    };

    return (
        <div
            className={clsx(
                classes.notification,
                type2Class[type],
                size2Class[size],
                className,
            )}
        >
            {children}
        </div>
    );
};

export default Notification;
