<template>
  <div class="home">
    <Hero />
    <Animal />
    <About />
    <Services />
    <Specialists />
    <Gallery />
    <Prices />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Hero from './Hero.vue'
import Animal from './Animal.vue'
import About from './About.vue'
import Services from './Services.vue'
import Specialists from './Specialists.vue'
import Gallery from './Gallery.vue'
import Prices from './Prices.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Hero,
    Animal,
    About,
    Services,
    Specialists,
    Gallery,
    Prices
  }
})
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 0;
}
</style>