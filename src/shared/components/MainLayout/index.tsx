import { Outlet } from 'react-router';
const MainLayout = () => {
  return (
    <>
      <div>main layout</div>
      <Outlet />
    </>
  );
};

export default MainLayout;
