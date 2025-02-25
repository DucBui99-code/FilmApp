import { useDispatch, useSelector } from 'react-redux';
import { AlertProvider } from './components/Message/AlertContext';
import AlertCustom from './components/Message/AlertCustom';
import AppRouter from './routes/AppRotutes';
import { fetchUserProfile } from './store/authSlice';
import { useEffect } from 'react';
import useBillChecker from './hooks/useBillChecker';
import NotificationPopup from './components/Notification/NotificationPopup';
function App() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);

  // Call check bill interval
  useBillChecker();

  useEffect(() => {
    if (isLogin) {
      dispatch(fetchUserProfile());
    }
  }, [isLogin]);

  return (
    <div className="bg-black">
      <AlertProvider>
        <AlertCustom />
        <NotificationPopup></NotificationPopup>
        <AppRouter></AppRouter>
      </AlertProvider>
    </div>
  );
}

export default App;
