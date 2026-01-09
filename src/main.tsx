import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './global.scss';
import { App } from '@/shared/components';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
