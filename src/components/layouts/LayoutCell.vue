<template>
    <div class="layout-cell" :style="cellStyle">
        <RendererItem v-for="child in children" :key="child.id" :item="child" :all-components="allComponents"
            :chart-theme="chartTheme" />
    </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import type { ComponentItem, CanvasConfig } from '../../types'

const RendererItem = defineAsyncComponent(() => import('../RendererItem.vue'))

export interface LayoutCellProps {
    item: ComponentItem
    allComponents: ComponentItem[]
    chartTheme?: CanvasConfig['chartTheme']
}

const props = defineProps<LayoutCellProps>()

// 获取子组件
const children = computed(() =>
    props.allComponents.filter(c => c.parentId === props.item.id)
)

const cellStyle = computed(() => ({
    padding: `${props.item.props.padding || 20}px`,
    backgroundColor: props.item.props.backgroundColor || 'transparent',
    borderColor: props.item.props.borderColor || 'transparent',
    borderWidth: props.item.props.borderWidth ? `${props.item.props.borderWidth}px` : '0',
    borderStyle: 'solid',
    borderRadius: `${props.item.props.borderRadius || 0}px`,
    width: '100%',
    height: '100%',
    boxSizing: 'border-box' as 'border-box',
    position: 'relative' as 'relative',
}))
</script>

<style scoped>
.layout-cell {
    overflow: auto;
}
</style>
