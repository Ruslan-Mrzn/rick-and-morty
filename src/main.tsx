import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router';

import RouterWrapper from '@/shared/components/RouterWrapper';

import './global.scss';

const basename = import.meta.env.PROD ? '/rick-and-morty' : '/';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={basename}>
    <RouterWrapper />
  </BrowserRouter>
);
