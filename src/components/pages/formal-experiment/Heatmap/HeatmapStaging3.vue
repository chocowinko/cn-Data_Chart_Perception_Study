<template>
  <div class="heatmap-staging-task">
    <!-- 页面标题 -->
    <h2 class="page-title">热力图 + 分阶段 (3/3)</h2>

    <!-- 主内容区域：左右两列布局 -->
    <div class="content-container">
      <!-- 左侧：任务问题区域 -->
      <div class="task-section">
        <h2 class="task-title">
          任务3：对于夏季月份，哪个城市的每日温度变化更不可预测（即红色看起来更混乱）？
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
            @click="handleConfirm(null, selectedAnswer, '/heatmap-tracing-1')"
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
        <div class="chart-display">
          <div class="main-container">
            <h1 class="chart-main-title">2019年莫斯科和哥本哈根热力图</h1>

            <!-- Moscow 热力图 -->
            <div class="chart-container" id="chart-container-moscow">
              <div class="chart-area-inner">
                <h2 class="chart-title">莫斯科</h2>
                <div id="axis-months-moscow" class="axis-months"></div>
                <div id="axis-days-moscow" class="axis-days"></div>
                <div id="chart-grid-moscow" class="chart-grid"></div>
              </div>
              <div class="legend-container"></div>
            </div>

            <!-- Copenhagen 热力图 -->
            <div class="chart-container" id="chart-container-copenhagen">
              <div class="chart-area-inner">
                <h2 class="chart-title">哥本哈根</h2>
                <div id="axis-months-copenhagen" class="axis-months"></div>
                <div id="axis-days-copenhagen" class="axis-days"></div>
                <div id="chart-grid-copenhagen" class="chart-grid"></div>
              </div>
              <div class="legend-container"></div>
            </div>

            <div id="tooltip"></div>
            <div id="warn" class="warn"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTaskTimer } from '@/composables/useTaskTimer'

const selectedAnswer = ref('')

const { handlePlayAnimation, handleConfirm } = useTaskTimer(
  'heatmap-staging-3',
  '热力图 + 分阶段 (3/3)',
)

let isAnimationActive = true // 控制动画是否应该继续

const options = [
  {
    letter: 'A',
    value: 'A',
    text: '莫斯科的温度变化更大，颜色看起来更混乱和多样。',
  },
  {
    letter: 'B',
    value: 'B',
    text: '哥本哈根的温度变化更不可预测。',
  },
  {
    letter: 'C',
    value: 'C',
    text: '两个城市的夏季温度都非常稳定，几乎没有变化。',
  },
  {
    letter: 'D',
    value: 'D',
    text: '两个城市在夏季的温度变化相似。',
  },
]

onMounted(() => {
  isAnimationActive = true
  initHeatmapStaging()
})

onBeforeUnmount(() => {
  // 停止动画
  isAnimationActive = false
  // 清理 window 对象上的数据
  if (window.heatmapData) {
    delete window.heatmapData
  }
})

const initHeatmapStaging = async () => {
  try {
    // 数据存储
    const dataMoscow = new Map()
    const dataCopenhagen = new Map()

    const MONTH_NAMES = [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ]
    const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    // 加载CSV数据
    const loadCSV = async () => {
      const response = await fetch('/moscow_copenhagen_tem.csv')
      if (!response.ok) throw new Error(`Failed to load CSV file: ${response.statusText}`)
      const text = await response.text()
      const rows = text.split('\n')

      rows.forEach((row) => {
        const columns = row.split(',')
        if (columns.length < 7) return
        const city = columns[2].trim()
        const month = parseInt(columns[3], 10)
        const day = parseInt(columns[4], 10)
        const year = parseInt(columns[5], 10)
        const avgTemp = parseFloat(columns[6])
        if (year !== 2019 || isNaN(avgTemp)) return
        const key = `${month}-${day}`
        const dataPoint = { month, day, avgTemp }
        if (city === 'Moscow') dataMoscow.set(key, dataPoint)
        else if (city === 'Copenhagen') dataCopenhagen.set(key, dataPoint)
      })
    }

    // 颜色计算
    const getColorForTemp = (temp) => {
      const minTemp = -17.78,
        midTemp = 2.5,
        maxTemp = 25.06
      const coldColor = [48, 124, 166],
        midColor = [250, 239, 235],
        hotColor = [197, 76, 82]
      const lerp = (c1, c2, factor) => c1 * (1 - factor) + c2 * factor
      let r, g, b
      if (temp <= midTemp) {
        const factor = Math.max(0, Math.min(1, (temp - minTemp) / (midTemp - minTemp)))
        r = lerp(coldColor[0], midColor[0], factor)
        g = lerp(coldColor[1], midColor[1], factor)
        b = lerp(coldColor[2], midColor[2], factor)
      } else {
        const factor = Math.max(0, Math.min(1, (temp - midTemp) / (maxTemp - midTemp)))
        r = lerp(midColor[0], hotColor[0], factor)
        g = lerp(midColor[1], hotColor[1], factor)
        b = lerp(midColor[2], hotColor[2], factor)
      }
      r = Math.round(r)
      g = Math.round(g)
      b = Math.round(b)
      return `rgb(${r}, ${g}, ${b})`
    }

    // 创建空白网格
    const createBlankGrid = (city) => {
      const gridId = `chart-grid-${city.toLowerCase()}`
      const gridEl = document.getElementById(gridId)
      gridEl.innerHTML = ''
      for (let m = 1; m <= 12; m++) {
        for (let d = 1; d <= 31; d++) {
          const cell = document.createElement('div')
          cell.className = 'grid-cell'
          cell.id = `cell-${city.toLowerCase()}-${m}-${d}`
          if (d > DAYS_IN_MONTH[m - 1]) {
            cell.style.visibility = 'hidden'
          }
          gridEl.appendChild(cell)
        }
      }
    }

    // 填充指定季节的数据
    const fillSeason = (seasonMonths) => {
      for (const city of ['Moscow', 'Copenhagen']) {
        const dataMap = city === 'Moscow' ? dataMoscow : dataCopenhagen
        for (const m of seasonMonths) {
          for (let d = 1; d <= DAYS_IN_MONTH[m - 1]; d++) {
            const key = `${m}-${d}`
            const dataPoint = dataMap.get(key)
            if (dataPoint) {
              const cell = document.getElementById(`cell-${city.toLowerCase()}-${m}-${d}`)
              cell.style.backgroundColor = getColorForTemp(dataPoint.avgTemp)
              cell.addEventListener('mouseover', (evt) => showTooltip(evt, dataPoint))
              cell.addEventListener('mouseout', hideTooltip)
            }
          }
        }
      }
    }

    // 分步动画
    const runStagingAnimation = async () => {
      const STAGE_DELAY = 2000
      const seasons = {
        winter: [12, 1, 2],
        spring: [3, 4, 5],
        summer: [6, 7, 8],
        autumn: [9, 10, 11],
      }
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

      if (!isAnimationActive) return
      fillSeason(seasons.winter)
      await sleep(STAGE_DELAY)

      if (!isAnimationActive) return
      fillSeason(seasons.spring)
      await sleep(STAGE_DELAY)

      if (!isAnimationActive) return
      fillSeason(seasons.summer)
      await sleep(STAGE_DELAY)

      if (!isAnimationActive) return
      fillSeason(seasons.autumn)
    }

    // 渲染坐标轴
    const renderAxes = (city) => {
      const monthsAxis = document.getElementById(`axis-months-${city.toLowerCase()}`)
      const daysAxis = document.getElementById(`axis-days-${city.toLowerCase()}`)
      monthsAxis.innerHTML = ''
      daysAxis.innerHTML = ''
      MONTH_NAMES.forEach((name) => {
        const label = document.createElement('div')
        label.className = 'axis-label'
        label.textContent = name
        monthsAxis.appendChild(label)
      })
      for (let d = 1; d <= 31; d++) {
        const label = document.createElement('div')
        label.className = 'axis-label'
        label.textContent = d
        daysAxis.appendChild(label)
      }
    }

    // 渲染图例
    const renderLegend = (containerId) => {
      const chartContainer = document.getElementById(containerId)
      if (!chartContainer) return
      const legendContainer = chartContainer.querySelector('.legend-container')
      if (!legendContainer) return

      const minTemp = -17.78,
        maxTemp = 25.06
      const legendBar = document.createElement('div')
      legendBar.className = 'legend-bar-vertical'
      const legendLabels = document.createElement('div')
      legendLabels.className = 'legend-labels-vertical'
      const maxLabel = document.createElement('span')
      maxLabel.textContent = `${maxTemp.toFixed(1)}°C`
      const minLabel = document.createElement('span')
      minLabel.textContent = `${minTemp.toFixed(1)}°C`
      legendLabels.appendChild(maxLabel)
      legendLabels.appendChild(minLabel)
      legendContainer.appendChild(legendBar)
      legendContainer.appendChild(legendLabels)
    }

    // 工具提示
    const showTooltip = (evt, dataPoint) => {
      const tooltipEl = document.getElementById('tooltip')
      tooltipEl.style.display = 'block'
      const temp = dataPoint.avgTemp.toFixed(1)
      tooltipEl.innerHTML = `${MONTH_NAMES[dataPoint.month - 1]} ${dataPoint.day}: ${temp}°C`
      const rect = evt.target.getBoundingClientRect()
      tooltipEl.style.left = `${rect.left + window.scrollX + rect.width / 2}px`
      tooltipEl.style.top = `${rect.top + window.scrollY}px`
    }

    const hideTooltip = () => {
      document.getElementById('tooltip').style.display = 'none'
    }

    // 初始化
    console.log('开始加载CSV数据...')
    await loadCSV()
    console.log(
      'CSV数据加载完成',
      'Moscow数据量:',
      dataMoscow.size,
      'Copenhagen数据量:',
      dataCopenhagen.size,
    )

    renderAxes('Moscow')
    renderAxes('Copenhagen')
    console.log('坐标轴渲染完成')

    createBlankGrid('Moscow')
    createBlankGrid('Copenhagen')
    console.log('空白网格创建完成')

    renderLegend('chart-container-moscow')
    renderLegend('chart-container-copenhagen')
    console.log('图例渲染完成')

    // 存储数据和函数到 window 对象，供 playAnimation 使用
    window.heatmapData = { dataMoscow, dataCopenhagen, runStagingAnimation, DAYS_IN_MONTH }
  } catch (err) {
    console.error(err)
    const warnEl = document.getElementById('warn')
    if (warnEl) {
      warnEl.style.display = 'block'
      warnEl.textContent = `加载失败: ${err.message}。请确保 moscow_copenhagen_tem.csv 文件可访问。`
    }
  }
}

const playAnimation = () => {
  if (!window.heatmapData) return

  const { runStagingAnimation } = window.heatmapData

  // 先清除所有颜色，恢复到空白状态
  document.querySelectorAll('.grid-cell').forEach((cell) => {
    if (cell.style.visibility !== 'hidden') {
      cell.style.backgroundColor = '#ffffff'
    }
  })

  // 延迟后开始分步动画
  setTimeout(() => {
    runStagingAnimation()
  }, 100)
}

// confirmAnswer 功能已由 handleConfirm 替代
</script>

<style scoped>
.heatmap-staging-task {
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
  margin-top: 50px;
}

.chart-area {
  flex: 1;
  min-width: 800px;
  margin-top: 50px;
}

.chart-display {
  width: 100%;
  margin-bottom: 20px;
  margin-left: 40px;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-top: -10px !important;
  padding-top: 0 !important;
  width: 100%;
}

.chart-main-title {
  text-align: left;
  color: #2c3e50;
  margin-bottom: 0 !important;
  margin-top: 13px !important;
  font-size: 16px !important;
  font-weight: 600;
  line-height: 24px !important;
  font-family: PingFang SC, sans-serif;
  width: 100%;
}

.confirm-btn {
  width: 120px;
  height: 50px;
  background: #1f1f1f;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  margin: 0;
  padding: 0;
}

.confirm-btn:hover:not(:disabled) {
  background-color: #333;
}

.confirm-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.confirm-btn:active:not(:disabled) {
  transform: translateY(1px);
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
  margin: 0;
  padding: 0;
}

.play-animation-btn:hover {
  background-color: #333;
}

.play-animation-btn:active {
  transform: translateY(1px);
}

.chart-container {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0;
  padding-right: 0;
  margin-bottom: 20px;
  margin-top: -30px;
}

.chart-area-inner {
  position: relative;
  width: auto;
  flex: 0 0 auto;
}

.chart-title {
  position: absolute;
  top: 15px;
  left: 0;
  z-index: 10;
  margin: 0;
  padding: 2px 8px;
  font-size: 16px !important;
  font-weight: 600;
  background-color: transparent;
  border-radius: 0;
  color: #2c3e50;
  white-space: nowrap;
  text-align: left;
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(31, 26.4px);
  grid-template-rows: repeat(12, 26.4px);
  gap: 1.2px;
  border: none;
  margin-left: 85px;
  margin-top: 60px;
}

.axis-months,
.axis-days {
  position: absolute;
}

.axis-months {
  top: 60px;
  left: 0;
  width: 75px;
  display: grid;
  grid-template-rows: repeat(12, 26.4px);
  gap: 1.2px;
}

.axis-days {
  top: 30px;
  left: 85px;
  height: 30px;
  display: grid;
  grid-template-columns: repeat(31, 26.4px);
  gap: 1.2px;
}

.axis-label {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px !important;
  color: #666;
}

.axis-months .axis-label {
  justify-content: flex-end;
  padding-right: 10px;
}

.axis-days .axis-label {
  justify-content: center;
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
  font-style: italic;
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
  font-style: italic;
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

.button-text {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px !important;
  line-height: 24px !important;
  color: #ffffff;
}
</style>

<style>
/* 全局样式 - 不能使用scoped */
.grid-cell {
  width: 26.4px;
  height: 26.4px;
  background-color: #ffffff;
  transition: background-color 0.5s ease-in-out;
}

#tooltip {
  position: absolute;
  display: none;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 16px !important;
  pointer-events: none;
  transform: translate(-50%, -120%);
  white-space: nowrap;
  z-index: 1000;
}

.legend-container {
  position: relative;
  width: 70px;
  height: calc(12 * 26.4px + 11 * 1.2px + 90px);
  margin-left: 20px;
  flex-shrink: 0;
}

.legend-bar-vertical {
  position: absolute;
  left: 0;
  top: 90px;
  width: 18px;
  height: calc(12 * 26.4px + 11 * 1.2px);
  border: 1px solid #ccc;
  background: linear-gradient(to top, #307ca6, #faefeb, #c54c52);
}

.legend-labels-vertical {
  position: absolute;
  left: 22px;
  top: 90px;
  width: 45px;
  height: calc(12 * 26.4px + 11 * 1.2px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 16px !important;
  color: #555;
  text-align: left;
}

.warn {
  display: none;
  color: red;
  margin-top: 10px;
  font-weight: bold;
}

#chart-container-copenhagen {
  margin-top: -50px !important;
}

#chart-container-copenhagen .chart-title {
  top: 15px !important;
}

#chart-container-copenhagen .legend-bar-vertical,
#chart-container-copenhagen .legend-labels-vertical {
  top: 60px !important;
}

#chart-container-moscow .legend-bar-vertical,
#chart-container-moscow .legend-labels-vertical {
  top: 60px !important;
}
</style>
