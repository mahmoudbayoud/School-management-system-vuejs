import { createRouter, createWebHistory } from "vue-router";
import TeacherPage from "../views/TeacherPage.vue";
import StudentPage from "../views/StudentPage.vue";
import login from "../views/LoginPage.vue";
import AddTeacherPage from "../views/AddTeacherPage.vue";
import ConfirmAddTeacherPage from "../views/ConfirmAddTeacherPage.vue";
import ConfirmAddStudentPage from "../views/ConfirmAddStudentPage.vue";
import ConfirmAddBusDriverPage from "../views/ConfirmAddBusDriverPage.vue";
import logout from "../views/LogoutPage.vue";
import ClassPage from "../views/ClassPage.vue";
import TeacherDetails from "../views/TeacherDetails.vue";
import StudentDetails from "../views/StudentDetails.vue";
import AddStudentPage from "../views/AddStudentPage.vue";
import HomePage from "../views/HomePage.vue";
import BusDriverPage from "../views/BusDriverPage.vue";
import AddBusDriverPage from "../views/AddBusDriverPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import FoodPage from "../views/FoodPage.vue";
import FoodDayPage from "../views/FoodDayPage.vue";
import AddFoodPage from "../views/AddFoodPage.vue";
import WeekSchPage from "../views/WeekSchPage.vue";
const routes = [
  {
    path: "/",
    redirect: "/HomePage",
  },
  {
    path: "/TeacherPage",
    name: "TeacherPage",
    component: TeacherPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/WeekSchPage",
    name: "WeekSchPage",
    component: WeekSchPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/FoodPage/AddFoodPage",
    name: "AddFoodPage",
    component: AddFoodPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/FoodPage/FoodDayPage",
    name: "FoodDayPage",
    component: FoodDayPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/FoodPage",
    name: "FoodPage",
    component: FoodPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/ProfilePage",
    name: "ProfilePage",
    component: ProfilePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/BusDriverPage/ConfirmAddBusDriverPage",
    name: "ConfirmAddBusDriverPage",
    component: ConfirmAddBusDriverPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/BusDriverPage/AddBusDriverPage",
    name: "AddBusDriverPage",
    component: AddBusDriverPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/BusDriverPage",
    name: "BusDriverPage",
    component: BusDriverPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/HomePage",
    name: "HomePage",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/TeacherPage/TeacherDetails",
    name: "TeacherDetails",
    component: TeacherDetails,
    meta: { requiresAuth: true },
  },
  {
    path: "/StudentPage/StudentDetails",
    name: "StudentDetails",
    component: StudentDetails,
    meta: { requiresAuth: true },
  },
  {
    path: "/StudentPage/AddStudentPage",
    name: "AddStudentPage",
    component: AddStudentPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/ClassPage",
    name: "ClassPage",
    component: ClassPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/logout",
    name: "logout",
    component: logout,
    meta: { requiresAuth: true },
  },
  {
    path: "/TeacherPage/Add",
    name: "AddTeacherPage",
    component: AddTeacherPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/TeacherPage/ConfirmAddTeacherPage",
    name: "ConfirmAddTeacherPage",
    component: ConfirmAddTeacherPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/StudentPage/ConfirmAddStudentPage",
    name: "ConfirmAddStudentPage",
    component: ConfirmAddStudentPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/StudentPage",
    name: "StudentPage",
    component: StudentPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: { noLayout: true },
  },
  {
    path: "/logout",
    name: "logout",
    component: logout,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("auth_token");
  if (to.meta.requiresAuth && !token) {
    next({ name: "login" });
  } else {
    next();
  }
});
export default router;
