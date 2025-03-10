import React from 'react';
import {
  IconButton,
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
  Badge,
} from '@material-tailwind/react';
import { BellAlertIcon } from '@heroicons/react/16/solid';
import { formatDistanceToNow } from 'date-fns';
import vi from 'date-fns/locale/vi';
import Empty from '../../assets/man.png';

function NotificationPopup() {
  return (
    <Popover placement="bottom">
      <Badge content="2">
        <PopoverHandler>
          <IconButton>
            <BellAlertIcon className="w-6 text-white hover:text-primary transition-colors"></BellAlertIcon>
          </IconButton>
        </PopoverHandler>
      </Badge>
      <PopoverContent className="w-[600px] min-h-96 bg-gray-800 border-black z-40">
        <Typography variant="h4" color="white" className="mb-6">
          Thông báo
        </Typography>
        <span>
          {formatDistanceToNow(new Date('2025-02-26T08:48:53.362+00:00'), {
            addSuffix: true,
            locale: vi,
          })}
        </span>
        <div className="flex items-center justify-center">
          <img src={Empty} alt="Empty" className="w-40"></img>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default NotificationPopup;
