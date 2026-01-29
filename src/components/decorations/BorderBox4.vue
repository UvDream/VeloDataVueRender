<template>
    <div class="border-box-4" :style="containerStyle">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentItem } from '../../types'

export interface BorderBox4Props {
    item: ComponentItem
}

const props = defineProps<BorderBox4Props>()

const containerStyle = computed(() => {
    const color1 = props.item.props.glowColor || '#409eff'
    const color2 = '#66b1ff'

    return {
        background: `linear-gradient(#0a0e27, #0a0e27) padding-box,
                 linear-gradient(135deg, ${color1}, ${color2}) border-box`,
        border: '2px solid transparent',
        boxShadow: `0 0 10px ${color1}`,
    }
})
</script>

<style scoped>
.border-box-4 {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 4px;
}

.content {
    width: 100%;
    height: 100%;
    padding: 20px;
}
</style>
