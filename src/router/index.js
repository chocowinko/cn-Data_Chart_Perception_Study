import { createRouter, createWebHistory } from 'vue-router'
import Introduction from '../components/pages/home/Introduction.vue'
// import PreExperiment from '../components/pages/pre-experiment/Page1_PreExperiment.vue'
import ScatterplotIntro from '../components/pages/pre-experiment/Page2_ScatterplotIntro.vue'
import PracticeTask from '../components/pages/pre-experiment/Page3_PracticeTask.vue'
import PracticeTask2 from '../components/pages/pre-experiment/Page4_PracticeTask2.vue'
import PracticeComplete from '../components/pages/pre-experiment/Page5_PracticeComplete.vue'
import LineGraphTask from '../components/pages/formal-experiment/LineGraph/LineGraphTask.vue'
import LineGraphHighlighting1 from '../components/pages/formal-experiment/LineGraph/LineGraphHighlighting1.vue'
import LineGraphHighlighting2 from '../components/pages/formal-experiment/LineGraph/LineGraphHighlighting2.vue'
import LineGraphHighlighting3 from '../components/pages/formal-experiment/LineGraph/LineGraphHighlighting3.vue'
import LineGraphStaging1 from '../components/pages/formal-experiment/LineGraph/LineGraphStaging1.vue'
import LineGraphStaging2 from '../components/pages/formal-experiment/LineGraph/LineGraphStaging2.vue'
import LineGraphStaging3 from '../components/pages/formal-experiment/LineGraph/LineGraphStaging3.vue'
import LineGraphTracing1 from '../components/pages/formal-experiment/LineGraph/LineGraphTracing1.vue'
import LineGraphTracing2 from '../components/pages/formal-experiment/LineGraph/LineGraphTracing2.vue'
import LineGraphTracing3 from '../components/pages/formal-experiment/LineGraph/LineGraphTracing3.vue'
import ScatterplotTask from '../components/pages/formal-experiment/Scatterplot/ScatterplotTask.vue'
import ScatterplotHighlighting1 from '../components/pages/formal-experiment/Scatterplot/ScatterplotHighlighting1.vue'
import ScatterplotHighlighting2 from '../components/pages/formal-experiment/Scatterplot/ScatterplotHighlighting2.vue'
import ScatterplotHighlighting3 from '../components/pages/formal-experiment/Scatterplot/ScatterplotHighlighting3.vue'
import ScatterplotStaging1 from '../components/pages/formal-experiment/Scatterplot/ScatterplotStaging1.vue'
import ScatterplotStaging2 from '../components/pages/formal-experiment/Scatterplot/ScatterplotStaging2.vue'
import ScatterplotStaging3 from '../components/pages/formal-experiment/Scatterplot/ScatterplotStaging3.vue'
import ScatterplotTracing1 from '../components/pages/formal-experiment/Scatterplot/ScatterplotTracing1.vue'
import ScatterplotTracing2 from '../components/pages/formal-experiment/Scatterplot/ScatterplotTracing2.vue'
import ScatterplotTracing3 from '../components/pages/formal-experiment/Scatterplot/ScatterplotTracing3.vue'
import HeatmapIntro from '../components/pages/formal-experiment/Heatmap/HeatmapIntro.vue'
import HeatmapHighlighting1 from '../components/pages/formal-experiment/Heatmap/HeatmapHighlighting1.vue'
import HeatmapHighlighting2 from '../components/pages/formal-experiment/Heatmap/HeatmapHighlighting2.vue'
import HeatmapHighlighting3 from '../components/pages/formal-experiment/Heatmap/HeatmapHighlighting3.vue'
import HeatmapStaging1 from '../components/pages/formal-experiment/Heatmap/HeatmapStaging1.vue'
import HeatmapStaging2 from '../components/pages/formal-experiment/Heatmap/HeatmapStaging2.vue'
import HeatmapStaging3 from '../components/pages/formal-experiment/Heatmap/HeatmapStaging3.vue'
import HeatmapTracing1 from '../components/pages/formal-experiment/Heatmap/HeatmapTracing1.vue'
import HeatmapTracing2 from '../components/pages/formal-experiment/Heatmap/HeatmapTracing2.vue'
import HeatmapTracing3 from '../components/pages/formal-experiment/Heatmap/HeatmapTracing3.vue'
import DestinationMapIntro from '../components/pages/formal-experiment/DestinationMap/DestinationMapIntro.vue'
import DestinationMapHighlighting1 from '../components/pages/formal-experiment/DestinationMap/DestinationMapHighlighting1.vue'
import DestinationMapHighlighting2 from '../components/pages/formal-experiment/DestinationMap/DestinationMapHighlighting2.vue'
import DestinationMapHighlighting3 from '../components/pages/formal-experiment/DestinationMap/DestinationMapHighlighting3.vue'
import DestinationMapStaging1 from '../components/pages/formal-experiment/DestinationMap/DestinationMapStaging1.vue'
import DestinationMapStaging2 from '../components/pages/formal-experiment/DestinationMap/DestinationMapStaging2.vue'
import DestinationMapStaging3 from '../components/pages/formal-experiment/DestinationMap/DestinationMapStaging3.vue'
import DestinationMapTracing1 from '../components/pages/formal-experiment/DestinationMap/DestinationMapTracing1.vue'
import DestinationMapTracing2 from '../components/pages/formal-experiment/DestinationMap/DestinationMapTracing2.vue'
import DestinationMapTracing3 from '../components/pages/formal-experiment/DestinationMap/DestinationMapTracing3.vue'
import SankeyDiagramIntro from '../components/pages/formal-experiment/SankeyDiagram/SankeyDiagramIntro.vue'
import SankeyDiagramHighlighting1 from '../components/pages/formal-experiment/SankeyDiagram/SankeyDiagramHighlighting1.vue'
import SankeyDiagramHighlighting2 from '../components/pages/formal-experiment/SankeyDiagram/SankeyDiagramHighlighting2.vue'
import SankeyDiagramHighlighting3 from '../components/pages/formal-experiment/SankeyDiagram/SankeyDiagramHighlighting3.vue'
import SankeyDiagramStaging1 from '../components/pages/formal-experiment/SankeyDiagram/SankeyDiagramStaging1.vue'
import SankeyDiagramStaging2 from '../components/pages/formal-experiment/SankeyDiagram/SankeyDiagramStaging2.vue'
import SankeyDiagramStaging3 from '../components/pages/formal-experiment/SankeyDiagram/SankeyDiagramStaging3.vue'
import SankeyDiagramTracing1 from '../components/pages/formal-experiment/SankeyDiagram/SankeyDiagramTracing1.vue'
import SankeyDiagramTracing2 from '../components/pages/formal-experiment/SankeyDiagram/SankeyDiagramTracing2.vue'
import SankeyDiagramTracing3 from '../components/pages/formal-experiment/SankeyDiagram/SankeyDiagramTracing3.vue'
import NetworkDiagramIntro from '../components/pages/formal-experiment/NetworkDiagram/NetworkDiagramIntro.vue'
import NetworkDiagramHighlighting1 from '../components/pages/formal-experiment/NetworkDiagram/NetworkDiagramHighlighting1.vue'
import NetworkDiagramHighlighting2 from '../components/pages/formal-experiment/NetworkDiagram/NetworkDiagramHighlighting2.vue'
import NetworkDiagramHighlighting3 from '../components/pages/formal-experiment/NetworkDiagram/NetworkDiagramHighlighting3.vue'
import NetworkDiagramStaging1 from '../components/pages/formal-experiment/NetworkDiagram/NetworkDiagramStaging1.vue'
import NetworkDiagramStaging2 from '../components/pages/formal-experiment/NetworkDiagram/NetworkDiagramStaging2.vue'
import NetworkDiagramStaging3 from '../components/pages/formal-experiment/NetworkDiagram/NetworkDiagramStaging3.vue'
import NetworkDiagramTracing1 from '../components/pages/formal-experiment/NetworkDiagram/NetworkDiagramTracing1.vue'
import NetworkDiagramTracing2 from '../components/pages/formal-experiment/NetworkDiagram/NetworkDiagramTracing2.vue'
import NetworkDiagramTracing3 from '../components/pages/formal-experiment/NetworkDiagram/NetworkDiagramTracing3.vue'
import CirclePackingIntro from '../components/pages/formal-experiment/CirclePacking/CirclePackingIntro.vue'
import CirclePackingHighlighting1 from '../components/pages/formal-experiment/CirclePacking/CirclePackingHighlighting1.vue'
import CirclePackingHighlighting2 from '../components/pages/formal-experiment/CirclePacking/CirclePackingHighlighting2.vue'
import CirclePackingHighlighting3 from '../components/pages/formal-experiment/CirclePacking/CirclePackingHighlighting3.vue'
import CirclePackingStaging1 from '../components/pages/formal-experiment/CirclePacking/CirclePackingStaging1.vue'
import CirclePackingStaging2 from '../components/pages/formal-experiment/CirclePacking/CirclePackingStaging2.vue'
import CirclePackingStaging3 from '../components/pages/formal-experiment/CirclePacking/CirclePackingStaging3.vue'
import TreemapIntro from '../components/pages/formal-experiment/Treemap/TreemapIntro.vue'
import TreemapHighlighting1 from '../components/pages/formal-experiment/Treemap/TreemapHighlighting1.vue'
import TreemapHighlighting2 from '../components/pages/formal-experiment/Treemap/TreemapHighlighting2.vue'
import TreemapHighlighting3 from '../components/pages/formal-experiment/Treemap/TreemapHighlighting3.vue'
import TreemapStaging1 from '../components/pages/formal-experiment/Treemap/TreemapStaging1.vue'
import TreemapStaging2 from '../components/pages/formal-experiment/Treemap/TreemapStaging2.vue'
import TreemapStaging3 from '../components/pages/formal-experiment/Treemap/TreemapStaging3.vue'
import SunburstIntro from '../components/pages/formal-experiment/Sunburst/SunburstIntro.vue'
import SunburstHighlighting1 from '../components/pages/formal-experiment/Sunburst/SunburstHighlighting1.vue'
import SunburstHighlighting2 from '../components/pages/formal-experiment/Sunburst/SunburstHighlighting2.vue'
import SunburstHighlighting3 from '../components/pages/formal-experiment/Sunburst/SunburstHighlighting3.vue'
import SunburstStaging1 from '../components/pages/formal-experiment/Sunburst/SunburstStaging1.vue'
import SunburstStaging2 from '../components/pages/formal-experiment/Sunburst/SunburstStaging2.vue'
import SunburstStaging3 from '../components/pages/formal-experiment/Sunburst/SunburstStaging3.vue'
import TimingResults from '../components/pages/results/TimingResults.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Introduction,
  },
  // {
  //   path: '/pre-experiment',
  //   name: 'PreExperiment',
  //   component: PreExperiment,
  // },
  {
    path: '/scatterplot-intro',
    name: 'ScatterplotIntro',
    component: ScatterplotIntro,
  },
  {
    path: '/practice-task',
    name: 'PracticeTask',
    component: PracticeTask,
  },
  {
    path: '/practice-task-2',
    name: 'PracticeTask2',
    component: PracticeTask2,
  },
  {
    path: '/practice-complete',
    name: 'PracticeComplete',
    component: PracticeComplete,
  },
  {
    path: '/line-graph-task',
    name: 'LineGraphTask',
    component: LineGraphTask,
  },
  {
    path: '/line-graph-highlighting-1',
    name: 'LineGraphHighlighting1',
    component: LineGraphHighlighting1,
  },
  {
    path: '/line-graph-highlighting-2',
    name: 'LineGraphHighlighting2',
    component: LineGraphHighlighting2,
  },
  {
    path: '/line-graph-highlighting-3',
    name: 'LineGraphHighlighting3',
    component: LineGraphHighlighting3,
  },
  {
    path: '/line-graph-staging-1',
    name: 'LineGraphStaging1',
    component: LineGraphStaging1,
  },
  {
    path: '/line-graph-staging-2',
    name: 'LineGraphStaging2',
    component: LineGraphStaging2,
  },
  {
    path: '/line-graph-staging-3',
    name: 'LineGraphStaging3',
    component: LineGraphStaging3,
  },
  {
    path: '/line-graph-tracing-1',
    name: 'LineGraphTracing1',
    component: LineGraphTracing1,
  },
  {
    path: '/line-graph-tracing-2',
    name: 'LineGraphTracing2',
    component: LineGraphTracing2,
  },
  {
    path: '/line-graph-tracing-3',
    name: 'LineGraphTracing3',
    component: LineGraphTracing3,
  },
  {
    path: '/scatterplot-task',
    name: 'ScatterplotTask',
    component: ScatterplotTask,
  },
  {
    path: '/scatterplot-highlighting-1',
    name: 'ScatterplotHighlighting1',
    component: ScatterplotHighlighting1,
  },
  {
    path: '/scatterplot-highlighting-2',
    name: 'ScatterplotHighlighting2',
    component: ScatterplotHighlighting2,
  },
  {
    path: '/scatterplot-highlighting-3',
    name: 'ScatterplotHighlighting3',
    component: ScatterplotHighlighting3,
  },
  {
    path: '/scatterplot-staging-1',
    name: 'ScatterplotStaging1',
    component: ScatterplotStaging1,
  },
  {
    path: '/scatterplot-staging-2',
    name: 'ScatterplotStaging2',
    component: ScatterplotStaging2,
  },
  {
    path: '/scatterplot-staging-3',
    name: 'ScatterplotStaging3',
    component: ScatterplotStaging3,
  },
  {
    path: '/scatterplot-tracing-1',
    name: 'ScatterplotTracing1',
    component: ScatterplotTracing1,
  },
  {
    path: '/scatterplot-tracing-2',
    name: 'ScatterplotTracing2',
    component: ScatterplotTracing2,
  },
  {
    path: '/scatterplot-tracing-3',
    name: 'ScatterplotTracing3',
    component: ScatterplotTracing3,
  },
  {
    path: '/heatmap-intro',
    name: 'HeatmapIntro',
    component: HeatmapIntro,
  },
  {
    path: '/heatmap-highlighting-1',
    name: 'HeatmapHighlighting1',
    component: HeatmapHighlighting1,
  },
  {
    path: '/heatmap-highlighting-2',
    name: 'HeatmapHighlighting2',
    component: HeatmapHighlighting2,
  },
  {
    path: '/heatmap-highlighting-3',
    name: 'HeatmapHighlighting3',
    component: HeatmapHighlighting3,
  },
  {
    path: '/heatmap-staging-1',
    name: 'HeatmapStaging1',
    component: HeatmapStaging1,
  },
  {
    path: '/heatmap-staging-2',
    name: 'HeatmapStaging2',
    component: HeatmapStaging2,
  },
  {
    path: '/heatmap-staging-3',
    name: 'HeatmapStaging3',
    component: HeatmapStaging3,
  },
  {
    path: '/heatmap-tracing-1',
    name: 'HeatmapTracing1',
    component: HeatmapTracing1,
  },
  {
    path: '/heatmap-tracing-2',
    name: 'HeatmapTracing2',
    component: HeatmapTracing2,
  },
  {
    path: '/heatmap-tracing-3',
    name: 'HeatmapTracing3',
    component: HeatmapTracing3,
  },
  {
    path: '/destination-map-intro',
    name: 'DestinationMapIntro',
    component: DestinationMapIntro,
  },
  {
    path: '/destination-map-highlighting-1',
    name: 'DestinationMapHighlighting1',
    component: DestinationMapHighlighting1,
  },
  {
    path: '/destination-map-highlighting-2',
    name: 'DestinationMapHighlighting2',
    component: DestinationMapHighlighting2,
  },
  {
    path: '/destination-map-highlighting-3',
    name: 'DestinationMapHighlighting3',
    component: DestinationMapHighlighting3,
  },
  {
    path: '/destination-map-staging-1',
    name: 'DestinationMapStaging1',
    component: DestinationMapStaging1,
  },
  {
    path: '/destination-map-staging-2',
    name: 'DestinationMapStaging2',
    component: DestinationMapStaging2,
  },
  {
    path: '/destination-map-staging-3',
    name: 'DestinationMapStaging3',
    component: DestinationMapStaging3,
  },
  {
    path: '/destination-map-tracing-1',
    name: 'DestinationMapTracing1',
    component: DestinationMapTracing1,
  },
  {
    path: '/destination-map-tracing-2',
    name: 'DestinationMapTracing2',
    component: DestinationMapTracing2,
  },
  {
    path: '/destination-map-tracing-3',
    name: 'DestinationMapTracing3',
    component: DestinationMapTracing3,
  },
  {
    path: '/sankey-diagram-intro',
    name: 'SankeyDiagramIntro',
    component: SankeyDiagramIntro,
  },
  {
    path: '/sankey-diagram-highlighting-1',
    name: 'SankeyDiagramHighlighting1',
    component: SankeyDiagramHighlighting1,
  },
  {
    path: '/sankey-diagram-highlighting-2',
    name: 'SankeyDiagramHighlighting2',
    component: SankeyDiagramHighlighting2,
  },
  {
    path: '/sankey-diagram-highlighting-3',
    name: 'SankeyDiagramHighlighting3',
    component: SankeyDiagramHighlighting3,
  },
  {
    path: '/sankey-diagram-staging-1',
    name: 'SankeyDiagramStaging1',
    component: SankeyDiagramStaging1,
  },
  {
    path: '/sankey-diagram-staging-2',
    name: 'SankeyDiagramStaging2',
    component: SankeyDiagramStaging2,
  },
  {
    path: '/sankey-diagram-staging-3',
    name: 'SankeyDiagramStaging3',
    component: SankeyDiagramStaging3,
  },
  {
    path: '/sankey-diagram-tracing-1',
    name: 'SankeyDiagramTracing1',
    component: SankeyDiagramTracing1,
  },
  {
    path: '/sankey-diagram-tracing-2',
    name: 'SankeyDiagramTracing2',
    component: SankeyDiagramTracing2,
  },
  {
    path: '/sankey-diagram-tracing-3',
    name: 'SankeyDiagramTracing3',
    component: SankeyDiagramTracing3,
  },
  {
    path: '/network-diagram-intro',
    name: 'NetworkDiagramIntro',
    component: NetworkDiagramIntro,
  },
  {
    path: '/network-diagram-highlighting-1',
    name: 'NetworkDiagramHighlighting1',
    component: NetworkDiagramHighlighting1,
  },
  {
    path: '/network-diagram-highlighting-2',
    name: 'NetworkDiagramHighlighting2',
    component: NetworkDiagramHighlighting2,
  },
  {
    path: '/network-diagram-highlighting-3',
    name: 'NetworkDiagramHighlighting3',
    component: NetworkDiagramHighlighting3,
  },
  {
    path: '/network-diagram-staging-1',
    name: 'NetworkDiagramStaging1',
    component: NetworkDiagramStaging1,
  },
  {
    path: '/network-diagram-staging-2',
    name: 'NetworkDiagramStaging2',
    component: NetworkDiagramStaging2,
  },
  {
    path: '/network-diagram-staging-3',
    name: 'NetworkDiagramStaging3',
    component: NetworkDiagramStaging3,
  },
  {
    path: '/network-diagram-tracing-1',
    name: 'NetworkDiagramTracing1',
    component: NetworkDiagramTracing1,
  },
  {
    path: '/network-diagram-tracing-2',
    name: 'NetworkDiagramTracing2',
    component: NetworkDiagramTracing2,
  },
  {
    path: '/network-diagram-tracing-3',
    name: 'NetworkDiagramTracing3',
    component: NetworkDiagramTracing3,
  },
  {
    path: '/circle-packing-intro',
    name: 'CirclePackingIntro',
    component: CirclePackingIntro,
  },
  {
    path: '/circle-packing-highlighting-1',
    name: 'CirclePackingHighlighting1',
    component: CirclePackingHighlighting1,
  },
  {
    path: '/circle-packing-highlighting-2',
    name: 'CirclePackingHighlighting2',
    component: CirclePackingHighlighting2,
  },
  {
    path: '/circle-packing-highlighting-3',
    name: 'CirclePackingHighlighting3',
    component: CirclePackingHighlighting3,
  },
  {
    path: '/circle-packing-staging-1',
    name: 'CirclePackingStaging1',
    component: CirclePackingStaging1,
  },
  {
    path: '/circle-packing-staging-2',
    name: 'CirclePackingStaging2',
    component: CirclePackingStaging2,
  },
  {
    path: '/circle-packing-staging-3',
    name: 'CirclePackingStaging3',
    component: CirclePackingStaging3,
  },
  {
    path: '/treemap-intro',
    name: 'TreemapIntro',
    component: TreemapIntro,
  },
  {
    path: '/treemap-highlighting-1',
    name: 'TreemapHighlighting1',
    component: TreemapHighlighting1,
  },
  {
    path: '/treemap-highlighting-2',
    name: 'TreemapHighlighting2',
    component: TreemapHighlighting2,
  },
  {
    path: '/treemap-highlighting-3',
    name: 'TreemapHighlighting3',
    component: TreemapHighlighting3,
  },
  {
    path: '/treemap-staging-1',
    name: 'TreemapStaging1',
    component: TreemapStaging1,
  },
  {
    path: '/treemap-staging-2',
    name: 'TreemapStaging2',
    component: TreemapStaging2,
  },
  {
    path: '/treemap-staging-3',
    name: 'TreemapStaging3',
    component: TreemapStaging3,
  },
  {
    path: '/sunburst-intro',
    name: 'SunburstIntro',
    component: SunburstIntro,
  },
  {
    path: '/sunburst-highlighting-1',
    name: 'SunburstHighlighting1',
    component: SunburstHighlighting1,
  },
  {
    path: '/sunburst-highlighting-2',
    name: 'SunburstHighlighting2',
    component: SunburstHighlighting2,
  },
  {
    path: '/sunburst-highlighting-3',
    name: 'SunburstHighlighting3',
    component: SunburstHighlighting3,
  },
  {
    path: '/sunburst-staging-1',
    name: 'SunburstStaging1',
    component: SunburstStaging1,
  },
  {
    path: '/sunburst-staging-2',
    name: 'SunburstStaging2',
    component: SunburstStaging2,
  },
  {
    path: '/sunburst-staging-3',
    name: 'SunburstStaging3',
    component: SunburstStaging3,
  },
  {
    path: '/results',
    name: 'TimingResults',
    component: TimingResults,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（比如浏览器后退），恢复到该位置
    if (savedPosition) {
      return savedPosition
    }
    // 否则立即滚动到页面顶部（所有页面都适用）
    return { top: 0 }
  },
})

// 全局后置守卫：每次路由切换后强制滚动到顶部
router.afterEach((to, from) => {
  // 使用 nextTick 确保 DOM 更新后再滚动
  setTimeout(() => {
    // 滚动 window
    window.scrollTo(0, 0)
    // 滚动 app-container（实际的滚动容器）
    const appContainer = document.getElementById('app-container')
    if (appContainer) {
      appContainer.scrollTop = 0
    }
  }, 0)
})

export default router
