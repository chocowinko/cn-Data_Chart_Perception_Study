<template>
  <div class="questionnaire">
    <div class="content">
      <h2 class="section-title">第一部分：背景经验</h2>
      
      <form class="questionnaire-form" @submit.prevent="handleSubmit">
        <!-- 问题1：姓名 -->
        <div class="question-block">
          <label class="question-label">
            <span class="question-number">1.</span>
            您的姓名是？
            <span class="required">*</span>
          </label>
          <input
            v-model="formData.name"
            type="text"
            class="text-input"
            placeholder="请输入您的姓名"
            required
          />
        </div>

        <!-- 问题2：性别 -->
        <div class="question-block">
          <label class="question-label">
            <span class="question-number">2.</span>
            您的性别是？
            <span class="required">*</span>
          </label>
          <div class="radio-group">
            <label class="radio-option">
              <input
                v-model="formData.gender"
                type="radio"
                value="male"
                required
              />
              <span>男</span>
            </label>
            <label class="radio-option">
              <input
                v-model="formData.gender"
                type="radio"
                value="female"
                required
              />
              <span>女</span>
            </label>
          </div>
        </div>

        <!-- 问题3：年龄 -->
        <div class="question-block">
          <label class="question-label">
            <span class="question-number">3.</span>
            您的年龄是？
            <span class="required">*</span>
          </label>
          <div class="radio-group">
            <label class="radio-option">
              <input
                v-model="formData.age"
                type="radio"
                value="under18"
                required
              />
              <span>18岁以下</span>
            </label>
            <label class="radio-option">
              <input
                v-model="formData.age"
                type="radio"
                value="18-35"
                required
              />
              <span>18–35</span>
            </label>
            <label class="radio-option">
              <input
                v-model="formData.age"
                type="radio"
                value="36-59"
                required
              />
              <span>36–59</span>
            </label>
            <label class="radio-option">
              <input
                v-model="formData.age"
                type="radio"
                value="over60"
                required
              />
              <span>60岁以上</span>
            </label>
          </div>
        </div>

        <!-- 问题4：查看或制作图表频率 -->
        <div class="question-block">
          <label class="question-label">
            <span class="question-number">4.</span>
            您日常（工作或生活中）查看或制作数据图表（如Excel图表、新闻图表等）的频率是？
            <span class="required">*</span>
          </label>
          <div class="scale-group">
            <label class="scale-option">
              <input
                v-model="formData.chartFrequency"
                type="radio"
                value="1"
                required
              />
              <span>几乎从不</span>
            </label>
            <label class="scale-option">
              <input
                v-model="formData.chartFrequency"
                type="radio"
                value="2"
                required
              />
              <span>每年几次</span>
            </label>
            <label class="scale-option">
              <input
                v-model="formData.chartFrequency"
                type="radio"
                value="3"
                required
              />
              <span>每月几次</span>
            </label>
            <label class="scale-option">
              <input
                v-model="formData.chartFrequency"
                type="radio"
                value="4"
                required
              />
              <span>每周几次</span>
            </label>
            <label class="scale-option">
              <input
                v-model="formData.chartFrequency"
                type="radio"
                value="5"
                required
              />
              <span>几乎每天</span>
            </label>
          </div>
        </div>

        <!-- 问题5：对动态图表的熟悉程度 -->
        <div class="question-block">
          <label class="question-label">
            <span class="question-number">5.</span>
            在本次实验之前，您对动态的或带动画效果的数据图表有多熟悉？
            <span class="required">*</span>
          </label>
          <div class="scale-group">
            <label class="scale-option">
              <input
                v-model="formData.animationFamiliarity"
                type="radio"
                value="1"
                required
              />
              <span>非常不熟悉</span>
            </label>
            <label class="scale-option">
              <input
                v-model="formData.animationFamiliarity"
                type="radio"
                value="2"
                required
              />
              <span>不熟悉</span>
            </label>
            <label class="scale-option">
              <input
                v-model="formData.animationFamiliarity"
                type="radio"
                value="3"
                required
              />
              <span>一般</span>
            </label>
            <label class="scale-option">
              <input
                v-model="formData.animationFamiliarity"
                type="radio"
                value="4"
                required
              />
              <span>熟悉</span>
            </label>
            <label class="scale-option">
              <input
                v-model="formData.animationFamiliarity"
                type="radio"
                value="5"
                required
              />
              <span>非常熟悉</span>
            </label>
          </div>
        </div>

        <!-- 问题6：视觉障碍 -->
        <div class="question-block">
          <label class="question-label">
            <span class="question-number">6.</span>
            您是否有任何视觉障碍（如未经矫正的严重视力问题、色盲、色弱等）？
            <span class="required">*</span>
          </label>
          <div class="radio-group">
            <label class="radio-option">
              <input
                v-model="formData.visualImpairment"
                type="radio"
                value="no"
                required
                @change="handleVisualImpairmentChange"
              />
              <span>否</span>
            </label>
            <label class="radio-option">
              <input
                v-model="formData.visualImpairment"
                type="radio"
                value="yes"
                required
                @change="handleVisualImpairmentChange"
              />
              <span>是（需要简要说明）</span>
            </label>
          </div>
          <textarea
            v-if="formData.visualImpairment === 'yes'"
            v-model="formData.visualImpairmentDetail"
            class="textarea-input"
            placeholder="请简要说明您的视觉障碍情况"
            rows="3"
            :required="formData.visualImpairment === 'yes'"
          ></textarea>
        </div>

        <!-- 按钮区域 -->
        <div class="button-group">
          <button type="submit" class="nav-button next-button" :disabled="!isFormComplete">
            下一页
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuestionnaireStore } from '../../../stores/questionnaire'

defineOptions({
  name: 'QuestionnaireForm'
})

const router = useRouter()
const questionnaireStore = useQuestionnaireStore()

// 从store恢复数据
const formData = reactive({ ...questionnaireStore.part1 })

// 页面加载时初始化问卷开始时间
onMounted(() => {
  questionnaireStore.startQuestionnaire()
})

// 检查表单是否完整填写
const isFormComplete = computed(() => {
  // 检查基本信息
  if (!formData.name || !formData.gender || !formData.age) return false
  if (!formData.chartFrequency || !formData.animationFamiliarity) return false
  if (!formData.visualImpairment) return false
  
  // 如果选择了有视觉障碍，需要填写详情
  if (formData.visualImpairment === 'yes' && !formData.visualImpairmentDetail) return false
  
  return true
})

const handleVisualImpairmentChange = () => {
  if (formData.visualImpairment === 'no') {
    formData.visualImpairmentDetail = ''
  }
}

const handleSubmit = () => {
  // 保存数据到store
  questionnaireStore.updatePart1(formData)
  console.log('第一部分数据：', formData)
  router.push('/questionnaire-part2')
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

.questionnaire-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.question-block {
  display: flex;
  flex-direction: column;
  gap: 15px;
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

.text-input {
  width: 100%;
  padding: 12px 16px;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  line-height: 22px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.text-input:focus {
  outline: none;
  border-color: #3498db;
}

.textarea-input {
  width: 100%;
  padding: 12px 16px;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  line-height: 22px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.2s ease;
  resize: vertical;
  margin-top: 10px;
  box-sizing: border-box;
}

.textarea-input:focus {
  outline: none;
  border-color: #3498db;
}

.radio-group,
.scale-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 28px;
}

.radio-option,
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

.radio-option:hover,
.scale-option:hover {
  color: #3498db;
}

.radio-option input[type='radio'],
.scale-option input[type='radio'] {
  cursor: pointer;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.button-group {
  display: flex;
  justify-content: flex-end;
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
