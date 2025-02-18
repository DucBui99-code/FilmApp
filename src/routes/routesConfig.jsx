import React from 'react';

const HomePage = React.lazy(() => import('../pages/Home'));
const WatchMoviePage = React.lazy(() => import('../pages/WatchMovie'));
const FilmPackage = React.lazy(() => import('../pages/DetailMovie'));
const TelevisionPage = React.lazy(() => import('../pages/TeleVisionPage'));
const PaymentPage = React.lazy(() => import('../pages/Payment/PaymentPage'));
const ResetPassowordPage = React.lazy(() => import('../pages/ResetPassoword'));
const AccountPage = React.lazy(() => import('../pages/account/Account'));

const routesConfig = {
  public: [
    { path: '/', element: HomePage, props: { type: '' } },
    { path: '/mien-phi', element: HomePage, props: { type: '' } },
    { path: '/xem-phim-mien-phi/:name', element: WatchMoviePage },
    { path: '/phim-goi', element: HomePage, props: { type: 'movieRent' } },
    { path: '/truyen-hinh', element: TelevisionPage },
    { path: '/thanh-toan', element: PaymentPage },
    { path: '/auth/newPassword/:code', element: ResetPassowordPage },
    { path: '/xem-phim-goi/:name', element: FilmPackage },
  ],
  private: [{ path: '/tai-khoan', element: AccountPage }],
};

export default routesConfig;
