import React from 'react';
import clsx from 'clsx';
import classes from './Toggle.module.css';

type ToggleProps = {
  checked: boolean;
  callback: () => void;
  className?: string;
  'aria-label'?: string;
};

const Toggle: React.FC<ToggleProps> = ({
  checked, callback, className, 'aria-label': ariaLabel = 'Toggle',
}) => (
  <div
    className={clsx(
      classes.toggle,
      checked && classes.checked,
      className,
    )}
    onClick={callback}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        callback();
      }
    }}
    role="switch"
    aria-checked={checked}
    aria-label={ariaLabel}
    tabIndex={0}
  >
    <div className={clsx(classes.circle)} />
  </div>
);

export default Toggle;
