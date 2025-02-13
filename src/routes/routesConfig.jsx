import React from 'react';
import Account from '../pages/account/Account';
import DetailMovie from '../pages/DetailMovie';
const HomePage = React.lazy(() => import('../pages/Home'));
const WatchMoviePage = React.lazy(() => import('../pages/WatchMovie'));
const FilmPackage = React.lazy(() => import('../pages/FilmPackage'));
const Television = React.lazy(() => import('../pages/Television'));
const Profile = React.lazy(() => import('../pages/Profile'));
const PaymentPage = React.lazy(() => import('../pages/Payment/PaymentPage'));

const routesConfig = {
  public: [
    { path: '/', element: HomePage, props: { type: '' } },
    { path: '/mien-phi', element: HomePage, props: { type: '' } },
    { path: '/watch/:name', element: WatchMoviePage },
    { path: '/phim-goi', element: HomePage, props: { type: 'movieRent' } },
    { path: '/truyen-hinh', element: Television },
    { path: '/thanh-toan', element: PaymentPage },
    { path: '/tai-khoan', element: Account },
    { path: '/phim/:slug', element: DetailMovie },
  ],
  private: [{ path: 'auth/profile', element: Profile }],
};

export default routesConfig;
