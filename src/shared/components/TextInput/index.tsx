import type { ChangeEvent, KeyboardEvent } from 'react';

import { classNames } from '@/shared/helpers';
import type { TextInputProps } from '@/shared/types';

import styles from './TextInput.module.scss';

const TextInput = ({
  variant,
  placeholder,
  icon,
  value,
  name,
  onChange,
  onEnter,
  onClear,
  onIconClick
}: TextInputProps) => {
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  const handleClear = () => {
    onChange?.('');
    onClear?.();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onEnter?.();
    }
  };

  return (
    <label>
      <div
        className={classNames(styles.input, {
          [styles.input_bordered]: variant === 'bordered',
          [styles.input_underlined]: variant === 'underlined'
        })}
      >
        {icon && (
          <div
            className={styles.input__icon}
            onClick={onIconClick}
          >
            {icon}
          </div>
        )}
        <input
          className={styles.input__field}
          type='text'
          placeholder={placeholder}
          value={value}
          onChange={handleNameChange}
          onKeyDown={handleKeyDown}
          name={name}
        />
        {value && (
          <span
            className={styles.input__clear}
            onClick={handleClear}
          ></span>
        )}
      </div>
    </label>
  );
};

export default TextInput;
