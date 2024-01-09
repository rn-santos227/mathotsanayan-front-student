import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuthModule } from "@/store";

import AuthView from "@/views/auth/MainView.vue";
import ExamModule from "@/views/exam/MainView.vue";
import ModulesView from "@/views/modules/MainView.vue";
import ProfileView from "@/views/profile/MainView.vue";
import ProgressView from "@/views/progress/MainView.vue";

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
    path: "/exam/:id",
    name: "exam",
    component: ExamModule,
    meta: {
      forAuth: true,
    },
  },
  {
    path: "/modules",
    name: "modules",
    component: ModulesView,
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
    next("/");
  } else if (to.matched.length === 0) {
    next("/");
  } else {
    next();
  }
});

export default router;
