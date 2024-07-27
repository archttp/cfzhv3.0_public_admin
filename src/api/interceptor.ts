import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';
// import { union } from 'lodash';

export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

// // 处理  类型“AxiosResponse<any, any>”上不存在属性 'xxx'
declare module 'axios' {
  // eslint-disable-next-line no-shadow, @typescript-eslint/no-unused-vars
  interface AxiosResponse<T = any> {
    code: null;
    message: null;
    total: null;
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = getToken();
    console.log(config);
    
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `${token}`;
      if(config.url === '/internetOfThingsAdmin/cfCarPark/importExcelParkPackage'){
        config.headers['Content-Type'] = `multipart/form-data`;
      }
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  async (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    if (res.code === 24002) {
      const userStore = useUserStore();
      await userStore.logout();
      window.location.reload();
    }
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 10002 && res.code !== 10004) {
      // @ts-ignore
      if (res.code !== 28002) {
        Message.error({
          // @ts-ignore
          content: res.message + (res.mixMessage ? '-'+ res.mixMessage : '') || 'Error',
          duration: 5 * 1000,
        });
      }

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (
      //   [50008, 50012, 50014].includes(res.code) &&
      //   response.config.url !== '/api/user/info'
      // ) {
      //   Modal.error({
      //     title: 'Confirm logout',
      //     content:
      //       'You have been logged out, you can cancel to stay on this page, or log in again',
      //     okText: 'Re-Login',
      //     async onOk() {
      //       const userStore = useUserStore();

      //       await userStore.logout();
      //       window.location.reload();
      //     },
      //   });
      // }
      // @ts-ignore
      return res;
      // return Promise.reject(new Error(res.message || 'Error'));
    }

    return res;
  },
  (error) => {
    Message.error({
      content: error.msg || 'Request Error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
