<template>
  <div ref="chartRef" class="calendar-chart" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { ComponentItem, CanvasConfig } from '../../types'
import { getCalendarOption } from '../../utils/chartOptionsHelper'

export interface CalendarChartProps {
  item: ComponentItem
  chartTheme?: CanvasConfig['chartTheme']
}

const props = defineProps<CalendarChartProps>()

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)
  const option = getCalendarOption(props.item.props)
  chartInstance.setOption(option)
}

const updateChart = () => {
  if (!chartInstance) return

  const option = getCalendarOption(props.item.props)
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

<style scoped lang="less">
.calendar-chart {
  width: 100%;
  height: 100%;
}
</style>
