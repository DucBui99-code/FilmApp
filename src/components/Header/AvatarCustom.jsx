import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import {
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import React, { useState } from 'react';

// profile menu component
const profileMenuItems = [
  {
    label: 'My Profile',
    icon: UserCircleIcon,
  },
  {
    label: 'Edit Profile',
    icon: Cog6ToothIcon,
  },
  {
    label: 'Sign Out',
    icon: PowerIcon,
  },
];

function AvatarCustom({ src, email }) {
  const firstLetter = email ? email.charAt(0).toUpperCase() : '?';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

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
              src={src}
              className="border border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
            />
          ) : (
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white text-lg font-bold border border-green-700">
              {firstLetter}
            </div>
          )}
        </Button>
      </MenuHandler>
      <MenuList className="p-1 bg-blue-gray-800">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                  : 'hover:bg-blue-gray-600D'
              } `}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${
                  isLastItem ? 'text-red-500' : 'text-white'
                } `,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? 'red' : 'white'}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default AvatarCustom;
