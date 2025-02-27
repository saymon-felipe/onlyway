<template>
  <div class="system-frame">
    <headerComponent />
    <main class="main-frame">
      <searchComponent />
      <homeComponent />
    </main>
    <img class="system-side-image" :src="sectionImage" alt="">
    <footerComponent />
  </div>
</template>

<script>
import headerComponent from "./components/headerComponent.vue";
import footerComponent from "./components/footerComponent.vue";
import searchComponent from "./components/searchComponent.vue";
import homeComponent from "./components/homeComponent.vue";

import woman from "./assets/img/sides/woman.png";
import microphone from "./assets/img/sides/microphone.png";

export default {
  data() {
    return {
      sectionImage: ""
    }
  },
  mounted: function () {
    this.sectionImage = woman;
  },
  components: {
    headerComponent,
    footerComponent,
    searchComponent,
    homeComponent
  }
}
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
