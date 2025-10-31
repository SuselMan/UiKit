import React from 'react';
import classes from './Input.module.css';

const Input = ({
    label,
    type = 'text',
    placeholder = '',
    value,
    onChange = () => {},
    id = '',
    error = '',
    inputClasses,
    className = '',
    ...props
}) => (
    <label
        className={`${classes.inputContainer} ${error && classes.error} ${className}`}
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
        <div className={classes.errorText}>{error}</div>
    </label>
);

export default Input;
