<template>
  <div class="network-chart">
    <img src="/Image 1.jpg" alt="Network Diagram" class="chart-image" />
  </div>
</template>

<script setup>
// 静态网络图组件
</script>

<style scoped>
.network-chart {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
}

.chart-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}
</style>