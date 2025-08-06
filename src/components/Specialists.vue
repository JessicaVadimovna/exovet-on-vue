<template>
  <main class="testimonials">
    <h1>Наша <span class="highlight">команда</span></h1>

    <!-- Фильтры -->
    <div class="filter-buttons">
      <button
        v-for="filter in filterOptions"
        :key="filter.value"
        :class="{ active: activeFilter === filter.value }"
        @click="activeFilter = filter.value; updateSlider()"
      >
        {{ filter.label }} ({{ filter.count }})
      </button>
    </div>

    <div class="slider">
      <div class="slide-row" ref="slideRow">
        <div v-for="member in filteredMembers" :key="'member-' + member.id" class="slide-col">
          <div class="content">
            <!-- <p>{{ member.biography }}</p> -->
            <h2>{{ member.name }}</h2>
            <p>{{ member.role }}</p>
            <p v-if="member.specialization" class="specialization">{{ member.specialization }}</p>
            <p v-if="member.experience" class="experience">Опыт: {{ member.experience }}</p>
                        <button class="more-btn" @click="currentIndex = filteredMembers.indexOf(member); updateSlider()">
              Подробнее
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <!-- <p v-if="member.pets" class="pets">Питомцы: {{ member.pets }}</p> -->
          </div>
          <div class="hero">
            <img :src="member.image" alt="avatar" />
            <div class="role-badge" :class="getRoleBadgeClass(member.roleType)">
              <svg class="badge-icon" viewBox="0 0 24 24">
                <path :d="getRoleIcon(member.roleType)" />
              </svg>
              <span>{{ getRoleLabel(member.roleType) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="indicator" v-if="filteredMembers.length > 1">
      <span
        v-for="(member, index) in filteredMembers"
        :key="'indicator-' + index"
        class="btn"
        :class="{ active: currentIndex === index }"
        @click="currentIndex = index; updateSlider()"
      ></span>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'

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
    const slideRow = ref<HTMLElement | null>(null)
    const main = ref<HTMLElement | null>(null)

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
      currentIndex.value = 0 // Reset index when filter changes
      return members
    })

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

    const updateSlider = () => {
      if (slideRow.value && main.value) {
        const mainWidth = main.value.offsetWidth
        const translateValue = currentIndex.value * -mainWidth
        slideRow.value.style.transform = `translateX(${translateValue}px)`
      }
    }

    onMounted(() => {
      main.value = document.querySelector('main')
      updateSlider()
      window.addEventListener('resize', updateSlider)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateSlider)
    })

    return {
      teamMembers,
      filterOptions,
      activeFilter,
      filteredMembers,
      currentIndex,
      slideRow,
      main,
      updateSlider,
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
  width: 1200px;
  padding: 80px 15px;
  position: relative;
  margin: 0 auto;
}

.testimonials h1 {
  text-align: center;
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-family: 'Playfair Display', serif;
  color: #83557b;
  margin-bottom: 40px;
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
  font-family: 'Poppins', sans-serif;
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

.slider {
  width: 100%;
  overflow: hidden;
}

.slide-row {
  display: flex;
  width: calc(100% * var(--slide-count));
  transition: transform 0.5s ease;
}

.slide-col {
  position: relative;
  width: 100%;
  height: 400px;
  flex-shrink: 0;
}

.hero {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
}

.hero img {
  height: 100%;
  width: 320px;
  object-fit: cover;
  border-radius: 10px;
  pointer-events: none;
  user-select: none;
}

.content {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 520px;
  height: 270px;
  color: #4d4352;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.5px);
  border-radius: 10px;
  padding: 45px;
  z-index: 2;
  user-select: none;
}

.content p {
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.3;
}

.content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 35px;
  color: #4d4352;
}

.content .specialization,
.content .experience,
.content .pets {
  font-size: 0.95rem;
  font-style: italic;
  color: #6b5a60;
  margin-top: 10px;
}

.role-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 20px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
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
  width: 16px;
  height: 16px;
  fill: currentColor;
  flex-shrink: 0;
}

.indicator {
  display: flex;
  justify-content: center;
  margin-top: 4rem;
}

.indicator .btn {
  display: inline-block;
  height: 15px;
  width: 15px;
  margin: 4px;
  border-radius: 15px;
  background: #fff;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
}

.indicator .btn.active {
  width: 30px;
  background: #d67a8f;
}

@media (max-width: 850px) {
  .testimonials {
    width: 500px;
  }

  .slide-row {
    width: calc(100% * var(--slide-count));
  }

  .slide-col {
    width: 100%;
    height: 250px;
  }

  .hero img {
    width: 200px;
  }

  .content {
    width: 320px;
    height: 200px;
    padding: 20px;
  }

  .content p {
    font-size: 0.9rem;
  }

  .content h2 {
    font-size: 1.2rem;
    margin-top: 20px;
  }

  .content .specialization,
  .content .experience,
  .content .pets {
    font-size: 0.85rem;
  }

  .role-badge {
    font-size: 0.7rem;
    padding: 6px 10px;
  }

  .badge-icon {
    width: 14px;
    height: 14px;
  }
}

@media (max-width: 550px) {
  .testimonials {
    width: 300px;
  }

  .slide-row {
    width: calc(100% * var(--slide-count));
  }

  .slide-col {
    width: 100%;
    height: 300px;
  }

  .hero {
    top: 60%;
    height: 100px;
    z-index: 5;
  }

  .hero img {
    width: 100px;
  }

  .content {
    width: 300px;
  }

  .role-badge {
    font-size: 0.65rem;
    padding: 5px 8px;
  }

  .badge-icon {
    width: 12px;
    height: 12px;
  }
}
</style>