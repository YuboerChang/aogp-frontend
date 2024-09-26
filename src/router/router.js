import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home";
import gpHistory from "@/views/gp-history.vue";

let routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
    children: [
      {
        path: "/gpHistory",
        name: "gpHistory",
        component: gpHistory,
      },
    ],
  },
];

let router = createRouter({
  routes,
  history: createWebHistory(),
  linkActiveClass: "active",
});

export default router;
