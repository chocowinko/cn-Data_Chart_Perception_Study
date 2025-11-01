<template>
  <div class="line-graph-task">
    <h1 class="main-title">折线图</h1>

    <div class="description-section">
      <p class="description">
        此图表显示了2024年几个不同产品类别的月度销售趋势，其中：
      </p>

      <ul class="features-list">
        <li>
          横轴（从左到右）代表月份，从一月到十二月。
        </li>
        <li>
          纵轴（从下到上）代表月度销售额，单位为亿元。
        </li>
        <li>每条彩色线条代表一个独立产品类别的销售趋势。</li>
      </ul>
    </div>

    <div class="chart-display">
      <div class="chart-container">
        <img
          src="/WechatIMG5571.jpg"
          alt="2024年产品类别销售波动分析"
          class="static-chart-image"
        />
      </div>
    </div>

    <button class="start-button" @click="goToTask2">
      <span class="button-text">开始</span>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToTask2 = () => {
  console.log('Navigating to line-graph-highlighting-1...')
  router.push('/line-graph-highlighting-1')
}
</script>

<style scoped>
.line-graph-task {
  width: 100%;
  padding: 0 0 60px 0;
  margin: 0;
  text-align: left;
}

.main-title {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 35.5556px;
  line-height: 43px;
  color: #1f1f1f;
  margin: 0 0 20px 0;
  padding: 0;
  position: relative;
  z-index: 10;
  background-color: white;
}

.description-section {
  margin-bottom: 30px;
  position: relative;
  z-index: 10;
  background-color: white;
}

.description {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17.7778px;
  line-height: 25px;
  color: #545454;
  margin-bottom: 20px;
}

.features-list {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17.7778px;
  line-height: 25px;
  color: #545454;
  padding-left: 20px;
  margin-bottom: 20px;
}

.features-list li {
  margin-bottom: 8px;
}

.chart-display {
  width: 100%;
  margin-bottom: 40px;
  margin-top: -30px;
  position: relative;
  z-index: 1;
}

.chart-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  position: relative;
  max-width: 840px;
}

.static-chart-image {
  width: 100%;
  height: auto;
  max-width: 800px;
  border-radius: 4px;
}

.start-button {
  width: 120px;
  height: 50px;
  background: #1f1f1f;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  margin-bottom: 40px;
  position: relative;
  z-index: 10;
}

.start-button:hover {
  background-color: #333;
}

.start-button:active {
  transform: translateY(1px);
}

.button-text {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
}
</style>
