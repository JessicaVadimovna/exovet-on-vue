<template>
  <section class="hero">
    
    <div class="hero-content">
      <div class="hero-image-wrapper">
        <img src="/assets/img/logo2.gif" alt="ExoVet Clinic" class="hero-image" draggable="false" />
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

export default defineComponent({
  name: 'Hero',
  setup() {
    const currentSlide = ref<number>(0)
    const slides: Slide[] = [
      { text: 'Мы заботимся о ваших необычных питомцах с любовью и профессионализмом!' },
      { text: 'Часы работы: ежедневно с 10:00-20:00 (по предварительному звонку)' },
      { text: 'Мы используем только современные методы диагностики и лечения' },
      { text: 'Мы заботимся о здоровье и благополучии ваших питомцев' },
      { text: 'Мы готовы ответить на все ваши вопросы и помочь в любой ситуации' },
      { text: 'Мы предлагаем индивидуальный подход к каждому питомцу' },
      { text: 'Мы рады видеть вас и ваших питомцев в нашей клинике!' },
      { text: 'Записаться на прием: <a href="tel:+79526220616">+7 (952) 622-06-16</a>' }
    ]
    const slideInterval = ref<number | null>(null)
    const touchStartX = ref<number>(0)
    const touchEndX = ref<number>(0)
    const touchThreshold = 50
    const sliderHeight = ref<string>('120px')

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

onMounted(() => {
  updateSliderHeight()
  window.addEventListener('resize', updateSliderHeight) // ← добавляем
  slideInterval.value = setInterval(nextSlide, 5000)
})

onBeforeUnmount(() => {
  if (slideInterval.value) clearInterval(slideInterval.value)
  window.removeEventListener('resize', updateSliderHeight) // ← чистим
})

    return { 
      currentSlide, 
      slides,
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
}
</style>