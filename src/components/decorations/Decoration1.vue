<template>
    <div class="decoration-1">
        <div class="line left"></div>
        <div class="center-content">
            <slot>{{ title }}</slot>
        </div>
        <div class="line right"></div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentItem } from '../../types'

export interface Decoration1Props {
    item: ComponentItem
}

const props = defineProps<Decoration1Props>()

const title = computed(() => props.item.props.content || '')
</script>

<style scoped>
.decoration-1 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px 0;
}

.line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, transparent, #409eff, transparent);
    position: relative;
}

.line.left {
    background: linear-gradient(90deg, transparent, #409eff);
}

.line.right {
    background: linear-gradient(90deg, #409eff, transparent);
}

.line::before,
.line::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: #409eff;
    border-radius: 50%;
    box-shadow: 0 0 6px #409eff;
}

.line.left::after {
    right: 0;
    top: -3px;
}

.line.right::before {
    left: 0;
    top: -3px;
}

.center-content {
    padding: 0 20px;
    color: #409eff;
    font-size: 18px;
    font-weight: bold;
    white-space: nowrap;
}
</style>
