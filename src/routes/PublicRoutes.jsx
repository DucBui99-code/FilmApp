import React from "react";
import { Outlet } from "react-router";
import { Footer, Header } from "../components";

const PublicRoutes = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicRoutes;
