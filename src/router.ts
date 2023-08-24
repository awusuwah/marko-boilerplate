import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Components from "./pages/Components.vue";

// All the routes which are available in the app
const routes = [
  { path: "/", component: Home },
  { path: "/components", component: Components },
];

// Configure & export the router
export default createRouter({
  history: createWebHistory(),
  routes,
});
