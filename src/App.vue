<script setup>
import Header from './components/layout/Header.vue'
// import NetworkChart from './components/charts/NetworkChart.vue'
// import ScatterChart from './components/charts/ScatterChart.vue'
import DevMenu from './components/DevMenu.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div id="app-container">
    <Header />
    <main class="main-content">
      <div class="left-column full-width">
        <router-view />
      </div>
      <!-- 暂时隐藏右侧图表，专注于文字排版 -->
      <!-- <div class="right-column" v-if="route.name === 'Home'">
        <div class="chart-container">
          <NetworkChart />
        </div>
        <div class="chart-container">
          <ScatterChart />
        </div>
      </div> -->
    </main>
    <DevMenu />
  </div>
</template>

<style>
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  background: #ffffff;
}

#app {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;
  box-sizing: border-box;
  background: #ffffff;
}
</style>

<style scoped>
#app-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background: #ffffff;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}

.main-content {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 65.19px);
  top: 0;
  padding-top: 20px;
}

.left-column {
  position: absolute;
  left: 77.78px;
  top: 78.51px;
  width: 562.22px;
  height: 600px;
}

.left-column.full-width {
  left: 77.78px;
  top: 20px;
  transform: none;
  width: calc(1728px - 155.56px); /* 与header内容宽度一致 */
  max-width: calc(100% - 155.56px);
}

/* 暂时注释掉图表相关样式 */
/* .right-column {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.chart-container {
  position: absolute;
  padding: 0;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-container:first-child {
  width: 375.56px;
  height: 317.04px;
  left: 900px;
  top: 54.5px;
  background: #d9d9d9;
  border-radius: 2.96296px;
}

.chart-container:last-child {
  width: 472.59px;
  height: 300px;
  left: 807px;
  top: 424.5px;
  background: #d9d9d9;
  border-radius: 2.96296px;
} */
</style>
