import axios from 'axios';
import {SERVER_HOST} from '../config';


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  const {data, status} = response;
  if (status === 200) {
    return data;
  }

}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

//获取所有的页面信息
export const getAllPages = () => {
  return axios.get(`${SERVER_HOST}/pages`);
}

export const editPage = (para) => {
  return axios.post(`${SERVER_HOST}/updatePage`, para);
}

export const deletePage = (para) => {
  return axios.post(`${SERVER_HOST}/deletePage`, para);
}

//移动分支信息 位置
export const switchItem = (para) => {
  return axios.post(`${SERVER_HOST}/switchItem`, para);
}

export const editProject = (para) => {
  return axios.post(`${SERVER_HOST}/editProject`, para);
}
