import React, { Suspense } from 'react';
import Headder from '../Home/Headder';
import { Outlet } from 'react-router-dom';
const Layout = () => {
  return (
    <>
      <Headder />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
