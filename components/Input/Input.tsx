import React from 'react';
import classes from './Input.module.css';

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string;
  type?: string;
  error?: string;
  isError?: boolean;
  inputClasses?: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange = () => {},
  id = '',
  error = '',
  isError = false,
  inputClasses,
  className = '',
  ...props
}) => (
  <label
    className={`${classes.inputContainer} ${(error || isError) && classes.error} ${className}`}
    htmlFor={id}
  >
    {label && <span className={classes.inputLabel}>{label}</span>}
    <input
      id={id}
      className={`${classes.input} ${inputClasses}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
    {!!error && <div className={classes.errorText}>{error}</div>}
  </label>
);

export default Input;
