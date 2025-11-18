<template>
  <div class="line-graph-task">
    <!-- 页面标题 -->
    <h2 class="page-title">折线图 + 高亮 (1/3)</h2>

    <!-- 主内容区域：左右两列布局 -->
    <div class="content-container">
      <!-- 左侧：任务问题区域 -->
      <div class="task-section">
        <h3 class="event-description">
          高亮事件：突出显示每条产品线全年中的峰值点（最高销售额）。
        </h3>

        <h2 class="task-title">
          任务1：所有销售峰值点被高亮后，以下哪个描述最能概括其出现的时间？
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
            @click="handleConfirm(null, selectedAnswer, '/line-graph-highlighting-2')"
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
        <!-- 嵌入完整的HTML内容 -->
        <div class="embedded-html" v-html="htmlContent"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskTimer } from '@/composables/useTaskTimer'

const selectedAnswer = ref('')

// 初始化计时器
const { handlePlayAnimation, handleConfirm } = useTaskTimer(
  'line-graph-highlighting-1',
  '折线图 + 高亮 (1/3)',
)

const options = [
  {
    letter: 'A',
    value: 'A',
    text: '所有峰值点都集中在一月至六月。',
  },
  {
    letter: 'B',
    value: 'B',
    text: '所有峰值点都集中在七月至十二月。',
  },
  {
    letter: 'C',
    value: 'C',
    text: '峰值点在一月至六月和七月至十二月之间均匀分布。',
  },
  {
    letter: 'D',
    value: 'D',
    text: '峰值点全年分散，无明显规律。',
  },
]

// 直接嵌入HTML内容
const htmlContent = ref(`
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
.highest-point {
    stroke-width: 3px;
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

onMounted(() => {
  // 加载D3.js
  const script = document.createElement('script')
  script.src = 'https://d3js.org/d3.v7.min.js'
  script.onload = () => {
    setTimeout(() => {
      initChart()
    }, 100)
  }
  document.head.appendChild(script)
})

function initChart() {
  // 嵌入原始HTML的完整JavaScript逻辑
  function parseCSV(csvText) {
    const lines = csvText.split('\n')
    const headers = lines[1].split(',').map((h) => h.trim())
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    const categories = {}

    for (let i = 3; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue
      const values = line.split(',').map((v) => v.trim())
      if (values.length < 2) continue
      for (let j = 1; j < Math.min(values.length, headers.length); j++) {
        const originalCategoryName = headers[j].replace('(亿元)', '').trim()
        const categoryName = originalCategoryName
        const value = parseInt(values[j])
        if (!isNaN(value) && categoryName) {
          if (!categories[categoryName]) categories[categoryName] = []
          categories[categoryName].push(value)
        }
      }
    }
    return { months, categories }
  }

  async function loadDataAndCreateChart() {
    try {
      const response = await fetch('/销售额.csv')
      const csvText = await response.text()
      const rawData = parseCSV(csvText)
      createChart(rawData)
    } catch (error) {
      console.error('Failed to load CSV file:', error)
      document.getElementById('salesChart').style.display = 'none'
      const container = document.querySelector('.chart-container')
      container.innerHTML =
        '<p style="text-align: center; color: #e74c3c; padding: 50px;">无法加载数据文件</p>'
    }
  }

  function createChart(rawData) {
    const filteredCategories = {}
    Object.keys(rawData.categories).forEach((category) => {
      const values = rawData.categories[category]
      if (Math.max(...values) <= 1000) {
        filteredCategories[category] = values
      }
    })

    const volatilityData = Object.keys(filteredCategories)
      .map((category) => {
        const values = filteredCategories[category]
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length
        const min = Math.min(...values)
        const max = Math.max(...values)
        return { category, values, mean, min, max }
      })
      .sort((a, b) => a.mean - b.mean)

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

    const margin = { top: 60, right: 180, bottom: 60, left: 60 }
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
      .attr('y', -40)
      .style('text-anchor', 'middle')
      .text('销售额 (亿元)')

    const tooltip = d3.select('#tooltip')

    // Store data for animation
    window.chartData = { volatilityData, rawData, xScale, yScale, g, distinctColors, line, tooltip }

    // Create legend
    const legend = svg
      .append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width + margin.left + 20}, ${margin.top})`)

    volatilityData
      .slice()
      .reverse()
      .forEach((item, reverseIndex) => {
        const originalIndex = volatilityData.length - 1 - reverseIndex
        const color = distinctColors[originalIndex % distinctColors.length]
        const legendRow = legend.append('g').attr('transform', `translate(0, ${reverseIndex * 20})`)

        legendRow.append('circle').attr('r', 4).style('fill', color)

        legendRow
          .append('text')
          .attr('x', 10)
          .attr('y', 0)
          .attr('dy', '0.32em')
          .style('font-size', '9px')
          .text(item.category)
      })
  }

  // Initialize empty chart
  loadDataAndCreateChart()

  // Expose functions globally
  window.increaseSaturation = function (color, factor = 1.5) {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)

    const rNorm = r / 255
    const gNorm = g / 255
    const bNorm = b / 255

    const max = Math.max(rNorm, gNorm, bNorm)
    const min = Math.min(rNorm, gNorm, bNorm)
    const diff = max - min

    const l = (max + min) / 2
    let s = 0
    let h = 0

    if (diff !== 0) {
      s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min)

      switch (max) {
        case rNorm:
          h = (gNorm - bNorm) / diff + (gNorm < bNorm ? 6 : 0)
          break
        case gNorm:
          h = (bNorm - rNorm) / diff + 2
          break
        case bNorm:
          h = (rNorm - gNorm) / diff + 4
          break
      }
      h /= 6
    }

    s = 0.9

    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    let rNew, gNew, bNew
    if (s === 0) {
      rNew = gNew = bNew = l
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      rNew = hue2rgb(p, q, h + 1 / 3)
      gNew = hue2rgb(p, q, h)
      bNew = hue2rgb(p, q, h - 1 / 3)
    }

    const toHex = (c) => {
      const hex = Math.round(c * 255).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }

    return `#${toHex(rNew)}${toHex(gNew)}${toHex(bNew)}`
  }

  window.highlightAllPeakPoints = function (
    volatilityData,
    svgGroup,
    xScale,
    yScale,
    rawData,
    distinctColors,
  ) {
    console.log('Starting to highlight peak points')

    volatilityData.forEach((item, index) => {
      const maxValue = Math.max(...item.values)
      const maxIndex = item.values.indexOf(maxValue)
      const originalColor = distinctColors[index % distinctColors.length]
      const saturatedColor = window.increaseSaturation(originalColor, 1.8)

      console.log(
        `Processing ${item.category}, peak at month ${maxIndex}, original: ${originalColor}, new: ${saturatedColor}`,
      )

      const maxPointX = xScale(rawData.months[maxIndex])
      const maxPointY = yScale(item.values[maxIndex])

      // Remove original peak point
      svgGroup
        .selectAll(`.dot-${index}`)
        .filter((d, i) => i === maxIndex)
        .remove()

      // Create new highlight circle
      const highlightCircle = svgGroup
        .append('circle')
        .datum(item.values[maxIndex])
        .attr('class', `big-highlight-${index}`)
        .attr('cx', maxPointX)
        .attr('cy', maxPointY)
        .attr('r', 8)
        .attr('fill', saturatedColor)
        .style('opacity', 1)
        .on('mouseover', function (event, d) {
          const tooltip = d3.select('#tooltip')
          tooltip.transition().duration(200).style('opacity', 0.9)
          tooltip
            .html(
              `${item.category}: ${d} 亿元<br/>月份: ${rawData.months[maxIndex]}`,
            )
            .style('left', event.pageX + 10 + 'px')
            .style('top', event.pageY - 28 + 'px')
        })
        .on('mouseout', function () {
          const tooltip = d3.select('#tooltip')
          tooltip.transition().duration(500).style('opacity', 0)
        })

      // Move to top layer
      highlightCircle.node().parentNode.appendChild(highlightCircle.node())
    })
  }
}

const playAnimation = () => {
  if (!window.chartData) return

  const { volatilityData, rawData, xScale, yScale, g, distinctColors, line, tooltip } =
    window.chartData

  // Clear existing lines and dots
  g.selectAll('.line').remove()
  g.selectAll('.dot').remove()
  g.selectAll('[class^="big-highlight"]').remove()

  // Draw all lines and points
  volatilityData.forEach((item, index) => {
    const color = distinctColors[index % distinctColors.length]

    g.append('path')
      .datum(item.values)
      .attr('class', 'line')
      .attr('d', line)
      .style('stroke', color)
      .style('fill', 'none')
      .style('stroke-width', 2)

    g.selectAll(`.dot-${index}`)
      .data(item.values)
      .enter()
      .append('circle')
      .attr('class', `dot dot-${index}`)
      .attr('cx', (d, i) => xScale(rawData.months[i]))
      .attr('cy', (d) => yScale(d))
      .attr('r', 4)
      .style('fill', color)
      .style('stroke', color)
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

  // Highlight peak points after 1 second
  setTimeout(() => {
    window.highlightAllPeakPoints(volatilityData, g, xScale, yScale, rawData, distinctColors)
  }, 1000)
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

.event-description {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px !important;
  line-height: 24px !important;
  color: #545454;
  margin: 10px 0 20px 0;
  text-align: left;
  font-style: italic;
}

.event-description em {
  font-weight: 600;
  font-style: italic;
}

.task-title {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px !important;
  line-height: 24px !important;
  color: #1f1f1f;
  margin: 0 0 10px 0;
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
