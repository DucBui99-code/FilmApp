import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import { PowerIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { LINK_AVATAR_DEFAULT } from '../../config/constant';
import { useAlert } from '../Message/AlertContext';
import getErrorMessage from '../../utils/handelMessageError';
import AuthServices from '../../services/authServices';

// profile menu component
const profileMenuItems = [
  {
    label: 'Tài khoản',
    icon: UserCircleIcon,
    action: 'account',
  },
  {
    label: 'Đăng xuất',
    icon: PowerIcon,
    action: 'logout',
  },
];

function AvatarCustom({ src, email }) {
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const firstLetter = email ? email.charAt(0).toUpperCase() : '?';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = async (action) => {
    switch (action) {
      case 'account':
        navigate('tai-khoan');
        break;
      case 'logout':
        try {
          await AuthServices.logoutAccount();
          showAlert('Đăng xuất thành công', 'success');
        } catch (error) {
          showAlert(getErrorMessage(error.message), 'error');
        }
        dispatch(logout());
        break;
      default:
        break;
    }
    setIsMenuOpen(false);
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0"
        >
          {src ? (
            <Avatar
              size="sm"
              alt="avatar"
              src={src || LINK_AVATAR_DEFAULT}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = LINK_AVATAR_DEFAULT;
              }}
              className="shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
            />
          ) : (
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white text-lg font-bold border border-green-700">
              {firstLetter}
            </div>
          )}
        </Button>
      </MenuHandler>
      <MenuList className="p-0 bg-[#222222] border-opacity-30 min-w-[120px] px-[10px]">
        {profileMenuItems.map(({ label, icon, action }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <div key={key}>
              {isLastItem && (
                <div className="h-[1px] w-full bg-primary opacity-20"></div>
              )}
              <MenuItem
                key={key}
                onClick={() => closeMenu(action)}
                className={`flex items-center justify-center gap-2 bg-transparent rounded font-bold !text-white hover:bg-[#333] active:bg-[#222] focus:bg-[#222] my-[4px] p-0 py-[6px] px-[10px] ${
                  isLastItem
                    ? 'border-t-2 hover:bg-primary active:bg-primary focus:bg-primary border-primary border text-primary hover:text-white focus:text-white active:text-white duration-200'
                    : ''
                } `}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4`,
                  strokeWidth: 2,
                })}
                <Typography as="span" variant="small" className="font-bold">
                  {label}
                </Typography>
              </MenuItem>
            </div>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default AvatarCustom;
