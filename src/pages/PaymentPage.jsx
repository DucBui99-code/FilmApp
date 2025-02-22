import { CreditCardIcon, ShoppingCartIcon } from '@heroicons/react/16/solid';
import React, { useState } from 'react';
import PaymentOrder from '../components/Payment/PaymentOrder';
import PaymentConfirm from '../components/Payment/PaymentConfirm';

const TimeLine = ({ step }) => {
  return (
    <div className="flex justify-center items-center mb-[60px]">
      <div className="relative flex flex-col items-center">
        <div
          className={`w-[50px] h-[50px] bg-primary rounded-full flex items-center justify-center relative ${step === 1 ? 'animate-pulse' : ''}`}
        >
          <ShoppingCartIcon className="w-[26px] text-white" />
        </div>
        <p className="absolute top-[60px] left-1/2 transform -translate-x-1/2 text-white text-[15px] font-medium w-[250px] text-center">
          Chọn gói & Hình thức thanh toán
        </p>
      </div>

      <div className="relative w-[400px] h-[4px] bg-[#616161] overflow-hidden">
        {step > 1 && (
          <div className="absolute top-0 left-0 h-full bg-primary animate-pingPong"></div>
        )}
      </div>

      <div className="relative flex flex-col items-center">
        <div
          className={`w-[50px] h-[50px] ${step > 1 ? 'bg-primary animate-pulse' : 'bg-[#616161]'} rounded-full flex items-center justify-center relative`}
        >
          <CreditCardIcon className="w-[26px] text-white" />
        </div>
        <p className="absolute top-[60px] left-1/2 transform -translate-x-1/2 text-[#FFFFFFB3] text-[15px] font-medium w-[250px] text-center">
          Xác nhận
        </p>
      </div>
    </div>
  );
};

const PaymentPage = () => {
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState('');
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <PaymentOrder setStep={setStep} setUrl={setUrl} />;
      case 2:
        return <PaymentConfirm setStep={setStep} url={url} />;
      default:
        return <div>Không có step nào phù hợp</div>;
    }
  };

  return (
    <div className="mt-[20px] w-full max-w-[960px] mx-auto text-white font-lato px-4">
      <TimeLine step={step} />
      {renderStepContent()}
    </div>
  );
};

export default PaymentPage;
