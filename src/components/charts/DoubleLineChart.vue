<template>
  <div ref="chartRef" class="double-line-chart" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { ComponentItem, CanvasConfig } from '../../types'
import { buildDoubleLineChartOption } from '../../utils/chartOptionsHelper'

export interface DoubleLineChartProps {
  item: ComponentItem
  chartTheme?: CanvasConfig['chartTheme']
}

const props = defineProps<DoubleLineChartProps>()

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)
  const option = buildDoubleLineChartOption(props.item.props, props.chartTheme)
  chartInstance.setOption(option)
}

const updateChart = () => {
  if (!chartInstance) return

  const option = buildDoubleLineChartOption(props.item.props, props.chartTheme)
  chartInstance.setOption(option, true)
}

onMounted(() => {
  initChart()

  window.addEventListener('resize', () => {
    chartInstance?.resize()
  })
})

onUnmounted(() => {
  chartInstance?.dispose()
  chartInstance = null
})

watch(
  () => [props.item.props, props.chartTheme],
  () => {
    updateChart()
  },
  { deep: true }
)
</script>

<style scoped lang="less">
.double-line-chart {
  width: 100%;
  height: 100%;
}
</style>
