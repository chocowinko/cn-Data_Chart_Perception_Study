<template>
  <div class="scatterplot-task">
    <h1 class="main-title">散点图</h1>

    <div class="description-section">
      <p class="description">
        该图展示了2016年北京市昌平区特定日期的PM2.5和臭氧日均浓度之间的关系，其中：
      </p>

      <ul class="features-list">
        <li>
          横轴（从左到右）表示臭氧日均浓度，单位为微克每立方米（μg/m³）。
        </li>
        <li>
          纵轴（从下到上）表示PM2.5日均浓度，单位同样为微克每立方米（μg/m³）。
        </li>
      </ul>
    </div>

    <div class="chart-display">
      <div class="chart-container">
        <div id="scatterplot-chart"></div>
      </div>
    </div>

    <button class="start-button" @click="goToTask">
      <span class="button-text">开始</span>
    </button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToTask = () => {
  console.log('Navigating to scatterplot-highlighting-1...')
  router.push('/scatterplot-highlighting-1')
}

onMounted(() => {
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
    const data2016 = {}

    rawData.forEach((row) => {
      const year = parseInt(row.year)
      if (year !== 2016) return

      const month = row.month.toString().padStart(2, '0')
      const day = row.day.toString().padStart(2, '0')
      const date = `${year}-${month}-${day}`

      if (!data2016[date]) {
        data2016[date] = {
          pm25_sum: 0,
          o3_sum: 0,
          count: 0,
          month: parseInt(row.month),
        }
      }

      const pm25 = parseFloat(row['PM2.5'])
      const o3 = parseFloat(row['O3'])

      if (!isNaN(pm25) && !isNaN(o3) && pm25 > 0 && o3 > 0) {
        data2016[date].pm25_sum += pm25
        data2016[date].o3_sum += o3
        data2016[date].count++
      }
    })

    const dailyData = []
    Object.keys(data2016).forEach((date) => {
      const dayData = data2016[date]
      if (dayData.count > 0) {
        dailyData.push({
          date: date,
          month: dayData.month,
          pm25: dayData.pm25_sum / dayData.count,
          o3: dayData.o3_sum / dayData.count,
        })
      }
    })

    return dailyData
  }

  // Create the plot
  function createPlot(dailyData) {
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

    // Group data by month
    const dataByMonth = {}
    dailyData.forEach((d) => {
      if (!dataByMonth[d.month]) {
        dataByMonth[d.month] = {
          o3: [],
          pm25: [],
        }
      }
      dataByMonth[d.month].o3.push(d.o3)
      dataByMonth[d.month].pm25.push(d.pm25)
    })

    // Create traces for each month
    const traces = []
    for (let month = 1; month <= 12; month++) {
      if (dataByMonth[month]) {
        traces.push({
          x: dataByMonth[month].o3,
          y: dataByMonth[month].pm25,
          mode: 'markers',
          type: 'scatter',
          name: monthNames[month - 1],
          marker: {
            size: 8,
            color: monthColors[month - 1],
            opacity: 1.0,
          },
          hoverinfo: 'none',
          showlegend: true,
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
        xanchor: 'left',
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
        r: 120,
      },
    }

    const config = {
      displayModeBar: false,
      staticPlot: true,
    }

    window.Plotly.newPlot('scatterplot-chart', traces, layout, config)
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
        '<div style="text-align: center; padding: 50px; color: #e74c3c;">无法加载数据</div>'
    }
  }

  loadData()
}
</script>

<style scoped>
.scatterplot-task {
  width: 100%;
  padding: 0 0 60px 0;
  margin: 0;
  text-align: left;
}

.main-title {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 35.5556px;
  line-height: 43px;
  color: #1f1f1f;
  margin: 0 0 20px 0;
  padding: 0;
  position: relative;
  z-index: 10;
  background-color: white;
}

.description-section {
  margin-bottom: 30px;
  position: relative;
  z-index: 10;
  background-color: white;
}

.description {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17.7778px;
  line-height: 25px;
  color: #545454;
  margin-bottom: 20px;
}

.features-list {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17.7778px;
  line-height: 25px;
  color: #545454;
  padding-left: 20px;
  margin-bottom: 20px;
}

.features-list li {
  margin-bottom: 8px;
}

.chart-display {
  width: 100%;
  margin-bottom: 40px;
  margin-top: -30px;
  position: relative;
  z-index: 1;
}

.chart-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 0;
  width: 75%;
  height: 525px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  position: relative;
  max-width: 100%;
}

#scatterplot-chart {
  width: 100%;
  height: 100%;
}

.start-button {
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
  margin-top: -40px;
  margin-bottom: 40px;
  position: relative;
  z-index: 10;
}

.start-button:hover {
  background-color: #333;
}

.start-button:active {
  transform: translateY(1px);
}

.button-text {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
}
</style>
