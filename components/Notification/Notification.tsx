import React from 'react';
import clsx from 'clsx';
import classes from './Notification.module.css';

type NotificationType = '' | 'neutral' | 'warning' | 'error' | 'success';
type NotificationSize = 'lg' | 'md' | 'sm';

type NotificationProps = {
    children?: React.ReactNode;
    className?: string;
    type?: NotificationType;
    size?: NotificationSize;
};

const Notification: React.FC<NotificationProps> = ({
    children,
    className = '',
    type = '',
    size = 'md',
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
