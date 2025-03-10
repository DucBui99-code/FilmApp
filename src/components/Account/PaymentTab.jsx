import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router';

import { formatCurrency } from '../../utils/utils';
import Empty from '../../assets/man.png';
import { Button } from '@material-tailwind/react';
import UserServices from '../../services/userServices';
import { useAlert } from '../Message/AlertContext';
import getErrorMessage from '../../utils/handelMessageError';
import { LIST_PAYMENT_METHOD } from '../../config/constant';

const PaymentTab = ({ numberTab }) => {
  const header = [
    'Ngày mua',
    'Loại',
    'Phương thức',
    'Mô tả',
    'Số tiền',
    'Trạng thái',
  ];

  const StatusText = ({ status }) => {
    const textColor = () => {
      switch (status) {
        case 'completed':
          return 'green-500';
        case 'pending':
          return 'yellow-500';
        case 'failed':
          return 'red-500';
      }
    };
    const Icon = () => {
      switch (status) {
        case 'completed':
          return (
            <CheckCircleIcon
              className={`mr-[4px] text-${textColor()}`}
              width={20}
            />
          );
        case 'pending':
          return (
            <ClockIcon className={`mr-[4px] text-${textColor()}`} width={20} />
          );
        case 'failed':
          return (
            <ExclamationTriangleIcon
              className={`mr-[4px] text-${textColor()}`}
              width={20}
            />
          );
      }
    };

    return (
      <p
        className={`border rounded-full border-${textColor()} flex justify-center w-[115px] py-[4px] text-[12px] items-center uppercase`}
      >
        <Icon></Icon> {status}
      </p>
    );
  };

  const TypeText = (text) => {
    switch (text) {
      case 'packageRent':
        return 'Thuê Phim';
      case 'packageMonth':
        return 'Gói Tháng';
    }
  };

  const ShowIconPaymentMethod = (id) => {
    return LIST_PAYMENT_METHOD.find((e) => e._id === id)?.icon;
  };

  const { showAlert } = useAlert();
  const [dataPayment, setDataPayment] = useState({
    data: [],
  });

  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };

  const fectchData = async () => {
    try {
      const resData = await UserServices.getProfile(numberTab, currentPage);

      setDataPayment({
        data: resData.data,
        currentPage: resData.currentPage,
        totalItems: resData.totalItems,
      });
    } catch (error) {
      showAlert(getErrorMessage(error), 'error');
    }
  };

  useEffect(() => {
    if (numberTab === 1) {
      fectchData();
    }
  }, [currentPage, numberTab]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="bg-customDark col-span-1 text-whiteText uppercase font-bold ps-[24px] pt-[20px] pb-[24px]">
        phương thức thanh toán
      </div>
      <div className="col-span-2 w-full">
        <div className="bg-customDark text-whiteText uppercase font-bold ps-[24px] pt-[20px] pb-[24px]">
          Lịch sử giao dịch
        </div>
        {dataPayment.data.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table
                aria-label="simple table"
                className="bg-[#1e1e1e] custom-table"
              >
                <TableHead>
                  <TableRow className="bg-black">
                    {header.map((item, index) => {
                      return (
                        <TableCell
                          key={`${index}`}
                          className="text-white !text-center"
                        >
                          {item}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataPayment.data.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ border: 'none' }}
                      className="hover:bg-[#252525]"
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className="!font-bold !text-center"
                      >
                        {row.purchaseDate}
                      </TableCell>
                      <TableCell className="!font-bold !text-center">
                        {TypeText(row.packageType)}
                      </TableCell>
                      <TableCell className="!font-bold !text-center">
                        {ShowIconPaymentMethod(row.paymentMethod)}
                      </TableCell>
                      <TableCell className="!text-primary !font-bold !text-center">
                        {row.name}
                      </TableCell>
                      <TableCell className="!font-bold !text-center">
                        {formatCurrency(row.price)}
                      </TableCell>
                      <TableCell className="!font-bold !text-center">
                        <StatusText status={row?.status}></StatusText>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              className="!text-white"
              labelRowsPerPage="Số dòng mỗi trang"
              rowsPerPageOptions={[5, 10, 20]}
              count={dataPayment?.totalItems || 0}
              rowsPerPage={5}
              page={currentPage - 1}
              onPageChange={handleChangePage}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <img src={Empty} alt="empty" className="w-32 object-cover" />
            <div className="text-white font-medium mt-4">
              Bạn chưa có giao dịch nào
            </div>

            <Link to={'/'}>
              <Button className="flex items-center bg-primary mt-6 text-base">
                Xem phim
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentTab;
