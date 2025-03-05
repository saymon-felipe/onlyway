<template>
    <div class="list" style="margin-top: 3rem;">
        <h3 class="section-title">ÚLTIMAS TOCADAS</h3>
        <ul class="last-musics">
            <li v-for="(music, index) in lastMusics" :key="index" class="song">
                <i class="fa-star" :class="music.starred ? 'fa-solid' : 'fa-regular'" v-on:click="starMusic(music)" :title="music.starred ? 'Desfavoritar' : 'Favoritar'"></i>
                <div class="entity-informations">
                    <p class="principal-text-md">{{ music.title }}</p>
                    <p class="fontsize-sm">{{ music.author }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            lastMusics: [],
            favoritedMusics: []
        }
    },
    watch: {
        '$radioData.history': function () {
            this.getFavoritedMusics(this.$radioData.history);
        }
    },
    methods: {
        starMusic: function (music) {
            let self = this;

            if (!localStorage.getItem("onlywayJwt")) {
                this.$showToast("Faça login para acessar essa função.", "error");

                return;
            }

            if (music.starred) {
                this.$api.post("usuarios/toggle-star-music", { music: music }).then(() => {
                    self.$showToast("Música desfavoritada com sucesso.", "success");
                    music.starred = !music.starred;
                    this.getFavoritedMusics(this.$radioData.history);
                    this.$emit("starredMusic");
                })
            } else {
                this.$api.post("usuarios/toggle-star-music", { music: music }).then(() => {
                    self.$showToast("Música favoritada com sucesso.", "success");
                    music.starred = !music.starred;
                    this.getFavoritedMusics(this.$radioData.history);
                    this.$emit("starredMusic");
                })
            }
        },
        getFavoritedMusics: function (radioData) {
            let self = this;

            this.$api.get("usuarios/get-favorited-musics").then((response) => {
                self.favoritedMusics = response.data.returnObj;
                self.fillLastSongs(radioData);
            })
        },
        fillLastSongs: function (history) {
            let newArray = [];

            for (let i = 0; i < history.length; i++) {
                let musicString = history[i];

                const cleanedString = musicString.replace(/^\d+\.\)\s*/, '').replace(/<br>$/, '');

                if (cleanedString.toLowerCase().indexOf("onlyway") != -1) {
                    continue;
                }

                // Separar artistas e título
                const [artistsString, title] = cleanedString.split(' - ');

                let staredMusic = false;

                if (this.favoritedMusics.some((music) => { return music.identifier == cleanedString }) ) {
                    staredMusic = true;
                }

                // Retornar o objeto
                let filteredList = {
                    title: title.trim(),
                    author: artistsString,
                    starred: staredMusic
                }

                if (newArray.length == 4) {
                    continue;
                }

                newArray.push(filteredList);
            }

            this.lastMusics = newArray;
        }
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