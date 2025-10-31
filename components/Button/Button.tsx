import React from 'react';
import classes from './Button.module.css';

type ButtonVariant = '' | 'ghost' | 'active' | 'secondary' | 'danger';
type ButtonSize = '' | 'lg';

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
    type?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
    children,
    className = '',
    onClick,
    disabled = false,
    type = '',
    size = '',
    ...props
}) => {
    const type2Class = {
        ghost: classes.ghost,
        active: classes.active,
        secondary: classes.secondary,
        danger: classes.danger,
    };

    const size2Class = {
        lg: classes.lg,
    };

    return (
        <button
            className={`${classes.button} ${type2Class[type] || ''} ${size2Class[size] || ''} ${className}`.trim()}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
