<template>
    <a-select v-model:value="selectValue" :placeholder="placeholder" :disabled="disabled" :mode="mode"
        :size="selectSize" :allow-clear="allowClear" :show-search="showSearch" :options="options" class="velo-select"
        @change="handleChange" />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Select as ASelect } from 'ant-design-vue'
import type { ComponentItem } from '../../types'

export interface SelectProps {
    item: ComponentItem
}

const props = defineProps<SelectProps>()
const emit = defineEmits<{
    change: [value: any]
}>()

const selectValue = ref(props.item.props.value)
const placeholder = computed(() => props.item.props.placeholder || '请选择')
const disabled = computed(() => props.item.props.disabled || false)
const mode = computed(() => props.item.props.mode) // undefined, 'multiple', 'tags'
const selectSize = computed(() => props.item.props.selectSize || 'middle')
const allowClear = computed(() => props.item.props.allowClear !== false)
const showSearch = computed(() => props.item.props.showSearch || false)
const options = computed(() => props.item.props.options || [])

const handleChange = (value: any) => {
    emit('change', value)
}

watch(() => props.item.props.value, (newValue) => {
    if (newValue !== selectValue.value) {
        selectValue.value = newValue
    }
})
</script>

<style scoped lang="less">
.velo-select {
    font-family: inherit;
    width: 100%;
}

:deep(.ant-select-selector) {
    background: rgba(10, 14, 39, 0.6) !important;
    border: 1px solid rgba(64, 158, 255, 0.3) !important;
    color: #ffffff;
    transition: all 0.3s ease;
}

:deep(.ant-select-selector):hover {
    border-color: rgba(64, 158, 255, 0.6) !important;
}

:deep(.ant-select-focused .ant-select-selector) {
    border-color: #409eff !important;
    box-shadow: 0 0 8px rgba(64, 158, 255, 0.4) !important;
}

:deep(.ant-select-selection-placeholder) {
    color: rgba(255, 255, 255, 0.4);
}

:deep(.ant-select-selection-item) {
    color: #ffffff;
}

:deep(.ant-select-arrow) {
    color: rgba(255, 255, 255, 0.5);
}

:deep(.ant-select-clear) {
    background: transparent;
    color: rgba(255, 255, 255, 0.5);
}
</style>
