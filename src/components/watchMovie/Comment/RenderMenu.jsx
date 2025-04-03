import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import React from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';
const RenderMenu = ({
  data,
  isOwner,
  menuItemsSelf,
  menuItemsAnother,
  type = 'default',
  idReply = '',
}) => (
  <div className="self-start">
    <Menu placement="top">
      <MenuHandler>
        <IconButton variant="text">
          <EllipsisVerticalIcon className="w-5 text-white" />
        </IconButton>
      </MenuHandler>
      <MenuList className="bg-blue-gray-900 p-1 border-gray-600">
        {(isOwner ? menuItemsSelf : menuItemsAnother).map((el) => (
          <MenuItem
            key={el.id}
            className="flex items-center gap-2"
            onClick={() => el.action(data, type, idReply)}
          >
            {el.icon}
            {el.content}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  </div>
);

export default RenderMenu;
