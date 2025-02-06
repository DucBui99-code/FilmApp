import React from 'react';
import { Footer, Header } from '../components';
import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';

function PrivateRoutes() {
  const isLogin = useSelector((state) => state.auth.isLogin);

  return isLogin ? (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ) : (
    <Navigate to={'/'}></Navigate>
  );
}

export default PrivateRoutes;
