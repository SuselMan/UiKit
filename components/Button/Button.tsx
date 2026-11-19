import React from 'react';
import classes from './Button.module.css';
type ButtonVariant = 'primary' | 'ghost' | 'active' | 'secondary' | 'danger';
type ButtonSize = 'lg' | 'md' | 'sm';
type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
    type?: ButtonVariant;
    size?: ButtonSize;
    shape?: 'default' | 'rounded' | 'pill';
    className?: string;
    children?: React.ReactNode;
};
const Button: React.FC<ButtonProps> = ({ children, className = '', onClick, disabled = false, type = 'primary', size = 'lg', shape = 'default', ...props }) => {
    const type2Class: Record<ButtonVariant, string> = {
        ghost: classes.ghost,
        active: classes.active,
        secondary: classes.secondary,
        danger: classes.danger,
        primary: '',
    };
    const size2Class = {
        lg: classes.lg,
        md: classes.md,
        sm: classes.sm,
    };
    return (<button type="button" className={`${classes.button} ${type2Class[type] || ''} ${size2Class[size] || ''} ${shape === 'rounded' ? classes.rounded : shape === 'pill' ? classes.pill : ''} ${className}`.trim()} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>);
};
export default Button;
