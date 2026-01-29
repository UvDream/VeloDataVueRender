<template>
    <a-avatar :src="avatarSrc" :icon="avatarIcon" :size="avatarSize" :shape="avatarShape" class="velo-avatar">
        {{ avatarText }}
    </a-avatar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Avatar as AAvatar } from 'ant-design-vue'
import type { ComponentItem } from '../../types'

export interface AvatarProps {
    item: ComponentItem
}

const props = defineProps<AvatarProps>()

const avatarSrc = computed(() => props.item.props.src)
const avatarIcon = computed(() => props.item.props.icon)
const avatarText = computed(() => props.item.props.content || '')
const avatarSize = computed(() => props.item.props.avatarSize || 64)
const avatarShape = computed(() => props.item.props.avatarShape || 'circle')
</script>

<style scoped>
.velo-avatar {
    font-family: inherit;
}

:deep(.ant-avatar) {
    background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
    border: 2px solid rgba(64, 158, 255, 0.5);
    box-shadow: 0 0 12px rgba(64, 158, 255, 0.4);
    color: #ffffff;
}
</style>
