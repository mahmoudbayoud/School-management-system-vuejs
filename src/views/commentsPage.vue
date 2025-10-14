<template>
  <div dir="rtl">
    <v-container class="mt-6 gap-y-4">
      <v-row>
        <v-col class="text-end" cols="11">
          <span style="font-size: 22px; font-weight: bold">
            تعليقات الاباء على هذه المدرسة
          </span>
        </v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col cols="11" class="text-end">
          <span style="font-size: 14px; color: #555">
            يمكنك رؤية التقييم النهائي لهذه التعليقات من الصفحة الرئيسية
          </span>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-4">
        <v-col cols="10" v-for="(post, index) in Comments" :key="index">
          <v-card class="pa-4 shadow-sm post-card mb-4" outlined rounded="lg">
            <div class="d-flex flex-column gap-3">
              <div class="d-flex justify-space-between align-center">
                <small class="post-date">
                  {{ post.created_at.split("T")[0] }}
                </small>
                <div>
                  <span class="class-badge">
                    {{ post.parent_name }}
                  </span>
                </div>
              </div>
              <span class="post-content">{{ post.comment }}</span>
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
      Comments: [],
    };
  },

  methods: {
    async fetchComments() {
      await this.fetchData("/getcomments")
        .then(() => {
          this.Comments = this.getData;
        })
        .catch((error) => {
          console.error("Error fetching meals:", error);
        });
      console.log(this.Comments);
    },
  },
  mounted() {
    this.fetchComments();
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
