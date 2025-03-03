<template>
    <div class="input-search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Procure uma música ou artista" v-on:keypress="searchSong($event)">
    </div>
</template>
<script>
import $ from 'jquery';

export default { 
    methods: {
        searchSong: function (event) {
            let element = $(event.target);
            let value = element.val();

            if (event.key === "Enter" && value.trim() != "") {
                this.$emit("searchSong", value);
            }
        }
    }
}
</script>
<style scoped>
.input-search {
    position: relative;
    margin-bottom: 3rem;

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
</style>