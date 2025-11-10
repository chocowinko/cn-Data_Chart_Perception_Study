<template>
  <div v-if="showDevMenu" class="dev-menu-overlay" @click="closeMenu">
    <div class="dev-menu" @click.stop>
      <div class="dev-menu-header">
        <h3>开发工具 - 图表选择</h3>
        <button @click="closeMenu" class="close-btn">×</button>
      </div>

      <div class="search-section">
        <input v-model="searchQuery" type="text" placeholder="搜索图表..." class="search-input" />
        <div class="filter-buttons">
          <button
            v-for="filter in filters"
            :key="filter.key"
            @click="toggleFilter(filter.key)"
            :class="['filter-btn', { active: activeFilters.includes(filter.key) }]"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <div class="dev-menu-content">
        <div class="chart-category">
          <h4>折线图 (Line Graph)</h4>
          <div class="chart-grid">
            <button @click="navigateTo('/line-graph-task')" class="chart-btn">任务介绍</button>
            <button @click="navigateTo('/line-graph-highlighting-1')" class="chart-btn">
              Highlighting 1
            </button>
            <button @click="navigateTo('/line-graph-highlighting-2')" class="chart-btn">
              Highlighting 2
            </button>
            <button @click="navigateTo('/line-graph-highlighting-3')" class="chart-btn">
              Highlighting 3
            </button>
            <button @click="navigateTo('/line-graph-staging-1')" class="chart-btn">
              Staging 1
            </button>
            <button @click="navigateTo('/line-graph-staging-2')" class="chart-btn">
              Staging 2
            </button>
            <button @click="navigateTo('/line-graph-staging-3')" class="chart-btn">
              Staging 3
            </button>
            <button @click="navigateTo('/line-graph-tracing-1')" class="chart-btn">
              Tracing 1
            </button>
            <button @click="navigateTo('/line-graph-tracing-2')" class="chart-btn">
              Tracing 2
            </button>
            <button @click="navigateTo('/line-graph-tracing-3')" class="chart-btn">
              Tracing 3
            </button>
          </div>
        </div>

        <div class="chart-category">
          <h4>散点图 (Scatterplot)</h4>
          <div class="chart-grid">
            <button @click="navigateTo('/scatterplot-task')" class="chart-btn">任务介绍</button>
            <button @click="navigateTo('/scatterplot-highlighting-1')" class="chart-btn">
              Highlighting 1
            </button>
            <button @click="navigateTo('/scatterplot-highlighting-2')" class="chart-btn">
              Highlighting 2
            </button>
            <button @click="navigateTo('/scatterplot-highlighting-3')" class="chart-btn">
              Highlighting 3
            </button>
            <button @click="navigateTo('/scatterplot-staging-1')" class="chart-btn">
              Staging 1
            </button>
            <button @click="navigateTo('/scatterplot-staging-2')" class="chart-btn">
              Staging 2
            </button>
            <button @click="navigateTo('/scatterplot-staging-3')" class="chart-btn">
              Staging 3
            </button>
            <button @click="navigateTo('/scatterplot-tracing-1')" class="chart-btn">
              Tracing 1
            </button>
            <button @click="navigateTo('/scatterplot-tracing-2')" class="chart-btn">
              Tracing 2
            </button>
            <button @click="navigateTo('/scatterplot-tracing-3')" class="chart-btn">
              Tracing 3
            </button>
          </div>
        </div>

        <div class="chart-category">
          <h4>热力图 (Heatmap)</h4>
          <div class="chart-grid">
            <button @click="navigateTo('/heatmap-intro')" class="chart-btn">任务介绍</button>
            <button @click="navigateTo('/heatmap-highlighting-1')" class="chart-btn">
              Highlighting 1
            </button>
            <button @click="navigateTo('/heatmap-highlighting-2')" class="chart-btn">
              Highlighting 2
            </button>
            <button @click="navigateTo('/heatmap-highlighting-3')" class="chart-btn">
              Highlighting 3
            </button>
            <button @click="navigateTo('/heatmap-staging-1')" class="chart-btn">Staging 1</button>
            <button @click="navigateTo('/heatmap-staging-2')" class="chart-btn">Staging 2</button>
            <button @click="navigateTo('/heatmap-staging-3')" class="chart-btn">Staging 3</button>
            <button @click="navigateTo('/heatmap-tracing-1')" class="chart-btn">Tracing 1</button>
            <button @click="navigateTo('/heatmap-tracing-2')" class="chart-btn">Tracing 2</button>
            <button @click="navigateTo('/heatmap-tracing-3')" class="chart-btn">Tracing 3</button>
          </div>
        </div>

        <div class="chart-category">
          <h4>OD图 (Destination Map)</h4>
          <div class="chart-grid">
            <button @click="navigateTo('/destination-map-intro')" class="chart-btn">
              任务介绍
            </button>
            <button @click="navigateTo('/destination-map-highlighting-1')" class="chart-btn">
              Highlighting 1
            </button>
            <button @click="navigateTo('/destination-map-highlighting-2')" class="chart-btn">
              Highlighting 2
            </button>
            <button @click="navigateTo('/destination-map-highlighting-3')" class="chart-btn">
              Highlighting 3
            </button>
            <button @click="navigateTo('/destination-map-staging-1')" class="chart-btn">
              Staging 1
            </button>
            <button @click="navigateTo('/destination-map-staging-2')" class="chart-btn">
              Staging 2
            </button>
            <button @click="navigateTo('/destination-map-staging-3')" class="chart-btn">
              Staging 3
            </button>
            <button @click="navigateTo('/destination-map-tracing-1')" class="chart-btn">
              Tracing 1
            </button>
            <button @click="navigateTo('/destination-map-tracing-2')" class="chart-btn">
              Tracing 2
            </button>
            <button @click="navigateTo('/destination-map-tracing-3')" class="chart-btn">
              Tracing 3
            </button>
          </div>
        </div>

        <div class="chart-category">
          <h4>桑基图 (Sankey Diagram)</h4>
          <div class="chart-grid">
            <button @click="navigateTo('/sankey-diagram-intro')" class="chart-btn">任务介绍</button>
            <button @click="navigateTo('/sankey-diagram-highlighting-1')" class="chart-btn">
              Highlighting 1
            </button>
            <button @click="navigateTo('/sankey-diagram-highlighting-2')" class="chart-btn">
              Highlighting 2
            </button>
            <button @click="navigateTo('/sankey-diagram-highlighting-3')" class="chart-btn">
              Highlighting 3
            </button>
            <button @click="navigateTo('/sankey-diagram-staging-1')" class="chart-btn">
              Staging 1
            </button>
            <button @click="navigateTo('/sankey-diagram-staging-2')" class="chart-btn">
              Staging 2
            </button>
            <button @click="navigateTo('/sankey-diagram-staging-3')" class="chart-btn">
              Staging 3
            </button>
            <button @click="navigateTo('/sankey-diagram-tracing-1')" class="chart-btn">
              Tracing 1
            </button>
            <button @click="navigateTo('/sankey-diagram-tracing-2')" class="chart-btn">
              Tracing 2
            </button>
            <button @click="navigateTo('/sankey-diagram-tracing-3')" class="chart-btn">
              Tracing 3
            </button>
          </div>
        </div>

        <div class="chart-category">
          <h4>网络图 (Network Diagram)</h4>
          <div class="chart-grid">
            <button @click="navigateTo('/network-diagram-intro')" class="chart-btn">
              任务介绍
            </button>
            <button @click="navigateTo('/network-diagram-highlighting-1')" class="chart-btn">
              Highlighting 1
            </button>
            <button @click="navigateTo('/network-diagram-highlighting-2')" class="chart-btn">
              Highlighting 2
            </button>
            <button @click="navigateTo('/network-diagram-highlighting-3')" class="chart-btn">
              Highlighting 3
            </button>
            <button @click="navigateTo('/network-diagram-staging-1')" class="chart-btn">
              Staging 1
            </button>
            <button @click="navigateTo('/network-diagram-staging-2')" class="chart-btn">
              Staging 2
            </button>
            <button @click="navigateTo('/network-diagram-staging-3')" class="chart-btn">
              Staging 3
            </button>
            <button @click="navigateTo('/network-diagram-tracing-1')" class="chart-btn">
              Tracing 1
            </button>
            <button @click="navigateTo('/network-diagram-tracing-2')" class="chart-btn">
              Tracing 2
            </button>
            <button @click="navigateTo('/network-diagram-tracing-3')" class="chart-btn">
              Tracing 3
            </button>
          </div>
        </div>

        <div class="chart-category">
          <h4>圆形填充图 (Circle Packing)</h4>
          <div class="chart-grid">
            <button @click="navigateTo('/circle-packing-intro')" class="chart-btn">任务介绍</button>
            <button @click="navigateTo('/circle-packing-highlighting-1')" class="chart-btn">
              Highlighting 1
            </button>
            <button @click="navigateTo('/circle-packing-highlighting-2')" class="chart-btn">
              Highlighting 2
            </button>
            <button @click="navigateTo('/circle-packing-highlighting-3')" class="chart-btn">
              Highlighting 3
            </button>
            <button @click="navigateTo('/circle-packing-staging-1')" class="chart-btn">
              Staging 1
            </button>
            <button @click="navigateTo('/circle-packing-staging-2')" class="chart-btn">
              Staging 2
            </button>
            <button @click="navigateTo('/circle-packing-staging-3')" class="chart-btn">
              Staging 3
            </button>
          </div>
        </div>

        <div class="chart-category">
          <h4>树状图 (Treemap)</h4>
          <div class="chart-grid">
            <button @click="navigateTo('/treemap-intro')" class="chart-btn">任务介绍</button>
            <button @click="navigateTo('/treemap-highlighting-1')" class="chart-btn">
              Highlighting 1
            </button>
            <button @click="navigateTo('/treemap-highlighting-2')" class="chart-btn">
              Highlighting 2
            </button>
            <button @click="navigateTo('/treemap-highlighting-3')" class="chart-btn">
              Highlighting 3
            </button>
            <button @click="navigateTo('/treemap-staging-1')" class="chart-btn">Staging 1</button>
            <button @click="navigateTo('/treemap-staging-2')" class="chart-btn">Staging 2</button>
            <button @click="navigateTo('/treemap-staging-3')" class="chart-btn">Staging 3</button>
          </div>
        </div>

        <div class="chart-category">
          <h4>旭日图 (Sunburst)</h4>
          <div class="chart-grid">
            <button @click="navigateTo('/sunburst-intro')" class="chart-btn">任务介绍</button>
            <button @click="navigateTo('/sunburst-highlighting-1')" class="chart-btn">
              Highlighting 1
            </button>
            <button @click="navigateTo('/sunburst-highlighting-2')" class="chart-btn">
              Highlighting 2
            </button>
            <button @click="navigateTo('/sunburst-highlighting-3')" class="chart-btn">
              Highlighting 3
            </button>
            <button @click="navigateTo('/sunburst-staging-1')" class="chart-btn">Staging 1</button>
            <button @click="navigateTo('/sunburst-staging-2')" class="chart-btn">Staging 2</button>
            <button @click="navigateTo('/sunburst-staging-3')" class="chart-btn">Staging 3</button>
          </div>
        </div>

        <div class="chart-category">
          <h4>实验完成页面</h4>
          <div class="chart-grid">
            <button @click="navigateTo('/experiment-complete')" class="chart-btn">
              实验完成
            </button>
          </div>
        </div>

        <div class="chart-category">
          <h4>📝 问卷调查</h4>
          <div class="chart-grid">
            <button @click="navigateTo('/questionnaire')" class="chart-btn">
              第一部分：背景经验
            </button>
            <button @click="navigateTo('/questionnaire-part2')" class="chart-btn">
              第二部分：体验感受
            </button>
            <button @click="navigateTo('/questionnaire-part3')" class="chart-btn">
              第三部分：策略评估
            </button>
            <button @click="navigateTo('/questionnaire-part4')" class="chart-btn">
              第四部分：开放反馈
            </button>
          </div>
          <div class="chart-grid" style="margin-top: 10px;">
            <button @click="exportQuestionnaireData" class="chart-btn results-btn">
              💾 导出问卷数据
            </button>
            <button @click="clearQuestionnaireData" class="chart-btn" style="background: #e74c3c;">
              🗑️ 清除问卷数据
            </button>
          </div>
        </div>

        <div class="chart-category results-section">
          <h4>📊 计时结果</h4>
          <div class="chart-grid">
            <button @click="navigateTo('/results')" class="chart-btn results-btn">
              📈 查看计时结果
            </button>
          </div>
        </div>

        <div class="dev-menu-footer">
          <button @click="toggleDevMode" class="toggle-btn">
            {{ devMode ? '关闭开发模式' : '开启开发模式' }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- 开发模式切换按钮 -->
  <button
    v-if="!showDevMenu"
    @click="toggleDevMenu"
    class="dev-toggle-btn"
    :class="{ 'dev-mode-active': devMode }"
  >
    🔧
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuestionnaireStore } from '../stores/questionnaire'

const router = useRouter()
const questionnaireStore = useQuestionnaireStore()
const showDevMenu = ref(false)
const devMode = ref(false)
const searchQuery = ref('')
const activeFilters = ref([])

const filters = [
  { key: 'highlighting', label: 'Highlighting' },
  { key: 'staging', label: 'Staging' },
  { key: 'tracing', label: 'Tracing' },
  { key: 'basic', label: '基础图表' },
]

// 检查是否在开发模式
onMounted(() => {
  // 检查localStorage中是否保存了开发模式状态
  const savedDevMode = localStorage.getItem('devMode')
  if (savedDevMode === 'true') {
    devMode.value = true
  }

  // 监听键盘快捷键 Ctrl+Shift+D 来切换开发菜单
  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.shiftKey && event.key === 'D') {
      event.preventDefault()
      toggleDevMenu()
    }
  }

  window.addEventListener('keydown', handleKeyDown)

  // 清理事件监听器
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })
})

const toggleDevMenu = () => {
  showDevMenu.value = !showDevMenu.value
}

const closeMenu = () => {
  showDevMenu.value = false
}

const navigateTo = (path) => {
  router.push(path)
  closeMenu()
}

const toggleDevMode = () => {
  devMode.value = !devMode.value
  localStorage.setItem('devMode', devMode.value.toString())
  closeMenu()
}

const exportQuestionnaireData = () => {
  try {
    questionnaireStore.downloadJSON()
    closeMenu()
  } catch (error) {
    console.error('导出问卷数据失败:', error)
    alert('导出失败，请检查控制台')
  }
}

const clearQuestionnaireData = () => {
  if (confirm('确定要清除所有问卷数据吗？此操作不可恢复！')) {
    questionnaireStore.clearAllData()
    alert('问卷数据已清除')
    closeMenu()
  }
}

const toggleFilter = (filterKey) => {
  const index = activeFilters.value.indexOf(filterKey)
  if (index > -1) {
    activeFilters.value.splice(index, 1)
  } else {
    activeFilters.value.push(filterKey)
  }
}
</script>

<style scoped>
.dev-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dev-menu {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden;
  font-family: Arial, sans-serif;
}

.dev-menu-header {
  background: #1f1f1f;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dev-menu-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.search-section {
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  background: #f8f9fa;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  margin-bottom: 15px;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #1f1f1f;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-btn {
  padding: 6px 12px;
  border: 2px solid #e9ecef;
  border-radius: 20px;
  background: white;
  color: #6c757d;
  font-family: Arial, sans-serif;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  border-color: #1f1f1f;
  color: #1f1f1f;
}

.filter-btn.active {
  background: #1f1f1f;
  color: white;
  border-color: #1f1f1f;
}

.dev-menu-content {
  padding: 20px;
  max-height: 50vh;
  overflow-y: auto;
}

.chart-category h4 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 8px;
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
}

.chart-btn {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 12px 16px;
  cursor: pointer;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #495057;
  transition: all 0.2s ease;
  text-align: center;
}

.chart-btn:hover {
  background: #e9ecef;
  border-color: #1f1f1f;
  color: #1f1f1f;
  transform: translateY(-1px);
}

.chart-btn:active {
  transform: translateY(0);
}

.dev-menu-footer {
  border-top: 1px solid #e0e0e0;
  padding-top: 15px;
  text-align: center;
}

.toggle-btn {
  background: #1f1f1f;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.toggle-btn:hover {
  background: #333;
}

.dev-toggle-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: #f8f9fa;
  color: #6c757d;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dev-toggle-btn:hover {
  background: #e9ecef;
  transform: scale(1.05);
}

.dev-toggle-btn.dev-mode-active {
  background: #1f1f1f;
  color: white;
}

/* 计时结果区域样式 */
.results-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.results-section h4 {
  color: white;
  border-bottom-color: rgba(255, 255, 255, 0.3);
  margin-bottom: 15px;
}

.results-btn {
  background: white;
  border: 2px solid white;
  color: #667eea;
  font-weight: 600;
  font-size: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.results-btn:hover {
  background: #f8f9fa;
  border-color: white;
  color: #764ba2;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dev-menu {
    width: 95%;
    margin: 20px;
  }

  .chart-grid {
    grid-template-columns: 1fr;
  }

  .dev-toggle-btn {
    width: 45px;
    height: 45px;
    font-size: 18px;
  }
}
</style>
