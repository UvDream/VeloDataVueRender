<template>
    <div class="velo-icon" :style="iconContainerStyle">
        <component :is="iconComponent" v-if="iconComponent" :style="iconStyle" :spin="iconSpin" :rotate="iconRotate" />
        <QuestionCircleOutlined v-else :style="iconStyle" />
    </div>
</template>

<script setup lang="ts">
import { computed, Component } from 'vue'
import type { ComponentItem } from '../../types'
import * as AntIcons from '@ant-design/icons-vue'

export interface IconProps {
    item: ComponentItem
}

const props = defineProps<IconProps>()

// 图标配置
const iconType = computed(() => props.item.props.iconType || 'QuestionCircleOutlined')
const iconSize = computed(() => props.item.props.iconSize || 24)
const iconColor = computed(() => props.item.props.iconColor || '#1890ff')
const iconRotate = computed(() => props.item.props.iconRotate || 0)
const iconSpin = computed(() => props.item.props.iconSpin || false)

// 动态加载图标组件
const iconComponent = computed<Component | null>(() => {
    const icons = AntIcons as Record<string, Component>
    return icons[iconType.value] || null
})

// 容器样式
const iconContainerStyle = computed(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

// 图标样式
const iconStyle = computed(() => ({
    fontSize: `${iconSize.value}px`,
    color: iconColor.value,
}))
</script>

<style scoped>
.velo-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
