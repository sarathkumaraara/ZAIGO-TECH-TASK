/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";


const setHeaders = () => {
  const token = sessionStorage.getItem("accessToken")
  ? sessionStorage.getItem("accessToken")
  : null;
  const userId = sessionStorage.getItem("userId")
  ? sessionStorage.getItem("userId")
  : null;
  if(token && userId){
    axios.defaults.headers.common["Authorization"] = token;
    axios.defaults.headers.common["user_id"] = userId;
  }
}

const getUserId = () => {
  const userId = sessionStorage.getItem("userId")
    ? sessionStorage.getItem("userId")
    : null;
  return userId;
}



const responseInterceptor = () => {
  axios.interceptors.response.use(
    function (response: any) {
      return response.data ? response.data : response;
    },
    function (error: any) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      let message;
      switch (error.status) {
        case 500:
          message = "Internal Server Error";
          break;
        case 401:
          message = "Invalid credentials";
          break;
        case 404:
          message = "Sorry! the data you are looking for could not be found";
          break;
        default:
          message = error.message || error;
      }
      return Promise.reject(message);
    }
  );
}

interface setAuthorizationType {
  (token: string, userId?: string): void
}

const setAuthorization: setAuthorizationType = (token, userId) => {
  axios.defaults.headers.common["Authorization"] = token;
  axios.defaults.headers.common["user_id"] = userId;
};

type SetUserIdType = (userId: string) => void;

const setUserId: SetUserIdType = (userId) => {
  axios.defaults.headers.common["user_id"] = userId;
};

const getLoggedInUserToken = () => {
  const userToken = sessionStorage.getItem("accessToken");
  if (!userToken) {
    return null;
  } else {
    return userToken;
  }
};

export { setHeaders, getUserId, responseInterceptor, setAuthorization, setUserId, getLoggedInUserToken }