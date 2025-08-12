.role-badge {
    top: 12px;
    right: 12px;
    padding: 8px 12px;
    font-size: 0.7rem;
    gap: 6px;
  }

  .badge-icon {
    width: 16px;
    height: 16px;
  }<template>
  <main class="testimonials">
    <h1>Наша <span class="highlight">команда</span></h1>

    <!-- Фильтры -->
    <div class="filter-buttons">
      <button
        v-for="filter in filterOptions"
        :key="filter.value"
        :class="{ active: activeFilter === filter.value }"
        @click="activeFilter = filter.value; currentIndex = 0; memberInfoIndex.clear()"
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
            <div class="specialist-card" :class="{ 'career-mode': getCurrentMemberInfoIndex(member.id) === 1 }">
              <!-- Фото специалиста слева -->
              <div class="hero" :class="{ 'hidden-on-mobile': getCurrentMemberInfoIndex(member.id) === 1 }">
                <img :src="member.image" :alt="member.name" />
                <div class="role-badge" :class="[getRoleBadgeClass(member.roleType), { 'hidden-on-mobile': getCurrentMemberInfoIndex(member.id) === 1 }]">
                  <svg class="badge-icon" viewBox="0 0 24 24">
                    <path :d="getRoleIcon(member.roleType)" />
                  </svg>
                  <span>{{ getRoleLabel(member.roleType) }}</span>
                </div>
              </div>
              
              <!-- Контент справа -->
              <div class="content-wrapper" :class="{ 'full-width': getCurrentMemberInfoIndex(member.id) === 1 }">
                <div class="content">
                  <!-- Основная информация -->
                  <div class="info-slide" v-show="getCurrentMemberInfoIndex(member.id) === 0">
                    <h2>{{ member.name }}</h2>
                    <p class="role">{{ member.role }}</p>
                    <p v-if="member.specialization" class="specialization">{{ member.specialization }}</p>
                    <p v-if="member.experience" class="experience">Опыт: {{ member.experience }}</p>
                  </div>
                  
                  <!-- Карьерный путь -->
                  <div class="info-slide" v-show="getCurrentMemberInfoIndex(member.id) === 1">
                    <h2 class="career-name">{{ member.name }}</h2>
                    <p class="biography-text">{{ member.biography }}</p>
                    <div class="pets-section">
                      <p class="pets-title">Питомцы</p>
                      <p v-if="member.pets" class="pets-text-inline">{{ member.pets }}</p>
                      <p v-else class="pets-text-inline">Пока нет питомцев, но каждый пациент получает максимум заботы и внимания.</p>
                    </div>
                  </div>
                </div>
                
                <!-- Внутренняя пагинация -->
                <div class="info-pagination">
                  <span
                    v-for="index in 2"
                    :key="`info-${member.id}-${index-1}`"
                    class="info-bar"
                    :class="{ active: getCurrentMemberInfoIndex(member.id) === index-1 }"
                    @click="setMemberInfoIndex(member.id, index-1)"
                  ></span>
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
        biography: 'Выросла в семье врачей, но выбрала ветеринарию, потому что с животными теплее. Особенно любит кошек и экзотических животных. Ценит команду Exovet за поддержку и взаимоуважение. За день видит столько животных, сколько другие не встречают и за год, отдавая каждому тепло и внимание.',
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
        biography: 'Начала с курсов груминга и работы в салоне, где старалась спасать жизни малышей в колтунах и с паразитами. Превращает каждое посещение клиники в курорт для пушистиков, создавая атмосферу безопасности.',
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
    const memberInfoIndex = ref(new Map<number, number>())

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

    const getCurrentMemberInfoIndex = (memberId: number) => {
      return memberInfoIndex.value.get(memberId) || 0
    }

    const setMemberInfoIndex = (memberId: number, index: number) => {
      memberInfoIndex.value.set(memberId, index)
    }

    const nextSlide = () => {
      if (currentIndex.value < filteredMembers.value.length - 1) {
        currentIndex.value++
      }
    }

    const previousSlide = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--
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
        default: return 'M19.5,8A1.5,1.5 0 0,0 21,6.5A1.5,1.5 0 0,0 19.5,5A1.5,1.5 0 0,0 18,6.5A1.5,1.5 0 0,0 19.5,8M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,12 0 0,0 12,2M15.5,8A1.5,1.5 0 0,0 17,6.5A1.5,1.5 0 0,0 15.5,5A1.5,1.5 0 0,0 14,6.5A1.5,1.5 0 0,0 15.5,8M12,14C13.11,14 14,13.11 14,12C14,10.89 13.11,10 12,10C10.89,10 10,10.89 10,12C10,13.11 10.89,14 12,14Z'
      }
    }

    return {
      teamMembers,
      filterOptions,
      activeFilter,
      filteredMembers,
      currentIndex,
      memberInfoIndex,
      getCurrentMemberInfoIndex,
      setMemberInfoIndex,
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
  padding: 80px 20px;
  position: relative;
  margin: 0 auto;
  background: transparent;
}

.testimonials h1 {
  text-align: center;
  font-size: clamp(2.5rem, 5vw, 3rem);
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
  padding: 0 20px;
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
  gap: 20px;
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
  transform: none;
}

.slider {
  flex: 1;
  overflow: hidden;
  border-radius: 16px;
}

.slide-row {
  display: flex;
  transition: transform 0.5s ease;
  will-change: transform;
}

.slide-col {
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
  width: 100%;
  max-width: 100%;
  height: 450px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 5px dashed rgba(143, 143, 143, 0.2);
  box-shadow: 0 0 2px 1px rgba(187, 181, 248, 0.2);
  margin: 0 -40px;
  transition: all 0.3s ease;
}

.hero {
  width: 40%;
  height: 100%;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.hero:hover img {
  transform: scale(1.05);
}

.content-wrapper {
  flex: 1;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

/* Модификатор для полной ширины контента */
.content-wrapper.full-width {
  flex: 1;
}

.content {
  width: 100%;
  height: 100%;
  padding: 60px 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #4d4352;
}

.info-slide {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.info-pagination {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 10;
}

.info-bar {
  width: 11px;
  height: 11px;
  border-radius: 10px;
  background: rgba(214, 122, 143, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.info-bar.active {
  background: #d67a8f;
  height: 30px;
  box-shadow: 0px 0px 20px rgba(214, 122, 143, 0.3);
}

.info-bar:hover:not(.active) {
  background: rgba(214, 122, 143, 0.5);
}

.career-name {
  font-size: clamp(1.4rem, 2.8vw, 1.8rem) !important;
  font-weight: 700;
  margin-bottom: 15px !important;
  color: #4d4352;
  font-family: 'Playfair Display', serif;
  line-height: 1.2;
}

.pets-section {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid rgba(214, 122, 143, 0.3);
}

.pets-title {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  font-weight: 600;
  color: #d67a8f;
  margin-bottom: 8px;
}

.pets-text-inline {
  font-size: clamp(0.9rem, 1.8vw, 1.1rem);
  line-height: 1.5;
  color: #4d4352;
  font-style: italic;
}

.content h2 {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 700;
  margin-bottom: 20px;
  color: #4d4352;
  font-family: 'Playfair Display', serif;
  line-height: 1.2;
}

.content .role {
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  font-weight: 600;
  color: #d67a8f;
  margin-bottom: 15px;
}

.content .specialization,
.content .experience {
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: #6b5a60;
  margin-bottom: 12px;
  line-height: 1.5;
}

.section-title {
  font-size: clamp(1.3rem, 2.5vw, 1.7rem);
  font-weight: 600;
  color: #d67a8f;
  margin-bottom: 20px;
}

.biography-text {
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.6;
  color: #4d4352;
  text-align: left;
}

.pets-text {
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.6;
  color: #4d4352;
  font-style: italic;
}

.role-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 30px;
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
  width: 22px;
  height: 22px;
  fill: currentColor;
  flex-shrink: 0;
}

/* Скрытие фото и бейджа на маленьких экранах при просмотре карьерного пути */
@media (max-width: 992px) {
  .hero.hidden-on-mobile {
    display: none;
  }

  .role-badge.hidden-on-mobile {
    display: none;
  }

  .specialist-card.career-mode {
    flex-direction: column;
  }

  .specialist-card.career-mode .content-wrapper {
    width: 100%;
  }

  .specialist-card.career-mode .content {
    padding: 40px 50px;
  }
}

/* Адаптивные стили */
@media (max-width: 1200px) {
  .testimonials {
    padding: 60px 20px;
  }

  .specialist-card {
    margin: 0 -20px;
  }

  .slide-col {
    height: 460px;
  }

  .specialist-card {
    height: 420px;
  }

  .content {
    padding: 50px 60px;
  }
}

@media (max-width: 992px) {
  .testimonials {
    padding: 50px 20px;
  }

  .specialist-card {
    margin: 0 -10px;
  }

  .slider-container {
    gap: 15px;
  }

  .nav-arrow {
    width: 55px;
    height: 55px;
  }

  .slide-col {
    height: 520px;
  }

  .specialist-card {
    flex-direction: column;
    height: 480px;
    max-width: 600px;
  }

  .hero {
    width: 100%;
    height: 200px;
    flex-shrink: 0;
  }

  .content-wrapper {
    flex: 1;
    width: 100%;
  }

  .content {
    padding: 40px 50px;
  }

  .info-pagination {
    right: 20px;
    gap: 8px;
  }

  .info-bar {
    width: 9px;
    height: 9px;
  }

  .info-bar.active {
    height: 25px;
  }

  .role-badge {
    top: 15px;
    right: 15px;
    padding: 10px 16px;
    font-size: 0.8rem;
  }

  .badge-icon {
    width: 18px;
    height: 18px;
  }


  .specialist-card.career-mode .content {
    padding: 40px 50px;
  }
}

@media (max-width: 768px) {
  .testimonials {
    padding: 40px 20px;
  }

  .specialist-card {
    margin: 0 -5px;
  }

  .testimonials h1 {
    font-size: 2.2rem;
    margin-bottom: 40px;
  }

  .filter-buttons {
    gap: 12px;
    margin-bottom: 35px;
  }

  .filter-buttons button {
    padding: 12px 20px;
    font-size: 0.9rem;
  }

  .slider-container {
    gap: 12px;
  }

  .nav-arrow {
    width: 50px;
    height: 50px;
  }

  .slide-col {
    height: 580px;
  }

  .specialist-card {
    height: 540px;
    max-width: 500px;
    margin: 0 auto;
    flex-direction: column;
  }

  .hero {
    width: 100%;
    height: 180px;
  }

  .content {
    padding: 35px 40px 35px 40px;
  }

  .info-pagination {
    right: 15px;
    gap: 6px;
  }

  .info-bar {
    width: 8px;
    height: 8px;
  }

  .info-bar.active {
    height: 22px;
  }


  .specialist-card.career-mode .content {
    padding: 35px 40px;
  }
}

@media (max-width: 576px) {
  .testimonials {
    padding: 30px 10px;
  }

  .testimonials h1 {
    font-size: 1.8rem;
    margin-bottom: 30px;
  }

  .filter-buttons {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .filter-buttons button {
    width: 90%;
    max-width: 280px;
    padding: 10px 18px;
    font-size: 0.85rem;
  }

  .slider-container {
    gap: 8px;
  }

  .nav-arrow {
    width: 45px;
    height: 45px;
  }

  .slide-col {
    height: 520px;
  }

  .specialist-card {
    height: 480px;
    max-width: 350px;
    border-radius: 16px;
    flex-direction: column;
  }

  .hero {
    width: 100%;
    height: 160px;
  }

  .content {
    padding: 25px 20px 25px 20px;
  }

  .info-pagination {
    right: 10px;
    gap: 5px;
  }

  .info-bar {
    width: 7px;
    height: 7px;
  }

  .info-bar.active {
    height: 20px;
  }


  .specialist-card.career-mode .content {
    padding: 25px 20px;
  }

  .specialist-card.career-mode .biography-text {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 15px;
  }

  .specialist-card.career-mode .pets-section {
    margin-top: 15px;
    padding-top: 12px;
  }

  .specialist-card.career-mode .pets-title {
    font-size: 1rem;
    margin-bottom: 6px;
  }

  .specialist-card.career-mode .pets-text-inline {
    font-size: 0.85rem;
  }
}

@media (max-width: 400px) {
  .specialist-card {
    max-width: 320px;
    height: 460px;
    flex-direction: column;
  }

  .hero {
    width: 100%;
    height: 140px;
  }

  .content {
    padding: 20px 15px 20px 15px;
  }

  .info-pagination {
    right: 8px;
    gap: 4px;
  }

  .info-bar {
    width: 6px;
    height: 6px;
  }

  .info-bar.active {
    height: 18px;
  }

  .role-badge {
    padding: 6px 10px;
    font-size: 0.65rem;
  }

  .badge-icon {
    width: 14px;
    height: 14px;
  }

  .specialist-card.career-mode .content {
    padding: 20px 15px;
  }

  .specialist-card.career-mode .career-name {
    font-size: 1.2rem !important;
    margin-bottom: 12px !important;
  }

  .specialist-card.career-mode .section-title {
    font-size: 1rem;
    margin-bottom: 12px;
  }

  .specialist-card.career-mode .biography-text {
    font-size: 0.8rem;
    line-height: 1.4;
    margin-bottom: 12px;
  }

  .specialist-card.career-mode .pets-section {
    margin-top: 12px;
    padding-top: 10px;
  }

  .specialist-card.career-mode .pets-title {
    font-size: 0.9rem;
    margin-bottom: 5px;
  }

  .specialist-card.career-mode .pets-text-inline {
    font-size: 0.75rem;
    line-height: 1.3;
  }
}
</style>