import React, { SyntheticEvent, useRef, useState } from 'react';
import classes from './SearchSelect.module.css';
import Chip from '../Chip/Chip';
import { useClickOutside } from '../../hooks/clickOutside';
import CheckIcon from '../../icons/check.svg?react';
import Button from '../Button/Button';

type SearchSelectProps = {
  options?: string[];
  onChange?: (option: string, add: boolean) => void;
  onClear?: () => void;
  selected?: string[];
};

const SearchSelect: React.FC<SearchSelectProps> = ({
  options = [], onChange = () => {}, onClear = () => {}, selected = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(() => options);
  const ref = useClickOutside(() => {
    setIsOpen(false);
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onClearHandler = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    onClear();
  };

  const onSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setIsOpen(true);
    setSearchString(evt.target.value);
    setFilteredOptions(
      evt.target.value
        ? options.filter((opt) => opt.includes(evt.target.value))
        : options,
    );
  };

  const removeChip = (opt: string, add: boolean) => {
    onChange(opt, add);
    setIsOpen(false);
  };

  return (
    <div className={classes.dropdown} ref={ref}>
      <div
        className={`${classes.field} ${isOpen ? classes.openedField : ''}`}
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(true);
            inputRef.current?.focus();
          }
        }}
      >
        {selected.map((opt) => (
          <Chip key={opt} className={classes.chip} close={() => removeChip(opt, false)}>
            {opt}
          </Chip>
        ))}
        <input
          ref={inputRef}
          className={classes.inputInline}
          value={searchString}
          onChange={onSearchChange}
          placeholder={selected.length ? '' : 'Select columns'}
        />
        {!!selected.length && (
        <Button onClick={onClearHandler} size="sm">Clear</Button>
        )}
      </div>
      <div
        className={`${classes.dropdownMenu} ${!isOpen && classes.hidden}`}
      >
        {filteredOptions.map((opt) => (
          <Button
            type="ghost"
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
