<template>
    <div class="search-container">
        <div class="input-search">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Procure uma música ou artista" v-on:keydown="searchSong($event)">
        </div>
        <authUser />
    </div>
</template>
<script>
import $ from 'jquery';
import authUser from "./authUser.vue";

export default { 
    methods: {
        searchSong: function (event) {
            let element = $(event.target);
            let value = element.val();

            this.$emit("searchSong", value);
        }
    },
    components: {
        authUser
    }
}
</script>
<style scoped>
.input-search {
    position: relative;
    flex: 1;

    & i {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 1.5rem;
        display: grid;
        place-items: center;
        font-size: 1rem;
        color: var(--gray-high);
    }

    & input {
        padding-left: 4rem;
    }
}

.search-container {
    display: flex;
    align-items: center;
    margin-bottom: 3rem;
    gap: 1.5rem;
}
</style>