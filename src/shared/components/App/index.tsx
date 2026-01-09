import { Route, Routes } from 'react-router';

import { CharacterPage, HomePage } from '@/pages';
import { MainLayout } from '@/shared/components';

import './App.module.scss';

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
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
  );
};

export default App;
