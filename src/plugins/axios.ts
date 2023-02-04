import axios from "axios";
import auth from "../auth";
const BASE_URL = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = BASE_URL;
axios.interceptors.request.use(function (config:any) {    
    if(auth().accessToken) {
        config.headers.Authorization =  `Bearer ${auth().accessToken}`;
    }  
    return config;
});
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if(error.response.status===401) {
        window.location.href = "/";
    }
    return Promise.reject(error);
  });