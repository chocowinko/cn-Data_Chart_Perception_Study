<template>
  <div class="circle-packing-intro">
    <h1 class="main-title">圆堆积图</h1>

    <div class="description-section">
      <p class="description">
        此图表比较亚洲和欧洲的人均温室气体排放量，其中：
      </p>

      <ul class="features-list">
        <li>
          <strong>层级结构：</strong>外圈代表大陆和次区域，内圈代表各个国家。
        </li>
        <li>
          <strong>面积：</strong>每个国家圆圈的面积与其人均温室气体排放量成正比。面积越大表示人均排放量越高。
        </li>
      </ul>
    </div>

    <div class="chart-display">
      <img src="/image.png" alt="Circle Packing Chart" class="chart-image" />
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
  router.push('/circle-packing-highlighting-1')
}
</script>

<style scoped>
.circle-packing-intro {
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

.chart-image {
  width: 50%;
  max-width: 600px;
  height: auto;
  display: block;
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
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
}
</style>
