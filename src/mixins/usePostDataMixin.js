// src/mixins/usePostDataMixin.js
import axiosInstance from "@/axiosInstance";

export default {
  data() {
    return {
      postData: [],
      postError: null,
      isLoadingPost: false,
    };
  },
  methods: {
    async sendData(url, payload = {}) {
      this.isLoadingPost = true;
      this.postError = null;
      try {
        const response = await axiosInstance.post(url, payload);
        this.postData = response.data;
      } catch (error) {
        console.error("POST Error:", error);
        this.postError = error;
      } finally {
        this.isLoadingPost = false;
      }
    },
  },
};
