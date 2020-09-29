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
import User_List_Eng from "@/views/User_list_Engineer.vue"
import User_List_Pro from "@/views/User_list_Production.vue"
import Profile_show_engineer from "@/views/Profile_show_engineer.vue"
import Profile_show_production from "@/views/Profile_show_production.vue"
import Admin_login from "@/views/admin/loginAdmin.vue"
import Admin_home from "@/views/admin/homeAdmin.vue"
import quiz_add from "@/views/admin/quiz_add.vue"
import quiz_list  from "@/views/admin/quiz_list.vue"
import quiz_show  from "@/views/admin/quiz_show.vue"
import quiz_edit  from "@/views/admin/quiz_edit.vue" 
import depart_list from "@/views/admin/depart_list.vue"
import user_doing_list from "@/views/user_quiz/user_doing_list.vue"
import user_start_quiz from "@/views/user_quiz/user_start_quiz.vue"


import page1  from "@/views/test/page1.vue"
import page2  from "@/views/test/page2.vue"
Vue.use(VueRouter);
const routes = [
  {
    path: "/page1",
    name: "page1",
    component: page1,
    props: true
  },
  {
    path: "/page2",
    name: "page2",
    component: page2,
    props: true
  },
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
    path: "/user_list_engineer",
    name: "user_list_engineer",
    component : User_List_Eng
  },
  {
    path: "/user_list_production",
    name: "user_list_production",
    component : User_List_Pro
  },
  {   
    path: "/profile_show_engineer/:_id",
    name: "profile_show_engineer",
    component:Profile_show_engineer,
  },
  {   
    path: "/profile_show_production/:_id",
    name: "profile_show_production",
    component:Profile_show_production
  },
  {
    path: "/admin_login",
    name: "admin_login",
    component: Admin_login 
  },
  {
    path: "/admin_home",
    name: "admin_home",
    component: Admin_home 
  },
  {
    path : "/quiz_add",
    name : "quiz_add",
    component: quiz_add 
  },
  {
    path : "/quiz_list",
    name : "quiz_list",
    component: quiz_list,
    props: true
  },
  {
    path : "/quiz_show",
    name : "quiz_show",
    component : quiz_show,
    props :true 
  },
  {
    path : "/quiz_edit",
    name : "quiz_edit",
    component : quiz_edit,
    props :true 
  },
  {
    path: "/test",
    name: "test",
    component: Test
  },
  {
    path: "/depart_list",
    name: "depart_list",
    component : depart_list
  },
  {
    path: "/user_doing_list/:_id",
    name: "user_doing_list",
    component : user_doing_list
  },
  {
    path : "/user_start_quiz",
    name : "user_start_quiz",
    component : user_start_quiz,
    props :true 
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
