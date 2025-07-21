<template>
  <div class="phone-container">
    <div class="phone-callout">
      <span class="callout-text">Позвонить нам</span>
      <svg class="callout-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a48899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </div>
    <a href="tel:+79526220616" class="phone-btn">
      <svg class="phone-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PhoneButton'
})
</script>

<style scoped>
.phone-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  z-index: 1000;
}

.phone-callout {
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

.phone-container:hover .phone-callout {
  opacity: 1;
  transform: translateX(0);
}

.callout-text {
  font-size: 16px;
  color: var(--primary-color);
  margin-right: 8px;
}

.callout-arrow {
  width: 16px;
  height: 16px;
}

.phone-btn {
  width: 60px;
  height: 60px;
  background-color: var(--secondary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: bounce 2s infinite;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.phone-btn:hover {
  background-color: var(--primary-color);
  transform: scale(1.1);
}

.phone-icon {
  width: 24px;
  height: 24px;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px);
  }
  60% {
    transform: translateY(-7px);
  }
}
</style>