import React, { useState } from 'react';
import classes from './SearchSelect.module.css';
import Chip from '../Chip/Chip';
import { useClickOutside } from '../../hooks/clickOutside';
import Input from '../Input/Input';
import CheckIcon from '../../icons/check.svg?react';
import Button from '../Button/Button';

type SearchSelectProps = {
    options?: string[];
    onChange?: (option: string, add: boolean) => void;
    selected?: string[];
};

const SearchSelect: React.FC<SearchSelectProps> = ({ options = [], onChange = () => {}, selected = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(() => options);
    const ref = useClickOutside(() => {
        setIsOpen(false);
    });

    const onSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setIsOpen(true);
        setSearchString(evt.target.value);
        setFilteredOptions(
            evt.target.value
                ? options.filter((opt) => opt.includes(evt.target.value))
                : options,
        );
    };

    return (
        <div className={classes.dropdown} ref={ref}>
            <Input
                onClick={() => setIsOpen(true)}
                onChange={onSearchChange}
                value={searchString}
                placeholder={'Select columns'}
                inputClasses={isOpen ? classes.openedInput : ''}
            />
            <div
                className={`${classes.dropdownMenu} ${!isOpen && classes.hidden}`}
            >
                {filteredOptions.map((opt) => (
                    <Button
                        type={'ghost'}
                        key={opt}
                        onClick={() => onChange(opt, !selected.includes(opt))}
                        className={classes.menuItem}
                    >
                        <span className={classes.option}>{opt}</span>
                        <div>
                            {selected.includes(opt) && (
                                <CheckIcon style={{ width: 14, height: 14 }} />
                            )}
                        </div>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default SearchSelect;
