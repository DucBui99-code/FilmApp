import { useEffect, useState } from 'react';
import {
  Button,
  Collapse,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
} from '@material-tailwind/react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router';

import Logo from '../../assets/logo.png';
import ActionBarMobile from './ActionBarMobile';
import NotificationPopup from './NotificationPopup';
import { setLoadingAsync } from '../../store/appStore';
import ActionBarPC from './ActionBarPC';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

function Header() {
  const ListMenu = [
    { name: 'Miễn phí', router: '/mien-phi' },
    { name: 'Phim Gói', router: '/phim-goi' },
    {
      name: 'Quốc gia',
      withIcon: <ChevronDownIcon className="h-4 w-4 ml-1" />,
      children: [
        {
          name: 'Trung Quốc',
          router: '/trung-quoc',
        },
        {
          name: 'Anh',
          router: '/anh',
        },
        {
          name: 'Đức',
          router: '/duc',
        },
        {
          name: 'Hàn Quốc',
          router: '/han-quoc',
        },
        {
          name: 'Nhật Bản',
          router: '/nhat-ban',
        },
      ],
    },
    { name: 'Truyền Hình', router: '/truyen-hinh' },
  ];

  const [openNav, setOpenNav] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubscribePackage = () => {
    navigate('/thanh-toan');
  };

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 mt-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {ListMenu.map((el, i) => (
        <Typography
          as="li"
          variant="small"
          color="white"
          className="p-1 font-bold text-[17px] relative group"
          key={i}
        >
          {el.children ? (
            <Menu placement="bottom-start">
              <MenuHandler>
                <div className="flex items-center">
                  <span
                    className={`hover:text-primary transition-colors cursor-pointer ${
                      location.pathname.includes(el.router)
                        ? 'text-primary'
                        : ''
                    }`}
                  >
                    {el.name}
                  </span>
                  {el.withIcon && <span className="ml-1">{el.withIcon}</span>}
                </div>
              </MenuHandler>
              <MenuList className="bg-black border-gray-800">
                {el.children.map((child, childIndex) => (
                  <Link
                    to={`/quoc-gia${child.router}`}
                    onClick={() => {
                      dispatch(setLoadingAsync(true));
                    }}
                    className="hover:bg-gray-900 text-white"
                    key={childIndex}
                  >
                    <MenuItem>{child.name}</MenuItem>
                  </Link>
                ))}
              </MenuList>
            </Menu>
          ) : (
            <Link
              to={el.router}
              onClick={() => dispatch(setLoadingAsync(true))}
              className={`hover:text-primary transition-colors ${
                location.pathname.includes(el.router) ? 'text-primary' : ''
              }`}
            >
              {el.name}
            </Link>
          )}
        </Typography>
      ))}
    </ul>
  );
  return (
    <div className="w-full bg-black sticky top-0 z-20">
      <Navbar className="h-max max-w-full rounded-none px-4 py-3 lg:px-8 lg:py-4 bg-black border-none">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center justify-center gap-5">
            <Link to="/">
              <img
                src={Logo}
                srcSet={Logo}
                alt="Logo"
                className="w-24 -ml-3"
                loading="lazy"
              ></img>
            </Link>
            <div className="mr-4 hidden lg:block">{navList}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center gap-4">
              <NotificationPopup
                openNoti={openNoti}
                setOpenNoti={setOpenNoti}
              ></NotificationPopup>
              <Button className="bg-primary" onClick={handleSubscribePackage}>
                Đăng ký gói
              </Button>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="white"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
            <ActionBarPC></ActionBarPC>
          </div>
        </div>
        <Collapse open={openNav} className="pt-1 w-full">
          {navList}
          <ActionBarMobile></ActionBarMobile>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
