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

import Empty from '../../../assets/man.png';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router';

const PackageTab = ({ data }) => {
  const handleChangePage = () => {};

  const header = ['Tên gói', 'Ngày bắt đầu', 'Ngày kết thúc'];
  return data.length < 0 ? (
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
            {data.map((row) => (
              <TableRow
                key={row._id}
                sx={{ border: 'none' }}
                className="hover:bg-[#252525]"
              >
                <TableCell
                  component="th"
                  scope="row"
                  className="!text-primary !font-bold "
                >
                  {row.name}
                </TableCell>
                <TableCell className="!font-bold ">
                  {row.purchaseDate}
                </TableCell>
                <TableCell className="!font-bold ">
                  {row.exprationDate}
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
        count={data.length}
        rowsPerPage={3}
        page={0}
        onPageChange={handleChangePage}
      />
    </>
  ) : (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <img src={Empty} alt="empty" className="w-24" />
      <div className="text-white font-medium mt-4">
        Bạn chưa mua gói phim trên DANET?
      </div>
      <div className="text-white font-medium mt-2 text-center">
        Hãy chọn mua cho mình một gói phim phù hợp để tăng trải nghiệm xem phim
        không giới hạn tại DANET nhé!
      </div>
      <Link to={'/thanh-toan'}>
        <Button className="flex items-center bg-primary mt-6 text-base">
          Mua gói
        </Button>
      </Link>
    </div>
  );
};

export default PackageTab;
