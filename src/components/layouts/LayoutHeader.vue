<template>
    <div class="layout-header" :style="containerStyle">
        <div class="header" :style="headerStyle">
            <RendererItem v-for="child in headerChildren" :key="child.id" :item="child" :all-components="allComponents"
                :chart-theme="chartTheme" />
        </div>
        <div class="content">
            <RendererItem v-for="child in contentChildren" :key="child.id" :item="child" :all-components="allComponents"
                :chart-theme="chartTheme" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import type { ComponentItem, CanvasConfig } from '../../types'

const RendererItem = defineAsyncComponent(() => import('../RendererItem.vue'))

export interface LayoutHeaderProps {
    item: ComponentItem
    allComponents: ComponentItem[]
    chartTheme?: CanvasConfig['chartTheme']
}

const props = defineProps<LayoutHeaderProps>()

const headerHeight = computed(() => props.item.props.headerHeight || '80px')
const gap = computed(() => props.item.props.gap || 20)

// 获取子组件
const children = computed(() =>
    props.allComponents.filter(c => c.parentId === props.item.id)
)

// 头部 (cellIndex = 0), 内容区 (cellIndex = 1)
const headerChildren = computed(() => children.value.filter(c => c.cellIndex === 0))
const contentChildren = computed(() => children.value.filter(c => c.cellIndex === 1))

const containerStyle = computed(() => ({
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: `${gap.value}px`,
    width: '100%',
    height: '100%',
}))

const headerStyle = computed(() => ({
    height: headerHeight.value,
    flexShrink: 0,
}))
</script>

<style scoped lang="less">
.layout-header {
    box-sizing: border-box;
}

.header,
.content {
    overflow: auto;
    position: relative;
}

.content {
    flex: 1;
}
</style>
