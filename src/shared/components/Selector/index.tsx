import {
  type ComponentType,
  type Dispatch,
  useEffect,
  useRef,
  useState
} from 'react';

import { SelectorArrowIcon } from '@/assets/icons';

import styles from './Selector.module.scss';

interface OptionComponentProps<T> {
  option: T;
}

interface SelectorProps<T> {
  size?: 'big' | 'small';
  options: T[];
  OptionComponent?: ComponentType<OptionComponentProps<T>>;
  onChange: Dispatch<T>;
  placeholder?: string;
  value?: T;
}

const valueComponent = <T,>({ option }: OptionComponentProps<T>) => {
  return <>{option}</>;
};

const Selector = <T extends string | undefined>({
  size = 'big',
  options,
  placeholder,
  value,
  OptionComponent = valueComponent,
  onChange
}: SelectorProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const optionsListRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: T) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleSelectorClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      optionsListRef.current &&
      !optionsListRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handlePressEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handlePressEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handlePressEscape);
    };
  }, []);

  return (
    <div
      ref={optionsListRef}
      className={[styles.selector, styles[`selector_${size}`]].join(' ')}
    >
      <button
        onClick={handleSelectorClick}
        className={styles.selector__input}
      >
        {value ? <OptionComponent option={value} /> : placeholder}

        <SelectorArrowIcon
          className={`${styles.selector__arrow} ${isOpen && styles.selector__arrow_open}`}
          width={size === 'big' ? 10 : 4}
          height={size === 'big' ? 5 : 2}
        />
      </button>
      {isOpen && (
        <ul className={styles.selector__list}>
          {options.map((option) => (
            <li
              className={styles.selector__option}
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              <OptionComponent option={option} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Selector;
