<template>
  <div class="practice-task">
    <!-- 主内容区域：左右两列布局 -->
    <div class="content-container">
      <!-- 左侧：任务问题区域 -->
      <div class="task-section">
        <h2 class="task-title">
          任务 1：当中年组（40-59 岁）在动画中出现时，
          在咖啡饮用者（橙色圆点）中观察到的最显著新增变化是什么？
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
          <button class="confirm-btn" @click="confirmAnswer" :disabled="!selectedAnswer">
            <span class="button-text">确认</span>
          </button>
          <button class="play-animation-btn" @click="playAnimation">
            <span class="button-text">播放动画</span>
          </button>
        </div>
      </div>

      <!-- 右侧：图表区域 -->
      <div class="chart-area">
        <div class="chart-container">
          <svg id="chart"></svg>
          <div id="error" class="error-message"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedAnswer = ref('')
let rawData = null
let currentAnimationTimer = null
let width, height, g, svg

const options = [
  {
    letter: 'A',
    value: 'A',
    text: '与青年组相比，咖啡饮用者（相对于未饮用者）的占比显著增加。',
  },
  {
    letter: 'B',
    value: 'B',
    text: '新出现的咖啡饮用者主要集中在睡眠效率较高的区域（Y 轴 > 80%）。',
  },
  {
    letter: 'C',
    value: 'C',
    text: '中年组中不存在未饮咖啡者。',
  },
  {
    letter: 'D',
    value: 'D',
    text: '随着中年组的加入，所有咖啡饮用者的总体平均睡眠效率首次显著高于未饮用者。',
  },
]

onMounted(() => {
  // 动态加载D3.js
  const script = document.createElement('script')
  script.src = 'https://d3js.org/d3.v7.min.js'
  script.onload = () => {
    initScatterplot()
  }
  document.head.appendChild(script)
})

const initScatterplot = () => {
  // D3.js 散点图代码
  svg = d3.select('#chart')
  const margin = { top: 50, right: 180, bottom: 60, left: 90 }

  // 获取容器尺寸并设置SVG
  function updateDimensions() {
    const container = d3.select('.chart-container').node()
    const containerWidth = container.getBoundingClientRect().width
    const containerHeight = containerWidth * 0.55

    width = containerWidth - margin.left - margin.right
    height = containerHeight - margin.top - margin.bottom

    svg.attr('width', containerWidth).attr('height', containerHeight)

    if (g) {
      g.remove()
    }
    g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)
  }

  // 初始化尺寸
  updateDimensions()

  // 初始化图表
  function initChart() {
    if (currentAnimationTimer) {
      currentAnimationTimer.stop()
      currentAnimationTimer = null
    }

    g.selectAll('*').remove()
    svg.selectAll('defs').remove()

    g.append('g').attr('class', 'x-axis axis').attr('transform', `translate(0,${height})`)
    g.append('g').attr('class', 'y-axis axis')
    g.append('text').attr('class', 'x-axis-title axis-title').attr('text-anchor', 'middle')
    g.append('text').attr('class', 'y-axis-title axis-title').attr('text-anchor', 'middle')
    g.append('g').attr('class', 'dots-group')
  }

  // 加载数据
  d3.csv('/Sampled_Sleep_Efficiency.csv', d3.autoType)
    .then((data) => {
      rawData = data
      initChart()
      // 初始显示空白图表，不显示任何数据点
      showEmptyChart()
    })
    .catch((err) => {
      d3.select('#error').text('数据加载失败：' + err)
      console.error('数据加载失败：', err)
    })

  // 显示空白图表（只有坐标轴和图例，没有数据点）
  function showEmptyChart() {
    const validData = rawData.filter(
      (d) => d.Age != null && d['Sleep efficiency'] != null && d['Caffeine consumption'] != null,
    )

    // 设置坐标轴
    const x = d3
      .scaleLinear()
      .domain([d3.min(validData, (d) => d.Age) - 2, d3.max(validData, (d) => d.Age) + 2])
      .range([0, width])
    const y = d3.scaleLinear().domain([0.4, 1]).nice().range([height, 0])

    g.select('.x-axis').transition().duration(800).call(d3.axisBottom(x).ticks(8))
    g.select('.y-axis')
      .transition()
      .duration(800)
      .call(d3.axisLeft(y).tickFormat(d3.format('.0%')))
    g.select('.x-axis-title')
      .attr('x', width / 2)
      .attr('y', height + 45)
      .text('年龄')
    g.select('.y-axis-title')
      .attr('x', -height / 2)
      .attr('y', -50)
      .attr('transform', 'rotate(-90)')
      .text('睡眠效率')

    // 添加图例
    const legend = g
      .append('g')
      .attr('class', 'legend-group')
      .attr('transform', `translate(${width + 20}, ${height - 60})`)

    legend
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text('咖啡因摄入：')

    legend.append('circle').attr('cx', 10).attr('cy', 20).attr('r', 5).attr('fill', '#F29076')
    legend.append('text').attr('x', 20).attr('y', 25).style('font-size', '12px').text('饮用咖啡')

    legend.append('circle').attr('cx', 10).attr('cy', 40).attr('r', 5).attr('fill', '#5AB3A6')
    legend.append('text').attr('x', 20).attr('y', 45).style('font-size', '12px').text('未饮咖啡')

    // 不显示任何数据点，保持空白
  }

  // 显示静态图表（所有数据点）
  function showStaticChart() {
    const dotsGroup = g.select('.dots-group')
    const validData = rawData.filter(
      (d) => d.Age != null && d['Sleep efficiency'] != null && d['Caffeine consumption'] != null,
    )

    // 设置坐标轴
    const x = d3
      .scaleLinear()
      .domain([d3.min(validData, (d) => d.Age) - 2, d3.max(validData, (d) => d.Age) + 2])
      .range([0, width])
    const y = d3.scaleLinear().domain([0.4, 1]).nice().range([height, 0])

    g.select('.x-axis').transition().duration(800).call(d3.axisBottom(x).ticks(8))
    g.select('.y-axis')
      .transition()
      .duration(800)
      .call(d3.axisLeft(y).tickFormat(d3.format('.0%')))
    g.select('.x-axis-title')
      .attr('x', width / 2)
      .attr('y', height + 45)
      .text('年龄')
    g.select('.y-axis-title')
      .attr('x', -height / 2)
      .attr('y', -50)
      .attr('transform', 'rotate(-90)')
      .text('睡眠效率')

    // 添加图例
    const legend = g
      .append('g')
      .attr('class', 'legend-group')
      .attr('transform', `translate(${width + 20}, ${height - 60})`)

    legend
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text('咖啡因摄入：')

    legend.append('circle').attr('cx', 10).attr('cy', 20).attr('r', 5).attr('fill', '#F29076')
    legend.append('text').attr('x', 20).attr('y', 25).style('font-size', '12px').text('饮用咖啡')

    legend.append('circle').attr('cx', 10).attr('cy', 40).attr('r', 5).attr('fill', '#5AB3A6')
    legend.append('text').attr('x', 20).attr('y', 45).style('font-size', '12px').text('未饮咖啡')

    // 显示所有数据点
    validData.forEach((d) => {
      const color = d['Caffeine consumption'] > 0 ? '#F29076' : '#5AB3A6'

      dotsGroup
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', x(d.Age))
        .attr('cy', y(d['Sleep efficiency']))
        .attr('r', 6)
        .attr('fill', color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 1)
        .attr('opacity', 0.8)
    })
  }

  // 渐进动画函数
  window.stagingAnimation = function () {
    initChart()

    const dotsGroup = g.select('.dots-group')
    const validData = rawData.filter(
      (d) => d.Age != null && d['Sleep efficiency'] != null && d['Caffeine consumption'] != null,
    )

    // 设置坐标轴
    const x = d3
      .scaleLinear()
      .domain([d3.min(validData, (d) => d.Age) - 2, d3.max(validData, (d) => d.Age) + 2])
      .range([0, width])
    const y = d3.scaleLinear().domain([0.4, 1]).nice().range([height, 0])

    g.select('.x-axis').transition().duration(800).call(d3.axisBottom(x).ticks(8))
    g.select('.y-axis')
      .transition()
      .duration(800)
      .call(d3.axisLeft(y).tickFormat(d3.format('.0%')))
    g.select('.x-axis-title')
      .attr('x', width / 2)
      .attr('y', height + 45)
      .text('年龄')
    g.select('.y-axis-title')
      .attr('x', -height / 2)
      .attr('y', -50)
      .attr('transform', 'rotate(-90)')
      .text('睡眠效率')

    // 定义年龄组
    const ageGroups = [
      { name: '青年（10-39岁）', minAge: 10, maxAge: 39 },
      { name: '中年（40-59岁）', minAge: 40, maxAge: 59 },
      { name: '老年（60岁及以上）', minAge: 60, maxAge: Infinity },
    ]

    // 添加图例
    const legend = g
      .append('g')
      .attr('class', 'legend-group')
      .attr('transform', `translate(${width + 20}, ${height - 60})`)

    legend
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text('咖啡因摄入：')

    legend.append('circle').attr('cx', 10).attr('cy', 20).attr('r', 5).attr('fill', '#F29076')
    legend
      .append('text')
      .attr('x', 20)
      .attr('y', 25)
      .style('font-size', '12px')
      .text('饮用咖啡')

    legend.append('circle').attr('cx', 10).attr('cy', 40).attr('r', 5).attr('fill', '#5AB3A6')
    legend
      .append('text')
      .attr('x', 20)
      .attr('y', 45)
      .style('font-size', '12px')
      .text('未饮咖啡')

    // 按年龄组分步显示数据点
    ageGroups.forEach((group, i) => {
      setTimeout(() => {
        // 筛选当前年龄组的数据
        let groupData
        if (group.maxAge === Infinity) {
          groupData = validData.filter((d) => d.Age >= group.minAge)
        } else {
          groupData = validData.filter((d) => d.Age >= group.minAge && d.Age <= group.maxAge)
        }

        // 添加年龄组标题
        const groupTitle = g
          .append('text')
          .attr('class', 'group-title')
          .attr('x', 10)
          .attr('y', -30)
          .style('font-size', '16px')
          .style('font-weight', 'bold')
          .style('fill', '#333')
          .style('opacity', 0)
          .text(`当前显示：${group.name}`)

        groupTitle.transition().duration(300).style('opacity', 1)

        // 所有点同时出现
        groupData.forEach((d) => {
          const color = d['Caffeine consumption'] > 0 ? '#F29076' : '#5AB3A6'

          dotsGroup
            .append('circle')
            .attr('class', `dot age-group-${i}`)
            .attr('cx', x(d.Age))
            .attr('cy', y(d['Sleep efficiency']))
            .attr('r', 0)
            .attr('fill', color)
            .attr('stroke', '#fff')
            .attr('stroke-width', 1)
            .attr('opacity', 0)
            .transition()
            .duration(600)
            .attr('r', 6)
            .attr('opacity', 0.8)
        })

        // 3秒后移除年龄组标题
        setTimeout(() => {
          groupTitle.transition().duration(200).style('opacity', 0).remove()
        }, 3000)
      }, i * 3500)
    })

    // 动画完成后显示最终标题
    setTimeout(() => {
      g.append('text')
        .attr('class', 'final-title')
        .attr('x', 10)
        .attr('y', -30)
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .style('fill', '#2c3e50')
        .style('opacity', 0)
        .text('完整的年龄-睡眠效率图')
        .transition()
        .duration(800)
        .style('opacity', 1)
    }, 10500)
  }
}

const playAnimation = () => {
  console.log('Playing animation...')
  if (window.stagingAnimation) {
    window.stagingAnimation()
  }
}

const confirmAnswer = () => {
  console.log('Selected answer:', selectedAnswer.value)
  // 跳转到Task 2
  router.push('/practice-task-2')
}
</script>

<style scoped>
.practice-task {
  width: 100%;
  padding: 0 0 60px 0;
  margin: 0;
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
}

.chart-area {
  flex: 1;
  min-width: 0;
}

.chart-container {
  background-color: white;
  border-radius: 8px;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
}

#chart {
  width: 100%;
  height: auto;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.button-control {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
  margin-top: 20px;
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

.task-title {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #1f1f1f;
  margin: 0 0 10px 0;
  text-align: left;
}

.options-section {
  margin-bottom: 0;
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

.confirm-btn:active:not(:disabled) {
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

/* D3.js 图表样式 */
:deep(.axis) {
  font-size: 12px;
}

:deep(.axis-title) {
  font-size: 14px;
  font-weight: bold;
}

:deep(.dot) {
  cursor: pointer;
}

:deep(.dot:hover) {
  stroke-width: 2;
  opacity: 1 !important;
}
</style>
