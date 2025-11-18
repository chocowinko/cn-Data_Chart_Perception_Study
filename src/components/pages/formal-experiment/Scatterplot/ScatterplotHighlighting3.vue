<template>
  <div class="scatterplot-task">
    <!-- 页面标题 -->
    <h2 class="page-title">散点图 + 高亮 (3/3)</h2>

    <!-- 主内容区域：左右两列布局 -->
    <div class="content-container">
      <!-- 左侧：任务问题区域 -->
      <div class="task-section">
        <h2 class="task-title">
          任务3：当冬季的点被高亮显示时，以下哪个陈述最准确？
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
            @click="handleConfirm(null, selectedAnswer, '/scatterplot-staging-1')"
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
        <div class="chart-container">
          <div id="scatterplot-chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskTimer } from '@/composables/useTaskTimer'

const selectedAnswer = ref('')

const { handlePlayAnimation, handleConfirm } = useTaskTimer(
  'scatterplot-highlighting-3',
  '散点图 + 高亮 (3/3)',
)
let chartData = null

const options = [
  {
    letter: 'A',
    value: 'A',
    text: '它们均匀分布在图表的各个角落。',
  },
  {
    letter: 'B',
    value: 'B',
    text: '它们几乎完全不在图表的上半部分（PM2.5高的区域）。',
  },
  {
    letter: 'C',
    value: 'C',
    text: '它们是一年中臭氧浓度最高的时期。',
  },
  {
    letter: 'D',
    value: 'D',
    text: '它们几乎完全不在图表的整个右半部分（臭氧高的区域）。',
  },
]

onMounted(() => {
  // Load Plotly.js
  const script = document.createElement('script')
  script.src = 'https://cdn.plot.ly/plotly-latest.min.js'
  script.onload = () => {
    initScatterplot()
  }
  document.head.appendChild(script)
})

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

  // Create the plot
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

    // Create separate traces for each month - initially all gray
    const scatterTraces = []
    for (let month = 1; month <= 12; month++) {
      const monthIndices = monthValues.map((m, i) => (m === month ? i : -1)).filter((i) => i !== -1)
      if (monthIndices.length > 0) {
        scatterTraces.push({
          x: monthIndices.map((i) => o3Values[i]),
          y: monthIndices.map((i) => pm25Values[i]),
          mode: 'markers',
          type: 'scatter',
          name: monthNames[month - 1],
          marker: {
            size: 8,
            color: '#F1F1F1', // Initially gray
            opacity: 1.0,
          },
          hoverinfo: 'none',
        })
      }
    }

    const layout = {
      title: {
        text: '<b>2016年北京市昌平区PM2.5与臭氧日均浓度散点图</b>',
        font: {
          size: 18,
          family: 'PingFang SC, sans-serif',
          color: '#2c3e50',
        },
        x: 0,
        y: 0.98,
        xanchor: 'left',
        yanchor: 'top',
      },
      xaxis: {
        title: '臭氧日均浓度 (μg/m³)',
        title_font: { size: 14 },
        showgrid: true,
        gridwidth: 1,
        gridcolor: 'rgba(128,128,128,0.2)',
      },
      yaxis: {
        title: 'PM2.5日均浓度 (μg/m³)',
        title_font: { size: 14 },
        showgrid: true,
        gridwidth: 1,
        gridcolor: 'rgba(128,128,128,0.2)',
      },
      plot_bgcolor: 'white',
      paper_bgcolor: 'white',
      font: { family: 'PingFang SC, sans-serif' },
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
        r: 0,
      },
    }

    const config = {
      displayModeBar: false,
      staticPlot: true,
    }

    // Create initial plot
    window.Plotly.newPlot('scatterplot-chart', scatterTraces, layout, config)

    // Store data for animation
    chartData = {
      o3Values,
      pm25Values,
      monthValues,
      monthColors,
      monthNames,
      config,
      dailyData,
    }
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
  if (!chartData) return

  const { o3Values, pm25Values, monthValues, monthColors, monthNames, config } = chartData

  // Winter months: December (12), January (1), February (2)
  const winterMonths = [12, 1, 2]

  // Rebuild traces with winter months at the end (on top)
  const scatterTraces = []

  // First, add non-winter months (gray)
  for (let month = 1; month <= 12; month++) {
    if (!winterMonths.includes(month)) {
      const monthIndices = monthValues.map((m, i) => (m === month ? i : -1)).filter((i) => i !== -1)
      if (monthIndices.length > 0) {
        scatterTraces.push({
          x: monthIndices.map((i) => o3Values[i]),
          y: monthIndices.map((i) => pm25Values[i]),
          mode: 'markers',
          type: 'scatter',
          name: monthNames[month - 1],
          marker: {
            size: 8,
            color: '#F1F1F1',
            opacity: 1.0,
          },
          hoverinfo: 'none',
        })
      }
    }
  }

  // Then, add winter months (colored) on top
  winterMonths.forEach((month) => {
    const monthIndices = monthValues.map((m, i) => (m === month ? i : -1)).filter((i) => i !== -1)
    if (monthIndices.length > 0) {
      scatterTraces.push({
        x: monthIndices.map((i) => o3Values[i]),
        y: monthIndices.map((i) => pm25Values[i]),
        mode: 'markers',
        type: 'scatter',
        name: monthNames[month - 1],
        marker: {
          size: 8,
          color: monthColors[month - 1],
          opacity: 1.0,
        },
        hoverinfo: 'none',
      })
    }
  })

  const layout = {
    title: {
      text: '<b>2016 Daily Average PM2.5 and Ozone Concentration Scatterplot in Changping District, Beijing</b>',
      font: {
        size: 18,
        family: 'PingFang SC, sans-serif',
        color: '#2c3e50',
      },
      x: 0,
      xanchor: 'left',
    },
    xaxis: {
      title: 'Daily Average Ozone Concentration (μg/m³)',
      title_font: { size: 14 },
      showgrid: true,
      gridwidth: 1,
      gridcolor: 'rgba(128,128,128,0.2)',
    },
    yaxis: {
      title: 'Daily Average PM2.5 Concentration (μg/m³)',
      title_font: { size: 14 },
      showgrid: true,
      gridwidth: 1,
      gridcolor: 'rgba(128,128,128,0.2)',
    },
    plot_bgcolor: 'white',
    paper_bgcolor: 'white',
    font: { family: 'PingFang SC, sans-serif' },
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
      r: 0,
    },
  }

  window.Plotly.newPlot('scatterplot-chart', scatterTraces, layout, config)
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
    PingFang SC,
    sans-serif;
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
  font-size: 16px !important;
  line-height: 24px !important;
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
  font-size: 16px !important;
  line-height: 24px !important;
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
  font-size: 16px !important;
  line-height: 24px !important;
  color: #ffffff;
}
</style>
