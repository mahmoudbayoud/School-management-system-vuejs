<template>
  <div dir="rtl">
    <v-container class="mt-6 gap-y-4">
      <v-row>
        <v-col class="text-end" cols="11">
          <span style="font-size: 22px; font-weight: bold">الحافلات</span>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="text-end" cols="11">
          <v-btn
            class="btn"
            @click="submitForm"
            style="background: none; box-shadow: none; color: #800080"
            width="122.96px"
            height="48.53px"
          >
            csv تصدير
          </v-btn>
          <v-btn
            class="btn"
            color="#800080"
            @click="submitForm"
            style="margin-left: 12px"
            width="122.96px"
            height="48.53px"
          >
            اضافة حافلة
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="mb-4" justify="space-between">
        <v-col cols="9">
          <v-text-field
            v-model="search"
            placeholder="ابحث عن حافلة"
            variant="outlined"
            append-inner-icon="mdi-magnify"
            clearable
            dir="rtl"
            style="
              flex: 1;
              max-width: 922px;
              height: 64.1px;
              margin-left: 340px;
            "
          ></v-text-field>
        </v-col>

        <v-col>
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
              margin-left: 10px;
              direction: rtl;
            "
            density="comfortable"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <v-container v-if="loading" class="text-center">
    <v-row v-if="loading" align="center" justify="center" style="height: 40vh">
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
  <v-container fluid v-else>
    <v-row dense dir="rtl">
      <v-col
        v-for="(student, index) in items"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        style="margin-right: 180px"
      >
        <v-card class="pa-4" elevation="1" shaped width="600px" height="281px">
          <div style="height: 32px"></div>
          <v-row>
            <v-col cols="2">
              <v-icon color="deep-purple accent-4">mdi-map-marker</v-icon>
            </v-col>
            <v-col cols="8" class="text-center">
              <v-avatar size="81">
                <v-img src="https://randomuser.me/api/portraits/men/1.jpg" />
              </v-avatar>
            </v-col>
          </v-row>
          <v-card-text
            class="text-center"
            style="direction: rtl; margin-right: 110px"
          >
            <div class="info-row">
              <div class="info-item">
                <span class="label" style="font-weight: normal; color: #86888b"
                  >اسم السائق:</span
                >
                <span class="value" style="color: #86888b">{{
                  student.name
                }}</span>
              </div>
              <div class="info-item">
                <span class="label" style="font-weight: normal; color: #86888b"
                  >رقم السائق:</span
                >
                <span class="value" style="color: #86888b">{{
                  student.phone
                }}</span>
              </div>
              <div class="info-item">
                <span class="label" style="font-weight: normal; color: #86888b"
                  >سعة الحافلة:</span
                >
                <span class="value" style="color: #86888b"
                  >{{ student.bus_capacity }} /
                  {{ student.number_of_students }}</span
                >
              </div>
              <div class="info-item">
                <span class="label" style="font-weight: normal; color: #86888b">
                  حساب السائق :</span
                >
                <span class="value" style="color: #86888b">{{
                  student.email
                }}</span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import useGetDataMixin from "@/mixins/useGetDataMixin";
import usePostDataMixin from "@/mixins/usePostDataMixin";
export default {
  mixins: [useGetDataMixin, usePostDataMixin],
  data() {
    return {
      items: [],
      loading: false,
      students: [
        {
          name: "محمد خليل",
          phone: "0945654534",
          grade: "2/2",
          studentId: "#235475",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
          name: "بوبوبوبوبوبوبومحمد خليل",
          phone: "0945654534",
          grade: "2/2",
          studentId: "#235475",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
          name: "بوبوبوبوبوبوبومحمد خليل",
          phone: "0945654534",
          grade: "2/2",
          studentId: "#235475",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
          name: "بوبوبوبوبوبوبومحمد خليل",
          phone: "0945654534",
          grade: "2/2",
          studentId: "#235475",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
          name: "بوبوبوبوبوبوبومحمد خليل",
          phone: "0945654534",
          grade: "2/2",
          studentId: "#235475",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
          name: "بوبوبوبوبوبوبومحمد خليل",
          phone: "0945654534",
          grade: "2/2",
          studentId: "#235475",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
      ],
    };
  },
  methods: {
    async fetchdata() {
      this.loading = true;
      await this.fetchData("/buses")
        .then(() => {
          this.items = this.getData.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      setTimeout(() => {
        this.loading = false;
      }, 10000);
      this.loading = false; // 🔁 always set this to false, even if there's an error
    },
    submitForm() {
      this.$router.push({ name: "AddBusDriverPage" });
    },
  },
  mounted() {
    this.fetchdata();
  },
};
</script>

<style scoped>
.v-card {
  border-radius: 12px;
}
.info-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
  justify-content: flex-end;
  align-items: center;
}

.label {
  width: 100px; /* تحكم في عرض الحقل */
  font-weight: bold;
  color: #444;
  flex-shrink: 0;
}

.value {
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #222;
}
</style>
