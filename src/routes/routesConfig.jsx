import React from 'react';
import FilmPackage from '../pages/FilmPackage';
import Television from '../pages/Television';
import PaymentPage from '../pages/Payment/PaymentPage';
const HomePage = React.lazy(() => import('../pages/Home'));
const WatchMoviePage = React.lazy(() => import('../pages/WatchMovie'));
const FilmPackage = React.lazy(() => import('../pages/FilmPackage'));
const Television = React.lazy(() => import('../pages/Television'));
const Profile = React.lazy(() => import('../pages/Profile'));

const routesConfig = {
  public: [
    { path: '/', element: HomePage },
    { path: '/mien-phi', element: HomePage },
    { path: '/watch/:name', element: WatchMoviePage },
    { path: '/phim-goi', element: FilmPackage },
    { path: '/truyen-hinh', element: Television },
    { path: '/thanh-toan', element: PaymentPage },
  ],
  private: [{ path: 'auth/profile', element: Profile }],
};

export default routesConfig;
