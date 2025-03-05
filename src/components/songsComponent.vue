<template>
    <section>
        <h3 class="section-title">MÚSICAS</h3>
        <ul class="last-musics list">
            <li v-for="(music, index) in filteredMusics" :key="index" class="song">
                <i class="fa-star" :class="music.starred ? 'fa-solid' : 'fa-regular'" :title="music.starred ? 'Favoritada' : 'Não favoritada'"></i>
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
    props: ["search", "reloadMusics"],
    watch: {
        search: function () {
            this.filteredMusics = this.musics.filter((music) => { return music.title.toLowerCase().indexOf(this.search.toLowerCase()) != -1 || music.author.toLowerCase().indexOf(this.search.toLowerCase()) != -1 });
        },
        reloadMusics: function () {
            if (this.reloadMusics) {
                this.getMusics().then(() => {
                    this.$emit("reloadedMusics");
                });
            }
        }    
    },
    data() {
        return {
            filteredMusics: [],
            musics: []
        }
    },
    methods: {
        getMusics: function () {
            return new Promise((resolve) => {
                let self = this;

                this.$api.get("usuarios/get-musics").then((response) => {
                    self.musics = response.data.returnObj;
                    self.filteredMusics = response.data.returnObj;

                    resolve();
                })
            })
        }
    },
    mounted: function () {
        this.getMusics();
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
        cursor: default;
    }
}
</style>