import React from 'react';
import clsx from 'clsx';
import CubeTransparentIcon from '../../icons/cube-transparent.svg?react';
import classes from './EmptyView.module.css';

type EmptyViewProps = {
    title: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
};

const EmptyView: React.FC<EmptyViewProps> = ({ title, icon, className, children }) => {
    return (
        <div className={clsx(classes.root, className)}>
            <div className={classes.icon} aria-hidden="true">
                {icon ?? <CubeTransparentIcon />}
            </div>
            <h2 className={classes.title}>{title}</h2>
            {children ? <div className={classes.content}>{children}</div> : null}
        </div>
    );
};

export default EmptyView;


