// AlertCustom.js
import React, { useEffect, useState } from "react";
import { Alert } from "@material-tailwind/react";
import { useAlert } from "./AlertContext"; // Import useAlert hook

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
          color="green"
          onClose={() => {}}
          className="mb-2 transition-opacity duration-500 opacity-100 transform hover:scale-105"
        >
          {alert.message}
        </Alert>
      ))}
    </div>
  );
};

export default AlertCustom;
