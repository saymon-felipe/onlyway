<template>
    <section>
        <h3 class="section-title">MÚSICAS</h3>
        <ul class="last-musics list">
            <li v-for="(music, index) in musics" :key="index" class="song">
                <i class="fa-star" :class="music.starred ? 'fa-solid' : 'fa-regular'"></i>
                <div class="entity-informations">
                    <p class="principal-text-md">{{ music.title }}</p>
                    <div class="informations-footer">
                        <p class="fontsize-sm">{{ music.author }}</p>
                        <p class="fontsize-sm">{{ music.year }}</p>
                    </div>
                </div>
            </li>
        </ul>
    </section>
</template>
<script>
export default {
    props: ["search"],
    watch: {
        search: function () {
            console.log(this.search)
        }      
    },
    data() {
        return {
            musics: [
                {
                    id: 0,
                    title: "Todavia Me Alegrarei (Ao Vivo)",
                    author: "Samuel Messias",
                    starred: false,
                    year: 2015                
                },
                {
                    id: 1,
                    title: "Todavia Me Alegrarei (Ao Vivo)",
                    author: "Samuel Messias",
                    starred: false,
                    year: 2015                
                },
                {
                    id: 2,
                    title: "Todavia Me Alegrarei (Ao Vivo)",
                    author: "Samuel Messias",
                    starred: false,
                    year: 2015                
                }
            ]
        }
    },
    mounted: function () {
        console.log(this.search)
    }
}
</script>
<style scoped>
ul {
    & li {
        margin: 1rem 0;
    }
}

.song {
    display: flex;
    place-items: center;
    gap: 1.5rem;

    & i {
        color: var(--orange);
        cursor: pointer;
    }
}
</style>