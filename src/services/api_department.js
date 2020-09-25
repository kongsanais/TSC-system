import httpClient from "@/services/httpClient";
import { department } from "@/services/constants";
import router from "@/router";


export const addDepart = async values => {
    let result  =  await  httpClient.post(department.ADD_DEPART,values);
    return result;
}


export const removeDepart = async values => {
    let result  =  await  httpClient.post(department.REMOVE_DEPART,values);
    return result.data;
}

export const getDepartlist  = async () => {
    let result  =  await httpClient.get(department.DEPARTMENT_LIST);
    return result.data.Dep_list;
}


export const getOnlydepart  = async () => {
    let result  =  await httpClient.get(department.DEPARTMENT_ONLY);
    return result.data.Dep_list;
}


export const getDoingquiz = async _id  => {
    let result  =  await httpClient.get(department.GET_DOING_QUIZ + "/" +`${_id}`);
    return result.data;
  }








