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
            style="background: none; box-shadow: none; color: #800080"
            width="122.96px"
            height="48.53px"
            @click="exportCsv"
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

    <!-- Bus Cards and Loading Wrapper -->
    <div>
      <!-- Loading -->
      <v-container v-if="loading" class="text-center">
        <v-row align="center" justify="center" style="height: 40vh">
          <v-col cols="12" class="text-center">
            <v-progress-circular
              indeterminate
              color="#800080"
              size="100"
              width="10"
            />
          </v-col>
        </v-row>
      </v-container>

      <!-- Bus Cards -->
      <v-container fluid v-if="!loading">
        <v-row dense dir="rtl">
          <v-col
            v-for="(bus, index) in filteredItems"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            style="margin-right: 180px"
          >
            <v-card
              class="pa-4"
              elevation="1"
              shaped
              width="600px"
              height="295px"
            >
              <div style="height: 32px"></div>
              <v-row>
                <v-col cols="2">
                  <v-icon
                    color="deep-purple accent-4"
                    @click="openMapDialog"
                    style="cursor: pointer"
                  >
                    mdi-map-marker
                  </v-icon>
                </v-col>
                <v-col cols="8" class="text-center">
                  <v-avatar size="81">
                    <v-img
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                    />
                  </v-avatar>
                </v-col>
              </v-row>
              <v-card-text
                class="text-center"
                style="direction: rtl; margin-right: 110px"
              >
                <div class="info-row">
                  <div class="info-item">
                    <span class="label">اسم السائق:</span>
                    <span class="value">{{ bus.name }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">رقم السائق:</span>
                    <span class="value">{{ bus.phone }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">سعة الحافلة:</span>
                    <span class="value"
                      >{{ bus.bus_capacity }} / {{ bus.students.length }}</span
                    >
                  </div>
                  <div class="info-item">
                    <span class="label">حساب السائق:</span>
                    <span class="value">{{ bus.email }}</span>
                  </div>
                </div>
              </v-card-text>

              <!-- Gray small text to show students -->
              <div
                class="text-center"
                style="
                  color: gray;
                  font-size: 14px;
                  cursor: pointer;
                  margin-top: 8px;
                "
                @click="openStudentsDialog(bus)"
              >
                انقر لعرض طلاب الباص
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Dialog to show students -->
    <v-dialog v-model="dialog" max-width="500px" rounded="lg">
      <v-card>
        <v-card-title
          class="text-h6"
          style="
            font-weight: bold;
            font-size: 22px;
            text-align: center;
            width: 100%;
            color: #800080;
            font-family: 'Cairo', sans-serif;
          "
        >
          طلاب الباص
        </v-card-title>

        <v-card-text>
          <ul
            style="
              list-style-type: none;
              padding: 0;
              margin: 0;
              text-align: right;
              font-family: 'Cairo', sans-serif;
            "
          >
            <li
              v-for="(student, index) in selectedBusStudents"
              :key="index"
              style="padding: 12px 0; border-bottom: 1px solid #eee"
            >
              <div style="font-weight: bold; font-size: 16px; color: #800080">
                {{ student }}
              </div>
            </li>
          </ul>
        </v-card-text>

        <v-card-actions style="justify-content: center; margin-top: 10px">
          <v-btn
            color="#800080"
            dark
            rounded
            elevation="2"
            style="
              padding: 8px 24px;
              font-weight: bold;
              font-family: 'Cairo', sans-serif;
            "
            @click="dialog = false"
          >
            إغلاق
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog to show map photo -->
    <v-dialog v-model="dialog1" max-width="500px" rounded="lg" height="300px">
      <v-card>
        <v-card-title
          class="text-h6"
          style="
            font-weight: bold;
            font-size: 22px;
            text-align: center;
            color: #800080;
          "
        >
          موقع الحافلة
        </v-card-title>

        <v-card-text class="text-center" style="min-height: 300px">
          <v-progress-circular
            v-if="loading1"
            indeterminate
            color="#800080"
            size="80"
            width="10"
          ></v-progress-circular>
          <v-img
            v-else
            :src="mapPhoto"
            max-width="100%"
            max-height="200"
            contain
          ></v-img>
        </v-card-text>

        <v-card-actions style="justify-content: center">
          <v-btn
            color="#800080"
            dark
            rounded
            elevation="2"
            style="margin-top: -250px"
            @click="dialog1 = false"
          >
            إغلاق
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import useGetDataMixin from "@/mixins/useGetDataMixin";
import usePostDataMixin from "@/mixins/usePostDataMixin";
import busMap from "@/assets/map.jpg";
export default {
  mixins: [useGetDataMixin, usePostDataMixin],
  data() {
    return {
      items: [],
      loading: false,
      search: "",
      mapPhoto: busMap,
      dialog: false,
      selectedBusStudents: [],
      dialog1: false,
      loading1: false,

      filterBy: null,
      filterOptions: [],
    };
  },
  computed: {
    filteredItems() {
      if (!this.search) return this.items;
      return this.items.filter((bus) =>
        bus.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    openMapDialog() {
      this.dialog1 = true;
      this.loading1 = true;
      this.mapPhoto = "";

      setTimeout(() => {
        this.loading1 = false;
        this.mapPhoto = busMap; // نفس الصورة لجميع الحافلات
      }, 5000);
    },

    openStudentsDialog(bus) {
      this.selectedBusStudents = bus.students.map((s) => s); // array of student names
      this.dialog = true;
    },

    async fetchdata() {
      this.loading = true;
      await this.fetchData("/buses")
        .then(() => {
          this.items = this.getData.data.map((bus) => ({
            ...bus,
            students: bus.students || [],
          }));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      this.loading = false;
    },

    submitForm() {
      this.$router.push({ name: "AddBusDriverPage" });
    },

    exportCsv() {
      alert("تصدير CSV");
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
}
.label {
  width: 100px;
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
