import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";
import * as apiAdmin from "@/services/api_admin.js"
import * as apiReport  from "@/services/api_report.js"
import * as apiQuiz  from "@/services/api_quiz.js"
import * as apiDepart  from "@/services/api_department.js"

import router from "@/router";

const isLoggedIn = () => {
  let token = localStorage.getItem(server.TOKEN_KEY);
  return token != null;
};

const getRole = () => {
  let role = localStorage.getItem(server.ROLE);
  return role;
};

const logoff = async () => {
  localStorage.removeItem(server.TOKEN_KEY);
  localStorage.removeItem(server.ROLE);
  await httpClient.post(server.LOGOUT_URL);
  router.push("/login");
};


const login = async values => 
{
  let result = await httpClient.post(server.LOGIN_URL, values);
  if (result.data.result == true) 
  {
    localStorage.setItem(server.USERNAME, result.data.user.eng_firstname);
    localStorage.setItem(server.TOKEN_KEY, result.data.token);
    localStorage.setItem(server.ROLE, result.data.user.role)
    let role =  result.data.user.role;

    if(role == "Engineer" || role == "Production")
    {
      router.push("/profile");
    }
    else if (role == "Admin")
    {
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


const getOneApplicant = async _id  => {
  let result  =  await httpClient.get(server.GET_ONE_APP + "/" +`${_id}`);
  return result.data.one_user;
}

const getStatusData  = async () => {
  let result  =  await httpClient.get(server.GET_STATUS_DATA);
  return result.data;
}

const getRegYear = async () => {
  let result  =  await httpClient.get(server.GET_STATUS_DATA_REG_YEAR);
  return result.data;
}

const getJSON_Export =  async values => {
  let result  =  await httpClient.post(server.GET_DATA_EXPORT_EXCEL,values);
  return result.data;
}


const updateRegStatus = async values => {
  let result  =  await  httpClient.put(server.UPDATE_REG_STATUS,values);
  return result.data.result;
}


const deleteUserData = async values =>  {
  let result  =  await  httpClient.post(server.DELETE_USER,values);
  return result.data;
}



export default {
  getJSON_Export,
  getStatusData,
  getRegYear,
  getOneApplicant,
  getRole,
  register,
  login,
  isLoggedIn,
  logoff,
  readProfile,
  updateProfile,
  getAllApplicant,
  updateRegStatus,
  deleteUserData,
  ...apiAdmin,
  ...apiReport,
  ...apiQuiz,
  ...apiDepart
};
