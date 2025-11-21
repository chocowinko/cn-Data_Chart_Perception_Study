<template>
  <div class="line-graph-task">
    <!-- 页面标题 -->
    <h2 class="page-title">折线图 + 追踪 (3/3)</h2>

    <!-- 主内容区域：左右两列布局 -->
    <div class="content-container">
      <!-- 左侧：任务问题区域 -->
      <div class="task-section">
        <h2 class="task-title">
          任务3：从年初到年末，最畅销和最不畅销产品之间的差距发生了什么变化？
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
              <span v-html="option.text"></span>
            </label>
          </div>
        </div>

        <!-- 按钮区域 -->
        <div class="button-control">
          <button
            class="confirm-btn"
            @click="handleConfirm(null, selectedAnswer, '/scatterplot-task')"
            :disabled="!selectedAnswer"
          >
            <span class="button-text">确认</span>
          </button>
          <button class="play-animation-btn" @click="handlePlayAnimation(playAnimation)">
            <span class="button-text">播放动画</span>
          </button>
        </div>
      </div>

      <!-- 右侧：图表区域 -->
      <div class="chart-area">
        <div class="embedded-html" v-html="chartHTML"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskTimer } from '@/composables/useTaskTimer'

const selectedAnswer = ref('')

const { handlePlayAnimation, handleConfirm } = useTaskTimer(
  'line-graph-tracing-3',
  '折线图 + 追踪 (3/3)',
)

const options = [
  {
    letter: 'A',
    value: 'A',
    text: '到年底，这一差距缩小了。',
  },
  {
    letter: 'B',
    value: 'B',
    text: '这一差距变化莫测。',
  },
  {
    letter: 'C',
    value: 'C',
    text: '这一差距全年大致保持不变。',
  },
  {
    letter: 'D',
    value: 'D',
    text: '到年底，这一差距扩大了。',
  },
]

const chartHTML = ref(`
<style>
.container {
    max-width: none;
    width: 100%;
    margin: 0 auto;
    background: white;
    border-radius: 10px;
    padding: 30px 10px 30px 30px;
    margin-top: -50px;
}
h1 {
    text-align: left;
    color: #2c3e50;
    margin-bottom: -10px;
    font-size: 16px !important;
    font-weight: 600;
    font-family: PingFang SC, sans-serif;
}
.chart-container {
    position: relative;
    height: 600px;
    margin: -20px 0 10px 0;
}
svg {
    width: 100%;
    height: 100%;
}
.line {
    fill: none;
    stroke-width: 2;
}
.dot {
    r: 4;
}
.dot:hover {
    r: 6;
}
.axis {
    font-size: 16px !important;
}
.axis-label {
    font-size: 16px !important;
    font-weight: bold;
}
.legend {
    font-size: 16px !important;
}
.tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px;
    border-radius: 4px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s;
}
</style>
<div class="container">
    <h1>2024年产品类别销售波动分析</h1>
    <div class="chart-container">
        <svg id="salesChart"></svg>
    </div>
    <div id="tooltip" class="tooltip"></div>
</div>
`)

let chartInitialized = false

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://d3js.org/d3.v7.min.js'
  script.onload = () => {
    setTimeout(() => {
      initializeChart()
    }, 100)
  }
  document.head.appendChild(script)
})

function initializeChart() {
  if (chartInitialized) return
  chartInitialized = true

  function parseCSV(csvText) {
    const lines = csvText.split('\n')
    const headers = lines[1].split(',').map((h) => h.trim())
    const months = [
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
    const categories = {}

    for (let i = 3; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue
      const values = line.split(',').map((v) => v.trim())
      if (values.length < 2) continue
      for (let j = 1; j < Math.min(values.length, headers.length); j++) {
        const originalCategoryName = headers[j].replace('(亿元)', '').trim()
        const categoryName = originalCategoryName // categoryMap[originalCategoryName] || originalCategoryName
        const value = parseInt(values[j])
        if (!isNaN(value) && categoryName) {
          if (!categories[categoryName]) categories[categoryName] = []
          categories[categoryName].push(value)
        }
      }
    }
    return { months, categories }
  }

  function createEmptyChart(rawData) {
    const filteredCategories = {}
    Object.keys(rawData.categories).forEach((category) => {
      const values = rawData.categories[category]
      const maxValue = Math.max(...values)
      if (maxValue <= 1000) {
        filteredCategories[category] = values
      }
    })

    function calculateStandardDeviation(values) {
      const mean = values.reduce((sum, val) => sum + val, 0) / values.length
      const squaredDiffs = values.map((val) => Math.pow(val - mean, 2))
      const avgSquaredDiff = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length
      return Math.sqrt(avgSquaredDiff)
    }

    const categoryData = Object.keys(filteredCategories)
      .map((category) => {
        const values = filteredCategories[category]
        const volatility = calculateStandardDeviation(values)
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length
        const min = Math.min(...values)
        const max = Math.max(...values)
        return { category, volatility, mean, min, max, values }
      })
      .sort((a, b) => a.mean - b.mean)

    const smallGoods = categoryData.filter((d) => d.mean <= 200)
    const mediumGoods = categoryData.filter((d) => d.mean > 200 && d.mean <= 500)
    const largeGoods = categoryData.filter((d) => d.mean > 500)

    const volatilityData = [...smallGoods, ...mediumGoods, ...largeGoods]

    const distinctColors = [
      '#8dd3c7',
      '#E2D874',
      '#bebada',
      '#fb8072',
      '#80b1d3',
      '#fdb462',
      '#b3de69',
      '#fccde5',
      '#d9d9d9',
      '#bc80bd',
      '#ccebc5',
    ]

    const margin = { top: 60, right: 180, bottom: 60, left: 80 }
    const containerWidth = document.querySelector('.chart-container').clientWidth
    const containerHeight = 600
    const width = containerWidth - margin.left - margin.right
    const height = containerHeight - margin.top - margin.bottom

    d3.select('#salesChart').selectAll('*').remove()

    const svg = d3
      .select('#salesChart')
      .attr('width', containerWidth)
      .attr('height', containerHeight)

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    const xScale = d3.scalePoint().domain(rawData.months).range([0, width]).padding(0.1)

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(volatilityData, (d) => d3.max(d.values))])
      .range([height, 0])

    const line = d3
      .line()
      .x((d, i) => xScale(rawData.months[i]))
      .y((d) => yScale(d))

    g.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))

    g.append('g').attr('class', 'axis').call(d3.axisLeft(yScale))

    g.append('text')
      .attr('class', 'axis-label')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .style('text-anchor', 'middle')
      .text('月份')

    g.append('text')
      .attr('class', 'axis-label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -60)
      .style('text-anchor', 'middle')
      .text('销售额 (亿元)')

    // 创建图例（静态显示，和staging页面一样）
    const legend = svg
      .append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width + margin.left + 20}, ${margin.top})`)

    // 添加图例项目（倒序显示，但保持颜色对应关系）
    volatilityData
      .slice()
      .reverse()
      .forEach((item, reverseIndex) => {
        const originalIndex = volatilityData.length - 1 - reverseIndex
        const color = distinctColors[originalIndex % distinctColors.length]
        const legendRow = legend
          .append('g')
          .attr('class', 'legend-item')
          .attr('data-category', item.category)
          .attr('transform', `translate(0, ${reverseIndex * 20})`)
          .style('opacity', 1) // 静态显示，不隐藏

        legendRow.append('circle').attr('r', 4).style('fill', color)

        legendRow
          .append('text')
          .attr('x', 10)
          .attr('y', 0)
          .attr('dy', '0.32em')
          .style('font-size', '9px')
          .text(item.category)
      })

    // 保存数据供动画使用
    window.chartData = {
      volatilityData,
      rawData,
      xScale,
      yScale,
      g,
      distinctColors,
      svg,
      width,
      margin,
      line,
      legend,
    }
  }

  async function loadDataAndCreateChart() {
    try {
      const response = await fetch('/销售额.csv')
      const csvText = await response.text()
      const rawData = parseCSV(csvText)
      createEmptyChart(rawData)
    } catch (error) {
      console.error('Failed to load CSV file:', error)
      document.getElementById('salesChart').style.display = 'none'
      const container = document.querySelector('.chart-container')
      container.innerHTML =
        '<p style="text-align: center; color: #e74c3c; padding: 50px;">无法加载数据文件</p>'
    }
  }

  loadDataAndCreateChart()
}

const playAnimation = () => {
  if (!window.chartData) return

  const {
    volatilityData,
    rawData,
    xScale,
    yScale,
    g,
    distinctColors,
    svg,
    width,
    margin,
    line,
    legend,
  } = window.chartData

  // 清除现有内容
  g.selectAll('.line').remove()
  g.selectAll('.dot').remove()

  const tooltip = d3.select('#tooltip')

  // 绘制线条和点的追踪动画
  volatilityData.forEach((item, index) => {
    const color = distinctColors[index % distinctColors.length]

    // 绘制线条
    const path = g
      .append('path')
      .datum(item.values)
      .attr('class', 'line')
      .attr('d', line)
      .style('stroke', color)
      .style('fill', 'none')
      .style('animation-delay', `${index * 0.3}s`)

    // 获取路径长度并设置动画
    const pathLength = path.node().getTotalLength()
    path
      .style('stroke-dasharray', pathLength)
      .style('stroke-dashoffset', pathLength)
      .transition()
      .duration(6000)
      .ease(d3.easeLinear)
      .style('stroke-dashoffset', 0)

    // 绘制数据点（与线条同步显示）
    const totalPoints = item.values.length
    const animationDuration = 6000

    g.selectAll(`.dot-${index}`)
      .data(item.values)
      .enter()
      .append('circle')
      .attr('class', `dot dot-${index}`)
      .attr('cx', (d, i) => xScale(rawData.months[i]))
      .attr('cy', (d) => yScale(d))
      .style('fill', color)
      .style('stroke', color)
      .attr('r', 0)
      .style('opacity', 0)
      .transition()
      .delay((d, i) => (i / (totalPoints - 1)) * animationDuration)
      .duration(300)
      .style('opacity', 1)
      .attr('r', 4)

    // 添加鼠标交互事件
    g.selectAll(`.dot-${index}`)
      .on('mouseover', function (event, d) {
        const monthIndex = item.values.indexOf(d)
        tooltip.transition().duration(200).style('opacity', 0.9)
        tooltip
          .html(
            `${item.category}: ${d} 亿元<br/>月份: ${rawData.months[monthIndex]}`,
          )
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px')
        d3.select(this).transition().duration(100).attr('r', 6)
      })
      .on('mouseout', function () {
        tooltip.transition().duration(500).style('opacity', 0)
        d3.select(this).transition().duration(100).attr('r', 4)
      })
  })
}

// confirmAnswer 功能已由 handleConfirm 替代
</script>

<style scoped>
.line-graph-task {
  width: 100%;
  padding: 0 0 60px 0;
  margin: 0;
  position: relative;
}

.page-title {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px !important;
  line-height: 24px !important;
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

.embedded-html {
  width: 100%;
  margin-bottom: 0;
}

.task-title {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px !important;
  line-height: 24px !important;
  color: #1f1f1f;
  margin: 10px 0 10px 0;
  text-align: left;
}

.task-title em {
  font-weight: 600;
  font-style: normal;
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
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px !important;
  line-height: 24px !important;
  color: #545454;
  cursor: pointer;
  text-align: left;
}

.option-label em {
  font-weight: 600;
  font-style: normal;
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
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px !important;
  line-height: 24px !important;
  color: #ffffff;
}
</style>
