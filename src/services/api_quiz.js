import httpClient from "@/services/httpClient";
import { quiz } from "@/services/constants";
import router from "@/router";


export const addQuiz = async values => {
    let result  =  await  httpClient.post(quiz.ADD_QUIZ,values);
    return result;
}

export const getAllQuizlist  = async () => {
    let result  =  await httpClient.get(quiz.QUIZ_LIST);
    return result.data.quiz_list;
}