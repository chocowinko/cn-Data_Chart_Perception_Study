<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>请输入您的姓名</h2>
      <p>为了在您刷新页面后保留进度，请输入您的姓名或ID。</p>
      <input v-model="name" @keyup.enter="submitName" placeholder="请输入姓名或ID" />
      <button @click="submitName">提交</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const emit = defineEmits(['submit'])

function submitName() {
  if (name.value.trim()) {
    emit('submit', name.value.trim())
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  width: 90%;
  max-width: 400px;
}

.modal-content h2 {
  color: #333;
  margin-top: 0;
}

.modal-content p {
  color: #555;
  margin-bottom: 1.5rem;
}

input {
  width: calc(100% - 20px);
  padding: 10px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
