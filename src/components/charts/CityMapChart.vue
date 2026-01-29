<template>
    <div ref="chartRef" class="city-map-chart" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ComponentItem, CanvasConfig } from '../../types'

export interface CityMapChartProps {
    item: ComponentItem
    chartTheme?: CanvasConfig['chartTheme']
}

const props = defineProps<CityMapChartProps>()

const chartRef = ref<HTMLDivElement | null>(null)

// 城市地图需要动态加载对应城市的GeoJSON，这里先提供占位实现
watch(() => props.item.props, () => {
    // TODO: 实现城市地图加载逻辑
}, { deep: true })
</script>

<style scoped lang="less">
.city-map-chart {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px dashed rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.6);
}

.city-map-chart::before {
    content: 'CityMap (需要动态GeoJSON数据)';
}
</style>
