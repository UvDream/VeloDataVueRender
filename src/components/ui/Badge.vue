<template>
    <a-badge :count="badgeCount" :dot="showDot" :color="badgeColor" :show-zero="showZero" class="velo-badge">
        <div class="badge-content">
            {{ badgeText }}
        </div>
    </a-badge>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Badge as ABadge } from 'ant-design-vue'
import type { ComponentItem } from '../../types'

export interface BadgeProps {
    item: ComponentItem
}

const props = defineProps<BadgeProps>()

const badgeText = computed(() => props.item.props.content || '')
const badgeCount = computed(() => props.item.props.badgeCount || 0)
const showDot = computed(() => props.item.props.showDot || false)
const badgeColor = computed(() => props.item.props.badgeColor)
const showZero = computed(() => props.item.props.showZero || false)
</script>

<style scoped>
.velo-badge {
    font-family: inherit;
}

.badge-content {
    padding: 4px 12px;
    background: rgba(10, 14, 39, 0.6);
    border: 1px solid rgba(64, 158, 255, 0.3);
    border-radius: 4px;
    color: #ffffff;
}

:deep(.ant-badge-count) {
    background: linear-gradient(135deg, #f56c6c 0%, #ff85c0 100%);
    box-shadow: 0 0 8px rgba(245, 108, 108, 0.6);
}
</style>
