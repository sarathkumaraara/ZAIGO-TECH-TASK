import axios from "axios";
import { responseInterceptor, setHeaders } from "./constant"
import type { serviceTemplate } from "../types/typesExport";

axios.defaults.baseURL = "http://192.168.92.165:4000";

// content type
setHeaders()

responseInterceptor()

let activeRequests = 0;
let totalRequests = 0;
let totalResponses = 0;

axios.interceptors.request.use((config) => {
  activeRequests++;
  totalRequests++;
  console.info("Active requests:", activeRequests);
  // Optionally show a global loading indicator here
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  activeRequests--;
  totalResponses++;
  console.info("Active requests:", activeRequests,",", "Total requests:", totalRequests,",", "Total responses:", totalResponses);
  // Optionally hide the global loading indicator if no requests are pending
  return response;
}, (error) => {
  activeRequests--;
  totalResponses++;
  console.info("Active requests:", activeRequests);
  return Promise.reject(error);
});


export const isApiLoading = () => activeRequests > 0;

const staticKey = {
  headers: { Authorization: "" },
};

class client {
  get = (url: serviceTemplate['url'], key?: boolean) => {
    if (!key) {
      return axios.get(url);
    } else {
      return axios.get(url, staticKey);
    }
  };

  post = (url: serviceTemplate['url'], body: serviceTemplate['body']) => {
    return axios.post(url, body);
  };

  put = (url: serviceTemplate['url'], body: serviceTemplate['body']) => {
    return axios.put(url, body);
  };

  create = (url: serviceTemplate['url'], body: serviceTemplate['body']) => {
    return axios.post(url, body, staticKey);
  };

  delete = (url: serviceTemplate['url'], body?: serviceTemplate['body']) => {
    return axios.delete(url, body);
  };
}

export { client };
