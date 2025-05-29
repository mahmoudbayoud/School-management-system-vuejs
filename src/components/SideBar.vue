<template>
  <v-navigation-drawer class="custom-drawer" location="right">
    <v-list>
      <v-list-item v-for="(item, index) in buttons" :key="index">
        <v-btn
          block
          class="custom-btn"
          :class="{ 'active-btn': activeButton === index }"
          @click="navigateTo(index)"
          flat
          style="margin-bottom: 12px !important; text-transform: none"
        >
          <v-icon
            class="custom-icon"
            :class="{ 'active-text': activeButton === index }"
            start
          >
            {{ item.icon }}
          </v-icon>
          <span
            class="custom-text"
            :class="{ 'active-text': activeButton === index }"
          >
            {{ item.text }}
          </span>
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      buttons: [
        {
          icon: "mdi-home-outline",
          text: "الصفحة الرئيسية",
          route: "/HomePage",
        },
        {
          icon: "mdi-account-school-outline",
          text: "ادارة الطلاب",
          route: "/StudentPage",
        },
        {
          icon: "mdi-contacts-outline",
          text: "ادارة المعلمين",
          route: "/TeacherPage",
        },
        {
          icon: "mdi-view-grid-outline",
          text: "ادارة الصفوف",
          route: "/ClassPage",
        },
        {
          icon: "mdi-calendar-month-outline",
          text: "برنامج الدوام",
          route: "/WeekSchPage",
        },
        {
          icon: "mdi-bus-side",
          text: "ادارة الحافلات",
          route: "/BusDriverPage",
        },
        {
          icon: "mdi-calendar-check-outline",
          text: "ادارة النشاطات",
          route: "/activities",
        },
        {
          icon: "mdi-silverware-fork-knife",
          text: "الوجبات الغذائية",
          route: "/FoodPage",
        },
        {
          icon: "mdi-chat-processing-outline",
          text: "التواصل مع الاباء",
          route: "/parents",
        },
        {
          icon: "mdi-comment-alert-outline",
          text: "الشكاوي",
          route: "/complaints",
        },
        {
          icon: "mdi-help-circle-outline",
          text: "دعم العملاء",
          route: "/support",
        },
        { icon: "mdi-cog", text: "الاعدادات", route: "/settings" },
        { icon: "mdi-logout", text: "تسجيل الخروج", route: "/logout" },
      ],
    };
  },
  computed: {
    activeButton() {
      return this.buttons.findIndex((btn) =>
        this.$route.path.startsWith(btn.route)
      );
    },
  },
  methods: {
    navigateTo(index) {
      this.$router.push(this.buttons[index].route);
    },
  },
};
</script>

<style scoped>
.custom-drawer {
  width: 315px !important;
  height: 90vh !important;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  overflow-y: hidden !important;
  padding: 0;
}
.custom-btn {
  justify-content: flex-start;
  text-align: right;
  padding-right: 10px;
  width: 300px !important;
  height: 72px !important;
  border-radius: 8px !important;
  background: none;
  box-shadow: none;
  border: none;
  color: black;
}
.custom-icon {
  margin-right: 12px;
  margin-left: 21px;
  font-size: 26px;
}
.custom-text {
  font-size: 20px;
  font-weight: normal;
}
.custom-btn .active-text {
  font-weight: bold;
}
.active-btn {
  background-color: #800080 !important;
  color: white !important;
}
.active-btn .custom-icon,
.active-btn .custom-text {
  font-weight: bold;
}
.active-text {
  color: white !important;
}
</style>
