/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Employer from "@/components/Employer";
import Test from "@/components/Test";
import Search from "@/components/Search";
import Profile from "@/components/Profile";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld,
    },
    {
      path: "/employer/:id",
      name: "Employer",
      component: Employer,
    },
    {
      path: "/test",
      name: "Test",
      component: Test,
    },
    {
      path: "/search",
      name: "search",
      component: Search,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
  ],
});
