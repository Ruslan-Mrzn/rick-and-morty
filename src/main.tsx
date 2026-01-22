import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router';

import { App } from '@/shared/components';

import './global.scss';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
