<template>
  <header>
    <nav>
      <router-link to="/" class="logo_name">
        <img src="/assets/img/ex.png" alt="ExoVet Logo" draggable="false"/>
      </router-link>
      
      <!-- Анимированная кнопка бургер-меню -->
      <div class="hamburger" :class="{ active: isMenuActive }" @click="toggleMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
      
      <ul class="nav-menu" :class="{ active: isMenuActive }">
        <li><router-link to="/about" @click="closeMenu" class="nav-link">О нас</router-link></li>
        <li><router-link to="/services" @click="closeMenu" class="nav-link">Услуги</router-link></li>
        <li><router-link to="/specialists" @click="closeMenu" class="nav-link">Специалисты</router-link></li>
        <li><router-link to="/gallery" @click="closeMenu" class="nav-link">Галерея</router-link></li>
        <li><router-link to="/prices" @click="closeMenu" class="nav-link">Прайс</router-link></li>
        <li><router-link to="/contacts" @click="closeMenu" class="nav-link">Контакты</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Header',
  setup() {
    const isMenuActive = ref<boolean>(false)

    const toggleMenu = (): void => {
      isMenuActive.value = !isMenuActive.value
    }

    const closeMenu = (): void => {
      isMenuActive.value = false
    }

    return { isMenuActive, toggleMenu, closeMenu }
  }
})
</script>

<style scoped>
:root {
  --premium-dark: #1a1a1a;
  --premium-charcoal: #2a2a2a;
  --premium-silver: #e8e8e8;
  --premium-platinum: #f5f5f5;
  --premium-white: #ffffff;
  --accent-rose: #d4a7b5;
  --accent-rose-light: rgba(212, 167, 181, 0.1);
  --accent-rose-medium: rgba(212, 167, 181, 0.3);
}

header {
  background: linear-gradient(180deg, 
    var(--premium-white) 0%, 
    var(--premium-platinum) 50%, 
    var(--premium-silver) 100%
  );
  border-bottom: 1px solid rgba(212, 167, 181, 0.2);
  padding: 24px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(16px);
  transition: all 0.3s ease;
}

header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    var(--accent-rose) 20%, 
    var(--accent-rose) 80%, 
    transparent 100%
  );
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1325px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
  color: #565f68;
}

.logo_name img {
  width: 50%;
  height: auto;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
}

/* Бургер-меню */
.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 12px;
  z-index: 101;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  border: 1px solid rgba(212, 167, 181, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.hamburger:hover {
  background: rgba(255, 255, 255, 1);
  border-color: var(--accent-rose);
  box-shadow: 0 8px 24px rgba(212, 167, 181, 0.2);
}

.hamburger .bar {
  width: 28px;
  height: 2px;
  background-color: #565f68;
  margin: 4px 0;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  border-radius: 2px;
}

.hamburger.active .bar:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
  background-color: #565f68;
}

.hamburger.active .bar:nth-child(2) {
  opacity: 0;
  transform: translateX(-20px);
}

.hamburger.active .bar:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
  background-color: #d4a7b5;
}

.nav-menu {
  list-style: none;
  display: flex;
  gap: 8px;
  white-space: nowrap;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
  padding: 0;
}

.nav-menu li {
  margin: 0;
  position: relative;
}

.nav-link {
  color: var(--premium-charcoal);
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0.3px;
  padding: 14px 24px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-radius: 12px;
  overflow: hidden;
  background: transparent;
  border: 1px solid transparent;
}

/* Элегантный эффект наведения */
.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: all 0.3s ease;
  border-radius: 11px;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-rose), #e8c3c9);
  transition: all 0.4s ease;
  transform: translateX(-50%);
}

.nav-link:hover::before {
  opacity: 1;
}

.nav-link:hover::after {
  width: 80%;
}

.nav-link:hover {
  color: var(--premium-dark);
  border-color: rgba(212, 167, 181, 0.3);
  box-shadow: 0 8px 24px rgba(212, 167, 181, 0.15);
  transform: translateY(-2px);
}

/* Статусная активная ссылка */
.nav-link.router-link-active {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(248, 248, 248, 1) 100%
  );
  color: var(--premium-dark);
  border-color: rgba(212, 167, 181, 0.3);
  box-shadow: 0 12px 32px rgba(212, 167, 181, 0.25);
  font-weight: 600;
}

.nav-link.router-link-active::after {
  width: 80%;
  background: var(--accent-rose);
}

@media (max-width: 768px) {
  nav {
    padding: 0 24px;
  }
  
  .hamburger {
    display: flex;
  }

  .nav-menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: calc(100% + 16px);
    left: 24px;
    right: 24px;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.98) 0%, 
      rgba(248, 248, 248, 0.98) 100%
    );
    padding: 32px 24px;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.12);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    gap: 25px;
  }

  .nav-menu::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    width: 16px;
    height: 16px;
    background: inherit;
    transform: translateX(-50%) rotate(45deg);
    border-radius: 4px 0 0 0;
  }

  .nav-menu.active {
    display: flex;
    animation: slideDown 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .nav-menu li {
    margin: 0;
    opacity: 0;
    transform: translateY(-20px);
    animation: fadeInUp 0.6s ease forwards;
  }

  .nav-menu.active li:nth-child(1) { animation-delay: 0.1s; }
  .nav-menu.active li:nth-child(2) { animation-delay: 0.15s; }
  .nav-menu.active li:nth-child(3) { animation-delay: 0.2s; }
  .nav-menu.active li:nth-child(4) { animation-delay: 0.25s; }
  .nav-menu.active li:nth-child(5) { animation-delay: 0.3s; }
  .nav-menu.active li:nth-child(6) { animation-delay: 0.35s; }

  .nav-link {
    padding: 18px 24px;
    margin: 0;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.7) 0%, 
      rgba(245, 245, 245, 0.8) 100%
    );
    transition: all 0.4s ease;
    font-weight: 500;
  }

  .nav-link:hover {
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 1) 0%, 
      rgba(248, 248, 248, 1) 100%
    );
    transform: translateY(-4px) scale(1.02);
  }

  .nav-link::before,
  .nav-link::after {
    display: none;
  }
}

/* Премиум анимации */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-24px) scale(0.95);
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    backdrop-filter: blur(20px);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(-24px) translateX(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0) translateX(0);
  }
}

/* Дополнительный премиум эффект для хедера */
header:hover {
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
  background: linear-gradient(180deg, 
    var(--premium-white) 0%, 
    rgba(248, 248, 248, 0.98) 50%, 
    rgba(232, 232, 232, 0.95) 100%
  );
}

/* Адаптивность для больших экранов */
@media (min-width: 1200px) {
  .nav-link {
    padding: 16px 28px;
    font-size: 16px;
  }
}

@media (min-width: 1600px) {
  nav {
    padding: 0 60px;
  }
}
</style>