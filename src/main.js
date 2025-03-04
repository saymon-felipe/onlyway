import { createApp, reactive } from 'vue'
import './style.css'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login';

const app = createApp(App);
app.config.globalProperties.$radioData = reactive({ history: [], title: "", art: "" });
app.config.globalProperties.$user = reactive({
    email: "",
    given_name: "",
    id: "",
    name: "",
    picture: "",
    verified_email: false
});

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

app.use(vue3GoogleLogin, {
    clientId: "297384543210-cs4tnjusjaknbhe3pk9b03frd5e3352g.apps.googleusercontent.com"
});

app.mount('#app');
