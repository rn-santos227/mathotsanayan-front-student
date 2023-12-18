import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import AuthView from "@/views/auth/MainView.vue";
import ExamModule from "@/views/exam/MainView.vue";
import ModulesView from "@/views/modules/MainView.vue";
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
      isExam: false,
    },
  },
  {
    path: "/exam/:id",
    name: "exam",
    component: ExamModule,
    meta: {
      forAuth: true,
      isExam: true,
    },
  },
  {
    path: "/modules",
    name: "modules",
    component: ModulesView,
    meta: {
      forAuth: true,
      isExam: false,
    },
  },
  {
    path: "/progress",
    name: "progress",
    component: ProgressView,
    meta: {
      forAuth: true,
      isExam: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: AuthView,
    meta: {
      forVisitors: true,
      isExam: false,
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
