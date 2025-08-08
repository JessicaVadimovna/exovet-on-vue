<template>
  <div class="gallery-container">
    <!-- Заголовок -->
    <div class="gallery-header">
      <h1 class="gallery-title">
        Наши экзотические пациенты <img src="/public/assets/img/heart (2).png" alt="">
      </h1>
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
          </div>
        </div>
      </div>
      
      <!-- Кнопки навигации -->
      <button
        class="nav-button nav-button-left"
        @click="prevSlide"
        aria-label="Предыдущее изображение"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button
        class="nav-button nav-button-right"
        @click="nextSlide"
        aria-label="Следующее изображение"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
      
      <!-- Индикаторы -->
      <div class="indicators">
        <button
          v-for="(image, index) in galleryImages.slice(0, 8)"
          :key="'indicator-'+image.id"
          class="indicator"
          :class="{ 'active': index === currentIndex % 8 }"
          @click="goToSlide(index + Math.floor(currentIndex / 8) * 8)"
        ></button>
      </div>
    </div>
    
    <!-- Миниатюры -->
    <div class="thumbnails-container" ref="thumbnailsContainer">
      <div class="thumbnails-track" :style="{ transform: `translateX(-${thumbnailOffset}px)` }">
        <!-- Дублируем изображения для циклической прокрутки -->
        <div 
          v-for="(image, index) in cyclicThumbnails"
          :key="'thumb-'+image.originalIndex+'-'+image.cycleIndex"
          class="thumbnail"
          :class="{ 'active': image.originalIndex === currentIndex }"
          @click="goToSlide(image.originalIndex)"
        >
          <img :src="image.src" :alt="image.alt" />
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
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
      thumbnailOffset: 0,
      thumbnailWidth: 100,
      thumbnailGap: 12,
      galleryImages: [
        { id: 1, src: './assets/img/photo/pet1.jpg', alt: 'Пациент 1' },
        { id: 2, src: './assets/img/photo/pet2.jpg', alt: 'Пациент 2' },
        { id: 3, src: './assets/img/photo/pet3.jpg', alt: 'Пациент 3' },
        { id: 4, src: './assets/img/photo/pet4.jpg', alt: 'Пациент 4' },
        { id: 5, src: './assets/img/photo/pet5.jpg', alt: 'Пациент 5' },
        { id: 6, src: './assets/img/photo/pet6.png', alt: 'Пациент 6' },
        { id: 7, src: './assets/img/photo/pet7.png', alt: 'Пациент 7' },
        { id: 8, src: './assets/img/photo/pet8.png', alt: 'Пациент 8' },
        { id: 9, src: './assets/img/photo/pet9.png', alt: 'Пациент 9' },
        { id: 10, src: './assets/img/photo/pet10.png', alt: 'Пациент 10' },
        { id: 11, src: './assets/img/photo/pet11.png', alt: 'Пациент 11' },
        { id: 12, src: './assets/img/photo/pet12.png', alt: 'Пациент 12' },
        { id: 13, src: './assets/img/photo/pet13.png', alt: 'Пациент 13' },
        { id: 14, src: './assets/img/photo/pet14.png', alt: 'Пациент 14' },
        { id: 15, src: './assets/img/photo/pet15.png', alt: 'Пациент 15' },
        { id: 16, src: './assets/img/photo/pet16.png', alt: 'Пациент 16' },
        { id: 17, src: './assets/img/photo/pet17.png', alt: 'Пациент 17' },
        { id: 18, src: './assets/img/photo/pet18.png', alt: 'Пациент 18' },
        { id: 19, src: './assets/img/photo/pet19.png', alt: 'Пациент 19' },
        { id: 20, src: './assets/img/photo/pet20.png', alt: 'Пациент 20' },
        { id: 21, src: './assets/img/photo/pet21.png', alt: 'Пациент 21' },
        { id: 22, src: './assets/img/photo/pet22.png', alt: 'Пациент 22' },
        { id: 23, src: './assets/img/photo/pet23.png', alt: 'Пациент 23' },
        { id: 24, src: './assets/img/photo/pet24.png', alt: 'Пациент 24' },
        { id: 25, src: './assets/img/photo/pet25.png', alt: 'Пациент 25' }
      ]
    }
  },
  computed: {
    cyclicThumbnails() {
      // Создаем циклический массив превью для бесконечной прокрутки
      const result = [];
      const totalImages = this.galleryImages.length;
      
      // Добавляем 3 копии массива для обеспечения плавной циклической прокрутки
      for (let cycle = 0; cycle < 3; cycle++) {
        this.galleryImages.forEach((image, index) => {
          result.push({
            ...image,
            originalIndex: index,
            cycleIndex: cycle
          });
        });
      }
      
      return result;
    }
  },
  mounted() {
    this.startAutoPlay();
    window.addEventListener('resize', this.updateThumbnailOffset);
    this.$nextTick(() => {
      this.updateThumbnailOffset();
    });
  },
  beforeUnmount() {
    this.stopAutoPlay();
    window.removeEventListener('resize', this.updateThumbnailOffset);
  },
  watch: {
    currentIndex(newVal) {
      this.updateThumbnailOffset();
    }
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.galleryImages.length;
    },
    prevSlide() {
      this.currentIndex = this.currentIndex === 0 
        ? this.galleryImages.length - 1 
        : this.currentIndex - 1;
    },
    getNextIndex() {
      return (this.currentIndex + 1) % this.galleryImages.length;
    },
    getPrevIndex() {
      return this.currentIndex === 0 
        ? this.galleryImages.length - 1 
        : this.currentIndex - 1;
    },
    goToSlide(index) {
      if (index >= 0 && index < this.galleryImages.length) {
        this.currentIndex = index;
      }
    },
    openModal(image) {
      this.selectedImage = image;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.selectedImage = null;
      document.body.style.overflow = 'auto';
    },
    startAutoPlay() {
      if (this.isAutoPlaying) {
        this.autoPlayInterval = setInterval(() => {
          this.nextSlide();
        }, 5000);
      }
    },
    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    },
    pauseAutoPlay() {
      this.stopAutoPlay();
    },
    resumeAutoPlay() {
      if (this.isAutoPlaying) {
        this.startAutoPlay();
      }
    },
    handleImageError(event) {
      console.warn('Не удалось загрузить изображение:', event.target.src);
      event.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect fill="%23f3f4f6" width="800" height="600"/%3E%3Ctext fill="%239ca3af" font-family="Arial" font-size="40" dy=".5em" text-anchor="middle" x="400" y="300"%3EИзображение не загружено%3C/text%3E%3C/svg%3E';
    },
    updateThumbnailOffset() {
      const container = this.$refs.thumbnailsContainer;
      if (!container) return;
      
      const containerWidth = container.offsetWidth;
      const itemWidth = this.thumbnailWidth + this.thumbnailGap;
      const visibleItems = Math.floor(containerWidth / itemWidth);
      const totalImages = this.galleryImages.length;
      
      // Вычисляем позицию для центрирования текущего элемента
      // Используем средний цикл (индекс 1) для расчета позиции
      const middleCycleStartIndex = totalImages;
      const targetIndex = middleCycleStartIndex + this.currentIndex;
      const centerOffset = Math.floor(visibleItems / 2) * itemWidth;
      
      let newOffset = targetIndex * itemWidth - centerOffset;
      
      // Ограничиваем смещение, чтобы не выходить за границы
      const maxOffset = (this.cyclicThumbnails.length - visibleItems) * itemWidth;
      newOffset = Math.max(0, Math.min(newOffset, maxOffset));
      
      this.thumbnailOffset = newOffset;
    }
  }
}
</script>

<style scoped>
.gallery-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
}

.gallery-header {
  text-align: center;
  margin-bottom: 2rem;
}

.gallery-title {
  font-size: 2.5rem;
  margin-bottom: 0;
  background-clip: text;
  font-weight: 700;
  color: #a1808f;
}

.gallery-title img {
  width: 52px;
  height: 52px;
  display: inline-flex;
  vertical-align: bottom;
}

.gallery-title img:hover {
  transform: scale(1.1);
  transition: transform 0.5s ease;
}

.carousel-container {
  position: relative;
  margin-bottom: 1rem;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.carousel-wrapper {
  position: relative;
  height: 500px;
  overflow: hidden;
  background: #f3f4f6;
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
  transform: translateX(100%) scale(0.9);
  transition: all 0.6s ease;
  z-index: 1;
}

.slide-active {
  opacity: 1;
  transform: translateX(0) scale(1);
  z-index: 3;
}

.slide-next {
  opacity: 0.4;
  transform: translateX(30%) scale(0.95);
  z-index: 2;
}

.slide-prev {
  opacity: 0.4;
  transform: translateX(-30%) scale(0.95);
  z-index: 2;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dfb2ba;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.carousel-container:hover .nav-button {
  opacity: 1;
}

.nav-button:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
  color: #ec4899;
}

.nav-button svg {
  width: 24px;
  height: 24px;
}

.nav-button-left {
  left: 1.5rem;
}

.nav-button-right {
  right: 1.5rem;
}

.indicators {
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  z-index: 10;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.8);
}

.indicator.active {
  background: white;
  transform: scale(1.2);
}

.thumbnails-container {
  width: 100%;
  overflow: hidden;
  margin-top: 0.5rem;
  padding: 0.5rem 0;
}

.thumbnails-track {
  display: flex;
  gap: 0.75rem;
  transition: transform 0.4s ease;
}

.thumbnail {
  width: 100px;
  height: 70px;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.thumbnail:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.thumbnail.active {
  border-color: #dfb2ba;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-image {
  max-width: 100%;
  max-height: 100vh; 
  width: auto;
  height: auto;
  object-fit: contain; 
  display: block;
  margin: 0 auto; 
}

.modal-close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 0.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111827;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-close-button:hover {
  background: white;
  transform: rotate(90deg);
}

.modal-close-button svg {
  width: 20px;
  height: 20px;
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
  transition: all 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95);
  opacity: 0;
}

@media (max-width: 768px) {
  .gallery-title {
    font-size: 2rem;
  }
  
  .carousel-wrapper {
    height: 350px;
  }
  
  .nav-button {
    width: 40px;
    height: 40px;
  }
  
  .thumbnail {
    width: 80px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .gallery-title {
    font-size: 1.75rem;
  }
  
  .carousel-wrapper {
    height: 250px;
  }
  
  .nav-button {
    width: 36px;
    height: 36px;
  }
  
  .nav-button-left {
    left: 0.75rem;
  }
  
  .nav-button-right {
    right: 0.75rem;
  }
  
  .thumbnail {
    width: 70px;
    height: 50px;
  }
}
/* Заголовок */
.gallery-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #a86d86;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.gallery-title img {
  width: 48px;
  height: 48px;
  transition: transform 0.3s ease;
}

.gallery-title img:hover {
  transform: scale(1.15);
}

/* Слайды */
.carousel-slide {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.slide-active {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.slide-next {
  opacity: 0.6;
  transform: translateX(20%) scale(0.97);
}

.slide-prev {
  opacity: 0.6;
  transform: translateX(-20%) scale(0.97);
}

/* Кнопки навигации */
.nav-button {
  background: rgba(255, 255, 255, 0.9);
  transition: transform 0.2s ease, background 0.3s ease;
}

.nav-button:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
}

/* Индикаторы */
.indicator {
  transition: background 0.3s ease, transform 0.3s ease;
}

.indicator.active {
  background: #f3b2c5;
  transform: scale(1.2);
}

/* Миниатюры */
.thumbnail {
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.thumbnail:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.thumbnail.active {
  border-color: #f3b2c5;
  transform: scale(1.05);
}

/* Модалка */
.modal-backdrop {
  animation: fadeIn 0.3s ease forwards;
}

.modal-content {
  animation: scaleIn 0.3s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

</style>