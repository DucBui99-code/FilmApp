// AlertCustom.js
import React, { useEffect, useState } from 'react';
import { Alert } from '@material-tailwind/react';
import { useAlert } from './AlertContext'; // Import useAlert hook
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/16/solid';

const AlertCustom = () => {
  const alertStyles = {
    info: 'border-[#2196f3] bg-[#e3f2fd] text-[#2196f3]',
    success: 'border-[#2ec946] bg-[#eaf9ec] text-[#2ec946]',
    error: 'border-[#f44336] bg-[#ffebee] text-[#f44336]',
    warning: 'border-[#ff9800] bg-[#fff3e0] text-[#ff9800]',
  };

  const iconStyles = {
    info: (
      <InformationCircleIcon
        fill="currentColor"
        className="h-6 w-6"
      ></InformationCircleIcon>
    ),
    success: (
      <CheckCircleIcon
        fill="currentColor"
        className="h-6 w-6"
      ></CheckCircleIcon>
    ),
    error: (
      <ExclamationTriangleIcon
        fill="currentColor"
        className="h-6 w-6"
      ></ExclamationTriangleIcon>
    ),
    warning: (
      <ShieldExclamationIcon
        fill="currentColor"
        className="h-6 w-6"
      ></ShieldExclamationIcon>
    ),
  };

  const { alerts } = useAlert();
  const [visibleAlerts, setVisibleAlerts] = useState(alerts);

  useEffect(() => {
    setVisibleAlerts(alerts);
  }, [alerts]);

  useEffect(() => {
    if (visibleAlerts.length > 0) {
      const timeout = setTimeout(() => {
        setVisibleAlerts((prevAlerts) => prevAlerts.slice(1)); // Xóa thông báo đầu tiên sau 3 giây
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [visibleAlerts]);

  return (
    <div className="fixed top-5 right-5 z-[99999]">
      {visibleAlerts.map((alert) => {
        return (
          <Alert
            key={alert.id}
            animate={{
              mount: { y: 0 },
              unmount: { y: 100 },
            }}
            icon={iconStyles[alert.type] || iconStyles['info']}
            className={`rounded-none font-medium mb-[4px] ${
              alertStyles[alert.type] || alertStyles['info']
            } border-l-4`}
          >
            {alert.message}
          </Alert>
        );
      })}
    </div>
  );
};

export default AlertCustom;
