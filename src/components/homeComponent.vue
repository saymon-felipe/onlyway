<template>
    <section class="no-scroll">
        <h1 class="principal-text">OnlyWay</h1>
        <h3 class="secondary-text">O som que fortalece a sua fé!</h3>
        <lastMusics @starredMusic="$emit('starredMusic')" />
    </section>
</template>
<script>
import lastMusics from "./lastMusics.vue";

export default {
    components: {
        lastMusics
    }
}
</script>