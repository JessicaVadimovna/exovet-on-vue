<template>
  <section id="contacts" class="contacts">
    <div class="contacts-container">
      <div class="header">
        <h1>
          <i class="fas fa-paw paw-animate"></i> 
          Ветеринарная клиника "ЭкзоВет" 
          <i class="fas fa-paw paw-animate"></i>
        </h1>
        <p class="subtitle">Профессиональная забота о ваших любимцах</p>
      </div>

      <transition-group name="fade" tag="div" class="contacts-grid">
        <div class="contact-card" key="address">
          <h2><i class="fas fa-map-marker-alt"></i> Наш адрес</h2>
          <div class="contact-info">
            <div class="contact-item">
              <i class="fas fa-hospital"></i>
              <div class="contact-text">
                <h3>Адрес клиники</h3>
                <p><a href="https://go.2gis.com/eA8Qs" target="_blank">г. Иркутск, ул. Декабрьских Событий, 105в</a></p>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-card" key="contact">
          <h2><i class="fas fa-phone"></i> Связаться с нами</h2>
          <div class="contact-info">
            <div class="contact-item">
              <i class="fas fa-phone-alt"></i>
              <div class="contact-text">
                <h3>Телефон</h3>
                <p><a href="tel:+79526220616">+7 (952) 622-06-16</a></p>
              </div>
            </div>
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <div class="contact-text">
                <h3>Email</h3>
                <p><a href="mailto:exovet_irk@mail.ru">exovet_irk@mail.ru</a></p>
              </div>
            </div>
            <div class="contact-item">
              <i class="fas fa-comment-dots"></i>
              <div class="contact-text">
                <h3>Социальные сети</h3>
                <div class="social-icons">
                  <a href="https://wa.me/79526220616" class="social-icon" aria-label="WhatsApp">
                    <i class="fab fa-whatsapp"></i>
                  </a>
                  <a href="https://t.me/exovet_irk" class="social-icon" aria-label="Telegram">
                    <i class="fab fa-telegram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <a href="tel:+79526220616" class="contact-button">
            <i class="fas fa-phone"></i> Позвонить сейчас
          </a>
        </div>
      </transition-group>

      <div class="hours-card">
        <h2><i class="fas fa-clock"></i> Режим работы</h2>
        <div class="hours-text">
          <p>Ежедневно с 10:00 до 20:00</p>
          <p><strong>По предварительной записи</strong></p>
        </div>
      </div>

      <div class="telegram-section">
        <h2><i class="fab fa-telegram"></i> Наш Telegram-канал</h2>
        <p>Подписывайтесь, чтобы быть в курсе новостей и акций!</p>
        <a href="https://t.me/exovet_irk" target="_blank" class="telegram-button">
          <i class="fab fa-telegram-plane"></i> Перейти в Telegram
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Contacts'
})
</script>

<style scoped>
:root {
  --primary-color: #FFCDD2; /* Soft pink */
  --secondary-color: #B0BEC5; /* Light gray */
  --accent-color: #F06292; /* Vibrant pink for links and highlights */
  --card-background: #FFFFFF;
  --text-color: #37474F;
  --background-gradient: linear-gradient(135deg, #FCE4EC 0%, #ECEFF1 100%);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.contacts {
  background: var(--background-gradient);
  padding: 80px 20px;
  color: var(--text-color);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  min-height: calc(100vh - 200px);
  overflow: hidden;
}

.contacts-container {
  max-width: 1280px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 60px;
  padding: 40px 20px;
  position: relative;
}

.header h1 {
  font-size: 3rem;
  font-weight: 800;
  color: var(--primary-color);
  letter-spacing: -0.025em;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header .subtitle {
  font-size: 1.25rem;
  color: var(--secondary-color);
  max-width: 700px;
  margin: 0 auto;
  font-weight: 400;
}

.paw-animate {
  color: var(--accent-color);
  transition: transform 0.3s ease;
}

.paw-animate:hover {
  transform: rotate(20deg);
}

.contacts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-bottom: 64px;
}

.contact-card {
  background: var(--card-background);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s;
}

.contact-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.contact-card h2 {
  color: var(--accent-color);
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
  position: relative;
}

.contact-card h2::after {
  content: '';
  width: 60px;
  height: 3px;
  background: var(--accent-color);
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
}

.contact-info {
  margin-bottom: 24px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
}

.contact-item i {
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-right: 16px;
  min-width: 28px;
  margin-top: 4px;
  transition: transform 0.3s ease;
}

.contact-item:hover i {
  transform: scale(1.2);
}

.contact-text h3 {
  color: var(--text-color);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.contact-text p {
  font-size: 1.125rem;
  color: var(--text-color);
}

.contact-text a {
  color: var(--accent-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-text a:hover {
  color: #D81B60;
}

.social-icons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 16px;
}

.social-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #FFEBEE, #FCE4EC);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, background 0.3s ease;
}

.social-icon:hover {
  transform: scale(1.15);
  background: var(--accent-color);
}

.social-icon i {
  color: var(--text-color);
  font-size: 24px;
}

.social-icon:hover i {
  color: #FFFFFF;
}

.contact-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, var(--accent-color), #D81B60);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.contact-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.hours-card {
  background: var(--card-background);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  text-align: center;
  margin-bottom: 64px;
  transition: transform 0.3s;
}

.hours-card:hover {
  transform: translateY(-8px);
}

.hours-card h2 {
  color: var(--accent-color);
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 24px;
}

.hours-text {
  font-size: 1.25rem;
  color: var(--text-color);
  background: var(--secondary-color);
  padding: 24px;
  border-radius: 16px;
  line-height: 1.6;
}

.hours-text strong {
  color: var(--accent-color);
}

.map-container {
  height: 450px;
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  margin-bottom: 64px;
  position: relative;
  overflow: hidden;
}

.map-container iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 24px;
}

.map-container small {
  display: block;
  margin-top: 16px;
  text-align: center;
  font-size: 1rem;
  color: var(--text-color);
}

.map-container small a {
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.map-container small a:hover {
  color: #D81B60;
  text-decoration: underline;
}

.telegram-section {
  background: linear-gradient(135deg, var(--accent-color), #D81B60);
  color: white;
  border-radius: 24px;
  padding: 48px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  margin-bottom: 64px;
  position: relative;
  overflow: hidden;
}

.telegram-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  opacity: 0.3;
}

.telegram-section h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 24px;
  position: relative;
}

.telegram-section p {
  font-size: 1.25rem;
  margin-bottom: 32px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.telegram-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: white;
  color: var(--accent-color);
  padding: 16px 32px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.125rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.telegram-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  background: #FCE4EC;
}

footer {
  text-align: center;
  padding: 40px 0;
  color: var(--secondary-color);
  font-size: 1.125rem;
  font-weight: 500;
}

.paw-icon {
  color: var(--accent-color);
  font-size: 2rem;
  margin: 0 12px;
  transition: transform 0.3s ease;
}

.paw-icon:hover {
  transform: rotate(20deg);
}

/* Animation for cards */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .contacts-grid {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 2.25rem;
  }

  .telegram-section h2 {
    font-size: 1.75rem;
  }

  .map-container {
    height: 350px;
  }
}

@media (max-width: 480px) {
  .contacts {
    padding: 40px 16px;
  }

  .contact-card {
    padding: 24px;
  }

  .telegram-section {
    padding: 32px;
  }
}
</style>