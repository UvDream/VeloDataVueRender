<template>
    <div ref="chartRef" class="city-map-chart" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { ComponentItem, CanvasConfig } from '../../types'
import { getMapRegionByName, getMapJsonPath } from '../../utils/mapData'

export interface CityMapChartProps {
    item: ComponentItem
    chartTheme?: CanvasConfig['chartTheme']
}

const props = defineProps<CityMapChartProps>()

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null
let currentMapRegion = ''

const initChart = async () => {
    if (!chartRef.value) return

    chartInstance = echarts.init(chartRef.value)
    await updateChart()
}

const loadMapData = async (regionName: string) => {
    try {
        const response = await fetch(getMapJsonPath(regionName))
        const geoJson = await response.json()
        echarts.registerMap(regionName, geoJson)
        return true
    } catch (error) {
        console.error(`Failed to load map data for ${regionName}:`, error)
        return false
    }
}

const updateChart = async () => {
    if (!chartInstance) return

    const {
        mapRegion = 'beijing',
        mapData: propMapData,
        chartTitle,
        visualMin = 0,
        visualMax = 100
    } = props.item.props

    // 如果区域变化，加载新的地图数据
    if (currentMapRegion !== mapRegion) {
        const success = await loadMapData(mapRegion)
        if (success) {
            currentMapRegion = mapRegion
        } else {
            // 如果加载失败，尝试使用北京作为回退
            if (mapRegion !== 'beijing') {
                await loadMapData('beijing')
                currentMapRegion = 'beijing'
            }
        }
    }

    const regionInfo = getMapRegionByName(currentMapRegion)
    const mapData = propMapData || []

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
            name: regionInfo?.label || '地图数据',
            type: 'map',
            map: currentMapRegion,
            roam: true,
            zoom: 1.1,
            label: {
                show: true,
                color: '#fff',
                fontSize: 10,
                formatter: '{b}'
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
.city-map-chart {
    width: 100%;
    height: 100%;
}
</style>
