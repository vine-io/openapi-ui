import {createApp} from 'vue'
import App from './App.vue'
import {RegisterComponents} from "./components";


let app = createApp(App)

app = RegisterComponents(app);

app.mount('#app')
