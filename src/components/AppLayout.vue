<template>
  <div class="layout">
    <v-app>
      <AppBar />
      <SideBar />

      <v-main>
        <slot></slot>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import AppBar from "./AppBar.vue";
import SideBar from "./SideBar.vue";
export default {
  components: {
    AppBar,
    SideBar,
  },
};
</script>
