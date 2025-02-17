import React from 'react';

import { Card, Typography } from '@material-tailwind/react';
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
import dayjs from 'dayjs';
import { formatCurrency } from '../../../utils/utils';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';
function createData(id, dateBuy, price, des, status) {
  return { id, dateBuy, price, des, status };
}
const TableHistory = () => {
  const handleChangePage = () => {};

  const rows = [
    createData(1, dayjs().format('DD-MM-YYYY'), 50000, '...', 'fail'),
    createData(2, dayjs().format('DD-MM-YYYY'), 50000, '...', 'success'),
    createData(3, dayjs().format('DD-MM-YYYY'), 50000, '...', 'fail'),
    createData(4, dayjs().format('DD-MM-YYYY'), 50000, '...', 'fail'),
    createData(5, dayjs().format('DD-MM-YYYY'), 50000, '...', 'fail'),
  ];
  const header = ['Ngày mua', 'Số tiền', 'Mô tả', 'Trạng thái'];
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" className="bg-[#1e1e1e] custom-table">
          <TableHead>
            <TableRow className="bg-black">
              {header.map((item, index) => {
                return (
                  <TableCell
                    key={`${item}${new Date().getTime()}${index}`}
                    className="text-white"
                  >
                    {item}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id + new Date().getTime().toString()}
                sx={{ border: 'none' }}
                className="hover:bg-[#252525]"
              >
                <TableCell
                  component="th"
                  scope="row"
                  className="!text-primary !font-bold "
                >
                  {row.dateBuy}
                </TableCell>
                <TableCell className="!font-bold ">
                  {formatCurrency(row.price)}
                </TableCell>
                <TableCell className="!font-bold ">{row.des}</TableCell>
                <TableCell className="!font-bold ">
                  {row.status === 'fail' ? (
                    <p className="border rounded-full border-red-500 flex justify-center items-center w-[110px] py-[4px] text-[12px]">
                      <ExclamationTriangleIcon
                        className="text-red-500 mr-[4px]"
                        width={20}
                      />
                      Thất bại
                    </p>
                  ) : row.status === 'success' ? (
                    <p className="border rounded-full border-primary flex justify-center w-[110px] py-[4px] text-[12px] items-center">
                      <CheckCircleIcon className="text-green-500 mr-[4px]" width={20} />{' '}
                      Thành công
                    </p>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        labelRowsPerPage=""
        rowsPerPageOptions={[0]}
        count={rows.length}
        rowsPerPage={3}
        page={0}
        onPageChange={handleChangePage}
      />
    </>
  );
};
const PaymentTab = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-customDark text-whiteText uppercase font-bold ps-[24px] pt-[20px] pb-[24px]">
        phương thức thanh toán
      </div>
      <div>
        <div className="bg-customDark text-whiteText uppercase font-bold ps-[24px] pt-[20px] pb-[24px]">
          Lịch sử giao dịch
        </div>
        <TableHistory />
      </div>
    </div>
  );
};

export default PaymentTab;
