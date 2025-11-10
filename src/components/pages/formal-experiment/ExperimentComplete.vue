<template>
  <div class="experiment-complete">
    <h1 class="main-title">实验任务已完成 🎉 🎉 🎉</h1>

    <div class="content">
      <p class="thank-you">感谢您的参与！</p>

      <p class="description">
        您已经完成了本次实验中所有需要集中注意力的任务。
      </p>

      <p class="description">
        接下来的部分是关于您在实验过程中的主观体验和个人偏好。这部分大约需要 5-7 分钟。
      </p>

      <p class="important-note">
        请注意：接下来的所有问题都没有"正确"或"错误"之分。我们只关心您的真实看法和感受，您的诚实反馈对我们的研究至关重要。
      </p>
    </div>

    <button class="continue-button" @click="goToQuestionnaire">
      <span class="button-text">继续（进入问卷）</span>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineOptions({
  name: 'ExperimentComplete'
})

const router = useRouter()

const goToQuestionnaire = () => {
  console.log('Navigating to questionnaire...')
  router.push('/questionnaire')
}
</script>

<style scoped>
.experiment-complete {
  width: 100%;
  padding: 0 0 60px 0;
  margin: 0;
  text-align: left;
}

.main-title {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 35.5556px;
  line-height: 43px;
  color: #1f1f1f;
  margin: 0 0 20px 0;
  padding: 0;
}

.content {
  margin-bottom: 40px;
}

.thank-you {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color: #545454;
  margin: 0 0 40px 0;
}

.description {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17.7778px;
  line-height: 25px;
  color: #545454;
  margin-bottom: 20px;
}

.important-note {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 17.7778px;
  line-height: 25px;
  color: #545454;
  margin-top: 30px;
  margin-bottom: 20px;
}

.continue-button {
  width: 223.7px;
  height: 63.7px;
  background: #1f1f1f;
  border: none;
  border-radius: 2.96296px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  margin-bottom: 40px;
}

.continue-button:hover {
  background-color: #333;
}

.continue-button:active {
  transform: translateY(1px);
}

.button-text {
  font-family: PingFang SC, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 17.7778px;
  line-height: 22px;
  color: #ffffff;
}
</style>
