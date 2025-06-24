<template>
  <v-container class="pa-4" style="max-width: 400px; margin: auto">
    <!-- حقل تاريخ النشاط -->
    <v-text-field
      label="تاريخ النشاط"
      v-model="activityDate"
      readonly
      @click="dateDialog = true"
      class="mb-6"
    ></v-text-field>

    <v-dialog v-model="dateDialog" width="320" persistent>
      <v-card>
        <v-date-picker
          v-model="activityDate"
          @update:model-value="
            (val) => {
              activityDate = val;
              dateDialog = false;
            }
          "
        />
        <v-card-actions>
          <v-spacer />
          <v-btn text color="#1976d2" @click="dateDialog = false">إلغاء</v-btn>
          <v-btn text color="#1976d2" @click="dateDialog = false">موافق</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- حقل مدة النشاط (الوقت) -->
    <v-text-field
      label="مدة النشاط"
      v-model="activityTime"
      readonly
      @click="timeDialog = true"
    ></v-text-field>

    <v-dialog v-model="timeDialog" width="320" persistent>
      <v-card>
        <vue3-timepicker
          v-model="activityTime"
          format="HH:mm"
          is24hr
          class="custom-timepicker"
          @close="timeDialog = false"
        />
        <v-card-actions>
          <v-spacer />
          <v-btn text color="#1976d2" @click="timeDialog = false">إلغاء</v-btn>
          <v-btn text color="#1976d2" @click="timeDialog = false">موافق</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Vue3Timepicker from "vue3-timepicker";

export default {
  components: { Vue3Timepicker },
  data() {
    return {
      activityDate: "", // نص التاريخ بصيغة YYYY-MM-DD
      activityTime: "", // نص الوقت بصيغة HH:mm
      dateDialog: false,
      timeDialog: false,
    };
  },
};
</script>

<style scoped>
.custom-timepicker {
  --picker-primary-color: #1976d2;
  --picker-background-color: #f5faff;
  --picker-text-color: #333;
  --picker-accent-color: #4caf50;
  --picker-hover-bg: rgba(25, 118, 210, 0.1);
  --picker-selected-bg: #1976d2;
  --picker-selected-text: white;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1rem;
  padding: 20px 12px;
}

/* تحسين أزرار الموافقة والإلغاء */
.v-btn {
  font-weight: 600 !important;
  font-size: 1rem !important;
  min-width: 72px !important;
}
</style>
