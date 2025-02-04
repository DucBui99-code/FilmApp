// AlertCustom.js
import React, { useEffect, useState } from 'react';
import { Alert } from '@material-tailwind/react';
import { useAlert } from './AlertContext'; // Import useAlert hook

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}
const AlertCustom = () => {
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
    <div className="absolute top-5 right-5 z-50">
      {visibleAlerts.map((alert) => (
        <Alert
          key={alert.id}
          icon={<Icon />}
          className="rounded-none border-l-4 border-[#2ec946] bg-[#eaf9ec] font-medium text-[#2ec946] mb-[4px]"
        >
          {alert.message}
        </Alert>
      ))}
    </div>
  );
};

export default AlertCustom;
