import { defineStore } from 'pinia'
import { ref } from 'vue'

const SESSION_STORAGE_KEY = 'timing_data'

export const useTimingStore = defineStore('timing', () => {
  // 存储所有任务的计时数据
  const taskRecords = ref([])

  // 当前任务的数据
  const currentTask = ref({
    taskId: null,
    taskName: null,
    startTime: null,
    endTime: null,
    duration: null,
    answer: null,
  })

  /**
   * 开始计时 - 当用户点击 Play Animation 时调用
   * @param {string} taskId - 任务唯一标识符
   * @param {string} taskName - 任务名称
   * @returns {boolean} 是否成功开始计时（如果已经在计时则返回false）
   */
  function startTiming(taskId, taskName) {
    // 如果当前任务已经在计时中，且是同一个任务，则不重新开始
    if (currentTask.value.startTime && currentTask.value.taskId === taskId) {
      console.log(`⚠️ 任务 ${taskName} 已在计时中，忽略重复的 Play Animation 点击`)
      return false
    }
    
    currentTask.value = {
      taskId,
      taskName,
      startTime: Date.now(),
      endTime: null,
      duration: null,
      answer: null,
    }
    console.log(`⏱️ 开始计时: ${taskName}`, new Date(currentTask.value.startTime))
    return true
  }

  /**
   * 结束计时 - 当用户点击 Confirm 时调用
   * @param {any} answer - 用户的答案
   */
  function endTiming(answer = null) {
    if (!currentTask.value.startTime) {
      console.warn('⚠️ 计时未开始，无法结束')
      return null
    }

    currentTask.value.endTime = Date.now()
    currentTask.value.duration = currentTask.value.endTime - currentTask.value.startTime
    currentTask.value.answer = answer

    // 保存到记录中
    taskRecords.value.push({ ...currentTask.value })

    const durationInSeconds = (currentTask.value.duration / 1000).toFixed(2)
    console.log(`⏱️ 结束计时: ${currentTask.value.taskName}`)
    console.log(`⌚ 用时: ${durationInSeconds} 秒`)
    console.log(`📝 答案: ${answer}`)

    // 重置当前任务
    const record = { ...currentTask.value }
    currentTask.value = {
      taskId: null,
      taskName: null,
      startTime: null,
      endTime: null,
      duration: null,
      answer: null,
    }

    return record
  }

  /**
   * 获取所有任务记录
   */
  function getAllRecords() {
    return taskRecords.value
  }

  /**
   * 获取任务统计信息
   */
  function getStatistics() {
    const totalTasks = taskRecords.value.length
    const totalTime = taskRecords.value.reduce((sum, record) => sum + record.duration, 0)
    const averageTime = totalTasks > 0 ? totalTime / totalTasks : 0

    return {
      totalTasks,
      totalTime,
      averageTime,
      records: taskRecords.value,
    }
  }

  /**
   * 清除所有记录
   */
  function clearRecords() {
    taskRecords.value = []
    currentTask.value = {
      taskId: null,
      taskName: null,
      startTime: null,
      endTime: null,
      duration: null,
      answer: null,
    }
    sessionStorage.removeItem(SESSION_STORAGE_KEY)
  }

  /**
   * 导出数据为 JSON
   */
  function exportData() {
    const data = {
      exportTime: new Date().toISOString(),
      statistics: getStatistics(),
      records: taskRecords.value.map((record) => ({
        ...record,
        startTimeFormatted: new Date(record.startTime).toISOString(),
        endTimeFormatted: new Date(record.endTime).toISOString(),
        durationSeconds: (record.duration / 1000).toFixed(2),
      })),
    }

    return JSON.stringify(data, null, 2)
  }

  function initializeFromSession() {
    const savedState = sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (savedState) {
      const savedStore = JSON.parse(savedState)
      taskRecords.value = savedStore.taskRecords
      currentTask.value = savedStore.currentTask
      console.log('✅ 计时数据已从 sessionStorage 恢复')
    }
  }

  return {
    initializeFromSession,
    taskRecords,
    currentTask,
    startTiming,
    endTiming,
    getAllRecords,
    getStatistics,
    clearRecords,
    exportData,
  }
})
