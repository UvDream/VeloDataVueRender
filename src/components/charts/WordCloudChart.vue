<template>
    <div ref="chartRef" class="word-cloud-chart" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import 'echarts-wordcloud'
import type { ComponentItem, CanvasConfig } from '../../types'

export interface WordCloudChartProps {
    item: ComponentItem
    chartTheme?: CanvasConfig['chartTheme']
}

const props = defineProps<WordCloudChartProps>()

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

const initChart = () => {
    if (!chartRef.value) return

    chartInstance = echarts.init(chartRef.value)
    updateChart()
}

const updateChart = () => {
    if (!chartInstance) return

    const wordData = props.item.props.wordCloudData || [
        { name: '数据可视化', value: 100 },
        { name: '大屏', value: 80 },
        { name: 'Vue3', value: 70 },
        { name: 'ECharts', value: 90 },
        { name: '图表', value: 85 }
    ]

    const option = {
        backgroundColor: 'transparent',
        series: [{
            type: 'wordCloud',
            shape: 'circle',
            sizeRange: [12, 60],
            rotationRange: [0, 0],
            rotationStep: 45,
            gridSize: 8,
            drawOutOfCanvas: false,
            textStyle: {
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                color: () => {
                    const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de']
                    return colors[Math.floor(Math.random() * colors.length)]
                }
            },
            data: wordData
        }]
    }

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

watch(() => [props.item.props, props.chartTheme], updateChart, { deep: true })
</script>

<style scoped lang="less">
.word-cloud-chart {
    width: 100%;
    height: 100%;
}
</style>
