<template>
  <div class="network-diagram-tracing">
    <h2 class="page-title">Network Diagram + Tracing (1/3)</h2>

    <!-- 主内容区域：左右两列布局 -->
    <div class="content-container">
      <!-- 左侧：任务问题区域 -->
      <div class="task-section">
        <h3 class="event-description">
          Tracing Event: A message broadcast starts from <em>Student 114</em> and spreads through the
          network. Each student forwards messages to their contacts sequentially, ordered by contact
          frequency (<em>highest to lowest</em>).</h3>

        <h2 class="task-title">
          Task 1: Please identify the student who received the message <em>last</em> in this broadcast.</h2>

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
            @click="handleConfirm(null, selectedAnswer, '/network-diagram-tracing-2')"
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
        <div class="chart-wrapper">
          <iframe
            ref="chartIframe"
            src="/src/All/Network_Diagram/network+tracing.html"
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
const selectedAnswer = ref('')
const chartIframe = ref(null)

const { handlePlayAnimation, handleConfirm } = useTaskTimer(
  'network-diagram-tracing-1',
  'Network Diagram + Tracing (1/3)',
)

const options = [
  { value: 'A', label: '(A) <em>Student 97</em>' },
  { value: 'B', label: '(B) <em>Student 84</em>' },
  { value: 'C', label: '(C) <em>Student 116</em>' },
  { value: 'D', label: '(D) <em>Student 72</em>' },
]

const playAnimation = () => {
  if (chartIframe.value && chartIframe.value.contentWindow) {
    // 假设tracing页面有类似的函数来触发动画
    if (chartIframe.value.contentWindow.startBroadcast) {
      chartIframe.value.contentWindow.startBroadcast()
    }
  }
}

// confirmAnswer 功能已由 handleConfirm 替代
</script>

<style scoped>
.network-diagram-tracing {
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
  gap: 40px;
  margin-bottom: 40px;
  margin-top: 0;
  align-items: flex-start;
}

.task-section {
  flex: 0 0 280px;
  min-width: 280px;
  margin-top: 60px;
}

.chart-area {
  flex: 1;
  min-width: 800px;
  width: calc(100vw - 320px);
  margin-top: 70px;
}

.chart-wrapper {
  width: 100%;
  margin-top: -50px;
  margin-bottom: 0;
  overflow: visible;
}

.chart-iframe {
  width: 100%;
  height: 960px;
  display: block;
  border: none;
  overflow: hidden;
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
    Roboto,
    sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #545454;
  margin: 0 0 20px 0;
  text-align: left;
  font-style: italic;
}

.event-description em {
  font-weight: 600;
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
    Roboto,
    sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
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
    Roboto,
    sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
}
</style>
