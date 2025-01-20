import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import routesConfig from "./routesConfig";
import PublicRoutes from "./PublicRoutes";

const AppRouter = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicRoutes />}>
        {routesConfig.public.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}
      </Route>

      {/* Private Routes */}
      {/* <Route path="/dashboard" element={<PrivateRoutes />}>
        {routesConfig.private.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}
      </Route> */}

      {/* Route 404 */}
      {/* <Route path="*" element={<h1>404 - Not Found</h1>} /> */}
    </Routes>
  </Router>
);

export default AppRouter;
