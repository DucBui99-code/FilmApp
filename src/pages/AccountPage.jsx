import React, { useEffect, useState, startTransition } from 'react';
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
import getErrorMessage from '../utils/handelMessageError';
import {
  FullPageSkeleton,
  TabSkeleton,
} from '../components/Account/SkeletonTab';
import { Suspense } from 'react';

const Account = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState({});
  const [loadingTabs, setLoadingTabs] = useState({});
  const { showAlert } = useAlert();

  const tabConfigs = [
    {
      label: 'Thông tin cá nhân',
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
      label: 'Gói cước',
      component: PackageTab,
      icon: <FilmIcon className="w-5 h-5 mr-1" />,
      defaultData: [],
    },
    {
      label: 'Yêu thích',
      component: FavoriteTab,
      icon: <HeartIcon className="w-5 h-5 mr-1" />,
      defaultData: [],
    },
    {
      label: 'Phim đã thuê',
      component: RentFilmTab,
      icon: <VideoCameraIcon className="w-5 h-5 mr-1" />,
      defaultData: [],
    },
    {
      label: 'Thiết bị',
      component: ManagementDeviceTab,
      icon: <DeviceTabletIcon className="w-5 h-5 mr-1" />,
      defaultData: [],
    },
  ];

  useEffect(() => {
    let ignore = false;

    const fetchInitialData = async () => {
      // Chỉ gọi API nếu dữ liệu chưa có
      if (!profileData[activeTab]) {
        try {
          setLoadingTabs((prev) => ({ ...prev, [activeTab]: true })); // Bật loading
          const resData = await UserServices.getProfile(activeTab);

          if (!ignore) {
            startTransition(() => {
              setProfileData((prev) => ({
                ...prev,
                [activeTab]: resData.data, // Lưu dữ liệu của từng tab
              }));
              setLoadingTabs((prev) => ({ ...prev, [activeTab]: false })); // Tắt loading
            });
          }
        } catch (error) {
          if (!ignore) showAlert(getErrorMessage(error), 'error');
        }
      }
    };

    fetchInitialData();

    return () => {
      ignore = true;
    };
  }, [activeTab]); // Chỉ chạy khi `activeTab` thay đổi

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
        <TabsBody className="min-h-[450px]">
          {/* Loading chung khi init */}
          <Suspense fallback={<FullPageSkeleton />}>
            {tabConfigs.map(({ component: Component, defaultData }, index) => (
              <TabPanel key={index} value={index}>
                {/* Loading riêng cho mỗi tab */}
                <Suspense fallback={<TabSkeleton />}>
                  {loadingTabs[index] ? (
                    <TabSkeleton />
                  ) : (
                    <Component
                      data={profileData[index] || defaultData}
                      numberTab={activeTab}
                    />
                  )}
                </Suspense>
              </TabPanel>
            ))}
          </Suspense>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default Account;
