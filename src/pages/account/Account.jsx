import React from 'react';
import '../account/account.css';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import { UserCircleIcon } from '@heroicons/react/16/solid';
import {
  CreditCardIcon,
  DeviceTabletIcon,
  FilmIcon,
  HeartIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/solid';
import AccountTab from './tabAccount/AccountTab';
import PaymentTab from './tabAccount/PaymentTab';
import PackageTab from './tabAccount/PackageTab';
import FavoriteTab from './tabAccount/FavoriteTab';
import RentFilmTab from './tabAccount/RentFilmTab';
import ManagementDeviceTab from './tabAccount/ManagementDeviceTab';

export default function Account() {
  const [activeTab, setActiveTab] = React.useState('account');
  const data = [
    {
      label: 'Tài khoản',
      value: 'account',
      icon: <UserCircleIcon className="w-5 h-5 mr-1" />,
      content: <AccountTab />,
    },
    {
      label: 'Thanh toán',
      value: 'payment',
      icon: <CreditCardIcon className="w-5 h-5 mr-1" />,
      content: <PaymentTab />,
    },
    {
      label: 'Gói đã mua',
      value: 'packageBuy',
      icon: <FilmIcon className="w-5 h-5 mr-1" />,
      content: <PackageTab />,
    },
    {
      label: 'Phim yêu thích',
      value: 'like',
      icon: <HeartIcon className="w-5 h-5 mr-1" />,
      content: <FavoriteTab />,
    },
    {
      label: 'Phim đang thuê',
      value: 'filmRent',
      icon: <VideoCameraIcon className="w-5 h-5 mr-1" />,
      content: <RentFilmTab />,
    },
    {
      label: 'Quản lý thiết bị',
      value: 'managementDevice',
      icon: <DeviceTabletIcon className="w-5 h-5 mr-1" />,
      content: <ManagementDeviceTab />,
    },
  ];
  return (
    <div className="mx-auto w-full max-w-7xl px-8">
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none bg-transparent p-0 py-4 mt-[20px]"
          indicatorProps={{
            className:
              'bg-transparent border-b-2 border-primary shadow-none rounded-none',
          }}
        >
          {data.map(({ label, value, icon, content }) => (
            <Tab
              key={value}
              value={value}
              activeClassName="text-white duration-100"
              onClick={() => setActiveTab(value)}
              className="w-full font-bold tab-header-custom"
            >
              <div className="flex w-full justify-center items-center pb-[10px]">
                {icon}
                <p className="">{label}</p>
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, content }) => (
            <TabPanel key={value} value={value}>
              {content}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
