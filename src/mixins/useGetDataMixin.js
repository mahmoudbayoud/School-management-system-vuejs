// src/mixins/useGetDataMixin.js
import axiosInstance from "@/axiosInstance";

export default {
  data() {
    return {
      getData: [],
      getError: null,
      isLoadingGet: false,
    };
  },
  methods: {
    async fetchData(url, params = {}) {
      this.isLoadingGet = true;
      this.getError = null;
      try {
        const response = await axiosInstance.get(url, { params });
        this.getData = response.data;
      } catch (error) {
        console.error("GET Error:", error);
        this.getError = error;
      } finally {
        this.isLoadingGet = false;
      }
    },
  },
};
