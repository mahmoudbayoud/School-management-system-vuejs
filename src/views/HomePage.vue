<template>
  <v-container>
    <!-- Cards Section -->
    <v-row style="margin-right: 21px">
      <v-col cols="12" md="3" v-for="card in cards" :key="card.title">
        <v-card
          class="pa-4"
          outlined
          width="350"
          height="220"
          style="border-radius: 8px"
        >
          <div class="d-flex justify-space-between align-center">
            <div style="margin-bottom: 30px">
              <div style="height: 20px"></div>
              <div class="mb-5" style="font-size: 22px; font-weight: bold">
                {{ card.title }}
              </div>
              <div class="mb-5" style="font-size: 24px; font-weight: bold">
                {{ card.value }}
              </div>
              <div style="font-size: 16px; font-weight: normal">
                {{ card.description }}
              </div>
            </div>
            <v-chip
              :color="card.change >= 0 ? 'green lighten-3' : 'red lighten-3'"
              class="ma-2"
              small
            >
              {{ card.change >= 0 ? "+" : "" }}{{ card.change }}%
            </v-chip>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Section -->
    <v-row>
      <v-col md="2">
        <v-card
          class="pa-4 d-flex flex-column align-center"
          elevation="1"
          style="border-radius: 8px; background-color: white"
        >
          <!-- العنوان -->
          <div
            style="
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
              text-align: center;
            "
          >
            تقييم المدرسة
          </div>

          <!-- زر التحديث -->
          <v-btn
            color="#eee"
            elevation="0.2"
            rounded
            class="mb-2"
            @click="fetchdata1"
          >
            <v-icon>mdi-update</v-icon>
          </v-btn>

          <!-- نص الانتظار -->
          <div
            v-if="loading1"
            style="
              text-align: center;
              font-size: 16px;
              color: gray;
              margin-bottom: 10px;
            "
          >
            الرجاء الانتظار قليلا...
          </div>

          <!-- Vertical Progress Bar -->
          <div
            style="
              position: relative;
              width: 40px;
              height: 350px;
              background-color: #eee;
              border-radius: 12px;
              overflow: hidden;
              margin-top: 10px;
              margin-bottom: 20px;
              display: flex;
              align-items: flex-end;
            "
          >
            <div
              :style="{
                height: progress + '%',
                width: '100%',
                backgroundColor: progressColor,
                transition: 'height 0.5s ease',
              }"
            ></div>
          </div>

          <!-- الدوائر الملونة أسفل البار -->
          <div
            style="
              display: flex;
              justify-content: space-between;
              width: 100%;
              max-width: 180px;
            "
          >
            <div class="d-flex flex-column align-center">
              <v-avatar size="24" color="red"></v-avatar>
              <span style="font-size: 12px; margin-top: 4px">10-40</span>
            </div>
            <div class="d-flex flex-column align-center">
              <v-avatar size="24" color="yellow"></v-avatar>
              <span style="font-size: 12px; margin-top: 4px">41-70</span>
            </div>
            <div class="d-flex flex-column align-center">
              <v-avatar size="24" color="green"></v-avatar>
              <span style="font-size: 12px; margin-top: 4px">71-100</span>
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col md="6">
        <v-card class="pa-4" outlined width="820">
          <div class="mb-4" style="font-size: 24px; font-weight: bold">
            حالة الحضور والغياب
          </div>
          <apexchart
            type="bar"
            height="458"
            width="780"
            :options="barChartOptions"
            :series="barSeries"
          />
        </v-card>
      </v-col>

      <v-col md="4">
        <v-card class="pa-4" outlined width="464">
          <div class="mb-4" style="font-size: 24px; font-weight: bold">
            توزيع الطلاب
          </div>
          <apexchart
            type="pie"
            height="450"
            :options="pieChartOptions"
            :series="pieSeries"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <div style="height: 8px"></div>
    <v-row dir="rtl">
      <v-col cols="2" style="font-size: 24px; font-weight: bold">الطلاب</v-col>
    </v-row>
    <v-row justify="space-between">
      <v-col cols="5">
        <v-select
          v-model="filterBy"
          :items="filterOptions"
          label="اضافة فلتر"
          item-title="text"
          item-value="value"
          variant="outlined"
          hide-details
          append-inner-icon="mdi-account-filter-outline"
          class="mr-4"
          style="
            max-width: 200px;
            height: 64px;
            margin-left: 132px;
            direction: rtl;
          "
          density="comfortable"
        ></v-select>
      </v-col>
      <v-col cols="7">
        <v-text-field
          v-model="search"
          placeholder="ابحث عن طالب"
          variant="outlined"
          append-inner-icon="mdi-magnify"
          clearable
          dir="rtl"
          style="flex: 1; max-width: 780px; height: 64.1px; margin-right: 170px"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-container v-if="loading" class="text-center">
      <v-row
        v-if="loading"
        align="center"
        justify="center"
        style="height: 40vh"
      >
        <v-col cols="12" class="text-center">
          <v-progress-circular
            indeterminate
            color="#800080"
            size="100"
            width="10"
          >
          </v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-data-table
        v-if="this.items.length != 0"
        :headers="headers"
        :items="filteredItems"
        :item-class="getRowClass"
        class="elevation-1"
        style="width: 1332px !important; margin-top: 25px; margin-left: 109px"
      >
        <template #headers>
          <tr
            style="
              background-color: #f1f4f1;
              color: #800080;
              height: 77px;
              font-size: 18px;
              font-weight: bold !important;
              text-align: center !important;
            "
            dir="rtl"
          >
            <th style="font-weight: bold">خصائص</th>
            <th style="font-weight: bold">الشعبة</th>
            <th style="font-weight: bold">الصف</th>
            <th style="font-weight: bold">اسم الاب</th>
            <th style="font-weight: bold">البريد الالكتروني</th>
            <th style="font-weight: bold">الاسم الكامل</th>
            <th></th>
          </tr>
        </template>

        <template #item="{ item, index }">
          <tr
            :class="getRowClass(item, index)"
            @click="goToPage(item)"
            style="cursor: pointer; height: 16px !important; font-size: 17px"
          >
            <td>
              <v-btn
                variant="plain"
                color="black"
                elevation="0"
                style="min-width: 0; padding: 0"
                icon
                ><v-icon>mdi-dots-vertical</v-icon></v-btn
              >
            </td>
            <td>{{ item.school_class_division }}</td>
            <td>{{ item.class_name }}</td>
            <td>{{ item.parent_name }}</td>
            <td>
              <span style="vertical-align: middle">{{ item.email }}</span>
              <img
                src="../assets/Appbar/Photo.png"
                alt=""
                style="
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  vertical-align: middle;
                  margin-left: 6px;
                "
              />
            </td>

            <td>{{ item.name }}</td>
            <td @click.stop>
              <v-checkbox
                style="margin-top: 16px"
                v-model="item.checked"
                @change="deleteRow(item)"
              ></v-checkbox>
            </td>
          </tr>
        </template>
      </v-data-table>
      <div v-else class="mb" style="margin-top: 80px">
        <v-contianier>
          <v-row
            ><v-col cols="12" style="margin-bottom: 16px">
              <span style="font-size: 36px; color: #8a8a8a"
                >لا يوجد طلاب</span
              ></v-col
            ></v-row
          >
          <v-row
            ><v-col cols="12"
              ><img
                src="../assets/Icons/student-svgrepo-com 1.svg"
                alt="" /></v-col
          ></v-row>
        </v-contianier>
      </div> </v-container
  ></v-container>
</template>

<script>
import { defineComponent } from "vue";
import VueApexCharts from "vue3-apexcharts";
import useGetDataMixin from "@/mixins/useGetDataMixin";
import usePostDataMixin from "@/mixins/usePostDataMixin";
export default defineComponent({
  mixins: [useGetDataMixin, usePostDataMixin],
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      progress: "", // نسبة التقدم
      loading: false,
      loading1: false,
      search: "",
      filterBy: null,
      parent: "",
      school: {
        email: "",
        password: "",
      },
      filterOptions: [
        { text: "اسم الطالب", value: "name" },
        { text: "بريده الالكتروني", value: "email" },
      ],
      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [],
      cards: [
        {
          title: "عدد الطلاب المسجلين",
          value: 9,
          description: "مقارنة بالفصل الماضي",
          change: 1.5,
        },
        {
          title: "عدد المعلمين",
          value: 10,
          description: "مقارنة بالفصل الماضي",
          change: 1.5,
        },
        {
          title: "الغيابات اليومية",
          value: 1,
          description: "مقارنة باليوم الماضي",
          change: -2.1,
        },
        {
          title: "الشكاوي اليومية",
          value: 3,
          description: "مقارنة باليوم الماضي",
          change: -1.5,
        },
      ],
      barSeries: [
        {
          name: "حضور",
          data: [8, 8, 9, 10, 7, 10],
        },
        {
          name: "غياب",
          data: [2, 2, 1, 0, 7, 0],
        },
      ],
      barChartOptions: {
        chart: {
          type: "bar",
        },
        xaxis: {
          categories: ["كانون", "شباط", "آذار", "نيسان", "أيار", "حزيران"],
        },
        plotOptions: {
          bar: {
            borderRadius: 16, // نصف القطر
            columnWidth: "45%",
            borderRadiusApplication: "end",
            endingShape: "rounded", // نهاية العمود مستديرة
          },
        },
        colors: ["#66FF66", "#FF7F7F"],
        dataLabels: {
          enabled: false,
        },
        legend: {
          position: "top",
        },
      },
      pieSeries: [1, 1, 4, 1, 1, 1],
      pieChartOptions: {
        labels: ["السادس", "الخامس", "الرابع", "الثالث", "الثاني", "الاول"],
        colors: [
          "#2196f3",
          "#ff9800",
          "#f44336",
          "#4caf50",
          "#9c27b0",
          "#00F0E4",
        ],
        legend: {
          position: "bottom",
        },
      },
    };
  },
  computed: {
    filteredItems() {
      const term = this.search.toLowerCase();
      return this.items.filter((item) =>
        (item[this.filterBy] || "").toLowerCase().includes(term)
      );
    },
    progressColor() {
      if (this.progress < 40) return "red";
      else if (this.progress < 80) return "yellow";
      else return "green";
    },
  },
  methods: {
    async fetchdata3() {
      const storedData = await localStorage.getItem("userData");
      if (storedData) {
        this.userData = JSON.parse(storedData);
        this.school.email = this.userData.email || "";
        this.school.password = this.userData.password || "";
      }
    },
    async fetchdata1() {
      this.loading1 = true;
      try {
        await this.fetchData("/rate");
        console.log("API response:", this.getData);

        // تخزين قيمة evaluation في progress
        this.progress = this.getData.evaluation;
        console.log("Progress:", this.progress);

        // حفظ في localStorage
        localStorage.setItem("schoolEvaluation", this.progress);
        const form = {
          email: this.school.email,
          password: this.school.password,
          type: "3",
        };
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
        }, 2000);
      } catch (error) {
        console.error("Error fetching data:", error);
        this.progress = 0;

        // حفظ القيمة الافتراضية في localStorage
        localStorage.setItem("schoolEvaluation", this.progress);
      } finally {
        this.loading1 = false;
      }
    },
    getStoredEvaluation() {
      const savedProgress = localStorage.getItem("schoolEvaluation");
      if (savedProgress !== null) {
        return parseInt(savedProgress);
      }
      return 0; // قيمة افتراضية إذا لم يوجد شيء مخزن
    },
    getRowClass(item, index) {
      const rowColors = ["row-color-1", "row-color-2"];
      return rowColors[index % rowColors.length];
    },
    async fetchParent(item) {
      const payload = {
        student_id: item.id,
      };
      await this.sendData("/student/show", payload);
      return this.postData.data;
    },
    async goToPage(item) {
      const parent = await this.fetchParent(item);
      const selectedparentName = parent.name;
      const selectedparentEmail = parent.email;
      const selectedparentPhone = parent.phone;
      this.$router.push({
        name: "StudentDetails",
        state: {
          studentData: {
            name: item.name,
            email: selectedparentEmail,
            phone: selectedparentPhone,
            pname: selectedparentName,
            class: item.class_name,
            division: item.school_class_division,
          },
        },
      });
    },
    deleteRow(itemToDelete) {
      this.items = this.items.filter((item) => item.id !== itemToDelete.id);
    },
    submitForm() {
      this.$router.push({ name: "AddStudentPage" });
    },
    async fetchdata() {
      this.loading = true;
      await this.fetchData("/getStudentsInfoForSchool")
        .then(() => {
          this.items = this.getData.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      this.loading = false;
    },
  },
  mounted() {
    this.fetchdata();
    this.fetchdata3();
    this.progress = this.getStoredEvaluation();
  },
});
</script>

<style scoped>
body {
  font-family: "Cairo", sans-serif;
}
.v-card {
  height: 100%;
}
.row-color-1 {
  background-color: white;
}
.row-color-2 {
  background-color: #ebf6ff;
}
.custom-input :deep(.v-field__input) {
  direction: rtl !important;
}
.v-data-table table {
  direction: rtl;
}
.v-data-table table td,
.v-data-table table th {
  text-align: right;
  vertical-align: middle !important;
}
.mb {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
