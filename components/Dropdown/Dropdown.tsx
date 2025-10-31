import React, { useState } from 'react';
import classes from './Dropdown.module.css';
import Chip from '../Chip/Chip';
import ChevronDown from '../../icons/chevron-down.svg?react';
import { useClickOutside } from '../../hooks/clickOutside';
import Button from '../Button/Button';
import clsx from 'clsx';

type DropdownProps = {
    children?: React.ReactNode;
    header?: React.ReactNode;
    showArrow?: boolean;
    className?: string;
};

const Dropdown: React.FC<DropdownProps> = ({ children, header, showArrow = true, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useClickOutside(() => {
        setIsOpen(false);
    });
    const onDropdownClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={clsx(classes.dropdown, className)} ref={ref}>
            <Button
                onClick={onDropdownClick}
                className={clsx(classes.btn, isOpen && classes.isOpen)}
            >
                {header}{' '}
                {showArrow && <ChevronDown style={{ width: 16, height: 16 }} />}
            </Button>
            <div
                className={`${classes.dropdownMenu} ${!isOpen && classes.hidden}`}
            >
                {children}
            </div>
        </div>
    );
};

export default Dropdown;
