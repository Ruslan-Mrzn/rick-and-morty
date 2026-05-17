import { createRoot } from 'react-dom/client';

import { Root } from '@/app';
import '@/stores/theme.store';
import '@/styles/global.scss';

createRoot(document.getElementById('root')!).render(<Root />);
