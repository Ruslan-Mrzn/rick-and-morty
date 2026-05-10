import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import Selector from './index';
import styles from './Selector.module.scss';

describe('Selector sizes', () => {
  it('applies big size styles and arrow dimensions', () => {
    const { container } = render(
      <Selector
        options={['human', 'alien']}
        onChange={vi.fn()}
        size='big'
        placeholder='Species'
      />
    );

    const root = container.firstElementChild;
    const arrow = container.querySelector('svg');

    expect(root).toHaveClass(styles.selector_big);
    expect(root).not.toHaveClass(styles.selector_small);
    expect(arrow).toHaveAttribute('width', '10');
    expect(arrow).toHaveAttribute('height', '5');
  });

  it('applies small size styles and arrow dimensions', () => {
    const { container } = render(
      <Selector
        options={['human', 'alien']}
        onChange={vi.fn()}
        size='small'
        placeholder='Species'
      />
    );

    const root = container.firstElementChild;
    const arrow = container.querySelector('svg');

    expect(root).toHaveClass(styles.selector_small);
    expect(root).not.toHaveClass(styles.selector_big);
    expect(arrow).toHaveAttribute('width', '4');
    expect(arrow).toHaveAttribute('height', '2');
  });
});

describe('Selector placeholder', () => {
  it('renders passed placeholder inside selector input', () => {
    const placeholder = 'Pick species';

    const { container } = render(
      <Selector
        options={['human', 'alien']}
        onChange={vi.fn()}
        placeholder={placeholder}
      />
    );

    const input = container.querySelector(`.${styles.selector__input}`);
    const placeholderNode = screen.getByText(placeholder);

    expect(placeholderNode).toBeInTheDocument();
    expect(input).toContainElement(placeholderNode);
  });
});
