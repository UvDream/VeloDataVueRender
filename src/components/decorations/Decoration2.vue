<template>
    <div class="decoration-2" :style="lineStyle"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentItem } from '../../types'

export interface Decoration2Props {
    item: ComponentItem
}

const props = defineProps<Decoration2Props>()

const lineStyle = computed(() => ({
    background: `linear-gradient(90deg, transparent, ${props.item.props.glowColor || '#409eff'}, transparent)`,
    boxShadow: `0 0 10px ${props.item.props.glowColor || '#409eff'}`,
}))
</script>

<style scoped lang="less">
.decoration-2 {
    width: 100%;
    height: 2px;
    margin: 10px 0;
}
</style>
