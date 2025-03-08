import { createApp, reactive } from 'vue'
import './style.css'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login';
import $ from 'jquery';
import api from "../configs/api";

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

app.config.globalProperties.$api = reactive(api);

app.config.globalProperties.$showToast = (message, color) => {
    $('#liveToast .toast-body').text(message);

    // Alterar a cor do toast com base no parâmetro 'color'
    $('#liveToast').removeClass();
    if (color === 'success') {
        $('#liveToast').addClass('toast align-items-center text-bg-success border-0');
    } else if (color === 'error') {
        $('#liveToast').addClass('toast align-items-center text-bg-danger border-0');
    } else if (color === 'warning') {
        $('#liveToast').addClass('toast align-items-center text-bg-warning border-0');
    }

    // Posicionar o toast no canto superior direito
    $('#toastContainer').removeClass().addClass('position-fixed p-3');
    $('#toastContainer').css({ top: '2rem', right: '2rem', bottom: '', zIndex: 99999 });

    // Mostrar o toast
    var toastEl = $('#liveToast')[0];
    var toast = new bootstrap.Toast(toastEl);
    toast.show();
}

app.config.globalProperties.$setJwtInLocalStorage = (jwt, user = null) => {
    localStorage.setItem("onlywayJwt", jwt);
    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
    }
}

app.config.globalProperties.$removeJwtFromLocalStorage = () => {
    localStorage.removeItem("onlywayJwt");
    localStorage.removeItem("user");
}

app.config.globalProperties.$checkJWT = () => {
    return new Promise((resolve, reject) => {
        if (!localStorage.getItem("user") || !localStorage.getItem("onlywayJwt")) {
            reject();
        } else {
            api.post("/usuarios/check_jwt", { token: localStorage.getItem("onlywayJwt") }) // Se ja estiver logado no sistema e acessar a página de login, é checkado a valia do token JWT e então redirecionado para a index.
            .then(function (res) { 
                app.config.globalProperties.$setJwtInLocalStorage(res.data.returnObj); // Setando o novo jwt que foi resetado
                resolve();
            }).catch(() => {
                reject();
            })
        }
    })
}

setInterval(() => {
    app.config.globalProperties.$checkJWT();
}, 20 * 60 * 1000) // A cada 20 minutos

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
