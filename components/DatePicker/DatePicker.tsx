import React, { useMemo, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { IMaskInput } from 'react-imask';
import classes from './DatePicker.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import CalendarIcon from '../../icons/calendar.svg?react';
import ChevronLeftIcon from '../../icons/chevron-left.svg?react';
import ChevronRightIcon from '../../icons/chevron-right.svg?react';
import { useClickOutside } from '../../hooks/useClickOutside';

 type DatePickerProps = {
   value?: string; // ISO string
   onChange?: (iso: string) => void;
   label?: string;
   minDate?: Dayjs;
   maxDate?: Dayjs;
   placeholder?: string;
   className?: string;
   inputClassName?: string;
   disabled?: boolean;
   id?: string;
 };

const START_YEAR = 2000;

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  minDate,
  maxDate,
  placeholder = 'dd/mm/yyyy',
  className = '',
  inputClassName = '',
  disabled = false,
  id,
}) => {
  const parsed = value ? dayjs(value) : null;
  const [open, setOpen] = useState(false);
  const [textValue, setTextValue] = useState(parsed ? parsed.format('DD/MM/YYYY') : '');
  const [viewYear, setViewYear] = useState<number>(parsed?.year() ?? dayjs().year());
  const [viewMonth, setViewMonth] = useState<number>(parsed?.month() ?? dayjs().month());
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastAcceptedRef = useRef<string>('');
  useClickOutside([containerRef], () => setOpen(false), open);

  const years = useMemo(() => {
    const currentYear = dayjs().year();
    const ys: number[] = [];
    for (let y = START_YEAR; y <= currentYear; y += 1) ys.push(y);
    return ys;
  }, []);

  const months = useMemo(
    () => [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    [],
  );

  const startOfMonth = dayjs().year(viewYear).month(viewMonth).startOf('month');
  const endOfMonth = startOfMonth.endOf('month');
  const firstWeekdayIndex = (startOfMonth.day() + 6) % 7; // make Monday=0
  const daysInMonth = endOfMonth.date();

  const clampInRange = (d: Dayjs) => {
    if (minDate && d.isBefore(minDate, 'day')) return minDate;
    if (maxDate && d.isAfter(maxDate, 'day')) return maxDate;
    return d;
  };

  const isDisabledDay = (d: Dayjs) => {
    if (minDate && d.isBefore(minDate, 'day')) return true;
    if (maxDate && d.isAfter(maxDate, 'day')) return true;
    return false;
  };

  const commit = (d: Dayjs) => {
    const inside = clampInRange(d.startOf('day'));
    const nextText = inside.format('DD/MM/YYYY');
    lastAcceptedRef.current = nextText;
    setTextValue(nextText);
    onChange?.(inside.toISOString());
    setOpen(false);
    setViewYear(inside.year());
    setViewMonth(inside.month());
  };

  const tryAcceptMasked = (masked: string) => {
    const trimmed = masked.trim();
    if (trimmed.length !== 10) return; // 00/00/0000
    const parsedD = dayjs(trimmed, 'DD/MM/YYYY', true);
    if (!parsedD.isValid()) return;
    if (isDisabledDay(parsedD)) return;
    commit(parsedD);
  };

  const goPrevMonth = () => {
    const prev = dayjs().year(viewYear).month(viewMonth).date(1)
      .subtract(1, 'month');
    setViewYear(prev.year());
    setViewMonth(prev.month());
  };

  const goNextMonth = () => {
    const next = dayjs().year(viewYear).month(viewMonth).date(1)
      .add(1, 'month');
    setViewYear(next.year());
    setViewMonth(next.month());
  };

  return (
    <div className={`${classes.container} ${className}`} ref={containerRef}>
      <div className={classes.inputWrapper}>
        <Input
          id={id}
          {...(label ? { label } : {})}
          placeholder={placeholder}
          value={textValue}
          onChange={() => {}}
          inputClasses={`${classes.inputWithIcon} ${inputClassName}`}
          className={classes.inputWrapper}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          readOnly
          disabled={disabled}
        />
        <Button
          type="ghost"
          className={classes.calendarButton}
          onClick={() => setOpen((v) => !v)}
          aria-label="Open calendar"
        >
          <CalendarIcon />
        </Button>
        {/* Hidden masked input to capture manual typing when needed */}
        <IMaskInput
          mask="00/00/0000"
          value={textValue}
          onAccept={(val: string) => {
            if (val === textValue || val === lastAcceptedRef.current) {
              return;
            }
            lastAcceptedRef.current = val;
            setTextValue(val);
            tryAcceptMasked(val);
          }}
          lazy={false}
          overwrite
                     // Attach but visually hidden; we rely on Input for visuals
          style={{
            position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0,
          }}
        />
      </div>

      {open && (
      <div className={classes.popover} role="dialog" aria-modal="true">
        <div className={classes.header}>
          <Button type="ghost" size="sm" onClick={goPrevMonth} aria-label="Previous month">
            <ChevronLeftIcon />
          </Button>
          <div className={classes.selectors}>
            <select
              className={classes.select}
              value={viewMonth}
              onChange={(e) => setViewMonth(Number(e.target.value))}
            >
              {months.map((m, idx) => (
                <option key={m} value={idx}>
                  {m}
                </option>
              ))}
            </select>
            <select
              className={classes.select}
              value={viewYear}
              onChange={(e) => setViewYear(Number(e.target.value))}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <Button type="ghost" size="sm" onClick={goNextMonth} aria-label="Next month">
            <ChevronRightIcon />
          </Button>
        </div>

        <div className={classes.weekdays}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((w) => (
            <div key={w} style={{ width: 'calc((280px - 6 * 4px) / 7)', textAlign: 'center' }}>
              {w}
            </div>
          ))}
        </div>

        <div className={classes.days}>
          {Array.from({ length: firstWeekdayIndex }).map((_, i) => {
            const d = startOfMonth.subtract(firstWeekdayIndex - i, 'day');
            return (
              <div
                key={d.format('YYYY-MM-DD')}
                style={{ width: 'calc((280px - 6 * 4px) / 7)' }}
              />
            );
          })}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const d = startOfMonth.date(dayNum);
            const selected = parsed?.isValid() && parsed.isSame(d, 'day');
            const disabledDay = isDisabledDay(d);
            const buttonType = selected ? 'active' : 'ghost';
            return (
              <Button
                key={dayNum}
                type={buttonType as any}
                size="sm"
                className={classes.dayButton}
                disabled={disabledDay}
                onClick={() => commit(d)}
              >
                {dayNum}
              </Button>
            );
          })}
        </div>
      </div>
      )}
    </div>
  );
};

export default DatePicker;
