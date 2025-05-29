<template>
  <div dir="rtl">
    <v-container class="mt-6 gap-y-4">
      <v-row>
        <v-col class="text-end" cols="11">
          <span style="font-size: 22px; font-weight: normal">الطلاب</span>
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
            اضافة طالب
          </v-btn>
        </v-col>
      </v-row>

      <v-row class="mb-4" justify="space-between">
        <v-col cols="9">
          <v-text-field
            v-model="search"
            placeholder="ابحث عن طالب"
            variant="outlined"
            append-inner-icon="mdi-magnify"
            clearable
            dir="rtl"
            style="
              flex: 1;
              max-width: 922px;
              height: 64.1px;
              margin-left: 380px;
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
              margin-left: 54px;
              direction: rtl;
            "
            density="comfortable"
          ></v-select>
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
          style="width: 1332px !important; margin-top: 50px; margin-left: 109px"
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
        </div>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import useGetDataMixin from "@/mixins/useGetDataMixin";
import usePostDataMixin from "@/mixins/usePostDataMixin";
//import { RouterLink } from "vue-router";
export default {
  mixins: [useGetDataMixin, usePostDataMixin],
  data() {
    return {
      loading: false,
      search: "",
      filterBy: null,
      parent: "",
      filterOptions: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
      ],
      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [],
    };
  },
  computed: {
    filteredItems() {
      const term = this.search.toLowerCase();
      return this.items.filter((item) =>
        (item[this.filterBy] || "").toLowerCase().includes(term)
      );
    },
  },
  methods: {
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
      this.$router.push({
        name: "StudentDetails",
        state: {
          studentData: {
            name: item.name,
            email: item.email,
            phone: item.parent_phone,
            pname: item.parent_name,
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
