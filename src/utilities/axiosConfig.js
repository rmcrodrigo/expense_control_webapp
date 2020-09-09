import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if(error.response && error.response.status && error.response.status === 401) {
      localStorage.removeItem("userData");
      window.location.reload();
    }
    return Promise.reject({ ...error });
  }
);

export default axiosInstance;
