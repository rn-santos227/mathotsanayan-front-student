import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import AuthView from "@/views/auth/MainView.vue";
import ExamsView from "@/views/exams/MainView.vue";
import ProfileView from "@/views/profile/MainView.vue";
import ProgressView from "@/views/progress/MainView.vue";

import { useAuthModule } from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "profile",
    component: ProfileView,
    meta: {
      forAuth: true,
    },
  },
  {
    path: "/progress",
    name: "progress",
    component: ProgressView,
    meta: {
      forAuth: true,
    },
  },
  {
    path: "/exams",
    name: "exams",
    component: ExamsView,
    meta: {
      forAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: AuthView,
    meta: {
      forVisitors: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthModule();
  if (to.meta.forAuth && !authStore.isAuthenticated) {
    next("/login");
  } else if (to.meta.forVisitors && authStore.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
