import Vue from "vue";
import Vuex from "vuex";
import api from "@/services/api";
import { server } from "@/services/constants";
import { admin } from "@/services/constants";
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
    },
    isrole(state) {
      return state.role;
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
    },
    SET_ROLE(state, value){
      state.role = value
    },
  },
  actions: {
    async doLogin({ commit, dispatch }, { email, password }) 
    {
      let result = await api.login({ email, password });

      if (result == true) {
        commit("SET_LOGGED_IN");
        let username = localStorage.getItem(server.USERNAME);
        commit("SET_USERNAME", username);
        let role = localStorage.getItem(server.ROLE);
        commit("SET_ROLE",role)
      } 
      
    },
    async doLogout({ commit }) {
      commit("SET_LOGGED_OUT");
      commit("SET_USERNAME","");
      await api.logoff();
    },
    restoreLogin({ commit }) {
      if (api.isLoggedIn() == true) {
        let username = localStorage.getItem(server.USERNAME);
        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
        let role = localStorage.getItem(server.ROLE);
        commit("SET_ROLE",role)
      }
    },
    async doLoginAdmin({ commit, dispatch }, { email, password }) 
    {
      let result = await api.loginAdmin({ email, password });

      if (result == true) {
        commit("SET_LOGGED_IN");
        let usernameAdmin = localStorage.getItem(admin.USERNAME);
        commit("SET_USERNAME", usernameAdmin);
        let role = localStorage.getItem(admin.ROLE);
        commit("SET_ROLE",role)
      } 

    },
    async doLogoutAdmin({ commit }) {
      await api.logoffAdmin();
      commit("SET_LOGGED_OUT");
      commit("SET_USERNAME","");
    },    
    restoreLoginAdmin({ commit }) {
      if (api.isLoggedIn() == true) {
        let username = localStorage.getItem(server.USERNAME);
        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
        let role = localStorage.getItem(admin.ROLE);
        commit("SET_ROLE",role)
      }
    },
  },
  modules: {
    
  }
});