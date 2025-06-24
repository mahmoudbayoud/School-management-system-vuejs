<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
    style="font-family: 'Cairo'"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-card class="rounded-xl">
      <!-- Header -->
      <v-card-title
        style="
          display: flex;
          align-items: center;
          background-color: #800080;
          height: 89px;
        "
      >
        <span
          style="
            margin-left: 330px;
            margin-right: 290px;
            color: white;
            font-family: 'Cairo';
          "
          >اضافة نشاط
        </span>
        <v-btn
          icon
          @click="closeDialog"
          elevation="0"
          text
          style="
            cursor: pointer;
            text-transform: none;
            margin-top: 7px;
            color: white;
            background-color: #800080;
          "
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <!-- Body -->
      <v-card-text v-if="showStep1">
        <div class="stepper-wrapper" style="margin-left: 120px">
          <!-- Step 1 -->
          <v-btn
            variant="outlined"
            @click="uploadImage"
            style="margin-left: 2px"
          >
            <v-icon left>mdi-image</v-icon> اختيار صورة
          </v-btn>
          <div class="step">
            <div class="circle" :class="{ active: currentStep >= 1 }">
              <v-icon v-if="currentStep > 1" color="white">mdi-check</v-icon>
            </div>
            <div class="label">التفاصيل</div>
          </div>

          <!-- Line -->
          <div class="line" :class="{ active: currentStep > 1 }"></div>

          <!-- Step 2 -->
          <div class="step">
            <div class="circle" :class="{ active: currentStep >= 2 }">
              <v-icon v-if="currentStep > 2" color="white">mdi-check</v-icon>
            </div>
            <div class="label">تخصيص</div>
          </div>
        </div>
        <v-container>
          <!-- Main Info Section -->
          <v-row class="d-flex align-start">
            <!-- Right Column -->

            <!-- Divider -->

            <!-- Left Column -->
            <v-col cols="12" md="5" class="text-right pl-4">
              <div class="text-field-container">
                <label class="custom-label" style="margin-top: 14px">
                  رقم التواصل</label
                >
                <v-text-field
                  v-model="activity.phone"
                  dir="rtl"
                  variant="underlined"
                  density="comfortable"
                  hide-details
                />
              </div>
              <div class="text-field-container">
                <label class="custom-label" style="margin-top: 14px">
                  سعر النشاط</label
                >
                <v-text-field
                  v-model="activity.price"
                  prefix="ل.س"
                  dir="rtl"
                  variant="underlined"
                  density="comfortable"
                  hide-details
                />
              </div>
              <div>
                <!-- حقل مدة النشاط (الوقت) -->
                <div class="text-field-container">
                  <label class="custom-label" style="margin-top: 14px"
                    >بدء النشاط</label
                  >
                  <v-text-field
                    :model-value="activity.starttime"
                    readonly
                    dir="rtl"
                    variant="underlined"
                    density="comfortable"
                    hide-details
                    @click="timeDialog = true"
                  />
                </div>

                <v-dialog v-model="timeDialog" width="320" persistent>
                  <v-card>
                    <vue3-timepicker
                      v-model="activity.starttime"
                      format="hh:mm a"
                      @close="timeDialog = false"
                    />
                    <v-card-actions>
                      <v-spacer />
                      <v-btn text color="#1976d2" @click="timeDialog = false"
                        >إلغاء</v-btn
                      >
                      <v-btn text color="#1976d2" @click="timeDialog = false"
                        >موافق</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <!-- حقل تاريخ النشاط -->
                <div class="text-field-container">
                  <label class="custom-label" style="margin-top: 14px"
                    >تاريخ النشاط</label
                  >
                  <v-text-field
                    v-model="activity.date"
                    readonly
                    dir="rtl"
                    variant="underlined"
                    density="comfortable"
                    hide-details
                    @click="dateDialog = true"
                  />
                </div>

                <v-dialog v-model="dateDialog" width="320" persistent>
                  <v-card>
                    <v-date-picker
                      v-model="activity.date"
                      @update:model-value="
                        (val) => {
                          activity.date = new Date(val)
                            .toISOString()
                            .split('T')[0];
                          dateDialog = false;
                        }
                      "
                    />
                    <v-card-actions>
                      <v-spacer />
                      <v-btn text color="#1976d2" @click="dateDialog = false"
                        >إلغاء</v-btn
                      >
                      <v-btn text color="#1976d2" @click="dateDialog = false"
                        >موافق</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-col>
            <div class="divider-vertical my-4"></div>
            <v-col
              cols="12"
              md="5"
              class="text-right pl-4"
              style="margin-left: 45px"
            >
              <div class="text-field-container">
                <label class="custom-label" style="margin-top: 14px"
                  >اسم النشاط</label
                >
                <v-text-field
                  v-model="activity.name"
                  variant="underlined"
                  density="comfortable"
                  width="120px"
                  dir="rtl"
                  hide-details
                />
              </div>
              <div class="text-field-container">
                <label class="custom-label" style="margin-top: 14px"
                  >سعة لنشاط</label
                >
                <v-text-field
                  v-model="activity.capcity"
                  variant="underlined"
                  dir="rtl"
                  density="comfortable"
                  hide-details
                />
              </div>
              <div class="text-field-container">
                <label class="custom-label" style="margin-top: 14px"
                  >مدة النشاط</label
                >
                <v-text-field
                  v-model="activity.periodtime"
                  variant="underlined"
                  dir="rtl"
                  density="comfortable"
                  hide-details
                />
              </div>
              <div class="text-field-container">
                <label class="custom-label" style="margin-top: 14px">
                  اسم المسؤول</label
                >
                <v-text-field
                  v-model="activity.resname"
                  dir="rtl"
                  variant="underlined"
                  density="comfortable"
                  hide-details
                />
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <!-- Save Button -->
      <v-card-actions class="justify-center" v-if="showStep1">
        <v-btn
          style="
            width: 145px;
            height: 35px;
            background-color: #800080;
            color: white;
            font-size: 15px;
            border-radius: 8px;
            margin-bottom: 12px;
            font-weight: normal;
          "
          @click="goToStep2"
        >
          التالي
        </v-btn>
      </v-card-actions>
      <v-card-text v-if="showStep2">
        <div class="stepper-wrapper">
          <!-- Step 1 -->

          <div class="step">
            <div class="circle" :class="{ active: currentStep >= 1 }">
              <v-icon v-if="currentStep > 1" color="white">mdi-check</v-icon>
            </div>
            <div class="label">التفاصيل</div>
          </div>

          <!-- Line -->
          <div class="line" :class="{ active: currentStep > 1 }"></div>

          <!-- Step 2 -->
          <div class="step">
            <div class="circle" :class="{ active: currentStep >= 2 }">
              <v-icon v-if="currentStep > 2" color="white">mdi-check</v-icon>
            </div>
            <div class="label">تخصيص</div>
          </div>
        </div>

        <v-container>
          <!-- Main Info Section -->
          <v-row class="d-flex align-start"
            ><v-col cols="6">
              <v-select
                v-model="selectedDivision"
                :items="divisions"
                placeholder="الشعبة"
                item-title="division_name"
                item-value="division_id"
                variant="outlined"
                hide-details
                class="mr-4"
                style="
                  max-width: 160px;
                  height: 50px;
                  direction: rtl;
                  margin-left: 140px;
                "
                density="comfortable"
              ></v-select
            ></v-col>
            <v-col cols="6">
              <v-select
                v-model="selectedGrade"
                :items="grades"
                placeholder="الصف"
                item-title="name"
                item-value="id"
                variant="outlined"
                hide-details
                class="mr-4"
                style="
                  max-width: 160px;
                  height: 50px;
                  direction: rtl;
                  margin-left: 60px;
                "
                density="comfortable"
              ></v-select
            ></v-col>
            <v-col cols="10">
              <v-textarea
                style="
                  background-color: #fff5ff;
                  border-radius: 16px;
                  margin-top: 16px;
                  margin-left: 140px;
                "
                placeholder="وصف عام عن النشاط"
                rounded="16"
                auto-grow
                dir="rtl"
                hide-details
                v-model="activity.description"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <!-- Save Button -->
      <v-card-actions class="justify-center" v-if="showStep2">
        <v-btn
          style="
            width: 145px;
            height: 35px;
            background-color: #800080;
            color: white;
            font-size: 15px;
            border-radius: 8px;
            margin-bottom: 12px;
            font-weight: normal;
          "
          @click="finish"
        >
          إنهاء
        </v-btn>
        <v-btn color="secondary" @click="goBackToStep1">السابق</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue3Timepicker from "vue3-timepicker";
import useGetDataMixin from "@/mixins/useGetDataMixin";
import usePostDataMixin from "@/mixins/usePostDataMixin";

export default {
  mixins: [useGetDataMixin, usePostDataMixin],
  props: {
    modelValue: Boolean, // هذا هو v-model
  },
  components: { Vue3Timepicker },
  emits: ["update:modelValue"],
  data() {
    return {
      currentStep: 1,
      dialog: true,
      userData: null,
      activityDate: "", // التاريخ بصيغة YYYY-MM-DD
      activityTime: "", // الوقت بصيغة HH:mm
      dateDialog: false,
      timeDialog: false,
      showStep1: true,
      showStep2: false,
      schoolImage: "https://via.placeholder.com/150", // Replace with real image

      activity: {
        name: "",
        phone: "",
        description: "",
        price: "",
        resname: "",
        periodtime: "",
        starttime: "",
        date: "",
        capcity: "",
        class_id: "",
        section_id: "",
      },
      divisions: [],

      selectedDivision: null,

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
  watch: {
    selectedGrade(newVal) {
      if (newVal) {
        this.fetchDivisions();
      }
    },
  },
  methods: {
    formatTo12Hour(time) {
      if (!time) return "";
      const [hour, minute] = time.split(":");
      const h = parseInt(hour);
      const suffix = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 === 0 ? 12 : h % 12;
      return `${h12}:${minute} ${suffix}`;
    },
    convertTo24Hour(time12h) {
      const [time, modifier] = time12h.split(" ");
      let [hours, minutes] = time.split(":");

      hours = parseInt(hours);

      if (modifier.toUpperCase() === "PM" && hours < 12) {
        hours += 12;
      }

      if (modifier.toUpperCase() === "AM" && hours === 12) {
        hours = 0;
      }

      return String(hours).padStart(2, "0") + ":" + minutes + ":00";
    },
    async fetchDivisions() {
      this.divisions = [];
      this.selectedDivision = null;
      const payload = {
        class_id: this.selectedGrade,
      };
      await this.sendData("/getDivisionIdByClassId", payload);
      this.divisions = this.postData.data;
    },
    goToStep2() {
      this.currentStep = 2;
      this.showStep1 = false;
      this.showStep2 = true;
    },
    goBackToStep1() {
      this.currentStep = 1;
      this.showStep2 = false;
      this.showStep1 = true;
    },

    async submitForm() {
      this.activity.section_id = this.selectedDivision;
      this.activity.class_id = this.selectedGrade;
      this.activity.starttime = this.convertTo24Hour(this.activity.starttime);
      const hours = parseInt(this.activity.periodtime);
      this.activity.periodtime = String(hours).padStart(2, "0") + ":00:00";
      console.log(this.activity.periodtime);
      const payload = {
        name: this.activity.name,
        price: this.activity.price,
        resname: this.activity.resname,
        description: this.activity.description,
        start: this.activity.starttime,
        date: this.activity.date,
        class_id: this.activity.class_id,
        division_id: this.activity.section_id,
        time: this.activity.periodtime,
        phone: this.activity.phone,
      };
      await this.sendData("/activities/assign", payload);
      window.location.reload();
    },
    reloadWithDelay() {
      setTimeout(() => {
        window.location.reload();
      }, 20000); // 5000 ميلي ثانية = 5 ثوانٍ
    },
    finish() {
      this.submitForm();
      this.showStep2 = false;
      this.$emit("update:modelValue", false);
    },
    save() {
      console.log("Saved:");
    },
    closeDialog() {
      this.$emit("update:modelValue", false); // هذا يغلق الـ dialog في المكون الأب
    },
    async fetchdata() {
      const storedData = await localStorage.getItem("userData");
      console.log(storedData);
    },
  },
  mounted() {
    this.fetchdata();
  },
};
</script>

<style scoped>
.stepper-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  direction: rtl;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #ccc;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

.circle.active {
  background-color: #800080;
}

.line {
  height: 4px;
  width: 80px;
  background-color: #ccc;
  margin-top: 22px;
}

.line.active {
  background-color: #800080;
}

.divider-vertical {
  width: 16px;
  background-color: white;
  height: auto;
  color: black;
  margin: 0 12px;
}

.v-text-field input,
.v-textarea textarea {
  text-align: right !important;
  direction: rtl;
}
.text-field-container {
  display: flex;
  align-items: center;
  gap: 8px; /* Space between label and input */
  direction: rtl; /* Optional if you're using RTL */
}

.custom-label {
  white-space: nowrap;
  font-weight: 500;
}
</style>
