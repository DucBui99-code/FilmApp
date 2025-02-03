import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { Footer, Header } from "../components";
import { useSelector } from "react-redux";
import LoadingOverlay from "../components/Loading/LoadingOverlay";
import AlertCustom from "../components/Message/AlertCustom";
import { AlertProvider } from "../components/Message/AlertContext";
const PublicRoutes = () => {
  const loading = useSelector((s) => s.app.loading);
  return (
    <>
      <AlertProvider>
        <AlertCustom />
        {loading && <LoadingOverlay />}
        <Header />
        <Outlet />
        <Footer />
      </AlertProvider>
    </>
  );
};

export default PublicRoutes;
