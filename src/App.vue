<template>
  <div class="system-frame">
    <headerComponent @changeLink="changeContent($event)" />
    <main class="main-frame">
      <searchComponent @searchSong="search($event)" />
      <div class="home-frame">
        <homeComponent @starredMusic="reloadMusics = true" v-show="selectedMenu.home" />
        <scheduleComponent v-show="selectedMenu.schedule" />
        <songsComponent :reloadMusics="reloadMusics" @reloadedMusics="reloadMusics = false" :search="searchString" v-show="selectedMenu.music" />
        <partnershipsComponent v-show="selectedMenu.business" />
        <contactComponent v-show="selectedMenu.contact" />
      </div>
    </main>
    <img class="system-side-image" id="image1" loading="lazy" :style="'opacity: ' + (selectedMenu.home ? 1 : 0)" :src="woman">
    <img class="system-side-image" id="image2" loading="lazy" :style="'opacity: ' + (selectedMenu.schedule ? 1 : 0)" :src="microphone">
    <img class="system-side-image" id="image3" loading="lazy" :style="'opacity: ' + (selectedMenu.music ? 1 : 0)" :src="music">
    <img class="system-side-image" id="image4" loading="lazy" :style="'opacity: ' + (selectedMenu.business ? 1 : 0)" :src="business">
    <img class="system-side-image" id="image5" loading="lazy" :style="'opacity: ' + (selectedMenu.contact ? 1 : 0)" :src="smartphone">
    <footerComponent />
    <div class="position-fixed p-3" id="toastContainer" style="z-index: 11; bottom: 0; right: 0;">
        <div id="liveToast" class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    Notificação padrão
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

import headerComponent from "./components/headerComponent.vue";
import footerComponent from "./components/footerComponent.vue";
import searchComponent from "./components/searchComponent.vue";
import homeComponent from "./components/homeComponent.vue";
import scheduleComponent from "./components/scheduleComponent.vue";
import songsComponent from "./components/songsComponent.vue";
import partnershipsComponent from "./components/partnershipsComponent.vue";
import contactComponent from "./components/contactComponent.vue";

import woman from "./assets/img/sides/woman.webp";
import microphone from "./assets/img/sides/microphone.webp";
import music from "./assets/img/sides/music.webp";
import business from "./assets/img/sides/business.webp";
import smartphone from "./assets/img/sides/smartphone.webp";

export default {
  data() {
    return {
      isLoaded: false,
      imageCache: {}, // Armazena URLs de imagens carregadas
      woman: woman,
      microphone: microphone,
      music: music,
      business: business,
      smartphone: smartphone,
      loading: true,
      selectedMenu: {
        home: true,
        schedule: false,
        music: false,
        business: false,
        contact: false
      },
      searchString: "",
      reloadMusics: false
    };
  },
  watch: {
    loading: function () {
      if (!this.loading) {
        this.changeContent(1); //Início
      }
    }
  },
  mounted() {
    let self = this;
    let allImages = $('img');
    
    let loadedImagesCount = 0;

    if (allImages.length === 0) {
      self.loading = false;
    }

    allImages.each(function(index, item) {
      if ($(item).attr('src') == "") {
        loadedImagesCount++;
      } else {
        let img = new Image();
        img.src = $(item).attr('src');

        img.onload = function () {
          loadedImagesCount++;

          if (loadedImagesCount === allImages.length) {
            self.loading = false;
          }
        }
      }
    });
  },
  methods: {
    search: function (string) {
      this.changeContent(3);

      this.$nextTick(() => {
        this.searchString = string;
      })
    },
    changeBackgroundImage(number) {
      $(".system-side-image").css("opacity", 0);
      $("#image" + number).css("opacity", 1);
    },
    changeContent: function (number) {
      this.selectedMenu.home = false;
      this.selectedMenu.schedule = false;
      this.selectedMenu.music = false;
      this.selectedMenu.business = false;
      this.selectedMenu.contact = false;
      
      switch (number) {
        case 1: //Início
          this.selectedMenu.home = true; 
          this.changeBackgroundImage(1);
          
          break;
        case 2: //Programação
          this.selectedMenu.schedule = true;
          this.changeBackgroundImage(2);
          
          break;
        case 3: //Músicas
          this.searchString = "";
          this.selectedMenu.music = true;
          this.changeBackgroundImage(3);
          
          break;
        case 4: //Parcerias
          this.selectedMenu.business = true;
          this.changeBackgroundImage(4);
          break;
        case 5:
          this.selectedMenu.contact = true;
          this.changeBackgroundImage(5);
          break;
      }
    }
  },
  components: {
    headerComponent,
    footerComponent,
    searchComponent,
    homeComponent,
    scheduleComponent,
    songsComponent,
    partnershipsComponent,
    contactComponent
  }
};
</script>

<style scoped>
.home-frame {
  margin-left: 1.5rem;
  position: relative;
}

.system-frame {
  display: flex;
  margin: auto;
  overflow: hidden;
  padding: 3rem 2rem;
  max-width: 1400px;
  position: relative;
  min-height: 100vh;
  gap: calc(0.5rem + 3vw);
}

.system-side-image {
  height: 100vh;
  position: absolute;
  right: -7%;
  top: 0;
  transition: opacity 0.4s;
  opacity: 0;
}

.main-frame {
  width: 50%;
  min-width: 200px;
}

@media (max-width: 1222px) {
  .system-side-image {
    height: 70vh;
  }
}

@media (max-width: 1035px) {
  .system-side-image {
    display: none;
  }

  .main-frame {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .system-frame {
    padding: 1rem;
  }
}
</style>
