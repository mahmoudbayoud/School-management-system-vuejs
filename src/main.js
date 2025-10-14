import { createApp } from "vue";
import router from "./router";
import store from "./store";
// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
// Google Maps
import VueGoogleMaps from "@fawmi/vue-google-maps";
// Components
import App from "./App.vue";

const vuetify = createVuetify({
  variables: {
    "font-family": "Cairo, sans-serif",
  },
  components,
  directives,
  theme: {
    defaultTheme: "myCustomTheme",
    themes: {
      myCustomTheme: {
        dark: false,
        colors: {
          primary: "#1976D2",
          secondary: "#424242",
          accent: "#82B1FF",
          error: "#FF5252",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107",
          blue: "#2196F3",
          "deep-purple": "#673AB7",
          "deep-purple-accent-4": "#7C4DFF",
        },
      },
    },
  },
  defaults: {
    global: {
      style: {
        fontFamily: "Cairo, sans-serif",
      },
    },
  },
});

const app = createApp(App);

// **إضافة Google Maps**
app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCQierXOePVhkv1i-swvfCwsHoWccBKbTc", // ضع هنا مفتاح Google Maps الخاص بك
    libraries: "places",
  },
});

app.use(vuetify).use(store).use(router).mount("#app");
