<template>
    <div class="layout-sidebar" :style="containerStyle">
        <div v-if="position === 'left'" class="sidebar" :style="sidebarStyle">
            <RendererItem v-for="child in sidebarChildren" :key="child.id" :item="child" :all-components="allComponents"
                :chart-theme="chartTheme" />
        </div>
        <div class="main">
            <RendererItem v-for="child in mainChildren" :key="child.id" :item="child" :all-components="allComponents"
                :chart-theme="chartTheme" />
        </div>
        <div v-if="position === 'right'" class="sidebar" :style="sidebarStyle">
            <RendererItem v-for="child in sidebarChildren" :key="child.id" :item="child" :all-components="allComponents"
                :chart-theme="chartTheme" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import type { ComponentItem, CanvasConfig } from '../../types'

const RendererItem = defineAsyncComponent(() => import('../RendererItem.vue'))

export interface LayoutSidebarProps {
    item: ComponentItem
    allComponents: ComponentItem[]
    chartTheme?: CanvasConfig['chartTheme']
}

const props = defineProps<LayoutSidebarProps>()

const sidebarWidth = computed(() => props.item.props.sidebarWidth || '200px')
const position = computed(() => props.item.props.position || 'left')
const gap = computed(() => props.item.props.gap || 20)

// 获取子组件
const children = computed(() =>
    props.allComponents.filter(c => c.parentId === props.item.id)
)

// 侧栏 (cellIndex = 0), 主区域 (cellIndex = 1)
const sidebarChildren = computed(() => children.value.filter(c => c.cellIndex === 0))
const mainChildren = computed(() => children.value.filter(c => c.cellIndex === 1))

const containerStyle = computed(() => ({
    display: 'flex',
    gap: `${gap.value}px`,
    width: '100%',
    height: '100%',
}))

const sidebarStyle = computed(() => ({
    width: sidebarWidth.value,
    flexShrink: 0,
}))
</script>

<style scoped lang="less">
.layout-sidebar {
    box-sizing: border-box;
}

.sidebar,
.main {
    overflow: auto;
    position: relative;
}

.main {
    flex: 1;
}
</style>
