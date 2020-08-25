import Vue from "vue";
import Vuex from "vuex";
import api from "@/services/api";
import { server } from "@/services/constants";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    username: "",
    role:""
  },  
  getters: {
    isLogin(state) {
      return state.isLogged;
    },
    username(state) {
      return state.username;
    }
  },
  mutations: {
    SET_LOGGED_IN(state){
      state.isLogged = true
    },
    SET_LOGGED_OUT(state) {
      state.isLogged = false;
    },
    SET_USERNAME(state, value){
      state.username = value
    }
  },
  actions: {
    async doLogin({ commit, dispatch }, { email, password }) 
    {
      let result = await api.login({ email, password });
      if (result == true) {
        commit("SET_LOGGED_IN");
        let username = localStorage.getItem(server.USERNAME);
        commit("SET_USERNAME", username);
      } 
      // else {
      //   dispatch("doLogout", {});
      // }
    },
    doLogout({ commit }) {
      api.logoff();
      commit("SET_LOGGED_OUT");
      commit("SET_USERNAME","");
    },
    restoreLogin({ commit }) {
      if (api.isLoggedIn() == true) {
        let username = localStorage.getItem(server.USERNAME);
        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
      }
    },
  },
  modules: {}
});