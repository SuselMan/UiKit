import React from 'react';
import classes from './Sidebar.module.css';
import Button from '../Button/Button';
import CloseIcon from '../../icons/x-mark.svg?react';

type SidebarProps = {
    isOpen: boolean;
    close?: () => void;
    title?: React.ReactNode;
    isCloseShown?: boolean;
    className?: string;
    children?: React.ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({
    isOpen,
    close = () => {},
    title,
    isCloseShown = true,
    className = '',
    children
}) => {
    return (
        <>
            <div
                className={`${classes.overlay} ${!isOpen ? classes.overlayHidden : ''}`}
                onClick={close}
                aria-hidden={!isOpen}
            />
            <aside
                className={`${classes.sidebar} ${isOpen ? classes.open : ''} ${className}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="sidebar-title"
            >
                <div className={classes.header}>
                    <h2 id="sidebar-title" className={classes.title}>{title}</h2>
                    {isCloseShown && (
                        <Button type="ghost" onClick={close} aria-label="close">
                            <CloseIcon width={20} height={20} />
                        </Button>
                    )}
                </div>
                <div className={classes.body}>
                    {children}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;



