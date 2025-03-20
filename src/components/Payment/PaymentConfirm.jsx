import React, { useEffect } from 'react';
import { Button, Typography } from '@material-tailwind/react';

import PayImage from '../../assets/mobile-payment.png';
import { Link } from 'react-router';
import movieServices from '../../services/movieServices';
import { useAlert } from '../Message/AlertContext';
import getErrorMessage from '../../utils/handelMessageError';
import { formatCurrency } from '../../utils/utils';

const PaymentConfirm = ({ setStep, inforTransaction }) => {
  const { showAlert } = useAlert();
  const handelCancelTransaction = async () => {
    try {
      const res = await movieServices.cancelledBill({
        transactionId: inforTransaction.transactionId,
      });

      showAlert(res.message, 'success');
      setStep(1);
    } catch (error) {
      showAlert(getErrorMessage(error), 'error');
    }
  };
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'Hello'; // Required for modern browsers to show the confirmation dialog
      console.log('User attempted to close the component or web page.');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  const RenderViewPaymentConfirm = () => {
    switch (inforTransaction.paymentMethod) {
      case 'Bank':
        return (
          <div className="p-6 max-w-md mx-auto rounded-2xl shadow-md space-y-4">
            <div className="flex justify-center">
              <img
                src={inforTransaction.url}
                alt="QR Code"
                className="w-80 h-80"
              />
            </div>
            <div className="space-y-2">
              <p>
                <strong>Ngân hàng:</strong> {inforTransaction.data.bankName}
              </p>
              <p>
                <strong>Số tài khoản:</strong>{' '}
                {inforTransaction.data.bankAccount}
              </p>
              <p>
                <strong>Chủ tài khoản:</strong>{' '}
                {inforTransaction.data.accountHolder}
              </p>
              <p>
                <strong>Số tiền:</strong>{' '}
                <span className="text-primary font-bold">
                  {formatCurrency(inforTransaction.data.amount)} VND
                </span>
              </p>
              <p>
                <strong>Nội dung:</strong> {inforTransaction.data.qrDescription}
              </p>
            </div>
          </div>
        );
      case 'ZaloPay':
        return (
          <div>
            <Typography className="text-4xl font-semibold mb-3">
              Vui lòng thanh toán tiền
            </Typography>
            <div className="flex items-center justify-center flex-col">
              <img src={PayImage} className="w-60 object-cover"></img>
              <Link to={inforTransaction?.url} target="_blank">
                <Button className="bg-primary mt-3">Thanh toán</Button>
              </Link>
              <br />
            </div>
          </div>
        );

      default:
        break;
    }
  };
  return (
    <div className="flex flex-col items-center">
      <RenderViewPaymentConfirm></RenderViewPaymentConfirm>
      <Button
        variant="outlined"
        className="text-red-500 mt-2"
        onClick={handelCancelTransaction}
      >
        Hủy Giao Dịch
      </Button>
    </div>
  );
};

export default PaymentConfirm;
