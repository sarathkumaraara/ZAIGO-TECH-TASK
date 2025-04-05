/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useProfile } from "../components/Hooks/UserHooks";
import { setHeaders } from "../services/constant";

export const AuthProtected = (props: any) => {
  const { accessToken, userType } = useProfile();
 
  useEffect(() => {
    if (accessToken && props.accessRoles.includes(userType)) {
      setHeaders();
    }
    // else if (!accessToken && !isOtpVerified) {
    // dispatch(logoutUser());
    // }
  }, [accessToken, props.accessRoles]);

  /*
    redirect is un-auth access protected routes via url
  */
  if (!accessToken) {
    return <Navigate to={{ pathname: "/login" }} />;
  }
  if (!props.accessRoles.includes(userType)) {
    return <Navigate to={{ pathname: "/unknown" }} />;
  }
  
    return <>{props.children}</>;
};