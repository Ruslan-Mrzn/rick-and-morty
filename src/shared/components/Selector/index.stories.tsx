import { type ComponentType, useState } from 'react';

import { withTheme } from '@sb/decorators';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { StatusOptionLabel } from '@/shared/components/OptionLabel';
import { statusOptionsWithAll } from '@/shared/helpers';
import type { TStatus } from '@/shared/types';

import Selector, { type TSelectorProps } from './index';

type TStatusOption = TStatus | 'all';

const SelectorStory = (args: TSelectorProps<TStatusOption>) => {
  const [value, setValue] = useState<TStatus | undefined>(
    args.value === 'all' ? undefined : args.value
  );

  return (
    <Selector
      {...args}
      value={value}
      onChange={(option) => {
        setValue(option === 'all' ? undefined : option);
      }}
    />
  );
};

const meta = {
  title: 'Shared/Selector',
  component: Selector,
  render: (args) => <SelectorStory {...args} />,
  args: {
    options: statusOptionsWithAll,
    value: undefined,
    placeholder: 'Status',
    OptionComponent: StatusOptionLabel as ComponentType<{
      option: TStatusOption;
    }>,
    onChange: fn()
  } satisfies TSelectorProps<TStatusOption>
} satisfies Meta<TSelectorProps<TStatusOption>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  decorators: [withTheme('light')]
};

export const Dark: Story = {
  decorators: [withTheme('dark')]
};
