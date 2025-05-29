<template>
  <div dir="rtl">
    <div style="height: 5px"></div>
    <v-container>
      <v-row class="flex-row-reverse">
        <v-col
          cols="3"
          class="text-center"
          style="font-size: 30px; font-weight: bold; color: gray"
        >
          المعلمين
        </v-col>
      </v-row>
      <v-row class="flex-row-reverse">
        <v-col
          cols="5"
          class="text-center"
          style="font-size: 18px; color: gray"
        >
          تفاصيل المعلم
        </v-col>
      </v-row>
      <div style="height: 32px"></div>
      <v-container class="d-flex justify-center" dir="rtl">
        <v-card outlined class="pa-6" width="1041px" height="500px">
          <div style="height: 48px"></div>
          <v-row class="flex-row-reverse">
            <!-- Image column -->
            <v-col cols="5" class="d-flex justify-center">
              <div class="d-flex flex-column align-center">
                <!-- Image -->
                <img
                  src="../assets/Icons/Ellipse 14.png"
                  alt=""
                  style="width: 280px; height: 280px; margin-top: 25px"
                />

                <!-- Icon below the image -->
                <div style="height: 24px"></div>
                <div style="display: flex; flex-direction: row; gap: 12px">
                  <img src="../assets/Icons/Frame 30085.png" />
                  <img src="../assets/Icons/Frame 30086.png" />
                  <img src="../assets/Icons/Frame 30087.png" />
                </div>
              </div>
            </v-col>
            <!-- Data columns -->
            <v-col cols="7">
              <v-row>
                <v-col
                  ><div style="display: flex; flex-direction: row; gap: 16px">
                    <v-icon style="width: 26px; height: 26px; color: #8d92a5"
                      >mdi-content-copy</v-icon
                    >
                    <v-icon style="width: 26px; height: 26px; color: #8d92a5"
                      >mdi-printer</v-icon
                    >
                    <v-icon style="width: 26px; height: 26px; color: #8d92a5"
                      >mdi-pencil-circle-outline</v-icon
                    >
                  </div></v-col
                >
              </v-row>
              <v-row class="flex-row-reverse" style="margin-top: 12px">
                <v-col cols="3" class="text-right font-weight-bold"
                  >الاسم بالكامل</v-col
                >
                <v-col cols="3">{{ studentData.name }}</v-col>
              </v-row>
              <v-row class="flex-row-reverse" style="margin-top: 12px">
                <v-col cols="3" class="text-right font-weight-bold">
                  اسم الاب</v-col
                >
                <v-col cols="3">{{ studentData.pname }}</v-col>
              </v-row>
              <v-row class="flex-row-reverse" style="margin-top: 12px">
                <v-col cols="3" class="text-right font-weight-bold">الصف</v-col>
                <v-col cols="3">{{ studentData.class }}</v-col>
              </v-row>

              <v-row class="flex-row-reverse" style="margin-top: 12px">
                <v-col cols="3" class="text-right font-weight-bold"
                  >الشعبة</v-col
                >
                <v-col cols="3">{{ studentData.division }}</v-col>
              </v-row>
              <v-row class="flex-row-reverse" style="margin-top: 12px">
                <v-col cols="3" class="text-right font-weight-bold"
                  >رقم الهاتف</v-col
                >
                <v-col cols="3">{{ studentData.phone }}</v-col>
              </v-row>

              <v-row class="flex-row-reverse" style="margin-top: 12px">
                <v-col cols="3" class="text-right font-weight-bold"
                  >البريد الالكتروني</v-col
                >
                <v-col cols="3">
                  <div
                    style="
                      width: 150px;
                      height: 30px;
                      background-color: #dfeaef;
                    "
                  >
                    <span>{{ studentData.email }}</span>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-container>

      <div style="display: flex; flex-direction: column">
        <v-row class="flex-row-reverse">
          <v-col cols="8">
            <v-btn
              class="btn"
              color="#8A8A8A"
              width="122.96px"
              height="48.53px"
              @click="goBack"
              style="margin-right: 35px"
            >
              رجوع
            </v-btn>
          </v-col>
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
            </v-btn>
          </v-col>
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
    };
  },
  created() {
    this.studentData = history.state?.studentData;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
