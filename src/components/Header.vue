<template>
  <header>
    <nav>
      <router-link to="/" class="logo_name">
        <img src="/assets/img/ex.png" alt="ExoVet Logo" />
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
header {
  background: linear-gradient(135deg, var(--secondary-color) 40%, #D9A7B0 100%);
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  justify-content: space-between; /* Измените это */
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.nav-menu {
  list-style: none;
  display: flex;
  gap: 20px;
  white-space: nowrap;
  justify-content: flex-end; /* Добавьте это */
  align-items: center;
  margin: 0; /* Добавьте это */
  padding: 0; /* Добавьте это */
}

.logo_name {
  display: block;
  transition: transform 0.3s ease;
}

.logo_name:hover {
  transform: scale(1.05);
}

.logo_name img {
  width: 50%;
  height: auto;
}

/* Анимированная кнопка бургер-меню */
.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 5px;
  z-index: 101;
}

.hamburger .bar {
  width: 25px;
  height: 3px;
  background-color: var(--white);
  margin: 3px 0;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  border-radius: 2px;
}

.hamburger.active .bar:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger.active .bar:nth-child(2) {
  opacity: 0;
}

.hamburger.active .bar:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.nav-menu {
  list-style: none;
  display: flex;
  gap: 20px;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
}

.nav-menu li {
  margin: 0;
}

.nav-link {
  color: var(--white);
  text-decoration: none;
  font-weight: bold;
  padding: 12px 16px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-radius: 8px;
  overflow: hidden;
}

/* Простой и элегантный эффект */
.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-color);
  transition: width 0.3s ease;
}

.nav-link:hover::before {
  width: 100%;
}

.nav-link::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 8px;
}

.nav-link:hover::after {
  opacity: 1;
}

.nav-link:hover {
  color: var(--white);
}

/* Дополнительная правая линия через псевдоэлемент */
.nav-menu li {
  position: relative;
}

/* Эффект активной ссылки */
.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.15);
  color: var(--white);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: linear-gradient(135deg, #e8c3c9 0%, #d4a7b5 100%);
    padding: 20px 0;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
    border-radius: 0 0 15px 15px;
  }

  .nav-menu.active {
    display: flex;
    animation: slideDown 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .nav-menu li {
    margin: 8px 0;
    opacity: 0;
    transform: translateY(-20px);
    animation: fadeInUp 0.5s ease forwards;
  }

  .nav-menu.active li:nth-child(1) { animation-delay: 0.1s; }
  .nav-menu.active li:nth-child(2) { animation-delay: 0.2s; }
  .nav-menu.active li:nth-child(3) { animation-delay: 0.3s; }
  .nav-menu.active li:nth-child(4) { animation-delay: 0.4s; }
  .nav-menu.active li:nth-child(5) { animation-delay: 0.5s; }

  .nav-link {
    padding: 15px 20px;
    margin: 0 20px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }

  .nav-link:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  .nav-link::after {
    display: none;
  }
}

/* Анимации */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Дополнительный эффект для всего хедера */
header:hover {
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.15);
}
</style>