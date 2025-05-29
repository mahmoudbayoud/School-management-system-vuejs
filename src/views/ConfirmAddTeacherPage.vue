<template>
  <div dir="rtl">
    <div style="height: 5px"></div>
    <v-container>
      <v-row class="flex-row-reverse">
        <v-col
          cols="3"
          class="text-center"
          style="font-size: 30px; font-weight: bold; color: gray"
          >اضافة معلم</v-col
        >
      </v-row>
      <v-row>
        <v-col cols="11" style="display: flex; justify-content: end"
          ><div
            dir="rtl"
            v-if="showDiv"
            style="
              background-color: #21e821;
              height: 50px;
              width: 670px;
              padding-top: 10px;
              border-radius: 4px;
              margin-right: -22px;
              display: flex;
              align-items: flex-start;
              flex-direction: row;
              color: white;
            "
          >
            <v-icon style="width: 30px; height: 30px; margin-right: 16px"
              >mdi-check-circle</v-icon
            >
            <span style="margin-right: 15px">تم انشاء المعلم بنجاح</span>
          </div></v-col
        >
      </v-row>
      <v-row class="flex-row-reverse">
        <v-col
          cols="5"
          class="text-center"
          style="font-size: 18px; color: gray"
        >
          يرجى الاحتفاظ بالمعلومات التالية لاعطائها للمعلم المناسب</v-col
        >
      </v-row>
      <v-row>
        <v-col cols="7">
          <v-icon style="color: #8d92a5">mdi-content-copy</v-icon>
        </v-col>
      </v-row>
      <v-container class="d-flex justify-center" dir="rtl">
        <v-card outlined class="pa-6" width="780px" height="390px">
          <v-row
            class="flex-row-reverse"
            style="
              display: flex;
              align-items: flex-start;
              margin-top: 12px;
              margin-right: 12px;
            "
          >
            <v-col cols="3" class="text-right font-weight-bold"
              >الاسم بالكامل</v-col
            >
            <v-col cols="3">{{ $route.query.name }} </v-col>
          </v-row>
          <v-row
            class="flex-row-reverse"
            style="
              display: flex;
              align-items: flex-start;
              margin-top: 12px;
              margin-right: 12px;
            "
          >
            <v-col cols="3" class="text-right font-weight-bold">الصف </v-col>
            <v-col cols="3">{{ $route.query.class_name }} </v-col>
          </v-row>
          <v-row
            class="flex-row-reverse"
            style="
              display: flex;
              align-items: flex-start;
              margin-top: 12px;
              margin-right: 12px;
            "
          >
            <v-col cols="3" class="text-right font-weight-bold">الشعبة </v-col>
            <v-col cols="3"> {{ $route.query.divison_name }}</v-col>
          </v-row>
          <v-row
            class="flex-row-reverse"
            style="
              display: flex;
              align-items: flex-start;
              margin-top: 12px;
              margin-right: 12px;
            "
          >
            <v-col cols="3" class="text-right font-weight-bold">
              البريد الالكتروني
            </v-col>
            <v-col cols="3"
              ><div
                style="width: 150px; height: 30px; background-color: #dfeaef"
              >
                <span>{{ $route.query.email }}</span>
              </div></v-col
            >
          </v-row>
          <v-row
            class="flex-row-reverse"
            style="
              display: flex;
              align-items: flex-start;
              margin-top: 12px;
              margin-right: 12px;
            "
          >
            <v-col cols="3" class="text-right font-weight-bold"
              >كلمة المرور
            </v-col>
            <v-col cols="3"
              ><div
                style="width: 150px; height: 30px; background-color: #dfeaef"
              >
                <span style="padding-top: 16px !important">{{
                  $route.query.password
                }}</span>
              </div></v-col
            >
          </v-row>
        </v-card>
      </v-container>
      <div style="display: flex; flex-direction: column">
        <v-row class="flex-row-reverse">
          <v-col cols="8"
            ><v-btn
              class="btn"
              color="#8A8A8A"
              width="122.96px"
              height="48.53px"
              @click="goback"
              style="margin-right: 35px"
            >
              رجوع
            </v-btn></v-col
          >
          <v-col cols="8">
            <v-btn
              class="btn"
              style="
                background: none;
                box-shadow: none;
                color: #8a8a8a;
                margin-top: -24px;
                margin-right: 33px;
              "
              width="110.96px"
              height="42.53px"
            >
              اضافة معلم اخر
            </v-btn></v-col
          >
        </v-row>
      </div>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showDiv: true,
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
  },
  mounted() {
    setTimeout(() => {
      this.showDiv = false;
    }, 5000);
  },
};
</script>
