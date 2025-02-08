import React, { createContext, useState, useContext } from 'react';

const AlertContext = createContext();

export function useAlert() {
  return useContext(AlertContext);
}

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]); // Lưu trữ mảng các thông báo

  const showAlert = (message, type) => {
    const newAlert = { id: Date.now(), message, type }; // Tạo thông báo mới với id duy nhất
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

    // Tắt thông báo sau 3 giây
    setTimeout(() => {
      setAlerts((prevAlerts) =>
        prevAlerts.filter((alert) => alert.id !== newAlert.id)
      );
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ alerts, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
