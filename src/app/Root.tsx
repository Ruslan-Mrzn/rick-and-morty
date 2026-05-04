import { BrowserRouter } from 'react-router';

import { ReactQueryRootProvider } from './ReactQueryRootProvider';
import RouterWrapper from './RouterWrapper';

const basename = import.meta.env.VITE_BASE_PATH || '/';

export const Root = () => (
  <BrowserRouter basename={basename}>
    <ReactQueryRootProvider>
      <RouterWrapper />
    </ReactQueryRootProvider>
  </BrowserRouter>
);
