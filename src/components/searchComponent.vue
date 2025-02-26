<template>
    <div class="input-search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Procure uma música ou artista">
    </div>
</template>
<script>
export default { 
    
}
</script>
<style scoped>
.input-search {
    position: relative;

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