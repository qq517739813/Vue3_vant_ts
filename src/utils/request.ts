import axios from 'axios';
import { showFailToast, showToast } from 'vant';
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
    const { token } = store.userInfo;
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
    if (res.isSuccess || res.IsSuccess) {
      return res;
    } else {
      if (res.isSuccess===false) {
        if (res.code === 401 || res.code === 400 || res.Code === 401 || res.code === 200) {
          (res.msg || res.Msg || res.message) &&
            showFailToast({
              forbidClick: true,
              message: res.msg || res.Msg || res.message,
              onClose: () => {
                redirectLogin();
              },
            });
          return;
        }
        res.msg || res.Msg || res.message
          ? showFailToast({
              forbidClick: true,
              message: res.msg || res.Msg || res.message,
            })
          : showToast({
              message: '未知错误',
              duration: 1000,
            });
        return Promise.reject(res.isSuccess);
      }
      if (res.IsSuccess===false) {
        if (res.Code === 401 || res.Code === 400) {
          (res.Message || res.Msg) &&
            showFailToast({
              forbidClick: true,
              message: res.Message || res.Msg,
              onClose: () => {
                redirectLogin();
              },
            });
          return;
        }
        res.Message || res.Msg
          ? showFailToast({
              forbidClick: true,
              message: res.Message || res.Msg,
            })
          : showToast({
              message: '未知错误',
              duration: 1000,
            });
        return Promise.reject(res.IsSuccess);
      }
    }
  },
  (error) => {
    showFailToast('网络故障，请稍后再试！');
    return Promise.reject(error);
  },
);

export default service;
