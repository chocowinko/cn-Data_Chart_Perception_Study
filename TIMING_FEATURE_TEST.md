# 计时功能测试说明

## 新增功能：防止重复计时

### 功能描述
在同一个任务页面中，只有**第一次**点击 "Play Animation" 按钮才会开始计时。后续再次点击 "Play Animation" 不会重置计时器，确保计时从第一次点击到点击 "Confirm" 的时间准确。

### 实现位置
- **文件**: `/src/stores/timing.js`
- **修改函数**: `startTiming()`

### 工作原理

1. **第一次点击 Play Animation**
   - 调用 `startTiming(taskId, taskName)`
   - 记录开始时间 `startTime`
   - 在控制台输出: `⏱️ 开始计时: [任务名称]`
   - 返回 `true` 表示成功开始计时

2. **后续点击 Play Animation**
   - 再次调用 `startTiming(taskId, taskName)`
   - 检测到同一任务已经在计时中
   - **不会重置** `startTime`
   - 在控制台输出: `⚠️ 任务 [任务名称] 已在计时中，忽略重复的 Play Animation 点击`
   - 返回 `false` 表示忽略此次点击

3. **点击 Confirm**
   - 调用 `endTiming(answer)`
   - 记录结束时间和答案
   - 计算总时长 = `endTime - startTime`
   - 重置 `currentTask` 为初始状态

### 测试步骤

#### 测试场景 1: 正常流程
1. 进入任何任务页面（如 Scatterplot Tracing 1）
2. 第一次点击 "Play Animation"
3. 打开浏览器控制台，查看输出: `⏱️ 开始计时: Scatterplot + Tracing (1/3)`
4. 选择一个答案
5. 点击 "Confirm"
6. 查看控制台输出的用时

**预期结果**: 计时正常，时长准确

#### 测试场景 2: 重复点击 Play Animation
1. 进入任何任务页面
2. 第一次点击 "Play Animation"
3. 查看控制台: `⏱️ 开始计时: ...` (记录开始时间 T1)
4. 等待 3 秒
5. **再次点击** "Play Animation"
6. 查看控制台: `⚠️ 任务 ... 已在计时中，忽略重复的 Play Animation 点击`
7. 等待 2 秒
8. 选择答案并点击 "Confirm"
9. 查看控制台输出的总用时

**预期结果**: 总用时应该是从 T1 到点击 Confirm 的时间（约 5 秒），而不是从第二次点击到 Confirm 的时间（2 秒）

#### 测试场景 3: 跨页面验证
1. 完成一个任务页面（点击 Play Animation → Confirm）
2. 自动跳转到下一个任务页面
3. 在新页面点击 "Play Animation"
4. 查看控制台，应该看到新任务的计时开始

**预期结果**: 每个页面的计时是独立的，不会相互影响

### 技术细节

```javascript
function startTiming(taskId, taskName) {
  // 检查是否已经在计时中
  if (currentTask.value.startTime && currentTask.value.taskId === taskId) {
    console.log(`⚠️ 任务 ${taskName} 已在计时中，忽略重复的 Play Animation 点击`)
    return false
  }
  
  // 开始新的计时
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
```

### 相关文件
- `/src/stores/timing.js` - 计时状态管理
- `/src/composables/useTaskTimer.js` - 计时功能 Composable
- 所有任务页面使用 `handlePlayAnimation` 和 `handleConfirm`

### 注意事项
- 此功能对所有使用 `useTaskTimer` 的页面自动生效
- 无需修改任何组件代码
- 控制台日志可以帮助验证功能是否正常工作
- 在生产环境中，可以根据需要移除或减少控制台日志输出
