<template>
  <div class="layout">
    <v-layout>
      <v-app-bar
        height="97"
        id="nav-bar"
        color="#903594"
        dark
        flat
        app
        class="justify-center"
      >
        <!-- Left side: مدارسكم -->
        <img
          src="../assets/Icons/knowledge-book-education-learning-books-svgrepo-com 1.svg"
          style="width: 36px; margin-left: 16px"
        />
        <img
          src="../assets/Icons/Group 12 1.svg"
          style="width: 36px; margin-left: 10px"
        />
        <div
          class="position-absolute left-12 ml-24"
          style="margin-left: 100px; font-size: 22px; font-weight: bold"
        >
          مدارسكم
        </div>
        <!-- Spacer to push center content -->
        <img
          src="../assets/Icons/student-person-part-2-svgrepo-com 1.svg"
          style="width: 36px; margin-left: 100px; margin-top: 10px"
        />
        <!-- Center: تطبيق ادارة المدارس -->
        <div style="font-size: 24px; font-weight: bold; margin-left: 615px">
          تطبيق ادارة المدارس
        </div>

        <!-- Right side: تسجيل الدخول -->
        <div
          class="position-absolute right-0 mr-4"
          style="font-weight: bold; font-size: 22px"
        >
          تسجيل الدخول
        </div>
      </v-app-bar>

      <v-container
        class="d-flex flex-column align-center justify-center"
        style="height: 100vh"
      >
        <!-- Welcome -->
        <div
          style="
            margin-bottom: 16px;
            margin-top: 32px;
            font-size: 22px;
            font-weight: bold;
          "
        >
          مرحبا بك في لوحة التحكم المدرسية
        </div>
        <div
          class="centered-text"
          style="margin-bottom: 16px; font-size: 16px; font-weight: normal"
        >
          يرجى تسجيل الدخول للوصول الى حسابك
        </div>

        <!-- Login Card -->
        <v-card
          elevation="2"
          width="700"
          height="452"
          class="pa-6"
          style="border-radius: 12px"
        >
          <img
            src="../assets/Icons/ssa.svg"
            alt="User Icon"
            style="margin-bottom: 16px"
            width="200"
          />

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="form.email"
              placeholder="البريد الالكتروني"
              :rules="emailRules"
              validate-on="blur"
              rounded="md"
              variant="outlined"
              style="
                width: 600px;
                height: 80px;
                margin-top: 30px;
                margin-bottom: 46px;
                padding-left: 40px;
                text-align: right;
              "
              required
              dir="rtl"
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              placeholder="كلمة المرور"
              type="password"
              dir="rtl"
              :rules="passwordRules"
              validate-on="blur"
              style="
                width: 600px;
                height: 80px;
                margin-top: -32px;
                margin-bottom: 10px;
                padding-left: 40px;
                text-align: right;
              "
              variant="outlined"
              rounded="md"
              required
            ></v-text-field>
          </v-form>

          <v-btn
            class="btn"
            color="#800080"
            @click="submitForm"
            style="
              width: 250px;
              height: 45px;
              font-size: 16px;
              font-weight: normal;
            "
          >
            تسجيل الدخول
          </v-btn>
        </v-card>
      </v-container>

      <!-- Dialog for login error -->
      <v-dialog
        v-model="errorDialog"
        max-width="500"
        height="300"
        persistent
        style="font-family: Cairo, sans-serif"
      >
        <v-card class="pa-6" style="border-radius: 16px; text-align: center">
          <div class="d-flex justify-center">
            <v-icon size="120" color="#800080">mdi-alert-circle</v-icon>
          </div>
          <div
            style="
              margin-top: 45px;
              font-size: 18px;
              font-weight: bold;
              color: #333;
            "
          >
            فشل تسجيل الدخول: تأكد من البريد وكلمة المرور
          </div>
          <v-btn
            color="#800080"
            class="mt-6"
            variant="elevated"
            @click="errorDialog = false"
          >
            إغلاق
          </v-btn>
        </v-card>
      </v-dialog>

      <v-footer :app="true"><p>ds</p></v-footer>
    </v-layout>
  </div>
</template>

<script>
import useGetDataMixin from "@/mixins/useGetDataMixin";
import usePostDataMixin from "@/mixins/usePostDataMixin";

export default {
  mixins: [useGetDataMixin, usePostDataMixin],
  data() {
    return {
      data: [],
      form: {
        email: "",
        password: "",
        type: "3",
      },
      valid: false,
      errorDialog: false, // للتحكم بفتح وغلق الديالوج
      emailRules: [
        (v) => !!v || "البريد الإلكتروني مطلوب",
        (v) => /.+@.+\..+/.test(v) || "يجب إدخال بريد إلكتروني صحيح",
      ],
      passwordRules: [
        (v) => !!v || "كلمة المرور مطلوبة",
        (v) => v.length >= 8 || "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
      ],
    };
  },
  methods: {
    async submitForm() {
      const isValid = this.$refs.form.validate();
      if (!isValid) {
        return;
      }

      await this.sendData("/login", this.form);
      const token = this.postData.token;
      const userData = this.postData.data;

      if (token && userData) {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("userData", JSON.stringify(userData));
        this.$router.push({ name: "HomePage" });
      } else {
        console.error("فشل تسجيل الدخول إلى Laravel");
        this.errorDialog = true; // فتح الديالوج بدل alert
      }
    },
  },
};
</script>

<style scoped>
#nav-bar {
  font-family: "Cairo", sans-serif;
  font-weight: bold;
  font-size: 15px;
  line-height: 1.2;
}
.btn {
  font-family: "Cairo", sans-serif;
  font-weight: normal;
  font-size: 12px;
  padding-left: 34px;
  padding-right: 34px;
  margin-top: 16px;
}
.centered-text {
  font-family: "Cairo", sans-serif;
  font-size: 12px;
  color: gray;
  font-weight: normal;
}
.custom-input :deep(.v-label) {
  direction: rtl;
  text-align: right;
  right: 0;
  left: auto;
  font-family: "Cairo", sans-serif;
  font-size: 13px;
  color: gray;
  font-weight: normal;
}
.custom-input :deep(input) {
  height: 50px;
  line-height: 32px;
  padding-top: 0px;
  padding-bottom: 0px;
}
.custom-input :deep(.v-field__input) {
  min-height: 32px;
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>
