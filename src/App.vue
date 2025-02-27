<template>
  <div class="system-frame">
    <headerComponent @changeLink="changeBackgroundImage($event)" />
    <main class="main-frame">
      <searchComponent />
      <homeComponent />
    </main>
    <img class="system-side-image" id="image1" loading="lazy" :src="woman" alt="">
    <img class="system-side-image" id="image2" loading="lazy" :src="microphone" alt="">
    <footerComponent />
  </div>
</template>

<script>
import $ from 'jquery';

import headerComponent from "./components/headerComponent.vue";
import footerComponent from "./components/footerComponent.vue";
import searchComponent from "./components/searchComponent.vue";
import homeComponent from "./components/homeComponent.vue";

import woman from "./assets/img/sides/woman.webp";
import microphone from "./assets/img/sides/microphone.webp";

export default {
  data() {
    return {
      isLoaded: false,
      imageCache: {}, // Armazena URLs de imagens carregadas
      woman: woman,
      microphone: microphone,
      loading: true
    };
  },
  watch: {
    loading: function () {
      if (!this.loading) {
        this.changeBackgroundImage(1); //Imagem principal
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
    changeBackgroundImage(number) {
      $(".system-side-image").css("opacity", 0);
      $("#image" + number).css("opacity", 1);
    }
  },
  components: {
    headerComponent,
    footerComponent,
    searchComponent,
    homeComponent
  }
};
</script>

<style scoped>
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
