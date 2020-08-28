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
    let role =  result.data.user.role;

    if(role == "Engineer" || role == "Production"){
      router.push("/profile");
    }else if (role == "Admin"){
      router.push("/user_list")
    }

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

const getAllApplicant  = async () => {
  let result  =  await httpClient.get(server.GET_ALL_APP);
  return result.data.all_user;
}

const getAllApplicantByDate = async values => {
  let result  =  await  httpClient.post(server.GET_ALL_APP_BY_DATE,values);
  return result.data.all_user_bydate;
}


const getOneApplicant = async _id  => {
  let result  =  await httpClient.get(server.GET_ONE_APP + "/" +`${_id}`);
  return result.data.one_user;
}

const getStatusData  = async () => {
  let result  =  await httpClient.get(server.GET_STATUS_DATA);
  return result.data;
}


const updateRegStatus = async values => {
  let result  =  await  httpClient.put(server.UPDATE_REG_STATUS,values);
  return result.data.result;
}




export default {
  getStatusData,
  getOneApplicant,
  register,
  login,
  isLoggedIn,
  logoff,
  readProfile,
  updateProfile,
  getAllApplicant,
  getAllApplicantByDate,
  updateRegStatus
};
