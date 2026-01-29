<template>
    <div class="velo-container" :style="containerStyle">
        <slot>
            <div class="container-placeholder">
                容器组件（可放置其他内容）
            </div>
        </slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentItem } from '../../types'

export interface ContainerProps {
    item: ComponentItem
}

const props = defineProps<ContainerProps>()

// 容器样式配置
const containerStyle = computed(() => {
    const { props: itemProps } = props.item

    return {
        width: '100%',
        height: '100%',
        padding: itemProps.containerPadding ?
            (typeof itemProps.containerPadding === 'number' ?
                `${itemProps.containerPadding}px` :
                itemProps.containerPadding) :
            '16px',
        backgroundColor: itemProps.containerBackground || 'transparent',
        backgroundImage: itemProps.containerBackgroundImage ?
            `url(${itemProps.containerBackgroundImage})` :
            undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: itemProps.containerBorderRadius ?
            `${itemProps.containerBorderRadius}px` :
            undefined,
        borderWidth: itemProps.containerBorderWidth ?
            `${itemProps.containerBorderWidth}px` :
            undefined,
        borderColor: itemProps.containerBorderColor || undefined,
        borderStyle: itemProps.containerBorderWidth ? 'solid' : undefined,
        boxShadow: itemProps.containerShadow || undefined,
        overflow: 'auto',
    }
})

</script>

<style scoped>
.velo-container {
    width: 100%;
    height: 100%;
}

.container-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    border: 1px dashed rgba(255, 255, 255, 0.3);
}
</style>
