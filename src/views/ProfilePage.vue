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
            margin-left: 288px;
            margin-right: 225px;
            color: white;
            font-family: 'Cairo';
          "
          >إدارة المعلومات الشخصية</span
        >
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
          <!-- Avatar Image -->
          <v-row justify="center" class="mb-4">
            <v-col cols="12" class="text-center">
              <v-avatar size="120">
                <v-img src="https://randomuser.me/api/portraits/men/1.jpg" />
              </v-avatar>
              <div class="mt-2">
                <v-btn icon size="small" elevation="0">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon size="small" elevation="0">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>

          <!-- Main Info Section -->
          <v-row class="d-flex align-start">
            <!-- Right Column -->

            <!-- Divider -->

            <!-- Left Column -->
            <v-col cols="12" md="5" class="text-right pl-4">
              <span
                style="font-weight: bold; font-size: 18px; margin-left: 30px"
              >
                أقساط المدرسة</span
              >
              <div class="text-field-container">
                <label class="custom-label" style="margin-top: 14px">
                  القسط للطالب الواحد</label
                >
                <v-text-field
                  v-model="school.feesPerStudent"
                  prefix="ل.س"
                  dir="rtl"
                  variant="underlined"
                  density="comfortable"
                  hide-details
                />
              </div>
              <div class="text-field-container">
                <label class="custom-label" style="margin-top: 14px">
                  قسط خدمة النقل</label
                >
                <v-text-field
                  v-model="school.transportFee"
                  prefix="ل.س"
                  dir="rtl"
                  variant="underlined"
                  density="comfortable"
                  hide-details
                />
              </div>
            </v-col>
            <div class="divider-vertical my-4"></div>
            <v-col
              cols="12"
              md="5"
              class="text-right pl-4"
              style="margin-left: 45px"
            >
              <span
                style="font-weight: bold; font-size: 18px; margin-left: 30px"
                >المعلومات الشخصية للمدرسة</span
              >
              <div class="text-field-container">
                <label class="custom-label" style="margin-top: 14px"
                  >اسم المدرسة</label
                >
                <v-text-field
                  v-model="school.name"
                  variant="underlined"
                  density="comfortable"
                  width="120px"
                  dir="rtl"
                  hide-details
                />
              </div>
              <div class="text-field-container">
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
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <!-- Save Button -->
      <v-card-actions class="justify-center">
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
          @click="save"
        >
          حفظ
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    modelValue: Boolean, // هذا هو v-model
  },
  emits: ["update:modelValue"],
  data() {
    return {
      dialog: true,
      userData: null,
      schoolImage: "https://via.placeholder.com/150", // Replace with real image
      school: {
        name: "",
        phone: "",
        description: "",
        feesPerStudent: "",
        transportFee: "",
      },
    };
  },
  methods: {
    save() {
      console.log("Saved:", this.school);
    },
    closeDialog() {
      this.$emit("update:modelValue", false); // هذا يغلق الـ dialog في المكون الأب
    },
    async fetchdata() {
      const storedData = await localStorage.getItem("userData");
      if (storedData) {
        this.userData = JSON.parse(storedData);
        this.school.name = this.userData.name || "";
        this.school.phone = this.userData.phone || "";
        this.school.feesPerStudent = this.userData.StudentPrice || "";
        this.school.transportFee = this.userData.bus_price || "";
        this.school.description = this.userData.description || "";
      }
    },
  },
  mounted() {
    this.fetchdata();
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
