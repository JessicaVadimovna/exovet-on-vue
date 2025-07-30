<template>
  <section id="gallery" class="gallery">
    <div class="container">
      <div class="gallery-header">
        <h1 class="gallery-title">
          Наши пациенты 
          <span class="heart-icon"><img src="/public/assets/img/emoji-heart.png" alt=""></span>
        </h1>
      </div>

      <div class="slider-wrapper">
        <div class="slider" ref="sliderRef">
          <div class="slider-track" :class="{ paused: isPaused }">
            <div 
              v-for="(item, index) in duplicatedImages"
              :key="index"
              class="slide-item"
              @click="openModal(item.src, item.alt, index)"
              @mouseenter="pauseSlider"
              @mouseleave="resumeSlider"
            >
              <div class="image-wrapper">
                <img
                  :src="item.src"
                  :alt="item.alt"
                  class="gallery-image"
                  loading="lazy"
                />
                <div class="overlay">
                  <div class="overlay-content">
                    <span class="view-icon">👁</span>
                    <span class="view-text">Посмотреть</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="pagination">
          <button
            v-for="n in pageCount"
            :key="n"
            class="pagination-dot"
            :class="{ active: currentPage === n - 1 }"
            @click="goToPage(n - 1)"
            :aria-label="`Go to page ${n}`"
          ></button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Transition name="modal">
      <div 
        v-if="isModalOpen" 
        class="modal-backdrop" 
        @click="closeModal"
        @keydown.esc="closeModal"
        @keydown.left="prevModalImage"
        @keydown.right="nextModalImage"
        tabindex="0" 
        ref="modalRef"
      >
        <div class="modal-container" @click.stop>
          <button class="modal-close" @click="closeModal" aria-label="Close">
            ✕
          </button>
          
          <button 
            class="modal-nav prev" 
            @click="prevModalImage"
            aria-label="Previous image"
          >
            ‹
          </button>
          
          <div class="modal-content">
            <img 
              :src="modalImageSrc" 
              :alt="modalAlt" 
              class="modal-image"
            />
            <div class="modal-info">
              <h3>{{ modalAlt }}</h3>
              <span class="modal-counter">
                {{ currentIndex + 1 }} из {{ images.length }}
              </span>
            </div>
          </div>
          
          <button 
            class="modal-nav next" 
            @click="nextModalImage"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'

export default defineComponent({
  name: 'ModernGallery',
  setup() {
    const images = ref([
      { src: './assets/img/photo/pet1.jpg', alt: 'Пациент 1' },
      { src: './assets/img/photo/pet2.jpg', alt: 'Пациент 2' },
      { src: './assets/img/photo/pet3.jpg', alt: 'Пациент 3' },
      { src: './assets/img/photo/pet4.jpg', alt: 'Пациент 4' },
      { src: './assets/img/photo/pet5.jpg', alt: 'Пациент 5' },
      { src: './assets/img/photo/pet6.png', alt: 'Пациент 6' },
      { src: './assets/img/photo/pet7.png', alt: 'Пациент 7' },
      { src: './assets/img/photo/pet8.png', alt: 'Пациент 8' },
      { src: './assets/img/photo/pet9.png', alt: 'Пациент 9' },
      { src: './assets/img/photo/pet10.png', alt: 'Пациент 10' },
      { src: './assets/img/photo/pet11.png', alt: 'Пациент 11' },
      { src: './assets/img/photo/pet12.png', alt: 'Пациент 12' },
      { src: './assets/img/photo/pet13.png', alt: 'Пациент 13' },
      { src: './assets/img/photo/pet14.png', alt: 'Пациент 14' },
      { src: './assets/img/photo/pet15.png', alt: 'Пациент 15' },
      { src: './assets/img/photo/pet16.png', alt: 'Пациент 16' },
      { src: './assets/img/photo/pet17.png', alt: 'Пациент 17' },
      { src: './assets/img/photo/pet18.png', alt: 'Пациент 18' },
      { src: './assets/img/photo/pet19.png', alt: 'Пациент 19' },
      { src: './assets/img/photo/pet20.png', alt: 'Пациент 20' },
      { src: './assets/img/photo/pet21.png', alt: 'Пациент 21' },
      { src: './assets/img/photo/pet22.png', alt: 'Пациент 22' },
      { src: './assets/img/photo/pet23.png', alt: 'Пациент 23' },
      { src: './assets/img/photo/pet24.png', alt: 'Пациент 24' },
      { src: './assets/img/photo/pet25.png', alt: 'Пациент 25' },
    ])

    const duplicatedImages = computed(() => [...images.value, ...images.value])
    const isPaused = ref(false)
    const isModalOpen = ref(false)
    const modalImageSrc = ref('')
    const modalAlt = ref('')
    const currentIndex = ref(0)
    const modalRef = ref<HTMLElement | null>(null)
    const sliderRef = ref<HTMLElement | null>(null)
    const currentPage = ref(0)
    const itemsPerPage = ref(4) // Number of images per page, adjustable based on screen size

    const pageCount = computed(() => Math.ceil(images.value.length / itemsPerPage.value))

    // Calculate items per page based on screen width
    const updateItemsPerPage = () => {
      const width = window.innerWidth
      if (width <= 480) {
        itemsPerPage.value = 2
      } else if (width <= 768) {
        itemsPerPage.value = 3
      } else {
        itemsPerPage.value = 4
      }
    }

    const openModal = (src: string, alt: string, index: number) => {
      modalImageSrc.value = src
      modalAlt.value = alt
      currentIndex.value = index % images.value.length
      isModalOpen.value = true
      document.body.style.overflow = 'hidden'
      nextTick(() => {
        modalRef.value?.focus()
      })
    }

    const closeModal = () => {
      isModalOpen.value = false
      document.body.style.overflow = 'auto'
    }

    const prevModalImage = () => {
      currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length
      modalImageSrc.value = images.value[currentIndex.value].src
      modalAlt.value = images.value[currentIndex.value].alt
    }

    const nextModalImage = () => {
      currentIndex.value = (currentIndex.value + 1) % images.value.length
      modalImageSrc.value = images.value[currentIndex.value].src
      modalAlt.value = images.value[currentIndex.value].alt
    }

    const pauseSlider = () => {
      isPaused.value = true
    }

    const resumeSlider = () => {
      isPaused.value = false
    }

    const goToPage = (page: number) => {
      currentPage.value = Math.max(0, Math.min(page, pageCount.value - 1))
      if (sliderRef.value) {
        const slideWidth = sliderRef.value.querySelector('.slide-item')?.getBoundingClientRect().width || 320
        sliderRef.value.scrollTo({
          left: currentPage.value * slideWidth * itemsPerPage.value,
          behavior: 'smooth'
        })
      }
    }

    // Update current page based on scroll position
    const updateCurrentPage = () => {
      if (sliderRef.value) {
        const slideWidth = sliderRef.value.querySelector('.slide-item')?.getBoundingClientRect().width || 320
        const scrollLeft = sliderRef.value.scrollLeft
        const newPage = Math.floor(scrollLeft / (slideWidth * itemsPerPage.value))
        currentPage.value = Math.max(0, Math.min(newPage, pageCount.value - 1))
      }
    }

    // Watch for scroll changes
    watch(() => sliderRef.value?.scrollLeft, () => {
      updateCurrentPage()
    })

    // Update items per page on resize
    onMounted(() => {
      updateItemsPerPage()
      window.addEventListener('resize', updateItemsPerPage)
      document.addEventListener('keydown', handleKeyDown)
      sliderRef.value?.addEventListener('scroll', updateCurrentPage)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateItemsPerPage)
      document.removeEventListener('keydown', handleKeyDown)
      sliderRef.value?.removeEventListener('scroll', updateCurrentPage)
    })

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen.value) {
        switch (e.key) {
          case 'Escape':
            closeModal()
            break
          case 'ArrowLeft':
            prevModalImage()
            break
          case 'ArrowRight':
            nextModalImage()
            break
        }
      }
    }

    return {
      images,
      duplicatedImages,
      isPaused,
      isModalOpen,
      modalImageSrc,
      modalAlt,
      currentIndex,
      modalRef,
      sliderRef,
      currentPage,
      pageCount,
      openModal,
      closeModal,
      prevModalImage,
      nextModalImage,
      pauseSlider,
      resumeSlider,
      goToPage,
    }
  }
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.gallery {
  padding: 80px 0;
  min-height: 50vh;
  position: relative;
  overflow: hidden;
}

.gallery::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255,255,255,0.15) 0%, rgba(248,235,237,0.1) 50%, transparent 100%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;

    background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 25px;
  padding: 20px;
}

.gallery-header {
  text-align: center;
  margin-bottom: 60px;
  animation: fadeInUp 0.8s ease-out;
}

.gallery-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #5a3a41;
  margin: 0 0 16px 0;
  text-shadow: 0 4px 20px rgba(90, 58, 65, 0.2);
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.heart-icon {
  font-size: 0.8em;
  animation: heartbeat 2s ease-in-out infinite;
  width: 52px;
  height: 52px;
  display: flex;
}

.slider-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}

.slider-wrapper::before,
.slider-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 120px;
  z-index: 10;
  pointer-events: none;
}

.slider-wrapper::before {
  left: 0;
  background: linear-gradient(to right, 
    rgba(255, 255, 255, 0.9) 0%, 
    transparent 100%);
}

.slider-wrapper::after {
  right: 0;
  background: linear-gradient(to left, 
    rgba(255, 255, 255, 0.9) 0%, 
    transparent 100%);
}

.slider {
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.slider::-webkit-scrollbar {
  display: none;
}

.slider-track {
  display: flex;
  width: max-content;
  animation: slide 120s linear infinite;
  transition: animation-play-state 0.3s ease;
}

.slider-track.paused {
  animation-play-state: paused;
}

.slide-item {
  flex-shrink: 0;
  padding: 12px;
  cursor: pointer;
}

.image-wrapper {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255,255,255,0.9);
  box-shadow: 0 8px 32px rgba(192, 136, 143, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid rgba(232, 194, 200, 0.3);
}

.image-wrapper:hover {
  transform: translateY(-12px) scale(1.03);
  box-shadow: 0 16px 48px rgba(181, 134, 141, 0.3);
  border-color: rgba(232, 194, 200, 0.6);
}

.gallery-image {
  width: clamp(200px, 25vw, 320px);
  height: clamp(200px, 25vw, 320px);
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.image-wrapper:hover .gallery-image {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(232, 194, 200, 0.9), rgba(181, 134, 141, 0.9));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-wrapper:hover .overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
  color: white;
  transform: translateY(10px);
  transition: transform 0.3s ease;
}

.image-wrapper:hover .overlay-content {
  transform: translateY(0);
}

.view-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 8px;
}

.view-text {
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 20px 0;
  position: relative;
  z-index: 15;
}

.pagination-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  border: 2px solid rgba(232, 194, 200, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-dot:hover {
  background: rgba(232, 194, 200, 0.8);
  border-color: rgba(232, 194, 200, 0.6);
  transform: scale(1.2);
}

.pagination-dot.active {
  background: rgba(232, 194, 200, 1);
  border-color: rgba(232, 194, 200, 1);
  transform: scale(1.4);
}

/* Modal Styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(90, 58, 65, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 90vw;
  max-height: 90vh;
  background: rgba(255,255,255,0.1);
  border-radius: 24px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(232, 194, 200, 0.3);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(90, 58, 65, 0.3);
}

.modal-content {
  text-align: center;
  padding: 40px;
  max-width: 100%;
  max-height: 100%;
}

.modal-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 0 16px 48px rgba(0,0,0,0.3);
}

.modal-info {
  margin-top: 24px;
  color: #f8ebec;
}

.modal-info h3 {
  margin: 0 0 8px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
}

.modal-counter {
  color: rgba(248, 235, 236, 0.8);
  font-size: 0.9rem;
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  background: rgba(255,255,255,0.2);
  border: 2px solid rgba(232, 194, 200, 0.3);
  border-radius: 50%;
  color: white;
  font-size: 20px;
  cursor: pointer;
  z-index: 1001;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.modal-close:hover {
  background: rgba(232, 194, 200, 0.8);
  border-color: rgba(232, 194, 200, 0.6);
  transform: scale(1.1);
}

.modal-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  background: rgba(255,255,255,0.2);
  border: 2px solid rgba(232, 194, 200, 0.3);
  border-radius: 50%;
  color: white;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.modal-nav:hover {
  background: rgba(232, 194, 200, 0.8);
  border-color: rgba(232, 194, 200, 0.6);
  transform: translateY(-50%) scale(1.1);
}

.modal-nav.prev {
  left: 20px;
}

.modal-nav.next {
  right: 20px;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Modal transitions */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Responsive Design */
@media (max-width: 768px) {
  .gallery {
    padding: 60px 0;
  }
  
  .container {
    padding: 0 16px;
  }
  
  .gallery-header {
    margin-bottom: 40px;
  }
  
  .slider-wrapper::before,
  .slider-wrapper::after {
    width: 80px;
  }
  
  .pagination-dot {
    width: 10px;
    height: 10px;
  }
  
  .modal-container {
    margin: 20px;
  }
  
  .modal-content {
    padding: 20px;
  }
  
  .modal-nav {
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
  
  .modal-nav.prev {
    left: 12px;
  }
  
  .modal-nav.next {
    right: 12px;
  }
}

@media (max-width: 480px) {
  .slider-wrapper::before,
  .slider-wrapper::after {
    width: 60px;
  }
  
  .slide-item {
    padding: 8px;
  }
  
  .gallery-image {
    width: clamp(160px, 35vw, 240px);
    height: clamp(160px, 35vw, 240px);
  }
  
  .modal-backdrop {
    padding: 12px;
  }
  
  .modal-image {
    max-height: 60vh;
  }
  
  .pagination-dot {
    width: 8px;
    height: 8px;
  }
}
</style>