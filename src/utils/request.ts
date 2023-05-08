import axios from 'axios';
import { showFailToast } from 'vant';
import { redirectLogin } from '@/utils/utils';
import { userStore } from '@/store/user';

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API
  // baseURL: 'http://111.21.231.41:20107/api/',
});

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    const store = userStore();
    const {token} = store.userInfo;
    if (token) {
      Object.assign(config.headers, { Authorization: `Bearer ${token}` });
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
    if (!res.isSuccess) {
      if (res.Code === 401 || res.Code === 400) {
        res.Msg &&
          showFailToast({
            forbidClick: true,
            message: res.Msg,
            onClose: () => {
              redirectLogin();
            },
          });
        return;
      }
      res.Msg &&
        showFailToast({
          forbidClick: true,
          message: res.Msg,
        });

      return Promise.reject(res.isSuccess);
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
