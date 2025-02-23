import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkBillStatus } from '../store/authSlice';

const useBillChecker = () => {
  const dispatch = useDispatch();
  const { pendingBills } = useSelector((state) => state.auth);

  useEffect(() => {
    let interval;
    const checkAllBills = () => {
      pendingBills.forEach((billId) => dispatch(checkBillStatus(billId)));
    };

    if (pendingBills.length > 0) {
      interval = setInterval(checkAllBills, 3000);
    }

    return () => clearInterval(interval);
  }, [pendingBills, dispatch]);
};

export default useBillChecker;
