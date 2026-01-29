<template>
    <a-tag :color="tagColor" :closable="closable" class="velo-tag" @close="handleClose">
        {{ tagText }}
    </a-tag>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Tag as ATag } from 'ant-design-vue'
import type { ComponentItem } from '../../types'

export interface TagProps {
    item: ComponentItem
}

const props = defineProps<TagProps>()
const emit = defineEmits<{
    close: []
}>()

const tagText = computed(() => props.item.props.content || '标签')
const tagColor = computed(() => props.item.props.tagColor || 'blue')
const closable = computed(() => props.item.props.closable || false)

const handleClose = () => {
    emit('close')
}
</script>

<style scoped lang="less">
.velo-tag {
    font-family: inherit;
}

:deep(.ant-tag) {
    border-color: rgba(64, 158, 255, 0.5);
    background: rgba(64, 158, 255, 0.1);
    color: #409eff;
}
</style>
