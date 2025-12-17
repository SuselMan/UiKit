import React from 'react';
import classes from './Card.module.css';

type CardProps = {
  children?: React.ReactNode;
  className?: string;
  elevated?: boolean;
};

const Card: React.FC<CardProps> = ({ children, className = '', elevated = false }) => (
  <section
    className={`${classes.card} ${elevated ? classes.elevated : ''} ${className}`.trim()}
  >
    {children}
  </section>
);

export default Card;
