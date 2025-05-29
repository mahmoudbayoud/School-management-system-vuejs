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
            margin-left: 250px;
            margin-right: 160px;
            color: white;
            font-family: 'Cairo';
          "
          >إدارة الوجبات الرئيسية ({{ this.dayname }})
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
      <v-card-text>
        <v-container>
          <v-row dir="rtl">
            <v-col>
              <div
                style="
                  background-color: #a7a7a7;
                  width: 120px;
                  height: 45px;
                  border-radius: 8px;
                  color: white;
                  font-size: 14px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <span>اضافة صورة</span>
                <v-icon size="24px">mdi-image</v-icon>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <div class="text-field-container">
                <label class="custom-label" style="margin-top: 14px">
                  المكونات</label
                >
                <v-text-field
                  v-model="this.contents"
                  variant="underlined"
                  density="comfortable"
                  width="120px"
                  dir="rtl"
                  hide-details
                /></div
            ></v-col>
            <v-col cols="6">
              <div class="text-field-container">
                <label class="custom-label" style="margin-top: 14px">
                  الوجبة الرئيسية</label
                >
                <v-text-field
                  v-model="this.Foodname"
                  variant="underlined"
                  density="comfortable"
                  width="100px"
                  dir="rtl"
                  hide-details
                /></div
            ></v-col>
          </v-row>
          <div style="height: 32px"></div>
          <v-row>
            <v-col cols="6">
              <div class="text-field-container">
                <label class="custom-label" style="margin-top: 14px">
                  السعر الاجمالي</label
                >
                <v-text-field
                  v-model="this.price"
                  variant="underlined"
                  density="comfortable"
                  prefix="ل.س"
                  width="90px"
                  dir="rtl"
                  hide-details
                /></div
            ></v-col>
            <v-col cols="6">
              <div class="text-field-container">
                <label class="custom-label" style="margin-top: 14px">
                  المقبلات
                </label>
                <v-text-field
                  v-model="this.entrees"
                  variant="underlined"
                  density="comfortable"
                  width="120px"
                  dir="rtl"
                  hide-details
                /></div
            ></v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <!-- Save Button -->
      <div style="height: 32px"></div>
      <v-card-actions class="justify-center">
        <v-btn
          style="
            width: 155px;
            height: 40px;
            background-color: #800080;
            color: white;
            font-size: 18px;
            border-radius: 8px;
            margin-bottom: 12px;
            font-weight: normal;
          "
          @click="save"
        >
          حفظ
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import useGetDataMixin from "@/mixins/useGetDataMixin";
import usePostDataMixin from "@/mixins/usePostDataMixin";
export default {
  mixins: [useGetDataMixin, usePostDataMixin],
  props: {
    modelValue: Boolean,
    grade: Object, // هذا هو v-model
  },
  emits: ["update:modelValue"],
  data() {
    return {
      dialog: true,

      dayname: "",
      contents: "",
      Foodname: "",
      entrees: "",
      price: "",
      id: "",
      daydate: "",
      newdaydate: "",
    };
  },
  methods: {
    async save() {
      const payload = {
        id: this.id,
        Food: this.Foodname,
        name: this.dayname,
        contents: this.contents,
        entrees: this.entrees,
        day: this.newdayDate,
        price: this.price,
      };
      await this.sendData("/FoodMeal/update", payload);
      this.$router.push({
        name: "FoodDayPage",
      });
      window.location.reload();
    },
    getNextWeekDate(dateStr) {
      // تأكد أن التاريخ بالصيغة YYYY-MM-DD
      const [year, month, day] = dateStr.split("-").map(Number);

      // أنشئ كائن التاريخ (الشهر يبدأ من 0 في JavaScript)
      const date = new Date(year, month - 1, day);

      // أضف 7 أيام
      date.setDate(date.getDate() + 7);

      // أنشئ التاريخ الجديد
      const newYear = date.getFullYear();
      const newMonth = String(date.getMonth() + 1).padStart(2, "0");
      const newDay = String(date.getDate()).padStart(2, "0");

      // أعده بنفس التنسيق الأصلي
      return `${newYear}-${newMonth}-${newDay}`;
    },
    closeDialog() {
      this.$emit("update:modelValue", false); // هذا يغلق الـ dialog في المكون الأب
    },
    initData() {
      if (this.grade) {
        this.id = this.grade.id || "";
        this.dayname = this.grade.day_name || "";
        this.contents = this.grade.contents || "";
        this.entrees = this.grade.entrees || "";
        this.price = this.grade.price || "";
        this.daydate = this.grade.date || "";
        this.Foodname = this.grade.Food_name || "";
      }
    },
    newdayDate() {
      this.newdayDate = this.getNextWeekDate(this.daydate);
    },
  },
  mounted() {
    this.initData();
    this.newdayDate();
  },
};
</script>

<style scoped>
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
