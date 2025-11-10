<template>
  <div class="questionnaire">
    <div class="content">
      <h2 class="section-title">第二部分：整体实验的体验感受</h2>
      
      <form class="questionnaire-form" @submit.prevent="handleSubmit">
        <!-- A. 整体情绪 (PANAS) -->
        <div class="subsection">
          <h3 class="subsection-title">A. 整体情绪</h3>
          <p class="section-instruction">
            请回想您在整个实验过程中的感受，并评价您体验到以下每种情绪的程度？
          </p>

          <!-- 情绪量表问题 -->
          <div class="question-block" v-for="(emotion, index) in emotions" :key="index">
            <label class="question-label">
              <span class="question-number">{{ index + 1 }}.</span>
              <span>{{ emotion.label }}</span>
              <span class="emotion-type">【{{ emotion.type }}】</span>
              <span class="required">*</span>
            </label>
            <div class="scale-group horizontal">
              <label v-for="value in 5" :key="value" class="scale-option horizontal">
                <input
                  v-model="formData.emotions[emotion.key]"
                  type="radio"
                  :value="value"
                  required
                />
                <span>{{ value }}</span>
              </label>
            </div>
            <div class="scale-labels">
              <span>完全没有</span>
              <span>非常强烈</span>
            </div>
          </div>
        </div>

        <!-- B. 整体负荷与可用性 -->
        <div class="subsection">
          <h3 class="subsection-title">B. 整体负荷与可用性</h3>

          <div class="question-block" v-for="(item, index) in loadQuestions" :key="index">
            <label class="question-label">
              <span class="question-number">{{ emotions.length + index + 1 }}.</span>
              <span>{{ item.label }}</span>
              <span class="required">*</span>
            </label>
            <div class="scale-group horizontal">
              <label v-for="value in 5" :key="value" class="scale-option horizontal">
                <input
                  v-model="formData.load[item.key]"
                  type="radio"
                  :value="value"
                  required
                />
                <span>{{ value }}</span>
              </label>
            </div>
            <div class="scale-labels">
              <span>{{ item.leftLabel }}</span>
              <span>{{ item.rightLabel }}</span>
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
  name: 'QuestionnairePart2'
})

const router = useRouter()
const questionnaireStore = useQuestionnaireStore()

const emotions = [
  { label: '感兴趣的', key: 'interested', type: '情绪-积极' },
  { label: '心烦的', key: 'upset', type: '情绪-消极' },
  { label: '兴奋的', key: 'excited', type: '情绪-积极' },
  { label: '不安的', key: 'uneasy', type: '情绪-消极' },
  { label: '坚定的', key: 'determined', type: '情绪-积极' },
  { label: '沮丧的', key: 'frustrated', type: '情绪-消极' },
  { label: '专注的', key: 'focused', type: '情绪-积极' },
  { label: '紧张的', key: 'nervous', type: '情绪-消极' },
  { label: '精力充沛的', key: 'energetic', type: '情绪-积极' },
  { label: '感到无聊的', key: 'bored', type: '情绪-消极' }
]

const loadQuestions = [
  { 
    label: '我觉得完成所有实验任务的精神负担程度是：', 
    key: 'mentalLoad',
    leftLabel: '非常低',
    rightLabel: '非常高'
  },
  { 
    label: '我觉得实验的节奏很仓促，时间很紧张。', 
    key: 'timeLoad',
    leftLabel: '非常不同意',
    rightLabel: '非常同意'
  },
  { 
    label: '我觉得整个实验系统（包括看题、播放动画、答题）的交互流程很顺畅。', 
    key: 'usability',
    leftLabel: '非常不同意',
    rightLabel: '非常同意'
  },
  { 
    label: '我觉得实验开始前的说明和练习环节清晰易懂。', 
    key: 'clarity',
    leftLabel: '非常不同意',
    rightLabel: '非常同意'
  },
  { 
    label: '我对我自己在实验中答案的准确性很有信心。', 
    key: 'confidence',
    leftLabel: '非常不同意',
    rightLabel: '非常同意'
  },
  { 
    label: '本题请选择 非常同意。', 
    key: 'attentionCheck',
    leftLabel: '非常不同意',
    rightLabel: '非常同意'
  }
]

// 从store恢复数据
const formData = reactive({
  emotions: { ...questionnaireStore.part2.emotions },
  load: { ...questionnaireStore.part2.load }
})

const goBack = () => {
  router.push('/questionnaire')
}

// 检查表单是否完整填写
const isFormComplete = computed(() => {
  // 检查所有情绪问题是否已回答
  for (const emotion of emotions) {
    if (!formData.emotions[emotion.key]) return false
  }
  
  // 检查所有负荷问题是否已回答
  for (const question of loadQuestions) {
    if (!formData.load[question.key]) return false
  }
  
  return true
})

const handleSubmit = () => {
  // 保存数据到store
  questionnaireStore.updatePart2(formData)
  console.log('第二部分数据：', formData)
  router.push('/questionnaire-part3')
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
  flex-wrap: wrap;
}

.question-number {
  font-weight: 600;
  color: #1f1f1f;
  flex-shrink: 0;
}

.emotion-type {
  color: #666;
  font-size: 14px;
  font-weight: 400;
}

.required {
  color: #e74c3c;
  margin-left: 4px;
}

.scale-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 28px;
}

.scale-group.horizontal {
  flex-direction: row;
  gap: 70px;
  padding-left: 28px;
  align-items: center;
}

.scale-option {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  line-height: 22px;
  color: #1f1f1f;
  transition: color 0.2s ease;
}

.scale-option.horizontal {
  flex-direction: column;
  gap: 8px;
  min-width: 70px;
  align-items: center;
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
