<template>
  <section id="animals" class="animals-section">
    <div class="container">
      <h3 class="section-title">Мы принимаем</h3>
      <div class="animals-grid">
        <div 
          v-for="(animal, index) in animals"
          :key="index"
          class="animal-card"
          :style="{ '--delay': `${index * 0.05}s` }"
        >
          <div class="card-inner">
            <div class="icon-container">
              <img 
                :src="animal.icon" 
                :alt="animal.alt"
                class="animal-icon"
                loading="lazy"
              />
            </div>
            <p class="animal-name">{{ animal.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface Animal {
  icon: string
  alt: string
  text: string
}

export default defineComponent({
  name: 'AnimalSection',
  setup() {
    const animals = ref<Animal[]>([
      { icon: './assets/img/rat_icon.png', alt: 'Грызуны', text: 'Грызунов (крыс, хомяков, морских свинок)' },
      { icon: './assets/img/rabbit_icon.png', alt: 'Кролики', text: 'Кроликов' },
      { icon: './assets/img/squirrels_icon.png', alt: 'Бельчьи', text: 'Беличьих' },
      { icon: './assets/img/reptiles_icon.png', alt: 'Рептилии', text: 'Рептилий (черепах, ящериц, змей)' },
      { icon: './assets/img/bird_icon.png', alt: 'Птицы', text: 'Птиц' },
      { icon: './assets/img/bat_icon.png', alt: 'Крыланы', text: 'Крыланов' },
      { icon: './assets/img/hedgehogs_icon.png', alt: 'Ежи', text: 'Ежей' },
      { icon: './assets/img/ferrets_icon.png', alt: 'Хорьки', text: 'Хорьков' },
      { icon: './assets/img/raccoons_icon.png', alt: 'Еноты', text: 'Енотов' },
      { icon: './assets/img/mink_icon.png', alt: 'Норки', text: 'Норок' },
      { icon: './assets/img/fox_icon.png', alt: 'Лисицы', text: 'Лисиц' },
      { icon: './assets/img/puma_icon.png', alt: 'Крупные кошачьи', text: 'Крупных кошачьих и т. д.' }
    ])

    return { animals }
  }
})
</script>

<style scoped>
:root {
  --peach-primary: #ffb7b7;
  --peach-secondary: #ffd3b6;
  --pink-accent: #ff9aa2;
  --pink-light: #ffdfd3;
  --light-bg: #fff5f5;
  --text-dark: #5a4a4a;
  --text-light: #7a6a6a;
  --card-bg: rgba(255, 255, 255, 0.9);
  --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.animals-section {
  padding: 5rem 1rem;
  background: linear-gradient(135deg, var(--light-bg) 40%, #ffecec 100%);
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--peach-primary), var(--pink-accent));
  border-radius: 2px;
}

.animals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
}

.animal-card {
  perspective: 1000px;
  opacity: 0;
  animation: cardEntrance 0.6s ease-out forwards;
  animation-delay: var(--delay);
}

@keyframes cardEntrance {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--card-bg);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  transition: var(--transition);
  box-shadow: 0 4px 15px rgba(255, 154, 162, 0.1);
  border: 1px solid rgba(255, 182, 182, 0.15);
  overflow: hidden;
}

.animal-card:hover .card-inner {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(255, 154, 162, 0.15);
  border-color: rgba(255, 182, 182, 0.3);
}

.card-inner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 183, 183, 0.1) 0%, rgba(255, 218, 210, 0.05) 100%);
  z-index: 1;
}

.icon-container {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--pink-light), var(--peach-primary));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  box-shadow: 0 4px 10px rgba(255, 154, 162, 0.2);
  transition: var(--transition);
}

.animal-card:hover .icon-container {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(255, 154, 162, 0.3);
}

.animal-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(90, 74, 74, 0.1));
}

.animal-name {
  font-size: 1rem;
  color: var(--text-dark);
  margin: 0;
  line-height: 1.4;
  font-weight: 500;
  position: relative;
  z-index: 2;
  text-align: left;
  flex: 1;
}

/* Декоративные элементы */
.animals-section::before {
  content: '';
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255, 218, 210, 0.4) 0%, rgba(255, 218, 210, 0) 70%);
  border-radius: 50%;
}

.animals-section::after {
  content: '';
  position: absolute;
  bottom: -100px;
  left: -50px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 183, 183, 0.3) 0%, rgba(255, 183, 183, 0) 70%);
  border-radius: 50%;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .animals-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (max-width: 768px) {
  .animals-section {
    padding: 3rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .card-inner {
    padding: 1.25rem;
  }
  
  .icon-container {
    width: 50px;
    height: 50px;
    margin-right: 1rem;
  }
  
  .animal-icon {
    width: 28px;
    height: 28px;
  }
}

@media (max-width: 480px) {
  .animals-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
}
</style>