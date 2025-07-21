<template>
  <section class="hero">
    <div class="hero-content">
      <div class="hero-image-wrapper">
        <img src="/assets/img/rat.gif" alt="ExoVet Clinic" class="hero-image" />
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
      { text: 'Выбирая нас, вы получите профессиональную ветеринарную помощь' },
      { text: 'Часы работы: ежедневно с 10:00-20:00 (по предварительному звонку)' },
      { text: 'ExoVet - это специализированная клиника, которая предоставляет экспертную ветеринарную помощь исключительно экзотическим животным.' },
      { text: 'Записаться на прием: <a href="tel:+79526220616">+7 (952) 622-06-16</a>' }
    ]
    const slideInterval = ref<number | null>(null)
    const touchStartX = ref<number>(0)
    const touchEndX = ref<number>(0)
    const touchThreshold = 50
    const sliderHeight = ref<string>('150px') // Увеличиваем начальную высоту

    // Вычисляем максимальную высоту слайдов
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
        // Сохраняем исходные стили
        const originalOpacity = slide.style.opacity
        const originalPosition = slide.style.position
        const originalDisplay = slide.style.display

        // Устанавливаем стили для измерения
        slide.style.opacity = '1'
        slide.style.position = 'static'
        slide.style.display = 'block'

        const height = slide.offsetHeight
        if (height > maxHeight) maxHeight = height

        // Восстанавливаем исходные стили
        slide.style.opacity = originalOpacity
        slide.style.position = originalPosition || 'absolute'
        slide.style.display = originalDisplay || 'block'
      })

      sliderHeight.value = `${maxHeight + 30}px` // Увеличиваем запас
      console.log('Slider height set to:', sliderHeight.value)
    }

    const showSlide = (index: number): void => {
      const newIndex = (index + slides.length) % slides.length // Вычисляем индекс заранее
      console.log('Switching to slide:', newIndex, 'Text:', slides[newIndex].text) // Логируем после вычисления
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
      updateSliderHeight() // Вычисляем высоту при монтировании
      slideInterval.value = setInterval(nextSlide, 5000)
      console.log('Component mounted, initial slide:', currentSlide.value, 'Text:', slides[currentSlide.value].text)
    })

    onBeforeUnmount((): void => {
      if (slideInterval.value) clearInterval(slideInterval.value)
    })

    return { currentSlide, slides, sliderHeight, showSlide, handleTouchStart, handleTouchMove, handleTouchEnd }
  }
})
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--light-bg) 40%, #F4E4E7 100%);
  padding: 50px 20px;
  text-align: center;
  position: relative;
  background-image: url('/assets/img/summer.png');
  background-size: cover;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 25px;
  padding: 20px;
}

.hero-text h1 {
  font-size: 36px;
  color: var(--primary-color, #e91e63);
  margin-bottom: 20px;
  font-weight: 700;
  letter-spacing: 1px;
}

.hero-image-wrapper {
  width: 250px;
  height: 250px;
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
  padding: 15px 20px;
  background: rgba(232, 195, 201, 0.15);
  border-radius: 10px;
  line-height: 1.5;
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

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dot.active {
  background-color: var(--primary-color, #e91e63);
}
</style>