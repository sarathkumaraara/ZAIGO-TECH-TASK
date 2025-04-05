import { ErrorToastify, SuccessToastify } from "Components/Common/Toastify";
import { handleResponseArgs } from "types/services/serviceTemplate";

export function handleResponse({
  response,
  message,
  navigate,
}: handleResponseArgs) {
  response.mStatusCode !== 200 && console.error(response.mMessage);
  switch (response.mStatusCode) {
    case 200:
      return message ? SuccessToastify(message) : null;

    case 400:
      return ErrorToastify("The Provided Data is Incorrect.");

    case 401:
      navigate && navigate("/login");
      return ErrorToastify("Invalid Credentials.");

    case 404:
      return ErrorToastify("No Data Found.");

    case 409:
      return ErrorToastify("This Data is Already Exits.");

    case 500:
      return ErrorToastify(
        "Something went wrong on our end. Please try again later."
      );

    default:
      return ErrorToastify(response.mMessage);
  }
}
