<template>
  <div v-if="showBackToTop" class="back-to-top-container">
    <div class="back-to-top-callout">
      <span class="callout-text">Вернуться наверх</span>
      <svg class="callout-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a48899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </div>
    <button :class="['back-to-top', { show: showBackToTop }]" @click="scrollToTop">
      <svg class="back-to-top-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7"></path>
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'BackToTop',
  setup() {
    const showBackToTop = ref(false)

    const scrollToTop = () => {
      console.log('Scroll to Top clicked')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      showBackToTop.value = scrollY > 300
      console.log('Scroll Y:', scrollY, 'Show BackToTop:', showBackToTop.value)
    }

    onMounted(() => {
      console.log('BackToTop mounted')
      window.addEventListener('scroll', handleScroll)
      handleScroll()
    })

    onUnmounted(() => {
      console.log('BackToTop unmounted')
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      showBackToTop,
      scrollToTop,
    }
  },
})
</script>

<style scoped>
.back-to-top-container {
  position: fixed;
  bottom: calc(20px + 60px + 20px); /* 20px (отступ .phone-container) + 60px (высота .phone-btn) + 20px (дополнительный отступ) */
  right: 20px;
  display: flex;
  align-items: center;
  z-index: 1003;
}

.back-to-top-callout {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 12px;
  border-radius: 20px;
  margin-right: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateX(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.back-to-top-container:hover .back-to-top-callout {
  opacity: 1;
  transform: translateX(0);
}

.callout-text {
  font-size: 16px;
  color: var(--primary-color, #a48899);
  margin-right: 8px;
}

.callout-arrow {
  width: 16px;
  height: 16px;
}

.back-to-top {
  width: 60px;
  height: 60px;
  background-color: var(--secondary-color, #a48899);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, background-color 0.3s ease;
  opacity: 0;
  visibility: hidden;
  cursor: pointer;
}

.back-to-top.show {
  opacity: 1;
  visibility: visible;
}

.back-to-top:hover {
  background-color: var(--primary-color, #8a5f70);
  transform: scale(1.1);
}

.back-to-top-icon {
  width: 24px;
  height: 24px;
}

/* Скрываем текст на мобильных экранах */
@media (max-width: 768px) {
  .callout-text, 
  .callout-arrow {
    display: none;
  }
}
</style>