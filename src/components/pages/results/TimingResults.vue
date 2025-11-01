<template>
  <div class="timing-results">
    <h1 class="page-title">📊 任务计时结果</h1>

    <!-- 统计概览 -->
    <div class="statistics-card">
      <h2>统计概览</h2>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-label">总任务数</div>
          <div class="stat-value">{{ statistics.totalTasks }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">总用时</div>
          <div class="stat-value">{{ formatTime(statistics.totalTime) }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">平均用时</div>
          <div class="stat-value">{{ formatTime(statistics.averageTime) }}</div>
        </div>
      </div>
    </div>

    <!-- 任务列表 -->
    <div class="tasks-section">
      <h2>任务详情</h2>
      <div v-if="records.length === 0" class="empty-state">
        <p>暂无任务记录</p>
        <p class="hint">完成任务后会在这里显示计时数据</p>
      </div>
      <div v-else class="tasks-list">
        <div v-for="(record, index) in records" :key="index" class="task-card">
          <div class="task-header">
            <h3 class="task-name">{{ record.taskName }}</h3>
            <span class="task-id">{{ record.taskId }}</span>
          </div>
          <div class="task-details">
            <div class="detail-row">
              <span class="detail-label">⏱️ 用时:</span>
              <span class="detail-value highlight">{{ formatTime(record.duration) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">📝 答案:</span>
              <span class="detail-value">{{ record.answer || '无答案' }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">🕐 开始时间:</span>
              <span class="detail-value">{{ formatDateTime(record.startTime) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">🕑 结束时间:</span>
              <span class="detail-value">{{ formatDateTime(record.endTime) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="actions">
      <button class="btn btn-primary" @click="exportData">📥 导出数据 (JSON)</button>
      <button class="btn btn-secondary" @click="clearData">🗑️ 清除所有数据</button>
      <button class="btn btn-default" @click="goHome">🏠 返回首页</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTimingStore } from '@/stores/timing'

const router = useRouter()
const timingStore = useTimingStore()

const statistics = computed(() => timingStore.getStatistics())
const records = computed(() => timingStore.getAllRecords())

function formatTime(milliseconds) {
  if (!milliseconds) return '0秒'
  const seconds = (milliseconds / 1000).toFixed(2)
  return `${seconds}秒`
}

function formatDateTime(timestamp) {
  if (!timestamp) return '-'
  const date = new Date(timestamp)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

function exportData() {
  const data = timingStore.exportData()
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `timing-results-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
  console.log('✅ 数据已导出')
}

function clearData() {
  if (confirm('确定要清除所有计时数据吗？此操作不可恢复。')) {
    timingStore.clearRecords()
    console.log('🗑️ 数据已清除')
  }
}

function goHome() {
  router.push('/')
}
</script>

<style scoped>
.timing-results {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-title {
  font-family: PingFang SC, sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #1f1f1f;
  margin-bottom: 30px;
  text-align: center;
}

.statistics-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.statistics-card h2 {
  font-size: 20px;
  font-weight: 600;
  color: #1f1f1f;
  margin-bottom: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #1f1f1f;
}

.tasks-section h2 {
  font-size: 20px;
  font-weight: 600;
  color: #1f1f1f;
  margin-bottom: 20px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.empty-state p {
  margin: 10px 0;
}

.hint {
  font-size: 14px;
  color: #bbb;
}

.tasks-list {
  display: grid;
  gap: 20px;
}

.task-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.task-name {
  font-size: 18px;
  font-weight: 600;
  color: #1f1f1f;
  margin: 0;
}

.task-id {
  font-size: 12px;
  color: #999;
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
}

.task-details {
  display: grid;
  gap: 12px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.detail-label {
  font-size: 14px;
  color: #666;
}

.detail-value {
  font-size: 14px;
  color: #1f1f1f;
  font-weight: 500;
}

.detail-value.highlight {
  color: #2196f3;
  font-size: 16px;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 40px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #2196f3;
  color: white;
}

.btn-primary:hover {
  background: #1976d2;
}

.btn-secondary {
  background: #f44336;
  color: white;
}

.btn-secondary:hover {
  background: #d32f2f;
}

.btn-default {
  background: #757575;
  color: white;
}

.btn-default:hover {
  background: #616161;
}

.btn:active {
  transform: translateY(1px);
}
</style>
