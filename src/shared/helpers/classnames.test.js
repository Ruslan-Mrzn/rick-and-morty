import { describe, expect, it } from 'vitest';

import classNames from './classNames';

describe('classNames helper', () => {
  it('returns a string with one class', () => {
    expect(classNames('button')).toBe('button');
  });

  it('combines multiple classes', () => {
    expect(classNames('button', 'button--primary', { active: true })).toBe(
      'button button--primary active'
    );
  });

  it('ignores falsy values', () => {
    expect(
      classNames(undefined, 'button', { hidden: false, visible: true }, '')
    ).toBe('button visible');
  });

  it('returns an empty string when called without arguments', () => {
    expect(classNames()).toBe('');
  });
});
