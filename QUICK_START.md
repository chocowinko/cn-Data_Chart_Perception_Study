# 🚀 计时系统快速开始

## ✅ 已完成的工作

### 1. 核心系统文件
- ✅ `src/stores/timing.js` - Pinia 状态管理，存储所有计时数据
- ✅ `src/composables/useTaskTimer.js` - 简化的计时工具函数
- ✅ `src/components/pages/results/TimingResults.vue` - 结果查看页面
- ✅ `src/main.js` - 已配置 Pinia
- ✅ `src/router/index.js` - 已添加 `/results` 路由

### 2. 示例集成
- ✅ `LineGraphHighlighting1.vue` 已集成计时功能作为示例

## 🎯 如何使用

### 测试示例页面

1. **访问示例任务页面**：
   ```
   http://localhost:5174/line-graph-highlighting-1
   ```

2. **测试流程**：
   - 点击 "Play Animation" 按钮 → 计时开始 ⏱️
   - 选择一个答案
   - 点击 "Confirm" 按钮 → 计时结束，跳转到下一页

3. **查看结果**：
   ```
   http://localhost:5174/results
   ```

### 在其他任务页面中集成

只需 **3 步**：

#### 步骤 1: 导入并初始化
```vue
<script setup>
import { useTaskTimer } from '@/composables/useTaskTimer'

const { handlePlayAnimation, handleConfirm } = useTaskTimer(
  'your-task-id',      // 任务唯一ID
  'Your Task Name'     // 任务显示名称
)
</script>
```

#### 步骤 2: 修改 Play Animation 按钮
```vue
<!-- 原来 -->
<button @click="playAnimation">Play Animation</button>

<!-- 改为 -->
<button @click="handlePlayAnimation(playAnimation)">Play Animation</button>
```

#### 步骤 3: 修改 Confirm 按钮
```vue
<!-- 原来 -->
<button @click="confirmAnswer">Confirm</button>

<!-- 改为 -->
<button @click="handleConfirm(null, selectedAnswer, '/next-route')">
  Confirm
</button>
```

## 📊 查看数据

访问 `/results` 页面可以看到：
- 📈 统计概览（总任务数、总用时、平均用时）
- 📝 每个任务的详细记录
- 💾 导出 JSON 数据
- 🗑️ 清除数据

## 🔍 控制台调试

打开浏览器控制台，可以看到：
```
⏱️ 开始计时: Line Graph + Highlighting (1/3)
⏱️ 结束计时: Line Graph + Highlighting (1/3)
⌚ 用时: 13.45 秒
📝 答案: A
```

## 📦 需要集成的页面列表

你有以下任务页面需要集成计时功能：

### Line Graph
- ✅ LineGraphHighlighting1.vue （已完成示例）
- ⏳ LineGraphHighlighting2.vue
- ⏳ LineGraphHighlighting3.vue
- ⏳ LineGraphStaging1.vue
- ⏳ LineGraphStaging2.vue
- ⏳ LineGraphStaging3.vue
- ⏳ LineGraphTracing1.vue
- ⏳ LineGraphTracing2.vue
- ⏳ LineGraphTracing3.vue

### Heatmap
- ⏳ HeatmapHighlighting1.vue
- ⏳ HeatmapHighlighting2.vue
- ⏳ HeatmapHighlighting3.vue
- ⏳ HeatmapStaging1.vue
- ⏳ HeatmapStaging2.vue
- ⏳ HeatmapStaging3.vue
- ⏳ HeatmapTracing1.vue
- ⏳ HeatmapTracing2.vue
- ⏳ HeatmapTracing3.vue

### Scatterplot
- ⏳ ScatterplotHighlighting1.vue
- ⏳ ScatterplotHighlighting2.vue
- ⏳ ScatterplotHighlighting3.vue
- ⏳ ScatterplotStaging1.vue
- ⏳ ScatterplotStaging2.vue
- ⏳ ScatterplotStaging3.vue
- ⏳ ScatterplotTracing1.vue
- ⏳ ScatterplotTracing2.vue
- ⏳ ScatterplotTracing3.vue

### 其他图表类型
- ⏳ DestinationMap (9个任务)
- ⏳ SankeyDiagram (9个任务)
- ⏳ NetworkDiagram (9个任务)
- ⏳ CirclePacking (6个任务)
- ⏳ Treemap (6个任务)
- ⏳ Sunburst (6个任务)

## 💡 批量集成建议

如果你想一次性集成所有页面，可以使用查找替换：

### 查找模式 1:
```vue
@click="playAnimation"
```
替换为:
```vue
@click="handlePlayAnimation(playAnimation)"
```

### 查找模式 2:
```vue
@click="confirmAnswer"
```
替换为:
```vue
@click="handleConfirm(null, selectedAnswer, '/next-route-path')"
```

然后在每个文件的 `<script setup>` 中添加：
```javascript
import { useTaskTimer } from '@/composables/useTaskTimer'

const { handlePlayAnimation, handleConfirm } = useTaskTimer(
  'task-unique-id',
  'Task Display Name'
)
```

## 🎓 下一步

1. **测试示例页面** - 访问 `/line-graph-highlighting-1` 测试计时功能
2. **查看结果页面** - 访问 `/results` 查看记录的数据
3. **集成其他页面** - 参考示例页面，逐步集成其他任务页面
4. **导出数据分析** - 在结果页面导出 JSON 数据进行分析

## 📖 详细文档

查看 `TIMING_SYSTEM_GUIDE.md` 了解完整的 API 文档和高级用法。

---

**开发服务器**: http://localhost:5174
**结果页面**: http://localhost:5174/results
**示例任务**: http://localhost:5174/line-graph-highlighting-1
