<template>
    <div class="futuristic-title">
        <div class="title-decoration left">
            <div class="deco-line"></div>
            <div class="deco-dots">
                <span></span><span></span><span></span>
            </div>
        </div>
        <div class="title-content">
            <div class="title-text">{{ title }}</div>
            <div class="title-subtitle" v-if="subtitle">{{ subtitle }}</div>
        </div>
        <div class="title-decoration right">
            <div class="deco-dots">
                <span></span><span></span><span></span>
            </div>
            <div class="deco-line"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentItem } from '../../types'

export interface FuturisticTitleProps {
    item: ComponentItem
}

const props = defineProps<FuturisticTitleProps>()

const title = computed(() => props.item.props.content || '科技标题')
const subtitle = computed(() => props.item.props.subtitle)
</script>

<style scoped>
.futuristic-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 20px 0;
}

.title-decoration {
    display: flex;
    align-items: center;
    gap: 10px;
}

.deco-line {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #409eff, transparent);
    position: relative;
}

.deco-line::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, #409eff, transparent);
    animation: pulse 2s ease-in-out infinite;
}

.deco-dots {
    display: flex;
    gap: 4px;
}

.deco-dots span {
    width: 6px;
    height: 6px;
    background: #409eff;
    border-radius: 50%;
    display: block;
    box-shadow: 0 0 6px #409eff;
    animation: blink 1.5s ease-in-out infinite;
}

.deco-dots span:nth-child(2) {
    animation-delay: 0.3s;
}

.deco-dots span:nth-child(3) {
    animation-delay: 0.6s;
}

.title-content {
    text-align: center;
}

.title-text {
    font-size: 28px;
    font-weight: bold;
    background: linear-gradient(135deg, #409eff, #66b1ff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 8px rgba(64, 158, 255, 0.5));
    letter-spacing: 2px;
}

.title-subtitle {
    font-size: 14px;
    color: rgba(64, 158, 255, 0.7);
    margin-top: 5px;
    letter-spacing: 1px;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 0.5;
    }

    50% {
        opacity: 1;
    }
}

@keyframes blink {

    0%,
    100% {
        opacity: 0.3;
    }

    50% {
        opacity: 1;
    }
}
</style>
