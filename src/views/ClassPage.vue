<template>
  <v-container>
    <div style="height: 32px"></div>
    <v-row>
      <v-col class="text-end" cols="11">
        <span style="font-size: 22px; font-weight: bold; margin-top: 24px"
          >الصفوف</span
        >
      </v-col>
    </v-row>
    <div style="height: 32px"></div>
    <div v-for="(grade, index) in grades" :key="index" class="mb-2">
      <v-btn
        color="white"
        class="justify-space-between"
        style="width: 1200px; height: 90px"
        @click="toggleGrade(index)"
      >
        <div>
          <v-icon left>
            {{ grade.show ? "mdi-chevron-down" : "mdi-chevron-left" }}
          </v-icon>
          <span>{{ grade.name }} : عدد الشعب {{ grade.sections.length }}</span>
        </div>
      </v-btn>

      <!-- الشعب وزر الإضافة -->
      <v-slide-y-transition>
        <div v-if="grade.show" class="mt-2 px-4">
          <v-btn
            v-for="(section, i) in grade.sections"
            :key="i"
            style="width: 1100px; height: 51px"
            outlined
            color="white"
            class="mb-2 justify-center"
          >
            {{ section.name }}
          </v-btn>

          <div class="text-center">
            <v-btn icon @click="addSection(getLastSectionId(grade), grade.id)">
              <v-icon color="primary">mdi-plus</v-icon>
            </v-btn>
          </div>
        </div>
      </v-slide-y-transition>
    </div>
  </v-container>
</template>

<script>
import useGetDataMixin from "@/mixins/useGetDataMixin";
import usePostDataMixin from "@/mixins/usePostDataMixin";
export default {
  mixins: [useGetDataMixin, usePostDataMixin],
  data() {
    return {
      lid: null,
      form: {
        class_id: "",
        division_id: "",
      },
      loading: false,
      grades: [],
    };
  },
  methods: {
    getLastSectionId(grade) {
      if (grade.sections.length === 0) return 0;
      const lastSection = grade.sections[grade.sections.length - 1];
      return lastSection.id;
    },
    toggleGrade(index) {
      this.grades[index].show = !this.grades[index].show;
    },
    async addSection(id, cid) {
      const payload = {
        class_id: cid,
        division_id: id + 1,
      };
      await this.sendData("/SchoolsClassesDivision/store", payload);
      this.$router.push({ name: "ClassPage" });
      await this.fetchdata();
    },
    async fetchdata() {
      this.loading = true;
      await this.fetchData("/getSchoolClassesDivisions")
        .then(() => {
          this.grades = this.getData.data.map((item) => ({
            id: item.class_id,
            name: item.class_name,
            sections: item.divisions.map((div) => ({
              id: div.division_id,
              name: div.division_name,
            })),
          }));
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
