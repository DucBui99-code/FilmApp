import React from 'react';
import { Link } from 'react-router';
import { Button } from '@material-tailwind/react';
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import Empty from '../../../assets/man.png';
import { formatCurrency } from '../../../utils/utils';

const RentFilmTab = ({ data }) => {
  const header = [
    'Tên phim',
    'Thời hạn (Ngày)',
    'Giá phim',
    'Ngày bắt đầu',
    'Ngày kết thúc',
    'Trạng thái',
  ];
  return data.length > 0 ? (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" className="bg-[#1e1e1e] custom-table">
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
                  className="!text-primary !font-bold w-40 truncate"
                >
                  <Link
                    to={`/xem-phim-goi/${row.slug}`}
                    className="hover:underline"
                  >
                    {row.name}
                  </Link>
                </TableCell>
                <TableCell className="!font-bold !text-center" valign="middle">
                  {row.duration}
                </TableCell>
                <TableCell className="!font-bold !text-primary !text-center">
                  {formatCurrency(row.price)}
                </TableCell>
                <TableCell className="!font-bold !text-center">
                  {row.purchaseDate}
                </TableCell>
                <TableCell className="!font-bold !text-center">
                  {row.exprationDate}
                </TableCell>
                <TableCell className="!font-bold !text-center">
                  <Chip
                    label={
                      <div className="text-white">
                        {!row.isExpired ? 'Còn hạn' : 'Hết hạn'}
                      </div>
                    }
                    color={`${!row.isExpired ? 'success' : 'error'}`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  ) : (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <img src={Empty} alt="empty" className="w-32 object-cover" />
      <div className="text-white font-medium mt-4">
        Bạn chưa thuê phim trên DANET?
      </div>

      <Link to={'/xem-phim-goi'}>
        <Button className="flex items-center bg-primary mt-6 text-base">
          Xem phim
        </Button>
      </Link>
    </div>
  );
};

export default RentFilmTab;
