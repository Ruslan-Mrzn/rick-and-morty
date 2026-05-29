import { createRoot } from 'react-dom/client';

import { registerSW } from 'virtual:pwa-register';

import { Root } from '@/app';
import '@/shared/lib/i18n';
import '@/stores/theme.store';
import '@/styles/global.scss';

registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(<Root />);
