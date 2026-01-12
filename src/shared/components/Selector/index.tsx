import { type ReactNode, useState } from 'react';

import { SelectorArrowIcon } from '@/assets/icons';

import styles from './Selector.module.scss';

interface SelectorProps {
  size?: 'big' | 'small';
  options: string[];
  indicator?: ReactNode;
  placeholder?: string;
  defaultOption?: string;
}

const Selector = ({
  size = 'big',
  options,
  indicator,
  placeholder,
  defaultOption
}: SelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>(
    () => options.find((option) => option === defaultOption) || ''
  );

  const handleOptionClick = (option: string) => {
    setActiveFilter(option);
    setIsOpen(false);
  };

  return (
    <div className={[styles.selector, styles[`selector_${size}`]].join(' ')}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.selector__input}
      >
        {activeFilter ? activeFilter : placeholder}
        {activeFilter && indicator && (
          <span
            data-key={activeFilter}
            key={activeFilter}
          >
            {indicator}
          </span>
        )}

        <SelectorArrowIcon
          className={`${styles.selector__arrow} ${isOpen && styles.selector__arrow_open}`}
          width={size === 'big' ? 10 : 4}
          height={size === 'big' ? 5 : 2}
        />
      </button>
      <ul
        className={styles.selector__list}
        hidden={!isOpen}
      >
        {isOpen &&
          options.map((option) => (
            <li
              className={styles.selector__option}
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
              {indicator && <span data-key={option}>{indicator}</span>}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Selector;
