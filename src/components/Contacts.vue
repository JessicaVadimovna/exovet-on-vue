<template>
  <section id="contacts" class="contacts">
    <div class="contacts-container">
      <h2>Контакты</h2>
      <div class="contacts-info">
        <p class="contacts-address">
          <strong>Адрес:</strong>
          <a href="https://go.2gis.com/eA8Qs" target="_blank">г. Иркутск, ул. Декабрьских Событий, 105в</a>
        </p>
        <p class="contacts-phone">
          <strong>Телефон:</strong>
          <a href="tel:+79526220616">+7 (952) 622-06-16</a>
        </p>
        <p class="contacts-email">
          <strong>Email:</strong>
          <a href="mailto:exovet_irk@mail.ru">exovet_irk@mail.ru</a>
        </p>
        <p class="contacts-hours">
          <strong>Работаем ежедневно с 10:00 до 20:00 (по предварительному звонку)</strong>
        </p>
        <div class="contacts-social">
          <p class="social-label">Связаться с нами</p>
          <div class="social-icons">
            <a href="https://wa.me/79526220616" class="social-icon" aria-label="WhatsApp">
              <img src="/assets/img/icon/whatsapp (1).png" width="30px" alt="WhatsApp" />
            </a>
            <a href="https://t.me/exovet_irk" class="social-icon" aria-label="Telegram">
              <img src="/assets/img/icon/telegram.png" width="28px" alt="Telegram" />
            </a>
          </div>
        </div>
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
.contacts {
  background: linear-gradient(135deg, var(--primary-color) 40%, #8F6E7D 100%);
  padding: 70px 20px;
  color: var(--white);
  text-align: center;
  min-height: calc(100vh - 200px); /* Учитываем высоту Header и Footer */
}

.contacts-container {
  max-width: 1200px;
  margin: 0 auto;
}

.contacts h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  color: var(--white);
  text-transform: uppercase;
}

.contacts-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 600px;
  margin: 0 auto;
}

.contacts-address,
.contacts-phone,
.contacts-email,
.contacts-hours {
  font-size: 16px;
  line-height: 1.5;
}

.contacts-address strong,
.contacts-phone strong,
.contacts-email strong,
.contacts-hours strong {
  font-weight: 700;
}

.contacts-address a,
.contacts-phone a,
.contacts-email a {
  color: var(--white);
  text-decoration: none;
  transition: color 0.3s ease;
}

.contacts-address a:hover,
.contacts-phone a:hover,
.contacts-email a:hover {
  color: #dadee2;
}

.contacts-social {
  margin-top: 20px;
}

.social-label {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
}

.social-icons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.social-icon {
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.11);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.social-icon:hover {
  transform: scale(1.1);
  background-color: #dadee2;
}
</style>