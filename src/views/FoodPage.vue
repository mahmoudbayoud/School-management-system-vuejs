<template>
  <div dir="rtl">
    <v-container class="mt-6 gap-y-4">
      <v-row>
        <v-col>
          <div style="height: 5px"></div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-end" cols="12">
          <v-btn
            class="btn"
            color="#800080"
            @click="goToPage"
            :disabled="!allMealsFinished"
            style="
              width: 126px;
              height: 45px;
              font-size: 14px;
              font-weight: normal;
            "
          >
            ضبط الوجبات
          </v-btn>
          <span
            style="
              font-size: 18px;
              font-weight: 900;
              color: #474a4c;
              margin-right: 90px;
            "
          >
            :الوجبات الغذائية</span
          >
        </v-col>
      </v-row>
      <v-row justify="end" style="margin-right: 201px; margin-top: 32px">
        <v-btn
          class="tab-btn"
          :class="{ active: selectedTab === 'exam' }"
          elevation="0"
          text
          @click="selectedTab = 'exam'"
        >
          <span class="tab-text">الطلبات </span>
        </v-btn>
        <v-btn
          class="tab-btn"
          :class="{ active: selectedTab === 'sb' }"
          elevation="0"
          text
          @click="selectedTab = 'sb'"
        >
          <span class="tab-text">الوجبات الغذائية</span>
        </v-btn>
      </v-row>

      <!-- Full page content based on selectedTab -->
      <div v-if="selectedTab === 'sb'" class="pa-4" dir="rtl">
        <v-container fluid>
          <v-row dense>
            <v-col
              v-for="meal in meals"
              :key="meal.day"
              cols="12"
              md="6"
              :offset-md="
                meals.length % 2 !== 0 && index === meals.length - 1 ? 2 : 0
              "
            >
              <v-card
                class="pa-4"
                elevation="4"
                rounded="lg"
                width="630px"
                height="199px"
              >
                <!-- السعر في الزاوية -->

                <div
                  class="price-badge"
                  style="
                    width: 120px;
                    height: 30px;
                    font-size: 12px;
                    font-weight: bold;
                    text-align: center;
                  "
                  dir="rtl"
                >
                  {{ meal.price }} ل.س
                </div>

                <v-row align="center" no-gutters>
                  <!-- محتوى النصوص -->
                  <v-col
                    style="
                      display: flex;
                      flex-direction: column;
                      gap: 12px;
                      margin-right: 12px;
                    "
                    ><div
                      style="
                        display: flex;
                        flex-direction: row;
                        gap: 24px;
                        justify-content: flex-end;
                      "
                      class="text-right font-weight-bold"
                    >
                      <div>
                        <v-icon
                          :color="meal.status === 'active' ? 'green' : 'red'"
                          size="20"
                          style="margin-right: 4px"
                        >
                          {{
                            meal.status === "active"
                              ? "mdi-check-circle"
                              : "mdi-close-circle"
                          }}
                        </v-icon>
                        <span
                          :style="{
                            color: meal.status === 'active' ? 'green' : 'red',
                            fontWeight: 'bold',
                            fontSize: '14px',
                          }"
                        >
                          {{ meal.status === "active" ? "نشط" : "منتهي" }}
                        </span>
                      </div>
                      <div class="text-right font-weight-bold">
                        {{ meal.day_name }}
                      </div>
                    </div>
                    <div class="text-right grey--text">
                      {{ meal.date }}
                    </div>
                    <div class="text-right grey--text">
                      عدد الحجوزات:{{ meal.reservations }}
                    </div>
                    <div
                      class="cursor-pointer"
                      style="color: grey; margin-left: 100px; font-size: 15px"
                      @click="showMealDetails(meal)"
                    >
                      انقر لعرض التفاصيل
                    </div>
                  </v-col>

                  <!-- الصورة -->
                  <v-col cols="auto" style="padding-bottom: 35px">
                    <v-avatar size="109">
                      <v-img :src="require('@/assets/food.jpg')" />
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <div v-else-if="selectedTab === 'exam'" class="pa-4">
        <v-container>
          <v-row
            v-for="(order, index) in orders"
            :key="index"
            class="mb-4"
            justify="center"
          >
            <v-col cols="8">
              <v-card
                v-if="order.student_food_meal.status == 'suspended'"
                class="pa-0 d-flex flex-column justify-center"
                elevation="1"
                width="1207px"
                style="overflow: hidden; position: relative"
              >
                <!-- شارة السعر -->
                <div class="price-tag">{{ order.price }} ل.س</div>

                <!-- تفاصيل الطلب + صورة الطالب -->
                <v-row
                  no-gutters
                  class="px-4 pt-6 pb-2"
                  align="center"
                  style="margin-left: 550px"
                >
                  <v-col cols="12" md="9">
                    <div
                      class="mb-1"
                      style="
                        font-size: 18px;
                        font-weight: bold;
                        color: #393e44;
                        margin-left: 270px;
                      "
                    >
                      حجز {{ order.dayname }}
                    </div>
                    <div
                      style="
                        font-size: 13px;
                        font-weight: normal;
                        color: #a7a7a7;
                        margin-left: 303px;
                      "
                    >
                      رقم العملية: {{ order.student_food_meal.process_number }}
                    </div>
                    <div style="height: 8px"></div>
                    <div style="font-size: 15px; font-weight: normal">
                      ملاحظات: {{ order.student_food_meal.notes }}
                    </div>
                  </v-col>

                  <v-col
                    cols="3"
                    md="3"
                    class="d-flex flex-column align-center justify-center"
                    style="margin-top: 35px"
                  >
                    <v-avatar size="100" class="mb-2">
                      <v-img src="https://i.pravatar.cc/150?img=3" />
                    </v-avatar>
                    <div class="text-center" style="color: #a7a7a7">
                      <div class="font-weight-medium" style="font-size: 16px">
                        {{ order.student_name }}
                      </div>
                      <div class="caption grey--text" style="font-size: 13px">
                        (طالب)
                      </div>
                    </div>
                  </v-col>
                </v-row>

                <!-- أزرار -->
                <v-row
                  class="px-4 pb-4 pt-2"
                  justify="start"
                  style="gap: 35px; margin-top: -50px; margin-left: 36px"
                >
                  <v-col cols="6" md="2">
                    <v-btn
                      block
                      class="accept-btn"
                      @click="accept(order)"
                      style="width: 179px; height: 38px"
                      >قبول</v-btn
                    >
                  </v-col>
                  <v-col cols="6" md="2">
                    <v-btn
                      block
                      @click="reject(order)"
                      class="reject-btn"
                      style="width: 179px; height: 38px"
                      >رفض</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-dialog v-model="dialog1" max-width="600">
        <v-card
          class="pa-4"
          elevation="6"
          style="
            border-radius: 20px;
            background-color: white;
            font-family: 'Cairo', sans-serif;
          "
        >
          <v-card-actions
            style="position: absolute; top: 11px; right: 10px; z-index: 10"
          >
            <v-icon color="#800080" size="24">mdi-pencil</v-icon>
          </v-card-actions>
          <!-- العنوان -->
          <v-card-title
            style="
              font-weight: bold;
              font-size: 22px;
              text-align: center;
              width: 100%;
              color: #800080;
            "
          >
            تفاصيل الوجبة
          </v-card-title>

          <!-- تفاصيل الوجبة -->
          <v-card-text>
            <div
              v-if="selectedMeal"
              style="margin-bottom: 16px; text-align: right"
            >
              <p><strong>اليوم:</strong> {{ selectedMeal.day_name }}</p>
              <p><strong>الوجبة:</strong> {{ selectedMeal.Food_name }}</p>
              <p><strong>المحتويات:</strong> {{ selectedMeal.contents }}</p>
              <p><strong>المقبلات:</strong> {{ selectedMeal.entrees }}</p>
              <p><strong>السعر:</strong> {{ selectedMeal.price }} ل.س</p>
              <p><strong>التاريخ:</strong> {{ selectedMeal.date }}</p>
            </div>

            <!-- الطلاب -->
            <h3
              style="
                color: #800080;
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 10px;
                text-align: right;
              "
              dir="rtl"
            >
              الطلاب المسجلين:
            </h3>
            <ul
              style="
                list-style-type: none;
                padding: 0;
                margin: 0;
                text-align: right;
              "
              dir="rtl"
            >
              <li
                v-for="(student, index) in mealStudents"
                :key="index"
                style="padding: 10px 0; border-bottom: 1px solid #eee"
              >
                <div style="font-weight: bold; font-size: 16px; color: black">
                  {{ student.student_name }}
                </div>
                <div style="font-size: 14px; color: gray; margin-top: 4px">
                  رقم العملية: {{ student.process_number }}
                </div>
              </li>
            </ul>
          </v-card-text>

          <!-- زر الإغلاق -->
          <v-card-actions style="justify-content: center; margin-top: 10px">
            <v-btn
              color="#800080"
              dark
              rounded
              elevation="2"
              style="padding: 8px 24px; font-weight: bold"
              @click="dialog1 = false"
            >
              إغلاق
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import useGetDataMixin from "@/mixins/useGetDataMixin";
import usePostDataMixin from "@/mixins/usePostDataMixin";

export default {
  mixins: [useGetDataMixin, usePostDataMixin],
  computed: {
    allMealsFinished() {
      return this.meals.every((meal) => meal.status !== "active");
    },
  },
  data() {
    return {
      selectedTab: "sb",
      name: "OrdersList",
      orders: [],
      meals: [],
      dialog1: false,
      selectedMeal: null,
      m: [],
    };
  },
  methods: {
    async fetchMealStudents(mealId) {
      try {
        await this.fetchData(`/getMealStudents/${mealId}`);
        this.mealStudents = this.getData; // لازم يرجع [{ student_name, process_number }]
      } catch (error) {
        console.error("Error fetching meal students:", error);
      }
    },
    async showMealDetails(meal) {
      this.selectedMeal = meal;
      await this.fetchMealStudents(meal.id);
      this.dialog1 = true;
    },
    goToPage() {
      this.$router.push({
        name: "FoodDayPage",
        query: {
          meals: JSON.stringify(this.meals),
        },
      });
    },
    async fetchorders() {
      this.loading = true;
      await this.fetchData("/StudentFoodMeal/index")
        .then(() => {
          this.orders = this.getData.data;
        })
        .catch((error) => {
          console.error("Error fetching meals:", error);
        });
      this.loading = false;
    },
    async fetchdata() {
      this.loading = true;
      await this.fetchData("/FoodMeal")
        .then(() => {
          const meals = this.getData.data;
          const today = new Date();

          // تحديث حالة كل وجبة بناءً على تاريخها
          this.meals = meals.map((meal) => {
            const mealDate = new Date(meal.date);
            meal.status = mealDate >= today ? "active" : "expired";
            return meal;
          });
        })
        .catch((error) => {
          console.error("Error fetching meals:", error);
        });
      this.loading = false;
    },

    async fetchdata1() {
      this.loading = true;
      await this.fetchData("/getStudentCountForFoodMeal")
        .then(() => {
          const counts = this.getData.data;

          // تحديث الحجوزات لكل وجبة عبر مقارنة اسم اليوم
          this.meals = this.meals.map((meal) => {
            for (const [key, value] of Object.entries(counts)) {
              if (key.includes(meal.day_name)) {
                meal.reservations = value;
                break;
              }
            }

            // في حال لم يتم العثور على تطابق
            if (meal.reservations === undefined) {
              meal.reservations = 0;
            }

            return meal;
          });
        })
        .catch((error) => {
          console.error("Error fetching reservations:", error);
        });
      this.loading = false;
    },
    async accept(order) {
      const payload = {
        record_id: order.student_food_meal.id,
        action: "0",
      };
      console.log(payload);
      await this.sendData("/acceptOrRejectRequestFoodMeal", payload);
      this.selectedTab = "exam";
      window.location.reload();
    },
    async reject(order) {
      const payload = {
        record_id: order.student_food_meal.id,
        action: "1",
      };
      console.log(payload);
      await this.sendData("/acceptOrRejectRequestFoodMeal", payload);
      window.location.reload();
    },
  },
  mounted() {
    this.fetchdata();
    this.fetchdata1();
    this.fetchorders();
  },
};
</script>

<style scoped>
/* Optional: Add some spacing between the dropdowns */
.d-flex {
  width: 100%;
}
.v-select {
  flex: 1;
}
.tab-btn {
  border-radius: 0;
  box-shadow: none;
  font-weight: 500;
  color: black;
  min-width: 120px;
  text-transform: none;
  position: relative;
}

.tab-btn .tab-text {
  position: relative;
  padding-bottom: 4px;
}

.tab-btn.active .tab-text::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 4px;
  width: 100%;
  background-color: #800080; /* Blue line under text */
}
.tab-btn .tab-text {
  position: relative;
  padding-bottom: 16px;
}
.tab-btn.active .tab-text {
  font-weight: bold;
  color: #800080;
  font-size: 16px; /* Optional: make active text blue */
}
.price-badge {
  background-color: purple;
  color: white;
  padding: 6px 12px;
  border-top-left-radius: 16px;
  border-bottom-right-radius: 16px;
  font-weight: bold;
}
.cursor-pointer {
  cursor: pointer;
}
.price-tag {
  background-color: #800080;
  color: white;
  padding: 8px 16px;
  border-top-left-radius: 0;
  border-bottom-right-radius: 30px;
  border-top-right-radius: 25px;
  position: absolute;
  top: 0;
  left: 0;
  font-weight: bold;
  font-size: 18px;
  z-index: 1;
}

.accept-btn {
  background-color: #800080 !important;
  color: white;
  font-weight: bold;
}

.reject-btn {
  background-color: #e53935 !important;
  color: white;
  font-weight: bold;
}
</style>
