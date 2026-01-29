<template>
  <div ref="chartRef" class="single-line-chart" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { ComponentItem, CanvasConfig } from '../../types'
import { buildSingleLineChartOption } from '../../utils/chartOptionsHelper'

export interface SingleLineChartProps {
  item: ComponentItem
  chartTheme?: CanvasConfig['chartTheme']
}

const props = defineProps<SingleLineChartProps>()

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return

  // 初始化图表实例
  chartInstance = echarts.init(chartRef.value)

  // 构建图表配置
  const option = buildSingleLineChartOption(props.item.props, props.chartTheme)

  // 设置配置
  chartInstance.setOption(option)
}

const updateChart = () => {
  if (!chartInstance) return

  const option = buildSingleLineChartOption(props.item.props, props.chartTheme)
  chartInstance.setOption(option, true)
}

onMounted(() => {
  initChart()

  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    chartInstance?.resize()
  })
})

onUnmounted(() => {
  chartInstance?.dispose()
  chartInstance = null
})

// 监听 props 变化
watch(
  () => [props.item.props, props.chartTheme],
  () => {
    updateChart()
  },
  { deep: true }
)
</script>

<style scoped lang="less">
.single-line-chart {
  width: 100%;
  height: 100%;
}
</style>
