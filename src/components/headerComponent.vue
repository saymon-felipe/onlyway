<template>
    <header>
        <a href="/" class="brand">
            <img src="../assets/img/logo.png" alt="OnlyWay - O som que fortalece a sua fé!">
        </a>
        <nav>
            <ul>
                <li title="Início" v-on:click="changeLink(1)">
                    <a>
                        <i class="fa-solid fa-house"></i>
                    </a>
                </li>
                <li title="Programação" v-on:click="changeLink(2)">
                    <a>
                        <i class="fa-solid fa-list"></i>
                    </a>
                </li>
                <li title="Músicas" v-on:click="changeLink(3)">
                    <a>
                        <i class="fa-solid fa-music"></i>
                    </a>
                </li>
                <li title="Parcerias" v-on:click="changeLink(4)">
                    <a>
                        <i class="fa-solid fa-tower-broadcast"></i>
                    </a>
                </li>
                <li title="Contato" v-on:click="changeLink(5)">
                    <a>
                        <i class="fa-solid fa-phone"></i>
                    </a>
                </li>
            </ul>
        </nav>
    </header>
</template>
<script>
export default {
    methods: {
        changeLink: function (number) {
            this.$emit("changeLink", number);
        }
    }
}
</script>
<style scoped>
header {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.brand {
    & img {
        width: 3.4rem;
    }
}

ul {
    list-style: none;
    padding: 0;
    margin-top: 2rem;

    & li {
        margin: 1rem 0;
        cursor: pointer;

        & a {
            width: 64px;
            height: 64px;
            min-width: 64px;
            min-height: 64px;
            max-width: 64px;
            max-height: 64px;
            display: grid;
            place-items: center;
            border-radius: 50%;
            text-decoration: none !important;
            transition: all 0.4s ease-in-out;

            &:hover {
                background-color: rgba(217, 217, 217, 0.21);
            }

            & i {
                color: var(--gray-high);
                font-size: 1.4rem;
            }
        }
    }
}

@media (max-width: 600px) {
    ul {
        & li {
            & a {
                width: 54px;
                height: 54px;
                min-width: 54px;
                min-height: 54px;
                max-width: 54px;
                max-height: 54px;

                & i {
                    font-size: 1rem;
                }
            }
        }
    }

    .brand {
        & img {
            width: 2.4rem;
        }
    }
}
</style>