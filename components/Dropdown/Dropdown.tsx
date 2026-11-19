import React, { useState } from 'react';
import clsx from 'clsx';
import classes from './Dropdown.module.css';
import ChevronDown from '../../icons/chevron-down.svg?react';
import { useClickOutside } from '../../hooks/clickOutside';
import Button from '../Button/Button';

type DropdownProps = {
  children?: React.ReactNode;
  header?: React.ReactNode;
  showArrow?: boolean;
  className?: string;
  buttonProps?: React.ComponentProps<typeof Button>;
  menuRole?: 'listbox';
};

const Dropdown: React.FC<DropdownProps> = ({
  children, header, showArrow = true, className, buttonProps, menuRole,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(() => setIsOpen(false));
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      if (isOpen) event.stopPropagation();
      event.preventDefault();
      setIsOpen(false);
      ref.current?.querySelector<HTMLButtonElement>('button')?.focus();
      return;
    }
    if (!menuRole || !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    setIsOpen(true);
    const items = Array.from(ref.current?.querySelectorAll<HTMLButtonElement>('[role="option"]:not(:disabled)') || []);
    const active = (ref.current?.getRootNode() as Document | ShadowRoot)?.activeElement;
    const index = items.indexOf(active as HTMLButtonElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1
      : (index + (event.key === 'ArrowUp' ? items.length - 1 : 1)) % items.length;
    items[next]?.focus();
  };
  return (
    <div className={clsx(classes.dropdown, className)} ref={ref} onKeyDown={onKeyDown}>
      <Button {...buttonProps} aria-expanded={isOpen} aria-haspopup={menuRole}
        onClick={() => setIsOpen(!isOpen)} className={clsx(classes.btn, isOpen && classes.isOpen)}>
        {header}{showArrow && <ChevronDown style={{ width: 16, height: 16 }} />}
      </Button>
      <div role={menuRole} className={clsx(classes.dropdownMenu, !isOpen && classes.hidden)}>
        {children}
      </div>
    </div>
  );
};
export default Dropdown;
