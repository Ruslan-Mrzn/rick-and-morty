import { useState } from 'react';

import { withTheme } from '@sb/decorators';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { SearchIcon } from '@/assets/icons';
import type { TextInputProps } from '@/shared/types';

import TextInput from './index';

const TextInputStory = (args: TextInputProps) => {
  const [value, setValue] = useState(args.value ?? '');

  return (
    <TextInput
      {...args}
      value={value}
      onChange={setValue}
      onClear={() => setValue('')}
    />
  );
};

const meta = {
  title: 'Shared/TextInput',
  component: TextInput,
  render: (args) => <TextInputStory {...args} />,
  args: {
    name: 'textInput',
    placeholder: 'Filter by name...',
    value: '',
    variant: 'bordered',
    onChange: fn(),
    onEnter: fn(),
    onClear: fn(),
    onIconClick: fn()
  } satisfies TextInputProps
} satisfies Meta<TextInputProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BorderedLight: Story = {
  args: {
    variant: 'bordered',
    placeholder: 'Filter by name...',
    icon: <SearchIcon />
  },
  decorators: [withTheme('light')]
};

export const BorderedDark: Story = {
  args: {
    variant: 'bordered',
    placeholder: 'Filter by name...',
    icon: <SearchIcon />
  },
  decorators: [withTheme('dark')]
};

export const UnderlinedLight: Story = {
  args: {
    variant: 'underlined',
    placeholder: 'Enter name'
  },
  decorators: [
    withTheme('light'),
    (Story) => (
      <div
        style={{
          width: '24rem',
          fontSize: '2rem',
          color: 'var(--color-text-heading)'
        }}
      >
        <Story />
      </div>
    )
  ]
};

export const UnderlinedDark: Story = {
  args: {
    variant: 'underlined',
    placeholder: 'Enter name'
  },
  decorators: [
    withTheme('dark'),
    (Story) => (
      <div
        style={{
          width: '24rem',
          fontSize: '2rem',
          color: 'var(--color-text-heading)'
        }}
      >
        <Story />
      </div>
    )
  ]
};
