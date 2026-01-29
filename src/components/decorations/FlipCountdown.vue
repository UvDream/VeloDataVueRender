<template>
    <div class="flip-countdown">
        <div class="countdown-item" v-for="(digit, index) in displayDigits" :key="index">
            <div class="digit-card">
                <div class="digit-top">{{ digit }}</div>
                <div class="digit-bottom">{{ digit }}</div>
            </div>
            <div class="digit-label" v-if="labels[index]">{{ labels[index] }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { ComponentItem } from '../../types'

export interface FlipCountdownProps {
    item: ComponentItem
}

const props = defineProps<FlipCountdownProps>()

const targetTime = computed(() => props.item.props.targetTime || Date.now() + 3600000)
const remaining = ref(0)

const displayDigits = computed(() => {
    const hours = Math.floor(remaining.value / 3600000)
    const minutes = Math.floor((remaining.value % 3600000) / 60000)
    const seconds = Math.floor((remaining.value % 60000) / 1000)

    return [
        Math.floor(hours / 10),
        hours % 10,
        Math.floor(minutes / 10),
        minutes % 10,
        Math.floor(seconds / 10),
        seconds % 10
    ]
})

const labels = ['', '时', '', '分', '', '秒']

let timer: any = null

const updateCountdown = () => {
    const now = Date.now()
    const target = typeof targetTime.value === 'number' ? targetTime.value : new Date(targetTime.value).getTime()
    remaining.value = Math.max(0, target - now)
}

onMounted(() => {
    updateCountdown()
    timer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
    if (timer) clearInterval(timer)
})
</script>

<style scoped>
.flip-countdown {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
}

.countdown-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

.digit-card {
    position: relative;
    width: 50px;
    height: 70px;
    background: rgba(10, 14, 39, 0.8);
    border: 1px solid #409eff;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(64, 158, 255, 0.3);
    overflow: hidden;
}

.digit-top,
.digit-bottom {
    position: absolute;
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: bold;
    color: #409eff;
    background: linear-gradient(180deg, rgba(64, 158, 255, 0.1), rgba(64, 158, 255, 0.05));
}

.digit-top {
    top: 0;
    border-bottom: 1px solid rgba(64, 158, 255, 0.2);
}

.digit-bottom {
    bottom: 0;
    align-items: flex-start;
    padding-top: 5px;
}

.digit-label {
    font-size: 12px;
    color: #409eff;
}
</style>
