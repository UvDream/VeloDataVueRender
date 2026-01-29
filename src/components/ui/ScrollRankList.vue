<template>
    <div class="scroll-rank-list">
        <div class="rank-item" v-for="(item, index) in displayList" :key="index">
            <div class="rank-index" :class="`rank-${index + 1}`">{{ index + 1 }}</div>
            <div class="rank-name">{{ item.name }}</div>
            <div class="rank-bar">
                <div class="bar-fill" :style="{ width: `${item.percent}%` }"></div>
            </div>
            <div class="rank-value">{{ item.value }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { ComponentItem } from '../../types'

export interface ScrollRankListProps {
    item: ComponentItem
}

const props = defineProps<ScrollRankListProps>()

const rankListData = computed(() => props.item.props.rankListData || [])
const displayList = ref<Array<{ name: string; value: number; percent: number }>>([])

let timer: any = null

// 计算百分比并初始化
const initList = () => {
    const max = Math.max(...rankListData.value.map((item: any) => item.value))
    displayList.value = rankListData.value.map((item: any) => ({
        name: item.name,
        value: item.value,
        percent: max > 0 ? (item.value / max) * 100 : 0
    }))
}

onMounted(() => {
    initList()
})

onUnmounted(() => {
    if (timer) clearInterval(timer)
})
</script>

<style scoped>
.scroll-rank-list {
    width: 100%;
    padding: 10px;
}

.rank-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    transition: all 0.3s ease;
}

.rank-index {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 4px;
    background: rgba(64, 158, 255, 0.2);
    color: #409eff;
    font-weight: bold;
    margin-right: 12px;
}

.rank-1 {
    background: linear-gradient(135deg, #FFD700, #FFA500);
    color: #fff;
}

.rank-2 {
    background: linear-gradient(135deg, #C0C0C0, #808080);
    color: #fff;
}

.rank-3 {
    background: linear-gradient(135deg, #CD7F32, #8B4513);
    color: #fff;
}

.rank-name {
    flex: 1;
    color: #fff;
    margin-right: 12px;
}

.rank-bar {
    flex: 2;
    height: 20px;
    background: rgba(10, 14, 39, 0.6);
    border-radius: 10px;
    overflow: hidden;
    margin-right: 12px;
}

.bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #409eff 0%, #66b1ff 100%);
    transition: width 0.5s ease;
    box-shadow: 0 0 8px rgba(64, 158, 255, 0.6);
}

.rank-value {
    width: 80px;
    text-align: right;
    color: #409eff;
    font-weight: bold;
}
</style>
