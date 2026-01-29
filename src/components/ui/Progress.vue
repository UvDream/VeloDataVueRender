<template>
    <a-progress :percent="percent" :type="progressType" :status="status" :stroke-color="strokeColor"
        :show-info="showInfo" :size="progressSize" class="velo-progress" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Progress as AProgress } from 'ant-design-vue'
import type { ComponentItem } from '../../types'

export interface ProgressProps {
    item: ComponentItem
}

const props = defineProps<ProgressProps>()

const percent = computed(() => {
    const value = props.item.props.percent || 0
    return Math.min(Math.max(value, 0), 100)
})

const progressType = computed(() => props.item.props.progressType || 'line')
const status = computed(() => props.item.props.status)
const showInfo = computed(() => props.item.props.showInfo !== false)
const progressSize = computed(() => props.item.props.progressSize || 'default')

const strokeColor = computed(() => {
    if (props.item.props.progressStrokeColor) {
        return props.item.props.progressStrokeColor
    }
    // 大屏默认渐变色
    return {
        '0%': '#409eff',
        '100%': '#66b1ff'
    }
})
</script>

<style scoped>
.velo-progress {
    font-family: inherit;
}

:deep(.ant-progress-text) {
    color: #ffffff;
    font-weight: 500;
}

:deep(.ant-progress-bg) {
    background: linear-gradient(90deg, #409eff 0%, #66b1ff 100%);
    box-shadow: 0 0 8px rgba(64, 158, 255, 0.4);
}

:deep(.ant-progress-inner) {
    background: rgba(10, 14, 39, 0.6);
    border: 1px solid rgba(64, 158, 255, 0.2);
}

/* Circle 和 Dashboard 类型 */
:deep(.ant-progress-circle-trail) {
    stroke: rgba(10, 14, 39, 0.6);
}

:deep(.ant-progress-circle-path) {
    filter: drop-shadow(0 0 6px rgba(64, 158, 255, 0.6));
}
</style>
