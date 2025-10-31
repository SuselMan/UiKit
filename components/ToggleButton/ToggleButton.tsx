import React from 'react';
import classes from './ToggleButton.module.css';
import Chip from '../Chip/Chip';
import Button from '../Button/Button';

type ToggleButtonProps = {
    options: string[];
    current: string | string[];
    onChange: (option: string) => void;
    multiselect?: boolean;
} & Partial<React.ComponentProps<typeof Button>>;

const ToggleButton: React.FC<ToggleButtonProps> = ({
    options,
    current,
    onChange,
    multiselect,
    ...props
}) => {
    const hasOption = (option: string) => {
        if (Array.isArray(current)) {
            return current.includes(option);
        }
        return current === option;
    };

    return (
        <div className={classes.container}>
            {options.map((option, index) => (
                <Button
                    key={option}
                    onClick={() => onChange(option)}
                    {...props}
                    className={`${classes.btn} ${index === 0 ? classes.first : ''} ${index === options.length - 1 ? classes.last : ''} ${classes.option} ${hasOption(option) ? classes.selected : ''}`}
                >
                    {option}
                </Button>
            ))}
        </div>
    );
};

export default ToggleButton;
