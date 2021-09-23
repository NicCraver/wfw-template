import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Home,
  },
  {
    path: "/Menu1-1/Menu1-1-1",
    name: "Menu1",
    component: () => import("../views/Menus/Menu1-1-1"),
  },
  {
    path: "/Menu1-2",
    name: "Menu1-2",
    component: () => import("../views/Menus/Menu1-2"),
  },
  {
    path: "/GlobalState",
    name: "GlobalState",
    component: () => import("../views/Examples/GlobalState/index"),
  },
  {
    path: "/Test1",
    name: "Test1",
    component: () => import("../views/Examples/Test1/index"),
  },
];

export default routes;
