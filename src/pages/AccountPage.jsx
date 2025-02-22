import React, { useEffect, useState } from 'react';
import '../components/Account/account.css';
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
import AccountTab from '../components/Account/AccountTab';
import PaymentTab from '../components/Account//PaymentTab';
import PackageTab from '../components/Account//PackageTab';
import FavoriteTab from '../components/Account//FavoriteTab';
import RentFilmTab from '../components/Account//RentFilmTab';
import ManagementDeviceTab from '../components/Account//ManagementDeviceTab';
import UserServices from '../services/userServices';
import { useAlert } from '../components/Message/AlertContext';

export default function Account() {
  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState({}); // Lưu dữ liệu từng tab
  const { showAlert } = useAlert();

  const tabConfigs = [
    {
      label: 'Tài khoản',
      component: AccountTab,
      icon: <UserCircleIcon className="w-5 h-5 mr-1" />,
      defaultData: {},
    },
    {
      label: 'Thanh toán',
      component: PaymentTab,
      icon: <CreditCardIcon className="w-5 h-5 mr-1" />,
      defaultData: [],
    },
    {
      label: 'Gói đã mua',
      component: PackageTab,
      icon: <FilmIcon className="w-5 h-5 mr-1" />,
      defaultData: [],
    },
    {
      label: 'Phim yêu thích',
      component: FavoriteTab,
      icon: <HeartIcon className="w-5 h-5 mr-1" />,
      defaultData: [],
    },
    {
      label: 'Phim đang thuê',
      component: RentFilmTab,
      icon: <VideoCameraIcon className="w-5 h-5 mr-1" />,
      defaultData: [],
    },
    {
      label: 'Quản lý thiết bị',
      component: ManagementDeviceTab,
      icon: <DeviceTabletIcon className="w-5 h-5 mr-1" />,
      defaultData: [],
    },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resData = await UserServices.getProfile(activeTab);

        setProfileData((prev) => ({
          ...prev,
          [activeTab]: resData.data, // Lưu dữ liệu riêng cho từng tab
        }));
      } catch (error) {
        showAlert(error.response?.data?.message, 'error');
      }
    };

    fetchProfile();
  }, [activeTab]);

  return (
    <div className="mx-auto w-full max-w-7xl px-2">
      <Tabs value={activeTab} className="relative z-10">
        <TabsHeader
          className="rounded-none bg-transparent p-0 py-4 ml-5 mt-[20px]"
          indicatorProps={{
            className:
              'bg-transparent border-b-2 border-primary shadow-none rounded-none',
          }}
        >
          {tabConfigs.map(({ label, icon }, index) => (
            <Tab
              key={index}
              value={index}
              activeClassName="text-white duration-100"
              onClick={() => setActiveTab(index)}
              className="w-full font-bold tab-header-custom"
            >
              <div className="flex w-full justify-center items-center pb-[10px]">
                {icon}
                <p className="hidden md:block">{label}</p>
              </div>
            </Tab>
          ))}
        </TabsHeader>

        <TabsBody>
          {tabConfigs.map(({ component: Component, defaultData }, index) => (
            <TabPanel key={index} value={index}>
              <Component data={profileData[index] || defaultData} />
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
