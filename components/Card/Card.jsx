import React from 'react';
import classes from './Card.module.css';

const Card = ({ children, className = '', elevated = false }) => (
    <section
        className={`${classes.card} ${elevated ? classes.elevated : ''} ${className}`.trim()}
    >
        {children}
    </section>
);

export default Card;
