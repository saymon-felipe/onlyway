<template>
    <div class="user">
        <div class="logged-in" v-if="$user.email != ''">
            <div class="user-display" v-on:click="openContainer = true">
                <img :src="$user.picture" alt="">
                <p>{{ $user.given_name }}</p>
            </div>
            <div class="authenticate-container" v-if="openContainer">
                <ul>
                    <li v-on:click="logout()">Sair</li>
                </ul>
            </div>
        </div>
        <div class="authenticate" v-else>
            <a class="principal-text-md" v-on:click="openContainer = true">Entre</a>
            <div class="authenticate-container" v-if="openContainer">
                <GoogleLogin :callback="handleLoginSuccess">
                    <button class="google-btn">
                        <img src="../assets/img/google-logo.png">
                        Login com Google
                    </button>
                </GoogleLogin>
            </div>
        </div>
        <div class="wrapper" v-on:click="openContainer = false"></div>
    </div>
    
</template>
<script>
import api from "../../configs/api";
import { GoogleLogin } from 'vue3-google-login';

export default {
    data() {
        return {
            openContainer: false
        }
    },
    components: {
        GoogleLogin
    },
    methods: {
        handleLoginSuccess(response) {
            this.openContainer = false;

            api.post("usuarios/google-login", { token: response.code }).then((results) => {
                Object.assign(this.$user, results.data.returnObj);
                localStorage.setItem("user", JSON.stringify(this.$user));
            })
        },
        logout: function () {
            this.openContainer = false;
            localStorage.removeItem("user");
            Object.assign(this.$user, { email: "", given_name: "", id: "", name: "", picture: "", verified_email: false });
        }
    },
    mounted: function () {
        let user = localStorage.getItem("user");

        if (user) {
            Object.assign(this.$user, JSON.parse(user));
        }
    }
}
</script>
<style scoped>
.user {
    position: fixed;
    top: 2rem;
    right: 2rem;
    z-index: 10001;
    width: fit-content;
}

.logged-in, .authenticate {
    position: relative;
    z-index: 4;
}

.user-display {
    display: flex;
    place-items: center;
    gap: 1.2rem;
    background: var(--blue-low);
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid var(--orange);
    cursor: pointer;
    z-index: 5;
    position: relative;

    & img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}

.wrapper {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
}

.google-btn {
    white-space: nowrap;
    font-size: 1rem;
    font-family: Open sans;
    font-weight: 600;
    color: var(--blue-low);
}

.authenticate-container {
    position: absolute;
    top: 90%;
    min-width: 100%;
    text-align: center;
    right: 0;
    z-index: 4;
    background: var(--blue-low);
    padding: 1rem;
    border-radius: 0 0 1rem 1rem;
    border: 1px solid var(--orange);

    & ul {
        list-style: none;
        cursor: pointer;
    }

    & button {
        display: flex;
        place-items: center; 
        gap: 1.2rem;
        padding: 1rem;   
        border-radius: 1rem;
        border: none;
        background: var(--gray-high);
        cursor: pointer;

        &:hover {
            background: var(--gray-medium);
        }

        & span {
            color: var(--blue-low);
            font-size: 1.1rem;
            white-space: nowrap;
        }

        & img {
            width: 40px;
            height: 40px;
        }
    }
}

.authenticate a {
    background: var(--blue-low);
    padding: .5rem 1rem;
    border-radius: 1rem;
    border: 1px solid var(--orange);
    cursor: pointer;
}
</style>