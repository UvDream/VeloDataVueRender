<template>
    <div class="border-box-2" :style="containerStyle">
        <div class="corner top-left"></div>
        <div class="corner top-right"></div>
        <div class="corner bottom-left"></div>
        <div class="corner bottom-right"></div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentItem } from '../../types'

export interface BorderBox2Props {
    item: ComponentItem
}

const props = defineProps<BorderBox2Props>()

const containerStyle = computed(() => ({
    borderColor: props.item.props.borderColor || '#409eff',
}))
</script>

<style scoped>
.border-box-2 {
    position: relative;
    width: 100%;
    height: 100%;
}

.content {
    width: 100%;
    height: 100%;
    padding: 20px;
}

.corner {
    position: absolute;
    width: 20px;
    height: 20px;
    border-color: inherit;
}

.corner.top-left {
    top: 0;
    left: 0;
    border-top: 2px solid;
    border-left: 2px solid;
}

.corner.top-right {
    top: 0;
    right: 0;
    border-top: 2px solid;
    border-right: 2px solid;
}

.corner.bottom-left {
    bottom: 0;
    left: 0;
    border-bottom: 2px solid;
    border-left: 2px solid;
}

.corner.bottom-right {
    bottom: 0;
    right: 0;
    border-bottom: 2px solid;
    border-right: 2px solid;
}
</style>
