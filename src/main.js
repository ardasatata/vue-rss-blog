/** Create portal target */
const portal = document.createElement("div");
portal.id = "rtb-modal";
portal.name = "rtb-modal";
document.getElementsByTagName("body")[0].appendChild(portal);

import { createApp } from 'vue';
import App from './App.vue';


import store from "./store/";
var VueScrollTo = require("vue-scrollto");
import PortalVue from "portal-vue";
// import VueCarousel from "vue-carousel";

const app = createApp(App);

// Use Plugins
app.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
});

app.use(PortalVue);
// app.use(VueCarousel);

// Use store
app.use(store);

// Mount the app
app.mount("#retainable-rss-embed");


