<template>
    <div class="layout-two-column" :style="containerStyle">
        <div class="column left" :style="leftStyle">
            <RendererItem v-for="child in leftChildren" :key="child.id" :item="child" :all-components="allComponents"
                :chart-theme="chartTheme" />
        </div>
        <div class="column right">
            <RendererItem v-for="child in rightChildren" :key="child.id" :item="child" :all-components="allComponents"
                :chart-theme="chartTheme" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import type { ComponentItem, CanvasConfig } from '../../types'

// 异步导入以解决循环依赖
const RendererItem = defineAsyncComponent(() => import('../RendererItem.vue'))

export interface LayoutTwoColumnProps {
    item: ComponentItem
    allComponents: ComponentItem[]
    chartTheme?: CanvasConfig['chartTheme']
}

const props = defineProps<LayoutTwoColumnProps>()

const leftWidth = computed(() => {
    const layoutConfig = props.item.props.layoutConfig
    if (layoutConfig?.cells?.length) {
        const firstCell = layoutConfig.cells[0]
        // 如果有固定宽度直接使用
        if (firstCell?.width) return firstCell.width

        // 计算 Flex 比例
        const flex1 = firstCell?.flex ?? 1
        const secondCell = layoutConfig.cells[1]
        const flex2 = secondCell?.flex ?? 1

        const ratio = flex1 / (flex1 + flex2)
        return `${ratio * 100}%`
    }

    return props.item.props.leftWidth || '50%'
})

const gap = computed(() => {
    const layoutConfig = props.item.props.layoutConfig
    if (layoutConfig?.gap !== undefined) {
        return layoutConfig.gap
    }
    return props.item.props.gap || 20
})

// 获取子组件
const children = computed(() =>
    props.allComponents.filter(c => c.parentId === props.item.id)
)

// 左栏子组件 (cellIndex = 0)
const leftChildren = computed(() =>
    children.value.filter(c => c.cellIndex === 0)
)

// 右栏子组件 (cellIndex = 1)
const rightChildren = computed(() =>
    children.value.filter(c => c.cellIndex === 1)
)

const containerStyle = computed(() => ({
    display: 'grid',
    gap: `${gap.value}px`,
    gridTemplateColumns: `calc(${leftWidth.value} - ${gap.value / 2}px) 1fr`,
    width: '100%',
    height: '100%',
}))

const leftStyle = computed(() => ({}))
</script>

<style scoped lang="less">
.layout-two-column {
    box-sizing: border-box;
}

.column {
    overflow: auto;
    position: relative;
    /* Ensure content doesn't blow out grid column */
    min-width: 0;
}
</style>
