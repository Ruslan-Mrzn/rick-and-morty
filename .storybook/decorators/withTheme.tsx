import { useLayoutEffect } from 'react';

import type { Decorator } from '@storybook/react-vite';

type TTheme = 'light' | 'dark';

export const withTheme =
  (theme: TTheme): Decorator =>
  (Story) => {
    const ThemeWrapper = () => {
      useLayoutEffect(() => {
        document.documentElement.dataset.theme = theme;
      }, []);

      return <Story />;
    };

    return <ThemeWrapper />;
  };
