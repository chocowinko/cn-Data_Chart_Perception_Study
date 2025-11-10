<template>
  <header class="app-header">
    <router-link to="/" class="logo-title">数据图表感知研究</router-link>
    <nav class="main-nav">
      <router-link to="/" class="nav-link" :class="{ active: $route.name === 'Home' }"
        >首页</router-link
      >
      <router-link
        to="/scatterplot-intro"
        class="nav-link"
        :class="{ active: isPreExperimentSection }"
        >预实验</router-link
      >
      <router-link
        to="/line-graph-task"
        class="nav-link"
        :class="{ active: isFormalExperimentSection }"
        >正式实验</router-link
      >
      <router-link
        to="/questionnaire"
        class="nav-link"
        :class="{ active: $route.name === 'Questionnaire' }"
        >问卷</router-link
      >
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 检测是否在Pre-Experiment相关的页面
const isPreExperimentSection = computed(() => {
  const preExperimentRoutes = [
    // 'PreExperiment', // 已删除此页面
    'ScatterplotIntro',
    'PracticeTask',
    'PracticeTask2',
    'PracticeComplete',
  ]
  return preExperimentRoutes.includes(route.name)
})

// 检测是否在Formal Experiment相关的页面
const isFormalExperimentSection = computed(() => {
  const formalExperimentRoutes = [
    // LineGraph
    'LineGraphTask',
    'LineGraphHighlighting1',
    'LineGraphHighlighting2',
    'LineGraphHighlighting3',
    'LineGraphStaging1',
    'LineGraphStaging2',
    'LineGraphStaging3',
    'LineGraphTracing1',
    'LineGraphTracing2',
    'LineGraphTracing3',
    // Scatterplot
    'ScatterplotTask',
    'ScatterplotHighlighting1',
    'ScatterplotHighlighting2',
    'ScatterplotHighlighting3',
    'ScatterplotStaging1',
    'ScatterplotStaging2',
    'ScatterplotStaging3',
    'ScatterplotTracing1',
    'ScatterplotTracing2',
    'ScatterplotTracing3',
    // Heatmap
    'HeatmapIntro',
    'HeatmapHighlighting1',
    'HeatmapHighlighting2',
    'HeatmapHighlighting3',
    'HeatmapStaging1',
    'HeatmapStaging2',
    'HeatmapStaging3',
    'HeatmapTracing1',
    'HeatmapTracing2',
    'HeatmapTracing3',
    // DestinationMap
    'DestinationMapIntro',
    'DestinationMapHighlighting1',
    'DestinationMapHighlighting2',
    'DestinationMapHighlighting3',
    'DestinationMapStaging1',
    'DestinationMapStaging2',
    'DestinationMapStaging3',
    'DestinationMapTracing1',
    'DestinationMapTracing2',
    'DestinationMapTracing3',
    // SankeyDiagram
    'SankeyDiagramIntro',
    'SankeyDiagramHighlighting1',
    'SankeyDiagramHighlighting2',
    'SankeyDiagramHighlighting3',
    'SankeyDiagramStaging1',
    'SankeyDiagramStaging2',
    'SankeyDiagramStaging3',
    'SankeyDiagramTracing1',
    'SankeyDiagramTracing2',
    'SankeyDiagramTracing3',
    // NetworkDiagram
    'NetworkDiagramIntro',
    'NetworkDiagramHighlighting1',
    'NetworkDiagramHighlighting2',
    'NetworkDiagramHighlighting3',
    'NetworkDiagramStaging1',
    'NetworkDiagramStaging2',
    'NetworkDiagramStaging3',
    'NetworkDiagramTracing1',
    'NetworkDiagramTracing2',
    'NetworkDiagramTracing3',
    // CirclePacking
    'CirclePackingIntro',
    'CirclePackingHighlighting1',
    'CirclePackingHighlighting2',
    'CirclePackingHighlighting3',
    'CirclePackingStaging1',
    'CirclePackingStaging2',
    'CirclePackingStaging3',
    // Treemap
    'TreemapIntro',
    'TreemapHighlighting1',
    'TreemapHighlighting2',
    'TreemapHighlighting3',
    'TreemapStaging1',
    'TreemapStaging2',
    'TreemapStaging3',
    // Sunburst
    'SunburstIntro',
    'SunburstHighlighting1',
    'SunburstHighlighting2',
    'SunburstHighlighting3',
    'SunburstStaging1',
    'SunburstStaging2',
    'SunburstStaging3',
  ]
  return formalExperimentRoutes.includes(route.name)
})
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 77.78px;
  border-bottom: 1px solid #eee;
  margin-bottom: 0;
}

.logo-title {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #1f1f1f;
  text-decoration: none;
  transition: color 0.2s ease;
}

.logo-title:hover {
  color: #666;
}

.main-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #7b7b7b;
  transition: color 0.2s ease;
  padding: 5px 0;
}

.nav-link.active {
  color: #1f1f1f;
}

.nav-link:hover {
  color: #1f1f1f;
}
</style>
