<template>
  <section id="services" class="services">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Наши услуги</h2>
        <p class="section-subtitle">Профессиональный уход для ваших экзотических питомцев</p>
      </div>
      
      <div class="service-grid">
        <div 
          v-for="(service, index) in services" 
          :key="index" 
          class="service-card" 
          :class="{ 'is-flipped': flippedIndex === index }"
          @click="flipCard(index)"
        >
          <div class="card-inner">
            <div class="card-front">
              <div class="image-wrapper">
                <img :src="service.image" :alt="service.title" class="service-image" />
                <div class="overlay"></div>
              </div>
              <div class="card-content">
                <h3 class="service-title">{{ service.title }}</h3>
                <button class="more-btn">
                  <span>Подробнее</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="card-back">
              <div class="back-content">
                <h3 class="back-title">{{ service.title }}</h3>
                <p class="service-description">{{ service.description }}</p>
                <button class="back-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>Назад</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface Service {
  image: string
  title: string
  description: string
}

export default defineComponent({
  name: 'Services',
  setup() {
    const services = ref<Service[]>([
      { image: './assets/img/photo/Consultations.png', title: 'Консультации', description: 'Профессиональные рекомендации по уходу за экзотическими животными.' },
      { image: './assets/img/photo/PrimaryVisit.png', title: 'Первичный приём', description: 'Осмотр, сбор анамнеза, измерение физикальных показателей, назначение диагностики и лечения.' },
      { image: './assets/img/photo/Otoscopy.png', title: 'Отоскопия', description: 'Безболезненный осмотр наружного слухового прохода и барабанной перепонки.' },
      { image: './assets/img/photo/Dispensary.png', title: 'Диспансеризация', description: 'Плановые диагностические мероприятия для выявления заболеваний на ранней стадии.' },
      { image: './assets/img/photo/Vaccination.png', title: 'Вакцинация', description: 'Вакцинация хорьков, кроликов, енотов и других животных с учётом их особенностей.' },
      { image: './assets/img/photo/Inpatient.jpg', title: 'Стационар', description: 'Круглосуточный уход для животных в тяжёлом состоянии или после операций.' },
      { image: './assets/img/photo/Dentistry.png', title: 'Стоматология', description: 'Осмотр ротовой полости, диагностика и лечение (иногда под наркозом).' },
      { image: './assets/img/photo/Dermatology.png', title: 'Дерматология', description: 'Осмотр, диагностика и лечение кожных заболеваний.' },
      { image: './assets/img/photo/Surgery.png', title: 'Хирургия', description: 'Кастрация, стерилизация и другие операции с использованием безопасной анестезии.' },
      { image: './assets/img/photo/Anesthesia.png', title: 'Анестезия', description: 'Контроль жизненно важных функций животного во время операций.' },
      { image: './assets/img/photo/Traumatology.png', title: 'Травматология', description: 'Лечение травм и повреждений.' },
      { image: './assets/img/photo/Analytics.png', title: 'Анализы', description: 'Крови, бакпосевы, мочи, кала для точной диагностики. Цитология.' }
    ])

    const flippedIndex = ref(-1)

    const flipCard = (index: number) => {
      if (flippedIndex.value === index) {
        flippedIndex.value = -1
      } else {
        flippedIndex.value = index
      }
    }

    return { services, flippedIndex, flipCard }
  }
})
</script>

<style scoped>
.services {
  padding: 80px 0;
  background-color: #fdf8f9;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  font-size: 2.5rem;
  color: #a1808f;
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
  font-weight: 600;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: #dfb2ba;
  border-radius: 3px;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #a1808f;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.service-card {
  height: 320px;
  perspective: 1000px;
  position: relative;
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(161, 128, 143, 0.4);
}

.is-flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  overflow: hidden;
}

.card-front {
  display: flex;
  flex-direction: column;
  background: #faf9f9;
}

.image-wrapper {
  position: relative;
  flex: 1;
  overflow: hidden;
}

.service-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(161, 128, 143, 0.2) 0%, rgba(223, 178, 186, 0.1) 100%);
}

.card-content {
  padding: 20px;
  text-align: center;
}

.service-title {
  font-size: 1.3rem;
  color: #a1808f;
  margin-bottom: 15px;
  font-weight: 500;
}

.more-btn {
  background: #dfb2ba;
  color: #fdf8f9;
  border: none;
  padding: 8px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.more-btn:hover {
  background: #a1808f;
}

.more-btn svg {
  transition: transform 0.3s ease;
}

.more-btn:hover svg {
  transform: translateX(3px);
}

.card-back {
  background: linear-gradient(135deg, #dfb2ba 0%, #a1808f 100%);
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
  color: #fdf8f9;
}

.back-content {
  text-align: center;
}

.back-title {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #fdf8f9;
  font-weight: 500;
}

.service-description {
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

.back-btn {
  background: rgba(253, 248, 249, 0.2);
  color: #fdf8f9;
  border: 1px solid #fdf8f9;
  padding: 8px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.back-btn:hover {
  background: rgba(253, 248, 249, 0.3);
}

.back-btn svg {
  transition: transform 0.3s ease;
}

.back-btn:hover svg {
  transform: translateX(-3px);
}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }
  
  .service-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .service-card {
    height: 280px;
  }
}

@media (max-width: 480px) {
  .services {
    padding: 60px 0;
  }
  
  .container {
    padding: 0 16px;
  }
  
  .section-header {
    margin-bottom: 30px;
  }
  
  .card-inner {
    box-shadow: 0 10px 20px rgba(161, 128, 143, 0.3);
  }
}
</style>