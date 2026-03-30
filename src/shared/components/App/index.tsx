import { Route, Routes } from 'react-router';

import { CharacterPage, HomePage, NotFoundPage } from '@/pages';
import { ErrorBoundary, MainLayout } from '@/shared/components';

import './App.module.scss';

const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<MainLayout className='wrapper' />}>
          <Route
            path='/'
            element={<HomePage />}
          />
          <Route
            path='/character/:id'
            element={<CharacterPage />}
          />
          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
