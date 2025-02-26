<template>
    <header>
        <a href="/" class="brand">
            <img src="../assets/img/logo.png" alt="OnlyWay - O som que fortalece a sua fé!">
        </a>
        <nav>
            <ul>
                <li title="Início">
                    <a href="#home">
                        <i class="fa-solid fa-house"></i>
                    </a>
                </li>
                <li title="Programação">
                    <a href="#schedule">
                        <i class="fa-solid fa-list"></i>
                    </a>
                </li>
                <li title="Músicas">
                    <a href="#musics">
                        <i class="fa-solid fa-music"></i>
                    </a>
                </li>
                <li title="Parcerias">
                    <a href="#partnerships">
                        <i class="fa-solid fa-tower-broadcast"></i>
                    </a>
                </li>
                <li title="Anuncie conosco">
                    <a href="#advertise">
                        <i class="fa-solid fa-bullhorn"></i>
                    </a>
                </li>
                <li title="Contato">
                    <a href="#contact">
                        <i class="fa-solid fa-phone"></i>
                    </a>
                </li>
            </ul>
        </nav>
    </header>
</template>
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
}
</style>