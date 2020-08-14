import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";
import router from "@/router";

const isLoggedIn = () => {
  let token = localStorage.getItem(server.TOKEN_KEY);
  return token != null;
};

const logoff = async () => {
  await httpClient.post(server.LOGOUT_URL);
  localStorage.removeItem(server.TOKEN_KEY);
  router.push("/login");
};



const login = async values => 
{
  let result = await httpClient.post(server.LOGIN_URL, values);
  if (result.data.result == true) 
  {
    localStorage.setItem(server.USERNAME, result.data.user.eng_firstname);
    localStorage.setItem(server.TOKEN_KEY, result.data.token);
    router.push("/profile");
    return true;
  } else {
    return false;
  }
};


const register = async values => {
  let result = await httpClient.post(server.REGISTER_URL, values);
  return result.data.result;
};

const updateProfile = async values => {
  let result = await httpClient.put(server.UPDATE_PROFILE, values);
  return result.data.result;
};

const readProfile = async () => {
  let result =  await httpClient.get(server.USER_PROFILE);
  return result.data.profile;
} 



export default {
  register,
  login,
  isLoggedIn,
  logoff,
  readProfile,
  updateProfile
};
