<template>
  <div class="treemap-intro">
    <h1 class="main-title">树状图</h1>

    <div class="description-section">
      <p class="description">
        树状图可以用多层网格展示出不同商品类别的销售情况。下图中的两个树状图比较了2016年（状态A）和2017年（状态B）之间的销售表现，矩形面积代表销售额的多少。
        实验中使用动画方便比较两个年度之间销售的变化。
      </p>

      <p class="description">层级结构分为三个级别：</p>

      <ul class="features-list">
        <li><strong>类别：</strong>科技产品、家具、办公用品</li>
        <li><strong>子类别：</strong>手机、椅子、装订用品等</li>
        <li><strong>客户群：</strong>消费者、企业、家庭办公</li>
      </ul>

      <p class="description">
        通过将这些层级嵌套在一起，图表展示了每种产品和客户类型在每年总销售额中的贡献。
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
      <span class="button-text">开始</span>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const continueFormal = () => {
  router.push("/treemap-highlighting-1");
};
</script>

<style scoped>
.treemap-intro {
  width: 100%;
  padding: 0 0 60px 0;
  margin: 0;
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
  text-align: left;
}

.description-section {
  margin-bottom: 30px;
  max-width: 1000px;
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
    PingFang SC,
    sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
}
</style>
