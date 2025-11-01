<template>
  <div class="scatterplot-task">
    <!-- 页面标题 -->
    <h2 class="page-title">散点图 + 追踪 (2/3)</h2>

    <!-- 两栏布局容器 -->
    <div class="content-container">
      <!-- 左侧任务区域 -->
      <div class="task-section">
        <h2 class="task-title">
          任务2：与2014年的数据点相比，这些点在垂直方向上（上下）是更分散了，还是更聚集了？
        </h2>

        <div class="options-section">
          <div class="option" v-for="(option, index) in options" :key="index">
            <input
              type="radio"
              :id="`option-${index}`"
              :value="option.value"
              v-model="selectedAnswer"
              class="option-radio"
            />
            <label :for="`option-${index}`" class="option-label">
              <span class="option-letter">({{ option.letter }})</span>
              {{ option.text }}
            </label>
          </div>
        </div>

        <!-- 按钮控制区 -->
        <div class="button-control">
          <button
            class="confirm-btn"
            @click="handleConfirm(null, selectedAnswer, '/scatterplot-tracing-3')"
            :disabled="!selectedAnswer"
          >
            <span class="button-text">确认</span>
          </button>
          <button class="play-animation-btn" @click="handlePlayAnimation(playAnimation)">
            <span class="button-text">播放动画</span>
          </button>
        </div>
      </div>

      <!-- 右侧图表区域 -->
      <div class="chart-area">
        <div class="chart-container">
          <div id="scatterplot-chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTaskTimer } from '@/composables/useTaskTimer'

const selectedAnswer = ref('')

const { handlePlayAnimation, handleConfirm } = useTaskTimer(
  'scatterplot-tracing-2',
  '散点图 + 追踪 (2/3)',
)
let svg = null
let g = null
let x = null
let y = null
let width = 0
let height = 0
let mergedData = null
let colorScale = null
let isAnimating = false

const options = [
  {
    letter: 'A',
    value: 'A',
    text: '更分散了',
  },
  {
    letter: 'B',
    value: 'B',
    text: '更聚集了',
  },
  {
    letter: 'C',
    value: 'C',
    text: '点的分散程度基本保持不变',
  },
  {
    letter: 'D',
    value: 'D',
    text: '点只在水平方向上靠得更近，而不是在垂直方向上',
  },
]

onMounted(() => {
  // 动态加载D3.js
  const script = document.createElement('script')
  script.src = 'https://d3js.org/d3.v7.min.js'
  script.onload = () => {
    setTimeout(() => {
      initScatterplot()
    }, 50)
  }
  document.head.appendChild(script)
})

onUnmounted(() => {
  // 清理
  if (svg) {
    svg.selectAll('*').remove()
  }
})

const initScatterplot = () => {
  // 基础配置
  const margin = { top: 80, right: 100, bottom: 100, left: 100 }
  const container = document.querySelector('.chart-container')
  const svgWidth = container.clientWidth - 60 // 减去padding
  const svgHeight = 600

  const chartDiv = document.getElementById('scatterplot-chart')
  chartDiv.innerHTML = '' // 清空容器

  svg = d3
    .select('#scatterplot-chart')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)

  width = svgWidth - margin.left - margin.right
  height = svgHeight - margin.top - margin.bottom

  g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

  x = d3.scaleLinear().range([0, width])
  y = d3.scaleLinear().range([height, 0])

  // 月份颜色映射 - 与HTML完全一致
  const monthColors = [
    '#E0C4C4',
    '#4FAFAF',
    '#A8C8A8',
    '#F0906F',
    '#9BC49C',
    '#448CB3',
    '#898888',
    '#E63946',
    '#F4E4BC',
    '#7FB3D3',
    '#D4AF37',
    '#BEA4B4',
  ]
  colorScale = d3.scaleOrdinal().domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).range(monthColors)

  // 加载和处理数据
  fetch('/src/All/Scatterplot/PRSA_Data_Changping_20130301-20170228.csv')
    .then((response) => response.text())
    .then((csvText) => {
      const rawData = d3.csvParse(csvText, d3.autoType)

      // 处理数据
      const data2014Map = new Map()
      const data2016Map = new Map()

      rawData.forEach((row) => {
        const year = row.year
        const month = row.month
        const day = row.day
        const dayOfYear = Math.floor(
          (new Date(year, month - 1, day) - new Date(year, 0, 0)) / (1000 * 60 * 60 * 24),
        )

        const pm25 = parseFloat(row['PM2.5'])
        const o3 = parseFloat(row['O3'])

        if (!isNaN(pm25) && !isNaN(o3) && pm25 > 0 && o3 > 0) {
          if (year === 2014) {
            if (!data2014Map.has(dayOfYear)) {
              data2014Map.set(dayOfYear, {
                pm25_sum: 0,
                o3_sum: 0,
                count: 0,
                month: month,
                day: day,
              })
            }
            const dayData = data2014Map.get(dayOfYear)
            dayData.pm25_sum += pm25
            dayData.o3_sum += o3
            dayData.count++
          } else if (year === 2016) {
            if (!data2016Map.has(dayOfYear)) {
              data2016Map.set(dayOfYear, {
                pm25_sum: 0,
                o3_sum: 0,
                count: 0,
                month: month,
                day: day,
              })
            }
            const dayData = data2016Map.get(dayOfYear)
            dayData.pm25_sum += pm25
            dayData.o3_sum += o3
            dayData.count++
          }
        }
      })

      // 合并2014和2016数据（只使用偶数天）
      mergedData = []
      data2014Map.forEach((d1, dayOfYear) => {
        const d2 = data2016Map.get(dayOfYear)
        if (d2 && d1.count > 0 && d2.count > 0 && d1.day % 2 === 0) {
          mergedData.push({
            day_of_year: dayOfYear,
            month: d1.month,
            x1: d1.o3_sum / d1.count, // 2014 O3
            y1: d1.pm25_sum / d1.count, // 2014 PM2.5
            x2: d2.o3_sum / d2.count, // 2016 O3
            y2: d2.pm25_sum / d2.count, // 2016 PM2.5
          })
        }
      })

      // 设置固定坐标范围，与Staging页面保持一致
      x.domain([0, 200])
      y.domain([0, 420])

      drawInitialState()
    })
    .catch((error) => {
      console.error('Error loading data:', error)
    })
}

const drawInitialState = () => {
  g.selectAll('*').remove() // 清空画布
  svg.selectAll('.chart-title').remove() // 清除旧标题

  // 添加图表标题（添加到SVG上而不是g上，这样才能真正左对齐）
  svg
    .append('text')
    .attr('class', 'chart-title')
    .attr('text-anchor', 'start')
    .attr('x', 30)
    .attr('y', 30)
    .style('font-size', '18px')
    .style('font-weight', 'bold')
    .style('fill', '#2c3e50')
    .style('font-family', 'PingFang SC, sans-serif')
    .text('北京市昌平区PM2.5与臭氧浓度变化轨迹 (2014-2016)')

  // 添加坐标轴
  g.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${y.range()[0]})`)
  g.append('g').attr('class', 'y-axis')

  // 添加网格线
  g.append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(0,${y.range()[0]})`)
    .call(d3.axisBottom(x).tickSize(-height).tickFormat(''))
    .style('stroke-opacity', 0.1)

  g.append('g')
    .attr('class', 'grid')
    .call(d3.axisLeft(y).tickSize(-x.range()[1]).tickFormat(''))
    .style('stroke-opacity', 0.1)

  g.select('.x-axis').call(d3.axisBottom(x))
  g.select('.y-axis').call(d3.axisLeft(y))

  // 添加坐标轴标题
  g.append('text')
    .attr('class', 'x-axis-title')
    .attr('text-anchor', 'middle')
    .attr('x', x.range()[1] / 2)
    .attr('y', y.range()[0] + 45)
    .style('font-size', '14px')
    .style('fill', '#333')
    .text('臭氧日均浓度 (O3, μg/m³)')

  g.append('text')
    .attr('class', 'y-axis-title')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .attr('y', -50)
    .attr('x', -y.range()[0] / 2)
    .style('font-size', '14px')
    .style('fill', '#333')
    .text('PM2.5日均浓度 (μg/m³)')

  // 添加月份图例
  const legend = g
    .append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${x.range()[1] + 20}, 20)`)

  // 添加图例背景框
  legend
    .append('rect')
    .attr('x', -8)
    .attr('y', -8)
    .attr('width', 50)
    .attr('height', 12 * 18 + 8)
    .attr('fill', 'rgba(255,255,255,0.8)')
    .attr('stroke', 'rgba(0,0,0,0.2)')
    .attr('stroke-width', 1)

  const monthNames = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ]

  monthNames.forEach((month, i) => {
    const legendRow = legend.append('g').attr('transform', `translate(0, ${i * 18})`)

    legendRow
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 4)
      .style('fill', colorScale(i + 1))

    legendRow
      .append('text')
      .attr('x', 10)
      .attr('y', 4)
      .text(month)
      .style('font-size', '11px')
      .style('fill', '#333')
  })

  // 绘制2014年的初始点
  g.selectAll('.dot')
    .data(mergedData)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('cx', (d) => x(d.x1))
    .attr('cy', (d) => y(d.y1))
    .attr('r', 4)
    .style('fill', (d) => colorScale(d.month))
    .style('stroke', '#fff')
    .style('stroke-width', '0.5px')
}

const playAnimation = () => {
  if (!mergedData || isAnimating) return

  isAnimating = true

  // 重置到初始状态
  drawInitialState()

  setTimeout(() => {
    traceAnimation()
  }, 100)
}

const traceAnimation = () => {
  if (!mergedData) return

  // 清除旧的轨迹线
  g.selectAll('.trace-line').remove()
  g.selectAll('defs').remove()

  // 创建渐变定义
  const defs = g.append('defs')

  // 为每个数据点创建轨迹线，使用渐变颜色
  const lines = g
    .selectAll('.trace-line')
    .data(mergedData)
    .enter()
    .append('line')
    .attr('class', 'trace-line')
    .attr('x1', (d) => x(d.x1))
    .attr('y1', (d) => y(d.y1))
    .attr('x2', (d) => x(d.x1)) // 初始状态，终点=起点
    .attr('y2', (d) => y(d.y1))
    .attr('stroke', (d, i) => {
      // 为每条线创建唯一的渐变
      const gradientId = `gradient-${i}`
      const gradient = defs
        .append('linearGradient')
        .attr('id', gradientId)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', x(d.x1)) // 起点坐标（2014年数据点）
        .attr('y1', y(d.y1))
        .attr('x2', x(d.x2)) // 终点坐标（2016年数据点）
        .attr('y2', y(d.y2))

      // 起点（2014年）- 浅色
      gradient
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', colorScale(d.month))
        .attr('stop-opacity', 0.2)

      // 终点（2016年）- 深色
      gradient
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', colorScale(d.month))
        .attr('stop-opacity', 0.8)

      return `url(#${gradientId})`
    })
    .attr('stroke-width', 3)
    .attr('stroke-opacity', 0)

  // 创建渐变轨迹动画
  lines
    .transition()
    .delay((d, i) => i * 3) // 延迟创建流动效果
    .duration(0)
    .attr('stroke-opacity', 0.3)
    .transition()
    .duration(3000)
    .ease(d3.easeQuadInOut)
    .attr('x2', (d) => x(d.x2))
    .attr('y2', (d) => y(d.y2))

  // 确保数据点在轨迹线之上
  const dots = g.selectAll('.dot')
  dots.raise() // 将所有数据点提升到最上层

  // 数据点移动动画
  dots
    .transition()
    .delay((d, i) => i * 3)
    .duration(3000)
    .ease(d3.easeQuadInOut)
    .attr('cx', (d) => x(d.x2))
    .attr('cy', (d) => y(d.y2))
    .style('fill', (d) => colorScale(d.month))
    .attr('r', 5) // 稍微增大半径
    .on('end', () => {
      isAnimating = false
    })
}

// confirmAnswer 功能已由 handleConfirm 替代
</script>

<style>
/* D3 axis styles - must not be scoped */
.axis path,
.axis line {
  fill: none;
  stroke: #333;
  shape-rendering: crispEdges;
}

.axis text {
  font-family:
    PingFang SC,
    sans-serif;
  font-size: 11px;
  fill: #333;
}

.x-axis path,
.y-axis path {
  stroke: #333;
}

.x-axis line,
.y-axis line {
  stroke: #ddd;
}

.x-axis .tick line,
.y-axis .tick line {
  stroke: rgba(128, 128, 128, 0.2);
}

/* Grid styles */
.grid line {
  stroke: rgba(128, 128, 128, 0.2);
  stroke-opacity: 0.7;
}

.grid path {
  stroke-width: 0;
}
</style>

<style scoped>
.scatterplot-task {
  width: 100%;
  padding: 0 0 60px 0;
  margin: 0;
  position: relative;
}

.page-title {
  font-family:
    PingFang SC,
    sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1f1f1f;
  margin: 0 0 10px 0;
  padding: 0;
  text-align: left;
  position: absolute;
  left: 0;
  top: 0;
}

.content-container {
  display: flex;
  gap: 0;
  margin-bottom: 40px;
  margin-top: 0;
  align-items: flex-start;
}

.task-section {
  flex: 0 0 280px;
  min-width: 280px;
  margin-top: 30px;
}

.chart-area {
  flex: 1;
  min-width: 800px;
  width: calc(100vw - 320px);
  margin-top: 60px;
}

.chart-container {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  width: 100%;
  height: 600px;
  box-sizing: border-box;
  margin-top: -50px;
}

#scatterplot-chart {
  width: 100%;
  height: 100%;
}

.task-title {
  font-family:
    PingFang SC,
    sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #1f1f1f;
  margin: 10px 0 10px 0;
  text-align: left;
}

.options-section {
  margin-bottom: 20px;
}

.option {
  display: flex;
  align-items: flex-start;
  margin-bottom: 6px;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.option:hover {
  background-color: #f5f5f5;
}

.option-radio {
  margin-right: 12px;
  margin-top: 4px;
  flex-shrink: 0;
}

.option-label {
  font-family:
    PingFang SC,
    sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #545454;
  cursor: pointer;
  text-align: left;
}

.option-letter {
  font-weight: 600;
  color: #1f1f1f;
  margin-right: 8px;
}

.button-control {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
  margin-top: 0;
}

.confirm-btn {
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
}

.confirm-btn:hover:not(:disabled) {
  background-color: #333;
}

.confirm-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.play-animation-btn {
  width: 160px;
  height: 50px;
  background: #1f1f1f;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.play-animation-btn:hover {
  background-color: #333;
}

.play-animation-btn:active {
  transform: translateY(1px);
}

.button-text {
  font-family:
    PingFang SC,
    sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
}
</style>
