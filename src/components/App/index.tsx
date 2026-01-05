import './App.css';
import { Routes, Route } from 'react-router';
import MainLayout from '../MainLayout';
import { HomePage, CharacterPage } from '@/pages';

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
