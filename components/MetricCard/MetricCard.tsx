import React from 'react';
import Card from '../Card/Card';
import classes from './MetricCard.module.css';
export type MetricCardProps = {
    title: React.ReactNode;
    value: React.ReactNode;
    unit?: React.ReactNode;
    icon?: React.ReactNode;
    description?: React.ReactNode;
    className?: string;
    orientation?: 'vertical' | 'horizontal';
};
const MetricCard = ({ title, value, unit, icon, description, className = '', orientation = 'vertical' }: MetricCardProps) => <Card rounded padding="lg" className={`${classes.root} ${orientation === 'horizontal' ? classes.horizontal : ''} ${className}`}><div className={classes.label}>{icon && <span className={classes.icon} aria-hidden="true">{icon}</span>}<span>{title}</span></div><div className={classes.value}>{value}{unit && <span className={classes.unit}>{unit}</span>}</div>{description && <div className={classes.description}>{description}</div>}</Card>;
export default MetricCard;
