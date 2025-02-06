import React from 'react';
import FilmPackage from '../pages/FilmPackage';
import Television from '../pages/Television';
import PaymentPage from '../pages/Payment/PaymentPage';
const HomePage = React.lazy(() => import('../pages/Home'));
const WatchMoviePage = React.lazy(() => import('../pages/WatchMovie'));

const routesConfig = {
  public: [
    { path: '/', element: HomePage },
    { path: '/mien-phi', element: HomePage },
    { path: '/watch/:name', element: WatchMoviePage },
    { path: '/phim-goi', element: FilmPackage },
    { path: '/truyen-hinh', element: Television },
    { path: '/thanh-toan', element: PaymentPage },
  ],
};

export default routesConfig;
