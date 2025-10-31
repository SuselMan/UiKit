import React from 'react';
import classes from './ToggleDropdown.module.css';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import clsx from 'clsx';

type ToggleDropdownProps = {
    options: string[];
    current: string | string[];
    onChange: (option: string) => void;
    multiselect?: boolean;
    placeholder?: string;
    voc?: Record<string, React.ReactNode> | Record<string, string>;
    className?: string;
} & Partial<React.ComponentProps<typeof Button>>;

const ToggleDropdown: React.FC<ToggleDropdownProps> = ({
    options,
    current,
    onChange,
    multiselect,
    placeholder,
    voc = {},
    className,
    ...props
}) => {
    const hasOption = (option: string) => {
        if (Array.isArray(current)) {
            return current.includes(option);
        }
        return current === option;
    };

    const currentKey = Array.isArray(current) ? current.join(',') : current;

    return (
        <Dropdown
            key={currentKey || options.join(',')}
            className={className}
            header={
                <>
                    <span>{voc[currentKey] || currentKey || placeholder}</span>
                </>
            }
        >
            {options.map((option) => (
                <Button
                    key={option}
                    onClick={() => onChange(option)}
                    {...props}
                    className={clsx(
                        classes.btn,
                        hasOption(option) && classes.selected,
                    )}
                >
                    {voc[option] || option}
                </Button>
            ))}
        </Dropdown>
    );
};

export default ToggleDropdown;
