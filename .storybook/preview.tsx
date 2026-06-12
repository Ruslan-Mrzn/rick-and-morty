import '@sb/i18n';
import type { Preview } from '@storybook/react-vite';

import '@/styles/global.scss';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
