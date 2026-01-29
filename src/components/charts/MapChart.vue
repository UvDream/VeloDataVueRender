<template>
    <div ref="chartRef" class="map-chart" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { ComponentItem, CanvasConfig } from '../../types'
import { getMapJsonPath } from '../../utils/mapData'

export interface MapChartProps {
    item: ComponentItem
    chartTheme?: CanvasConfig['chartTheme']
}

const props = defineProps<MapChartProps>()

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

const initChart = async () => {
    if (!chartRef.value) return

    try {
        // 加载中国地图数据
        const response = await fetch(getMapJsonPath('china'))
        const geoJson = await response.json()
        echarts.registerMap('china', geoJson)
    } catch (error) {
        console.error('Failed to load china map data:', error)
        // 回退到空地图，避免崩溃
        echarts.registerMap('china', { type: 'FeatureCollection', features: [] } as any)
    }

    chartInstance = echarts.init(chartRef.value)
    updateChart()
}

const updateChart = () => {
    if (!chartInstance) return

    const { mapData: propMapData, chartTitle, visualMin = 0, visualMax = 100 } = props.item.props
    const mapData = propMapData || [
        { name: '北京', value: 100 },
        { name: '上海', value: 90 },
        { name: '广东', value: 80 }
    ]

    const option = {
        backgroundColor: 'transparent',
        title: chartTitle ? {
            text: chartTitle,
            left: 'center',
            top: 20,
            textStyle: {
                color: '#fff',
                fontSize: 16,
                fontWeight: 'normal'
            }
        } : undefined,
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderColor: '#333',
            textStyle: { color: '#fff' },
            formatter: (params: any) => {
                if (params.data) {
                    return `${params.name}: ${params.value}`
                }
                return `${params.name}: 无数据`
            }
        },
        visualMap: {
            min: visualMin,
            max: visualMax,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],
            seriesIndex: [0],
            inRange: {
                color: ['#1e466b', '#1b85b8', '#559e83', '#ae9c45', '#d94e5d']
            },
            textStyle: {
                color: '#fff'
            },
            calculable: true
        },
        series: [{
            name: '数据',
            type: 'map',
            map: 'china',
            roam: true,
            zoom: 1.2,
            label: {
                show: true,
                color: '#fff',
                fontSize: 10
            },
            itemStyle: {
                areaColor: '#1a2b3c',
                borderColor: '#4a5b6c',
                borderWidth: 0.5
            },
            emphasis: {
                label: {
                    show: true,
                    color: '#fff'
                },
                itemStyle: {
                    areaColor: '#2a3b4c',
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
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

<style scoped lang="less">
.map-chart {
    width: 100%;
    height: 100%;
}
</style>
