import { Radio } from '@material-tailwind/react';
import { CreditCardIcon, ShoppingCartIcon } from '@heroicons/react/16/solid';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import './paymentPage.css';
import { formatCurrency } from '../../utils/utils';
import visaCredit from '../../assets/creditcard.png';
import atmCard from '../../assets/AtmCard.png';
import momo from '../../assets/momo.png';

const TimeLine = () => {
  return (
    <div className="flex justify-center items-center mb-[60px]">
      <div className="relative flex flex-col items-center">
        <div className="w-[50px] h-[50px] bg-primary rounded-full flex items-center justify-center relative">
          <ShoppingCartIcon className="w-[26px] text-white" />
        </div>
        <p className="absolute top-[60px] left-1/2 transform -translate-x-1/2 text-white text-[15px] font-medium w-[250px] text-center">
          Chọn gói & Hình thức thanh toán
        </p>
      </div>

      <div className="w-[400px] h-[4px] bg-[#616161]"></div>

      <div className="relative flex flex-col items-center">
        <div className="w-[50px] h-[50px] bg-[#616161] rounded-full flex items-center justify-center relative">
          <CreditCardIcon className="w-[26px] text-white" />
        </div>
        <p className="absolute top-[60px] left-1/2 transform -translate-x-1/2 text-[#FFFFFFB3] text-[15px] font-medium w-[250px] text-center">
          Xác nhận
        </p>
      </div>
    </div>
  );
};

const ImageDescription = ({ img }) => {
  return (
    <div>
      <img src={img} alt="" className="w-[30px]" />
    </div>
  );
};

const CustomLabel = ({ name, description }) => {
  return (
    <div className="flex justify-between items-center text-white text-[14px] custom-label pr-[10px] font-bold py-[12px]">
      <p className="">{name}</p>
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
              selectedValue === item.name ? 'bg-primary' : 'bg-[#333]'
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
                    typeDescription === 'money' ? (
                      <p>{formatCurrency(item.price)}</p>
                    ) : (
                      item.price
                    )
                  }
                />
              }
              onChange={() => setSelectedValue(item.name)}
              checked={selectedValue === item.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const LinePayMentInfo = ({ label, content, classNameCustom }) => {
  return (
    <div
      className={`flex justify-between my-[12px] items-center ${classNameCustom}`}
    >
      <p className="text-[12px] text-[#FFFFFFB3] font-bold">{label}</p>
      <p className="text-[14px] font-bold text-white">{content}</p>
    </div>
  );
};
const PaymentInformation = ({
  price,
  discountPrice,
  effectiveTime,
  nextPaymentPeriod,
  voucher,
  setVoucher,
  totalPrice,
}) => {
  const onChange = ({ target }) => setVoucher(target.value);
  return (
    <div className="px-[20px]">
      <h1 className="text-[26px] mb-[10px] font-bold mt-[30px]">
        Thông tin thanh toán
      </h1>
      <p className="text-[12px] text-[#FFFFFFB3] font-bold my-[16px]">
        Tài khoản DANET
      </p>
      <LinePayMentInfo label="Dịch vụ" content="Phim gói" />
      <LinePayMentInfo label="" content="Không tự động gia hạn" />
      <LinePayMentInfo label="Giá tiền" content={formatCurrency(price)} />
      <LinePayMentInfo
        label="Giảm giá"
        content={formatCurrency(discountPrice)}
      />
      <LinePayMentInfo label="Ngày có hiệu lực" content={effectiveTime} />
      <LinePayMentInfo label="Giá tiền" content={nextPaymentPeriod} />

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
          <button className="bg-primary text-[#3a3a3a] rounded hover:opacity-70 focus:outline-none text-[14px] font-bold px-2 absolute inset-y-0 right-1 my-auto w-[70px] h-[32px] flex items-center justify-center before:content-[''] before:absolute before:left-[-6px] before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-[80%] before:bg-[#969696]">
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

      <button className="bg-primary text-white hover:bg-[#80652c] duration-200 w-full rounded py-[6px] font-bold">
        Thanh toán
      </button>
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

const PaymentPage = () => {
  const listPackage = [
    {
      name: '1 Tháng',
      price: 50000,
    },
    {
      name: '3 Tháng',
      price: 150000,
    },
    {
      name: '6 Tháng',
      price: 300000,
    },
    {
      name: '12 Tháng',
      price: 600000,
    },
  ];
  const listPackageCard = [
    {
      name: 'Credit Card',
      price: <ImageDescription img={visaCredit} />,
    },
    {
      name: 'ATM Card',
      price: <ImageDescription img={atmCard} />,
    },
    {
      name: 'Ví MoMo',
      price: <ImageDescription img={momo} />,
    },
  ];
  const [selectedValue, setSelectedValue] = useState('1 Tháng');
  const [pricePackage, setPricePackage] = useState('0');
  const [voucher, setVoucher] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState('Credit Card');
  const [discountPrice, setDiscountPrice] = useState(0);
  useEffect(() => {
    const packageFilm = listPackage.find((item) => item.name === selectedValue);
    setPricePackage(packageFilm.price);
  }, [selectedValue]);
  return (
    <div className="mt-[20px] w-full max-w-[960px] mx-auto text-white font-lato px-4">
      <TimeLine />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[20px]">
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
          <PackageFilm
            selectedValue={selectedPaymentMethod}
            setSelectedValue={setSelectedPaymentMethod}
            listPackage={listPackageCard}
            title="Chọn hình thức thanh toán"
            classNameTitle="text-[18px] font-bold p-[16px]"
          />
        </div>

        {/* Cột bên phải (Thông tin thanh toán) */}
        <div className="md:col-span-1 bg-[#333333] pb-[200px]">
          <PaymentInformation
            price={pricePackage}
            discountPrice={discountPrice}
            effectiveTime={dayjs().format('D/M/YYYY')}
            nextPaymentPeriod={dayjs()
              .add(selectedValue.split(' ')[0], 'month')
              .format('D/M/YYYY')}
            voucher={voucher}
            setVoucher={setVoucher}
            totalPrice={pricePackage + discountPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
