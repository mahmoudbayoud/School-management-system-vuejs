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
import ExamSchPage from "../views/ExamSchPage.vue";
import Schedules from "../views/SchedulesPage.vue";
import SelectDivisonAndClassPageSchW from "../views/SelectDivisonAndClassPageSchW.vue";
import SelectDivisonAndClassPageSchE from "../views/SelectDivisonAndClassPageSchE.vue";
import StudentAllDetailsPage from "../views/StudentAllDetailsPage.vue";
import activityPage from "@/views/activityPage.vue";
import CustomerSupportPage from "@/views/CustomerSupportPage.vue";
import StepperView from "../views/StepperView.vue";
import AddActivityPage from "../views/AddActivityPage.vue";
import settingsPage from "../views/settingsPage.vue";
import DashboardPage from "../views/DashboardPage.vue";
import PostsPage from "../views/PostsPage.vue";
import PublicPostsPage from "../views/PublicPostsPage.vue";
import PrivatePostsPage from "../views/PrivatePostsPage.vue";
import SectionDetails from "../views/SectionDetails.vue";
import commentsPage from "../views/commentsPage.vue";
import StudentMarksPage from "../views/StudentMarksPage.vue";
import MarksPage from "../views/MarksPage.vue";
import SectionDetailsMarksPage from "../views/SectionDetailsMarksPage.vue";
import AttenedencePage from "../views/AttenedencePage.vue";
import ReprotPage from "../views/ReprotPage.vue";
const routes = [
  {
    path: "/",
    redirect: "/HomePage",
  },
  { path: "/step1", component: StepperView },
  { path: "/step2", component: StepperView },
  {
    path: "/ReprotPage",
    name: "ReprotPage",
    component: ReprotPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/StudentPage/StudentDetails/AttenedencePage",
    name: "AttenedencePage",
    component: AttenedencePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/TeacherPage",
    name: "TeacherPage",
    component: TeacherPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/MarksPage",
    name: "MarksPage",
    component: MarksPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/MarksPage/SectionDetailsMarksPage",
    name: "SectionDetailsMarksPage",
    component: SectionDetailsMarksPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/commentsPage",
    name: "commentsPage",
    component: commentsPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/MarksPage/StudentMarksPage",
    name: "StudentMarksPage",
    component: StudentMarksPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/ClassPage/SectionDetails",
    name: "SectionDetails",
    component: SectionDetails,
    meta: { requiresAuth: true },
  },
  {
    path: "/PostsPage/PublicPostsPage",
    name: "PublicPostsPage",
    component: PublicPostsPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/PostsPage/PrivatePostsPage",
    name: "PrivatePostsPage",
    component: PrivatePostsPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/PostsPage",
    name: "PostsPage",
    component: PostsPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/DashboardPage",
    name: "DashboardPage",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/CustomerSupportPage",
    name: "CustomerSupportPage",
    component: CustomerSupportPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/settingsPage",
    name: "settingsPage",
    component: settingsPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/activityPage",
    name: "activityPage",
    component: activityPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/AddActivityPage",
    name: "AddActivityPage",
    component: AddActivityPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/StudentPage/StudentAllDetailsPage",
    name: "StudentAllDetailsPage",
    component: StudentAllDetailsPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/Schedules/SelectDivisonAndClassPageSchW",
    name: "SelectDivisonAndClassPageSchW",
    component: SelectDivisonAndClassPageSchW,
    meta: { requiresAuth: true },
  },
  {
    path: "/Schedules/SelectDivisonAndClassPageSchE",
    name: "SelectDivisonAndClassPageSchE",
    component: SelectDivisonAndClassPageSchE,
    meta: { requiresAuth: true },
  },
  {
    path: "/Schedules/WeekSchPage",
    name: "WeekSchPage",
    component: WeekSchPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/Schedules",
    name: "Schedules",
    component: Schedules,
    meta: { requiresAuth: true },
  },
  {
    path: "/Schedules/ExamSchPage",
    name: "ExamSchPage",
    component: ExamSchPage,
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
