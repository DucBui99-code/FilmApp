import React from 'react';
import { MOVIE_TYPE } from '../config/constant';

const HomePage = React.lazy(() => import('../pages/Home'));
const WatchMoviePage = React.lazy(() => import('../pages/WatchMovie'));
const TelevisionPage = React.lazy(() => import('../pages/TeleVisionPage'));
const PaymentPage = React.lazy(() => import('../pages/PaymentPage'));
const ResetPassowordPage = React.lazy(() => import('../pages/ResetPassoword'));
const AccountPage = React.lazy(() => import('../pages/AccountPage'));
const SearchPage = React.lazy(() => import('../pages/SearchPage'));
const ResultMovie = React.lazy(() => import('../pages/ResultMovie'));

const routesConfig = {
  public: [
    { path: '/', element: HomePage, props: { type: '' } },
    { path: '/mien-phi', element: HomePage, props: { type: '' } },
    {
      path: '/xem-phim-mien-phi/:name',
      element: WatchMoviePage,
      props: { movieType: MOVIE_TYPE.movieFree },
    },
    {
      path: '/tim-kiem',
      element: SearchPage,
      props: { type: '' },
    },
    {
      path: '/quoc-gia/:country',
      element: ResultMovie,
      props: { type: 'country' },
    },
    {
      path: '/chu-de/:category',
      element: ResultMovie,
      props: { type: 'category' },
    },
    {
      path: '/phim-le',
      element: ResultMovie,
      props: { type: 'single' },
    },
    {
      path: '/phim-bo',
      element: ResultMovie,
      props: { type: 'series' },
    },
    { path: '/phim-goi', element: HomePage, props: { type: 'movieRent' } },
    { path: '/truyen-hinh', element: TelevisionPage, props: { type: '' } },
    {
      path: '/thanh-toan/:movieId?',
      element: PaymentPage,
      props: { type: '' },
    },
    {
      path: '/auth/newPassword/:code',
      element: ResetPassowordPage,
      props: { type: '' },
    },
    {
      path: '/xem-phim-goi/:name',
      element: WatchMoviePage,
      props: { movieType: MOVIE_TYPE.movieRent },
    },
  ],
  private: [{ path: '/tai-khoan', element: AccountPage, props: { type: '' } }],
};

export default routesConfig;
