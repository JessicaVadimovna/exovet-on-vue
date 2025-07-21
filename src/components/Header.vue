<template>
  <header>
    <nav>
      <router-link to="/" class="logo_name">
        <img src="/assets/img/logo_name.png" alt="ExoVet Logo" />
      </router-link>
      <div class="menu-toggle" @click="toggleMenu">{{ menuIcon }}</div>
      <ul class="nav-menu" :class="{ active: isMenuActive }">
        <li><router-link to="/about" @click="closeMenu">О нас</router-link></li>
        <li><router-link to="/services" @click="closeMenu">Услуги</router-link></li>
        <li><router-link to="/specialists" @click="closeMenu">Специалисты</router-link></li>
        <li><router-link to="/prices" @click="closeMenu">Прайс</router-link></li>
        <li><router-link to="/contacts" @click="closeMenu">Контакты</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'Header',
  setup() {
    const isMenuActive = ref<boolean>(false)

    const menuIcon = computed((): string => isMenuActive.value ? '✖' : '☰')

    const toggleMenu = (): void => {
      isMenuActive.value = !isMenuActive.value
    }

    const closeMenu = (): void => {
      isMenuActive.value = false
    }

    return { isMenuActive, menuIcon, toggleMenu, closeMenu }
  }
})
</script>

<style scoped>
header {
  background: linear-gradient(135deg, var(--secondary-color) 40%, #D9A7B0 100%);
  padding: 20px;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.logo_name {
  display: block;
}

.logo_name img {
  width: 50%;
  height: auto;
}

.menu-toggle {
  display: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--white);
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

.nav-menu a {
  color: var(--white);
  text-decoration: none;
  font-weight: bold;
  padding: 0 10px;
  position: relative;
  transition: var(--transition-fast);
}

.nav-menu:hover a {
  color: rgba(var(--link-color-rgb), 0.35);
}

.nav-menu a:hover {
  color: var(--primary-color);
}

.nav-menu a::after {
  content: "";
  position: absolute;
  height: 2px;
  width: 0;
  background: var(--primary-color);
  bottom: 0;
  left: 10px;
  transition: width var(--transition-fast);
}

.nav-menu a:hover::after {
  width: calc(100% - 20px);
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }
  .nav-menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #e8c3c9;
    padding: 20px 0;
    box-shadow: var(--shadow-sm);
  }
  .nav-menu.active {
    display: flex;
    animation: slideDown 0.3s ease-in-out;
  }
  .nav-menu li {
    margin: 15px 0;
  }
}
</style>