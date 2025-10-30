import { useTimingStore } from '@/stores/timing'
import { useRouter } from 'vue-router'

/**
 * 任务计时 Composable
 * 简化任务页面中的计时逻辑
 * 
 * 使用方法:
 * const { handlePlayAnimation, handleConfirm } = useTaskTimer('task-id', 'Task Name')
 * 
 * 在 Play Animation 按钮: @click="handlePlayAnimation(playAnimation)"
 * 在 Confirm 按钮: @click="handleConfirm(confirmAnswer, selectedAnswer, '/next-route')"
 */
export function useTaskTimer(taskId, taskName) {
  const timingStore = useTimingStore()
  const router = useRouter()

  /**
   * 处理 Play Animation 点击
   * @param {Function} originalPlayAnimation - 原始的 playAnimation 函数
   */
  const handlePlayAnimation = (originalPlayAnimation) => {
    // 开始计时
    timingStore.startTiming(taskId, taskName)
    
    // 执行原始的动画播放函数
    if (originalPlayAnimation) {
      originalPlayAnimation()
    }
  }

  /**
   * 处理 Confirm 点击
   * @param {Function} originalConfirm - 原始的 confirm 函数（可选）
   * @param {any} answer - 用户的答案
   * @param {string} nextRoute - 下一个页面的路由
   */
  const handleConfirm = async (originalConfirm, answer, nextRoute) => {
    // 结束计时并记录答案
    timingStore.endTiming(answer)
    
    // 执行原始的确认函数（如果有）
    if (originalConfirm && typeof originalConfirm === 'function') {
      await originalConfirm()
    }
    
    // 跳转到下一个页面
    if (nextRoute) {
      router.push(nextRoute)
    }
  }

  return {
    handlePlayAnimation,
    handleConfirm,
  }
}
