<template>
  <div class="system-frame">
    <headerComponent />
    <main>
      <searchComponent />
    </main>
    <img class="system-side-image" :src="sectionImage" alt="">
    <footerComponent />
  </div>
</template>

<script>
import headerComponent from "./components/headerComponent.vue";
import footerComponent from "./components/footerComponent.vue";
import searchComponent from "./components/searchComponent.vue";

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
    searchComponent
  }
}
</script>
<style scoped>
.system-frame {
  display: flex;
  margin: auto;
  padding: 3rem 2rem;
  max-width: 1400px;
  position: relative;
  min-height: 100vh;
}

.system-side-image {
  height: 80vh;
  position: absolute;
  right: 0;
  top: 0;
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
}

@media (max-width: 600px) {
  .system-frame {
    padding: 1rem;
  }
}
</style>
