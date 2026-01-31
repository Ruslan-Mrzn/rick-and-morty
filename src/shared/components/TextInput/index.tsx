import type { ChangeEvent } from 'react';

import { classNames } from '@/shared/helpers';
import { type TextInputProps } from '@/shared/types';

import styles from './TextInput.module.scss';

const TextInput = ({
  variant,
  placeholder,
  icon,
  value,
  name,
  onChange
}: TextInputProps) => {
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  const handleClear = () => {
    onChange?.('');
  };

  return (
    <label>
      <div
        className={classNames(styles.input, {
          [styles.input_bordered]: variant === 'bordered',
          [styles.input_underlined]: variant === 'underlined'
        })}
      >
        {icon && <div className={styles.input__icon}>{icon}</div>}
        <input
          className={styles.input__field}
          type='text'
          placeholder={placeholder}
          value={value}
          onChange={handleNameChange}
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
