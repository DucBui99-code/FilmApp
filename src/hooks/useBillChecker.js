import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkBillStatus } from '../store/authSlice';
import { TIME_CALL_CHECK_BILL } from '../config/constant';

const useBillChecker = () => {
  const dispatch = useDispatch();
  const { pendingBills } = useSelector((state) => state.auth);

  useEffect(() => {
    let interval;
    const checkAllBills = () => {
      pendingBills.forEach((billId) => dispatch(checkBillStatus(billId)));
    };

    if (pendingBills.length > 0) {
      interval = setInterval(checkAllBills, TIME_CALL_CHECK_BILL);
    }

    return () => clearInterval(interval);
  }, [pendingBills, dispatch]);
};

export default useBillChecker;
