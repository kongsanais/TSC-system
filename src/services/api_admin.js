import httpClient from "@/services/httpClient";
import { admin } from "@/services/constants";
import router from "@/router";

// export const registerAdmin = async values => {
//     let result = await httpClient.post(admin.REGISTER_URL, values);
//     return result.data.result;
// };

export const isLoggedInAdmin = () => {
    let token = localStorage.getItem(admin.TOKEN_KEY);
    return token != null;
};


export const getRoleAdmin = () => {
    let role = localStorage.getItem(admin.ROLE);
    return role;
};


export const logoffAdmin = async () => {
    await httpClient.post(admin.LOGOUT_URL);
    localStorage.removeItem(admin.TOKEN_KEY);
    localStorage.removeItem(admin.ROLE);
    router.push("/admin_login");
 };


  

export const loginAdmin = async values => 
{
  let result = await httpClient.post(admin.LOGIN_URL, values);

  if (result.data.result == true) 
  {
    localStorage.setItem(admin.USERNAME, result.data.admin.eng_firstname);
    localStorage.setItem(admin.TOKEN_KEY, result.data.token);
    localStorage.setItem(admin.ROLE, result.data.admin.role)
    router.push("/user_list")
    return true;
  } else {
    return false;
  }
 };

