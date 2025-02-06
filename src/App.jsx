import { useDispatch, useSelector } from 'react-redux';
import { AlertProvider } from './components/Message/AlertContext';
import AlertCustom from './components/Message/AlertCustom';
import AppRouter from './routes/AppRotutes';
import { fetchUserProfile } from './store/authSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLogin) {
      dispatch(fetchUserProfile());
    }
  }, [isLogin]);

  return (
    <div className="bg-black">
      <AlertProvider>
        <AlertCustom />
        <AppRouter></AppRouter>
      </AlertProvider>
    </div>
  );
}

export default App;
