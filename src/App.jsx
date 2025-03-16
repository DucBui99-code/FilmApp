import { useDispatch, useSelector } from 'react-redux';
import { AlertProvider } from './components/Message/AlertContext';
import AlertCustom from './components/Message/AlertCustom';
import AppRouter from './routes/AppRotutes';
import {
  fetchUserProfile,
  fetchNotificationCount,
  addCountNoti,
} from './store/authSlice';
import { useEffect } from 'react';
import useBillChecker from './hooks/useBillChecker';
import NotificationPopup from './components/Notification/NotificationPopup';
import './styles/App.css';
import socketClient from './services/socketClient';

function App() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);

  // Call check bill interval
  useBillChecker();

  useEffect(() => {
    if (isLogin) {
      dispatch(fetchUserProfile());
      dispatch(fetchNotificationCount());
    }
    socketClient.on('receiveNotification', (data) => {
      dispatch(addCountNoti());
    });
    return () => {
      socketClient.off('receiveNotification');
    };
  }, [isLogin]);

  return (
    <div className="bg-black custom-scrollbar">
      <AlertProvider>
        <AlertCustom />
        <NotificationPopup></NotificationPopup>
        <AppRouter></AppRouter>
      </AlertProvider>
    </div>
  );
}

export default App;
