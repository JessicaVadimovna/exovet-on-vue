<template>
  <section id="specialists" class="specialists">
    <div class="container">
      <div class="header">
        <div class="header-content">
          <h1 class="title">Наша <span class="highlight">команда</span></h1>
          <p class="subtitle">Мы — команда профессионалов, объединенных любовью к животным и стремлением обеспечить лучший уход для ваших питомцев. Каждый член нашей команды привносит уникальный опыт и заботу в работу клиники.</p>
          <div class="divider"></div>
        </div>
      </div>

      <!-- Фильтры -->
      <div class="filter-buttons">
        <button
          v-for="filter in filterOptions"
          :key="filter.value"
          :class="{ 'active': activeFilter === filter.value }"
          @click="activeFilter = filter.value; resetSwiper()"
        >
          {{ filter.label }} ({{ filter.count }})
        </button>
      </div>

      <!-- Swiper Slider -->
      <div class="swiper-container" :class="{ 'has-navigation': filteredMembers.length > 3 }">
        <!-- Стрелки на границах экрана -->
        <div class="swiper-button-prev screen-edge-nav" v-show="filteredMembers.length > 3"></div>
        <div class="swiper-button-next screen-edge-nav" v-show="filteredMembers.length > 3"></div>
        
        <div class="swiper vet-slider" :class="{ 'centered': filteredMembers.length <= 3 }">
          <div class="swiper-wrapper">
            <div v-for="member in filteredMembers" :key="'member-' + member.id" class="swiper-slide specialist-card">
              <div class="card-front">
                <div class="image-container">
                  <img :src="member.image" class="specialist-image" alt="Specialist photo" />
                  <div class="image-overlay"></div>
                </div>
                <div class="specialist-content">
                  <div class="specialist-header">
                    <h3 class="specialist-name">{{ member.name }}</h3>
                    <div class="specialist-title">{{ member.role }}</div>
                    <div class="specialist-specialty">{{ member.specialization }}</div>
                  </div>
                  <div v-if="member.experience" class="experience-badge">
                    <svg class="icon" viewBox="0 0 24 24">
                      <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
                    </svg>
                    <span>Опыт: {{ member.experience }}</span>
                  </div>
                  <div class="specialist-footer">
                    <button class="more-btn">
                      <span>Подробнее</span>
                      <svg class="arrow" viewBox="0 0 24 24">
                        <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="card-back">
                <div class="back-content">
                  <div class="details">
                    <div class="story-section">
                      <h4 class="section-title">Профессиональный путь</h4>
                      <div class="story-text">{{ member.biography }}</div>
                    </div>
                    <div class="pets-section">
                      <h4 class="section-title">Домашние питомцы</h4>
                      <div class="pets-list">{{ member.pets || 'Нет' }}</div>
                    </div>
                  </div>
                  <button class="back-btn">
                    <svg class="icon" viewBox="0 0 24 24">
                      <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
                    </svg>
                    Назад
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'

interface TeamMember {
  id: number
  image: string
  name: string
  role: string
  specialization: string
  biography: string
  experience: string
  pets: string
  roleType: 'врач' | 'ассистент' | 'администратор'
}

export default defineComponent({
  name: 'Specialists',
  setup() {
    const veterinarians = ref<TeamMember[]>([
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80',
        name: 'Еланцева Валерия Сергеевна',
        role: 'Главный врач',
        specialization: 'Специалист по экзотическим животным',
        biography: 'Специализируется на кожной и абдоминальной хирургии, стоматологии и терапии экзотических животных. Интерес к экзотическим питомцам возник после работы в зоомагазине и заботы о крысе Мэри, которая стала прототипом логотипа клиники.',
        experience: '6 лет',
        pets: 'Кот и кошка, которые приносят радость и являются частью жизни.',
        roleType: 'врач'
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80',
        name: 'Гаржилова Ксения Батоевна',
        role: 'Терапевт',
        specialization: 'Врач УЗИ экзотических животных',
        biography: 'Вдохновилась профессией через рассказы дяди-ветеринара и работу ассистентом в его клинике в Улан-Удэ. Переехав в Иркутск, открыла для себя мир экзотических животных, которые ее просто очаровали. Теперь любимые пациенты не лают и не мяукают, а лишь изредка щелкают зубами по пальцам.',
        experience: '5 лет',
        pets: 'Маленькая черно-белая кошечка по кличке Миска.',
        roleType: 'врач'
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80',
        name: 'Черных Елена Александровна',
        role: 'Терапевт',
        specialization: 'Специалист по рептилиям и амфибиям',
        biography: 'Начинала с изготовления ортопедических изделий для собак и кошек, затем получила ветеринарное образование. Открыла для себя мир экзотических животных во время практики и влюбилась в рептилий. Теперь это узкая специализация, которой она посвящает всю свою профессиональную страсть.',
        experience: '4 года',
        pets: 'Две кошки, аксолотль и ковровый питон.',
        roleType: 'врач'
      },
      {
        id: 4,
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80',
        name: 'Тимофеева Арина Владимировна',
        role: 'Терапевт',
        specialization: 'Специалист по орнитологии',
        biography: 'Получила специализацию в онлайн-школе «Webexovet». Детство с разнообразными питомцами, включая экзотику, определило выбор профессии. Решила освоить ветеринарную медицину птиц из-за острой нехватки орнитологов в Иркутске. Планирует расширить специализацию на других экзотических животных.',
        experience: '4 года врачом, 3 года в орнитологии',
        pets: 'Кот, планирует завести экзотического питомца.',
        roleType: 'врач'
      }
    ])

    const assistants = ref<TeamMember[]>([
      {
        id: 5,
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80',
        name: 'Пыхтунова Альбина Павловна',
        role: 'Ассистент ветеринарного врача',
        specialization: '',
        biography: 'Выросла в семье врачей, но выбрала ветеринарию, потому что с животными проще и теплее. Особенно любит кошек и экзотических животных. Ценит команду Exovet за поддержку и взаимоуважение. За день видит столько животных, сколько другие не встречают и за год, отдавая каждому тепло и внимание.',
        experience: '3 года',
        pets: 'Пока нет, но каждый пациент получает заботу как свой.',
        roleType: 'ассистент'
      },
      {
        id: 6,
        image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80',
        name: 'Шахова Ника Максимовна',
        role: 'Ассистент ветеринарного врача',
        specialization: '',
        biography: 'Начала с курсов груминга и работы в салоне, где старалась спасать жизни малышей в колтунах и с паразитами. Превращает каждое посещение клиники в курорт для пушистиков, создавая атмосферу безопасности. Единственный грумер в Иркутске, который умеет стричь кроликов!',
        experience: '3 года',
        pets: 'Белая шиншилла, котик-тапкогрыз и мамина собака бладхаунд.',
        roleType: 'ассистент'
      }
    ])

    const administrators = ref<TeamMember[]>([
      {
        id: 7,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80',
        name: 'Дворянская Ульяна Дмитриевна',
        role: 'Администратор',
        specialization: '',
        biography: 'Всегда любила животных и содержала различных экзотических питомцев. Мечтает в будущем помогать животным наравне с другими специалистами, а пока рада быть полезной в мелочах при контакте с маленькими пациентами. Осуществила подростковую мечту, забрав кошку из приюта.',
        experience: '2 года',
        pets: 'Голубоглазая кошечка Ася из приюта.',
        roleType: 'администратор'
      }
    ])

    const teamMembers = ref<TeamMember[]>([...veterinarians.value, ...assistants.value, ...administrators.value])
    const activeFilter = ref('все')
    let swiperInstance: Swiper | null = null

    const filterOptions = computed(() => [
      { value: 'все', label: 'Вся команда', count: teamMembers.value.length },
      { value: 'врач', label: 'Врачи', count: teamMembers.value.filter(m => m.roleType === 'врач').length },
      { value: 'ассистент', label: 'Ассистенты', count: teamMembers.value.filter(m => m.roleType === 'ассистент').length },
      { value: 'администратор', label: 'Администрация', count: teamMembers.value.filter(m => m.roleType === 'администратор').length }
    ])

    const filteredMembers = computed(() => {
      return activeFilter.value === 'все'
        ? teamMembers.value
        : teamMembers.value.filter(member => member.roleType === activeFilter.value)
    })

    const resetSwiper = async () => {
      if (swiperInstance) {
        swiperInstance.destroy(true, true)
        swiperInstance = null
      }
      
      await nextTick()
      
      const membersCount = filteredMembers.value.length
      const isLoopEnabled = membersCount > 3
      const showNavigation = membersCount > 3
      
      swiperInstance = new Swiper('.vet-slider', {
        modules: [Navigation, Pagination],
        slidesPerView: Math.min(membersCount, 3),
        spaceBetween: 30,
        loop: isLoopEnabled,
        centeredSlides: true,
        watchSlidesProgress: true,
        allowTouchMove: isLoopEnabled,
        navigation: showNavigation ? {
          nextEl: '.swiper-button-next.screen-edge-nav',
          prevEl: '.swiper-button-prev.screen-edge-nav',
        } : false,
        pagination: showNavigation ? {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: membersCount > 5,
          dynamicMainBullets: 3,
        } : false,
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
            centeredSlides: true,
          },
          768: {
            slidesPerView: Math.min(membersCount, 2),
            spaceBetween: 25,
            centeredSlides: true,
          },
          992: {
            slidesPerView: Math.min(membersCount, 3),
            spaceBetween: 30,
            centeredSlides: true,
          },
          1200: {
            slidesPerView: Math.min(membersCount, 3),
            spaceBetween: 30,
            centeredSlides: true,
          }
        },
      })

      // Реинициализация обработчиков переворота карточек
      document.querySelectorAll('.specialist-card').forEach(card => {
        const moreBtn = card.querySelector('.more-btn')
        const backBtn = card.querySelector('.back-btn')
        moreBtn?.removeEventListener('click', handleMoreClick)
        backBtn?.removeEventListener('click', handleBackClick)
        moreBtn?.addEventListener('click', handleMoreClick)
        backBtn?.addEventListener('click', handleBackClick)
      })
    }

    const handleMoreClick = (event: Event) => {
      const card = (event.currentTarget as HTMLElement).closest('.specialist-card')
      card?.classList.add('flipped')
    }

    const handleBackClick = (event: Event) => {
      const card = (event.currentTarget as HTMLElement).closest('.specialist-card')
      card?.classList.remove('flipped')
    }

    onMounted(() => {
      resetSwiper()
    })

    onUnmounted(() => {
      if (swiperInstance) {
        swiperInstance.destroy(true, true)
      }
    })

    return { teamMembers, filterOptions, activeFilter, filteredMembers, resetSwiper }
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');

.specialists {
  padding: 100px 40px;
  background: #fefafb;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  padding: 0 20px;
}

.header {
  text-align: center;
  margin-bottom: 80px;
  position: relative;
}

.header::after {
  content: '';
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(214, 122, 143, 0.5), transparent);
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 700;
  color: #2d1e24;
  margin-bottom: 20px;
  line-height: 1.2;
  position: relative;
  display: inline-block;
}

.highlight {
  color: #d67a8f;
  position: relative;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 12px;
  background-color: rgba(214, 122, 143, 0.2);
  z-index: -1;
  transform: skewY(-2deg);
}

.subtitle {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.3rem;
  color: #6b5a60;
  margin-bottom: 30px;
  font-weight: 400;
  line-height: 1.6;
}

.divider {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #eab9cf, #d67a8f);
  margin: 0 auto;
  border-radius: 2px;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.filter-buttons button {
  padding: 10px 20px;
  border: 2px solid #d67a8f;
  border-radius: 25px;
  background: none;
  color: #d67a8f;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-buttons button.active {
  background: #d67a8f;
  color: white;
}

.filter-buttons button:hover:not(.active) {
  background: #f9e8ee;
}

.swiper-container {
  position: relative;
  margin-bottom: 20px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 80px;
  overflow: hidden;
}

.vet-slider {
  position: relative;
  padding-bottom: 60px;
  overflow: visible;
  max-width: 100%;
}

.swiper-slide.specialist-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(107, 76, 87, 0.1);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  transform-style: preserve-3d;
  min-height: 550px;
  overflow: hidden;
  width: 320px;
  max-width: 320px;
  flex-shrink: 0;
}

.swiper-slide.specialist-card:hover {
  box-shadow: 0 15px 40px rgba(107, 76, 87, 0.15);
  transform: translateY(-5px);
}

/* Стрелки на границах контейнера секции */
.swiper-button-prev.screen-edge-nav,
.swiper-button-next.screen-edge-nav {
  color: #d67a8f;
  background: rgba(255, 255, 255, 0.95);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0 6px 20px rgba(107, 76, 87, 0.25);
  transition: all 0.3s ease;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  margin-top: 0;
  position: absolute;
}

.swiper-button-prev.screen-edge-nav {
  left: 10px;
}

.swiper-button-next.screen-edge-nav {
  right: 10px;
}

.swiper-button-prev.screen-edge-nav:hover,
.swiper-button-next.screen-edge-nav:hover {
  background: white;
  transform: scale(1.1) translateY(-45%);
  box-shadow: 0 8px 25px rgba(107, 76, 87, 0.35);
}

.swiper-button-prev.screen-edge-nav:after,
.swiper-button-next.screen-edge-nav:after {
  font-size: 24px;
  font-weight: bold;
}

.card-front, .card-back {
  padding: 0;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transition: transform 0.6s ease;
}

.card-front {
  background: white;
  display: flex;
  flex-direction: column;
  z-index: 2;
  transform: rotateY(0deg);
}

.card-back {
  background: linear-gradient(135deg, #6b4c57 0%, #8b6f7a 100%);
  transform: rotateY(180deg);
  color: white;
  display: flex;
  flex-direction: column;
}

.specialist-card.flipped .card-front {
  transform: rotateY(180deg);
}

.specialist-card.flipped .card-back {
  transform: rotateY(360deg);
}

.image-container {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0));
}

.specialist-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.specialist-card:hover .specialist-image {
  transform: scale(1.05);
}

.specialist-content {
  padding: 25px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.specialist-header {
  margin-bottom: 20px;
}

.specialist-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #3a2a30;
  margin-bottom: 10px;
  text-align: center;
}

.specialist-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: #d67a8f;
  text-align: center;
  line-height: 1.5;
  font-weight: 500;
}

.specialist-specialty {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: #6b5a60;
  text-align: center;
  line-height: 1.5;
}

.experience-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #f9f0f3;
  color: #6b4c57;
  padding: 8px 16px;
  border-radius: 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0 auto 20px;
  box-shadow: 0 4px 6px rgba(214, 122, 143, 0.1);
}

.experience-badge .icon {
  width: 16px;
  height: 16px;
  fill: #d67a8f;
}

.specialist-footer {
  margin-top: auto;
  text-align: center;
}

.more-btn {
  background: linear-gradient(135deg, #eab9cf 0%, #d67a8f 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(214, 122, 143, 0.3);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(214, 122, 143, 0.4);
}

.more-btn .arrow {
  width: 18px;
  height: 18px;
  fill: white;
  transition: transform 0.3s ease;
}

.more-btn:hover .arrow {
  transform: translateX(3px);
}

.back-content {
  padding: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
}

.section-title .icon {
  width: 20px;
  height: 20px;
  fill: #f0c0cd;
}

.story-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  line-height: 1.7;
  color: #f0e6e9;
}

.pets-list {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-style: italic;
  color: #f0e6e9;
  padding-left: 15px;
  border-left: 3px solid #d67a8f;
}

.back-btn {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 10px 25px;
  border-radius: 30px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  align-self: center;
  display: flex;
  align-items: center;
  gap: 8px;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

.back-btn .icon {
  width: 16px;
  height: 16px;
  fill: white;
}

/* Адаптивность */
@media (max-width: 1400px) {
  .swiper-container {
    padding: 0 70px;
  }
}

@media (max-width: 1200px) {
  .swiper-container {
    padding: 0 60px;
  }
}

@media (max-width: 992px) {
  .container {
    max-width: 960px;
    padding: 0 15px;
  }

  .title {
    font-size: 2.8rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .swiper-container {
    padding: 0 50px;
  }

  .swiper-button-prev.screen-edge-nav,
  .swiper-button-next.screen-edge-nav {
    width: 50px;
    height: 50px;
  }

  .swiper-button-prev.screen-edge-nav:after,
  .swiper-button-next.screen-edge-nav:after {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .specialists {
    padding: 80px 15px;
  }

  .container {
    max-width: 720px;
    padding: 0 10px;
  }

  .title {
    font-size: 2.2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .swiper-container {
    padding: 0 40px;
  }

  .swiper-button-prev.screen-edge-nav,
  .swiper-button-next.screen-edge-nav {
    width: 45px;
    height: 45px;
  }

  .swiper-button-prev.screen-edge-nav:after,
  .swiper-button-next.screen-edge-nav:after {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .container {
    max-width: 100%;
    padding: 0 5px;
  }

  .title {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .specialist-name {
    font-size: 1.3rem;
  }

  .specialist-title, .specialist-specialty {
    font-size: 0.85rem;
  }

  .swiper-container {
    padding: 0 30px;
  }

  .swiper-button-prev.screen-edge-nav,
  .swiper-button-next.screen-edge-nav {
    width: 40px;
    height: 40px;
  }

  .swiper-button-prev.screen-edge-nav:after,
  .swiper-button-next.screen-edge-nav:after {
    font-size: 16px;
  }

  .filter-buttons {
    gap: 10px;
  }

  .filter-buttons button {
    padding: 8px 16px;
    font-size: 0.85rem;
  }
}

/* Скрытие кнопок навигации на очень маленьких экранах */
@media (max-width: 320px) {
  .swiper-container {
    padding: 0 10px;
  }
  
  .swiper-button-prev.screen-edge-nav,
  .swiper-button-next.screen-edge-nav {
    display: none !important;
  }
}
</style>

<style>
/* Без scoped для Swiper */
.swiper-pagination {
  bottom: 10px !important;
}

.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  margin: 0 6px !important;
  background-color: #f38bb7 !important;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.swiper-pagination-bullet-active {
  background-color: #c64382 !important;
  opacity: 1;
}

/* Отключение кнопок когда нет возможности прокрутки */
.swiper-button-disabled {
  opacity: 0.3 !important;
  cursor: not-allowed !important;
}
</style> 
