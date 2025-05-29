<template>
  <v-dialog
    v-model="dialogLogout"
    width="400"
    height="250"
    style="font-family: 'Cairo'"
  >
    <v-card class="rounded-xl">
      <!-- Custom Header with Icon and Background -->
      <div
        class="d-flex align-center px-4 py-3"
        style="
          background-color: #800080;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          display: flex;
          color: white;
          justify-content: center;
        "
      >
        <v-icon
          color="white"
          class="mr-2"
          style="width: 32px; height: 32px; margin-top: 5px"
          >mdi-alert-circle</v-icon
        >
        <span
          class="white--text font-weight-bold"
          style="font-family: 'Cairo'; font-size: 20px"
          >تسجيل الخروج</span
        >
      </div>

      <v-card-text
        style="
          display: flex;
          justify-content: end;
          margin-top: 32px;
          font-weight: normal;
          font-size: 16px;
        "
        >هل انت متاكد من تسجيل الخروج؟</v-card-text
      >

      <v-card-actions>
        <v-spacer></v-spacer>
        <div style="font-family: 'Cairo'; margin-bottom: 32px">
          <v-btn color="grey" text @click="dialogLogout = false">الغاء</v-btn>
          <v-btn color="#800080" text @click="logout">تسجيل الخروج</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import useGetDataMixin from "@/mixins/useGetDataMixin";
import usePostDataMixin from "@/mixins/usePostDataMixin";
export default {
  mixins: [useGetDataMixin, usePostDataMixin],
  data() {
    return {
      dialogLogout: true,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("userData");
      this.$router.push({ name: "login" });
    },
  },
};
</script>
