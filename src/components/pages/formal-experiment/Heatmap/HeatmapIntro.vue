<template>
  <div class="heatmap-intro">
    <h1 class="main-title">热力图</h1>

    <div class="description-section">
      <p class="description">
        该热力图展示了2019年莫斯科和哥本哈根的日平均温度分布。
      </p>

      <ul class="features-list">
        <li>横轴（从左到右）表示月份，从一月到十二月。</li>
        <li>
          纵轴（从下到上）表示一个月中的日期，从1日到31日。
        </li>
        <li>
          图表中的每个彩色方块代表一天，其颜色表示该天的平均温度，红色方块表示温暖，蓝色方块表示寒冷。
        </li>
      </ul>
    </div>

    <div class="chart-display">
      <div class="chart-container">
        <div class="controls">
          <button class="city-btn active" id="btnMoscow" @click="switchCity('Moscow')">
            莫斯科
          </button>
          <button class="city-btn" id="btnCopenhagen" @click="switchCity('Copenhagen')">
            哥本哈根
          </button>
        </div>
        <div class="chart-grid" id="chart-grid"></div>
        <div class="legend-bar-vertical" id="legend"></div>
        <div class="legend-labels-vertical" id="legend-labels"></div>
        <div class="tooltip" id="tooltip" style="display: none"></div>
        <div id="error" class="error-message"></div>
      </div>
    </div>

    <button class="continue-button" @click="continueFormal">
      <span class="button-text">开始</span>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const router = useRouter()
const currentCity = ref('Moscow')

const continueFormal = () => {
  console.log('Continuing to formal experiment...')
  // 跳转到热力图高亮显示任务
  router.push('/heatmap-highlighting-1')
}

const switchCity = (city) => {
  updateCity(city)
}

onMounted(() => {
  initHeatmap()
})

// 全局变量
let dataMoscow = []
let dataCopenhagen = []
let overallMinTemp, overallMaxTemp

const MONTH_LABELS = [
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

const initHeatmap = async () => {
  try {
    await loadCSV()
    renderLegend()
    updateCity('Moscow')
  } catch (error) {
    console.error('Error loading heatmap data:', error)
    document.getElementById('error').textContent =
      'Failed to load temperature data: ' + error.message
  }
}

// CSV解析函数
const splitRow = (line) => {
  const l = line.replace(/\uFEFF/g, '').trim()
  if (!l) return []
  const delim = l.includes(',') ? ',' : l.includes(';') ? ';' : l.includes('\t') ? '\t' : ','
  return l.split(delim).map((s) => s.trim())
}

const toNumber = (x) => {
  const n = parseFloat(x)
  return Number.isFinite(n) ? n : null
}

const parseCSVToCityMap = (csvText) => {
  const lines = csvText.split(/\r?\n/).filter(Boolean)
  const cityMap = { Moscow: initEmpty(), Copenhagen: initEmpty() }
  for (let i = 0; i < lines.length; i++) {
    const cells = splitRow(lines[i])
    if (cells.length < 4) continue
    const tokens = cells.map((c, idx) => {
      const num = toNumber(c)
      return { raw: c, isNum: num !== null, num, idx }
    })
    let city = null
    for (const t of tokens) {
      const v = String(t.raw).toLowerCase()
      if (v.includes('moscow')) {
        city = 'Moscow'
        break
      }
      if (v.includes('copenhagen')) {
        city = 'Copenhagen'
        break
      }
    }
    if (!city) {
      const guess = tokens.find(
        (t) => /^[A-Za-z\u4e00-\u9fa5\s\-]+$/.test(t.raw) && !/russia|denmark/i.test(t.raw),
      )
      if (guess) {
        const v = guess.raw.toLowerCase()
        if (v.includes('moscow')) city = 'Moscow'
        if (v.includes('copenhagen')) city = 'Copenhagen'
      }
    }
    if (!city) continue
    const yearTok = tokens.find(
      (t) => t.isNum && Number.isInteger(t.num) && t.num >= 1900 && t.num <= 2100,
    )
    const year = yearTok ? yearTok.num : null
    const numericToks = tokens.filter((t) => t.isNum)
    if (numericToks.length === 0) continue
    const temp = numericToks[numericToks.length - 1].num
    const searchRange = yearTok
      ? tokens.filter((t) => t.isNum && t.idx < yearTok.idx)
      : tokens.filter((t) => t.isNum)
    let month = null,
      day = null
    for (const t of searchRange) {
      const v = Math.round(t.num)
      if (v >= 1 && v <= 12) {
        month = v
        break
      }
    }
    if (month !== null) {
      const monthToken = searchRange.find((x) => Math.round(x.num) === month)
      const afterMonth = searchRange.filter((t) => t.idx > monthToken?.idx)
      for (const t of afterMonth) {
        const v = Math.round(t.num)
        if (v >= 1 && v <= 31) {
          day = v
          break
        }
      }
    }
    if (day === null) {
      for (const t of tokens) {
        if (!t.isNum) continue
        const v = Math.round(t.num)
        if (v >= 1 && v <= 31) {
          day = v
          break
        }
      }
    }
    if (year !== null && year !== 2019) continue
    if (month === null || day === null) continue
    cityMap[city][month - 1][day - 1] = temp
  }
  return { cityMap }
}

const initEmpty = () => {
  return Array.from({ length: 12 }, () => Array(31).fill(null))
}

const loadCSV = async () => {
  const resp = await fetch('/moscow_copenhagen_tem.csv')
  if (!resp.ok) throw new Error('Failed to load CSV file. Please ensure the file is accessible.')
  const text = await resp.text()
  const { cityMap } = parseCSVToCityMap(text)
  dataMoscow = cityMap['Moscow']
  dataCopenhagen = cityMap['Copenhagen']
  const allTemps = dataMoscow
    .flat()
    .concat(dataCopenhagen.flat())
    .filter((t) => t !== null)
  if (allTemps.length === 0) throw new Error('No valid temperature data found in CSV')
  overallMinTemp = Math.min(...allTemps)
  overallMaxTemp = Math.max(...allTemps)
}

// 渲染逻辑
const getColorForTemp = (temp, minTemp, maxTemp) => {
  if (temp === null) return '#EFEFEF'
  const colors = ['#307ca6', '#FAEFEB', '#c54c52']
  const range = maxTemp - minTemp
  if (range === 0) return colors[1]
  const percentage = (temp - minTemp) / range
  if (percentage < 0.5) {
    const sub = percentage * 2
    return interpolateColor(colors[0], colors[1], sub)
  } else {
    const sub = (percentage - 0.5) * 2
    return interpolateColor(colors[1], colors[2], sub)
  }
}

const interpolateColor = (hex1, hex2, factor) => {
  const hexToRgb = (hex) => ({
    r: parseInt(hex.substring(1, 3), 16),
    g: parseInt(hex.substring(3, 5), 16),
    b: parseInt(hex.substring(5, 7), 16),
  })
  const a = hexToRgb(hex1),
    b = hexToRgb(hex2)
  const r = Math.round(a.r + (b.r - a.r) * factor)
  const g = Math.round(a.g + (b.g - a.g) * factor)
  const bl = Math.round(a.b + (b.b - a.b) * factor)
  return `rgb(${r}, ${g}, ${bl})`
}

const renderChartGrid = (temps) => {
  const grid = document.getElementById('chart-grid')
  grid.innerHTML = ''

  // 左侧月份标签
  MONTH_LABELS.forEach((m, i) => {
    const lbl = document.createElement('div')
    lbl.className = 'y-label'
    lbl.style.gridRow = `${i + 2}`
    lbl.textContent = m
    grid.appendChild(lbl)
  })

  // 顶部日期标签 - 只显示每5天和月末
  for (let d = 1; d <= 31; d++) {
    if (d === 1 || d === 5 || d === 10 || d === 15 || d === 20 || d === 25 || d === 31) {
      const lbl = document.createElement('div')
      lbl.className = 'x-label'
      lbl.style.gridColumn = `${d + 1}`
      lbl.style.gridRow = '1'
      lbl.textContent = d
      grid.appendChild(lbl)
    }
  }

  // 检查日期有效性的辅助函数
  const isValidDate = (year, month, day) => {
    const d = new Date(year, month - 1, day)
    return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day
  }

  // 单元格
  for (let m = 0; m < 12; m++) {
    for (let d = 0; d < 31; d++) {
      const cell = document.createElement('div')
      cell.className = 'heat-cell'
      cell.style.gridRow = `${m + 2}`
      cell.style.gridColumn = `${d + 2}`

      // 在填充颜色前检查日期是否有效
      if (!isValidDate(2019, m + 1, d + 1)) {
        cell.classList.add('invalid-date')
      } else {
        // 日期有效，执行原有逻辑
        const temp = temps[m] && temps[m][d] !== undefined ? temps[m][d] : null
        cell.style.background = getColorForTemp(temp, overallMinTemp, overallMaxTemp)
        if (temp !== null) {
          cell.dataset.temp = temp
          cell.addEventListener('mouseenter', (evt) =>
            showTooltip(evt, { month: MONTH_LABELS[m], day: d + 1, temp }),
          )
          cell.addEventListener('mouseleave', hideTooltip)
        }
      }
      grid.appendChild(cell)
    }
  }
}

const renderLegend = () => {
  const legendLabels = document.getElementById('legend-labels')
  legendLabels.innerHTML = ''
  const maxTempLabel = Math.round(overallMaxTemp)
  const minTempLabel = Math.round(overallMinTemp)
  const midTempLabel = Math.round((overallMinTemp + overallMaxTemp) / 2)
  ;[maxTempLabel, midTempLabel, minTempLabel].forEach((t) => {
    const lbl = document.createElement('div')
    lbl.textContent = `${t}°C`
    legendLabels.appendChild(lbl)
  })
}

const showTooltip = (evt, item) => {
  const tooltipEl = document.getElementById('tooltip')
  tooltipEl.style.display = 'block'
  tooltipEl.textContent = `${item.month} ${item.day}: ${item.temp.toFixed(1)}°C`
  const rect = evt.target.getBoundingClientRect()
  tooltipEl.style.left = `${rect.left + window.scrollX + rect.width / 2}px`
  tooltipEl.style.top = `${rect.top + window.scrollY}px`
}

const hideTooltip = () => {
  document.getElementById('tooltip').style.display = 'none'
}

const updateCity = (city) => {
  currentCity.value = city
  document.getElementById('btnMoscow').classList.toggle('active', city === 'Moscow')
  document.getElementById('btnCopenhagen').classList.toggle('active', city === 'Copenhagen')
  renderChartGrid(city === 'Moscow' ? dataMoscow : dataCopenhagen)
}
</script>

<style scoped>
.heatmap-intro {
  width: 100%;
  padding: 0;
  margin: 0;
  text-align: left;
}

.main-title {
  width: 100%;
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 35.5556px;
  line-height: 43px;
  color: #1f1f1f;
  margin: 0 0 20px 0;
  padding: 0;
  text-align: left;
}

.description-section {
  width: 100%;
  margin-bottom: 30px;
}

.description {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17.7778px;
  line-height: 25px;
  color: #545454;
  margin: 0 0 20px 0;
  text-align: left;
}

.features-list {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17.7778px;
  line-height: 25px;
  color: #545454;
  margin: 0 0 20px 0;
  padding-left: 20px;
  list-style-type: disc;
}

.features-list li {
  margin-bottom: 8px;
  text-align: left;
}

.features-list li:last-child {
  margin-bottom: 0;
}


.chart-display {
  width: 100%;
  margin-bottom: 40px;
  margin-top: -30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 350px;
}

.chart-container {
  width: 100%;
  position: relative;
  padding-top: 50px;
  padding-right: 60px;
  background-color: white;
  border-radius: 8px;
  max-width: 850px;
  box-sizing: border-box;
}

.controls {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
}

.city-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: #fff;
  color: #333;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s ease;
  font-family: PingFang SC, sans-serif;
}

.city-btn.active {
  background: #333;
  color: #fff;
}

.city-btn:hover:not(.active) {
  background: #f5f5f5;
}

.chart-grid {
  display: grid;
  grid-template-columns: 45px repeat(31, 20px);
  grid-template-rows: 25px repeat(12, 20px);
  gap: 1px;
  position: relative;
}

.heat-cell {
  width: 20px;
  height: 20px;
  background: #efefef;
  box-sizing: border-box;
}

.heat-cell.invalid-date {
  background: #ffffff;
  pointer-events: none;
}

.heat-cell[data-temp]:hover {
  border: 1px solid black;
  cursor: pointer;
}

.x-label,
.y-label {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #555;
  font-family: PingFang SC, sans-serif;
  line-height: 1;
}

.y-label {
  justify-content: flex-end;
  padding-right: 3px;
}

.legend-bar-vertical {
  position: absolute;
  left: calc(45px + 31 * 20px + 31 * 1px + 20px);
  top: calc(50px + 25px);
  width: 15px;
  height: calc(12 * 20px + 11 * 1px);
  border: 1px solid #ccc;
  background: linear-gradient(to top, #307ca6, #faefeb, #c54c52);
}

.legend-labels-vertical {
  position: absolute;
  left: calc(45px + 31 * 20px + 31 * 1px + 40px);
  top: calc(50px + 25px);
  height: calc(12 * 20px + 11 * 1px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 11px;
  color: #555;
  font-family: PingFang SC, sans-serif;
}

.tooltip {
  position: fixed;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 11px;
  pointer-events: none;
  z-index: 1000;
  transform: translate(-50%, -110%);
  white-space: nowrap;
  font-family: PingFang SC, sans-serif;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.continue-button {
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
  margin-top: 20px;
  position: relative;
  z-index: 1000;
}

.continue-button:hover {
  background-color: #333;
}

.continue-button:active {
  transform: translateY(1px);
}

.button-text {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
}

/* 图表样式 */
.heat-cell {
  cursor: pointer;
}
</style>
