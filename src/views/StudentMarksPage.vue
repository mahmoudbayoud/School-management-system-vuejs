<template>
  <v-container class="mt-6" dir="rtl">
    <!-- العنوان + صورة الطالب -->
    <v-row class="mb-6" align="center" justify="center">
      <div style="display: flex; align-items: center; gap: 16px">
        <!-- الصورة في اليمين -->

        <!-- الاسم -->
        <div>
          <h2
            style="
              color: #800080;
              font-weight: bold;
              margin: 0;
              font-size: 22px;
            "
          >
            {{ $route.query.student_name }}
          </h2>
          <p style="color: #666; margin: 0; font-size: 16px">
            النتائج الامتحانية
          </p>
        </div>
        <v-avatar size="80">
          <v-img src="https://i.pravatar.cc/150?img=8" />
        </v-avatar>
      </div>
    </v-row>

    <!-- بطاقة الفصل الأول -->
    <v-card
      elevation="1"
      class="mb-4 pa-3 text-center"
      style="max-width: 300px; margin: auto"
    >
      <span style="font-weight: bold; color: gray; font-size: 16px">
        نتائج الفصل الأول
      </span>
    </v-card>

    <!-- جدول العلامات -->
    <v-simple-table
      dir="rtl"
      style="width: 100%; margin: auto; font-size: 19px"
    >
      <thead style="background: #f3e5f5">
        <tr>
          <th class="text-center pa-4">المادة</th>
          <th class="text-center pa-4">الشفهي</th>
          <th class="text-center pa-4">المذاكرة</th>
          <th class="text-center pa-4">الامتحان</th>
          <th class="text-center pa-4">الحضور</th>
          <th class="text-center pa-4">المجموع</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(mark, index) in limitedMarks"
          :key="index"
          :style="{
            background: index % 2 === 0 ? 'white' : '#fafafa',
            fontSize: '17px',
          }"
        >
          <td class="text-center pa-4" style="color: #800080; font-weight: 600">
            {{ mark.subject_name }}
          </td>
          <td class="text-center pa-4" style="color: green">
            {{ mark.oral }}
          </td>
          <td class="text-center pa-4" style="color: gray">
            {{ mark.homework }}
          </td>
          <td class="text-center pa-4" style="color: #800080">
            {{ mark.exam }}
          </td>
          <td class="text-center pa-4" style="color: green">
            {{ mark.attendance_grade }}
          </td>
          <td
            class="text-center pa-4"
            style="color: #800080; font-weight: bold"
          >
            {{ mark.total_marks }}
          </td>
        </tr>
        <tr v-if="marks.length === 0">
          <td colspan="6" class="text-center grey--text pa-6">
            لا توجد نتائج لعرضها.
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <!-- المجموع النهائي -->
    <v-card
      class="mt-6 pa-4"
      elevation="2"
      style="max-width: 350px; margin: auto; text-align: center"
    >
      <span style="font-weight: bold; color: #555; font-size: 16px">
        المجموع النهائي:
      </span>
      <span
        style="
          color: #800080;
          font-weight: bold;
          font-size: 18px;
          margin-right: 8px;
        "
      >
        {{ finalTotalMarks || "N/A" }}
      </span>
    </v-card>
  </v-container>
</template>

<script>
import useGetDataMixin from "@/mixins/useGetDataMixin";
import usePostDataMixin from "@/mixins/usePostDataMixin";
export default {
  mixins: [useGetDataMixin, usePostDataMixin],
  name: "StudentMarksPage",
  props: {
    studentId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      studentName: "محمد أحمد", // لاحقاً من API
      marks: [],
      finalTotalMarks: null,
    };
  },
  mounted() {
    this.fetchStudentMarks(this.$route.query.student_id);
  },
  computed: {
    limitedMarks() {
      // take only the first 6 rows
      return this.marks.slice(0, 6);
    },
  },
  methods: {
    async fetchStudentMarks(schooldId) {
      try {
        await this.sendData("/showFinallyResult", {
          student_id: schooldId,
        });

        console.log(this.postData); // شوف شو جاي من API

        if (this.postData && this.postData.status === "success") {
          this.marks = this.postData.data;
          this.finalTotalMarks = this.postData.finalTotalMarks;
        }
      } catch (error) {
        console.error("Error fetching student marks:", error);
      }
    },
  },
};
</script>
