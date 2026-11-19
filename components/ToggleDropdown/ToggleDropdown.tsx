import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import classes from './ToggleDropdown.module.css';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
type ToggleDropdownProps = {
    options: string[];
    current: string | string[];
    onChange: (option: string) => void;
    multiselect?: boolean;
    placeholder?: string;
    voc?: Record<string, React.ReactNode> | Record<string, string>;
    className?: string;
    nativeOnMobile?: boolean;
    nativeProps?: Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange' | 'multiple' | 'children'>;
    nativeLabels?: Record<string, string>;
} & Omit<Partial<React.ComponentProps<typeof Button>>, 'onChange'>;
const ToggleDropdown: React.FC<ToggleDropdownProps> = ({ options, current, onChange, multiselect, placeholder, voc = {}, className, nativeOnMobile = false, nativeProps = {}, nativeLabels = {}, ...props }) => {
    const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 700px), (pointer: coarse)').matches);
    useEffect(() => { const media = window.matchMedia('(max-width: 700px), (pointer: coarse)'), changed = () => setMobile(media.matches); media.addEventListener('change', changed); return () => media.removeEventListener('change', changed); }, []);
    if (nativeOnMobile && mobile && !multiselect && !Array.isArray(current))
        return <select {...nativeProps} className={clsx(classes.native, className, nativeProps.className)} value={current} disabled={props.disabled || nativeProps.disabled} onChange={e => onChange(e.target.value)}>{placeholder && <option value="" disabled>{placeholder}</option>}{options.map(option => <option key={option} value={option}>{nativeLabels[option] ?? (typeof voc[option] === 'string' ? voc[option] : option)}</option>)}</select>;
    const hasOption = (option: string) => {
        if (Array.isArray(current)) {
            return current.includes(option);
        }
        return current === option;
    };
    const currentKey = Array.isArray(current) ? current.join(',') : current;
    return (<Dropdown key={currentKey || options.join(',')} className={className} buttonProps={{ 'aria-label': nativeProps['aria-label'], disabled: props.disabled, id: nativeProps.id, shape: props.shape, size: props.size }} menuRole="listbox" header={(<span>{voc[currentKey] || currentKey || placeholder}</span>)}>
      {options.map((option) => (<Button key={option} role="option" aria-selected={hasOption(option)} onClick={() => onChange(option)} {...props} className={clsx(classes.btn, hasOption(option) && classes.selected)}>
          {voc[option] || option}
        </Button>))}
    </Dropdown>);
};
export default ToggleDropdown;
