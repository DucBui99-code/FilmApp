import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routesConfig from './routesConfig';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import LoadingOverlay from '../components/Loading/LoadingOverlay';

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingOverlay />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoutes />}>
            {routesConfig.public.map(
              ({ path, element: Component, props }, index) => (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<LoadingOverlay />}>
                      <Component {...props} />
                    </Suspense>
                  }
                />
              )
            )}
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
            {routesConfig.private.map(({ path, element: Component }, index) => (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<LoadingOverlay />}>
                    <Component />
                  </Suspense>
                }
              />
            ))}
          </Route>

          {/* Route 404 */}
          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
