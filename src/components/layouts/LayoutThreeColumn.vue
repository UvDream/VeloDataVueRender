<template>
    <div class="layout-three-column" :style="containerStyle">
        <div class="column left" :style="leftStyle">
            <RendererItem v-for="child in leftChildren" :key="child.id" :item="child" :all-components="allComponents"
                :chart-theme="chartTheme" />
        </div>
        <div class="column center">
            <RendererItem v-for="child in centerChildren" :key="child.id" :item="child" :all-components="allComponents"
                :chart-theme="chartTheme" />
        </div>
        <div class="column right" :style="rightStyle">
            <RendererItem v-for="child in rightChildren" :key="child.id" :item="child" :all-components="allComponents"
                :chart-theme="chartTheme" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import type { ComponentItem, CanvasConfig } from '../../types'

const RendererItem = defineAsyncComponent(() => import('../RendererItem.vue'))

export interface LayoutThreeColumnProps {
    item: ComponentItem
    allComponents: ComponentItem[]
    chartTheme?: CanvasConfig['chartTheme']
}

const props = defineProps<LayoutThreeColumnProps>()

const leftWidth = computed(() => props.item.props.leftWidth || '25%')
const rightWidth = computed(() => props.item.props.rightWidth || '25%')
const gap = computed(() => props.item.props.gap || 20)

// 获取子组件
const children = computed(() =>
    props.allComponents.filter(c => c.parentId === props.item.id)
)

// 左栏 (cellIndex = 0), 中栏 (cellIndex = 1), 右栏 (cellIndex = 2)
const leftChildren = computed(() => children.value.filter(c => c.cellIndex === 0))
const centerChildren = computed(() => children.value.filter(c => c.cellIndex === 1))
const rightChildren = computed(() => children.value.filter(c => c.cellIndex === 2))

const containerStyle = computed(() => ({
    display: 'flex',
    gap: `${gap.value}px`,
    width: '100%',
    height: '100%',
}))

const leftStyle = computed(() => ({
    width: leftWidth.value,
    flexShrink: 0,
}))

const rightStyle = computed(() => ({
    width: rightWidth.value,
    flexShrink: 0,
}))
</script>

<style scoped lang="less">
.layout-three-column {
    box-sizing: border-box;
}

.column {
    overflow: auto;
    position: relative;
}

.column.left,
.column.right {
    flex: none;
}

.column.center {
    flex: 1;
}
</style>
