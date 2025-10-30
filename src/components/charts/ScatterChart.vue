<template>
  <div class="scatter-chart">
    <img src="/Image 2.jpg" alt="Scatter Plot" class="chart-image" />
  </div>
</template>

<script setup>
// 静态散点图组件
</script>

<style scoped>
.scatter-chart {
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