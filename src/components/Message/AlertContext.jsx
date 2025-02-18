import React, { createContext, useState, useContext } from 'react';

const AlertContext = createContext();

export function useAlert() {
  return useContext(AlertContext);
}
const ALERT_TYPES = ['success', 'error', 'warning', 'info'];

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]); // Lưu trữ mảng các thông báo

  const clearAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  const showAlert = (message, type) => {
    if (!ALERT_TYPES.includes(type)) {
      console.error(`AlertType không hợp lệ: ${type}`);
      return;
    }
    const newAlert = { id: Date.now(), message, type }; // Tạo thông báo mới với id duy nhất
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

    setTimeout(() => {
      setAlerts((prevAlerts) =>
        prevAlerts.filter((alert) => alert.id !== newAlert.id)
      );
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ alerts, showAlert, clearAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
