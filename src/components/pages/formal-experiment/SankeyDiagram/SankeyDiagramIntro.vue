<template>
  <div class="sankey-diagram-intro">
    <h1 class="main-title">Sankey Diagram</h1>

    <div class="description-section">
      <p class="description">
        This Sankey diagram shows how energy flows in the UK, from its source (left) to its final
        use (right).
      </p>

      <ul class="features-list">
        <li>Nodes (the blocks) represent types of energy or the sectors where energy is used.</li>
        <li>
          Flows (the bands) show the movement of energy. The wider the flow, the greater the amount
          of energy.
        </li>
      </ul>
    </div>

    <div class="chart-display">
      <iframe
        src="/src/All/Sankey_Diagram/energy_sankey.html"
        class="chart-iframe"
        frameborder="0"
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
  console.log('Continuing to Sankey Diagram tasks...')
  // TODO: 跳转到第一个 Sankey Diagram 任务页面
  router.push('/sankey-diagram-highlighting-1')
}
</script>

<style scoped>
.sankey-diagram-intro {
  width: 100%;
  padding: 0 0 60px 0;
  margin: 0;
  position: relative;
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
  padding: 0;
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
  height: 375px;
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
    Roboto,
    sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
}
</style>
