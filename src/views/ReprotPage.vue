<template>
  <v-container class="fill-height d-flex justify-center align-center" dir="rtl">
    <!-- Loader -->
    <v-card class="pa-6 text-center" dir="rtl">
      <v-progress-circular indeterminate color="#800080" size="80" width="8" />
      <div class="mt-4 font-weight-bold">جاري توليد التقرير...</div>
    </v-card>

    <!-- المحتوى المخفي للتقرير -->
    <div
      ref="pdfContent"
      style="display: none; padding: 20px; font-family: Cairo"
      dir="rtl"
    >
      <h1 style="text-align: center; color: #800080">تقرير المدرسة</h1>
      <p><b>اسم المدرسة:</b> {{ reportData.schoolname }}</p>
      <p><b>عدد الطلاب:</b> {{ reportData.studentsCount }}</p>
      <p><b>عدد المعلمين:</b> {{ reportData.teachersCount }}</p>
      <p><b>عدد الباصات:</b> {{ reportData.busesCount }}</p>
      <p><b>تقييم المدرسة:</b> {{ reportData.schoolRating }}%</p>
      <p><b>عنوان المدرسة:</b> {{ reportData.schoolAddress }}</p>

      <h3>عدد الطلاب في كل صف</h3>
      <table
        border="1"
        style="border-collapse: collapse; width: 100%; text-align: center"
      >
        <thead dir="rtl">
          <tr>
            <th>الصف</th>
            <th>عدد الطلاب</th>
          </tr>
        </thead>
        <tbody dir="rtl">
          <tr v-for="g in reportData.studentsPerGrade" :key="g.grade">
            <td>{{ g.grade }}</td>
            <td>{{ g.count }}</td>
          </tr>
        </tbody>
      </table>

      <h3 dir="rtl">الأقساط</h3>
      <ul dir="rtl">
        <li dir="rtl">قسط الصف 1-3: {{ reportData.fees.lowerGrades }}</li>
        <li dir="rtl">قسط الصف 4-6: {{ reportData.fees.upperGrades }}</li>
        <li dir="rtl">خدمة النقل: {{ reportData.fees.transport }}</li>
      </ul>

      <h3 dir="rtl">حالات الحضور والغياب</h3>
      <canvas ref="chartCanvas" width="700" height="320"></canvas>
    </div>
  </v-container>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Chart from "chart.js/auto";

export default {
  name: "ReportView",
  data() {
    return {
      reportData: {
        schoolname: "مدرسة الامل الخاصة",
        schoolAddress: "شارع الحضارة - حمص",
        schoolRating: 0,
        studentsCount: 10,
        teachersCount: 11,
        busesCount: 7,
        studentsPerGrade: [
          { grade: "الأول", count: 1 },
          { grade: "الثاني", count: 1 },
          { grade: "الثالث", count: 1 },
          { grade: "الرابع", count: 4 },
          { grade: "الخامس", count: 1 },
          { grade: "السادس", count: 2 },
        ],
        fees: {
          lowerGrades: "100000 ل.س",
          upperGrades: "120000 ل.س",
          transport: "200000 ل.س",
        },
        attendanceByMonth: [
          { month: "يناير", present: 8, absent: 1 },
          { month: "فبراير", present: 9, absent: 0 },
          { month: "مارس", present: 8, absent: 1 },
          { month: "أبريل", present: 8, absent: 1 },
        ],
      },
    };
  },
  mounted() {
    const evalValue = localStorage.getItem("schoolEvaluation");
    console.log(evalValue);
    if (evalValue) {
      this.reportData.schoolRating = evalValue; // مثلاً 45
    } else {
      this.reportData.schoolRating = 0; // قيمة افتراضية
    }

    // بدء إنشاء التقرير
    this.generateReport();
  },
  methods: {
    async generateReport() {
      // محاكاة تحميل 5 ثواني
      await new Promise((r) => setTimeout(r, 5000));

      // رسم المخطط
      await this.$nextTick();
      const ctx = this.$refs.chartCanvas.getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.reportData.attendanceByMonth.map((m) => m.month),
          datasets: [
            {
              label: "حضور %",
              data: this.reportData.attendanceByMonth.map((m) => m.present),
              backgroundColor: "#4CAF50",
            },
            {
              label: "غياب %",
              data: this.reportData.attendanceByMonth.map((m) => m.absent),
              backgroundColor: "#F44336",
            },
          ],
        },
        options: {
          responsive: false,
          scales: { y: { beginAtZero: true, max: 100 } },
        },
      });

      await new Promise((r) => setTimeout(r, 300));

      // توليد صورة من المحتوى
      const el = this.$refs.pdfContent;
      el.style.display = "block";
      const canvas = await html2canvas(el, { scale: 2 });
      el.style.display = "none";

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      pdf.save("تقرير_المدرسة.pdf");
      this.$router.push({ name: "HomePage" });
    },
  },
};
</script>
