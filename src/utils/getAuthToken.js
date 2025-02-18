import store from '../store/store'; // Import store Redux

const getAuthToken = () => {
  return store.getState().auth.token; // Lấy token từ Redux
};

export default getAuthToken;
