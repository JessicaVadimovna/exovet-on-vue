<template>
  <main class="testimonials">
    <h1>Наша <span class="highlight">команда</span></h1>

    <!-- Фильтры -->
    <div class="filter-buttons">
      <button
        v-for="filter in filterOptions"
        :key="filter.value"
        :class="{ active: activeFilter === filter.value }"
        @click="activeFilter = filter.value; currentIndex = 0; flippedCards.clear()"
      >
        {{ filter.label }} ({{ filter.count }})
      </button>
    </div>

    <div class="slider-container">
      <!-- Стрелка назад -->
      <button 
        class="nav-arrow nav-arrow-left" 
        @click="previousSlide"
        :disabled="currentIndex === 0"
        :class="{ disabled: currentIndex === 0 }"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div class="slider">
        <div 
          class="slide-row" 
          :style="{ 
            transform: `translateX(-${currentIndex * 100}%)`
          }"
        >
          <div v-for="(member) in filteredMembers" :key="'member-' + member.id" class="slide-col">
            <div class="specialist-card">
              <!-- Фото специалиста -->
              <div class="hero">
                <img :src="member.image" :alt="member.name" />
                <div class="role-badge" :class="getRoleBadgeClass(member.roleType)">
                  <svg class="badge-icon" viewBox="0 0 24 24">
                    <path :d="getRoleIcon(member.roleType)" />
                  </svg>
                  <span>{{ getRoleLabel(member.roleType) }}</span>
                </div>
              </div>
              <!-- Карточка с информацией -->
              <div class="content-wrapper">
                <!-- Передняя сторона - основная информация -->
                <div class="content" :class="{ hidden: flippedCards.has(member.id) }">
                  <h2>{{ member.name }}</h2>
                  <p class="role">{{ member.role }}</p>
                  <p v-if="member.specialization" class="specialization">{{ member.specialization }}</p>
                  <p v-if="member.experience" class="experience">Опыт: {{ member.experience }}</p>
                  <button class="more-btn" @click="toggleCard(member.id)">
                    Подробнее
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
                <!-- Задняя сторона - подробная биография -->
                <div class="content biography-content" :class="{ visible: flippedCards.has(member.id) }">
                  <div class="back-header">
                    <h3>{{ member.name }}</h3>
                    <button class="close-btn" @click="toggleCard(member.id)">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  <div class="biography-text">
                    <p>{{ member.biography }}</p>
                    <div class="additional-info">
                      <div v-if="member.pets" class="info-item">
                        <strong>Питомцы:</strong> {{ member.pets }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Стрелка вперед -->
      <button 
        class="nav-arrow nav-arrow-right" 
        @click="nextSlide"
        :disabled="currentIndex === filteredMembers.length - 1"
        :class="{ disabled: currentIndex === filteredMembers.length - 1 }"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <!-- Индикатор -->
    <div class="indicator" v-if="filteredMembers.length > 1">
      <span
        v-for="(member, index) in filteredMembers"
        :key="'indicator-' + index"
        class="btn"
        :class="{ active: currentIndex === index }"
        @click="currentIndex = index; flippedCards.clear()"
      ></span>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

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
  name: 'TeamTestimonials',
  setup() {
    const veterinarians = ref<TeamMember[]>([
      {
        id: 1,
        image: './assets/img/specialists/VS.JPG',
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
        image: './assets/img/specialists/KB.JPG',
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
        image: './assets/img/specialists/EA.jpg',
        name: 'Черных Елена Александровна',
        role: 'Терапевт',
        specialization: 'Специалист герпетолог (лечение рептилий и амфибий)',
        biography: 'Начинала с изготовления ортопедических изделий для собак и кошек, затем получила ветеринарное образование. Открыла для себя мир экзотических животных во время практики и влюбилась в рептилий. Теперь это узкая специализация, которой она посвящает всю свою профессиональную страсть.',
        experience: '4 года',
        pets: 'Две кошки, аксолотль и ковровый питон.',
        roleType: 'врач'
      },
      {
        id: 4,
        image: './assets/img/specialists/AV.jpg',
        name: 'Тимофеева Арина Владимировна',
        role: 'Терапевт',
        specialization: 'Специалист орнитолог',
        biography: 'Получила специализацию в онлайн-школе «Webexovet». Детство с разнообразными питомцами, включая экзотику, определило выбор профессии. Решила освоить ветеринарную медицину птиц из-за острой нехватки орнитологов в Иркутске. Планирует расширить специализацию на других экзотических животных.',
        experience: '4 года',
        pets: 'Кот, планирует завести экзотического питомца.',
        roleType: 'врач'
      }
    ])

    const assistants = ref<TeamMember[]>([
      {
        id: 5,
        image: './assets/img/specialists/AP.png',
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
        image: './assets/img/specialists/NM.jpg',
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
        image: './assets/img/specialists/UD.jpg',
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
    const currentIndex = ref(0)
    const flippedCards = ref(new Set<number>())

    const filterOptions = computed(() => [
      { value: 'все', label: 'Вся команда', count: teamMembers.value.length },
      { value: 'врач', label: 'Врачи', count: teamMembers.value.filter(m => m.roleType === 'врач').length },
      { value: 'ассистент', label: 'Ассистенты', count: teamMembers.value.filter(m => m.roleType === 'ассистент').length },
      { value: 'администратор', label: 'Администрация', count: teamMembers.value.filter(m => m.roleType === 'администратор').length }
    ])

    const filteredMembers = computed(() => {
      const members = activeFilter.value === 'все'
        ? teamMembers.value
        : teamMembers.value.filter(member => member.roleType === activeFilter.value)
      return members
    })

    const toggleCard = (memberId: number) => {
      if (flippedCards.value.has(memberId)) {
        flippedCards.value.delete(memberId)
      } else {
        flippedCards.value.clear()
        flippedCards.value.add(memberId)
      }
    }

    const nextSlide = () => {
      if (currentIndex.value < filteredMembers.value.length - 1) {
        currentIndex.value++
        flippedCards.value.clear()
      }
    }

    const previousSlide = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--
        flippedCards.value.clear()
      }
    }

    const getRoleBadgeClass = (roleType: string) => {
      switch (roleType) {
        case 'врач': return 'doctor'
        case 'ассистент': return 'assistant'
        case 'администратор': return 'admin'
        default: return 'doctor'
      }
    }

    const getRoleLabel = (roleType: string) => {
      switch (roleType) {
        case 'врач': return 'Врач'
        case 'ассистент': return 'Ассистент'
        case 'администратор': return 'Администратор'
        default: return 'Врач'
      }
    }

    const getRoleIcon = (roleType: string) => {
      switch (roleType) {
        case 'врач': return 'M19.5,8A1.5,1.5 0 0,0 21,6.5A1.5,1.5 0 0,0 19.5,5A1.5,1.5 0 0,0 18,6.5A1.5,1.5 0 0,0 19.5,8M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M15.5,8A1.5,1.5 0 0,0 17,6.5A1.5,1.5 0 0,0 15.5,5A1.5,1.5 0 0,0 14,6.5A1.5,1.5 0 0,0 15.5,8M12,14C13.11,14 14,13.11 14,12C14,10.89 13.11,10 12,10C10.89,10 10,10.89 10,12C10,13.11 10.89,14 12,14Z'
        case 'ассистент': return 'M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z'
        case 'администратор': return 'M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z'
        default: return 'M19.5,8A1.5,1.5 0 0,0 21,6.5A1.5,1.5 0 0,0 19.5,5A1.5,1.5 0 0,0 18,6.5A1.5,1.5 0 0,0 19.5,8M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M15.5,8A1.5,1.5 0 0,0 17,6.5A1.5,1.5 0 0,0 15.5,5A1.5,1.5 0 0,0 14,6.5A1.5,1.5 0 0,0 15.5,8M12,14C13.11,14 14,13.11 14,12C14,10.89 13.11,10 12,10C10.89,10 10,10.89 10,12C10,13.11 10.89,14 12,14Z'
      }
    }

    return {
      teamMembers,
      filterOptions,
      activeFilter,
      filteredMembers,
      currentIndex,
      flippedCards,
      toggleCard,
      nextSlide,
      previousSlide,
      getRoleBadgeClass,
      getRoleLabel,
      getRoleIcon
    }
  }
})
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Playfair+Display:wght@700&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
}

.testimonials {
  width: 100%;
  max-width: 1200px;
  padding: 80px 0px;
  position: relative;
  margin: 0 auto;
  background: transparent;
}

.testimonials h1 {
  text-align: center;
  font-size: clamp(2.5rem, 5vw, 3rem);
  font-family: 'Playfair Display', serif;
  color: #fff;
  margin-bottom: 60px;
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
  height: 14px;
  background-color: rgba(214, 122, 143, 0.2);
  z-index: -1;
  transform: skewY(-2deg);
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.filter-buttons button {
  padding: 14px 28px;
  border: 2px solid #d67a8f;
  border-radius: 30px;
  background: none;
  color: #d67a8f;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.filter-buttons button:hover:not(.active) {
  background: #f9e8ee;
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(214, 122, 143, 0.2);
}

.filter-buttons button.active {
  background: linear-gradient(135deg, #d67a8f, #e8b3c3);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(214, 122, 143, 0.3);
}

.slider-container {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}

.nav-arrow {
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #d67a8f, #e8b3c3);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(214, 122, 143, 0.3);
  flex-shrink: 0;
}

.nav-arrow:hover:not(.disabled) {
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(214, 122, 143, 0.4);
}

.nav-arrow.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.slider {
  flex: 1;
  overflow: hidden;
  border-radius: 12px;
}

.slide-row {
  display: flex;
  transition: transform 0.5s ease;
  will-change: transform;
}

.slide-col {
  position: relative;
  width: 100%;
  min-width: 100%;
  height: 500px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.specialist-card {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  position: relative;
}

.hero {
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  z-index: 1;
}

.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.content-wrapper {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 650px;
  height: 350px;
  z-index: 2;
}

.content {
  color: #4d4352;
  background: rgb(245 245 245 / 10%);
  box-shadow: 0 6px 35px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 50px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
  visibility: visible;
  height: 100%;
  flex-direction: column;
  justify-content: center;
}

.content.hidden {
  opacity: 0;
  visibility: hidden;
  transform: scale(0.95);
}

.biography-content {
  opacity: 0;
  visibility: hidden;
  transform: scale(0.95);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 50px;
  box-shadow: 0 6px 35px rgba(0, 0, 0, 0.15);
}

.biography-content.visible {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
}

.content h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #4d4352;
  font-family: 'Playfair Display', serif;
}

.content .role {
  font-size: 1.4rem;
  font-weight: 600;
  color: #d67a8f;
  margin-bottom: 15px;
}

.content .specialization,
.content .experience {
  font-size: 1.2rem;
  color: #6b5a60;
  margin-bottom: 12px;
  line-height: 1.5;
}

.more-btn {
  display: inline-flex;
  align-items: center;
  border: none;
  border-radius: 50px;
  padding: 10px;
  background: linear-gradient(135deg, #d67a8f, #e8b3c3);
  color: white;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(214, 122, 143, 0.3);
  
}

.more-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(214, 122, 143, 0.4);
}

.more-btn svg {
  transition: transform 0.3s ease;
}

.more-btn:hover svg {
  transform: translateX(4px);
}

.back-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #d67a8f;
}

.back-header h3 {
  font-size: 1.6rem;
  font-weight: 700;
  color: #4d4352;
  font-family: 'Playfair Display', serif;
}

.close-btn {
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #d67a8f, #e8b3c3);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  transform: scale(1.1) rotate(90deg);
}

.biography-text {
  flex: 1;
  padding-right: 10px;
}

.biography-text p {
  font-size: 1.15rem;
  line-height: 1.6;
  color: #4d4352;
  margin-bottom: 20px;
}

.additional-info {
  margin-top: 20px;
}

.info-item {
  margin-bottom: 12px;
  font-size: 1.15rem;
  color: #6b5a60;
}

.info-item strong {
  font-weight: 600;
  color: #4d4352;
}

.role-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  border-radius: 25px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  z-index: 5;
}

.role-badge.doctor {
  background: linear-gradient(135deg, rgba(214, 122, 143, 0.95), rgba(234, 185, 207, 0.95));
  color: white;
}

.role-badge.assistant {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.95), rgba(129, 199, 132, 0.95));
  color: white;
}

.role-badge.admin {
  background: linear-gradient(135deg, rgba(63, 81, 181, 0.95), rgba(121, 134, 203, 0.95));
  color: white;
}

.badge-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
  flex-shrink: 0;
}

.indicator {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 4rem;
}

.indicator .btn {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #bbb3b3;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator .btn.active {
  width: 32px;
  height: 32px;
  background: #e8b3c3;
  
}

.indicator .btn:hover {
  background: #e8b3c3;
  transform: scale(1.2);
}

@media (max-width: 1024px) {
  .testimonials {
    max-width: 900px;
    padding: 60px 15px;
  }

  .testimonials h1 {
    font-size: 2.2rem;
    margin-bottom: 40px;
  }

  .slide-col {
    height: 450px;
  }

  .specialist-card {
    max-width: 800px;
    justify-content: center;
  }

  .hero {
    width: 350px;
    height: 100%;
  }

  .content-wrapper {
    width: 500px;
    height: 300px;
  }

  .content,
  .biography-content {
    padding: 40px;
  }

  .content h2 {
    font-size: 1.6rem;
    margin-bottom: 15px;
  }

  .content .role {
    font-size: 1.2rem;
  }

  .content .specialization,
  .content .experience {
    font-size: 1.1rem;
  }

  .biography-text p {
    font-size: 1.05rem;
  }

  .filter-buttons {
    gap: 15px;
  }

  .filter-buttons button {
    padding: 12px 24px;
    font-size: 0.95rem;
  }

  .nav-arrow {
    width: 55px;
    height: 55px;
  }
}

@media (max-width: 768px) {
  .testimonials {
    max-width: 100%;
    padding: 40px 15px;
  }

  .testimonials h1 {
    font-size: 2rem;
    margin-bottom: 30px;
  }

  .slide-col {
    height: 580px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .specialist-card {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 360px;
    width: 90%;
    height: 540px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    position: relative;
  }

  .hero {
    position: relative;
    top: auto;
    right: auto;
    width: 140px;
    height: 140px;
    margin-top: 20px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid #d67a8f;
    box-shadow: 0 4px 15px rgba(214, 122, 143, 0.3);
  }

  .hero img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    transform: none;
  }

  .hero:hover img {
    transform: scale(1.05);
  }

  .content-wrapper {
    position: relative;
    top: auto;
    transform: none;
    width: 100%;
    height: auto;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .content,
  .biography-content {
    background: transparent;
    box-shadow: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    padding: 20px 25px;
    border-radius: 0;
    height: auto;
    min-height: 360px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .content.hidden {
    opacity: 0;
    visibility: hidden;
    transform: scale(0.95);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .biography-content.visible {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
    position: relative;
  }

  .content h2 {
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 12px;
  }

  .content .role {
    font-size: 1.1rem;
    text-align: center;
    margin-bottom: 10px;
  }

  .content .specialization,
  .content .experience {
    font-size: 0.95rem;
    text-align: center;
    margin-bottom: 10px;
  }

  .more-btn {
    padding: 12px 24px;
    font-size: 0.95rem;
    margin: 15px auto 0;
    width: fit-content;
  }

  .back-header {
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
  }

  .back-header h3 {
    font-size: 1.3rem;
    text-align: center;
    margin-bottom: 10px;
  }

  .close-btn {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .biography-text {
    padding-right: 0;
    text-align: center;
  }

  .biography-text p {
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 15px;
  }

  .additional-info {
    margin-top: 15px;
  }

  .info-item {
    font-size: 0.95rem;
    text-align: center;
  }

  .role-badge {
    top: 10px;
    right: 10px;
    padding: 8px 14px;
    font-size: 0.8rem;
    border-radius: 20px;
  }

  .badge-icon {
    width: 16px;
    height: 16px;
  }

  .filter-buttons {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .filter-buttons button {
    width: 80%;
    max-width: 300px;
    padding: 10px 20px;
    font-size: 0.95rem;
  }

  .nav-arrow {
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 480px) {
  .testimonials {
    padding: 30px 10px;
  }

  .testimonials h1 {
    font-size: 1.8rem;
  }

  .slide-col {
    height: 520px;
  }

  .specialist-card {
    max-width: 320px;
    height: 480px;
  }

  .hero {
    width: 120px;
    height: 120px;
    margin-top: 15px;
  }

  .content,
  .biography-content {
    padding: 15px 20px;
    min-height: 320px;
  }

  .content h2 {
    font-size: 1.2rem;
  }

  .content .role {
    font-size: 1rem;
  }

  .content .specialization,
  .content .experience {
    font-size: 0.9rem;
  }

  .biography-text p {
    font-size: 0.9rem;
  }

  .more-btn {
    padding: 10px 20px;
    font-size: 0.9rem;
  }

  .back-header h3 {
    font-size: 1.2rem;
  }

  .filter-buttons button {
    font-size: 0.9rem;
  }

  .nav-arrow {
    width: 45px;
    height: 45px;
  }

  .role-badge {
    padding: 7px 12px;
    font-size: 0.75rem;
  }

  .badge-icon {
    width: 14px;
    height: 14px;
  }
}
</style>