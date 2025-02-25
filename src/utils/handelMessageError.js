const getErrorMessage = (error) => {
  return error?.response?.data?.message || 'Có lỗi xảy ra!';
};

export default getErrorMessage;
