<template>
  <div class="practice-complete">
    <h1 class="main-title">练习结束！🎉 🎉 🎉</h1>

    <h2 class="subtitle">准备开始正式实验</h2>

    <div class="content">
      <p class="description">现在您已经熟悉了实验流程，接下来将进入正式实验，您的答案会被记录。</p>

      <p class="instruction">作答时请遵循第一直觉！</p>

      <p class="break-text">您可以先休息一下。准备好后，点击下方按钮开始。</p>
    </div>

    <button class="start-button" @click="startFormalExperiment">
      <span class="button-text">开始正式实验</span>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const startFormalExperiment = () => {
  console.log('Starting formal experiment...')
  // 跳转到Line Graph任务页面
  router.push('/line-graph-task')
}
</script>

<style scoped>
.practice-complete {
  width: 100%;
  padding: 0 0 60px 0;
  margin: 0;
  text-align: left;
}

.main-title {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 35.5556px;
  line-height: 43px;
  color: #1f1f1f;
  margin: 0 0 20px 0;
  padding: 0;
}

.subtitle {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color: #545454;
  margin: 0 0 40px 0;
}

.content {
  margin-bottom: 40px;
}

.description,
.instruction,
.break-text {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17.7778px;
  line-height: 25px;
  color: #545454;
  margin-bottom: 20px;
}

.instruction {
  font-weight: 500;
}

.start-button {
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

.start-button:hover {
  background-color: #333;
}

.start-button:active {
  transform: translateY(1px);
}

.button-text {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 17.7778px;
  line-height: 22px;
  color: #ffffff;
}
</style>
