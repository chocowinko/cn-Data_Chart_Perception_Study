<template>
  <div class="sunburst-intro">
    <h1 class="main-title">Sunburst Chart</h1>

    <div class="description-section">
      <p class="description">
        This chart is based on the World Coffee Research (WCR) Flavor Guide and shows the
        hierarchical relationships of coffee flavors.
      </p>

      <p class="description">
        • <strong>Inner Ring:</strong> Represents the broadest flavor categories. This is the
        highest level of classification (e.g., 'Fruity', 'Roasted').
      </p>

      <p class="description">
        • <strong>Middle Ring:</strong> Is a further breakdown of the inner categories, representing
        flavor sub-groups (e.g., under 'Fruity', this is broken down into 'Berry', 'Citrus Fruit',
        etc.).
      </p>

      <p class="description">
        • <strong>Outer Ring:</strong> Represents the most specific flavor attributes. This is the
        most detailed layer (e.g., under 'Citrus Fruit', this is broken down into 'Grapefruit',
        'Orange', etc.).
      </p>

      <p class="description">
        Colors are used to group similar flavor families , making the complex relationships easier to read.
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
      <span class="button-text">Start</span>
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
  font-family: Roboto, sans-serif;
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
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #545454;
  margin: 0 0 20px 0;
  text-align: left;
}

.features-list {
  font-family: Roboto, sans-serif;
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
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
}
</style>
