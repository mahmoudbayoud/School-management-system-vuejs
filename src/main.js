import { createApp } from "vue";
import router from "./router";
import store from "./store";
// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Components
import App from "./App.vue";

const vuetify = createVuetify({
  variables: {
    "font-family": "Cairo, sans-serif",
  },
  components,

  directives,
  defaults: {
    global: {
      style: {
        fontFamily: "Cairo, sans-serif",
      },
    },
  },
});

createApp(App).use(vuetify).use(store).use(router).mount("#app");
