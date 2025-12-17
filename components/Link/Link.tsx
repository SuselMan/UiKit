import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import clsx from 'clsx';
import classes from './Link.module.css';

type LinkProps = {
  to: string;
  children?: React.ReactNode;
  className?: string;
};

const Link: React.FC<LinkProps> = ({ to, children, className }) => (
  <ReactLink className={clsx(classes.link, className)} to={to}>
    {children}
  </ReactLink>
);

export default Link;
