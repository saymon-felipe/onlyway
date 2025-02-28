<template>
    <section>
        <h3 class="section-title">PARCERIAS</h3>
        <ul class="list">
            <li v-for="(company, index) in companies" :key="index" class="company">
                <img :src="company.image" :alt="company.name">
                <div class="entity-informations">
                    <p class="principal-text-md link" :title="'Clique para ir para o siteda empresa ' + company.name">
                        <a :href="company.url" target="_blank">
                            {{ company.name }}
                        </a>
                    </p>
                    <div class="informations-footer">
                        <p class="fontsize-sm">{{ company.description }}</p>
                        <p class="fontsize-sm">{{ company.year }}</p>
                    </div>
                </div>
            </li>
        </ul>
    </section>
</template>
<script>
import rabsystems from "../assets/img/partners/rabsystems.jpg";

export default {
    data() {
        return {
            companies: [
                {
                    id: 0,
                    name: "Rabsystems",
                    image: rabsystems,
                    description: "Agência WEB",
                    year: 2025,
                    url: "https://rabsystems.com.br?utm_source=onlyway"                
                },
                {
                    id: 1,
                    name: "Rabsystems",
                    image: rabsystems,
                    description: "Agência WEB",
                    year: 2025,
                    url: "https://rabsystems.com.br?utm_source=onlyway"                           
                },
                {
                    id: 2,
                    name: "Rabsystems",
                    image: rabsystems,
                    description: "Agência WEB",
                    year: 2025,
                    url: "https://rabsystems.com.br?utm_source=onlyway"                
                },
                {
                    id: 3,
                    name: "Rabsystems",
                    image: rabsystems,
                    description: "Agência WEB",
                    year: 2025,
                    url: "https://rabsystems.com.br?utm_source=onlyway"                
                },
                {
                    id: 3,
                    name: "Rabsystems",
                    image: rabsystems,
                    description: "Agência WEB",
                    year: 2025,
                    url: "https://rabsystems.com.br?utm_source=onlyway"                
                },
                {
                    id: 3,
                    name: "Rabsystems",
                    image: rabsystems,
                    description: "Agência WEB",
                    year: 2025,
                    url: "https://rabsystems.com.br?utm_source=onlyway"                
                }
            ]
        }
    }
}
</script>
<style scoped>
ul {
    & li {
        margin: 1.5rem 0;
    }
}

.company {
    display: flex;
    place-items: center;
    gap: 1.5rem;

    & img {
        width: 70px;
        height: 70px;
        object-fit: cover;
        border-radius: 1rem;
    }

    & i {
        color: var(--orange);
        cursor: pointer;
    }
}
</style>