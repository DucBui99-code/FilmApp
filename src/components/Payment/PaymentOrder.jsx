import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Button, Radio } from '@material-tailwind/react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import './paymentPage.css';

import { useAlert } from '../../components/Message/AlertContext';
import { formatCurrency } from '../../utils/utils';
import movieServices from '../../services/movieServices';
import getErrorMessage from '../../utils/handelMessageError';
import { LIST_PAYMENT_METHOD } from '../../config/constant';

const CustomLabel = ({ name, description }) => {
  return (
    <div className="flex justify-between items-center text-white text-[14px] custom-label pr-[10px] font-bold py-[12px]">
      <p className="capitalize">{name}</p>
      <div>{description}</div>
    </div>
  );
};

const PackageFilm = ({
  selectedValue,
  setSelectedValue,
  listPackage,
  title,
  classNameTitle,
  typeDescription,
}) => {
  return (
    <div className="mt-[20px]">
      <div className="flex flex-col col-span-2">
        <p className={classNameTitle}>{title}</p>
        {listPackage.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className={`rounded-[4px] mb-[10px] color-radio-ct ${
              selectedValue === item._id
                ? 'bg-primary animate-pulse'
                : 'bg-[#333]'
            }`}
          >
            <Radio
              name={item.name}
              key={`${item.name}-${index}`}
              className="bg-transparent hover:before:opacity-0 before:bg-white border-[2px] border-white w-[24px] h-[24px] custom-height checked:border-white !checked:before:border-white"
              label={
                <CustomLabel
                  name={item.name}
                  description={
                    typeDescription === 'money' && item.icon ? (
                      <p>{item?.icon}</p>
                    ) : (
                      item.icon
                    )
                  }
                />
              }
              onChange={() => setSelectedValue(item._id)}
              checked={selectedValue === item._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const LinePayMentInfo = ({ label, content, classNameCustom }) => {
  return (
    <div className={`flex justify-between my-[12px] items-center `}>
      <p className="text-[12px] text-[#FFFFFFB3] font-bold">{label}</p>
      <p className={`text-[14px] font-bold text-white ${classNameCustom}`}>
        {content}
      </p>
    </div>
  );
};

const PaymentInformation = ({
  price,
  discountPrice,
  effectiveTime,
  nextPaymentPeriod,
  loading,
  voucher,
  setVoucher,
  totalPrice,
  typeService,
  paymentPackage,
  nameUser,
}) => {
  const onChange = ({ target }) => setVoucher(target.value);
  return (
    <div className="px-[20px]">
      <h1 className="text-[26px] mb-[10px] font-bold mt-[30px]">
        Thông tin thanh toán
      </h1>
      <LinePayMentInfo
        label="Tài khoản DANET"
        content={nameUser}
        classNameCustom={'!text-primary'}
      />
      <LinePayMentInfo label="Dịch vụ" content={typeService} />
      <LinePayMentInfo label="" content="Không tự động gia hạn" />
      <LinePayMentInfo
        label="Giá tiền"
        content={formatCurrency(price)}
        classNameCustom={'!text-primary'}
      />
      <LinePayMentInfo
        label="Giảm giá"
        content={formatCurrency(discountPrice)}
        classNameCustom={'!text-primary'}
      />
      <LinePayMentInfo label="Ngày có hiệu lực" content={effectiveTime} />
      <LinePayMentInfo
        label="Kỳ thanh toán tiếp theo"
        content={nextPaymentPeriod !== 'Invalid Date' ? nextPaymentPeriod : ''}
      />

      <div>
        <h2 className="text-lg font-semibold mb-4">Nhập mã giảm giá</h2>
        <div className="flex relative">
          <input
            type="text"
            value={voucher}
            onChange={onChange}
            placeholder="Nhập mã giảm giá"
            className="flex-1 p-2 py-[12px] border-none rounded font-bold focus:outline-none text-[#969696] text-[12px] bg-[#2c2c2c]"
          />
          <button className="bg-primary text-white rounded hover:opacity-70 focus:outline-none text-[14px] font-bold px-2 absolute inset-y-0 right-1 my-auto w-[70px] h-[32px] flex items-center justify-center before:content-[''] before:absolute before:left-[-6px] before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-[80%] before:bg-[#969696]">
            Áp dụng
          </button>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#FFFFFF1E] my-[16px]"></div>

      <div className="flex justify-between items-center mb-[30px]">
        <p className="text-[16px] text-[#FFFFFFB3] font-bold">
          Tổng thanh toán
        </p>
        <p className="text-[22px] text-primary font-bold">
          {formatCurrency(totalPrice)}
        </p>
      </div>

      <Button
        className="bg-primary text-white hover:opacity-80 flex items-center justify-center"
        fullWidth
        onClick={paymentPackage}
        loading={loading}
        disabled={loading}
      >
        Thanh toán
      </Button>
      <p className="font-bold text-[#FFFFFFB3] text-[14px] mt-[10px]">
        Bằng việc thanh toán, bạn đã đồng ý với các{' '}
        <span className="text-primary cursor-pointer">
          điều khoản sử dụng, chính sách
        </span>{' '}
        của DANET
      </p>
    </div>
  );
};

const PaymentOrder = ({ setStep, setInforTransaction }) => {
  const { isLogin, userInfo } = useSelector((s) => s.auth);
  const { showAlert } = useAlert();

  const { movieId } = useParams();

  const [typeService, setTypeService] = useState('Phim gói');
  const [listPackage, setListPackage] = useState([]);
  const [selectedValue, setSelectedValue] = useState(
    listPackage[0]?.name || ''
  ); // Fix lỗi khi listPackage chưa có dữ liệu
  const [pricePackage, setPricePackage] = useState('0');
  const [voucher, setVoucher] = useState('');
  const [listPackageFilm, setListPackageFilm] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    LIST_PAYMENT_METHOD[0]?._id || ''
  ); // Fix lỗi khi LIST_PAYMENT_METHOD chưa có dữ liệu
  const [discountPrice, setDiscountPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (listPackage.length > 0) {
      const packageFilm =
        listPackage.find((item) => item._id === selectedValue) ||
        [listPackageFilm].find((item) => item._id === selectedValue);
      const typeService = listPackage.find((item) => item._id === selectedValue)
        ? 'Phim gói'
        : 'Phim lẻ';
      setTypeService(typeService);
      setPricePackage(packageFilm.price);
    }
  }, [selectedValue]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await movieServices.getMoviePackage(movieId || '');
      setListPackage(res.data.packageMonth);
      setListPackageFilm(res.data.packageSingle);
      setSelectedValue(res.data.packageMonth[0]._id);
    };

    fetchData();
  }, []);

  const handelConfirmPackage = async () => {
    if (!isLogin) {
      return showAlert('Vui lòng đăng nhập để thanh toán', 'error');
    }

    const form = {
      packageId: selectedValue,
      paymentMethod: selectedPaymentMethod,
    };
    setLoading(true);
    try {
      let res = {};
      if (typeService == 'Phim gói') {
        res = await movieServices.buyPackageMonth(form);
      } else if (typeService == 'Phim lẻ') {
        res = await movieServices.buyPackageSingle(form);
      }

      setInforTransaction({
        url: res.data.billData.order_url,
        transactionId: res.data.transactionId,
        data: res.data.billData?.data || {},
        paymentMethod: selectedPaymentMethod,
        expireTime: res.data.expireTime,
      });
      showAlert(res.data.billData.return_message, 'success');
      setStep(2);
    } catch (error) {
      showAlert(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-[20px]">
      {/* Cột bên trái (Gói phim + Thanh toán) */}
      <div className="md:col-span-2">
        <PackageFilm
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          listPackage={listPackage}
          title="Gói phim:"
          classNameTitle="p-[16px] text-[18px] font-bold"
          typeDescription="money"
        />
        {listPackageFilm && listPackageFilm.name ? (
          <PackageFilm
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            listPackage={[{ ...listPackageFilm }]}
            typeDescription="money"
            title="Phim lẻ:"
            classNameTitle="text-[18px] font-bold p-[16px]"
          />
        ) : (
          ''
        )}
        <PackageFilm
          selectedValue={selectedPaymentMethod}
          setSelectedValue={setSelectedPaymentMethod}
          listPackage={LIST_PAYMENT_METHOD}
          title="Chọn hình thức thanh toán"
          classNameTitle="text-[18px] font-bold p-[16px]"
        />
      </div>

      {/* Cột bên phải (Thông tin thanh toán) */}
      <div className="md:col-span-2 bg-[#333333] pb-[200px]">
        <PaymentInformation
          typeService={typeService}
          price={pricePackage}
          loading={loading}
          nameUser={userInfo?.username}
          paymentPackage={handelConfirmPackage}
          discountPrice={discountPrice}
          effectiveTime={dayjs().format('DD/MM/YYYY')}
          nextPaymentPeriod={dayjs()
            .add(
              typeService === 'Phim lẻ'
                ? listPackageFilm?.duration
                : listPackage.find((item) => item._id == selectedValue)
                    ?.duration,
              typeService === 'Phim lẻ' ? 'day' : 'month'
            )
            .format('DD/MM/YYYY')}
          voucher={voucher}
          setVoucher={setVoucher}
          totalPrice={pricePackage + discountPrice}
        />
      </div>
    </div>
  );
};

export default PaymentOrder;
