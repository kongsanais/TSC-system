import httpClient from "@/services/httpClient";
import { quiz } from "@/services/constants";
import router from "@/router";


export const getReportAllAppbyDate = async values => {
    let result  =  await  httpClient.post(quiz.ADD_QUIZ,values);
    return result;
}