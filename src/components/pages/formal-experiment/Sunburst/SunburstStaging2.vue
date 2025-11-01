<template>
  <div class="sunburst-staging">
    <h2 class="page-title">旭日图 + 分阶段 (2/3)</h2>

    <!-- 主内容区域：左右两列布局 -->
    <div class="content-container">
      <!-- 左侧：任务问题区域 -->
      <div class="task-section">
        <h3 class="event-description">
          分阶段事件：动画逐步展示烘焙味类别及其子类别。</h3>

        <h2 class="task-title">
          任务2：当谷物组在动画中出现时，以下哪个其他组同时出现在同一层级？</h2>

        <div class="options-section">
          <div class="option" v-for="option in options" :key="option.value">
            <input
              type="radio"
              :id="`option-${option.value}`"
              :value="option.value"
              v-model="selectedAnswer"
              class="option-radio"
            />
            <label :for="`option-${option.value}`" class="option-label">
              <span class="option-letter">{{ option.label.substring(0, 3) }}</span>
              <span v-html="option.label.substring(4)"></span>
            </label>
          </div>
        </div>

        <!-- 按钮区域 -->
        <div class="button-control">
          <button
            class="confirm-btn"
            @click="handleConfirm(null, selectedAnswer, '/sunburst-staging-3')"
            :disabled="!selectedAnswer"
          >
            <span class="button-text">确认</span>
          </button>
          <button
            class="play-animation-btn"
            @click="handlePlayAnimation(playAnimation)"
            :disabled="!isIframeLoaded"
          >
            <span class="button-text">{{ isIframeLoaded ? '播放动画' : '加载中...' }}</span>
          </button>
        </div>
      </div>

      <!-- 右侧：图表区域 -->
      <div class="chart-area">
        <h1 class="chart-main-title">世界咖啡研究感官词典</h1>

        <div class="chart-wrapper">
          <iframe
            ref="chartIframe"
            src="/src/All/Sunburst_Diagram/sunburst_staging_2.html"
            class="chart-iframe"
            frameborder="0"
            scrolling="no"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskTimer } from '@/composables/useTaskTimer'

const chartIframe = ref(null)
const selectedAnswer = ref('')
const isIframeLoaded = ref(false)

const { handlePlayAnimation, handleConfirm } = useTaskTimer(
  'sunburst-staging-2',
  '旭日图 + 分阶段 (2/3)',
)

const options = [
  { label: '(A) 麦芽', value: 'A' },
  { label: '(B) 焦味', value: 'B' },
  { label: '(C) 坚果味', value: 'C' },
  { label: '(D) 红茶', value: 'D' },
]

onMounted(() => {
  if (chartIframe.value) {
    chartIframe.value.addEventListener('load', () => {
      setTimeout(() => {
        isIframeLoaded.value = true
      }, 500)
    })
  }
})

const playAnimation = () => {
  if (chartIframe.value?.contentWindow?.playStagingAnimation) {
    chartIframe.value.contentWindow.playStagingAnimation()
  }
}

// confirmAnswer 功能已由 handleConfirm 替代
</script>

<style scoped>
.sunburst-staging {
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
  width: calc(100vw - 280px);
  margin-top: 60px;
  overflow: visible;
}

.chart-main-title {
  font-family:
    PingFang SC,
    sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #2c3e50;
  margin: -20px 0 20px 40px;
  padding: 0;
  text-align: left;
}

.chart-wrapper {
  width: 100%;
  margin-top: -40px;
  margin-bottom: 0;
  overflow: visible;
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;
}

.chart-iframe {
  width: 100%;
  max-width: 100%;
  height: 800px;
  display: block;
  border: none;
  overflow: visible;
  zoom: 0.8;
  pointer-events: none;
}

.button-control {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
  margin-top: 0;
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

.play-animation-btn:hover:not(:disabled) {
  background-color: #333;
}

.play-animation-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.play-animation-btn:disabled {
  background: #999;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.event-description {
  font-family:
    PingFang SC,
    sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #545454;
  margin: 10px 0 20px 0;
  text-align: left;
}

.task-title {
  font-family:
    PingFang SC,
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
    PingFang SC,
    sans-serif;
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

.button-text {
  font-family:
    PingFang SC,
    sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
}
</style>
