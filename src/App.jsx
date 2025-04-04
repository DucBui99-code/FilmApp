import { useDispatch, useSelector } from 'react-redux';
import { AlertProvider } from './components/Message/AlertContext';
import AlertCustom from './components/Message/AlertCustom';
import AppRouter from './routes/AppRotutes';
import {
  fetchUserProfile,
  fetchNotificationCount,
  addCountNoti,
} from './store/authSlice';
import { useEffect, startTransition } from 'react';
import NotificationPopup from './components/Notification/NotificationPopup';
import './styles/App.css';
import socketClient from './services/socketClient';
import { setPopup } from './store/appStore';

function App() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserProfile());
    if (isLogin) {
      startTransition(() => {
        dispatch(fetchNotificationCount());
      });
    }
    socketClient.on('receiveNotification', () => {
      startTransition(() => {
        dispatch(addCountNoti());
      });
    });
    socketClient.on('billUpdated', (data) => {
      startTransition(() => {
        dispatch(
          setPopup({
            isShow: true,
            packageName: data.packageName,
            status: data.status,
          })
        );
      });
    });
    return () => {
      socketClient.off('receiveNotification');
      socketClient.off('billUpdated');
    };
  }, [isLogin]);

  return (
    <div className="bg-black custom-scrollbar relative">
      <AlertProvider>
        <AlertCustom />
        <NotificationPopup></NotificationPopup>
        <AppRouter></AppRouter>
      </AlertProvider>
    </div>
  );
}

export default App;
