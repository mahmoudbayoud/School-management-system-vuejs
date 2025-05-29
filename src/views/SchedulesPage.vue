<template>
  <v-container>
    <div style="height: 32px"></div>
    <v-row>
      <v-col class="text-end" cols="11">
        <span style="font-size: 22px; font-weight: bold; margin-top: 24px"
          >جداول المدرسة</span
        >
      </v-col>
    </v-row>
    <div style="height: 90px"></div>
    <div class="mb-2">
      <v-btn
        color="white"
        class="justify-space-between"
        style="width: 1200px; height: 90px; font-size: 16px"
        @click="goToPageW()"
      >
        برنامج الدوام
      </v-btn>
      <div style="height: 32px"></div>
      <v-btn
        color="white"
        class="justify-space-between"
        style="width: 1200px; height: 90px; font-size: 16px"
        @click="goToPageE()"
      >
        برنامج الامتحان
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
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
    goToPageW() {
      this.$router.push({
        name: "SelectDivisonAndClassPageSchW",
      });
    },
    goToPageE() {
      this.$router.push({
        name: "SelectDivisonAndClassPageSchE",
      });
    },
  },
};
</script>
