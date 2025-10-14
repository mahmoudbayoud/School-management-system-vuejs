<template>
  <div class="nav-bar">
    <v-app-bar height="93.64">
      <img
        src="../assets/Icons/knowledge-book-education-learning-books-svgrepo-com 1.svg"
        style="width: 32px; margin-left: 12px"
      />
      <img
        src="../assets/Appbar/Group 1000004371.svg"
        style="width: 32px; margin-left: 8px"
      />
      <span class="D">مدارسكم</span>
      <!-- Spacer to push center content -->
      <img
        src="../assets/Appbar/student-person-part-2-svgrepo-com 1.svg"
        style="width: 32px; margin-left: 15px; margin-top: 10px"
      />
      <v-btn
        dark
        elevation="2"
        style="
          padding: 16px 24px;
          font-size: 16px;
          border-radius: 4px;
          background-color: #800080;
          color: white;
          display: flex;
          align-items: center;
          margin-left: 10px;
        "
        @click="$router.push({ name: 'ReprotPage' })"
      >
        <v-icon left>mdi-file-document-outline</v-icon>
        توليد تقرير
      </v-btn>
      <!-- Center: تطبيق ادارة المدارس -->
      <div
        class="d-flex justify-center align-center"
        style="
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 26px;
          font-weight: bold;
        "
        id="ds"
      >
        {{ school.name }}
      </div>
      <!-- Spacer to push right content -->
      <span style="margin-left: 1270px; font-size: 22px; font-weight: normal"
        >لوحة التحكم</span
      >
      <v-icon style="cursor: pointer; margin-left: 30px; font-size: 28px">
        mdi-bell-outline
      </v-icon>

      <!-- Right side: تسجيل الدخول -->
      <img
        src="../assets/school.jpg"
        style="
          width: 45px;
          height: 45px;
          margin-left: 25px;
          cursor: pointer;
          border-radius: 50%;
          object-fit: cover;
        "
        @click="dialog = true"
      />
    </v-app-bar>
    <ProfileDialog v-model="dialog" v-if="dialog" />
  </div>
</template>
<script>
import ProfileDialog from "../views/ProfilePage.vue";
export default {
  methods: {
    profile() {
      this.$router.push({ name: "ProfilePage" });
    },
    async fetchdata() {
      const storedData = await localStorage.getItem("userData");
      if (storedData) {
        this.userData = JSON.parse(storedData);
        this.school.name = this.userData.name || "";
      }
    },
  },
  components: {
    ProfileDialog,
  },
  mounted() {
    this.fetchdata();
  },
  data() {
    return {
      dialog: false,
      school: {
        name: "",
      },
    };
  },
};
</script>
<style>
.D {
  font-size: 20px;
  font-weight: bold;
  margin-left: 14px;
}
.text-h6 {
  font-size: 26px !important;
  font-weight: bold !important;
}
</style>
