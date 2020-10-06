import httpClient from "@/services/httpClient";
import { report } from "@/services/constants";
import router from "@/router";


export const getReportAllApplicant  = async () => {
    let result  =  await httpClient.get(report.USER_LIST);
    return result.data.all_user;
}

export const getReportAllEngineer  = async () => {
    let result  =  await httpClient.get(report.USER_LIST_ENGINEER);
    return result.data.all_user;
}

export const getReportAllProduction  = async () => {
    let result  =  await httpClient.get(report.USER_LIST_PRODUCTION);
    return result.data.all_user;
}

export const getReportAllAppbyDate = async values => {
    let result  =  await  httpClient.post(report.USER_LIST_BYDATE,values);
    return result.data.all_user_bydate;
}

export const getReportStatusData  = async () => {
    let result  =  await httpClient.get(report.GET_STATUS_DATA);
    return result.data;
}


export const getReportStatusEngineer = async () => {
    let result  =  await httpClient.get(report.COUNT_STATUS_ENGINEER);
    return result.data;
}


export const getReportStatusProduction  = async () => {
    let result  =  await httpClient.get(report.COUNT_STATUS_PRODUCTION);
    return result.data;
}


export const getReportRegYear = async () => {
    let result  =  await httpClient.get(report.COUNT_REG_12_MONTH);
    return result.data;
}


export const getReportRegYearEngineer = async () => {
    let result  =  await httpClient.get(report.COUNT_REG_12_MONTH_ENGINEER);
    return result.data;
}


export const getReportRegYearProduction = async () => {
    let result  =  await httpClient.get(report.COUNT_REG_12_MONTH_PRODUCTION);
    return result.data;
}


export const getReportCountAll = async () => {
    let result  =  await httpClient.get(report.COUNT_ALL_USER);
    return result.data;
}


export const getReportCountRole = async () => {
    let result  =  await httpClient.get(report.COUNT_ALL_USER_BY_ROLE);
    return result.data;
}


export const getJSON_Export_Production  =  async values  => {
    let result  =  await httpClient.post(report.COUNT_GET_JSON_EXPORT_PRODUCTION,values);
    return result.data;
}


export const getJSON_Export_Engineer =  async values  => {
    let result  =  await httpClient.post(report.COUNT_GET_JSON_EXPORT_ENGINEER,values);
    return result.data;
}


/*find user list with date (Engineer) */
export const getAllApplicantByDate_Engineer = async values => {
    let result  =  await  httpClient.post(report.GET_USER_LIST_BY_DATE_ENGINEER,values);
    return result.data.all_user_bydate;
}


/*find user list with date (Production) */
export const getAllApplicantByDate_Production = async values => {
    let result  =  await  httpClient.post(report.GET_USER_LIST_BY_DATE_PRODUCTION,values);
    return result.data.all_user_bydate;
}