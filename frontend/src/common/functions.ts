/* eslint-disable @typescript-eslint/no-explicit-any */
export const userDetails = () => {
    try {
      const data = JSON.parse(
        sessionStorage.getItem("userDetails") ?? "{}"
      );
      return data;
    } catch (error: any) {
      console.log("error :", error.message);
      return {};
    }
  };