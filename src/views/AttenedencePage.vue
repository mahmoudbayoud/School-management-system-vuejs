<template>
  <v-container dir="rtl" class="mt-6">
    <h2 style="font-weight: bold; color: #800080">الحضور والغياب</h2>

    <!-- Date Picker -->
    <v-row align="start" class="mb-6" style="margin-left: 1300px">
      <v-menu
        v-model="showDatePicker"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ props }">
          <v-btn v-bind="props" color="#800080" dark>
            <v-icon left>mdi-calendar-month</v-icon>
            اختر تاريخ
          </v-btn>
        </template>
        <v-date-picker
          v-model="selectedDate"
          @update:modelValue="onDateSelected"
          color="#800080"
        />
      </v-menu>
    </v-row>

    <!-- Statistics -->
    <v-row class="mb-8" justify="center" align="center" style="gap: 16px">
      <v-chip color="green" dark>حضور: {{ stats.present }}</v-chip>
      <v-chip color="orange" dark>متأخر: {{ stats.late }}</v-chip>
      <v-chip color="red" dark>غياب: {{ stats.absent }}</v-chip>
      <v-chip color="purple" dark>مبرر: {{ stats.excused }}</v-chip>
    </v-row>

    <!-- Attendance Cards -->
    <v-row dense justify="center" class="flex-wrap-reverse">
      <v-col
        v-for="(day, index) in displayedDays"
        :key="index"
        cols="10"
        md="5"
      >
        <v-card
          class="pa-4 mb-6"
          elevation="4"
          :style="{
            borderRadius: '20px',
            border: selectedAttendance ? '2px dashed #800080' : 'none',
          }"
        >
          <div class="d-flex justify-space-between align-center mb-4">
            <v-chip color="#800080" text-color="white" class="px-4">
              {{ day.day || "يوم الاحد" }}
            </v-chip>
            <span class="grey--text">{{ day.date }}</span>
          </div>

          <v-row>
            <v-col
              v-for="(value, i) in day.values"
              :key="i"
              class="text-center"
              cols="6"
            >
              <div
                style="font-weight: bold; font-size: 15px; margin-bottom: 6px"
              >
                {{ day.subjects[i] || "---" }}
              </div>
              <v-avatar
                size="26"
                :color="statusColors[value] || 'grey'"
              ></v-avatar>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "StudentAttendancePage",
  data() {
    return {
      stats: { present: 0, absent: 0, late: 0, excused: 0 },
      attendanceDays: [],
      extraAttendance: [
        {
          date: "2025-08-31",
          values: [1, 2, 1, 3],
          subjects: ["كيمياء", "أحياء", "فنية", "رياضة"],
        },
        {
          date: "2025-09-01",
          values: [1, 2, 1, 4, 1, 1],
          subjects: ["رياضيات", "عربي", "علوم", "تاريخ", "جغرافيا", "إنجليزي"],
        },
      ],
      selectedAttendance: null,
      selectedDate: null,
      showDatePicker: false,
      statusColors: { 1: "green", 2: "red", 3: "purple", 4: "orange" },
    };
  },
  computed: {
    displayedDays() {
      return this.selectedAttendance
        ? [this.selectedAttendance]
        : this.attendanceDays;
    },
  },
  mounted() {
    this.loadVirtualData();
  },
  methods: {
    // تحويل أي تاريخ إلى صيغة YYYY-MM-DD
    formatDate(date) {
      if (!date) return null;
      const d = new Date(date);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    },

    loadVirtualData() {
      const fixDate = this.formatDate;

      this.attendanceDays = [
        {
          day: "الأحد",
          date: fixDate("2025-09-06"),
          values: [1, 2, 1, 4, 1, 1],
          subjects: ["رياضيات", "عربي", "علوم", "تاريخ", "جغرافيا", "إنجليزي"],
        },
        {
          day: "الخميس",
          date: fixDate("2025-09-05"),
          values: [1, 1, 2, 1, 1, 3],
          subjects: ["رياضيات", "عربي", "علوم", "إنجليزي", "جغرافيا", "دين"],
        },
        {
          day: "الأربعاء",
          date: fixDate("2025-09-04"),
          values: [2, 1, 1, 1, 4, 1],
          subjects: ["رياضيات", "رياضة", "علوم", "تاريخ", "جغرافيا", "فنية"],
        },
        {
          day: "الثلاثاء",
          date: fixDate("2025-09-03"),
          values: [1, 1, 1, 1, 1, 1],
          subjects: ["رياضيات", "عربي", "علوم", "تاريخ", "جغرافيا", "دين"],
        },
        {
          day: "الاثنين",
          date: fixDate("2025-09-02"),
          values: [1, 3, 1, 2, 1, 1],
          subjects: ["رياضيات", "فنية", "علوم", "تاريخ", "جغرافيا", "رياضة"],
        },
        {
          day: "الأحد",
          date: fixDate("2025-09-09"),
          values: [4, 1, 1, 1, 1, 2],
          subjects: ["رياضيات", "عربي", "علوم", "تاريخ", "جغرافيا", "إنجليزي"],
        },
      ];

      // توحيد صيغة التواريخ في extraAttendance
      this.extraAttendance = this.extraAttendance.map((d) => ({
        ...d,
        date: fixDate(d.date),
      }));

      this.updateStats();
    },

    updateStats() {
      let present = 0,
        absent = 0,
        late = 0,
        excused = 0;
      this.attendanceDays.forEach((day) => {
        day.values.forEach((v) => {
          if (v === 1) present++;
          if (v === 2) absent++;
          if (v === 3) excused++;
          if (v === 4) late++;
        });
      });
      this.stats = { present, absent, late, excused };
    },

    onDateSelected(date) {
      this.showDatePicker = false;
      this.selectedDate = date;

      const formattedDate = this.formatDate(date);

      let day = this.attendanceDays.find((d) => d.date === formattedDate);
      if (!day)
        day =
          this.extraAttendance.find((d) => d.date === formattedDate) || null;

      this.selectedAttendance = day;
    },
  },
};
</script>
