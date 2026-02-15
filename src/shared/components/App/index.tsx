import { Route, Routes } from 'react-router';

import { CharacterPage, HomePage } from '@/pages';
import { ErrorBoundary } from '@/shared/components';
import { MainLayout } from '@/shared/components';

import './App.module.scss';

const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<MainLayout customClassName='wrapper' />}>
          <Route
            path='/'
            element={<HomePage />}
          />
          <Route
            path='/character'
            element={<CharacterPage />}
          />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
