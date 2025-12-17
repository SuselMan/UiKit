import React from 'react';
import clsx from 'clsx';
import classes from './Modal.module.css';
import { useClickOutside } from '../../hooks/clickOutside';
import CloseIcon from '../../icons/x-mark.svg?react';
import Button from '../Button/Button';

type ModalProps = {
  children?: React.ReactNode;
  close?: () => void;
  title?: React.ReactNode;
  isCloseShown?: boolean;
  className?: string;
};

const Modal: React.FC<ModalProps> = ({
  children,
  close = () => {},
  title,
  isCloseShown = true,
  className,
}) => {
  const ref = useClickOutside(close);

  return (
    <div className={clsx(classes.overlay)}>
      <div ref={ref} className={clsx(classes.modal, className)}>
        <div className={classes.header}>
          <h2>{title}</h2>
          {isCloseShown && (
          <Button
            type="ghost"
            className={classes.closeButton}
            onClick={close}
          >
            <CloseIcon />
          </Button>
          )}
        </div>
        <div className={classes.body}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
