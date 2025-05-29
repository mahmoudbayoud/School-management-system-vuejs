<template>
  <div dir="rtl">
    <v-container class="mt-6 gap-y-4">
      <v-row>
        <v-col>
          <div style="height: 5px"></div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-end" cols="11">
          <span
            style="
              font-size: 22px;
              font-weight: 900;
              color: #474a4c;
              margin-right: 90px;
            "
            >اضافة معلم</span
          >
        </v-col>
      </v-row>
      <v-row justify="end" style="margin-right: 201px; margin-top: 32px">
        <v-btn
          class="tab-btn"
          :class="{ active: selectedTab === 'exam' }"
          elevation="0"
          text
          @click="selectedTab = 'exam'"
        >
          <span class="tab-text">csv استيراد</span>
        </v-btn>
        <v-btn
          class="tab-btn"
          :class="{ active: selectedTab === 'sb' }"
          elevation="0"
          text
          @click="selectedTab = 'sb'"
        >
          <span class="tab-text">يدوي</span>
        </v-btn>
      </v-row>

      <!-- Full page content based on selectedTab -->
      <div v-if="selectedTab === 'sb'" class="pa-4" dir="rtl">
        <v-container>
          <v-row>
            <v-col
              cols="10"
              class="text-end"
              style="
                font-weight: normal;
                font-size: 20px;
                margin-right: 30px;
                margin-top: 24px;
                color: #8a8a8a;
              "
              ><span>الاسم الكامل</span></v-col
            >
          </v-row>
          <v-row>
            <v-col cols="11">
              <v-text-field
                v-model="name"
                variant="outlined"
                clearable
                dir="rtl"
                style="
                  flex: 1;
                  max-width: 922px;
                  height: 64.1px;
                  margin-left: 380px;
                "
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="10"
              class="text-end"
              style="
                font-weight: normal;
                font-size: 20px;
                margin-right: 30px;
                margin-top: 5px;
                color: #8a8a8a;
              "
              ><span>رقم الهاتف</span></v-col
            >
          </v-row>
          <v-row>
            <v-col cols="5">
              <v-select
                v-model="genderc"
                :items="gender"
                placeholder="سعة الحافلة"
                item-title="name"
                item-value="value"
                variant="outlined"
                hide-details
                class="mr-4"
                style="
                  max-width: 200px;
                  height: 64px;
                  margin-left: 380px;
                  direction: rtl;
                "
                density="comfortable"
              ></v-select
            ></v-col>
            <v-col cols="5">
              <v-text-field
                v-model="phone"
                variant="outlined"
                clearable
                dir="rtl"
                style="flex: 1; max-width: 696px; height: 64.1px"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row style="margin-top: 32px">
            <v-col>
              <v-btn
                class="btn"
                color="#800080"
                @click="submitForm"
                style="
                  width: 430px;
                  height: 55px;
                  font-size: 18px;
                  font-weight: bold;
                "
              >
                حفظ
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <div v-else-if="selectedTab === 'exam'" class="pa-4">
        <span>ssss</span>
      </div>
    </v-container>
  </div>
</template>

<script>
import useGetDataMixin from "@/mixins/useGetDataMixin";
import usePostDataMixin from "@/mixins/usePostDataMixin";

export default {
  mixins: [useGetDataMixin, usePostDataMixin],
  data() {
    return {
      name: "",
      phone: "",
      email: "",
      password: "",
      filterBy: null,
      genderc: null,
      selectedTab: "sb",
      divisions: [],
      selectedDivision: null,
      gender: [
        { id: 1, name: 10, value: 10 },
        { id: 2, name: 20, value: 20 },
        { id: 2, name: 30, value: 30 },
      ],
      grades: [
        { id: 1, name: "الصف الأول" },
        { id: 2, name: "الصف الثاني" },
        { id: 3, name: "الصف الثالث" },
        { id: 4, name: "الصف الرابع" },
        { id: 5, name: "الصف الخامس" },
        { id: 6, name: "الصف السادس" },
      ],
      selectedGrade: null,
    };
  },
  methods: {
    async submitForm() {
      const payload = {
        phone: this.phone,
        bus_capacity: this.genderc,
        email: this.email,
        password: this.password,
        name: this.name,
      };
      await this.sendData("/buses/store", payload);
      this.$router.push({
        name: "ConfirmAddBusDriverPage",
        query: {
          name: this.name,
          email: this.email,
          password: this.password,
          phone: this.phone,
          bus_capacity: this.genderc,
        },
      });
    },
    generateRandomEmail() {
      const name = Math.random().toString(36).substring(2, 6);
      const domains = ["example.com", "test.com", "mail.com"];
      const domain = domains[Math.floor(Math.random() * domains.length)];
      return `${name}@${domain}`;
    },
    generateRandomPassword(length = 8) {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
      let password = "";
      for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return password;
    },
    generateCredentials() {
      this.email = this.generateRandomEmail();
      this.password = this.generateRandomPassword();
    },
  },
  mounted() {
    this.generateCredentials(); // auto-generate when component loads
  },
};
</script>

<style scoped>
/* Optional: Add some spacing between the dropdowns */
.d-flex {
  width: 100%;
}
.v-select {
  flex: 1;
}
.tab-btn {
  border-radius: 0;
  box-shadow: none;
  font-weight: 500;
  color: black;
  min-width: 120px;
  text-transform: none;
  position: relative;
}

.tab-btn .tab-text {
  position: relative;
  padding-bottom: 4px;
}

.tab-btn.active .tab-text::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 4px;
  width: 100%;
  background-color: #800080; /* Blue line under text */
}
.tab-btn .tab-text {
  position: relative;
  padding-bottom: 16px;
}
.tab-btn.active .tab-text {
  font-weight: bold;
  color: #800080;
  font-size: 16px; /* Optional: make active text blue */
}
</style>
