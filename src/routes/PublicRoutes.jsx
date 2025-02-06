import React from 'react';
import { Outlet } from 'react-router';
import { Footer, Header } from '../components';
import { useSelector } from 'react-redux';
import LoadingOverlay from '../components/Loading/LoadingOverlay';

const PublicRoutes = () => {
  const loading = useSelector((s) => s.app.loading);
  return (
    <>
      {loading && <LoadingOverlay />}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicRoutes;
