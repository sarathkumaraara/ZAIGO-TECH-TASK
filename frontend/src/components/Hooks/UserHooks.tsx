/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getLoggedInUserToken } from "../../services/constant";
import { userDetails } from "../../common/functions";

const useProfile = () => {
  const userSessionToken: string | null = getLoggedInUserToken();
  
  const [accessToken, setAccessToken] = useState(userSessionToken);
  const [userType, setUserType] = useState(userDetails().role ?? "");
  
  useEffect(() => {
    const userSessionToken: any = getLoggedInUserToken();
    setUserType(userDetails()?.role ?? "");
    setAccessToken(userSessionToken);
  }, []);

  return { accessToken, userType };
};
export { useProfile };
