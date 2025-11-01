<template>
  <div class="destination-map-intro">
    <h1 class="main-title">OD图（起点-终点图）</h1>

    <div class="description-section">
      <p class="description">
        此OD图显示了所选数据集中七个世界区域之间的汇总迁移流。
      </p>

      <ul class="features-list">
        <li>
          每条弧线代表从起点区域（源）到目的地区域（目标）的人员流动。
        </li>
        <li>
          弧线的粗细对应于流动量——越粗的弧线表示越大的流量。
        </li>
        <li>
          颜色表示起点区域，让观众可以追踪大多数迁移的起点。
        </li>
      </ul>
    </div>

    <div class="chart-display">
      <iframe
        src="/src/All/Destination_Map/static_routes.html"
        class="chart-iframe"
        frameborder="0"
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
  console.log('Continuing to Destination Map tasks...')
  // TODO: 跳转到第一个 Destination Map 任务页面
  router.push('/destination-map-highlighting-1')
}
</script>

<style scoped>
.destination-map-intro {
  width: 100%;
  padding: 0 0 60px 0;
  margin: 0;
  position: relative;
}

.main-title {
  font-family:
    PingFang SC,
    sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 40px;
  color: #1f1f1f;
  margin: 0 0 20px 0;
  padding: 0;
  text-align: left;
}

.description-section {
  margin-bottom: 30px;
}

.description {
  font-family:
    PingFang SC,
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
    PingFang SC,
    sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #545454;
  margin: 0 0 20px 0;
  padding-left: 25px;
  text-align: left;
}

.features-list li {
  margin-bottom: 8px;
}

.chart-display {
  width: 100%;
  margin-bottom: 40px;
  border: none;
  border-radius: 0;
  overflow: hidden;
  background: transparent;
}

.chart-display :deep(body),
.chart-display :deep(html) {
  overflow: hidden;
}

.chart-iframe {
  width: 100%;
  height: 400px;
  display: block;
  border: none;
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
  margin: -30px 0 0 0;
}

.continue-button:hover {
  background-color: #333;
}

.continue-button:active {
  transform: translateY(1px);
}

.button-text {
  font-family:
    PingFang SC,
    sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
}
</style>
