import { useEffect } from 'react';

import { useNavigate } from 'react-router';

import { App } from '@/shared/components';

const basename = import.meta.env.VITE_BASE_PATH || '/';

const RouterWrapper = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirectPath');

    if (redirectPath) {
      sessionStorage.removeItem('redirectPath');

      const pathWithoutBase = redirectPath.replace(basename, '') || '/';

      navigate(pathWithoutBase, { replace: true });
    }
  }, [navigate]);

  return <App />;
};

export default RouterWrapper;
