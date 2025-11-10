<template>
  <div class="questionnaire">
    <div class="content">
      <h2 class="section-title">第三部分：分别对三种动画策略的主观评估和排名</h2>
      
      <form class="questionnaire-form" @submit.prevent="handleSubmit">
        <!-- Part 3a: 策略的"功能与认知"评估 -->
        <div class="subsection">
          <h3 class="subsection-title">Part 3a: 策略的"功能与认知"评估</h3>

          <!-- 高亮 (Highlighting) -->
          <div class="strategy-section">
            <h4 class="strategy-title">关于 高亮 (Highlighting) 动画策略</h4>
            
            <!-- 小多图提示区域 -->
            <div class="strategy-reminder">
              <p class="reminder-text">💡 请回忆您在实验中遇到的高亮策略，例如：</p>
              <div class="small-multiples">
                <div class="chart-preview">
                  <iframe 
                    src="/src/All/Questionnaire_Previews/heatmap_highlighting_preview.html"
                    class="preview-iframe heatmap-highlighting-iframe"
                    scrolling="no"
                  ></iframe>
                  <span class="chart-label">热力图 + 高亮</span>
                </div>
                <div class="chart-preview">
                  <iframe 
                    src="/src/All/Questionnaire_Previews/sankey_highlighting_preview.html"
                    class="preview-iframe"
                    scrolling="no"
                  ></iframe>
                  <span class="chart-label">桑基图 + 高亮</span>
                </div>
                <div class="chart-preview">
                  <iframe 
                    src="/src/All/Questionnaire_Previews/sunburst_highlighting_preview.html"
                    class="preview-iframe sunburst-highlighting-iframe"
                    scrolling="no"
                  ></iframe>
                  <span class="chart-label">旭日图 + 高亮</span>
                </div>
              </div>
            </div>

            <div class="question-block" v-for="(item, index) in highlightingQuestions" :key="index">
              <label class="question-label">
                <span class="question-number">{{ index + 1 }}.</span>
                <span>{{ item.label }}</span>
                <span class="required">*</span>
              </label>
              <div class="scale-group horizontal">
                <label v-for="value in 5" :key="value" class="scale-option horizontal">
                  <input
                    v-model="formData.highlighting[item.key]"
                    type="radio"
                    :value="value"
                    required
                  />
                  <span>{{ value }}</span>
                </label>
              </div>
              <div class="scale-labels">
                <span>非常不同意</span>
                <span>非常同意</span>
              </div>
            </div>
          </div>

          <!-- 分步 (Staging) -->
          <div class="strategy-section">
            <h4 class="strategy-title">关于 分步 (Staging) 动画策略</h4>
            
            <!-- 小多图提示区域 -->
            <div class="strategy-reminder">
              <p class="reminder-text">💡 请回忆您在实验中遇到的分步策略，例如：</p>
              <div class="small-multiples">
                <div class="chart-preview">
                  <iframe 
                    src="/src/All/Questionnaire_Previews/scatterplot_staging_preview.html"
                    class="preview-iframe"
                    scrolling="no"
                  ></iframe>
                  <span class="chart-label">散点图 + 分阶段</span>
                </div>
                <div class="chart-preview">
                  <iframe 
                    src="/src/All/Questionnaire_Previews/heatmap_staging_preview.html"
                    class="preview-iframe"
                    scrolling="no"
                  ></iframe>
                  <span class="chart-label">热力图 + 分阶段</span>
                </div>
                <div class="chart-preview">
                  <iframe 
                    src="/src/All/Questionnaire_Previews/circle_packing_staging_2_preview.html"
                    class="preview-iframe circle-packing-staging-iframe"
                    scrolling="no"
                  ></iframe>
                  <span class="chart-label">圆堆积图 + 分阶段</span>
                </div>
              </div>
            </div>

            <div class="question-block" v-for="(item, index) in stagingQuestions" :key="index">
              <label class="question-label">
                <span class="question-number">{{ highlightingQuestions.length + index + 1 }}.</span>
                <span>{{ item.label }}</span>
                <span class="required">*</span>
              </label>
              <div class="scale-group horizontal">
                <label v-for="value in 5" :key="value" class="scale-option horizontal">
                  <input
                    v-model="formData.staging[item.key]"
                    type="radio"
                    :value="value"
                    required
                  />
                  <span>{{ value }}</span>
                </label>
              </div>
              <div class="scale-labels">
                <span>非常不同意</span>
                <span>非常同意</span>
              </div>
            </div>
          </div>

          <!-- 追踪 (Tracing) -->
          <div class="strategy-section">
            <h4 class="strategy-title">关于 追踪 (Tracing) 动画策略</h4>
            
            <!-- 小多图提示区域 -->
            <div class="strategy-reminder">
              <p class="reminder-text">💡 请回忆您在实验中遇到的追踪策略，例如：</p>
              <div class="small-multiples">
                <div class="chart-preview">
                  <iframe 
                    src="/src/All/Questionnaire_Previews/line_graph_tracing_preview.html"
                    class="preview-iframe line-graph-tracing-iframe"
                    scrolling="no"
                  ></iframe>
                  <span class="chart-label">折线图 + 追踪</span>
                </div>
                <div class="chart-preview">
                  <iframe 
                    src="/src/All/Questionnaire_Previews/scatterplot_tracing_preview.html"
                    class="preview-iframe scatterplot-tracing-iframe"
                    scrolling="no"
                  ></iframe>
                  <span class="chart-label">散点图 + 追踪</span>
                </div>
                <div class="chart-preview">
                  <iframe 
                    src="/src/All/Questionnaire_Previews/network_tracing_preview.html"
                    class="preview-iframe network-tracing-iframe"
                    scrolling="no"
                  ></iframe>
                  <span class="chart-label">网络图 + 追踪</span>
                </div>
              </div>
            </div>

            <div class="question-block" v-for="(item, index) in tracingQuestions" :key="index">
              <label class="question-label">
                <span class="question-number">{{ highlightingQuestions.length + stagingQuestions.length + index + 1 }}.</span>
                <span>{{ item.label }}</span>
                <span class="required">*</span>
              </label>
              <div class="scale-group horizontal">
                <label v-for="value in 5" :key="value" class="scale-option horizontal">
                  <input
                    v-model="formData.tracing[item.key]"
                    type="radio"
                    :value="value"
                    required
                  />
                  <span>{{ value }}</span>
                </label>
              </div>
              <div class="scale-labels">
                <span>非常不同意</span>
                <span>非常同意</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Part 3b: 策略的"主观偏好"评估 -->
        <div class="subsection">
          <h3 class="subsection-title">Part 3b: 策略的"主观偏好"评估</h3>
          <p class="section-instruction">
            请根据不同维度对三种动画策略（高亮、分步、追踪）进行排序。
          </p>

          <div class="question-block" v-for="(item, index) in preferenceQuestions" :key="index">
            <label class="question-label">
              <span class="question-number">{{ totalCognitiveQuestions + index + 1 }}.</span>
              <span>{{ item.label }}</span>
              <span class="required">*</span>
            </label>
            <div class="ranking-grid">
              <div class="ranking-row" v-for="rank in 3" :key="rank">
                <span class="rank-label">第 {{ rank }} 名：</span>
                <div class="radio-group-inline">
                  <label class="radio-option">
                    <input
                      :checked="formData.preferences[item.key][rank] === 'highlighting'"
                      @change="handleRankingChange(item.key, rank, 'highlighting')"
                      type="radio"
                      :name="`${item.key}-rank-${rank}`"
                      value="highlighting"
                      required
                    />
                    <span>高亮 (Highlighting)</span>
                  </label>
                  <label class="radio-option">
                    <input
                      :checked="formData.preferences[item.key][rank] === 'staging'"
                      @change="handleRankingChange(item.key, rank, 'staging')"
                      type="radio"
                      :name="`${item.key}-rank-${rank}`"
                      value="staging"
                      required
                    />
                    <span>分步 (Staging)</span>
                  </label>
                  <label class="radio-option">
                    <input
                      :checked="formData.preferences[item.key][rank] === 'tracing'"
                      @change="handleRankingChange(item.key, rank, 'tracing')"
                      type="radio"
                      :name="`${item.key}-rank-${rank}`"
                      value="tracing"
                      required
                    />
                    <span>追踪 (Tracing)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 按钮区域 -->
        <div class="button-group">
          <button type="button" class="nav-button prev-button" @click="goBack">
            上一页
          </button>
          <button type="submit" class="nav-button next-button" :disabled="!isFormComplete">
            下一页
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuestionnaireStore } from '../../../stores/questionnaire'

defineOptions({
  name: 'QuestionnairePart3'
})

const router = useRouter()
const questionnaireStore = useQuestionnaireStore()

const highlightingQuestions = [
  { label: '我觉得 高亮 动画（如闪烁/变色）能有效 引导 我的注意力到即将发生变化的关键区域。', key: 'attention' },
  { label: '我觉得 高亮 动画通过标出重点的方式，降低了 我理解图表变化的思考负担。', key: 'cognitiveLoad' },
  { label: '我觉得 高亮 动画能帮我清晰识别 哪些 元素发生了变化。', key: 'understanding' },
  { label: '我觉得 高亮 动画的动态效果（如闪烁）令人 分心或视觉混乱。', key: 'distraction' }
]

const stagingQuestions = [
  { label: '我觉得 分步 动画（一步步呈现）能有效 引导 我的注意力跟随变化发生的步骤。', key: 'attention' },
  { label: '我觉得 分步 动画通过分解内容的方式，降低了 我理解图表变化的思考负担。', key: 'cognitiveLoad' },
  { label: '我觉得 分步 动画能帮我清晰理解 变化发生的 顺序。', key: 'understanding' },
  { label: '我觉得 分步 动画在播放时的（等待或逐个出现）过程令人 不耐烦或打断思路。', key: 'distraction' }
]

const tracingQuestions = [
  { label: '我觉得 追踪 动画（如轨迹线）能有效 引导 我的注意力去追踪移动元素的路径。', key: 'attention' },
  { label: '我觉得 追踪 动画通过展示关联的方式，降低了 我理解图表变化的思考负担。', key: 'cognitiveLoad' },
  { label: '我觉得 追踪 动画能帮我清晰理解 元素变化 前后的对应关系（例如从哪里移到了哪里）。', key: 'understanding' },
  { label: '我觉得 追踪 动画的视觉效果（如轨迹线）令人 分心或视觉混乱。', key: 'distraction' }
]

const preferenceQuestions = [
  { label: '请根据"对您正确回答问题的帮助程度"对三种策略排序。', key: 'performance' },
  { label: '请根据"理解时的费力程度"对三种策略排序。', key: 'effort' },
  { label: '抛开效率不谈，请根据"您个人的情感喜好程度"对三种策略排序。', key: 'affective' },
  { label: '请根据"视觉效果的美观/愉悦程度"对三种策略排序。', key: 'aesthetic' },
  { label: '请根据"体验过程的有趣程度"对三种策略排序。', key: 'enjoyment' },
  { label: '请根据"吸引并保持您注意力的能力"对三种策略排序。', key: 'attention' }
]

const totalCognitiveQuestions = computed(() => {
  return highlightingQuestions.length + stagingQuestions.length + tracingQuestions.length
})

// 从store恢复数据
const formData = reactive({
  highlighting: { ...questionnaireStore.part3.highlighting },
  staging: { ...questionnaireStore.part3.staging },
  tracing: { ...questionnaireStore.part3.tracing },
  preferences: {
    performance: { ...questionnaireStore.part3.preferences.performance },
    effort: { ...questionnaireStore.part3.preferences.effort },
    affective: { ...questionnaireStore.part3.preferences.affective },
    aesthetic: { ...questionnaireStore.part3.preferences.aesthetic },
    enjoyment: { ...questionnaireStore.part3.preferences.enjoyment },
    attention: { ...questionnaireStore.part3.preferences.attention }
  }
})

const goBack = () => {
  router.push('/questionnaire-part2')
}

// 处理排名选择，如果某个策略已在其他位置被选，自动清除那个位置
const handleRankingChange = (questionKey, currentRank, strategy) => {
  const rankings = formData.preferences[questionKey]
  
  // 检查这个策略是否已经在其他排名位置被选择
  for (let rank = 1; rank <= 3; rank++) {
    if (rank !== currentRank && rankings[rank] === strategy) {
      // 清除那个位置的选择
      rankings[rank] = ''
    }
  }
  
  // 设置当前排名的选择
  rankings[currentRank] = strategy
}

// 检查表单是否完整填写
const isFormComplete = computed(() => {
  // 检查高亮策略问题
  for (const question of highlightingQuestions) {
    if (!formData.highlighting[question.key]) return false
  }
  
  // 检查分步策略问题
  for (const question of stagingQuestions) {
    if (!formData.staging[question.key]) return false
  }
  
  // 检查追踪策略问题
  for (const question of tracingQuestions) {
    if (!formData.tracing[question.key]) return false
  }
  
  // 检查所有排名题是否完整（每道题都要有第1、2、3名）
  for (const question of preferenceQuestions) {
    const rankings = formData.preferences[question.key]
    if (!rankings[1] || !rankings[2] || !rankings[3]) return false
  }
  
  return true
})

const handleSubmit = () => {
  // 保存数据到store
  questionnaireStore.updatePart3(formData)
  console.log('第三部分数据：', formData)
  router.push('/questionnaire-part4')
}
</script>

<style scoped>
.questionnaire {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.content {
  background: #ffffff;
}

.section-title {
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 28px;
  line-height: 36px;
  color: #1f1f1f;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid #eee;
}

.subsection {
  margin-bottom: 50px;
}

.subsection-title {
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 22px;
  line-height: 30px;
  color: #1f1f1f;
  margin-bottom: 20px;
}

.strategy-section {
  margin-bottom: 40px;
}

.strategy-title {
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: #1f1f1f;
  margin-bottom: 20px;
}

.strategy-reminder {
  background: transparent;
  border: none;
  padding: 0;
  margin-bottom: 25px;
}

.reminder-text {
  font-family: Roboto, sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: #555;
  margin: 0 0 15px 0;
  font-weight: 500;
}

.small-multiples {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.chart-preview {
  display: grid;
  grid-template-rows: 160px auto;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
  isolation: isolate;
}

.chart-preview:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.preview-iframe {
  width: 200%;
  height: 320px;
  border: none;
  pointer-events: none;
  background: white;
  display: block;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.5);
  grid-row: 1;
  z-index: 1;
}

/* 高亮部分 - 调整热力图位置和容器（往上移隐藏顶部数字） */
.strategy-section:nth-child(1) .chart-preview:nth-child(1) {
  grid-template-rows: 200px auto;
}

.heatmap-highlighting-iframe {
  top: 46% !important;
  transform: translate(calc(-50% + 2px), calc(-50% - 7px)) scale(0.6) !important;
}

/* 高亮部分 - 特别调整桑基图的位置 */
.strategy-section:nth-child(1) .chart-preview:nth-child(2) .preview-iframe {
  height: 280px;
  top: 55%;
  transform: translate(-50%, -50%) scale(0.55);
}

/* 高亮部分 - 缩小旭日图 */
.sunburst-highlighting-iframe {
  width: 200% !important;
  height: 320px !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) scale(0.58) !important;
}

/* 分步部分 - 调整散点图 */
.strategy-section:nth-child(2) .chart-preview:nth-child(1) .preview-iframe {
  height: 320px;
  top: 50%;
  transform: translate(-50%, -50%) scale(0.65);
}

/* 分步部分 - 圆堆积图 */
.circle-packing-staging-iframe {
  width: 200% !important;
  height: 500px !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) scale(0.30) !important;
}

/* 追踪部分 - 折线图 */
.line-graph-tracing-iframe {
  width: 200% !important;
  height: 320px !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) scale(0.40) !important;
}

/* 追踪部分 - 散点图 */
.scatterplot-tracing-iframe {
  width: 200% !important;
  height: 320px !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, calc(-50% + 15px)) scale(0.75) !important;
}

/* 追踪部分 - 网络图 */
.network-tracing-iframe {
  width: 200% !important;
  height: 400px !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(calc(-50% + 40px), -50%) scale(0.672) !important;
}

.chart-label {
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #555;
  padding: 8px;
  text-align: center;
  width: 100%;
  background: #f8f9fa;
  border-top: 1px solid #e0e0e0;
  grid-row: 2;
  position: relative;
  z-index: 2;
}

.section-instruction {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #545454;
  margin-bottom: 30px;
  font-style: italic;
}

.questionnaire-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.question-block {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 40px;
}

.question-label {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: #1f1f1f;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.question-number {
  font-weight: 600;
  color: #1f1f1f;
  flex-shrink: 0;
}

.required {
  color: #e74c3c;
  margin-left: 4px;
}

.scale-group.horizontal {
  display: flex;
  flex-direction: row;
  gap: 70px;
  padding-left: 28px;
  align-items: center;
}

.scale-option.horizontal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 70px;
  cursor: pointer;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  line-height: 22px;
  color: #1f1f1f;
  transition: color 0.2s ease;
}

.scale-option:hover {
  color: #3498db;
}

.scale-option input[type='radio'] {
  cursor: pointer;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.scale-labels {
  display: flex;
  justify-content: space-between;
  padding-left: 28px;
  padding-right: 0;
  font-size: 14px;
  color: #666;
  margin-top: -8px;
  margin-bottom: 0;
  max-width: calc(5 * 70px + 4 * 70px + 28px);
}

.ranking-grid {
  padding-left: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.ranking-row {
  display: flex;
  align-items: center;
  gap: 15px;
}

.rank-label {
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #1f1f1f;
  min-width: 80px;
}

.radio-group-inline {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  line-height: 22px;
  color: #1f1f1f;
  transition: color 0.2s ease;
}

.radio-option:hover {
  color: #3498db;
}

.radio-option input[type='radio'] {
  cursor: pointer;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.nav-button {
  padding: 12px 40px;
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.prev-button {
  background: #3498db;
}

.prev-button:hover {
  background: #2980b9;
}

.next-button {
  background: #3498db;
}

.next-button:hover {
  background: #2980b9;
}

.nav-button:active {
  transform: translateY(1px);
}

.nav-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}

.nav-button:disabled:hover {
  background: #ccc;
  transform: none;
}
</style>
