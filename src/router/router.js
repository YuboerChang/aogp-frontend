import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home";
import gpHistory from "@/views/gp-history";
import investmentAdvise from "@/views/investment-advise";
import calculationProfit from "@/views/calculation-profit";

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
      {
        path: "/calculationProfit",
        name: "calculationProfit",
        component: calculationProfit,
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
