import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorToastify = (message: string) => {
  return toast.error(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

const WarningToastify = (message: string) => {
  return toast.warn(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

const SuccessToastify = (message: string, autoClosingTime: number =3000)=> {
  return toast.success(message, {
    position: "top-right",
    autoClose: autoClosingTime || 3000,
  });
};

const NoDataToastify = (message: string) => {
  return toast.info(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

export { ErrorToastify, WarningToastify, SuccessToastify, NoDataToastify };
