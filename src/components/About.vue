<template>
  <section id="about-animals" class="about-animals-section">
    <div class="container">
      <!-- About Section -->
      <div class="about-section">
        <div class="trust-section">
          <h3 class="trust-title">О нас</h3>
          <p class="trust-subtitle">ExoVet - это специализированная клиника, которая предоставляет экспертную ветеринарную помощь исключительно экзотическим животным.</p>
          <TransitionGroup name="fade" tag="div" class="trust-indicators">
            <div v-for="(item, i) in trustItems" :key="i" class="trust-item">
              <div class="trust-icon">
                <svg viewBox="0 0 24 24" aria-label="Trust Icon">
                  <path :d="item.icon" />
                </svg>
              </div>
              <h4 class="trust-item-title">{{ item.title }}</h4>
              <p class="trust-item-text">{{ item.text }}</p>
            </div>
          </TransitionGroup>
        </div>
      </div>
      <!-- Animals Section -->
      <div class="animals-section">
        <div class="section-header">
          <h3 class="section-title">Мы принимаем</h3>
          <p class="section-subtitle">Специализируемся на лечении экзотических животных</p>
        </div>
        <div class="animal-groups">
          <div 
            v-for="(group, groupIndex) in animalGroups"
            :key="groupIndex"
            class="animal-group"
            :style="{ '--group-delay': `${groupIndex * 0.15}s` }"
          >
            <div class="group-header">
              <div class="group-line"></div>
              <h4 class="group-title">
                <span class="title-bg">{{ group.title }}</span>
              </h4>
              <div class="group-line"></div>
            </div>
            <div class="animals-grid">
              <div 
                v-for="(animal, index) in group.animals"
                :key="index"
                class="animal-card"
                :style="{ '--delay': `${(groupIndex * 3 + index) * 0.08}s` }"
              >
                <div class="card-content">
                  <div class="icon-wrapper">
                    <img 
                      :src="animal.icon" 
                      :alt="animal.alt"
                      class="animal-icon"
                      loading="lazy"
                    />
                  </div>
                  <div class="text-content">
                    <h5 class="animal-name">{{ animal.text }}</h5>
                    <p v-if="animal.examples" class="animal-examples">{{ animal.examples }}</p>
                  </div>
                  <div class="card-glow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cta-section">
          <div class="cta-card">
            <div class="cta-icon">
              <div class="icon-pulse"></div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="9"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
            </div>
            <div class="cta-content">
              <h4>Другие экзотические животные</h4>
              <p>Не нашли своего питомца? Свяжитесь с нами для консультации <a href="tel:+79526220616">+7 (952) 622-06-16</a></p>
            </div>
            <div class="cta-decoration"></div>
          </div>
        </div>
      </div>
      <div class="floating-elements">
        <div class="float-element float-1"></div>
        <div class="float-element float-2"></div>
        <div class="float-element float-3"></div>
        <div class="particle" v-for="n in 10" :key="'particle-' + n" :style="particleStyle(n)"></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface TrustItem {
  icon: string
  title: string
  text: string
}

interface Animal {
  icon: string
  alt: string
  text: string
  examples?: string
}

interface AnimalGroup {
  title: string
  animals: Animal[]
}

export default defineComponent({
  name: 'AboutAnimalsSection',
  setup() {
    const trustItems = ref<TrustItem[]>([
      {
        icon: 'M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z',
        title: 'Экспертиза',
        text: 'Специалисты с высшим образованием и регулярным повышением квалификации'
      },
      {
        icon: 'M12,2L4,5V11.09C4,16.14 7.41,20.85 12,22C16.59,20.85 20,16.14 20,11.09V5L12,2M14,16H10V14H14V16M14,12H10V8H14V12Z',
        title: 'Специализация',
        text: 'Глубокие знания в конкретных областях ветеринарии'
      },
      {
        icon: 'M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z',
        title: 'Забота',
        text: 'Искренняя любовь и индивидуальный подход к каждому питомцу'
      },
      {
        icon: 'M12,5C10.89,5 10,5.89 10,7V12C10,12.55 10.45,13 11,13H13C13.55,13 14,12.55 14,12V9H16V17H8V9H10V7C10,5.89 10.89,5 12,5M12,3C14.21,3 16,4.79 16,7V9H18V19H6V9H8V7C8,4.79 9.79,3 12,3Z',
        title: 'Опыт',
        text: 'Тысячи успешных случаев лечения и довольных хозяев'
      }
    ])

    const animalGroups = ref<AnimalGroup[]>([
      {
        title: 'Грызуны',
        animals: [
          { 
            icon: './assets/img/cards/rat.png', 
            alt: 'Крысы и мыши', 
            text: 'Крысы и мыши',
            examples: 'декоративные крысы, мыши, песчанки'
          },
          { 
            icon: './assets/img/cards/hamster.png', 
            alt: 'Хомяки', 
            text: 'Хомяки',
            examples: 'джунгарские, сирийские, китайские'
          },
          { 
            icon: './assets/img/cards/guinea_pig.png', 
            alt: 'Морские свинки', 
            text: 'Морские свинки',
            examples: 'американские, перуанские, абиссинские'
          },
          { 
            icon: './assets/img/cards/chinchilla.png', 
            alt: 'Шиншиллы', 
            text: 'Шиншиллы и дегу' 
          }
        ]
      },
      {
        title: 'Зайцеобразные и хищники',
        animals: [
          { 
            icon: './assets/img/cards/rabbit.png', 
            alt: 'Кролики', 
            text: 'Декоративные кролики',
            examples: 'карликовые, вислоухие, ангорские'
          },
          { 
            icon: './assets/img/cards/ferret.png', 
            alt: 'Хорьки', 
            text: 'Хорьки и куньи',
            examples: 'домашние хорьки, норки'
          },
          { 
            icon: './assets/img/cards/raccoon.png', 
            alt: 'Лисицы', 
            text: 'Лисицы и еноты',
            examples: 'фенеки, песцы, еноты-полоскуны'
          },
          { 
            icon: './assets/img/cards/serval.png', 
            alt: 'Дикие кошачьи', 
            text: 'Дикие кошачьи',
            examples: 'сервалы, каракалы, оцелоты'
          }
        ]
      },
      {
        title: 'Другие млекопитающие',
        animals: [
          { 
            icon: './assets/img/cards/squirrel.png', 
            alt: 'Белки', 
            text: 'Беличьи',
            examples: 'белки, бурундуки, летяги'
          },
          { 
            icon: './assets/img/cards/hedgehog.png', 
            alt: 'Ежи', 
            text: 'Ежи и опоссумы',
            examples: 'африканские ежи, виргинские опоссумы'
          },
          { 
            icon: './assets/img/cards/bat.png', 
            alt: 'Рукокрылые', 
            text: 'Рукокрылые',
            examples: 'крыланы, летучие мыши'
          }
        ]
      },
      {
        title: 'Рептилии и амфибии',
        animals: [
          { 
            icon: './assets/img/cards/turtle.png', 
            alt: 'Черепахи', 
            text: 'Черепахи',
            examples: 'сухопутные, водные, полуводные'
          },
          { 
            icon: './assets/img/cards/lizard.png', 
            alt: 'Ящерицы', 
            text: 'Ящерицы',
            examples: 'игуаны, гекконы, вараны, агамы'
          },
          { 
            icon: './assets/img/cards/snake.png', 
            alt: 'Змеи', 
            text: 'Змеи',
            examples: 'питоны, удавы, ужеобразные'
          },
          { 
            icon: './assets/img/cards/frog.png', 
            alt: 'Амфибии', 
            text: 'Земноводные',
            examples: 'лягушки, жабы, тритоны'
          }
        ]
      },
      {
        title: 'Птицы',
        animals: [
          { 
            icon: './assets/img/cards/parrot.png', 
            alt: 'Попугаи', 
            text: 'Попугаи',
            examples: 'жако, ара, какаду, волнистые'
          },
          { 
            icon: './assets/img/cards/songbird.png', 
            alt: 'Певчие птицы', 
            text: 'Певчие птицы',
            examples: 'канарейки, амадины, астрильды'
          },
          { 
            icon: './assets/img/cards/bird_of_prey.png', 
            alt: 'Хищные птицы', 
            text: 'Хищные птицы',
            examples: 'совы, ястребы, соколы'
          }
        ]
      }
    ])

    const particleStyle = (index: number) => ({
      '--particle-delay': `${index * 0.5}s`,
      '--particle-x': `${Math.random() * 100}vw`,
      '--particle-y': `${Math.random() * 100}vh`,
      '--particle-size': `${Math.random() * 4 + 2}px`,
      '--particle-duration': `${Math.random() * 10 + 10}s`
    })

    return { trustItems, animalGroups, particleStyle }
  }
})
</script>

<style scoped>
:root {
  /* Розово-серые-белые тона */
  --primary: #e91e63;
  --secondary: #f8bbd0;
  --accent: #f48fb1;
  --light: #fce4ec;
  --ultra-light: #fff8f7;
  --bg-main: #fffaf9;
  --bg-card: rgba(255, 255, 255, 0.95);
  --text-dark: #4a148c;
  --text-medium: #7b1fa2;
  --text-light: #ab47bc;
  --text-muted: #ce93d8;
  --shadow-soft: 0 6px 24px rgba(233, 30, 99, 0.15);
  --shadow-hover: 0 12px 36px rgba(233, 30, 99, 0.25);
  --shadow-strong: 0 16px 48px rgba(233, 30, 99, 0.3);
  --radius-sm: 16px;
  --radius-md: 20px;
  --radius-lg: 28px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --bounce: cubic-bezier(0.7, -0.4, 0.3, 1.4);
  --light-bg: #fff5f5;
  --white: #ffffff;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --pink-primary: #e91e63;
  --pink-secondary: #f8bbd0;
  --pink-accent: #f48fb1;
  --pink-muted: #ce93d8;
  --pink-light: #fce4ec;
  --trust-gradient-start: #e91e63;
  --trust-gradient-end: #f48fb1;
  --text-color: #5a4a4a;
}

.about-animals-section {
  padding: 2rem 1.5rem;
  background: 
    radial-gradient(circle at 20% 30%, var(--light) 0%, transparent 60%),
    radial-gradient(circle at 80% 70%, rgba(248, 187, 208, 0.3) 0%, transparent 60%),
    linear-gradient(145deg, var(--bg-main) 0%, #fff7f6 50%, var(--ultra-light) 100%);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* About Section Styles */
.about-section {
  padding: 0;
}

.trust-section {
  margin-top: 4rem;
  position: relative;
}

/* Убрана линия перед "О нас" */
.trust-section::before {
  display: none;
}

.trust-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 70px;
  position: relative;
  color: var(--text-dark);
  font-weight: 800;
  letter-spacing: 0.02em;
  /* Убран градиент для лучшей читаемости */
  color: #a1808f;
}

.trust-title::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, var(--trust-gradient-start), var(--trust-gradient-end));
  border-radius: 2px;
}

.trust-indicators {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.trust-item {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(233, 30, 99, 0.1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(233, 30, 99, 0.1);
}

.trust-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--trust-gradient-start), var(--trust-gradient-end));
}

.trust-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(233, 30, 99, 0.2);
  background: rgba(255, 255, 255, 0.98);
}

.trust-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, rgba(252, 228, 236, 0.9), rgba(248, 187, 208, 0.7));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--pink-accent);
  box-shadow: 0 4px 10px rgba(233, 30, 99, 0.15);
}

.trust-icon svg {
  width: 30px;
  height: 30px;
  fill: var(--pink-accent);
}

.trust-item-title {
  font-size: 1.3rem;
  color: var(--text-dark);
  margin-bottom: 15px;
  font-weight: 700;
}

.trust-item-text {
  font-size: 0.95rem;
  color: var(--text-medium);
  line-height: 1.6;
  opacity: 0.95;
}

/* Animals Section Styles */
.animals-section {
  padding: 4rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 5rem;
}

.section-title {
  font-size: clamp(2.75rem, 5.5vw, 4rem);
  font-weight: 900;
  margin-bottom: 1.25rem;
  color: #a1808f;
  letter-spacing: 0.02em;
}

.section-subtitle {
  font-size: 1.3rem;
  color: var(--text-medium);
  font-weight: 500;
  letter-spacing: 0.02em;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.animal-groups {
  display: grid;
  gap: 4rem;
}

.animal-group {
  transform: translateY(0) scale(1);
  animation: fadeInUp 0.6s ease-out both;
  animation-delay: var(--group-delay);
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.group-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
  gap: 2rem;
}

.group-title {
  margin: 0;
  position: relative;
}

.title-bg {
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-dark);
  background: linear-gradient(135deg, var(--bg-card), rgba(255, 255, 255, 0.95));
  padding: 0.9rem 2.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  border: 2px solid rgba(233, 30, 99, 0.2);
  backdrop-filter: blur(12px);
  position: relative;
  overflow: hidden;
  transition: var(--transition);
  color: var(--text-dark);
  font-weight: 700;
  letter-spacing: 0.02em;
}

.title-bg:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-hover);
}

.title-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  transition: left 0.5s ease;
}

.group-title:hover .title-bg::before {
  left: 100%;
}

.group-line {
  flex: 1;
  height: 4px;
  background: linear-gradient(90deg, transparent, var(--primary) 30%, var(--accent) 70%, transparent);
  border-radius: 3px;
  position: relative;
  overflow: hidden;
}

.group-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7), transparent);
  animation: shimmer 2.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  50% { left: 100%; }
  100% { left: 100%; }
}

.animals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.animal-card {
  transform: translateY(0) scale(1);
  animation: fadeInUp 0.5s ease-out both;
  animation-delay: var(--delay);
}

.card-content {
  background: var(--bg-card);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  box-shadow: var(--shadow-soft);
  border: 1px solid rgba(233, 30, 99, 0.15);
  transition: var(--transition);
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
  height: 100%;
  color: var(--text-dark);
}

.card-content:hover {
  transform: translateY(-10px) scale(1.03);
  box-shadow: var(--shadow-hover);
  border-color: rgba(233, 30, 99, 0.4);
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(233, 30, 99, 0.2) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.card-content:hover .card-glow {
  opacity: 1;
}

/* Убраны тени и обводки у иконок */
.icon-wrapper {
  width: 56px;
  height: 56px;
  background: transparent;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  transition: var(--transition);
  overflow: hidden;
  box-shadow: none;
  border: none;
}

.animal-icon {
  width: 52px;
  height: 52px;
  object-fit: contain;
  filter: none;
  z-index: 1;
  position: relative;
  box-shadow: none;
  border: none;
}

.text-content {
  flex: 1;
  min-width: 0;
  text-align: center;
}

.animal-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.animal-examples {
  font-size: 0.9rem;
  color: var(--text-light);
  margin: 0;
  line-height: 1.5;
  font-style: italic;
}

.cta-section {
  margin-top: 5rem;
  display: flex;
  justify-content: center;
}

.cta-card {
  background: linear-gradient(135deg, var(--bg-card), rgba(255, 255, 255, 0.95));
  border-radius: var(--radius-lg);
  padding: 3rem;
  display: flex;
  align-items: center;
  gap: 2.5rem;
  max-width: 650px;
  width: 100%;
  box-shadow: var(--shadow-strong);
  border: 3px dashed rgba(233, 30, 99, 0.35);
  transition: var(--transition);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  color: var(--text-dark);
}

.cta-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 24px 56px rgba(233, 30, 99, 0.45);
  border-color: rgba(233, 30, 99, 0.7);
}

.cta-decoration {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(248, 187, 208, 0.3) 0%, transparent 70%);
  animation: rotate 15s linear infinite;
  pointer-events: none;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.cta-icon {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(233, 30, 99, 0.5);
  transition: var(--transition);
}

.cta-card:hover .cta-icon {
  transform: scale(1.15) rotate(15deg);
  box-shadow: 0 16px 40px rgba(233, 30, 99, 0.7);
}

.icon-pulse {
  position: absolute;
  top: -6px;
  left: -6px;
  right: -6px;
  bottom: -6px;
  border: 2px solid var(--primary);
  border-radius: 50%;
  animation: pulse-ring 2.2s ease-out infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.4); opacity: 0; }
}

.cta-icon svg {
  width: 32px;
  height: 32px;
  z-index: 1;
}

.cta-content h4 {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text-dark);
  margin: 0 0 1rem 0;
}

.cta-content p {
  font-size: 1.1rem;
  color: var(--text-medium);
  margin: 0;
  line-height: 1.6;
}

.cta-content p a {
  color: var(--text-color, #333);
  text-decoration: none;
  font-weight: 700;
}

.cta-content p a:hover {
  text-decoration: none;
  color: var(--primary);
}

::v-deep(.cta-content p a[href^="tel"]) {
  color: var(--text-medium);
  text-decoration: none;
  font-weight: 700;
}

::v-deep(.cta-content p a[href^="tel"]:hover) {
  color: var(--primary);
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.float-element {
  position: absolute;
  border-radius: 50%;
  opacity: 0.7;
}

.float-1 {
  width: 140px;
  height: 140px;
  background: linear-gradient(45deg, var(--primary), var(--accent));
  top: 15%;
  right: 8%;
  animation: float 7s ease-in-out infinite;
}

.float-2 {
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, var(--accent), var(--light));
  bottom: 25%;
  left: 10%;
  animation: float 5s ease-in-out infinite reverse;
}

.float-3 {
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, var(--accent), var(--primary));
  top: 55%;
  right: 20%;
  animation: float 9s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33% { transform: translateY(-25px) rotate(100deg); }
  66% { transform: translateY(15px) rotate(200deg); }
}

.particle {
  position: absolute;
  width: var(--particle-size);
  height: var(--particle-size);
  background: radial-gradient(circle, rgba(248, 187, 208, 0.6) 0%, transparent 70%);
  border-radius: 50%;
  animation: drift var(--particle-duration) linear infinite;
  animation-delay: var(--particle-delay);
  pointer-events: none;
}

@keyframes drift {
  0% { 
    transform: translate(var(--particle-x), var(--particle-y));
    opacity: 0.6;
  }
  50% { opacity: 0.3; }
  100% { 
    transform: translate(calc(var(--particle-x) + 50vw), calc(var(--particle-y) - 20vh));
    opacity: 0;
  }
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .trust-indicators {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .animals-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}

@media (max-width: 768px) {
  .about-animals-section {
    padding: 4rem 1.25rem;
  }
  .section-header {
    margin-bottom: 3.5rem;
  }
  .animal-groups {
    gap: 3rem;
  }
  .group-header {
    gap: 1.5rem;
  }
  .title-bg {
    font-size: 1.3rem;
    padding: 0.75rem 2rem;
  }
  .animals-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.25rem;
  }
  .card-content {
    padding: 1.25rem;
  }
  .icon-wrapper {
    width: 48px;
    height: 48px;
  }
  .animal-icon {
    width: 28px;
    height: 28px;
  }
  .animal-name {
    font-size: 1rem;
  }
  .animal-examples {
    font-size: 0.85rem;
  }
  .cta-card {
    padding: 2.5rem;
    gap: 2rem;
  }
  .cta-icon {
    width: 64px;
    height: 64px;
  }
  .cta-icon svg {
    width: 28px;
    height: 28px;
  }
  .trust-indicators {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .trust-item {
    padding: 30px 25px;
  }
  .trust-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 640px) {
  .about-animals-section {
    padding: 3rem 1rem;
  }
  .animals-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
  }
  .card-content {
    padding: 1rem;
  }
  .icon-wrapper {
    width: 44px;
    height: 44px;
  }
  .animal-icon {
    width: 26px;
    height: 26px;
  }
  .animal-name {
    font-size: 0.95rem;
  }
  .animal-examples {
    font-size: 0.8rem;
  }
  .cta-card {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1.5rem;
  }
  .cta-icon {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .about-animals-section {
    padding: 2.5rem 1rem;
  }
  .title-bg {
    font-size: 1.2rem;
    padding: 0.6rem 1.5rem;
  }
  .animals-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
  }
  .card-content {
    padding: 1rem;
    gap: 0.75rem;
  }
  .animal-name {
    font-size: 0.9rem;
  }
  .animal-examples {
    font-size: 0.75rem;
  }
  .cta-card {
    padding: 1.75rem 1rem;
  }
  .cta-content h4 {
    font-size: 1.2rem;
  }
  .cta-content p {
    font-size: 1rem;
  }
  .trust-title {
    font-size: 2rem;
  }
  .trust-item {
    padding: 25px 20px;
  }
}
</style>