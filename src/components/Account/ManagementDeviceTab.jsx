import React, { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import Empty from '../../assets/man.png';
import { TrashIcon } from '@heroicons/react/16/solid';
import { useAlert } from '../Message/AlertContext';
import UserServices from '../../services/userServices';
import getErrorMessage from '../../utils/handelMessageError';

const ManagementDeviceTab = ({ data }) => {
  const header = [
    'Hệ điều hành',
    'Tên thiết bị',
    'Trình duyệt',
    'Ngày phát hiện',
    'Hành động',
  ];
  const [dataManagement, setDataManagement] = useState(data);

  const { showAlert } = useAlert();

  useEffect(() => {
    setDataManagement(data);
  }, [data]);

  const handleRemove = async (id) => {
    // Xử lý xóa thiết bị

    try {
      const res = await UserServices.removeDevice({
        deviceId: id,
      });
      showAlert(res.message, 'success');
      setDataManagement((prev) => prev.filter((item) => item.deviceId !== id));
    } catch (error) {
      showAlert(getErrorMessage(error), 'error');
    }
  };
  return dataManagement.length > 0 ? (
    <div className="min-h-[300px]">
      <TableContainer component={Paper} className="">
        <Table aria-label="simple table" className="bg-[#1e1e1e] custom-table ">
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
            {dataManagement.map((row) => (
              <TableRow
                key={row._id}
                sx={{ border: 'none' }}
                className="hover:bg-[#252525]"
              >
                <TableCell
                  component="th"
                  scope="row"
                  className="!text-primary !font-bold !text-center"
                >
                  {row.deviceType}
                </TableCell>
                <TableCell className="!font-bold !text-center" valign="middle">
                  {row.deviceName}
                </TableCell>
                <TableCell className="!font-bold !text-primary !text-center">
                  {row.browser}
                </TableCell>
                <TableCell className="!font-bold !text-center">
                  {row.timeDetected}
                </TableCell>
                <TableCell className="!font-bold !text-center">
                  <Button
                    color="red"
                    size="sm"
                    onClick={() => handleRemove(row.deviceId)}
                  >
                    <TrashIcon className="w-4"></TrashIcon>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <img src={Empty} alt="empty" className="w-32 object-cover" />
      <div className="text-white font-medium mt-4">
        Chưa có thiết bị nào được quản lý
      </div>
    </div>
  );
};

export default ManagementDeviceTab;
