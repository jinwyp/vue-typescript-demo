import axios, {AxiosRequestConfig} from 'axios';
// import {Message } from 'element-ui'
import { getAccessToken, removeAccessToken } from './localStorage';


// Vue.use(Message)

const isDev = process.env.NODE_ENV !== 'production';
const domainName = isDev ? 'http://localhost:3100' : 'https://qapi.eyee.com';



/* 结果状态码(仅存放有特殊处理的) 键:驼峰 */
const statusCode: any = {
    success : 1511200, // 请求完成
    errorServer : 1511500, // 服务器错误
    unShelved : 1511789, // 已下架
    tokenError : 1004 // 已下架
};


// create an axios instance
const http = axios.create({
    baseURL : domainName, // api的base_url
    timeout : 5000 // request timeout
});


// http request 拦截器 request interceptor
http.interceptors.request.use(
    (config: any) => {
        // Do something before request is sent
        if (getAccessToken) {
            config.headers.Authorization = getAccessToken; // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        }

        config.headers['X-Requested-With'] = 'XMLHttpRequest';

        // console.log('axios config: ', typeof config.data,  config)
        return config;
        
    },
    (error: any) => {
        // Do something with request error
        console.log('axios interceptors request error: ', error); // for debug
        return Promise.reject(error);
    }
);




// http response 拦截器

http.interceptors.response.use(
    (response: any) => {
        if (response.data.code === statusCode.success) {
            // 返回成功
        }

        if (response.data.responseCode === statusCode.tokenError) {
            removeAccessToken();
        }
        return response;
    },
    (error: any) => {
        if (error.response) {
            const status = error.response.status;
            const statusText = error.response.statusText;
            switch (status) {
                case 404:
                    alert(JSON.stringify(statusText) + ' 状态码：' + status);
                    break;
                case 401:
            }
        }
        return Promise.reject(error.response.data); // 返回接口返回的错误信息
    });

export default http;
