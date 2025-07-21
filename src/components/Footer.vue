<template>
  <footer id="contacts" class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-info">
          <h2>КОНТАКТЫ</h2>
          <p class="footer-address">
            <strong>Адрес:</strong>
            <a href="https://go.2gis.com/eA8Qs" target="_blank"> г. Иркутск, ул. Декабрьских Событий, 105в</a>
          </p>
          <p class="footer-phone">
            <strong>Телефон:</strong>
            <a href="tel:+79526220616"> +7 (952) 622-06-16</a>
          </p>
          <p class="footer-email">
            <strong>Email:</strong>
            <a href="mailto:exovet_irk@mail.ru"> exovet_irk@mail.ru</a>
          </p>
          <p class="footer-hours">
            <strong> Работаем ежедневно с 10:00 до 20:00 (по предварительному звонку)</strong>
          </p>
          <div class="footer-social">
            <p class="social-label"> Связаться с нами</p>
            <div class="social-icons">
              <a href="https://wa.me/79526220616" class="social-icon" aria-label="WhatsApp">
                <img src="/assets/img/icon/whatsapp (1).png" width="30px" alt="" />
              </a>
              <a href="https://t.me/exovet_irk" class="social-icon" aria-label="Telegram">
                <img src="/assets/img/icon/telegram.png" width="28px" alt="" />
              </a>
            </div>
            <p class="subscribe-label">Подписывайтесь на наш Telegram-канал, там много всего интересного</p>
            <a href="https://t.me/exovet_irk38" class="subscribe-btn">Telegram-канал</a>
          </div>
        </div>
        <div class="footer-map">
          <img src="/assets/img/map.png" alt="Map" class="map-image" />
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copyright">© ExoVet, 2025</p>
        <p class="footer-offer">
          <a href="/assets/docs/offer-agreement.pdf" target="_blank">Договор оферты</a>
        </p>
        <p class="footer-madeby">
          Сделано с ❤️ <a href="https://github.com/JessicaVadimovna" target="_blank">JessiLis</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Footer'
})
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, var(--primary-color) 40%, #8F6E7D 100%);
  padding: 40px 20px 20px;
  color: var(--white);
  font-family: 'Arial', sans-serif;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}

.footer-content {
  display: flex;
  flex: 1;
  justify-content: space-between;
  gap: 30px;
}

.footer-info {
  flex: 1;
}

.footer-info h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--white);
  text-transform: uppercase;
  text-align: left;
  padding: 0;
}

.footer-address,
.footer-phone,
.footer-email,
.footer-hours {
  font-size: 16px;
  margin-bottom: 15px;
  line-height: 1.5;
}

.footer-address strong,
.footer-phone strong,
.footer-email strong,
.footer-hours strong {
  font-weight: 700;
}

.footer-address a,
.footer-phone a,
.footer-email a {
  color: var(--white);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-address a:hover,
.footer-phone a:hover,
.footer-email a:hover {
  color: #dadee2;
}

.footer-social {
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
  margin-bottom: 15px;
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

.subscribe-label {
  font-size: 14px;
  margin-bottom: 10px;
  line-height: 1.5;
}

.subscribe-btn {
  display: inline-block;
  font-size: 14px;
  color: var(--white);
  background-color: #d8b6cd;
  padding: 8px 15px;
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.subscribe-btn:hover {
  background-color: #bb98af;
  transform: scale(1.05);
}

.footer-map {
  flex: 0 0 350px;
}

.map-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 15px;
}

.footer-bottom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.footer-copyright,
.footer-madeby {
  font-size: 14px;
  color: var(--white);
}

.footer-madeby a,
.footer-offer a {
  color: #dadee2;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-madeby a:hover,
.footer-offer a:hover {
  color: #e5accf;
  text-decoration: dashed;
}
</style>