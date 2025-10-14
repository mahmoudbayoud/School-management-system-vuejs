<template>
  <div dir="rtl">
    <v-container class="mt-6 gap-y-4">
      <!-- العنوان -->
      <v-row>
        <v-col class="text-end" cols="11">
          <span style="font-size: 22px; font-weight: bold">
            المنشورات العامة
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

      <v-row justify="center">
        <v-col cols="10" v-for="(post, index) in posts" :key="index">
          <v-card class="pa-4 shadow-sm post-card mb-4" outlined rounded="lg">
            <div class="d-flex flex-column gap-2">
              <span class="post-title">{{ post.title }}</span>
              <span class="post-content">{{ post.description }}</span>
              <v-divider class="my-2"></v-divider>
              <div class="d-flex justify-space-between align-center mt-3">
                <small class="post-date">{{
                  post.created_at.split("T")[0]
                }}</small>
                <v-btn size="small" variant="text" color="#800080">عرض</v-btn>
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
      dialog: false,
      newPostContent: "",
      school: {
        id: "",
      },
      posts: [],
    };
  },
  methods: {
    async save() {
      const payload = {
        school_id: this.school.id,
        description: this.newPostContent,
      };
      await this.sendData("/storePublicPost", payload);
    },
    publishPost() {
      this.save();
      this.fetchPosts();
      this.newPostContent = "";
      this.dialog = false;
    },
    async fetchPosts() {
      await this.fetchData("/school/posts")
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
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}
.post-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
.post-content {
  font-size: 14px;
  color: #555;
  line-height: 1.6;
}
.post-date {
  font-size: 12px;
  color: #888;
}
</style>
