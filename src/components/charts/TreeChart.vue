<template>
  <div ref="chartRef" class="tree-chart" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { ComponentItem, CanvasConfig } from '../../types'
import { getChartOption } from '../../utils/chartOptionsHelper'

export interface TreeChartProps {
  item: ComponentItem
  chartTheme?: CanvasConfig['chartTheme']
}

const props = defineProps<TreeChartProps>()

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)
  updateChart()
}

const updateChart = () => {
  if (!chartInstance) return

  const option = getChartOption('treeChart', props.item.props)
  chartInstance.setOption(option, true)
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', () => chartInstance?.resize())
})

onUnmounted(() => {
  chartInstance?.dispose()
  chartInstance = null
})

watch(() => props.item.props, updateChart, { deep: true })
</script>

<style scoped>
.tree-chart {
  width: 100%;
  height: 100%;
}
</style>
