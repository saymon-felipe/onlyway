<template>
    <div class="list">
        <h3 class="section-title">ÚLTIMAS TOCADAS</h3>
        <ul class="last-musics">
            <li v-for="(music, index) in lastMusics" :key="index" class="song">
                <i class="fa-star" v-if="false" :class="music.starred ? 'fa-solid' : 'fa-regular'"></i>
                <div class="song-informations">
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
            lastMusics: [/*
                {
                    id: 0,
                    title: "Todavia Me Alegrarei (Ao Vivo)",
                    author: "Samuel Messias",
                    starred: false
                },
                {
                    id: 1,
                    title: "Todavia Me Alegrarei (Ao Vivo)",
                    author: "Samuel Messias",
                    starred: true
                },
                {
                    id: 2,
                    title: "Todavia Me Alegrarei (Ao Vivo)",
                    author: "Samuel Messias",
                    starred: true
                },
                {
                    id: 3,
                    title: "Todavia Me Alegrarei (Ao Vivo)",
                    author: "Samuel Messias",
                    starred: false
                }
            */]
        }
    },
    methods: {
        fillLastSongs: function (history) {
            let newArray = [];

            for (let i = 0; i < history.length; i++) {
                let musicString = history[i];

                const cleanedString = musicString.replace(/^\d+\.\)\s*/, '').replace(/<br>$/, '');

                if (cleanedString.indexOf("onlyway") != -1) {
                    continue;
                }

                // Separar artistas e título
                const [artistsString, title] = cleanedString.split(' - ');

                // Retornar o objeto
                let filteredList = {
                    title: title.trim(),
                    author: artistsString
                }

                if (newArray.length == 4) {
                    continue;
                }

                newArray.push(filteredList);
            }

            this.lastMusics = newArray;
        }
    },
    mounted: function () {
        let interval = setInterval(() => {
            if (this.$radioData.title != "") {
                clearInterval(interval);

                this.fillLastSongs(this.$radioData.history);
            }
        })
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