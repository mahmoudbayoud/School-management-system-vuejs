<template>
  <div dir="rtl">
    <div style="height: 5px"></div>
    <v-container>
      <v-row class="flex-row-reverse">
        <v-col
          cols="3"
          class="text-center"
          style="font-size: 30px; font-weight: bold; color: gray"
          >اضافة طالب</v-col
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
            <span style="margin-right: 15px">تم انشاء الطالب بنجاح</span>
          </div></v-col
        >
      </v-row>
      <v-row class="flex-row-reverse">
        <v-col
          cols="5"
          class="text-center"
          style="font-size: 18px; color: gray"
        >
          يرجى الاحتفاظ بالمعلومات التالية لاعطائها للطالب المناسب</v-col
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
            <v-col cols="3">{{ studentData.name }} </v-col>
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
              >اسم الاب
            </v-col>
            <v-col cols="3">{{ studentData.parent_name }} </v-col>
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
            <v-col cols="3">{{ studentData.class_name }} </v-col>
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
            <v-col cols="3"> {{ studentData.division_name }}</v-col>
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
              >رقم الهاتف
            </v-col>
            <v-col cols="3">{{ studentData.phone }} </v-col>
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
                <span>{{ studentData.email }}</span>
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
      studentData: null,
      showDiv: true,
    };
  },
  created() {
    this.studentData = history.state?.studentData;
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
  },
  mounted() {
    setTimeout(() => {
      this.showDiv = false;
    }, 1000);
  },
};
</script>
