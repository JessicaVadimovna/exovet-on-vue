<template>
  <section id="prices" class="prices">
    <h2>Прайс-лист</h2>
    <p class="price-disclaimer">
      Информация о ценах не является публичной офертой. Обновлено 29 ноября 2024.
    </p>
    <div class="price-container">
      <div v-for="(category, index) in priceCategories" :key="index" class="price-category">
        <h3>{{ category.title }}</h3>
        <div class="price-list">
          <div v-for="(item, i) in category.items" :key="i" class="price-item" :style="{ '--i': i }">
            <span class="service-name">{{ item.name }}</span>
            <span class="service-price">{{ item.price }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface PriceItem {
  name: string
  price: string
}

interface PriceCategory {
  title: string
  items: PriceItem[]
}

export default defineComponent({
  name: 'Prices',
  setup() {
    const priceCategories = ref<PriceCategory[]>([
      {
        title: 'Терапия',
        items: [
          { name: 'Первичный приём', price: '850 – 2 100 ₽' },
          { name: 'Отоскопия', price: '450 ₽' },
          { name: 'Диспансеризация', price: 'от 1 500 ₽' },
          { name: 'Вакцинация (хорьки, кролики)', price: 'от 1 600 ₽' },
          { name: 'Стационар', price: '500 – 2 500 ₽' },
          { name: 'Приём стоматолога', price: 'от 1 100 ₽' },
          { name: 'Первичный приём дерматолога', price: 'от 1 100 ₽' }
        ]
      },
      {
        title: 'Хирургия',
        items: [
          { name: 'Кастрация', price: 'от 1 800 ₽' },
          { name: 'Кастрация самок (стерилизация)', price: 'от 2 700 ₽' }
        ]
      },
      {
        title: 'Анестезия',
        items: [
          { name: 'Анестезия', price: '1 000 – 5 000 ₽' }
        ]
      }
    ])

    return { priceCategories }
  }
})
</script>

<style scoped>
.prices {
  background: linear-gradient(135deg, var(--light-bg) 40%, #dadee2 100%);
  padding: 70px 20px;
  text-align: center;
  overflow: hidden;
}

.price-disclaimer {
  font-size: 14px;
  font-style: italic;
  margin-bottom: 40px;
  color: var(--text-color);
  opacity: 0.8;
}

.price-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}

.price-category {
  flex: 1;
  min-width: 320px;
  background: linear-gradient(145deg, var(--white), #f0f2f5);
  border-radius: 20px;
  padding: 25px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.price-category:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-md);
}

.price-category h3 {
  font-size: 26px;
  margin-bottom: 25px;
  text-align: left;
  padding-left: 15px;
  font-weight: 700;
  color: var(--primary-color);
}

.price-category h3::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 70%;
  background: linear-gradient(to bottom, var(--secondary-color), var(--primary-color));
  border-radius: 5px;
}

.price-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.price-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  background: rgba(229, 172, 191, 0.15);
  border-radius: 12px;
  transition: transform 0.3s ease, background 0.3s ease;
  animation: slideIn 0.5s ease forwards;
  animation-delay: calc(var(--i) * 0.1s);
}

.price-item:hover {
  background: rgba(229, 172, 191, 0.35);
  transform: scale(1.02);
}

.service-name {
  font-size: 16px;
  color: var(--text-color);
  text-align: left;
  flex: 2;
  font-weight: 500;
}

.price-item:hover .service-name {
  color: var(--primary-color);
}

.service-price {
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-color);
  text-align: right;
  flex: 1;
  white-space: nowrap;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>