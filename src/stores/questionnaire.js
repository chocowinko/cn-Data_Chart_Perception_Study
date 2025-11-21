import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const SESSION_STORAGE_KEY = 'questionnaire_data'

export const useQuestionnaireStore = defineStore('questionnaire', () => {
  // 第一部分：背景经验
  const part1 = ref({
    name: '',
    gender: '',
    age: '',
    chartFrequency: '',
    animationFamiliarity: '',
    visualImpairment: '',
    visualImpairmentDetail: ''
  })

  // 第二部分：整体实验的体验感受
  const part2 = ref({
    emotions: {
      interested: null,
      upset: null,
      excited: null,
      uneasy: null,
      determined: null,
      frustrated: null,
      focused: null,
      nervous: null,
      energetic: null,
      bored: null
    },
    load: {
      mentalLoad: null,
      timePressure: null,
      usability: null,
      clarity: null,
      confidence: null,
      attentionCheck: null
    }
  })

  // 第三部分：分别对三种动画策略的主观评估和排名
  const part3 = ref({
    highlighting: {
      attention: null,
      cognitiveLoad: null,
      understanding: null,
      distraction: null
    },
    staging: {
      attention: null,
      cognitiveLoad: null,
      understanding: null,
      distraction: null
    },
    tracing: {
      attention: null,
      cognitiveLoad: null,
      understanding: null,
      distraction: null
    },
    preferences: {
      performance: { 1: '', 2: '', 3: '' },
      effort: { 1: '', 2: '', 3: '' },
      affective: { 1: '', 2: '', 3: '' },
      aesthetic: { 1: '', 2: '', 3: '' },
      enjoyment: { 1: '', 2: '', 3: '' },
      attention: { 1: '', 2: '', 3: '' }
    }
  })

  // 第四部分：开放性反馈
  const part4 = ref({
    difficulties: '',
    helpful: ''
  })

  // 问卷完成时间戳
  const timestamps = ref({
    part1Completed: null,
    part2Completed: null,
    part3Completed: null,
    part4Completed: null,
    startTime: null,
    endTime: null
  })

  /**
   * 初始化问卷开始时间
   */
  function startQuestionnaire() {
    if (!timestamps.value.startTime) {
      timestamps.value.startTime = Date.now()
      console.log('📋 问卷开始:', new Date(timestamps.value.startTime))
    }
  }

  /**
   * 更新第一部分数据
   */
  function updatePart1(data) {
    part1.value = { ...part1.value, ...data }
    timestamps.value.part1Completed = Date.now()
    console.log('✅ 第一部分已保存')
  }

  /**
   * 更新第二部分数据
   */
  function updatePart2(data) {
    part2.value = { ...part2.value, ...data }
    timestamps.value.part2Completed = Date.now()
    console.log('✅ 第二部分已保存')
  }

  /**
   * 更新第三部分数据
   */
  function updatePart3(data) {
    part3.value = { ...part3.value, ...data }
    timestamps.value.part3Completed = Date.now()
    console.log('✅ 第三部分已保存')
  }

  /**
   * 更新第四部分数据并完成问卷
   */
  function updatePart4(data) {
    part4.value = { ...part4.value, ...data }
    timestamps.value.part4Completed = Date.now()
    timestamps.value.endTime = Date.now()
    console.log('✅ 第四部分已保存')
    console.log('🎉 问卷已完成')
  }

  /**
   * 检查问卷是否完成
   */
  const isCompleted = computed(() => {
    return timestamps.value.part4Completed !== null
  })

  /**
   * 获取问卷完成进度
   */
  const completionProgress = computed(() => {
    let completed = 0
    if (timestamps.value.part1Completed) completed++
    if (timestamps.value.part2Completed) completed++
    if (timestamps.value.part3Completed) completed++
    if (timestamps.value.part4Completed) completed++
    return (completed / 4) * 100
  })

  /**
   * 获取所有问卷数据
   */
  function getAllData() {
    return {
      part1: part1.value,
      part2: part2.value,
      part3: part3.value,
      part4: part4.value,
      timestamps: timestamps.value,
      completionProgress: completionProgress.value,
      isCompleted: isCompleted.value
    }
  }

  /**
   * 导出数据为 JSON
   */
  function exportData() {
    const totalTime = timestamps.value.endTime && timestamps.value.startTime 
      ? timestamps.value.endTime - timestamps.value.startTime 
      : null

    const data = {
      exportTime: new Date().toISOString(),
      questionnaireData: {
        part1: part1.value,
        part2: part2.value,
        part3: part3.value,
        part4: part4.value
      },
      metadata: {
        startTime: timestamps.value.startTime ? new Date(timestamps.value.startTime).toISOString() : null,
        endTime: timestamps.value.endTime ? new Date(timestamps.value.endTime).toISOString() : null,
        totalTimeSeconds: totalTime ? (totalTime / 1000).toFixed(2) : null,
        completionProgress: completionProgress.value,
        isCompleted: isCompleted.value,
        partCompletionTimes: {
          part1: timestamps.value.part1Completed ? new Date(timestamps.value.part1Completed).toISOString() : null,
          part2: timestamps.value.part2Completed ? new Date(timestamps.value.part2Completed).toISOString() : null,
          part3: timestamps.value.part3Completed ? new Date(timestamps.value.part3Completed).toISOString() : null,
          part4: timestamps.value.part4Completed ? new Date(timestamps.value.part4Completed).toISOString() : null
        }
      }
    }

    return JSON.stringify(data, null, 2)
  }

  /**
   * 下载为 JSON 文件
   */
  function downloadJSON() {
    const jsonData = exportData()
    const blob = new Blob([jsonData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
    link.href = url
    link.download = `questionnaire-data-${timestamp}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    console.log('📥 问卷数据已下载')
  }

  /**
   * 清除所有数据
   */
  function clearAllData() {
    part1.value = {
      name: '',
      gender: '',
      age: '',
      chartFrequency: '',
      animationFamiliarity: '',
      visualImpairment: '',
      visualImpairmentDetail: ''
    }
    part2.value = {
      emotions: {},
      load: {}
    }
    part3.value = {
      highlighting: {},
      staging: {},
      tracing: {},
      preferences: {
        performance: { 1: '', 2: '', 3: '' },
        effort: { 1: '', 2: '', 3: '' },
        affective: { 1: '', 2: '', 3: '' },
        aesthetic: { 1: '', 2: '', 3: '' },
        enjoyment: { 1: '', 2: '', 3: '' },
        attention: { 1: '', 2: '', 3: '' }
      }
    }
    part4.value = {
      difficulties: '',
      helpful: ''
    }
    timestamps.value = {
      part1Completed: null,
      part2Completed: null,
      part3Completed: null,
      part4Completed: null,
      startTime: null,
      endTime: null
    }
    console.log('🗑️ 所有问卷数据已清除')
    sessionStorage.removeItem(SESSION_STORAGE_KEY)
  }

  /**
   * 设置用户名
   */
  function setUserName(name) {
    part1.value.name = name
  }

  /**
   * 从 sessionStorage 初始化 store
   */
  function initializeFromSession() {
    const savedState = sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (savedState) {
      const savedStore = JSON.parse(savedState)
      part1.value = savedStore.part1
      part2.value = savedStore.part2
      part3.value = savedStore.part3
      part4.value = savedStore.part4
      timestamps.value = savedStore.timestamps
      console.log('✅ 问卷数据已从 sessionStorage 恢复')
    }
  }

  return {
    // 数据
    part1,
    part2,
    part3,
    part4,
    timestamps,
    
    // 计算属性
    isCompleted,
    completionProgress,
    
    // 方法
    startQuestionnaire,
    updatePart1,
    updatePart2,
    updatePart3,
    updatePart4,
    getAllData,
    exportData,
    downloadJSON,
    clearAllData,
    setUserName,
    initializeFromSession
  }
})
