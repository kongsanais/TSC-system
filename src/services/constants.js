//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE = "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE = "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE = "An error has occurred. The photo was unable to upload.";
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";


export const apiUrl = "http://localhost:3000";
export const imageUrl = "http://localhost:3000/images";
export const resumeUrl = "http://localhost:3000/resume"


export const server = {
  LOGIN_URL: `api/users/login`,
  REGISTER_URL: `api/users`,
  USER_PROFILE: `api/users/profile`,
  LOGOUT_URL: `api/users/logout`,
  UPDATE_PROFILE: `api/users/update`, 
  GET_ALL_APP: `api/users/all/engineer`, 
  GET_ALL_APP_BY_DATE: 'api/users/allByDate',
  GET_ONE_APP: 'api/users/get_appProfile',
  GET_STATUS_DATA : 'api/users/count_status',
  GET_STATUS_DATA_REG_YEAR : 'api/users/count_reg_year',
  GET_DATA_EXPORT_EXCEL: 'api/users/get_json_export',
  UPDATE_REG_STATUS : 'api/users/update_reg_status',
  ROLE:'role',
  TRANSACTION_URL: `transaction`,
  TOKEN_KEY: `token`,
  USERNAME: `username`
};

export const admin = {
  REGISTER_URL : 'api/admin/register',
  LOGIN_URL : 'api/admin/login',
  LOGOUT_URL : 'api/admin/logout',
  TOKEN_KEY: `token`,
  USERNAME: `username`,
  ROLE:'role'
}

export const report = {
  USER_LIST : 'api/report/alluser',
  USER_LIST_ENGINEER : 'api/report/alluser/engineer',
  USER_LIST_PRODUCTION : 'api/report/alluser/production',
  USER_LIST_BYDATE : 'api/report/alluserByDate',
  COUNT_STATUS : 'api/report/count_status',
  COUNT_STATUS_ENGINEER : 'api/report/count_status/engineer',
  COUNT_STATUS_PRODUCTION : 'api/report/count_status/production',
  COUNT_REG_12_MONTH : 'api/report/count_reg_year',
  COUNT_REG_12_MONTH_ENGINEER : 'api/report/count_reg_year/engineer',
  COUNT_REG_12_MONTH_PRODUCTION : 'api/report/count_reg_year/production',
  COUNT_ALL_USER : 'api/report/count_all_user',
  COUNT_ALL_USER_BY_ROLE : 'api/report/count_all_user_by_role',
  COUNT_GET_JSON_EXPORT_PRODUCTION : 'api/report/get_json_export/production'
}



