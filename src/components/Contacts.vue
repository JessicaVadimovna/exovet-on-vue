<template>
  <div class="container">
    <!-- Contact Header -->
    <div class="header">
      <div class="header-content">
        <div class="phone-container">
<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-phone"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>
        </div>
        
        <h1 class="title">Контакты</h1>
        
        <div class="description">
          <p class="description-text">
            Ветеринарная клиника для экзотических животных в Иркутске. Заботимся о здоровье ваших питомцев с любовью и профессионализмом.
          </p>
          <div class="working-hours">
            <div class="working-hours-header">
              <div class="icon-container working-hours-icon">
                <ClockIcon class="icon" />
              </div>
              <h3 class="working-hours-title">Режим работы</h3>
            </div>
            <div class="working-hours-content">
              <div class="working-hours-row">
                <span class="working-hours-label">Ежедневно</span>
                <span class="working-hours-time">10:00–20:00</span>
              </div>
              <div class="working-hours-status">
                <span class="status-icon" :class="{ 'open': isOpen, 'closed': !isOpen }">
                  {{ isOpen ? 'Открыто' : 'Закрыто' }}
                </span>
              </div>
              <p class="working-hours-note">* Приём по предварительному звонку</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Cards -->
    <div class="grid">
      <div v-for="(card, index) in contactCards.slice(0, 4)" :key="'contact-' + index" class="card-container">
        <div
          class="card"
          @mouseenter="handleCardHover(index, true)"
          @mouseleave="handleCardHover(index, false)"
        >
          <div class="card-overlay"></div>
          <div class="card-content">
            <div class="card-header">
              <div class="icon-container">
                <component :is="card.icon" class="icon" />
              </div>
              <h3 class="card-title">{{ card.title }}</h3>
            </div>
            
            <p class="card-text">{{ card.content }}</p>
            
            <div v-if="card.actionButton" class="button-container">
              <a
                :href="card.actionButton.href"
                :target="card.actionButton.href.startsWith('http') ? '_blank' : undefined"
                :rel="card.actionButton.href.startsWith('http') ? 'noopener noreferrer' : undefined"
                class="button"
              >
                <component :is="card.actionButton.icon" class="button-icon" />
                {{ card.actionButton.text }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Telegram Card -->
    <div class="telegram-container">
      <div
        class="card telegram-card"
        @mouseenter="handleCardHover(4, true)"
        @mouseleave="handleCardHover(4, false)"
      >
        <div class="card-overlay"></div>
        <div class="card-content">
          <div class="card-header">
            <div class="icon-container">
              <component :is="contactCards[4].icon" class="icon" />
            </div>
            <h3 class="card-title">{{ contactCards[4].title }}</h3>
          </div>
          
          <p class="card-text">{{ contactCards[4].content }}</p>
          
          <div v-if="contactCards[4].actionButton" class="button-container">
            <a
              :href="contactCards[4].actionButton.href"
              :target="contactCards[4].actionButton.href.startsWith('http') ? '_blank' : undefined"
              :rel="contactCards[4].actionButton.href.startsWith('http') ? 'noopener noreferrer' : undefined"
              class="button"
            >
              <component :is="contactCards[4].actionButton.icon" class="button-icon" />
              {{ contactCards[4].actionButton.text }}
            </a>
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
        {
          icon: 'WhatsAppIcon',
          title: 'WhatsApp',
          content: '+7 (3952) 123-45-67',
          actionButton: {
            text: 'Написать в WhatsApp',
            href: 'https://wa.me/+739521234567',
            icon: 'WhatsAppIcon',
          },
        },
        {
          icon: 'TelegramIcon',
          title: 'Telegram',
          content: 'Подписывайтесь на @VetClinicIrk —  Получайте экспертные советы, новости клиники и специальные предложения. Задавайте вопросы ветеринарам и будьте в курсе всего, что важно для ваших питомцев!',
          actionButton: {
            text: 'Перейти в Telegram',
            href: 'https://t.me/VetClinicIrk',
            icon: 'TelegramIcon',
          },
        },
      ],
    };
  },
  computed: {
    isOpen() {
      const currentHour = new Date().getHours();
      return currentHour >= 10 && currentHour < 20;
    },
  },
  methods: {
    handleCardHover(index, isHovering) {
      this.$set(this.cardOpacity, index, isHovering ? 1 : 1);
    },
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
    ClockIcon: {
      template: `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      `,
    },
    WhatsAppIcon: {
      template: `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.45 3.45 1.32 4.95L2 22l5.29-1.39c1.45.87 3.08 1.33 4.75 1.33 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm-1.83 16.13a8.37 8.37 0 0 1-4.25-1.15l-.3-.18-3.14.83.85-3.06-.19-.31a8.27 8.27 0 0 1-1.26-4.43c0-4.6 3.75-8.35 8.35-8.35s8.35 3.75 8.35 8.35-3.75 8.35-8.36 8.35zm4.94-6.07c-.27-.14-1.61-.8-1.86-.89-.25-.09-.43-.14-.62.14-.19.28-.73.89-.89 1.07-.17.18-.34.2-.62.07-.28-.14-1.18-.44-2.25-1.41-.83-.75-1.39-1.68-1.55-1.96-.17-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.19-.29.28-.48.09-.19.05-.36-.02-.51-.08-.14-.62-1.5-.85-2.06-.23-.55-.46-.47-.62-.48-.16-.01-.34-.02-.52-.02s-.48.07-.73.36c-.25.28-.96.96-.96 2.34s.98 2.73 1.12 2.92c.14.19 1.94 2.96 4.7 4.15.66.28 1.18.45 1.58.58.67.22 1.27.19 1.75.11.53-.09 1.61-.66 1.84-1.29.23-.64.23-1.18.16-1.29-.07-.11-.25-.18-.52-.32z"/>
        </svg>
      `,
    },
    TelegramIcon: {
      template: `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 2.5L2.5 12.5l5 2.5 8-5-6.5 4.5 7 5.5L22 2.5z"/>
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
  padding: 1.5rem 1rem;
}

.header {
  position: relative;
  background: linear-gradient(to bottom right, #f7e4e9, #f0d3e0);
  color: #37474f;
  padding: 2rem 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.header-content {
  text-align: center;
  max-width: 48rem;
  margin: 0 auto;
}

.phone-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
}

.description {
  font-size: 1rem;
  color: #455a64;
  max-width: 28rem;
  margin: 0 auto;
  line-height: 1.6;
}

.description-text {
  margin-bottom: 1rem;
}

.working-hours {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  padding: 0.75rem;
  text-align: left;
  max-width: 16rem;
  margin: 0 auto;
}

.working-hours-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.working-hours-icon {
  padding: 0.4rem;
  background: linear-gradient(to bottom right, #b0bec5, #90a4ae);
  color: white;
  border-radius: 50%;
}

.working-hours-title {
  color: #37474f;
  font-size: 1rem;
  font-weight: 500;
}

.working-hours-content {
  padding: 0.25rem 0;
}

.working-hours-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.working-hours-label {
  color: #455a64;
  font-weight: 500;
}

.working-hours-time {
  color: #37474f;
}

.working-hours-status {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem;
  border-radius: 0.4rem;
  background: rgba(255, 255, 255, 0.25);
}

.status-icon {
  color: #37474f;
  font-weight: 500;
}

.status-icon.open {
  color: #2e7d32;
}

.status-icon.closed {
  color: #c62828;
}

.working-hours-note {
  font-size: 0.75rem;
  color: #546e7a;
  font-style: italic;
  margin-top: 0.4rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.telegram-container {
  display: flex;
  justify-content: center;
}

.card-container {
  height: 100%;
}

.card {
  height: 100%;
  background: white;
  border: 1px solid #eceff1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  border-radius: 0.5rem;
}

.telegram-card {
  width: 100%;
  max-width: 1200px;
  padding: 1.5rem;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom right, rgba(247, 228, 233, 0.1), transparent);
}

.card-content {
  padding: 1rem;
  position: relative;
  z-index: 10;
}

.telegram-card .card-content {
  padding: 1.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.telegram-card .card-header {
  margin-bottom: 1rem;
}

.icon-container {
  padding: 0.5rem;
  background: linear-gradient(to bottom right, #f0d3e0, #e8c5d6);
  color: white;
  border-radius: 50%;
}

.telegram-card .icon-container {
  padding: 0.75rem;
}

.card-title {
  color: #263238;
  font-size: 1.1rem;
  font-weight: 500;
}

.telegram-card .card-title {
  font-size: 1.25rem;
}

.card-text {
  color: #546e7a;
  margin-bottom: 0.75rem;
  line-height: 1.5;
  font-size: 0.95rem;
}

.telegram-card .card-text {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.button-container {
  transition: all 0.3s ease;
}

.button {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: linear-gradient(to right, #f0d3e0, #e8c5d6);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 0.4rem;
  text-decoration: none;
  font-size: 0.9rem;
}

.telegram-card .button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.button:hover {
  background: linear-gradient(to right, #e8c5d6, #e0b7cc);
}

.button-icon {
  width: 1rem;
  height: 1rem;
}

.telegram-card .button-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.icon {
  width: 1rem;
  height: 1rem;
}

.telegram-card .icon {
  width: 1.25rem;
  height: 1.25rem;
}

@media (min-width: 768px) {
  .title {
    font-size: 2.25rem;
  }
}
</style>