<template>
  <my-app v-if="!isLoginPage"><router-view /></my-app>
  <router-view v-else />
</template>
<script>
import MyApp from "./components/AppLayout.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
export default {
  components: {
    MyApp,
  },
  setup() {
    const route = useRoute();

    const isLoginPage = computed(() => route.name === "login"); // or route.path === '/login'

    return {
      isLoginPage,
    };
  },
};
</script>
<style lang="scss">
#app {
  font-family: Cairo, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  body {
    font-family: "Cairo", sans-serif;
  }
  body,
  .v-application {
    font-family: "Cairo", sans-serif !important;
  }
}
</style>
