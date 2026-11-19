import React from 'react';
import classes from './Card.module.css';
type CardProps = React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
    className?: string;
    elevated?: boolean;
    rounded?: boolean;
    padding?: 'md' | 'lg';
};
const Card: React.FC<CardProps> = ({ children, className = '', elevated = false, rounded = false, padding = 'md', ...props }) => (<section {...props} className={`${classes.card} ${elevated ? classes.elevated : ''} ${rounded ? classes.rounded : ''} ${padding === 'lg' ? classes.largePadding : ''} ${className}`.trim()}>
    {children}
  </section>);
export default Card;
