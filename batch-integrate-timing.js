/**
 * 批量集成计时功能的配置文件
 * 
 * 使用方法：
 * 1. 这个文件定义了所有需要集成计时功能的任务页面
 * 2. 每个任务包含：文件路径、任务ID、任务名称、下一个路由
 */

const tasksToIntegrate = [
  // ==================== Scatterplot (9个任务) ====================
  {
    file: 'src/components/pages/formal-experiment/Scatterplot/ScatterplotHighlighting1.vue',
    taskId: 'scatterplot-highlighting-1',
    taskName: 'Scatterplot + Highlighting (1/3)',
    nextRoute: '/scatterplot-highlighting-2'
  },
  {
    file: 'src/components/pages/formal-experiment/Scatterplot/ScatterplotHighlighting2.vue',
    taskId: 'scatterplot-highlighting-2',
    taskName: 'Scatterplot + Highlighting (2/3)',
    nextRoute: '/scatterplot-highlighting-3'
  },
  {
    file: 'src/components/pages/formal-experiment/Scatterplot/ScatterplotHighlighting3.vue',
    taskId: 'scatterplot-highlighting-3',
    taskName: 'Scatterplot + Highlighting (3/3)',
    nextRoute: '/scatterplot-staging-1'
  },
  {
    file: 'src/components/pages/formal-experiment/Scatterplot/ScatterplotStaging1.vue',
    taskId: 'scatterplot-staging-1',
    taskName: 'Scatterplot + Staging (1/3)',
    nextRoute: '/scatterplot-staging-2'
  },
  {
    file: 'src/components/pages/formal-experiment/Scatterplot/ScatterplotStaging2.vue',
    taskId: 'scatterplot-staging-2',
    taskName: 'Scatterplot + Staging (2/3)',
    nextRoute: '/scatterplot-staging-3'
  },
  {
    file: 'src/components/pages/formal-experiment/Scatterplot/ScatterplotStaging3.vue',
    taskId: 'scatterplot-staging-3',
    taskName: 'Scatterplot + Staging (3/3)',
    nextRoute: '/scatterplot-tracing-1'
  },
  {
    file: 'src/components/pages/formal-experiment/Scatterplot/ScatterplotTracing1.vue',
    taskId: 'scatterplot-tracing-1',
    taskName: 'Scatterplot + Tracing (1/3)',
    nextRoute: '/scatterplot-tracing-2'
  },
  {
    file: 'src/components/pages/formal-experiment/Scatterplot/ScatterplotTracing2.vue',
    taskId: 'scatterplot-tracing-2',
    taskName: 'Scatterplot + Tracing (2/3)',
    nextRoute: '/scatterplot-tracing-3'
  },
  {
    file: 'src/components/pages/formal-experiment/Scatterplot/ScatterplotTracing3.vue',
    taskId: 'scatterplot-tracing-3',
    taskName: 'Scatterplot + Tracing (3/3)',
    nextRoute: '/heatmap-intro'
  },

  // ==================== Heatmap (9个任务) ====================
  {
    file: 'src/components/pages/formal-experiment/Heatmap/HeatmapHighlighting1.vue',
    taskId: 'heatmap-highlighting-1',
    taskName: 'Heatmap + Highlighting (1/3)',
    nextRoute: '/heatmap-highlighting-2'
  },
  {
    file: 'src/components/pages/formal-experiment/Heatmap/HeatmapHighlighting2.vue',
    taskId: 'heatmap-highlighting-2',
    taskName: 'Heatmap + Highlighting (2/3)',
    nextRoute: '/heatmap-highlighting-3'
  },
  {
    file: 'src/components/pages/formal-experiment/Heatmap/HeatmapHighlighting3.vue',
    taskId: 'heatmap-highlighting-3',
    taskName: 'Heatmap + Highlighting (3/3)',
    nextRoute: '/heatmap-staging-1'
  },
  {
    file: 'src/components/pages/formal-experiment/Heatmap/HeatmapStaging1.vue',
    taskId: 'heatmap-staging-1',
    taskName: 'Heatmap + Staging (1/3)',
    nextRoute: '/heatmap-staging-2'
  },
  {
    file: 'src/components/pages/formal-experiment/Heatmap/HeatmapStaging2.vue',
    taskId: 'heatmap-staging-2',
    taskName: 'Heatmap + Staging (2/3)',
    nextRoute: '/heatmap-staging-3'
  },
  {
    file: 'src/components/pages/formal-experiment/Heatmap/HeatmapStaging3.vue',
    taskId: 'heatmap-staging-3',
    taskName: 'Heatmap + Staging (3/3)',
    nextRoute: '/heatmap-tracing-1'
  },
  {
    file: 'src/components/pages/formal-experiment/Heatmap/HeatmapTracing1.vue',
    taskId: 'heatmap-tracing-1',
    taskName: 'Heatmap + Tracing (1/3)',
    nextRoute: '/heatmap-tracing-2'
  },
  {
    file: 'src/components/pages/formal-experiment/Heatmap/HeatmapTracing2.vue',
    taskId: 'heatmap-tracing-2',
    taskName: 'Heatmap + Tracing (2/3)',
    nextRoute: '/heatmap-tracing-3'
  },
  {
    file: 'src/components/pages/formal-experiment/Heatmap/HeatmapTracing3.vue',
    taskId: 'heatmap-tracing-3',
    taskName: 'Heatmap + Tracing (3/3)',
    nextRoute: '/destination-map-intro'
  },

  // ==================== 其他图表类型待补充 ====================
];

console.log(`总共需要集成 ${tasksToIntegrate.length} 个任务页面`);

module.exports = tasksToIntegrate;
