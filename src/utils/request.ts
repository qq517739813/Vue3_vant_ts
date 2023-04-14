import axios from 'axios';
import { showFailToast } from 'vant';
import { redirectLogin } from '@/utils/utils';

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API
  baseURL: 'http://111.21.231.41:20101/api',

});

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    const token = sessionStorage.getItem('token') || '';
    if (token) {
      Object.assign(config.headers, { Authorization: token });
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// Response interceptors
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (!res.IsSuccess) {
      if (res.Code === 401 || res.Code === 400) {
        res.Message &&
          showFailToast({
            forbidClick: true,
            message: res.Message,
            onClose: () => {
              redirectLogin();
            },
          });
        return;
      }
      res.Message &&
        showFailToast({
          forbidClick: true,
          message: res.Message,
        });
      return Promise.reject(res.IsSuccess);
    } else {
      return response.data;
    }
  },
  (error) => {
    showFailToast('网络故障，请稍后再试！');
    return Promise.reject(error);
  },
);

export default service;
