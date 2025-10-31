import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import classes from './Link.module.css';
import clsx from 'clsx';

type LinkProps = {
    to: string;
    children?: React.ReactNode;
    className?: string;
};

const Link: React.FC<LinkProps> = ({ to, children, className }) => {
    return (
        <ReactLink className={clsx(classes.link, className)} to={to}>
            {children}
        </ReactLink>
    );
};

export default Link;
