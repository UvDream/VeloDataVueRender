<template>
    <a-table :columns="columns" :data-source="dataSource" :pagination="pagination ? undefined : false" :bordered="bordered"
        :size="tableSize" class="velo-table" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Table as ATable } from 'ant-design-vue'
import type { ComponentItem } from '../../types'

export interface TableProps {
    item: ComponentItem
}

const props = defineProps<TableProps>()

const columns = computed(() => props.item.props.tableColumns || [])
const dataSource = computed(() => props.item.props.tableData || [])
const bordered = computed(() => props.item.props.tableBordered !== false)
const tableSize = computed(() => props.item.props.tableSize || 'middle')
const pagination = computed(() => props.item.props.tablePagination !== false)
</script>

<style scoped lang="less">
:deep(.ant-table) {
    background: transparent;
    color: #fff;
}

:deep(.ant-table-thead > tr > th) {
    background: rgba(64, 158, 255, 0.15);
    color: #409eff;
    border-bottom: 2px solid rgba(64, 158, 255, 0.4);
}

:deep(.ant-table-tbody > tr > td) {
    border-bottom: 1px solid rgba(64, 158, 255, 0.2);
    color: rgba(255, 255, 255, 0.85);
}

:deep(.ant-table-tbody > tr:hover > td) {
    background: rgba(64, 158, 255, 0.08);
}
</style>
