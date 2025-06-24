<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
        <v-card class="pa-5 mt-10" width="1270px" elevation="5">
          <v-row justify="center">
            <div style="height: 60px"></div>
            <v-btn
              class="tab-btn"
              :class="{ active: selectedTab === 'exam' }"
              elevation="0"
              text
              style="font-size: 20px"
              @click="selectedTab = 'exam'"
            >
              <span class="tab-text">امتحان </span>
            </v-btn>
            <v-btn
              class="tab-btn"
              :class="{ active: selectedTab === 'asb' }"
              elevation="0"
              style="font-size: 20px"
              text
              @click="selectedTab = 'asb'"
            >
              <span class="tab-text">شفهي</span>
            </v-btn>
            <v-btn
              class="tab-btn"
              :class="{ active: selectedTab === 'sb' }"
              elevation="0"
              style="font-size: 20px"
              text
              @click="selectedTab = 'sb'"
            >
              <span class="tab-text">حضور</span>
            </v-btn>
          </v-row>
          <div v-if="selectedTab === 'sb'" class="pa-4">
            <v-card width="1110px" height="180px" justify="center">
              <v-row justify="center" class="flex-wrap" style="padding: 35px">
                <div
                  v-for="(day, index) in attendanceGrid"
                  :key="index"
                  class="grid-cell"
                  :style="{ backgroundColor: getColor(day.status) }"
                  @click="openPopup(index)"
                ></div>
              </v-row>
            </v-card>

            <v-row class="mt-6" justify="center">
              <v-col cols="12" md="3">
                <v-card class="pa-4 text-center" height="230px">
                  <v-progress-circular
                    :model-value="a"
                    size="100"
                    width="10"
                    color="green"
                    rotate="360"
                  >
                    {{ a }}%
                  </v-progress-circular>
                  <div class="legend d-flex justify-center mt-2">
                    <div class="d-flex flex-column align-center mx-2">
                      <div
                        class="legend-dot"
                        style="background-color: green"
                      ></div>
                      <span>جيد </span>
                    </div>
                  </div>
                  <div style="height: 20px"></div>
                  <div class="mt-2">معدل الحضور</div>
                </v-card>
              </v-col>

              <v-col cols="12" md="3">
                <v-card class="pa-4 text-center">
                  <div class="absence-container">
                    <div class="progress-wrapper">
                      <v-progress-circular
                        :rotate="360"
                        :size="100"
                        :width="10"
                        :model-value="100"
                        color="red"
                        class="progress-circle"
                      />
                      <v-progress-circular
                        :rotate="360"
                        :size="100"
                        :width="10"
                        :model-value="justified"
                        color="purple"
                        class="progress-circle top-layer"
                      />
                      <div class="progress-label">{{ b }}%</div>
                    </div>
                    <div class="legend d-flex justify-center mt-2">
                      <div class="d-flex flex-column align-center mx-2">
                        <div
                          class="legend-dot"
                          style="background-color: purple"
                        ></div>
                        <span>مبرر ({{ justified }}%)</span>
                      </div>
                      <div class="d-flex flex-column align-center mx-2">
                        <div
                          class="legend-dot"
                          style="background-color: red"
                        ></div>
                        <span>غير مبرر ({{ unjustified }}%)</span>
                      </div>
                    </div>
                  </div>
                  <div class="mt-2">معدل الغياب</div>
                </v-card>
              </v-col>
            </v-row>

            <v-row class="mt-4">
              <v-col
                cols="12"
                md="6"
                v-for="subject in subjects"
                :key="subject.name"
              >
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                  "
                >
                  <!-- Percentage -->
                  <div style="width: 40px; text-align: right">
                    {{ subject.progress }}%
                  </div>

                  <!-- Progress Bar -->
                  <v-progress-linear
                    :model-value="subject.progress"
                    color="blue"
                    height="18"
                    style="flex: 1; margin: 0 12px"
                    rounded
                  ></v-progress-linear>

                  <!-- Subject Name -->
                  <div style="width: 100px; text-align: left">
                    <strong style="font-size: 15px">{{ subject.name }}</strong>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
      <v-col cols="auto">
        <img
          src="../assets/Icons/Ellipse 14.png"
          alt=""
          style="width: 260px; height: 260px; margin-top: 25px"
        />
        <div style="font-weight: bold; font-size: 20px">محمود بيوض</div>
        <div
          style="
            display: flex;
            flex-direction: row;
            gap: 12px;
            margin-left: 18px;
            margin-top: 16px;
          "
        >
          <img src="../assets/Icons/Frame 30085.png" />
          <img src="../assets/Icons/Frame 30086.png" />
          <img src="../assets/Icons/Frame 30087.png" />
        </div>
        <div style="height: 16px"></div>
        <div style="font-size: 18px">الصف : الثاني</div>
        <div style="font-size: 18px; margin-top: 8px">الشعبة : الثالثة</div>
      </v-col>
    </v-row>
    <v-dialog v-model="popup.show" max-width="400">
      <v-card>
        <v-card-title class="headline">تفاصيل الحصص لليوم</v-card-title>
        <v-card-text>
          <v-list dense>
            <v-list-item
              v-for="(session, index) in popup.sessions"
              :key="index"
            >
              <v-list-item-content>
                <v-list-item-title>
                  الحصة {{ index + 1 }}: {{ session }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="closePopup">إغلاق</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      a: 75,
      b: 25,
      justified: 40,
      unjustified: 60,
      selectedTab: "sb",
      subjects: [
        { name: "اللغة العربية", progress: 18 },
        { name: "اللغة الإنكليزية", progress: 89 },
        { name: "علوم عامة", progress: 45 },
        { name: "رياضيات", progress: 35 },
        { name: "رياضة", progress: 78 },
        { name: "إسلامية", progress: 45 },
      ],
      attendanceGrid: [],
      popup: {
        show: false,
        dayIndex: null,
        sessions: [],
      },
    };
  },
  created() {
    this.attendanceGrid = Array.from({ length: 200 }, () => ({
      status: this.randomStatus(),
      sessions: Array.from({ length: 6 }, () => this.randomSession()),
    }));
  },
  methods: {
    getColor(status) {
      switch (status) {
        case "present":
          return "#2FF321";
        case "absent":
          return "#F44336";
        case "late":
          return "#C257C7";
        default:
          return "#E0E0E0";
      }
    },
    openPopup(index) {
      this.popup.dayIndex = index;
      this.popup.sessions = this.attendanceGrid[index].sessions;
      this.popup.show = true;
    },
    closePopup() {
      this.popup.show = false;
    },
    randomStatus() {
      const statuses = ["present", "absent", "late"];
      return statuses[Math.floor(Math.random() * statuses.length)];
    },
    randomSession() {
      const sessions = ["حضور", "غياب", "تأخير"];
      return sessions[Math.floor(Math.random() * sessions.length)];
    },
  },
};
</script>

<style scoped>
.grid-cell {
  width: 22px;
  height: 22px;
  margin: 2px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s ease;
}
.grid-cell:hover {
  opacity: 0.8;
}
.absence-container {
  position: relative;
  max-width: 120px;
  margin: auto;
  direction: rtl;
}
.progress-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  margin: auto;
}
.progress-circle {
  position: absolute;
  top: 0;
  left: 0;
}
.top-layer {
  z-index: 2;
}
.progress-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: bold;
  z-index: 3;
}
.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-left: 6px;
}
.tab-btn {
  border-radius: 0;
  box-shadow: none;
  font-weight: 500;
  color: black;
  min-width: 170px;
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
  padding-bottom: 8px;
}
.tab-btn.active .tab-text {
  font-weight: bold;
  color: #800080; /* Optional: make active text blue */
}
</style>
