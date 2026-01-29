<template>
    <a-input v-model:value="inputValue" :placeholder="placeholder" :disabled="disabled" :readonly="readonly"
        :size="inputSize" :maxlength="maxlength" :allow-clear="allowClear" class="velo-input" @change="handleChange"
        @pressEnter="handlePressEnter" />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Input as AInput } from 'ant-design-vue'
import type { ComponentItem } from '../../types'

export interface InputProps {
    item: ComponentItem
}

const props = defineProps<InputProps>()
const emit = defineEmits<{
    change: [value: string]
    pressEnter: [value: string]
}>()

const inputValue = ref(props.item.props.value || '')
const placeholder = computed(() => props.item.props.placeholder || '请输入')
const disabled = computed(() => props.item.props.disabled || false)
const readonly = computed(() => props.item.props.readonly || false)
const inputSize = computed(() => props.item.props.inputSize || 'middle')
const maxlength = computed(() => props.item.props.maxLength)
const allowClear = computed(() => props.item.props.allowClear !== false)

const handleChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value
    emit('change', value)
}

const handlePressEnter = (e: Event) => {
    const value = (e.target as HTMLInputElement).value
    emit('pressEnter', value)
}

watch(() => props.item.props.value, (newValue) => {
    if (newValue !== inputValue.value) {
        inputValue.value = newValue || ''
    }
})
</script>

<style scoped>
.velo-input {
    font-family: inherit;
}

:deep(.ant-input) {
    background: rgba(10, 14, 39, 0.6);
    border: 1px solid rgba(64, 158, 255, 0.3);
    color: #ffffff;
    transition: all 0.3s ease;
}

:deep(.ant-input):hover {
    border-color: rgba(64, 158, 255, 0.6);
}

:deep(.ant-input):focus {
    border-color: #409eff;
    box-shadow: 0 0 8px rgba(64, 158, 255, 0.4);
    background: rgba(10, 14, 39, 0.8);
}

:deep(.ant-input::placeholder) {
    color: rgba(255, 255, 255, 0.4);
}

:deep(.ant-input-clear-icon) {
    color: rgba(255, 255, 255, 0.5);
}
</style>
