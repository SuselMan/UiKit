import React from 'react';
import Button from '../Button/Button';
import classes from './ValueBadge.module.css';

export type ValueBadgeProps = Omit<React.ComponentProps<typeof Button>, 'type'> & {
  status: 'normal' | 'high' | 'low' | 'unknown';
};

/** No thresholds or interpretation: the consumer supplies status and content. */
const ValueBadge = ({ status, children, className = '', onClick, ...props }: ValueBadgeProps) => {
  const style = `${classes.badge} ${classes[status]} ${className}`;
  if (onClick) {
    return (
      <Button {...props} type="ghost" shape="rounded" size="sm" onClick={onClick} className={style}>
        {children}
      </Button>
    );
  }
  return <span className={style} title={props.title}>{children}</span>;
};
export default ValueBadge;
