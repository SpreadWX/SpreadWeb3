import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './index.less';
import Header from '@/components/header/header';
import bg from '@/assets/imgs/bg.svg';
const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="main-container" style={{ backgroundImage: `url(${bg}) no-repeat top center` }}>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
