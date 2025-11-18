<template>
  <div class="network-diagram-intro">
    <h1 class="main-title">网络图</h1>

    <div class="description-section">
      <p class="description">
        该网络图展示了教室内学生之间的联系频率。
      </p>

      <ul class="features-list">
        <li><strong>节点：</strong>每个节点代表班级中的一名学生。</li>
        <li>
          <strong>连线：</strong>表示学生之间的联系。连线越粗，代表联系越频繁。
        </li>
        <li>
          <strong>颜色：</strong>用于标注联系频繁的不同学生群体
        </li>
      </ul>
    </div>

    <div class="chart-display">
      <iframe
        src="/src/All/Network_Diagram/network_intro.html"
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
  router.push('/network-diagram-highlighting-1')
}
</script>

<style scoped>
.network-diagram-intro {
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
  margin-top: -50px;
  margin-bottom: 30px;
  overflow: hidden;
}

.chart-iframe {
  width: 100%;
  height: 500px;
  display: block;
  border: none;
  overflow: hidden;
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
  margin-top: -100px;
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
