import httpClient from "@/services/httpClient";
import { quiz } from "@/services/constants";
import router from "@/router";

export const addQuiz = async values => {
    let result  =  await  httpClient.post(quiz.ADD_QUIZ,values);
    return result.data.result;
}

export const editQuiz = async values => {
    let result  =  await  httpClient.post(quiz.EDIT_QUIZ,values);
    return result.data.result;
}

export const addQuestion = async values => {
    let result  =  await httpClient.post(quiz.ADD_QUESTION,values);
    return result.data
}  


export const removeQuiz = async values => {
    let result  =  await httpClient.post(quiz.REMOVE_QUIZ,values);
    return result.data
}   


export const removeQuestion = async values => {
    let result  =  await httpClient.post(quiz.REMOVE_QUESTION,values);
    return result.data
}   


export const getAllQuizlist  = async () => {
    let result  =  await httpClient.get(quiz.QUIZ_LIST);
    return result.data.quiz_list;
}


export const getquizShow = async values => {
    let result  =  await httpClient.post(quiz.QUIZ_SHOW,values);
    return result.data.show_quiz;
} 

export const saveScore = async values => {
    let result  =  await  httpClient.post(quiz.QUIZ_SAVE_SCORE,values);
    return result.data;
}


export const removeScore = async values => {
    let result  =  await  httpClient.post(quiz.QUIZ_REMOVE_SCORE,values);
    return result.data;
}

export const getHisAns = async values => {
    let result  =  await  httpClient.post(quiz.QUIZ_ANS_HISTORY,values);
    return result.data;
}