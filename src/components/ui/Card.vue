<template>
    <a-card :title="cardTitle" :bordered="bordered" :hoverable="hoverable" :style="cardStyle" class="velo-card">
        <template v-if="cardContent">
            {{ cardContent }}
        </template>
        <template v-else>
            <slot></slot>
        </template>
    </a-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Card as ACard } from 'ant-design-vue'
import type { ComponentItem } from '../../types'

export interface CardProps {
    item: ComponentItem
}

const props = defineProps<CardProps>()

const cardTitle = computed(() => props.item.props.cardTitle || '')
const cardContent = computed(() => props.item.props.content)
const bordered = computed(() => props.item.props.cardBordered !== false)
const hoverable = computed(() => props.item.props.cardHoverable || false)

const cardStyle = computed(() => ({
    background: props.item.props.backgroundColor || 'rgba(10, 14, 39, 0.6)',
    borderColor: props.item.props.borderColor || 'rgba(64, 158, 255, 0.3)',
}))
</script>

<style scoped lang="less">
.velo-card {
    font-family: inherit;
}

:deep(.ant-card) {
    background: rgba(10, 14, 39, 0.6);
    border: 1px solid rgba(64, 158, 255, 0.3);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

:deep(.ant-card-head) {
    color: #ffffff;
    border-bottom: 1px solid rgba(64, 158, 255, 0.3);
    background: rgba(64, 158, 255, 0.1);
}

:deep(.ant-card-head-title) {
    color: #ffffff;
}

:deep(.ant-card-body) {
    color: rgba(255, 255, 255, 0.85);
}

:deep(.ant-card-hoverable:hover) {
    border-color: #409eff;
    box-shadow: 0 4px 16px rgba(64, 158, 255, 0.4);
    transform: translateY(-2px);
}
</style>
