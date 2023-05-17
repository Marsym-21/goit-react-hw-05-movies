import React from 'react';
import Headder from '../Home/Headder';
import { Outlet } from 'react-router-dom';
const Layout = () => {
  return (
    <>
      <Headder />
      <Outlet />
    </>
  );
};

export default Layout;
