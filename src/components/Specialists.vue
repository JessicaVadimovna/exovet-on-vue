<template>
  <section id="specialists" class="specialists">
    <div class="container">
      <div class="header">
        <div class="header-content">
          <h1 class="title">Наша <span class="highlight">команда</span></h1>
          <p class="subtitle">Профессионалы, которые заботятся о ваших питомцах с любовью и экспертным подходом</p>
          <div class="divider"></div>
        </div>
      </div>
      
      <!-- Veterinarians Section with Swiper Slider -->
      <div class="category">
        <div class="category-header">
          <h2 class="category-title">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M12,2L4,5V11.09C4,16.14 7.41,20.85 12,22C16.59,20.85 20,16.14 20,11.09V5L12,2M12.75,13.47L12.75,7H11.25V13.47L9.75,12L8.75,13L12,16.25L15.25,13L14.25,12L12.75,13.47Z" />
            </svg>
            Ветеринарные врачи
          </h2>
          <p class="category-description">Специалисты с высшим ветеринарным образованием и узкой специализацией</p>
        </div>
        <div class="swiper vet-slider">
          <div class="swiper-wrapper">
            <div v-for="(specialist, index) in veterinarians" :key="'vet-' + index" class="swiper-slide specialist-card">
              <div class="card-front">
                <div class="image-container">
                  <img :src="specialist.image" class="specialist-image" alt="Specialist photo"/>
                  <div class="image-overlay"></div>
                </div>
                <div class="specialist-content">
                  <div class="specialist-header">
                    <h3 class="specialist-name">{{ specialist.name }}</h3>
                    <div class="specialist-title">{{ specialist.specialty }}</div>
                  </div>
                  <div v-if="specialist.experience" class="experience-badge">
                    <svg class="icon" viewBox="0 0 24 24">
                      <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
                    </svg>
                    <span>Опыт: {{ specialist.experience }}</span>
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
                      <h4 class="section-title">
                        Профессиональный путь
                      </h4>
                      <div class="story-text">{{ specialist.motivation }}</div>
                    </div>
                    <div class="pets-section">
                      <h4 class="section-title">
                        Домашние питомцы
                      </h4>
                      <div class="pets-list">{{ specialist.pets || 'Нет' }}</div>
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
          <!-- Swiper Navigation -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
          <!-- Swiper Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </div>

      <!-- Assistants Section -->
      <div class="category">
        <div class="category-header">
          <h2 class="category-title">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z" />
            </svg>
            Ассистенты
          </h2>
          <p class="category-description">Помощники врачей, обеспечивающие комфорт и уход за питомцами</p>
        </div>
        <div class="specialists-grid assistant-list">
          <div v-for="(assistant, index) in assistants" :key="'assistant-' + index" class="specialist-card">
            <div class="card-front">
              <div class="image-container">
                <img :src="assistant.image" class="specialist-image" alt="Assistant photo"/>
                <div class="image-overlay"></div>
              </div>
              <div class="specialist-content">
                <div class="specialist-header">
                  <h3 class="specialist-name">{{ assistant.name }}</h3>
                  <div class="specialist-title">{{ assistant.specialty }}</div>
                </div>
                <div v-if="assistant.experience" class="experience-badge">
                  <svg class="icon" viewBox="0 0 24 24">
                    <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
                  </svg>
                  <span>Опыт: {{ assistant.experience }}</span>
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
                    <h4 class="section-title">
                      Профессиональный путь
                    </h4>
                    <div class="story-text">{{ assistant.motivation }}</div>
                  </div>
                  <div class="pets-section">
                    <h4 class="section-title">
                      Домашние питомцы
                    </h4>
                    <div class="pets-list">{{ assistant.pets || 'Нет' }}</div>
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
      </div>

      <!-- Administrators Section -->
      <div class="category">
        <div class="category-header">
          <h2 class="category-title">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M12,3C14.21,3 16,4.79 16,7C16,9.21 14.21,11 12,11C9.79,11 8,9.21 8,7C8,4.79 9.79,3 12,3M16,13.54C16,14.6 15.72,17.07 13.81,19.83L13,15L13.94,13.12C13.32,13.05 12.67,13 12,13C11.33,13 10.68,13.05 10.06,13.12L11,15L10.19,19.83C8.28,17.07 8,14.6 8,13.54C5.61,14.24 4,15.5 4,17V21H20V17C20,15.5 18.4,14.24 16,13.54Z" />
            </svg>
            Администраторы
          </h2>
          <p class="category-description">Организаторы работы клиники и ваши помощники</p>
        </div>
        <div class="specialists-grid admin-list">
          <div v-for="(admin, index) in administrators" :key="'admin-' + index" class="specialist-card">
            <div class="card-front">
              <div class="image-container">
                <img :src="admin.image" class="specialist-image" alt="Admin photo"/>
                <div class="image-overlay"></div>
              </div>
              <div class="specialist-content">
                <div class="specialist-header">
                  <h3 class="specialist-name">{{ admin.name }}</h3>
                  <div class="specialist-title">{{ admin.specialty }}</div>
                </div>
                <div v-if="admin.experience" class="experience-badge">
                  <svg class="icon" viewBox="0 0 24 24">
                    <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
                  </svg>
                  <span>Опыт: {{ admin.experience }}</span>
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
                    <h4 class="section-title">
                      Профессиональный путь
                    </h4>
                    <div class="story-text">{{ admin.motivation }}</div>
                  </div>
                  <div class="pets-section">
                    <h4 class="section-title">
                      Домашние питомцы
                    </h4>
                    <div class="pets-list">{{ admin.pets || 'Нет' }}</div>
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
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'


interface Specialist {
  image: string
  name: string
  specialty: string
  experience?: string
  motivation: string
  pets?: string
}

export default defineComponent({
  name: 'Specialists',
  setup() {
    const veterinarians = ref<Specialist[]>([
      {
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80',
        name: 'Еланцева Валерия Сергеевна',
        specialty: 'Главный врач • Специалист по экзотическим животным',
        experience: '6 лет',
        motivation: 'Владелец клиники Exovet с образованием в области химии, которая нашла свое истинное призвание в ветеринарии. Специализируется на кожной и абдоминальной хирургии, стоматологии и терапии экзотических животных. Интерес к экзотическим питомцам возник после работы в зоомагазине и заботы о крысе Мэри, которая стала прототипом логотипа клиники.',
        pets: 'Кот и кошка, которые приносят радость и являются частью жизни.'
      },
      {
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80',
        name: 'Гаржилова Ксения Батоевна',
        specialty: 'Терапевт • Врач УЗИ экзотических животных',
        experience: '5 лет',
        motivation: 'Вдохновилась профессией через рассказы дяди-ветеринара и работу ассистентом в его клинике в Улан-Удэ. Переехав в Иркутск, открыла для себя мир экзотических животных, которые ее просто очаровали. Теперь любимые пациенты не лают и не мяукают, а лишь изредка щелкают зубами по пальцам.',
        pets: 'Маленькая черно-белая кошечка по кличке Миска.'
      },
      {
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80',
        name: 'Черных Елена Александровна',
        specialty: 'Терапевт • Специалист по рептилиям и амфибиям',
        experience: '4 года',
        motivation: 'Начинала с изготовления ортопедических изделий для собак и кошек, затем получила ветеринарное образование. Открыла для себя мир экзотических животных во время практики и влюбилась в рептилий. Теперь это узкая специализация, которой она посвящает всю свою профессиональную страсть.',
        pets: 'Две кошки, аксолотль и ковровый питон.'
      },
      {
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80',
        name: 'Тимофеева Арина Владимировна',
        specialty: 'Терапевт • Специалист по орнитологии',
        experience: '4 года врачом, 3 года в орнитологии',
        motivation: 'Получила специализацию в онлайн-школе «Webexovet». Детство с разнообразными питомцами, включая экзотику, определило выбор профессии. Решила освоить ветеринарную медицину птиц из-за острой нехватки орнитологов в Иркутске. Планирует расширить специализацию на других экзотических животных.',
        pets: 'Кот, планирует завести экзотического питомца.'
      }
    ])

    const assistants = ref<Specialist[]>([
      {
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80',
        name: 'Пыхтунова Альбина Павловна',
        specialty: 'Ассистент ветеринарного врача',
        experience: '3 года',
        motivation: 'Выросла в семье врачей, но выбрала ветеринарию, потому что с животными проще и теплее. Особенно любит кошек и экзотических животных. Ценит команду Exovet за поддержку и взаимоуважение. За день видит столько животных, сколько другие не встречают и за год, отдавая каждому тепло и внимание.',
        pets: 'Пока нет, но каждый пациент получает заботу как свой.'
      },
      {
        image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80',
        name: 'Шахова Ника Максимовна',
        specialty: 'Ассистент ветеринарного врача • Грумер',
        experience: '3 года',
        motivation: 'Начала с курсов груминга и работы в салоне, где старалась спасать жизни малышей в колтунах и с паразитами. Превращает каждое посещение клиники в курорт для пушистиков, создавая атмосферу безопасности. Единственный грумер в Иркутске, который умеет стричь кроликов!',
        pets: 'Белая шиншилла, котик-тапкогрыз и мамина собака бладхаунд.'
      }
    ])

    const administrators = ref<Specialist[]>([
      {
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80',
        name: 'Дворянская Ульяна Дмитриевна',
        specialty: 'Администратор',
        experience: '2 года',
        motivation: 'Всегда любила животных и содержала различных экзотических питомцев. Мечтает в будущем помогать животным наравне с другими специалистами, а пока рада быть полезной в мелочах при контакте с маленькими пациентами. Осуществила подростковую мечту, забрав кошку из приюта.',
        pets: 'Голубоглазая кошечка Ася из приюта.'
      }
    ])

    onMounted(() => {
      // Initialize Swiper for veterinarians
      new Swiper('.vet-slider', {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
        },
      })

      // Initialize card flip functionality for all specialist cards
      document.querySelectorAll('.specialist-card').forEach(card => {
        const moreBtn = card.querySelector('.more-btn')
        const backBtn = card.querySelector('.back-btn')
        
        moreBtn?.addEventListener('click', () => {
          card.classList.add('flipped')
        })
        
        backBtn?.addEventListener('click', () => {
          card.classList.remove('flipped')
        })
      })
    })

    return { veterinarians, assistants, administrators }
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');

.specialists {
  padding: 100px 20px;
  background: #fefafb;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
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

.category {
  margin-bottom: 100px;
}

.category-header {
  text-align: center;
  margin-bottom: 60px;
}

.category-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #3a2a30;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.category-title .icon {
  width: 36px;
  height: 36px;
  fill: #d67a8f;
}

.category-description {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  color: #7a6a70;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Swiper styles for veterinarians */
.vet-slider {
  position: relative;
  padding-bottom: 60px;
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
}

.swiper-slide.specialist-card:hover {
  box-shadow: 0 15px 40px rgba(107, 76, 87, 0.15);
  transform: translateY(-5px);
}

/* Swiper navigation buttons */
.swiper-button-prev,
.swiper-button-next {
  color: #d67a8f;
  background: rgba(255, 255, 255, 0.9);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(107, 76, 87, 0.2);
  transition: all 0.3s ease;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  background: white;
  transform: scale(1.1);
}

.swiper-button-prev:after,
.swiper-button-next:after {
  font-size: 20px;
}


/* Grid styles for assistants and administrators */
.specialists-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  perspective: 1000px;
}

.specialist-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(107, 76, 87, 0.1);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  transform-style: preserve-3d;
  min-height: 550px;
  overflow: hidden;
  width: 320px;
  max-width: 100%;
}

.specialist-card:hover {
  box-shadow: 0 15px 40px rgba(107, 76, 87, 0.15);
  transform: translateY(-5px);
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

.back-header {
  text-align: center;
  margin-bottom: 30px;
}

.back-header .image-container {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto 15px;
  border: 3px solid rgba(255,255,255,0.2);
}

.back-header .specialist-name {
  color: white;
  margin-bottom: 5px;
}

.back-header .specialist-title {
  color: #f0c0cd;
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
  font-size: 0.90rem;
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
  background: linear-gradient(90deg, transparent, rgba(214, 122, 143, 0.5), transparent);
}

.trust-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #3a2a30;
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
  background: linear-gradient(90deg, #eab9cf, #d67a8f);
  border-radius: 2px;
}

.trust-indicators {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.trust-item {
  background: white;
  border-radius: 16px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(107, 76, 87, 0.05);
  position: relative;
  overflow: hidden;
}

.trust-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #eab9cf, #d67a8f);
}

.trust-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(107, 76, 87, 0.1);
}

.trust-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #f8e8ec 0%, #f0d6de 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d67a8f;
}

.trust-icon svg {
  width: 30px;
  height: 30px;
  fill: #d67a8f;
}

.trust-item-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: #3a2a30;
  margin-bottom: 15px;
}

.trust-item-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: #7a6a70;
  line-height: 1.6;
}

@media (max-width: 992px) {
  .title {
    font-size: 2.8rem;
  }
  
  .subtitle {
    font-size: 1.1rem;
  }
  
  .category-title {
    font-size: 2rem;
  }
  
  .trust-indicators {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .specialists {
    padding: 80px 20px;
  }
  
  .title {
    font-size: 2.2rem;
  }
  
  .category-title {
    font-size: 1.8rem;
  }
  
  .trust-title {
    font-size: 2rem;
    margin-bottom: 50px;
  }
  
  .trust-indicators {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .trust-item {
    padding: 30px 25px;
  }
  
  .vet-slider {
    padding: 0 20px 60px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.8rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .category-title {
    font-size: 1.5rem;
    flex-direction: column;
    gap: 5px;
  }
  
  .specialist-name {
    font-size: 1.3rem;
  }
  
  .specialist-title {
    font-size: 0.9rem;
  }
  
  .specialists-grid {
    flex-direction: column;
    align-items: center;
  }
  
  .trust-title {
    font-size: 1.8rem;
  }
  
  .vet-slider {
    padding: 0 15px 60px;
  }
}
</style>

<style>
/* без scoped */
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
</style>