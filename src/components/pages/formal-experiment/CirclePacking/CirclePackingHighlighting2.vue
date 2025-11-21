<template>
  <div class="circle-packing-highlighting">
    <h2 class="page-title">圆堆积图 + 高亮 (2/3)</h2>

    <!-- 主内容区域：左右两列布局 -->
    <div class="content-container">
      <!-- 左侧：任务问题区域 -->
      <div class="task-section">
        <h3 class="event-description">
          高亮事件：高亮显示亚洲五个区域中排放量最高的国家。</h3>

        <h2 class="task-title">
          任务 2：在五个高亮的亚洲国家中，排名第二的国家与芬兰相比，谁的人均排放量更高？</h2>

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
            @click="handleConfirm(null, selectedAnswer, '/circle-packing-highlighting-3')"
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
        <h1 class="chart-main-title">
          人均温室气体排放量：亚洲与欧洲对比
        </h1>

        <div class="chart-wrapper">
          <iframe
            ref="chartIframe"
            src="/src/All/Circle_Packing/circle_packing_highlighting_2.html"
            class="chart-iframe"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskTimer } from '@/composables/useTaskTimer'

const router = useRouter()
const chartIframe = ref(null)
const selectedAnswer = ref('')

const { handlePlayAnimation, handleConfirm } = useTaskTimer(
  'circle-packing-highlighting-2',
  '圆堆积图 + 高亮 (2/3)',
  null,
)

const options = [
  { label: '(A) 蒙古', value: 'A' },
  { label: '(B) 卡塔尔', value: 'B' },
  { label: '(C) 芬兰', value: 'C' },
  { label: '(D) 哈萨克斯坦', value: 'D' },
]

const playAnimation = () => {
  if (chartIframe.value?.contentWindow?.playHighlightAnimation) {
    chartIframe.value.contentWindow.playHighlightAnimation()
  }
}

// confirmAnswer 功能已由 handleConfirm 替代
</script>

<style scoped>
.circle-packing-highlighting {
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
  margin-top: 30px;
}

.chart-main-title {
  font-family:
    PingFang SC,
    sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px !important;
  line-height: 24px !important;
  color: #2c3e50;
  margin: 10px 0 20px 40px;
  padding: 0;
  text-align: left;
}

.chart-wrapper {
  width: 100%;
  margin-top: 0;
  margin-bottom: 0;
  overflow: visible;
  display: flex;
  justify-content: flex-start;
}

.chart-iframe {
  width: 100%;
  height: 800px;
  display: block;
  border: none;
  overflow: hidden;
  transform: scale(1.18);
  transform-origin: top left;
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

.event-description {
  font-family:
    PingFang SC,
    sans-serif;
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
  font-family:
    PingFang SC,
    sans-serif;
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

.option-label em {
  font-weight: 600;
  font-style: italic;
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
  font-size: 16px !important;
  line-height: 24px !important;
  color: #ffffff;
}
</style>
