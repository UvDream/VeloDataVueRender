<template>
    <div ref="chartRef" class="map-chart" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { ComponentItem, CanvasConfig } from '../../types'

export interface MapChartProps {
    item: ComponentItem
    chartTheme?: CanvasConfig['chartTheme']
}

const props = defineProps<MapChartProps>()

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

const initChart = () => {
    if (!chartRef.value) return

    // 注册中国地图数据（使用简化的空地图）
    echarts.registerMap('china', { type: 'FeatureCollection', features: [] } as any)

    chartInstance = echarts.init(chartRef.value)
    updateChart()
}

const updateChart = () => {
    if (!chartInstance) return

    const mapData = props.item.props.mapData || [
        { name: '北京', value: 100 },
        { name: '上海', value: 90 },
        { name: '广东', value: 80 }
    ]

    const option = {
        backgroundColor: 'transparent',
        title: props.item.props.chartTitle ? {
            text: props.item.props.chartTitle,
            left: 'center',
            textStyle: { color: '#fff' }
        } : undefined,
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}'
        },
        visualMap: {
            min: 0,
            max: 100,
            text: ['高', '低'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['#50a3ba', '#eac736', '#d94e5d']
            },
            textStyle: {
                color: '#fff'
            }
        },
        series: [{
            name: '数据',
            type: 'map',
            map: 'china',
            roam: true,
            label: {
                show: true,
                color: '#fff',
                fontSize: 10
            },
            itemStyle: {
                areaColor: '#323c48',
                borderColor: '#404a59'
            },
            emphasis: {
                label: {
                    show: true,
                    color: '#fff'
                },
                itemStyle: {
                    areaColor: '#2a333d'
                }
            },
            data: mapData
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

<style scoped>
.map-chart {
    width: 100%;
    height: 100%;
}
</style>
