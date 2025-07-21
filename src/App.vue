<template>
  <div>
    <Header />
    <router-view />
    <PhoneButton />
    <BackToTop />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './components/Header.vue'
import PhoneButton from './components/PhoneButton.vue'
import Footer from './components/Footer.vue'
import BackToTop from './components/BackToTop.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    PhoneButton,
    Footer,
    BackToTop
  }
})
</script>

<style scoped>
/* Добавим временный стиль для отладки */
.back-to-top {
  outline: 2px solid red; /* Показывает границы кнопки для отладки */
}
</style>
