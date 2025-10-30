<template>
  <div class="scatterplot-task">
    <!-- 页面标题 -->
    <h2 class="page-title">Scatterplot + Staging (2/3)</h2>

    <!-- 主内容区域：左右两列布局 -->
    <div class="content-container">
      <!-- 左侧：任务问题区域 -->
      <div class="task-section">
        <h3 class="event-description">
          Staging Event: Data points are introduced progressively month by month throughout the
          year, from January to December.
        </h3>

        <h2 class="task-title">
          Task 2: How has the air quality changed in May and June compared to the beginning of the
          year?
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

        <!-- 按钮区域 -->
        <div class="button-control">
          <button
            class="confirm-btn"
            @click="handleConfirm(null, selectedAnswer, '/scatterplot-staging-3')"
            :disabled="!selectedAnswer"
          >
            <span class="button-text">Confirm</span>
          </button>
          <button class="play-animation-btn" @click="handlePlayAnimation(playAnimation)">
            <span class="button-text">Play Animation</span>
          </button>
        </div>
      </div>

      <!-- 右侧：图表区域 -->
      <div class="chart-area">
        <div class="chart-container">
          <div id="scatterplot-chart"></div>
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
  'scatterplot-staging-2',
  'Scatterplot + Staging (2/3)',
)
let chartData = null
let isInitialized = false
let isAnimating = false
let animationTimeouts = [] // 存储所有的 setTimeout ID

const options = [
  {
    letter: 'A',
    value: 'A',
    text: 'The dots have moved towards the upper left (meaning both PM2.5 and ozone got worse).',
  },
  {
    letter: 'B',
    value: 'B',
    text: 'The dots have moved towards the lower left (meaning both PM2.5 and ozone got better).',
  },
  {
    letter: 'C',
    value: 'C',
    text: 'The dots have moved towards the lower right (meaning PM2.5 got better, but ozone got worse).',
  },
  {
    letter: 'D',
    value: 'D',
    text: 'The dots have moved towards the upper right (meaning ozone got better, but PM2.5 got worse).',
  },
]

onMounted(() => {
  // Clean up any existing chart first (for hot module reload)
  const chartDiv = document.getElementById('scatterplot-chart')
  if (chartDiv && window.Plotly) {
    try {
      window.Plotly.purge(chartDiv)
    } catch {
      // Ignore purge errors
    }
  }

  // Reset flags and clear any existing timeouts
  isInitialized = false
  isAnimating = false
  clearAllTimeouts()

  if (isInitialized) return
  isInitialized = true

  // Check if Plotly is already loaded
  if (window.Plotly) {
    initScatterplot()
  } else {
    // Load Plotly.js
    const script = document.createElement('script')
    script.src = 'https://cdn.plot.ly/plotly-latest.min.js'
    script.onload = () => {
      initScatterplot()
    }
    document.head.appendChild(script)
  }
})

onBeforeUnmount(() => {
  // 清理所有定时器
  clearAllTimeouts()
  // 停止动画
  isAnimating = false
  // 清理图表
  const chartDiv = document.getElementById('scatterplot-chart')
  if (chartDiv && window.Plotly) {
    try {
      window.Plotly.purge(chartDiv)
    } catch {
      // Ignore purge errors
    }
  }
})

// 清理所有 setTimeout
function clearAllTimeouts() {
  animationTimeouts.forEach((id) => clearTimeout(id))
  animationTimeouts = []
}

const initScatterplot = () => {
  // Parse CSV data
  function parseCSV(text) {
    const lines = text.trim().split('\n')
    const headers = lines[0].split(',').map((h) => h.replace(/"/g, ''))
    const data = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',')
      const row = {}
      headers.forEach((header, index) => {
        let value = values[index]
        if (value !== undefined) {
          value = value.replace(/"/g, '')
          row[header] = value
        }
      })
      data.push(row)
    }

    return data
  }

  // Process data for 2016 daily averages
  function processData(rawData) {
    const dailyData = {}

    rawData.forEach((row) => {
      const year = parseInt(row.year)
      if (year === 2016) {
        const month = row.month.toString().padStart(2, '0')
        const day = row.day.toString().padStart(2, '0')
        const date = `${year}-${month}-${day}`

        if (!dailyData[date]) {
          dailyData[date] = {
            pm25_sum: 0,
            o3_sum: 0,
            count: 0,
            year: year,
            month: parseInt(row.month),
            day: parseInt(row.day),
          }
        }

        const pm25 = parseFloat(row['PM2.5'])
        const o3 = parseFloat(row['O3'])

        if (!isNaN(pm25) && !isNaN(o3) && pm25 > 0 && o3 > 0) {
          dailyData[date].pm25_sum += pm25
          dailyData[date].o3_sum += o3
          dailyData[date].count++
        }
      }
    })

    // Calculate averages and prepare final data (filter for even days only)
    const processedData = []
    Object.keys(dailyData).forEach((date) => {
      const day = dailyData[date]
      if (day.count > 0 && day.day % 2 === 0) {
        // Only include even-numbered days
        const dateObj = new Date(day.year, day.month - 1, day.day)
        const monthNames = [
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
        processedData.push({
          date: date,
          pm25: day.pm25_sum / day.count,
          o3: day.o3_sum / day.count,
          dayOfYear: Math.floor((dateObj - new Date(day.year, 0, 0)) / (1000 * 60 * 60 * 24)),
          monthName: monthNames[day.month - 1],
        })
      }
    })

    return processedData.sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  // Create the plot with staging animation (month by month)
  function createPlot(dailyData) {
    const o3Values = dailyData.map((d) => d.o3)
    const pm25Values = dailyData.map((d) => d.pm25)
    const monthValues = dailyData.map((d) => new Date(d.date).getMonth() + 1)

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

    const monthNames = [
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

    const layout = {
      title: {
        text: '<b>2016 Daily Average PM2.5 and Ozone Concentration Scatterplot in Changping District, Beijing</b>',
        font: {
          size: 18,
          family: 'Roboto, sans-serif',
          color: '#2c3e50',
        },
        x: 0,
        y: 0.98,
        xanchor: 'left',
        yanchor: 'top',
      },
      xaxis: {
        title: 'Daily Average Ozone Concentration (μg/m³)',
        title_font: { size: 14 },
        showgrid: true,
        gridwidth: 1,
        gridcolor: 'rgba(128,128,128,0.2)',
        zeroline: true,
        zerolinewidth: 1,
        zerolinecolor: 'rgba(128,128,128,0.2)',
        range: [0, 200],
        tickmode: 'array',
        tickvals: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
        ticktext: ['0', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200'],
      },
      yaxis: {
        title: 'Daily Average PM2.5 Concentration (μg/m³)',
        title_font: { size: 14 },
        showgrid: true,
        gridwidth: 1,
        gridcolor: 'rgba(128,128,128,0.2)',
        zeroline: true,
        zerolinewidth: 1,
        zerolinecolor: 'rgba(128,128,128,0.2)',
        range: [0, 420],
        showticklabels: true,
        tickmode: 'array',
        tickvals: [50, 100, 150, 200, 250, 300, 350, 400],
        ticktext: ['50', '100', '150', '200', '250', '300', '350', '400'],
      },
      plot_bgcolor: 'white',
      paper_bgcolor: 'white',
      font: { family: 'Roboto, sans-serif' },
      hovermode: false,
      showlegend: true,
      legend: {
        orientation: 'v',
        x: 1.02,
        y: 1,
        bgcolor: 'rgba(255,255,255,0.8)',
        bordercolor: 'rgba(0,0,0,0.2)',
        borderwidth: 1,
      },
      margin: {
        t: 60,
        b: 100,
        l: 100,
        r: 120,
      },
    }

    const config = {
      displayModeBar: false,
      staticPlot: true,
    }

    // Clear any existing plot first
    const chartDiv = document.getElementById('scatterplot-chart')
    if (chartDiv) {
      window.Plotly.purge(chartDiv)
    }

    // Create initial traces with all data but transparent
    const initialTraces = []
    for (let month = 1; month <= 12; month++) {
      const monthIndices = monthValues.map((m, i) => (m === month ? i : -1)).filter((i) => i !== -1)
      if (monthIndices.length > 0) {
        initialTraces.push({
          x: monthIndices.map((i) => o3Values[i]),
          y: monthIndices.map((i) => pm25Values[i]),
          mode: 'markers',
          type: 'scatter',
          name: monthNames[month - 1],
          marker: {
            size: 8,
            color: monthColors[month - 1],
            opacity: 0.05, // Very low opacity - almost invisible
          },
          hoverinfo: 'none',
          showlegend: true, // Always show legend
        })
      }
    }

    // Start with transparent data
    window.Plotly.newPlot('scatterplot-chart', initialTraces, layout, config)

    // Store data for animation
    chartData = {
      o3Values,
      pm25Values,
      monthValues,
      monthColors,
      monthNames,
      config,
    }

    // Don't start animation automatically - wait for user to click Play Animation button
  }

  // Load and process data
  async function loadData() {
    try {
      const response = await fetch('/src/All/Scatterplot/PRSA_Data_Changping_20130301-20170228.csv')
      const csvText = await response.text()
      const rawData = parseCSV(csvText)
      const dailyData = processData(rawData)
      createPlot(dailyData)
    } catch (error) {
      console.error('Error loading data:', error)
      document.getElementById('scatterplot-chart').innerHTML =
        '<div style="text-align: center; padding: 50px; color: #e74c3c;">Failed to load data</div>'
    }
  }

  loadData()
}

const playAnimation = () => {
  if (!chartData || isAnimating) return

  // Reset animation flag
  isAnimating = false

  // Reset all traces to very low opacity
  const chartDiv = document.getElementById('scatterplot-chart')
  if (chartDiv && chartDiv.data) {
    const opacityUpdates = {
      'marker.opacity': Array(chartDiv.data.length).fill(0.05),
    }
    window.Plotly.restyle('scatterplot-chart', opacityUpdates)
  }

  // Start animation
  isAnimating = true

  // Animate month by month
  let currentMonth = 0
  const showNextMonth = () => {
    // 检查动画是否应该继续（组件可能已被销毁）
    if (!isAnimating) return

    if (currentMonth < 12) {
      // Make current month visible by changing opacity
      window.Plotly.restyle('scatterplot-chart', { 'marker.opacity': 1.0 }, [currentMonth])

      currentMonth++
      if (currentMonth < 12 && isAnimating) {
        const timeoutId = setTimeout(showNextMonth, 1000)
        animationTimeouts.push(timeoutId)
      } else {
        // Animation complete
        isAnimating = false
      }
    }
  }

  const initialTimeoutId = setTimeout(showNextMonth, 500)
  animationTimeouts.push(initialTimeoutId)
}

// confirmAnswer 功能已由 handleConfirm 替代
</script>

<style scoped>
.scatterplot-task {
  width: 100%;
  padding: 0 0 60px 0;
  margin: 0;
  position: relative;
}

.page-title {
  font-family:
    Roboto,
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

.event-description {
  font-family:
    Roboto,
    sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #545454;
  margin: 10px 0 20px 0;
  text-align: left;
  font-style: italic;
}

.task-title {
  font-family:
    Roboto,
    sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #1f1f1f;
  margin: 0 0 10px 0;
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
    Roboto,
    sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
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
    Roboto,
    sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
}
</style>
