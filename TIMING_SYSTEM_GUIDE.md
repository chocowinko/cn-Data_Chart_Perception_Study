# ⏱️ 任务计时系统使用指南

## 📋 系统概述

该计时系统可以自动记录每个任务从点击 "Play Animation" 到点击 "Confirm" 的完整用时，并保存用户的答案。

## 🏗️ 系统架构

### 核心文件

```
src/
├── stores/
│   └── timing.js              # Pinia 状态管理 store
├── composables/
│   └── useTaskTimer.js        # 计时工具函数
└── components/pages/results/
    └── TimingResults.vue      # 结果查看页面
```

## 🚀 如何在任务页面中使用

### 示例：在任何任务页面中集成计时功能

```vue
<template>
  <div class="task-page">
    <!-- Play Animation 按钮 -->
    <button @click="handlePlayAnimation(playAnimation)">
      Play Animation
    </button>

    <!-- 任务内容 -->
    <div class="task-content">
      <!-- 你的任务内容 -->
    </div>

    <!-- Confirm 按钮 -->
    <button 
      @click="handleConfirm(null, selectedAnswer, '/next-page')"
      :disabled="!selectedAnswer"
    >
      Confirm
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskTimer } from '@/composables/useTaskTimer'

const selectedAnswer = ref('')

// 初始化计时器
const { handlePlayAnimation, handleConfirm } = useTaskTimer(
  'unique-task-id',        // 任务的唯一标识符
  'Task Name'              // 任务的显示名称
)

// 你原来的 playAnimation 函数
function playAnimation() {
  // 播放动画的逻辑
  console.log('Animation playing...')
}
</script>
```

## 📝 API 说明

### useTaskTimer(taskId, taskName)

**参数：**
- `taskId` (string): 任务的唯一标识符，用于区分不同任务
- `taskName` (string): 任务的显示名称，用于结果展示

**返回值：**
```javascript
{
  handlePlayAnimation: (originalFunction) => void,
  handleConfirm: (originalFunction, answer, nextRoute) => void
}
```

### handlePlayAnimation(originalFunction)

在 Play Animation 按钮点击时调用，自动开始计时。

**参数：**
- `originalFunction`: 你原来的动画播放函数

**使用示例：**
```javascript
@click="handlePlayAnimation(playAnimation)"
```

### handleConfirm(originalFunction, answer, nextRoute)

在 Confirm 按钮点击时调用，自动结束计时并记录答案。

**参数：**
- `originalFunction`: 原始的确认函数（可选，传 null）
- `answer`: 用户的答案（任意类型）
- `nextRoute`: 下一个页面的路由路径

**使用示例：**
```javascript
@click="handleConfirm(null, selectedAnswer, '/next-page')"
```

## 🎯 完整集成步骤

### 步骤 1: 导入 composable

```javascript
import { useTaskTimer } from '@/composables/useTaskTimer'
```

### 步骤 2: 初始化计时器

```javascript
const { handlePlayAnimation, handleConfirm } = useTaskTimer(
  'line-graph-highlighting-1',           // 唯一任务ID
  'Line Graph + Highlighting (1/3)'      // 任务名称
)
```

### 步骤 3: 修改 Play Animation 按钮

**原来：**
```vue
<button @click="playAnimation">Play Animation</button>
```

**修改为：**
```vue
<button @click="handlePlayAnimation(playAnimation)">Play Animation</button>
```

### 步骤 4: 修改 Confirm 按钮

**原来：**
```vue
<button @click="confirmAnswer">Confirm</button>
```

**修改为：**
```vue
<button @click="handleConfirm(null, selectedAnswer, '/next-route')">
  Confirm
</button>
```

## 📊 查看结果

访问结果页面：`/results` 或 `http://localhost:5173/results`

结果页面提供：
- ✅ 统计概览（总任务数、总用时、平均用时）
- ✅ 每个任务的详细信息（用时、答案、开始/结束时间）
- ✅ 导出 JSON 数据功能
- ✅ 清除所有数据功能

## 🔍 数据结构

### 单个任务记录

```javascript
{
  taskId: "line-graph-highlighting-1",
  taskName: "Line Graph + Highlighting (1/3)",
  startTime: 1698765432000,        // 时间戳（毫秒）
  endTime: 1698765445000,          // 时间戳（毫秒）
  duration: 13000,                 // 用时（毫秒）
  answer: "A"                      // 用户答案
}
```

### 导出的 JSON 格式

```json
{
  "exportTime": "2025-10-22T09:43:59.000Z",
  "statistics": {
    "totalTasks": 5,
    "totalTime": 65000,
    "averageTime": 13000,
    "records": [...]
  },
  "records": [
    {
      "taskId": "line-graph-highlighting-1",
      "taskName": "Line Graph + Highlighting (1/3)",
      "startTime": 1698765432000,
      "endTime": 1698765445000,
      "duration": 13000,
      "answer": "A",
      "startTimeFormatted": "2025-10-22T09:43:52.000Z",
      "endTimeFormatted": "2025-10-22T09:44:05.000Z",
      "durationSeconds": "13.00"
    }
  ]
}
```

## 🛠️ Store API

如果需要直接使用 store：

```javascript
import { useTimingStore } from '@/stores/timing'

const timingStore = useTimingStore()

// 手动开始计时
timingStore.startTiming('task-id', 'Task Name')

// 手动结束计时
timingStore.endTiming('answer')

// 获取所有记录
const records = timingStore.getAllRecords()

// 获取统计信息
const stats = timingStore.getStatistics()

// 导出数据
const jsonData = timingStore.exportData()

// 清除所有记录
timingStore.clearRecords()
```

## 💡 最佳实践

### 1. 任务 ID 命名规范

推荐使用 kebab-case 格式：
```javascript
'line-graph-highlighting-1'
'heatmap-staging-2'
'scatterplot-tracing-3'
```

### 2. 任务名称

使用清晰、描述性的名称：
```javascript
'Line Graph + Highlighting (1/3)'
'Heatmap Staging Task (2/3)'
```

### 3. 答案格式

答案可以是任意类型：
```javascript
// 单选答案
handleConfirm(null, 'A', '/next')

// 多选答案
handleConfirm(null, ['A', 'B'], '/next')

// 对象答案
handleConfirm(null, { option: 'A', confidence: 5 }, '/next')
```

## 🐛 调试

系统会在控制台输出计时信息：

```
⏱️ 开始计时: Line Graph + Highlighting (1/3) Tue Oct 22 2025 17:43:52
⏱️ 结束计时: Line Graph + Highlighting (1/3)
⌚ 用时: 13.45 秒
📝 答案: A
```

## 📌 注意事项

1. ✅ **必须先点击 Play Animation** - 如果直接点击 Confirm，计时不会记录
2. ✅ **答案可选** - 如果任务没有答案，传 `null` 即可
3. ✅ **数据持久化** - 当前数据保存在内存中，刷新页面会丢失。如需持久化，可以添加 localStorage 支持
4. ✅ **路由跳转** - handleConfirm 会自动处理路由跳转，无需额外调用 router.push

## 🎨 示例页面

已集成计时功能的示例页面：
- `/line-graph-highlighting-1` - Line Graph Highlighting Task 1

你可以参考这个页面的实现方式。

## 📦 依赖

- Pinia (^2.x) - 状态管理
- Vue Router (^4.x) - 路由管理

## 🔄 更新日志

- **v1.0.0** (2025-10-22)
  - ✅ 基础计时功能
  - ✅ 答案记录功能
  - ✅ 结果查看页面
  - ✅ 数据导出功能
  - ✅ 统计分析功能
