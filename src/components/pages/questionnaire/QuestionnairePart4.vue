<template>
  <div class="questionnaire">
    <div class="content">
      <h2 class="section-title">第四部分：开放性反馈</h2>
      
      <form class="questionnaire-form" @submit.prevent="handleSubmit">
        <!-- 问题1：困难/困惑 -->
        <div class="question-block">
          <label class="question-label">
            <span class="question-number">1.</span>
            在实验过程中，是否有任何地方（例如：某个图表、某个问题、某个动画或操作流程）让您感到特别困难、困惑或不方便？
          </label>
          <textarea
            v-model="formData.difficulties"
            class="textarea-input"
            placeholder="请在此输入您的反馈..."
            rows="6"
          ></textarea>
        </div>

        <!-- 问题2：有帮助的设计 -->
        <div class="question-block">
          <label class="question-label">
            <span class="question-number">2.</span>
            在实验过程中，是否有任何设计（例如：某个图表、某个说明、某个动画或操作流程）让您感到特别有帮助、清晰或易于理解？
          </label>
          <textarea
            v-model="formData.helpful"
            class="textarea-input"
            placeholder="请在此输入您的反馈..."
            rows="6"
          ></textarea>
        </div>

        <!-- 按钮区域 -->
        <div class="button-group">
          <button type="button" class="nav-button prev-button" @click="goBack">
            上一页
          </button>
          <button type="submit" class="nav-button submit-button">
            提交问卷
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useQuestionnaireStore } from '../../../stores/questionnaire'

defineOptions({
  name: 'QuestionnairePart4'
})

const router = useRouter()
const questionnaireStore = useQuestionnaireStore()

// 从store恢复数据
const formData = reactive({
  difficulties: questionnaireStore.part4.difficulties,
  helpful: questionnaireStore.part4.helpful
})

const goBack = () => {
  router.push('/questionnaire-part3')
}

const handleSubmit = () => {
  // 保存数据到store并完成问卷
  questionnaireStore.updatePart4(formData)
  console.log('第四部分数据：', formData)
  
  // 自动下载问卷数据
  questionnaireStore.downloadJSON()
  
  // 提交成功后的处理
  setTimeout(() => {
    alert('问卷提交成功！数据已自动下载。感谢您的参与！')
    // 可以跳转到感谢页面或首页
    router.push('/')
  }, 500)
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
  gap: 40px;
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

.textarea-input {
  width: 100%;
  padding: 16px;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.2s ease;
  resize: vertical;
  box-sizing: border-box;
}

.textarea-input:focus {
  outline: none;
  border-color: #3498db;
}

.textarea-input::placeholder {
  color: #999;
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

.submit-button {
  background: #27ae60;
}

.submit-button:hover {
  background: #229954;
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

.submit-button:disabled {
  background: #95a5a6;
  cursor: not-allowed;
  opacity: 0.6;
}

.submit-button:disabled:hover {
  background: #95a5a6;
  transform: none;
}
</style>
