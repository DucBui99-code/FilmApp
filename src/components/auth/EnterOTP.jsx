import { XMarkIcon } from '@heroicons/react/16/solid';
import {
  Button,
  Card,
  CardBody,
  Dialog,
  Spinner,
  Typography,
} from '@material-tailwind/react';
import React, { useEffect, useRef, useState } from 'react';
import AuthServices from '../../services/authServices';
import { useAlert } from '../Message/AlertContext';

function EnterOTP({ open, handleOpen }) {
  const timerRef = useRef(null);
  const { showAlert } = useAlert();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(open.timeExpriedMinutes * 60);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open.isOpen) return;

    setTimeLeft(open.timeExpriedMinutes * 60);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [open]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if a number is entered
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handelSend = async () => {
    setLoading(true);
    try {
      await AuthServices.verifyOTP({
        email: open.email,
        otp: otp.join(''),
      });
      setOtp(['', '', '', '', '', '']);
      handleOpen({ isOpen: false, email: '', timeExpriedMinutes: 0 });
      showAlert('Verify OTP successfully', 'success');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message?.[0] || 'An error occurred';
      if (error.response?.status === 400) {
        setError(errorMessage);
      } else {
        showAlert(errorMessage, 'error');
      }
    } finally {
      setTimeout(() => setError(''), 3000);
      setLoading(false);
    }
  };

  const handelResendOTP = async () => {
    try {
      const response = await AuthServices.sendOTP({ userId: open.userId });
      showAlert('Resend OTP success', 'success');

      setTimeLeft(response.timeExpired * 60);

      clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      showAlert(
        error.response?.data?.message?.[0] || 'An error occurred',
        'error'
      );
    }
  };

  const isCompleted = otp.every((digit) => digit !== '');

  return (
    <Dialog
      size="xs"
      open={open.isOpen}
      className="bg-transparent shadow-none z-10"
    >
      <Card className="mx-auto w-full max-w-[24rem] bg-black text-white">
        <CardBody>
          <div className="flex items-center justify-between mb-4">
            <Typography className="text-white font-semibold text-xl text-center">
              Nhập OTP
            </Typography>

            <XMarkIcon
              className="w-6 h-6 text-white mb-2 hover:cursor-pointer"
              onClick={() =>
                handleOpen({ isOpen: false, email: '', timeExpriedMinutes: 0 })
              }
            ></XMarkIcon>
          </div>
          <Typography className="text-white text-center mb-3 text-sm">
            Vui lòng nhập OTP đã được gửi cho{' '}
            <span className="text-primary font-bold">{open.email}</span>
          </Typography>
          <div
            className={`flex space-x-2 items-center justify-center ${
              error && 'animate-shake'
            }`}
          >
            {otp.map((digit, index) => (
              <input
                placeholder="#"
                key={index}
                id={`otp-${index}`}
                type="text"
                autoComplete="off"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                className={`w-10 h-10 text-center border ${
                  error ? 'border-red-300' : 'border-gray-300'
                } rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-blue-gray-800 text-white transition-all`}
              />
            ))}
          </div>
          {error && (
            <Typography className="text-red-300 mt-2 text-sm font-medium">
              {error}
            </Typography>
          )}
          <div className="mt-6 flex justify-center">
            <Button
              className="bg-primary flex items-center justify-center"
              fullWidth
              disabled={!isCompleted || timeLeft === 0 || loading}
              onClick={handelSend}
            >
              {loading ? <Spinner className="text-white"></Spinner> : 'Gửi'}
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center mt-3">
            {timeLeft === 0 ? (
              <Typography className="text-white text-center mt-4 text-sm">
                OTP đã hết hạn
              </Typography>
            ) : (
              <Typography className="text-white text-center mt-4 text-sm">
                OTP sẽ hết hạn trong{' '}
                <span className="text-primary font-bold">{timeLeft}</span> giây
              </Typography>
            )}
            {timeLeft === 0 && (
              <Button
                variant="text"
                className="text-primary font-semibold text-xs"
                onClick={handelResendOTP}
              >
                Gửi lại OTP?
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </Dialog>
  );
}

export default EnterOTP;
