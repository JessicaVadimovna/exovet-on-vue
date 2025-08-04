<template>
  <div class="gallery-container">
    <!-- Заголовок -->
    <div class="gallery-header">
      <h1 class="gallery-title">
        Галерея наших пациентов
      </h1>
      <p class="gallery-description">
        Знакомьтесь с удивительными экзотическими животными, которых мы лечим и заботимся о них каждый день
      </p>
    </div>

    <!-- Основная карусель -->
    <div class="carousel-container" @mouseenter="pauseAutoPlay" @mouseleave="resumeAutoPlay">
      <div class="carousel-wrapper">
        <div class="slides-container">
          <div 
            v-for="(image, index) in galleryImages"
            :key="image.id"
            class="carousel-slide"
            :class="{ 
              'slide-active': index === currentIndex,
              'slide-next': index === getNextIndex(),
              'slide-prev': index === getPrevIndex()
            }"
            @click="openModal(image)"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              class="carousel-image"
              @error="handleImageError"
            />
            <div class="carousel-overlay"></div>
          </div>
        </div>
      </div>

      <!-- Кнопки навигации -->
      <button
        class="nav-button nav-button-left"
        @click="prevSlide"
        aria-label="Предыдущее изображение"
      >
        ←
      </button>

      <button
        class="nav-button nav-button-right"
        @click="nextSlide"
        aria-label="Следующее изображение"
      >
        →
      </button>

      <!-- Кнопка автовоспроизведения -->
      <button
        class="autoplay-button"
        @click="toggleAutoPlay"
        :aria-label="isAutoPlaying ? 'Остановить автовоспроизведение' : 'Запустить автовоспроизведение'"
      >
        {{ isAutoPlaying ? '⏸' : '▶' }}
      </button>
    </div>

    <!-- Точки навигации -->
    <div class="dots-container">
      <button
        v-for="(image, index) in galleryImages"
        :key="index"
        class="dot"
        :class="{ 'dot-active': index === currentIndex }"
        @click="goToSlide(index)"
        :aria-label="`Перейти к изображению ${index + 1}`"
      ></button>
    </div>

    <!-- Превью полоса -->
    <div class="preview-container">
      <div class="preview-track" ref="previewTrack">
        <div
          v-for="(image, index) in galleryImages"
          :key="image.id"
          class="preview-item"
          :class="{ 'preview-item-active': index === currentIndex }"
          @click="selectImage(index, image)"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="preview-image"
            @error="handleImageError"
          />
          <div class="preview-overlay"></div>
        </div>
      </div>
    </div>

    <!-- Модальное окно -->
    <transition name="modal">
      <div
        v-if="selectedImage"
        class="modal-backdrop"
        @click="closeModal"
      >
        <div class="modal-content" @click.stop>
          <div class="modal-image-container">
            <img
              :src="selectedImage.src"
              :alt="selectedImage.alt"
              class="modal-image"
              @error="handleImageError"
            />
            
            <button
              class="modal-close-button"
              @click="closeModal"
              aria-label="Закрыть модальное окно"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </transition>
        </div>


</template>

<script>
export default {
  name: 'Gallery',
  data() {
    return {
      currentIndex: 0,
      selectedImage: null,
      isAutoPlaying: true,
      autoPlayInterval: null,
      galleryImages: [
        {
          id: 1,
          src: './assets/img/photo/pet1.jpg',
          alt: 'Пациент 1',
          title: 'Экзотический пациент 1',
          description: 'Удивительное животное на профилактическом осмотре'
        },
        {
          id: 2,
          src: './assets/img/photo/pet2.jpg',
          alt: 'Пациент 2',
          title: 'Экзотический пациент 2',
          description: 'Красивое животное получает необходимую медицинскую помощь'
        },
        {
          id: 3,
          src: './assets/img/photo/pet3.jpg',
          alt: 'Пациент 3',
          title: 'Экзотический пациент 3',
          description: 'Заботливый уход за необычным питомцем'
        },
        {
          id: 4,
          src: './assets/img/photo/pet4.jpg',
          alt: 'Пациент 4',
          title: 'Экзотический пациент 4',
          description: 'Профессиональное лечение экзотических животных'
        },
        {
          id: 5,
          src: './assets/img/photo/pet5.jpg',
          alt: 'Пациент 5',
          title: 'Экзотический пациент 5',
          description: 'Индивидуальный подход к каждому пациенту'
        },
        {
          id: 6,
          src: './assets/img/photo/pet6.png',
          alt: 'Пациент 6',
          title: 'Экзотический пациент 6',
          description: 'Современные методы диагностики и лечения'
        },
        {
          id: 7,
          src: './assets/img/photo/pet7.png',
          alt: 'Пациент 7',
          title: 'Экзотический пациент 7',
          description: 'Деликатный подход к лечению'
        },
        {
          id: 8,
          src: './assets/img/photo/pet8.png',
          alt: 'Пациент 8',
          title: 'Экзотический пациент 8',
          description: 'Здоровье и благополучие наших пациентов'
        },
        {
          id: 9,
          src: './assets/img/photo/pet9.png',
          alt: 'Пациент 9',
          title: 'Экзотический пациент 9',
          description: 'Специализированная ветеринарная помощь'
        },
        {
          id: 10,
          src: './assets/img/photo/pet10.png',
          alt: 'Пациент 10',
          title: 'Экзотический пациент 10',
          description: 'Профилактические осмотры и лечение'
        },
        {
          id: 11,
          src: './assets/img/photo/pet11.png',
          alt: 'Пациент 11',
          title: 'Экзотический пациент 11',
          description: 'Комплексный уход за экзотическими животными'
        },
        {
          id: 12,
          src: './assets/img/photo/pet12.png',
          alt: 'Пациент 12',
          title: 'Экзотический пациент 12',
          description: 'Опытные ветеринары для особых пациентов'
        },
        {
          id: 13,
          src: './assets/img/photo/pet13.png',
          alt: 'Пациент 13',
          title: 'Экзотический пациент 13',
          description: 'Качественная медицинская помощь'
        },
        {
          id: 14,
          src: './assets/img/photo/pet14.png',
          alt: 'Пациент 14',
          title: 'Экзотический пациент 14',
          description: 'Забота о редких и необычных животных'
        },
        {
          id: 15,
          src: './assets/img/photo/pet15.png',
          alt: 'Пациент 15',
          title: 'Экзотический пациент 15',
          description: 'Персональный подход к лечению'
        },
        {
          id: 16,
          src: './assets/img/photo/pet16.png',
          alt: 'Пациент 16',
          title: 'Экзотический пациент 16',
          description: 'Современное оборудование для диагностики'
        },
        {
          id: 17,
          src: './assets/img/photo/pet17.png',
          alt: 'Пациент 17',
          title: 'Экзотический пациент 17',
          description: 'Безопасное и эффективное лечение'
        },
        {
          id: 18,
          src: './assets/img/photo/pet18.png',
          alt: 'Пациент 18',
          title: 'Экзотический пациент 18',
          description: 'Реабилитация и восстановление'
        },
        {
          id: 19,
          src: './assets/img/photo/pet19.png',
          alt: 'Пациент 19',
          title: 'Экзотический пациент 19',
          description: 'Профессиональная ветеринарная клиника'
        },
        {
          id: 20,
          src: './assets/img/photo/pet20.png',
          alt: 'Пациент 20',
          title: 'Экзотический пациент 20',
          description: 'Любовь и забота о каждом животном'
        },
        {
          id: 21,
          src: './assets/img/photo/pet21.png',
          alt: 'Пациент 21',
          title: 'Экзотический пациент 21',
          description: 'Экспертиза в области экзотических животных'
        },
        {
          id: 22,
          src: './assets/img/photo/pet22.png',
          alt: 'Пациент 22',
          title: 'Экзотический пациент 22',
          description: 'Комфортная атмосфера для пациентов'
        },
        {
          id: 23,
          src: './assets/img/photo/pet23.png',
          alt: 'Пациент 23',
          title: 'Экзотический пациент 23',
          description: 'Новейшие методы лечения'
        },
        {
          id: 24,
          src: './assets/img/photo/pet24.png',
          alt: 'Пациент 24',
          title: 'Экзотический пациент 24',
          description: 'Здоровье превыше всего'
        },
        {
          id: 25,
          src: './assets/img/photo/pet25.png',
          alt: 'Пациент 25',
          title: 'Экзотический пациент 25',
          description: 'Доверие наших клиентов и их питомцев'
        }
      ]
    }
  },
  mounted() {
    this.startAutoPlay()
    this.$nextTick(() => {
      this.updatePreviewPosition()
    })
  },
  watch: {
    currentIndex() {
      this.updatePreviewPosition()
    }
  },
  beforeUnmount() {
    this.stopAutoPlay()
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.galleryImages.length
    },
    prevSlide() {
      this.currentIndex = this.currentIndex === 0 
        ? this.galleryImages.length - 1 
        : this.currentIndex - 1
    },
    getNextIndex() {
      return (this.currentIndex + 1) % this.galleryImages.length
    },
    getPrevIndex() {
      return this.currentIndex === 0 
        ? this.galleryImages.length - 1 
        : this.currentIndex - 1
    },
    updatePreviewPosition() {
      if (this.$refs.previewTrack) {
        const itemWidth = 120 + 16 // ширина + gap
        const containerWidth = this.$refs.previewTrack.parentElement.clientWidth
        const trackWidth = this.galleryImages.length * itemWidth
        const maxOffset = Math.max(0, trackWidth - containerWidth)
        
        let offset = (this.currentIndex * itemWidth) - (containerWidth / 2) + (itemWidth / 2)
        offset = Math.max(0, Math.min(offset, maxOffset))
        
        this.$refs.previewTrack.style.transform = `translateX(-${offset}px)`
      }
    },
    goToSlide(index) {
      this.currentIndex = index
    },
    selectImage(index, image) {
      this.goToSlide(index)
      this.openModal(image)
    },
    openModal(image) {
      this.selectedImage = image
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      this.selectedImage = null
      document.body.style.overflow = 'auto'
    },
    toggleAutoPlay() {
      this.isAutoPlaying = !this.isAutoPlaying
      if (this.isAutoPlaying) {
        this.startAutoPlay()
      } else {
        this.stopAutoPlay()
      }
    },
    startAutoPlay() {
      if (this.isAutoPlaying) {
        this.autoPlayInterval = setInterval(() => {
          this.nextSlide()
        }, 4000)
      }
    },
    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval)
        this.autoPlayInterval = null
      }
    },
    pauseAutoPlay() {
      this.stopAutoPlay()
    },
    resumeAutoPlay() {
      if (this.isAutoPlaying) {
        this.startAutoPlay()
      }
    },
    handleImageError(event) {
      console.warn('Не удалось загрузить изображение:', event.target.src)
      // Можно добавить изображение-заглушку
      // event.target.src = '/path/to/fallback-image.jpg'
    }
  }
}
</script>

<style scoped>
.gallery-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.gallery-header {
  text-align: center;
  margin-bottom: 2rem;
}

.gallery-title {
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
  background: linear-gradient(to right, #ec4899, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
}

.gallery-description {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 32rem;
  margin: 0 auto;
  line-height: 1.6;
}

.carousel-container {
  position: relative;
  margin-bottom: 2rem;
}

.carousel-wrapper {
  position: relative;
  height: clamp(300px, 50vh, 600px);
  overflow: hidden;
  border-radius: 1rem;
  background: linear-gradient(135deg, #fdf2f8, #ffffff, #fef7ed);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.slides-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-slide {
  position: absolute;
  inset: 0;
  cursor: pointer;
  opacity: 0;
  transform: translateX(100%) scale(0.8);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 1;
}

.slide-active {
  opacity: 1;
  transform: translateX(0) scale(1);
  z-index: 3;
}

.slide-next {
  opacity: 0.3;
  transform: translateX(50%) scale(0.9);
  z-index: 2;
}

.slide-prev {
  opacity: 0.3;
  transform: translateX(-50%) scale(0.9);
  z-index: 2;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: linear-gradient(135deg, #fdf2f8, #ffffff, #fef7ed);
}

.carousel-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.1), transparent);
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ec4899;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.15);
  z-index: 10;
  backdrop-filter: blur(10px);
}

.carousel-container:hover .nav-button {
  opacity: 1;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 12px 35px -5px rgba(236, 72, 153, 0.3);
}

.nav-button-left {
  left: 1.5rem;
}

.nav-button-right {
  right: 1.5rem;
}

.autoplay-button {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #ec4899;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.15);
  z-index: 10;
  backdrop-filter: blur(10px);
}

.carousel-container:hover .autoplay-button {
  opacity: 1;
}

.autoplay-button:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
  box-shadow: 0 12px 35px -5px rgba(236, 72, 153, 0.3);
}

.dots-container {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: #fce7f3;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot:hover {
  background: #f9a8d4;
}

.dot-active {
  background: #ec4899;
  width: 32px;
  border-radius: 6px;
}

.preview-container {
  margin-top: 2rem;
  overflow: hidden;
  padding: 0 1rem;
}

.preview-track {
  display: flex;
  gap: 1rem;
  transition: transform 0.5s ease;
  padding: 0.5rem 0;
}

.preview-item {
  flex-shrink: 0;
  width: 120px;
  height: 80px;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.preview-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.2);
}

.preview-item-active {
  border-color: #ec4899;
  transform: translateY(-4px);
  box-shadow: 0 8px 25px -5px rgba(236, 72, 153, 0.3);
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.preview-item:hover .preview-image {
  transform: scale(1.1);
}

.preview-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent, rgba(236, 72, 153, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.preview-item-active .preview-overlay,
.preview-item:hover .preview-overlay {
  opacity: 1;
}




@media (max-width: 768px) {
  .preview-item {
    width: 100px;
    height: 67px;
  }
  
  .nav-button {
    width: 48px;
    height: 48px;
    font-size: 1.25rem;
  }
  
  .nav-button-left {
    left: 1rem;
  }
  
  .nav-button-right {
    right: 1rem;
  }
  
  .autoplay-button {
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
  }
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-content {
  position: relative;
  max-width: 64rem;
  max-height: 90vh;
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-image-container {
  position: relative;
}

.modal-image {
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
  background: linear-gradient(135deg, #f8fafc, #ffffff);
}

.modal-close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 0.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #374151;
  cursor: pointer;
  transition: background 0.3s ease;
}

.modal-close-button:hover {
  background: rgba(255, 255, 255, 0.9);
}

/* Анимации */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.8);
}
</style>