import React from 'react';
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
} from '@heroicons/react/24/solid';
import { Link } from 'react-router';

import { formatCurrency } from '../../../utils/utils';
import Empty from '../../../assets/man.png';
import { Button } from '@material-tailwind/react';

const PaymentTab = ({ data }) => {
  const header = ['Ngày mua', 'Mô tả', 'Số tiền', 'Trạng thái'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="bg-customDark col-span-1 text-whiteText uppercase font-bold ps-[24px] pt-[20px] pb-[24px]">
        phương thức thanh toán
      </div>
      <div className="col-span-2 w-full">
        <div className="bg-customDark text-whiteText uppercase font-bold ps-[24px] pt-[20px] pb-[24px]">
          Lịch sử giao dịch
        </div>
        {data.length === 0 ? (
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
                  {data.map((row) => (
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

                      <TableCell className="!text-primary !font-bold !text-center">
                        {row.name}
                      </TableCell>
                      <TableCell className="!font-bold !text-center">
                        {formatCurrency(row.price)}
                      </TableCell>
                      <TableCell className="!font-bold !text-center">
                        {row?.status === 'fail' ? (
                          <p className="border rounded-full border-red-500 flex justify-center items-center w-[110px] py-[4px] text-[12px]">
                            <ExclamationTriangleIcon
                              className="text-red-500 mr-[4px]"
                              width={20}
                            />
                            Thất bại
                          </p>
                        ) : row?.status === 'success' ? (
                          <p className="border rounded-full border-primary flex justify-center w-[110px] py-[4px] text-[12px] items-center">
                            <CheckCircleIcon
                              className="text-green-500 mr-[4px]"
                              width={20}
                            />{' '}
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
              count={data?.length}
              rowsPerPage={3}
              page={0}
              // onPageChange={handleChangePage}
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
