<template>
  <div class="scatterplot-intro">
    <h1 class="main-title">散点图</h1>

    <div class="description-section">
      <p class="description">本图展示了年龄、睡眠效率与咖啡摄入习惯之间的关系，具体说明如下：</p>

      <ul class="features-list">
        <li>横轴（从左到右）表示参与者的年龄。</li>
        <li>纵轴（从下到上）表示参与者的睡眠效率（以百分比显示），数值越高代表睡眠效率越好。</li>
        <li>每个圆点代表一位参与者。</li>
      </ul>
    </div>

    <div class="chart-display">
      <div class="chart-container">
        <svg id="chart"></svg>
        <div id="error" class="error-message"></div>
      </div>
    </div>

    <button class="practice-button" @click="enterPractice">
      <span class="button-text">进入练习</span>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()

const enterPractice = () => {
  console.log('Entering practice...')
  router.push('/practice-task')
}

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
  const svg = d3.select('#chart'),
    margin = { top: 50, right: 180, bottom: 30, left: 90 }

  let rawData
  let currentAnimationTimer = null
  let width, height, g

  // 获取容器尺寸并设置SVG
  function updateDimensions() {
    const container = d3.select('.chart-container').node()
    const containerWidth = container.getBoundingClientRect().width - 40
    const containerHeight = containerWidth * 0.5

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
      startLoopAnimation()
    })
    .catch((err) => {
      d3.select('#error').text('数据加载失败：' + err)
      console.error('数据加载失败：', err)
    })

  // 循环动画控制
  function startLoopAnimation() {
    stagingAnimation()
    // 动画完成后等待2秒，然后重新开始
    setTimeout(() => {
      initChart()
      startLoopAnimation()
    }, 12500) // 动画总时长10.5秒 + 2秒等待
  }

  // 渐进动画函数
  function stagingAnimation() {
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

    // 添加图例 - 移动到右下角，与Y轴对齐
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
</script>

<style scoped>
.scatterplot-intro {
  width: 100%;
  padding: 0;
  margin: 0;
  text-align: left;
}

.main-title {
  width: 100%;
  font-family: Roboto, sans-serif;
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
  width: 100%; /* 占用父容器的全部宽度 */
  margin-bottom: 30px;
}

.description {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17.7778px;
  line-height: 25px;
  color: #545454;
  margin: 0 0 20px 0;
  text-align: left;
}

.features-list {
  font-family: Roboto, sans-serif;
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
  margin-bottom: 0px;
  display: flex;
  justify-content: flex-start;
}

.chart-container {
  background-color: white;
  border-radius: 8px;
  padding: 0px;
  margin-bottom: 0;
  width: 100%;
  max-width: 800px;
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

.practice-button {
  width: 202px;
  height: 50px;
  background: #1f1f1f;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  margin-top: 0px;
  position: relative;
  z-index: 1000;
}

.practice-button:hover {
  background-color: #333;
}

.practice-button:active {
  transform: translateY(1px);
}

.button-text {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 400;
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
