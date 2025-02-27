<template>
    <section>
        <h3 class="section-title">PROGRAMAÇÃO</h3>
        <ul class="schedule list">
            <li v-for="(item, index) in schedules" :key="index" class="program">
                <div class="song-informations">
                    <p class="fontsize-sm">{{ item.time }}</p>
                    <p class="principal-text-md">{{ item.title }}</p>
                    <p class="fontsize-sm">{{ item.description }}</p>
                </div>
            </li>
        </ul>
    </section>
</template>
<script>
export default {
    data() {
        return {
            schedules: [
                {
                    id: 0,
                    time: "05:00 - 06:00",
                    title: "Oração da Madrugada - (com Thony Cezar)",
                    description: "Momento de intercessão e reflexão matinal."
                },
                {
                    id: 1,
                    time: "05:00 - 06:00",
                    title: "Oração da Madrugada - (com Thony Cezar)",
                    description: "Momento de intercessão e reflexão matinal."
                },
                {
                    id: 2,
                    time: "05:00 - 06:00",
                    title: "Oração da Madrugada - (com Thony Cezar)",
                    description: "Momento de intercessão e reflexão matinal."
                }
            ]
        }
    }
}
</script>
<style scoped>
ul {
    & li {
        margin: 2rem 0;
    }
}

.program {
    display: flex;
    place-items: center;
    gap: 1.5rem;

    & i {
        color: var(--orange);
        cursor: pointer;
    }
}
</style>