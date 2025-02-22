import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import PayImage from '../../assets/mobile-payment.png';
import { Link } from 'react-router';
const PaymentConfirm = ({ setStep, url }) => {
  return (
    <div className="flex flex-col items-center">
      <Typography
        className="text-4xl font-semibold mb-3
      "
      >
        Vui lòng thanh toán tiền
      </Typography>
      <img src={PayImage} className="w-60 object-cover"></img>
      <Link to={url} target="_blank">
        <Button className="bg-primary mt-3">Thanh toán</Button>
      </Link>
      <br />
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
