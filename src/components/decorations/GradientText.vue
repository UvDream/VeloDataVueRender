<template>
    <div class="gradient-text" :style="textStyle">
        <slot>{{ text }}</slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentItem } from '../../types'

export interface GradientTextProps {
    item: ComponentItem
}

const props = defineProps<GradientTextProps>()

const text = computed(() => props.item.props.content || '')

const textStyle = computed(() => {
    const color1 = props.item.props.gradientStart || '#409eff'
    const color2 = props.item.props.gradientEnd || '#66b1ff'
    const angle = props.item.props.gradientAngle || '135deg'

    return {
        background: `linear-gradient(${angle}, ${color1}, ${color2})`,
        fontSize: `${props.item.style.fontSize || 24}px`,
        fontWeight: 'bold',
    }
})
</script>

<style scoped lang="less">
.gradient-text {
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 10px rgba(64, 158, 255, 0.6));
    display: inline-block;
}
</style>
