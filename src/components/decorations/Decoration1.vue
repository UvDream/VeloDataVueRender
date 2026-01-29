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
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--decoration-color, #409eff), transparent);
    position: relative;
}

.line.left {
    background: linear-gradient(90deg, transparent, var(--decoration-color, #409eff));
}

.line.right {
    background: linear-gradient(90deg, var(--decoration-color, #409eff), transparent);
}

.line::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background: var(--decoration-color, #409eff);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--decoration-color, #409eff);
    top: -2.5px;
    animation: pulse 2s ease-in-out infinite;
}

.line.left::after {
    right: 0;
}

.line.right::after {
    left: 0;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.5); opacity: 1; }
}

.center-content {
    padding: 0 20px;
    color: #409eff;
    font-size: 18px;
    font-weight: bold;
    white-space: nowrap;
}
</style>
