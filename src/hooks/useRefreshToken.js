import useAuth from "./useAuth";
import axios from "../api/axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(
      "https://humber-capstone-backend.herokuapp.com/users/refresh",
      {
        withCredentials: true,
      }
    );
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data);
      return {
        ...prev,
        user: localStorage.getItem("user"),
        roles: response.data.role,
        companyId: localStorage.getItem("companyId"),
        docusignClientId: localStorage.getItem("docusignClientId"),
        userId: localStorage.getItem("userId"),
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
