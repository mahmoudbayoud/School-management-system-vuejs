<template>
  <div dir="rtl">
    <v-container class="mt-6 gap-y-4">
      <!-- العنوان -->
      <v-row>
        <v-col class="text-end" cols="11">
          <span style="font-size: 22px; font-weight: bold">
            المنشورات الخاصة
          </span>
        </v-col>
      </v-row>

      <!-- زر الإضافة -->
      <v-row>
        <v-col class="text-end" cols="11">
          <v-btn
            class="btn"
            color="#800080"
            style="margin-left: 12px"
            width="122.96px"
            height="48.53px"
            @click="dialog = true"
          >
            اضافة منشور
          </v-btn>
        </v-col>
      </v-row>

      <!-- نافذة منبثقة -->
      <v-dialog v-model="dialog" max-width="500px" dir="rtl">
        <v-card rounded="lg">
          <v-card-title
            style="
              font-weight: bold;
              font-size: 20px;
              font-family: Cairo, sans-serif;
              display: flex;
              justify-content: center;
            "
          >
            إضافة منشور جديد
          </v-card-title>
          <v-card-text>
            <!-- وصف المنشور -->
            <v-textarea
              dir="rtl"
              v-model="newPostContent"
              label="وصف المنشور"
              style="font-family: Cairo, sans-serif"
              auto-grow
              outlined
              rows="3"
              color="purple"
            />

            <v-row class="mt-4" align="center" justify="space-between">
              <v-col cols="6" class="text-end">
                <v-select
                  v-model="selectedDivision"
                  :items="divisions"
                  placeholder="الشعبة"
                  item-title="division_name"
                  item-value="division_id"
                  variant="outlined"
                  hide-details
                  density="comfortable"
                />
              </v-col>
              <v-col cols="6" class="text-end">
                <v-select
                  v-model="selectedGrade"
                  :items="grades"
                  placeholder="الصف"
                  item-title="name"
                  item-value="id"
                  variant="outlined"
                  hide-details
                  density="comfortable"
                />
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="d-flex justify-space-between">
            <v-btn
              text
              color="grey"
              @click="dialog = false"
              style="font-family: Cairo, sans-serif; font-size: 12px"
              >إلغاء</v-btn
            >
            <v-btn
              color="purple"
              style="font-family: Cairo, sans-serif; font-size: 16px"
              dark
              @click="publishPost"
              >نشر</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- المنشورات السابقة -->
      <v-row class="mt-2">
        <v-col cols="11" class="text-end">
          <span style="font-size: 18px; color: #555"> المنشورات السابقة </span>
        </v-col>
      </v-row>
      <!-- المنشورات السابقة -->
      <v-row justify="center" class="mt-4">
        <v-col cols="10" v-for="(post, index) in posts" :key="index">
          <v-card class="pa-4 shadow-sm post-card mb-4" outlined rounded="lg">
            <div class="d-flex flex-column gap-3">
              <div class="d-flex justify-space-between align-center">
                <div>
                  <span class="class-badge">
                    {{ getClassName(post.class_id) }}
                  </span>
                  <span class="section-badge">
                    {{ getDivisionName(post.division_id) }}
                  </span>
                </div>
                <small class="post-date">
                  {{ post.created_at.split("T")[0] }}
                </small>
              </div>
              <span class="post-content">{{ post.description }}</span>
              <v-divider class="my-2"></v-divider>
              <div class="d-flex justify-end">
                <v-btn size="small" variant="text" color="purple"> عرض </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import useGetDataMixin from "@/mixins/useGetDataMixin";
import usePostDataMixin from "@/mixins/usePostDataMixin";
export default {
  mixins: [useGetDataMixin, usePostDataMixin],
  data() {
    return {
      divisions: [],
      selectedDivision: null,
      grades: [
        { id: 1, name: "الصف الأول" },
        { id: 2, name: "الصف الثاني" },
        { id: 3, name: "الصف الثالث" },
        { id: 4, name: "الصف الرابع" },
        { id: 5, name: "الصف الخامس" },
        { id: 6, name: "الصف السادس" },
      ],
      selectedGrade: null,
      dialog: false,
      newPostContent: "",
      school: {
        class_id: "",
        division_id: "",
      },
      posts: [],
    };
  },
  watch: {
    selectedGrade(newVal) {
      if (newVal) {
        this.fetchDivisions();
      }
    },
  },
  methods: {
    getClassName(id) {
      const classes = {
        1: "الصف الأول",
        2: "الصف الثاني",
        3: "الصف الثالث",
        4: "الصف الرابع",
        5: "الصف الخامس",
        6: "الصف السادس",
      };
      return classes[id] || "غير معروف";
    },
    getDivisionName(id) {
      const divisions = {
        1: "الشعبة الأولى",
        2: "الشعبة الثانية",
        3: "الشعبة الثالثة",
        4: "الشعبةالرابعة",
        5: "الشعبة الخامسة",
        6: "الشعبة السادسة",
      };
      return divisions[id] || "غير معروف";
    },
    async fetchDivisions() {
      this.divisions = [];
      this.selectedDivision = null;
      const payload = {
        class_id: this.selectedGrade,
      };
      await this.sendData("/getDivisionIdByClassId", payload);
      this.divisions = this.postData.data;
    },
    async save() {
      const payload = {
        class_id: this.selectedGrade,
        division_id: this.selectedDivision,
        description: this.newPostContent,
      };
      await this.sendData("/storePrivatePost", payload);
    },
    publishPost() {
      this.save();
      this.fetchPosts();
      this.newPostContent = "";
      this.dialog = false;
    },
    async fetchPosts() {
      await this.fetchData("/getprivatePosts")
        .then(() => {
          this.posts = this.getData.posts;
        })
        .catch((error) => {
          console.error("Error fetching meals:", error);
        });
      console.log(this.posts);
    },
    async fetchdata() {
      const storedData = await localStorage.getItem("userData");
      if (storedData) {
        this.userData = JSON.parse(storedData);
        this.school.id = this.userData.id || "";
      }
    },
  },
  mounted() {
    this.fetchdata();
    this.fetchPosts();
  },
};
</script>

<style scoped>
.post-card {
  transition: 0.3s;
}
.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.12);
}
.post-content {
  font-size: 15px;
  color: #444;
  line-height: 1.6;
}
.post-date {
  font-size: 12px;
  color: #777;
}
.class-badge {
  background-color: #e1bee7;
  color: #4a148c;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-left: 6px;
}
.section-badge {
  background-color: #d1c4e9;
  color: #311b92;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}
</style>
