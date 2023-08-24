import { createApp } from "vue";

import App from "./components/App.vue";
import router from "./router";
import "./assets/tailwind.css";

// Configure all the middleware and global application logic
const app = createApp(App);
app.use(router);
app.mount("#app");
