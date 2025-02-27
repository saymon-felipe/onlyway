import { createApp, reactive } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App);
app.config.globalProperties.$radioData = reactive({ history: [], title: "", art: "" });

import axios from 'axios';

function requireRadioData() {
    axios.get("https://stream3.svrdedicado.org/cp/get_info.php?p=8042")
        .then(response => {
            Object.assign(app.config.globalProperties.$radioData, response.data);
        })
        .catch((erro) => {
            console.log(erro);
        }).then(() => {
            setTimeout(() => {
                requireRadioData();
            }, 10 * 1000) // Intervalo de 10 segundos
        })
}

requireRadioData();

app.mount('#app');
