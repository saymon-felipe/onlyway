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
                    time: "00:00 - 23:59",
                    title: "Louvor Sem Fim - (Só as melhores)",
                    description: "As melhores músicas gospel, 24h por dia, para encher seu coração de fé e adoração!"
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