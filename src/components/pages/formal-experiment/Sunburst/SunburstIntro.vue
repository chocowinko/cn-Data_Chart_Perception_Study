<template>
  <div class="sunburst-intro">
    <h1 class="main-title">旭日图</h1>

    <div class="description-section">
      <p class="description">
        该图表基于世界咖啡研究（WCR）风味指南，展示了咖啡风味的层级关系。
      </p>

      <p class="description">
        • <strong>内圈：</strong> 代表最广泛的风味类别。这是最高层级的分类（例如"果味"、"烘焙味"）。
      </p>

      <p class="description">
        • <strong>中圈：</strong> 是内圈类别的进一步细分，代表风味子组（例如，在"果味"下，细分为"浆果"、"柑橘类水果"等）。
      </p>

      <p class="description">
        • <strong>外圈：</strong> 代表最具体的风味属性。这是最详细的层级（例如，在"柑橘类水果"下，细分为"葡萄柚"、"橙子"等）。
      </p>

      <p class="description">
        颜色用于对相似的风味家族进行分组，使复杂的关系更容易理解。
      </p>
    </div>

    <div class="chart-display">
      <iframe
        src="/src/All/Sunburst_Diagram/sunburst.html"
        class="chart-iframe"
        frameborder="0"
        scrolling="no"
      ></iframe>
    </div>

    <button class="continue-button" @click="continueFormal">
      <span class="button-text">开始</span>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const continueFormal = () => {
  router.push('/sunburst-highlighting-1')
}
</script>

<style scoped>
.sunburst-intro {
  width: 100%;
  padding: 0 0 60px 0;
  margin: 0;
}

.main-title {
  font-family: PingFang SC, sans-serif;
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
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #545454;
  margin: 0 0 20px 0;
  text-align: left;
}

.features-list {
  font-family: PingFang SC, sans-serif;
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
  border: none;
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
  margin-top: -30px;
}

.continue-button:hover {
  background-color: #333;
}

.continue-button:active {
  transform: translateY(1px);
}

.button-text {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
}
</style>
