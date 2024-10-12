import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home";
import gpHistory from "@/views/gp-history";
import investmentAdvise from "@/views/investment-advise";

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
      {
        path: "/investmentAdvise",
        name: "investmentAdvise",
        component: investmentAdvise,
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
