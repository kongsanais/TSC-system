//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE = "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE = "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE = "An error has occurred. The photo was unable to upload.";
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

export const apiUrl = "http://localhost:3000";
export const imageUrl = "http://localhost:3000/images";
export const resumeUrl = "http://localhost:3000/resume"




export const server = {
  LOGIN_URL: `users/login`,
  REGISTER_URL: `users`,
  USER_PROFILE: `users/profile`,
  LOGOUT_URL: `users/logout`,
  UPDATE_PROFILE: `users/update`, 
  GET_ALL_APP: `users/all`, 
  GET_ALL_APP_BY_DATE: 'users/allByDate',
  GET_ONE_APP: 'users/get_appProfile',
  GET_STATUS_DATA : 'users/count_status',
  UPDATE_REG_STATUS : 'users/update_reg_status',
  TRANSACTION_URL: `transaction`,
  TOKEN_KEY: `token`,
  USERNAME: `username`
};


// location /images {
//   proxy_pass http://172.31.39.222:3000;
//   proxy_http_version 1.1;
//   proxy_set_header Upgrade $http_upgrade;
//   proxy_set_header Connection 'upgrade';
//   proxy_set_header Host $host;
//   proxy_cache_bypass $http_upgrade;
// }

// location /resume {
//   proxy_pass http://172.31.39.222:3000;
//   proxy_http_version 1.1;
//   proxy_set_header Upgrade $http_upgrade;
//   proxy_set_header Connection 'upgrade';
//   proxy_set_header Host $host;
//   proxy_cache_bypass $http_upgrade;
// }

