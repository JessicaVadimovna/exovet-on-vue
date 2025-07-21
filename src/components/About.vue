<template>
  <section id="about" class="about">
    <div class="container">

      <div class="exovet-container">

        <div class="trust-section">
          <h3 class="trust-title">О нас</h3>
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

export default defineComponent({
  name: 'AboutExovet',
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

    return { trustItems }
  }
})
</script>

<style scoped>
:root {
  --light-bg: #fff5f5;
  --white: #fff9f9;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
  --peach-primary: #ffb7b7;
  --peach-secondary: #ffd3b6;
  --pink-accent: #ff9aa2;
  --pink-muted: #d8a1c4;
  --pink-light: #ffdfd3;
  --trust-gradient-start: #ffb7b7;
  --trust-gradient-end: #ff9aa2;
  --text-color: #5a4a4a;
}

.about {
  padding: 60px 20px;
  background: linear-gradient(135deg, var(--light-bg) 40%, #ffecec 100%);
  text-align: center;
  position: relative;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 5rem;
  position: relative;
  opacity: 0;
  animation: fadeInUp 1s ease-out forwards;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, var(--peach-primary), var(--pink-accent));
  border-radius: 2px;
}

.exovet-container {
  margin-bottom: 4rem;
  position: relative;
}

.exovet-container::before {
  content: '';
  position: absolute;
  top: -60px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 154, 162, 0.5), transparent);
}

.intro-card {
  background: var(--white);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 3rem;
  box-shadow: var(--shadow-md);
  border-left: 4px solid var(--peach-primary);
  opacity: 0;
  animation: fadeInUp 1s ease-out 0.3s forwards;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
}

.exovet-description {
  font-size: 1.2rem;
  color: var(--text-color);
  line-height: 1.7;
  margin: 0;
  font-weight: 500;
}

.trust-section {
  margin-top: 120px;
  position: relative;
}

.trust-section::before {
  content: '';
  position: absolute;
  top: -60px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 154, 162, 0.5), transparent);
}

.trust-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 70px;
  position: relative;
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
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 154, 162, 0.05);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
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
  box-shadow: 0 15px 30px rgba(255, 154, 162, 0.1);
  background: rgba(255, 255, 255, 0.95);
}

.trust-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, rgba(255, 223, 211, 0.8), rgba(255, 182, 182, 0.6));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--pink-accent);
}

.trust-icon svg {
  width: 30px;
  height: 30px;
  fill: var(--pink-accent);
}

.trust-item-title {
  font-size: 1.3rem;
  color: var(--text-color);
  margin-bottom: 15px;
}

.trust-item-text {
  font-size: 0.95rem;
  color: var(--text-color);
  line-height: 1.6;
  opacity: 0.9;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 992px) {
  .trust-indicators {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .about {
    padding: 40px 15px;
  }

  .section-title {
    font-size: 2.2rem;
  }

  .intro-card {
    padding: 2rem;
  }

  .exovet-description {
    font-size: 1.1rem;
  }

  .trust-indicators {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .trust-item {
    padding: 30px 25px;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 2rem;
  }

  .trust-item {
    padding: 25px 20px;
  }
}
</style>