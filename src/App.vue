<template>
  <div class="system-frame">
    <headerComponent @changeLink="changeContent($event)" />
    <main class="main-frame">
      <searchComponent />
      <div class="home-frame">
        <homeComponent :style="'opacity: ' + (selectedMenu.home ? 1 : 0)" />
        <scheduleComponent :style="'opacity: ' + (selectedMenu.schedule ? 1 : 0)" />
      </div>
    </main>
    <img class="system-side-image" id="image1" loading="lazy" :style="'opacity: ' + (selectedMenu.home ? 1 : 0)" :src="woman" alt="">
    <img class="system-side-image" id="image2" loading="lazy" :style="'opacity: ' + (selectedMenu.schedule ? 1 : 0)" :src="microphone" alt="">
    <footerComponent />
  </div>
</template>

<script>
import $ from 'jquery';

import headerComponent from "./components/headerComponent.vue";
import footerComponent from "./components/footerComponent.vue";
import searchComponent from "./components/searchComponent.vue";
import homeComponent from "./components/homeComponent.vue";
import scheduleComponent from "./components/scheduleComponent.vue";

import woman from "./assets/img/sides/woman.webp";
import microphone from "./assets/img/sides/microphone.webp";

export default {
  data() {
    return {
      isLoaded: false,
      imageCache: {}, // Armazena URLs de imagens carregadas
      woman: woman,
      microphone: microphone,
      loading: true,
      selectedMenu: {
        home: true,
        schedule: false
      }
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
    changeBackgroundImage(number) {
      $(".system-side-image").css("opacity", 0);
      $("#image" + number).css("opacity", 1);
    },
    changeContent: function (number) {
      this.selectedMenu.home = false;
      this.selectedMenu.schedule = false;
      
      switch (number) {
        case 1: //Início
          this.selectedMenu.home = true; 
          this.changeBackgroundImage(1);
          
          break;
        case 2: //Programação
          this.selectedMenu.schedule = true;
          this.changeBackgroundImage(2);
          
          break;
      }
    }
  },
  components: {
    headerComponent,
    footerComponent,
    searchComponent,
    homeComponent,
    scheduleComponent
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
