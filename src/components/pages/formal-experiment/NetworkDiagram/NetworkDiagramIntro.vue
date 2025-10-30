<template>
  <div class="network-diagram-intro">
    <h1 class="main-title">Network Diagram</h1>

    <div class="description-section">
      <p class="description">
        This network diagram displays the contact frequency between students within a classroom.
      </p>

      <ul class="features-list">
        <li><strong>Nodes:</strong> Each node represents a student in the class.</li>
        <li>
          <strong>Links:</strong> Lines connecting nodes represent contact relationships between
          students. The thickness of each line reflects the contact frequency—thicker lines indicate
          more frequent interactions.
        </li>
        <li>
          <strong>Colors:</strong> Different colors distinguish different communities, revealing how
          student groups cluster together and their connection structures.
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
      <span class="button-text">Start</span>
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
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
}
</style>
