import React from 'react';
import { MOVIE_TYPE } from '../config/constant';

const HomePage = React.lazy(() => import('../pages/Home'));
const WatchMoviePage = React.lazy(() => import('../pages/WatchMovie'));
const TelevisionPage = React.lazy(() => import('../pages/TeleVisionPage'));
const PaymentPage = React.lazy(() => import('../pages/PaymentPage'));
const ResetPassowordPage = React.lazy(() => import('../pages/ResetPassoword'));
const AccountPage = React.lazy(() => import('../pages/AccountPage'));

const routesConfig = {
  public: [
    { path: '/', element: HomePage, props: { type: '' } },
    { path: '/mien-phi', element: HomePage, props: { type: '' } },
    {
      path: '/xem-phim-mien-phi/:name',
      element: WatchMoviePage,
      props: { movieType: MOVIE_TYPE.movieFree },
    },
    { path: '/phim-goi', element: HomePage, props: { type: 'movieRent' } },
    { path: '/truyen-hinh', element: TelevisionPage },
    { path: '/thanh-toan/:movieId?', element: PaymentPage },
    { path: '/auth/newPassword/:code', element: ResetPassowordPage },
    {
      path: '/xem-phim-goi/:name',
      element: WatchMoviePage,
      props: { movieType: MOVIE_TYPE.movieRent },
    },
  ],
  private: [{ path: '/tai-khoan', element: AccountPage }],
};

export default routesConfig;
