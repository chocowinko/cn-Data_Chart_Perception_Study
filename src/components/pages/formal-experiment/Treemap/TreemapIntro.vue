<template>
  <div class="treemap-intro">
    <h1 class="main-title">Treemap</h1>

    <div class="description-section">
      <p class="description">
        This treemap compares sales performance between 2016 (State A) and 2017 (State B). Each
        rectangle's area represents total sales volume, allowing visual comparison across years.
      </p>

      <p class="description">The hierarchy is organized in three levels:</p>

      <ul class="features-list">
        <li><strong>Category:</strong> Technology, Furniture, Office Supplies</li>
        <li><strong>Sub-Category:</strong> Phones, Chairs, Binders, etc.</li>
        <li><strong>Segment:</strong> Consumer, Corporate, Home Office</li>
      </ul>

      <p class="description">
        By putting these levels inside each other, the chart shows how much each product and customer type contributed to the total sales in each year.
      </p>
    </div>

    <div class="chart-display">
      <iframe
        src="/src/All/Treemap/treemap.html"
        class="chart-iframe"
        frameborder="0"
        scrolling="no"
      ></iframe>
    </div>

    <button class="continue-button" @click="continueFormal">
      <span class="button-text">Start</span>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const continueFormal = () => {
  router.push('/treemap-highlighting-1')
}
</script>

<style scoped>
.treemap-intro {
  width: 100%;
  padding: 0 0 60px 0;
  margin: 0;
}

.main-title {
  font-family:
    Roboto,
    sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 40px;
  color: #1f1f1f;
  margin: 0 0 20px 0;
  text-align: left;
}

.description-section {
  margin-bottom: 30px;
}

.description {
  font-family:
    Roboto,
    sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #545454;
  margin: 0 0 20px 0;
  text-align: left;
}

.features-list {
  font-family:
    Roboto,
    sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #545454;
  margin: 0 0 20px 0;
  padding-left: 20px;
  text-align: left;
}

.features-list li {
  margin-bottom: 8px;
}

.chart-display {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 40px;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.chart-iframe {
  width: 100%;
  max-width: 1500px;
  height: 900px;
  display: block;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  zoom: 0.5;
}

:deep(body),
:deep(html) {
  overflow: hidden;
}

.continue-button {
  width: 120px;
  height: 45px;
  background: #1f1f1f;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  margin-top: 0px;
}

.continue-button:hover {
  background-color: #333;
}

.continue-button:active {
  transform: translateY(1px);
}

.button-text {
  font-family:
    Roboto,
    sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
}
</style>
