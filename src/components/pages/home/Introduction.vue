<template>
  <div class="introduction">
    <h1 class="main-title">数据图表感知研究</h1>

    <div class="content">
      <p class="welcome-text">欢迎参与本研究！</p>

      <p class="description">感谢您愿意投入时间和精力来改进数据图表的设计。</p>

      <p class="consent-text">在点击"开始"之前，请确保您已经阅读并签署了提供的纸质知情同意书。</p>

      <div class="task-flow-section">
        <h2 class="task-flow-title">任务流程</h2>
        <div class="task-flow-content">
          <p>
            在实验过程中，您将看到一个描述特定数据集特征的图表。同时，您会在图表下方找到一个相关的问题。确认问题后，您可以点击"播放动画"按钮，触发动画以帮助您更好地理解数据。
          </p>
          <p>根据您从动画图表中学到的内容，您可以通过勾选相应选项来给出答案。</p>
        </div>
      </div>

      <div class="chart-animation-section">
        <h2 class="chart-animation-title">实验任务类型</h2>
        <div class="table-chart-area">
          <div class="table-container">
            <table class="animation-strategy-table">
              <thead>
                <tr>
                  <th class="chart-type-header">
                    <div class="header-diagonal">
                      <span class="header-top">动画策略</span>
                      <span class="header-bottom">图表类型</span>
                    </div>
                  </th>
                  <th class="strategy-header">高亮</th>
                  <th class="strategy-header">分步</th>
                  <th class="strategy-header">追踪</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="chart-type">散点图</td>
                  <td class="strategy-cell">1</td>
                  <td class="strategy-cell">2</td>
                  <td class="strategy-cell">3</td>
                </tr>
                <tr>
                  <td class="chart-type">热力图</td>
                  <td class="strategy-cell">4</td>
                  <td class="strategy-cell">5</td>
                  <td class="strategy-cell">6</td>
                </tr>
                <tr>
                  <td class="chart-type">折线图</td>
                  <td class="strategy-cell">7</td>
                  <td class="strategy-cell">8</td>
                  <td class="strategy-cell">9</td>
                </tr>
                <tr>
                  <td class="chart-type">目的地地图</td>
                  <td class="strategy-cell">10</td>
                  <td class="strategy-cell">11</td>
                  <td class="strategy-cell">12</td>
                </tr>
                <tr>
                  <td class="chart-type">桑基图</td>
                  <td class="strategy-cell">13</td>
                  <td class="strategy-cell">14</td>
                  <td class="strategy-cell">15</td>
                </tr>
                <tr>
                  <td class="chart-type">网络图</td>
                  <td class="strategy-cell">16</td>
                  <td class="strategy-cell">17</td>
                  <td class="strategy-cell">18</td>
                </tr>
                <tr>
                  <td class="chart-type">圆堆积</td>
                  <td class="strategy-cell">19</td>
                  <td class="strategy-cell">20</td>
                  <td class="strategy-cell">--</td>
                </tr>
                <tr>
                  <td class="chart-type">树状图</td>
                  <td class="strategy-cell">21</td>
                  <td class="strategy-cell">22</td>
                  <td class="strategy-cell">--</td>
                </tr>
                <tr>
                  <td class="chart-type">旭日图</td>
                  <td class="strategy-cell">23</td>
                  <td class="strategy-cell">24</td>
                  <td class="strategy-cell">--</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <p class="ready-text">准备好后，请点击下方按钮开始您的体验。</p>

      <button class="start-button" @click="startProject">
        <span class="button-text">开始项目</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const startProject = () => {
  console.log('Start Project button clicked!')
  try {
    router.push('/scatterplot-intro')
    console.log('Navigation to /scatterplot-intro initiated')
  } catch (error) {
    console.error('Navigation error:', error)
  }
}
</script>

<style scoped>
.introduction {
  width: 100%;
  max-width: 1200px;
  padding: 0 0 60px 0;
  margin: 0;
  text-align: left;
}

.main-title {
  width: 100%;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 35.5556px;
  line-height: 43px;
  color: #1f1f1f;
  margin: 0 0 20px 0;
  padding: 0;
  text-align: left;
}

.content {
  width: 100%;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 17.7778px;
  line-height: 25px;
  color: #545454;
}

.welcome-text,
.description,
.consent-text {
  text-align: left;
}

.welcome-text {
  margin-bottom: 24px;
}

.description {
  margin-bottom: 24px;
}

.consent-text {
  margin-bottom: 40px;
}

.task-flow-section {
  width: 100%;
  margin-bottom: 40px;
}

.task-flow-title {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1f1f1f;
  margin: 0 0 20px 0;
  text-align: left;
}

.task-flow-content {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17.7778px;
  line-height: 28px;
  color: #545454;
  text-align: left;
}

.task-flow-content p {
  margin: 0 0 15px 0;
  text-align: left;
}

.task-flow-content p:last-child {
  margin-bottom: 0;
}

.chart-animation-section {
  width: 100%;
  margin-bottom: 40px;
}

.chart-animation-title {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1f1f1f;
  margin: 0 0 20px 0;
  text-align: left;
}

.table-chart-area {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.table-container {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  margin-bottom: 20px;
}

.animation-strategy-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Roboto, sans-serif;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.animation-strategy-table thead {
  background: #f8f9fa;
}

.chart-type-header {
  background: #e9ecef;
  font-weight: 600;
  font-size: 14px;
  color: #1f1f1f;
  padding: 0;
  text-align: center;
  border: 1px solid #dee2e6;
  position: relative;
  width: 180px;
  height: 70px;
}

.header-diagonal {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-diagonal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to top right,
    #e9ecef 49.5%,
    #1f1f1f 49.5%,
    #1f1f1f 50.5%,
    #e9ecef 50.5%
  );
  z-index: 1;
}

.header-top {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #1f1f1f;
  z-index: 2;
  line-height: 1.2;
  text-align: center;
  max-width: 80px;
}

.header-bottom {
  position: absolute;
  bottom: 8px;
  left: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #1f1f1f;
  z-index: 2;
  line-height: 1.2;
  text-align: center;
  max-width: 80px;
}

.strategy-header {
  background: #f8f9fa;
  font-weight: 600;
  font-size: 16px;
  color: #1f1f1f;
  padding: 16px;
  text-align: center;
  border: 1px solid #dee2e6;
}

.chart-type {
  background: #f8f9fa;
  font-weight: 500;
  font-size: 14px;
  color: #495057;
  padding: 12px 16px;
  text-align: left;
  border: 1px solid #dee2e6;
  width: 180px;
}

.strategy-cell {
  font-weight: 400;
  font-size: 14px;
  color: #6c757d;
  padding: 12px;
  text-align: center;
  border: 1px solid #dee2e6;
  background: white;
}

.strategy-cell:empty {
  background: #f8f9fa;
}

.animation-strategy-table tbody tr:hover {
  background: #f8f9fa;
}

.animation-strategy-table tbody tr:hover .strategy-cell {
  background: #e9ecef;
}

.ready-text {
  margin-bottom: 24px;
  margin-top: 40px;
}

.start-button {
  width: 180px;
  height: 50px;
  background: #1f1f1f;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  margin-top: 0;
}

.start-button:hover {
  background-color: #333;
}

.start-button:active {
  transform: translateY(1px);
}

.button-text {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
}
</style>
