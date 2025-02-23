import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import PayImage from '../../assets/mobile-payment.png';
import { Link } from 'react-router';
import movieServices from '../../services/movieServices';
import { useAlert } from '../Message/AlertContext';
const PaymentConfirm = ({ setStep, inforTransaction }) => {
  const { showAlert } = useAlert();
  const handelCancelTransaction = async () => {
    try {
      const res = await movieServices.cancelledBill({
        transactionId: inforTransaction.transactionId,
      });
      console.log(res);
      setStep(1);
    } catch (error) {
      showAlert(error.message, 'error');
    }
  };
  return (
    <div className="flex flex-col items-center">
      <Typography
        className="text-4xl font-semibold mb-3
      "
      >
        Vui lòng thanh toán tiền
      </Typography>
      <img src={PayImage} className="w-60 object-cover"></img>
      <Link to={inforTransaction?.url} target="_blank">
        <Button className="bg-primary mt-3">Thanh toán</Button>
      </Link>
      <br />
      <Button
        variant="outlined"
        className="text-red-500"
        onClick={handelCancelTransaction}
      >
        Hủy Giao Dịch
      </Button>
      <Button
        variant="outlined"
        className="text-white"
        onClick={() => setStep(1)}
      >
        Quay lại
      </Button>
    </div>
  );
};

export default PaymentConfirm;
