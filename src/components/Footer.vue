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

<div class="map-wrapper">
  <iframe
    src="https://www.openstreetmap.org/export/embed.html?bbox=104.30940806865692%2C52.28133275560028%2C104.31807696819305%2C52.28425680472971&amp;layer=mapnik&amp;marker=52.282794804284634%2C104.31374251842499"
    style="border: #999999 solid 1px; border-radius: 15px;"
    frameborder="0"
  ></iframe>
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
}

.footer-content {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 30px;
}

.footer-info {
  flex: 1;
  min-width: 0;
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
  word-wrap: break-word;
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
  word-break: break-all;
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
  flex-shrink: 0;
}

.social-icon:hover {
  transform: scale(1.1);
  background-color: #dadee2;
}

.social-icon img {
  width: 30px;
  height: 30px;
  object-fit: contain;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  flex-wrap: wrap;
  gap: 10px;
}

.footer-copyright,
.footer-offer,
.footer-madeby {
  font-size: 14px;
  color: var(--white);
  margin: 0;
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
  text-decoration: underline;
}

.map-wrapper {
  width: 100%;
  max-width: 550px; /* макс ширина для больших экранов */
  aspect-ratio: 550 / 350; /* поддерживаем пропорции */
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  margin: 0 auto; /* центрируем блок */
}

.map-wrapper iframe {
  width: 100%;
  height: 100%;
  display: block;
  border: none;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.footer-info {
  flex: 1 1 250px;
  min-width: 250px;
}

.map-wrapper {
  flex-shrink: 0;
  width: 100%;
  max-width: 550px;
  aspect-ratio: 550 / 350;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  margin: 0 auto;
  min-width: 280px; /* можно подогнать */
}

.map-wrapper iframe {
  border: 1px solid #999999;
  border-radius: 15px;
  width: 100%;
  height: 100%;
  display: block;
  border: none;
}


/* Tablet styles */
@media (max-width: 768px) {
  .footer {
    padding: 30px 15px 15px;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .footer-info h2 {
    font-size: 24px;
    margin-bottom: 15px;
    text-align: center;
  }
  
  .footer-address,
  .footer-phone,
  .footer-email,
  .footer-hours {
    font-size: 15px;
    margin-bottom: 12px;
    text-align: center;
  }
  
  .footer-social {
    text-align: center;
  }
  
  .social-icons {
    justify-content: center;
  }
  
  .footer-map {
    flex: none;
    max-width: 100%;
  }
  
  .map-image {
    height: 200px;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
  
  .footer-copyright,
  .footer-offer,
  .footer-madeby {
    font-size: 13px;
  }
}

@media (max-width: 600px) {
  .map-wrapper {
    max-width: 100%; /* карта занимает всю ширину экрана */
  }
}

/* Mobile styles */
@media (max-width: 480px) {
  .footer {
    padding: 25px 10px 15px;
  }
  
  .footer-content {
    gap: 15px;
    margin-bottom: 15px;
  }
  
  .footer-info h2 {
    font-size: 20px;
    margin-bottom: 12px;
  }
  
  .footer-address,
  .footer-phone,
  .footer-email,
  .footer-hours {
    font-size: 14px;
    margin-bottom: 10px;
  }
  
  .footer-hours {
    font-size: 13px;
  }
  
  .social-label {
    font-size: 15px;
    margin-bottom: 8px;
  }
  
  .social-icons {
    gap: 12px;
  }
  
  .social-icon {
    width: 35px;
    height: 35px;
  }
  
  .social-icon img {
    width: 25px;
    height: 25px;
  }
  
  .subscribe-label {
    font-size: 13px;
    margin-bottom: 8px;
  }
  
  .subscribe-btn {
    font-size: 13px;
    padding: 6px 12px;
  }
  
  .map-image {
    height: 180px;
    border-radius: 10px;
  }
  
  .footer-bottom {
    padding-top: 15px;
    gap: 6px;
  }
  
  .footer-copyright,
  .footer-offer,
  .footer-madeby {
    font-size: 12px;
  }
}

/* Extra small mobile */
@media (max-width: 320px) {
  .footer {
    padding: 20px 8px 12px;
  }
  
  .footer-info h2 {
    font-size: 18px;
  }
  
  .footer-address,
  .footer-phone,
  .footer-email {
    font-size: 13px;
  }
  
  .footer-hours {
    font-size: 12px;
  }
  
  .social-icon {
    width: 32px;
    height: 32px;
  }
  
  .social-icon img {
    width: 22px;
    height: 22px;
  }
  
  .map-image {
    height: 150px;
  }
  
  .footer-copyright,
  .footer-offer,
  .footer-madeby {
    font-size: 11px;
  }
}
</style>