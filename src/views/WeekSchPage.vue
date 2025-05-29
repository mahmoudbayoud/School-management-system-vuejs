<template>
  <v-container fluid class="pa-4" style="direction: rtl">
    <div style="height: 32px"></div>
    <v-row
      ><v-col cols="3"
        ><span style="font-weight: bold; font-size: 20px"
          >برنامج الدوام :</span
        ></v-col
      ></v-row
    >
    <div style="height: 12xp"></div>
    <v-card class="pa-6" elevation="0">
      <v-simple-table class="text-center mb-4" dense>
        <thead>
          <tr>
            <th class="text-right">اليوم / الساعة</th>
            <td v-for="hour in hours" :key="hour" class="text-center">
              {{ hour }}
            </td>
            <td width="32px"></td>

            <td>
              <v-btn color="#800080" @click="submitSchedule"
                ><v-icon size="24px">mdi-cloud-cog-outline</v-icon></v-btn
              >
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="day in days" :key="day">
            <td class="text-right">{{ day }}</td>
            <td v-for="hour in hours" :key="hour" class="px-1 py-2">
              <v-btn
                :color="getColor(day, hour)"
                class="ma-1"
                style="min-width: 90px; height: 50px"
                @click="openPopup(day, hour)"
              >
                {{ schedule[day]?.[hour] || "اختر المادة" }}
              </v-btn>
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
    <v-card
      width="1000px"
      height="91px"
      style="
        display: flex;
        align-items: center;
        margin-right: 280px;
        margin-top: 40px;
      "
    >
      <v-row dir="rtl">
        <v-col cols="4">اسم المدرس : سامي العلي</v-col>
        <v-col cols="4">الصف : الثاني</v-col>
        <v-col cols="4">الشعبة : الثالثة</v-col>
      </v-row>
    </v-card>
    <v-container>
      <div style="height: 8px"></div>
      <v-row dir="rtl">
        <v-col cols="2" style="font-size: 24px; font-weight: bold"
          >المستخدمين</v-col
        >
      </v-row>
      <v-row justify="space-between">
        <v-col cols="3">
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
              margin-left: 124px;
              direction: rtl;
            "
            density="comfortable"
          ></v-select>
        </v-col>
        <v-col cols="3">
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
              margin-left: 1px;
              direction: rtl;
            "
            density="comfortable"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="search"
            placeholder="ابحث عن طالب"
            variant="outlined"
            append-inner-icon="mdi-magnify"
            clearable
            dir="rtl"
            style="
              flex: 1;
              max-width: 680px;
              height: 64.1px;
              margin-right: 170px;
            "
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
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-row dir="rtl"
          ><v-col cols="2"
            ><v-btn elevation="0" @click="dialog = false"
              ><v-icon color="red">mdi-close</v-icon></v-btn
            ></v-col
          >
          <v-col cols="8">
            <v-card-title
              class="text-center"
              style="font-weight: bold; font-family: 'Cairo'; font-size: 18px"
            >
              اختر المادة
            </v-card-title>
          </v-col>
        </v-row>

        <v-card-text>
          <v-row>
            <v-col
              v-for="material in materials"
              :key="material"
              cols="12"
              sm="6"
            >
              <v-btn
                block
                color="secondary"
                @click="selectMaterial(material)"
                style="
                  font-family: 'Cairo';
                  font-weight: normal;
                  font-size: 14px;
                "
              >
                {{ material }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import useGetDataMixin from "@/mixins/useGetDataMixin";
import usePostDataMixin from "@/mixins/usePostDataMixin";
export default {
  mixins: [useGetDataMixin, usePostDataMixin],
  data() {
    return {
      loading: false,
      search: "",
      filterBy: null,
      parent: "",
      items: [],
      days: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس"],
      hours: [
        "08:00 AM",
        "08:45 AM",
        "9:45 AM",
        "10:30 AM",
        "11:30 PM",
        "12:15 PM",
      ],
      materials: ["رياضيات", "علوم", "عربي", "تاريخ", "جغرافيا", "إنجليزي"],
      dayDates: {
        الأحد: "2025-05-11",
        الاثنين: "2025-05-12",
        الثلاثاء: "2025-05-13",
        الأربعاء: "2025-05-14",
        الخميس: "2025-05-15",
      },
      schedule: {},
      dialog: false,
      selectedDay: "",
      selectedHour: "",
      formattedSchedule: {},
    };
  },
  methods: {
    openPopup(day, hour) {
      this.selectedDay = day;
      this.selectedHour = hour;
      this.dialog = true;
    },
    selectMaterial(material) {
      if (!this.schedule[this.selectedDay]) {
        this.schedule[this.selectedDay] = {};
      }
      this.schedule[this.selectedDay][this.selectedHour] = material;
      this.dialog = false;
    },
    getColor(day, hour) {
      return this.schedule[day]?.[hour] ? "green darken-1" : "#F8F4F8";
    },
    submitSchedule() {
      const result = {};

      for (const day of this.days) {
        const entries = [];

        if (this.schedule[day]) {
          for (const hour of this.hours) {
            const subject = this.schedule[day][hour];
            if (subject) {
              entries.push({
                date: this.dayDates[day],
                time: hour,
                subject: subject,
              });
            }
          }
        }

        if (entries.length > 0) {
          result[day] = entries;
        }
      }

      this.formattedSchedule = result;

      console.log("✅ Final Schedule to send:", result);

      // يمكنك الإرسال عبر API:
      // axios.post('/api/schedule', result).then(...)
    },
    loadScheduleFromAPI(apiData) {
      const parsed = {};

      for (const day in apiData) {
        parsed[day] = {};
        for (const entry of apiData[day]) {
          parsed[day][entry.time] = entry.subject;
        }
      }

      this.schedule = parsed;
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
      this.loading = true;
    },
  },
  mounted() {
    this.fetchdata();
    const apiResponse = {
      الأحد: [
        { date: "2025-05-11", time: "08:00 AM", subject: "رياضيات" },
        { date: "2025-05-11", time: "09:00 AM", subject: "علوم" },
        { date: "2025-05-11", time: "10:00 AM", subject: "عربي" },
        { date: "2025-05-11", time: "11:00 AM", subject: "تاريخ" },
        { date: "2025-05-11", time: "12:00 PM", subject: "إنجليزي" },
        { date: "2025-05-11", time: "01:00 PM", subject: "رياضة" },
      ],
      الاثنين: [
        { date: "2025-05-12", time: "08:00 AM", subject: "رياضيات" },
        { date: "2025-05-12", time: "09:00 AM", subject: "علوم" },
        { date: "2025-05-12", time: "10:00 AM", subject: "عربي" },
        { date: "2025-05-12", time: "11:00 AM", subject: "تاريخ" },
        { date: "2025-05-12", time: "12:00 PM", subject: "إنجليزي" },
        { date: "2025-05-12", time: "01:00 PM", subject: "فنية" },
      ],
      // يمكنك إضافة بقية الأيام هنا...
    };

    // استدعاء الدالة لتحميل البيانات في الجدول
    this.loadScheduleFromAPI(apiResponse);
  },
};
</script>
<style scoped>
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
