<template>
  <v-container fluid style="font-family: 'Cairo'; padding: 40px" dir="rtl">
    <!-- أزرار الحفظ والتراجع -->
    <v-row class="justify-end mb-6">
      <v-btn
        style="
          background-color: white;
          color: gray;
          margin-left: 12px;
          width: 100px;
          font-size: 16px;
        "
        elevation="0"
      >
        تراجع
      </v-btn>
      <v-btn
        style="
          background-color: #800080;
          color: white;
          width: 140px;
          margin-right: 60px;
          font-size: 18px;
        "
        @click="submitForm"
      >
        حفظ
      </v-btn>
    </v-row>

    <v-row>
      <!-- العمود الأيسر: إعدادات العلامات + اللغة + الإشعارات + الموقع -->
      <v-col cols="12" md="7" class="text-right" dir="rtl">
        <!-- إعدادات العلامات -->
        <h3 class="section-title">إعدادات العلامات</h3>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="marks.attendance"
              label="الحضور"
              type="number"
              variant="underlined"
              hide-details
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="marks.oral"
              label="الشفهي"
              type="number"
              variant="underlined"
              hide-details
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="marks.quizzes"
              label="مذاكرات"
              type="number"
              variant="underlined"
              hide-details
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="marks.exams"
              label="فحوصات"
              type="number"
              variant="underlined"
              hide-details
            />
          </v-col>
        </v-row>

        <!-- إعدادات اللغة -->
        <h3 class="section-title" dir="rtl">إعدادات اللغة والتخصيص:</h3>
        <v-row>
          <v-col cols="6" dir="rtl">
            <v-select
              class="rtl-select"
              v-model="settings.language"
              :items="['العربية', 'En']"
              label="اللغة"
              variant="underlined"
              hide-details
            />
          </v-col>
          <v-col cols="6" dir="rtl">
            <v-select
              v-model="settings.theme"
              :items="['فاتح', 'داكن']"
              label="المظهر"
              variant="underlined"
              hide-details
            />
          </v-col>
        </v-row>

        <!-- إعدادات الإشعارات -->

        <h3 class="section-title" dir="rtl">إعدادات الإشعارات:</h3>
        <v-row>
          <v-col cols="4" dir="rtl">
            <v-checkbox
              color="#800080"
              v-model="settings.enableNotifications"
              label="تفعيل الإشعارات"
            />
            <v-checkbox
              color="#800080"
              v-model="settings.chatNotifications"
              label="إشعارات المحادثات"
            />
          </v-col>
          <v-col cols="8" dir="rtl">
            <v-checkbox
              color="#800080"
              v-model="settings.complaintsNotifications"
              label="إشعارات الشكاوي" />
            <v-checkbox
              v-model="settings.studentAbsence"
              color="#800080"
              label="إشعارات غياب الطلاب" /></v-col
        ></v-row>

        <!-- إعدادات الموقع -->
        <h3 class="section-title">إعدادات الموقع:</h3>
        <span>تحديد الموقع</span>
        <v-btn icon elevation="0" @click="showMap = true">
          <v-icon color="purple">mdi-map-marker</v-icon>
        </v-btn>

        <!-- Dialog لاختيار الموقع -->
        <v-dialog v-model="showMap" max-width="700px">
          <v-card>
            <v-card-title
              style="
                display: flex;
                justify-content: center;
                font-family: Cairo, sans-serif;
              "
              >اختر موقع المدرسة</v-card-title
            >
            <v-card-text style="height: 500px; width: 100%; padding: 0">
              <v-btn
                color="#800080"
                style="
                  position: absolute;
                  top: 10px;
                  right: 10px;
                  z-index: 10;
                  font-family: Cairo, sans-serif;
                "
                @click="getCurrentLocation"
              >
                موقعك الحالي
              </v-btn>
              <Map
                :center="center"
                :zoom="15"
                style="width: 100%; height: 500px"
                @click="selectLocation"
              >
                <!-- ✅ Marker يظهر دائماً: إما عند المركز الافتراضي أو عند الموقع المختار -->
                <Marker :position="markerPosition || center" />
              </Map>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="#800080"
                @click="confirmLocation"
                style="
                  font-weight: bold;
                  font-size: 12px;
                  font-family: Cairo, sans-serif;
                "
                >تأكيد</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>

      <!-- فاصل عمودي -->
      <div class="divider-vertical"></div>

      <!-- العمود الأيمن: صورة + معلومات المدرسة -->
      <v-col cols="12" md="4" class="text-center">
        <!-- صورة المدرسة -->
        <v-avatar size="120">
          <v-img :src="require('@/assets/school.jpg')" />
        </v-avatar>
        <div class="mt-2">
          <v-btn icon size="small" elevation="0">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon size="small" elevation="0">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>

        <!-- معلومات المدرسة -->
        <div class="mt-6 text-right">
          <h3 class="section-title" dir="rtl">معلومات المدرسة:</h3>
          <div class="text-field-container" style="margin-top: 20px">
            <label class="custom-label" style="margin-top: 14px"
              >اسم المدرسة</label
            >
            <v-text-field
              v-model="school.name"
              variant="underlined"
              density="comfortable"
              dir="rtl"
              hide-details
            />
          </div>
          <div class="text-field-container" style="margin-top: 20px">
            <label class="custom-label" style="margin-top: 14px"
              >رقم المدرسة</label
            >
            <v-text-field
              v-model="school.phone"
              variant="underlined"
              dir="rtl"
              density="comfortable"
              hide-details
            />
          </div>
          <v-textarea
            style="
              background-color: #fff5ff;
              border-radius: 16px;
              margin-top: 16px;
            "
            v-model="school.description"
            placeholder="وصف عام عن المدرسة"
            rounded="16"
            auto-grow
            dir="rtl"
            hide-details
          />
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="editSuccess" max-width="400" persistent>
      <v-card
        class="pa-6"
        color="white"
        elevation="10"
        style="text-align: center"
      >
        <!-- عنصر يحوي الأيقونة ويجعلها في الوسط -->
        <div class="d-flex justify-center">
          <v-icon color="#800080" size="48">mdi-check-circle</v-icon>
        </div>

        <h2
          style="margin-top: 16px; color: black; font-family: Cairo, sans-serif"
        >
          تم التعديل بنجاح
        </h2>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { Map, Marker } from "@fawmi/vue-google-maps";
import useGetDataMixin from "@/mixins/useGetDataMixin";
import usePostDataMixin from "@/mixins/usePostDataMixin";
export default {
  mixins: [useGetDataMixin, usePostDataMixin],
  name: "SchoolDashboard",
  components: { Map, Marker },
  data() {
    return {
      editSuccess: false,
      school: {
        id: "",
        name: "",
        phone: "",
        longitude: "",
        latitude: "",
        description: "",
        feesPerStudent: "",
        transportFee: "",
        email: "",
        password: "",
      },
      marks: {
        attendance: 5,
        oral: 15,
        quizzes: 30,
        exams: 50,
      },
      settings: {
        language: "العربية",
        theme: "فاتح",
        enableNotifications: true,
        chatNotifications: true,
        complaintsNotifications: false,
        studentAbsence: false,
      },
      // بيانات اختيار الموقع
      showMap: false,
      userData: null,
      center: {
        lat: 34.714227,
        lng: 36.70934,
      }, // مركز افتراضي
      markerPosition: null,
      latitude: null,
      longitude: null,
    };
  },
  methods: {
    save() {
      console.log("تم الحفظ:", this.school, this.marks, this.settings);
      if (this.latitude && this.longitude) {
        console.log("موقع المدرسة:", this.latitude, this.longitude);
      }
    },
    async fetchdata() {
      const storedData = await localStorage.getItem("userData");
      if (storedData) {
        this.userData = JSON.parse(storedData);
        this.school.id = this.userData.id || "";
        this.school.name = this.userData.name || "";
        this.school.phone = this.userData.phone || "";
        this.school.feesPerStudent = this.userData.StudentPrice || "";
        this.school.transportFee = this.userData.bus_price || "";
        this.school.description = this.userData.description || "";
        this.school.latitude = this.userData.latitude || "";
        this.school.longitude = this.userData.longitude || "";

        // ✅ ضبط marker إذا موجود lat/lng
        if (this.school.latitude && this.school.longitude) {
          this.markerPosition = {
            lat: parseFloat(this.school.latitude),
            lng: parseFloat(this.school.longitude),
          };
          this.center = this.markerPosition;
        }

        this.school.email = this.userData.email || "";
        this.school.password = this.userData.password || "";
      }
    },
    selectLocation(event) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      this.markerPosition = { lat, lng };
      this.latitude = lat;
      this.longitude = lng;
      console.log("تم اختيار الموقع:", this.latitude, this.longitude);
    },
    confirmLocation() {
      this.showMap = false;
      console.log("تم تأكيد الموقع:", this.latitude, this.longitude);
    },

    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            this.center = { lat, lng };
            this.markerPosition = { lat, lng };
            this.latitude = lat;
            this.longitude = lng;
            console.log("موقعك الحالي:", lat, lng);
          },
          (error) => {
            console.error("خطأ في الحصول على الموقع:", error);
            alert("لا يمكن الوصول لموقعك الحالي");
          }
        );
      } else {
        alert("المتصفح لا يدعم تحديد الموقع");
      }
    },
    async submitForm() {
      const payload = {
        id: this.school.id,
        name: this.school.name,
        phone: this.school.phone,
        longitude: this.longitude || this.school.longitude,
        latitude: this.latitude || this.school.latitude,
        description: this.school.description,
      };
      const form = {
        email: this.school.email,
        password: this.school.password,
        type: "3",
      };
      console.log(payload);
      await this.sendData("/update-school", payload);
      await this.sendData("/login", form);
      const token = this.postData.token;
      const userData = this.postData.data;

      if (token && userData) {
        // حفظ بيانات Laravel
        localStorage.setItem("auth_token", token);
        localStorage.setItem("userData", JSON.stringify(userData));
      }
      this.editSuccess = true;
      setTimeout(() => {
        this.editSuccess = false;

        // الانتقال للصفحة الرئيسية
        this.$router.push({ name: "HomePage" }).then(() => {
          // تحديث الصفحة بالكامل بعد الانتقال
          window.location.reload();
        });
      }, 2000);
    },
  },
  mounted() {
    this.fetchdata();
  },
};
</script>

<style scoped>
.section-title {
  font-weight: bold;
  font-size: 18px;
  margin: 20px 0 10px;
}

.divider-vertical {
  width: 2px;
  background-color: #e0e0e0;
  margin: 0 20px;
}
.rtl-select .v-field__input {
  direction: rtl; /* النصوص من اليمين لليسار */
  text-align: right; /* محاذاة النص لليمين */
}

.rtl-select .v-field__append-inner {
  order: -1; /* يحرك السهم إلى الجهة اليسرى */
  margin-left: 8px; /* مسافة صغيرة بعد السهم */
}
</style>
