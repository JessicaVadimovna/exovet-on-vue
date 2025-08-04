<template>
  <div class="container">
    <!-- Contact Header -->
    <div
      class="header"
      :style="{ opacity: headerOpacity, transform: `translateY(${headerY}px)` }"
    >
      <!-- Animated background elements -->
      <div
        class="heart-bg"
        :style="{ transform: `translate(${heartX}px, ${heartY}px)` }"
      >
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </div>
      
      <div
        class="stethoscope-bg"
        :style="{ transform: `translate(${stethoscopeX}px, ${stethoscopeY}px) rotate(${stethoscopeRotate}deg)` }"
      >
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 2v8a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a6 6 0 0 0-5-5.92V2m0 0H9m3 0V4m6 14a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        </svg>
      </div>
      
      <div
        class="circle-bg"
        :style="{ transform: `scale(${circleScale})`, opacity: circleOpacity }"
      >
        <div class="circle"></div>
      </div>

      <div class="header-content">
        <div
          class="heart-container"
          :style="{ transform: `scale(${heartScale})` }"
        >
          <svg class="heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        
        <h1
          class="title"
          :style="{ opacity: titleOpacity }"
        >
          Контакты
        </h1>
        
        <p
          class="description"
          :style="{ opacity: descriptionOpacity }"
        >
          Ветеринарная клиника в Иркутске. Заботимся о здоровье ваших питомцев с любовью и профессионализмом.
        </p>
      </div>
    </div>

    <!-- Contact Cards and Working Hours -->
    <div class="grid">
      <!-- Contact Cards -->
      <div v-for="(card, index) in contactCards" :key="index" class="card-container">
        <div
          class="card"
          :style="{ 
            opacity: cardOpacity[index], 
            transform: `translateY(${cardY[index]}px)`,
            transition: 'all 0.3s ease'
          }"
          @mouseenter="handleCardHover(index, true)"
          @mouseleave="handleCardHover(index, false)"
        >
          <div
            class="card-overlay"
            :style="{ 
              opacity: cardOverlayOpacity[index],
              transform: `scale(${cardOverlayScale[index]})`
            }"
          ></div>
          <div class="card-content">
            <div
              class="card-header"
              :style="{ transform: `scale(${cardHeaderScale[index]})` }"
            >
              <div class="icon-container">
                <component :is="card.icon" class="icon" />
              </div>
              <h3 class="card-title">{{ card.title }}</h3>
            </div>
            
            <p class="card-text">{{ card.content }}</p>
            
            <div
              v-if="card.actionButton"
              class="button-container"
              :style="{ transform: `scale(${cardButtonScale[index]})` }"
            >
              <a
                :href="card.actionButton.href"
                :target="card.actionButton.href.startsWith('http') ? '_blank' : undefined"
                :rel="card.actionButton.href.startsWith('http') ? 'noopener noreferrer' : undefined"
                class="button"
                @mouseenter="cardButtonScale[index] = 1.02"
                @mouseleave="cardButtonScale[index] = 1"
                @mousedown="cardButtonScale[index] = 0.98"
                @mouseup="cardButtonScale[index] = 1"
              >
                <component :is="card.actionButton.icon" class="button-icon" />
                {{ card.actionButton.text }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Working Hours -->
      <div class="working-hours">
        <div
          class="working-hours-card"
          :style="{ 
            opacity: workingHoursOpacity, 
            transform: `scale(${workingHoursScale})` 
          }"
        >
          <div class="working-hours-header">
            <div
              class="working-hours-icon"
              :style="{ transform: `rotate(${clockRotate}deg)` }"
            >
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h4 class="working-hours-title">Режим работы</h4>
          </div>
          <div class="working-hours-content">
            <div class="working-hours-row">
              <span class="working-hours-label">Ежедневно</span>
              <span class="working-hours-time">10:00 - 20:00</span>
            </div>
            
            <div class="working-hours-status">
              <div
                class="status-icon"
                :style="{ transform: `scale(${statusScale})` }"
              >
                <svg :class="['icon', isOpen ? 'text-green-500' : 'text-gray-400']" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <span :class="[isOpen ? 'text-green-600' : 'text-gray-500']">
                {{ isOpen ? 'Сейчас открыто' : 'Сейчас закрыто' }}
              </span>
            </div>
            
            <p class="working-hours-note">
              * Приём по предварительному звонку
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      headerOpacity: 0,
      headerY: -30,
      heartX: 0,
      heartY: 0,
      stethoscopeX: 0,
      stethoscopeY: 0,
      stethoscopeRotate: 0,
      circleScale: 1,
      circleOpacity: 0.1,
      heartScale: 0,
      titleOpacity: 0,
      descriptionOpacity: 0,
      cardOpacity: [0, 0, 0],
      cardY: [20, 20, 20],
      cardOverlayOpacity: [0, 0, 0],
      cardOverlayScale: [1, 1, 1],
      cardHeaderScale: [1, 1, 1],
      cardButtonScale: [1, 1, 1],
      workingHoursOpacity: 0,
      workingHoursScale: 0.9,
      clockRotate: 0,
      statusScale: 1,
      currentHour: new Date().getHours(),
      contactCards: [
        {
          icon: 'MapPinIcon',
          title: 'Адрес',
          content: 'г. Иркутск, ул. Ленина, д. 123',
          actionButton: {
            text: 'Открыть карту',
            href: 'https://maps.google.com',
            icon: 'MapPinIcon',
          },
        },
        {
          icon: 'PhoneIcon',
          title: 'Телефон',
          content: '+7 (3952) 123-45-67',
          actionButton: {
            text: 'Позвонить',
            href: 'tel:+739521234567',
            icon: 'PhoneIcon',
          },
        },
        {
          icon: 'MailIcon',
          title: 'Email',
          content: 'info@vetclinic-irk.ru',
          actionButton: {
            text: 'Написать',
            href: 'mailto:info@vetclinic-irk.ru',
            icon: 'SendIcon',
          },
        },
      ],
    };
  },
  computed: {
    isOpen() {
      return this.currentHour >= 10 && this.currentHour < 20;
    },
  },
  methods: {
    handleCardHover(index, isHovering) {
      this.cardOverlayOpacity[index] = isHovering ? 1 : 0;
      this.cardOverlayScale[index] = isHovering ? 1.1 : 1;
      this.cardHeaderScale[index] = isHovering ? 1.05 : 1;
      this.cardY[index] = isHovering ? -5 : 0;
      this.cardOpacity[index] = isHovering ? 1 : 1;
    },
    animate() {
      // Header animations
      setTimeout(() => {
        this.headerOpacity = 1;
        this.headerY = 0;
      }, 100);

      setTimeout(() => {
        this.heartScale = 1;
      }, 400);

      setTimeout(() => {
        this.titleOpacity = 1;
      }, 600);

      setTimeout(() => {
        this.descriptionOpacity = 1;
      }, 800);

      // Background animations
      let heartTime = 0;
      const animateHeart = () => {
        heartTime += 0.05;
        this.heartX = Math.sin(heartTime) * 100;
        this.heartY = Math.cos(heartTime) * -50;
        requestAnimationFrame(animateHeart);
      };

      let stethoscopeTime = 0;
      const animateStethoscope = () => {
        stethoscopeTime += 0.05;
        this.stethoscopeX = Math.sin(stethoscopeTime) * -80;
        this.stethoscopeY = Math.cos(stethoscopeTime) * 60;
        this.stethoscopeRotate = (stethoscopeTime * 180 / Math.PI) % 360;
        requestAnimationFrame(animateStethoscope);
      };

      let circleTime = 0;
      const animateCircle = () => {
        circleTime += 0.05;
        this.circleScale = 1 + Math.sin(circleTime) * 0.2;
        this.circleOpacity = 0.1 + Math.sin(circleTime) * 0.2;
        requestAnimationFrame(animateCircle);
      };

      // Card animations
      this.contactCards.forEach((_, index) => {
        setTimeout(() => {
          this.cardOpacity[index] = 1;
          this.cardY[index] = 0;
        }, 300 + index * 200);
      });

      // Working hours animations
      setTimeout(() => {
        this.workingHoursOpacity = 1;
        this.workingHoursScale = 1;
      }, 600);

      let clockTime = 0;
      const animateClock = () => {
        clockTime += 0.05;
        this.clockRotate = (clockTime * 180 / Math.PI) % 360;
        requestAnimationFrame(animateClock);
      };

      if (this.isOpen) {
        let statusTime = 0;
        const animateStatus = () => {
          statusTime += 0.05;
          this.statusScale = 1 + Math.sin(statusTime) * 0.2;
          requestAnimationFrame(animateStatus);
        };
        animateStatus();
      }

      animateHeart();
      animateStethoscope();
      animateCircle();
      animateClock();
    },
  },
  mounted() {
    this.animate();
  },
  components: {
    MapPinIcon: {
      template: `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      `,
    },
    PhoneIcon: {
      template: `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      `,
    },
    MailIcon: {
      template: `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      `,
    },
    SendIcon: {
      template: `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      `,
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.header {
  position: relative;
  overflow: hidden;
  background: linear-gradient(to bottom right, #fce4ec, #f8bbd0, #f48fb1);
  color: white;
  padding: 4rem 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  transition: all 0.6s ease;
}

.heart-bg, .stethoscope-bg {
  position: absolute;
  opacity: 0.2;
}

.heart-bg {
  top: 2.5rem;
  left: 2.5rem;
}

.stethoscope-bg {
  top: 5rem;
  right: 5rem;
}

.circle-bg {
  position: absolute;
  bottom: -2.5rem;
  right: -2.5rem;
}

.circle {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background: white;
}

.header-content {
  position: relative;
  text-align: center;
  max-width: 64rem;
  margin: 0 auto;
}

.heart-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  backdrop-filter: blur(4px);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.heart-icon {
  width: 2.5rem;
  height: 2.5rem;
}

.title {
  font-size: 2.25rem;
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
  transition: opacity 0.5s ease;
}

.description {
  font-size: 1.25rem;
  color: #fce4ec;
  max-width: 32rem;
  margin: 0 auto;
  line-height: 1.5;
  transition: opacity 0.5s ease;
}

.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card-container {
  height: 100%;
}

.card {
  height: 100%;
  background: linear-gradient(to bottom right, white, #fff5f7);
  border: 1px solid #fce4ec;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
  border-radius: 0.75rem;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom right, rgba(252, 228, 236, 0.2), transparent);
  transition: all 0.3s ease;
}

.card-content {
  padding: 1.5rem;
  position: relative;
  z-index: 10;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.icon-container {
  padding: 0.75rem;
  background: linear-gradient(to bottom right, #f8bbd0, #f48fb1);
  color: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-title {
  color: #37474f;
}

.card-text {
  color: #607d8b;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.button-container {
  transition: all 0.3s ease;
}

.button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(to right, #f8bbd0, #f48fb1);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.button:hover {
  background: linear-gradient(to right, #f48fb1, #ec407a);
}

.button-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.working-hours {
  width: 100%;
}

.working-hours-card {
  background: linear-gradient(to bottom right, white, #f5f5f5);
  border: 1px solid #eceff1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.75rem;
  transition: all 0.5s ease;
}

.working-hours-header {
  padding: 1.5rem 1.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.working-hours-icon {
  padding: 0.5rem;
  background: linear-gradient(to bottom right, #b0bec5, #90a4ae);
  color: white;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.working-hours-title {
  color: #37474f;
}

.working-hours-content {
  padding: 0 1.5rem 1.5rem;
}

.working-hours-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.working-hours-label {
  color: #607d8b;
}

.working-hours-time {
  color: #37474f;
}

.working-hours-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: linear-gradient(to right, #fff5f7, #f5f5f5);
  border: 1px solid #fce4ec;
}

.status-icon {
  transition: all 0.3s ease;
}

.working-hours-note {
  font-size: 0.875rem;
  color: #90a4ae;
  font-style: italic;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

.heart-bg .icon,
.stethoscope-bg .icon {
  width: 3rem;
  height: 3rem;
}

@media (min-width: 768px) {
  .title {
    font-size: 3rem;
  }
}
</style>