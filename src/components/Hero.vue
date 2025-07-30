<template>
  <section class="hero">
    <!-- Анимированные частички -->
    <div class="particles-container">
      <div
        v-for="particle in particles"
        :key="particle.id"
        class="particle"
        :style="{
          left: particle.x + '%',
          top: particle.y + '%',
          width: particle.size + 'px',
          height: particle.size + 'px',
          backgroundColor: particle.color,
          animationDuration: particle.duration + 's',
          animationDelay: particle.delay + 's'
        }"
      ></div>
    </div>
    
    <div class="hero-content">
      <div class="hero-image-wrapper">
        <img src="/assets/img/logo2.gif" alt="ExoVet Clinic" class="hero-image" />
      </div>
      <div class="hero-text">
        <h1>Ветеринарная клиника для экзотических животных</h1>
        <div class="slider" :style="{ height: sliderHeight }" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
          <div v-for="(slide, index) in slides" :key="index" class="slide" :class="{ active: currentSlide === index }">
            <p v-html="slide.text"></p>
          </div>
        </div>
        <div class="pagination">
          <span v-for="(_, index) in slides" :key="index" class="dot" :class="{ active: currentSlide === index }" @click="showSlide(index)"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'

interface Slide {
  text: string
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

export default defineComponent({
  name: 'Hero',
  setup() {
    const currentSlide = ref<number>(0)
    const particles = ref<Particle[]>([])
    const slides: Slide[] = [
      { text: 'Мы заботимся о ваших необычных питомцах с любовью и профессионализмом!' },
      { text: 'Выбирая нас, вы получите профессиональную ветеринарную помощь' },
      { text: 'Часы работы: ежедневно с 10:00-20:00 (по предварительному звонку)' },
      { text: 'ExoVet - это специализированная клиника, которая предоставляет экспертную ветеринарную помощь исключительно экзотическим животным.' },
      { text: 'Записаться на прием: <a href="tel:+79526220616">+7 (952) 622-06-16</a>' }
    ]
    const slideInterval = ref<number | null>(null)
    const touchStartX = ref<number>(0)
    const touchEndX = ref<number>(0)
    const touchThreshold = 50
    const sliderHeight = ref<string>('120px')

    // Создание частичек
    const createParticles = (): void => {
      const colors = [
        'rgba(233, 30, 99, 0.3)',
        'rgba(233, 30, 99, 0.2)',
        'rgba(233, 30, 99, 0.1)',
        'rgba(161, 128, 143, 0.4)',
        'rgba(165, 108, 134, 0.3)',
        'rgba(232, 195, 201, 0.5)',
        'rgba(255, 182, 193, 0.3)',
        'rgba(240, 128, 128, 0.2)',
        'rgba(255, 160, 122, 0.3)',
        'rgba(255, 192, 203, 0.4)',
        'rgba(221, 160, 221, 0.2)',
        'rgba(218, 112, 214, 0.3)',
        'rgba(186, 85, 211, 0.2)',
        'rgba(147, 112, 219, 0.3)',
        'rgba(138, 43, 226, 0.2)',
        'rgba(200, 200, 200, 0.3)',
        'rgba(180, 180, 180, 0.2)',
        'rgba(220, 220, 220, 0.4)',
        'rgba(160, 160, 160, 0.2)',
        'rgba(240, 240, 240, 0.3)'
      ]
      
      particles.value = Array.from({ length: 50 }, (_, index) => ({
        id: index,
        x: Math.random() * 100, // равномерно по всей ширине
        y: Math.random() * 100, // равномерно по всей высоте
        size: Math.random() * 12 + 2, // размер от 2 до 14px - большой разброс
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 20 + 8, // длительность от 8 до 28 секунд
        delay: Math.random() * 10 // задержка до 10 секунд для разнообразия
      }))
    }

    const updateSliderHeight = (): void => {
      const slider = document.querySelector('.slider') as HTMLElement | null
      if (!slider) {
        console.error('Slider element not found')
        return
      }

      const slidesElements = slider.querySelectorAll('.slide') as NodeListOf<HTMLElement>
      if (!slidesElements.length) {
        console.error('No slide elements found')
        return
      }

      let maxHeight = 0
      slidesElements.forEach((slide: HTMLElement) => {
        const originalOpacity = slide.style.opacity
        const originalPosition = slide.style.position
        const originalDisplay = slide.style.display

        slide.style.opacity = '1'
        slide.style.position = 'static'
        slide.style.display = 'block'

        const height = slide.offsetHeight
        if (height > maxHeight) maxHeight = height

        slide.style.opacity = originalOpacity
        slide.style.position = originalPosition || 'absolute'
        slide.style.display = originalDisplay || 'block'
      })

      sliderHeight.value = `${maxHeight + 10}px`
      console.log('Slider height set to:', sliderHeight.value)
    }

    const showSlide = (index: number): void => {
      const newIndex = (index + slides.length) % slides.length
      console.log('Switching to slide:', newIndex, 'Text:', slides[newIndex].text)
      currentSlide.value = newIndex
      if (slideInterval.value) clearInterval(slideInterval.value)
      slideInterval.value = setInterval(nextSlide, 5000)
    }

    const nextSlide = (): void => {
      showSlide(currentSlide.value + 1)
    }

    const prevSlide = (): void => {
      showSlide(currentSlide.value - 1)
    }

    const handleTouchStart = (e: TouchEvent): void => {
      touchStartX.value = e.touches[0].clientX
      console.log('Touch start:', touchStartX.value)
    }

    const handleTouchMove = (e: TouchEvent): void => {
      touchEndX.value = e.touches[0].clientX
    }

    const handleTouchEnd = (): void => {
      const touchDistance = touchStartX.value - touchEndX.value
      console.log('Touch distance:', touchDistance)
      if (Math.abs(touchDistance) > touchThreshold) {
        if (slideInterval.value) clearInterval(slideInterval.value)
        if (touchDistance > 0) {
          nextSlide()
        } else {
          prevSlide()
        }
        slideInterval.value = setInterval(nextSlide, 5000)
      }
    }

    onMounted((): void => {
      createParticles()
      updateSliderHeight()
      slideInterval.value = setInterval(nextSlide, 5000)
      console.log('Component mounted, initial slide:', currentSlide.value, 'Text:', slides[currentSlide.value].text)
    })

    onBeforeUnmount((): void => {
      if (slideInterval.value) clearInterval(slideInterval.value)
    })

    return { 
      currentSlide, 
      slides, 
      particles,
      sliderHeight, 
      showSlide, 
      handleTouchStart, 
      handleTouchMove, 
      handleTouchEnd 
    }
  }
})
</script>

<style scoped>
.hero {
  padding: 50px 20px;
  text-align: center;
  position: relative;
  min-height: 25vh;
  overflow: hidden;
  background-color: #fcf6f8;
}

.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.5;
  animation: gentle-float infinite ease-in-out;
  z-index: 1;
}

@keyframes gentle-float {
  0% {
    transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
    opacity: 0.3;
  }
  20% {
    transform: translateY(-25px) translateX(15px) scale(1.3) rotate(72deg);
    opacity: 0.7;
  }
  40% {
    transform: translateY(-50px) translateX(-10px) scale(0.8) rotate(144deg);
    opacity: 0.9;
  }
  60% {
    transform: translateY(-30px) translateX(25px) scale(1.5) rotate(216deg);
    opacity: 0.6;
  }
  80% {
    transform: translateY(-10px) translateX(-20px) scale(0.9) rotate(288deg);
    opacity: 0.8;
  }
  100% {
    transform: translateY(0px) translateX(0px) scale(1) rotate(360deg);
    opacity: 0.3;
  }
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  z-index: 2;
}

.hero-text h1 {
  font-size: 36px;
  color: var(--primary-color, #e91e63);
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 700;
  letter-spacing: 1px;
}

.hero-image-wrapper {
  width: 350px;
  height: 350px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slider {
  width: 100%;
  height: v-bind(sliderHeight);
  position: relative;
  overflow: hidden;
}

.slide {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: opacity 0.5s ease-in-out;
  pointer-events: none;
}

.slide.active {
  opacity: 1 !important;
  pointer-events: auto;
  z-index: 10;
}

.slide p {
  font-size: 18px;
  color: var(--text-color, #333) !important;
  padding: 15px 25px; 
  line-height: 1.6;
  margin: 0;
}

.slide p a {
  color: var(--text-color, #333);
  text-decoration: none;
  font-weight: 700;
}

.slide p a:hover {
  text-decoration: none;
}

::v-deep(.slide p a[href^="tel"]) {
  color: #a1808f;
  text-decoration: none;
  font-weight: 700;
}

::v-deep(.slide p a[href^="tel"]:hover) {
  color: #a56c86;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(200, 200, 200, 0.6);
  margin: 0 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(160, 160, 160, 0.4);
}

.dot:hover {
  background-color: rgba(160, 160, 160, 0.8);
  transform: scale(1.1);
}

.dot.active {
  background-color: var(--primary-color, #e91e63);
  border-color: var(--primary-color, #e91e63);
  transform: scale(1.2);
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
  .hero {
    padding: 30px 15px;
  }
  
  .hero-text h1 {
    font-size: 28px;
  }
  
  .hero-image-wrapper {
    width: 200px;
    height: 200px;
  }
  
  .slide p {
    font-size: 16px;
    padding: 12px 20px;
  }
  
  .particle {
    opacity: 0.3;
  }
  
  /* Уменьшаем количество частичек на мобильных */
  .particle:nth-child(n+26) {
    display: none;
  }
}
</style>