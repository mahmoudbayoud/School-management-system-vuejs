<template>
  <v-container>
    <div style="height: 32px"></div>
    <v-row>
      <v-col class="text-end" cols="11">
        <span style="font-size: 18px; font-weight: bold; margin-top: 24px"
          >ادارة الوجبات الغذائية</span
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-end" cols="11">
        <span
          style="
            font-size: 15px;
            font-weight: normal;
            color: gray;
            margin-top: 24px;
          "
        >
          قم بضبط الوجبات وتحديد محتوياتها اسبوعيا لتمكين ولي الامر من الاطلاع
          عليها وحجز الوجبات المناسبة له</span
        >
      </v-col>
    </v-row>
    <div style="height: 32px"></div>
    <div v-for="(grade, index) in grades" :key="index" class="mb-2">
      <v-btn
        color="white"
        class="justify-space-between"
        style="width: 1200px; height: 90px"
        @click="openDialog(grade)"
      >
        <div style="display: flex; flex-direction: row; gap: 844px">
          <span> عدد الحجوزات :{{ grade.reservations }}</span>
          <span>{{ grade.day_name }} </span>
        </div>
      </v-btn>

      <!-- الشعب وزر الإضافة -->
    </div>
    <v-row>
      <v-col class="text-end" cols="10">
        <span
          style="
            font-size: 15px;
            font-weight: normal;
            color: gray;
            margin-top: 44px;
          "
          >تذكير : ان عدد الحجوزات الخاص بكل وجبة يتم اعادة ضبطه يوم الجمعة
          لمعرفة عدد الحجوزات الخاص بكل وجبة اسبوعيا</span
        >
      </v-col>
    </v-row>
  </v-container>
  <FoodD
    v-model="dialog"
    v-if="dialog && selectedGrade"
    :grade="selectedGrade"
  />
</template>

<script>
import FoodD from "../views/AddFoodPage.vue";
import useGetDataMixin from "@/mixins/useGetDataMixin";
import usePostDataMixin from "@/mixins/usePostDataMixin";
export default {
  mixins: [useGetDataMixin, usePostDataMixin],
  components: {
    FoodD,
  },
  created() {
    this.grades = JSON.parse(this.$route.query.meals);
  },
  data() {
    return {
      lid: null,
      dialog: false,
      selectedGrade: null,
      grades: [],
    };
  },
  methods: {
    openDialog(grade) {
      this.selectedGrade = grade; // تخزين البيانات
      this.dialog = true;
    },
  },
  mounted() {},
};
</script>
