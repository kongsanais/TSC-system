import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Job from "@/views/Job.vue";
import Register_Eng from "@/views/Register_Eng.vue"
import Register_Pro from "@/views/Register_Pro.vue"
import Option_job from "@/views/Option_job.vue"
import Test from "@/views/Test_view.vue"
import About from "@/views/About.vue"
import Login from "@/views/Login.vue"
import Profile from "@/views/Profile.vue"
import Profile_update from "@/views/Profile_update.vue"
import User_list from "@/views/User_list.vue"
Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/job",
    name: "job",
    component: Job
  },
  {
    path: "/register_engineer",
    name: "register_engineer",
    component: Register_Eng
  },
  {
    path: "/register_production",
    name: "register_production",
    component: Register_Pro
  },
  {
    path: "/option_job",
    name: "option_job",
    component: Option_job
  },
  {
    path: "/about",
    name: "about",
    component:About
  },
  {
    path: "/login",
    name: "login",
    component:Login 

  },
  {
    path: "/profile",
    name: "profile",
    component : Profile
  },
  {
    path: "/profile_update",
    name: "profile_update",
    component : Profile_update
  },
  {
    path: "/user_list",
    name: "user_list",
    component : User_list
  },
  {
    path: "/test",
    name: "test",
    component: Test
  },
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "*",
    redirect: "/home"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
