import React from 'react';
import classes from './Collapsible.module.css';
export type CollapsibleProps = Omit<React.DetailsHTMLAttributes<HTMLDetailsElement>, 'title'> & {
    title: React.ReactNode;
};
const Collapsible = ({ title, children, className = '', ...props }: CollapsibleProps) => <details {...props} className={`${classes.root} ${className}`}><summary className={classes.summary}>{title}</summary><div className={classes.content}>{children}</div></details>;
export default Collapsible;
