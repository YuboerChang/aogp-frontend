import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home";
import goldPriceHistory from "@/views/goldPriceHistory.vue";

let routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
    children: [
      {
        path: "/goldPriceHistory",
        name: "goldPriceHistory",
        component: goldPriceHistory,
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
