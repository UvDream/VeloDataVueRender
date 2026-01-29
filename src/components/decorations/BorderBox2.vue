<template>
  <div ref="containerRef" class="border-box-2" :style="containerStyle">
    <svg :width="width" :height="height">
      <!-- 主边框 -->
      <path class="main-border" fill="transparent" :stroke="borderColor" :stroke-width="borderWidth" :d="mainBorderPath" />

      <!-- 虚线装饰 -->
      <path class="dashed-decoration" fill="transparent" :stroke="borderColor" stroke-width="3" stroke-linecap="round"
        stroke-dasharray="10, 5" :d="dashedLinePath" />

      <!-- 左上角高亮 -->
      <path class="top-left-highlight" fill="transparent" :stroke="glowColor" :stroke-width="borderWidth + 1"
        :d="topLeftHighlightPath" />

      <!-- 右下角高亮 -->
      <path class="bottom-right-highlight" fill="transparent" :stroke="glowColor" :stroke-width="borderWidth + 1"
        :d="bottomRightHighlightPath" />
    </svg>

    <!-- 内容区域 -->
    <div class="border-content" :style="{ color: borderColor }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { ComponentItem } from '../../types'

export interface BorderBox2Props {
  item: ComponentItem
}

const props = defineProps<BorderBox2Props>()

const containerRef = ref<HTMLDivElement | null>(null)
const width = ref(300)
const height = ref(200)

const config = computed(() => props.item.props || {})
const borderColor = computed(() => config.value.borderColor || '#6586ec')
const glowColor = computed(() => config.value.glowColor || '#2cf7fe')
const borderWidth = computed(() => config.value.borderWidth || 2)

const containerStyle = computed(() => ({
  width: '100%',
  height: '100%',
  '--border-color': borderColor.value,
  '--glow-color': glowColor.value,
  '--border-width': `${borderWidth.value}px`
}))

const updateDimensions = () => {
  if (containerRef.value) {
    const { offsetWidth, offsetHeight } = containerRef.value
    if (offsetWidth > 0 && offsetHeight > 0) {
      width.value = offsetWidth
      height.value = offsetHeight
    }
  }
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  updateDimensions()
  resizeObserver = new ResizeObserver(updateDimensions)
  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})

const mainBorderPath = computed(() => {
  const w = width.value
  const h = height.value
  return `M 5 20 L 5 10 L 12 3 L 60 3 L 68 10 L ${w - 20} 10 L ${w - 5} 25 L ${w - 5} ${h - 5} L 20 ${h - 5} L 5 ${h - 20} L 5 20`
})

const dashedLinePath = "M 16 9 L 61 9"

const topLeftHighlightPath = "M 5 20 L 5 10 L 12 3 L 60 3 L 68 10"

const bottomRightHighlightPath = computed(() => {
  const w = width.value
  const h = height.value
  return `M ${w - 5} ${h - 30} L ${w - 5} ${h - 5} L ${w - 30} ${h - 5}`
})
</script>

<style scoped lang="less">
.border-box-2 {
  position: relative;
  overflow: hidden;
}

svg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
}

.main-border {
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.dashed-decoration {
  animation: dashMove 2s linear infinite;
  opacity: 0.9;
}

.top-left-highlight {
  animation: glowPulse 2s ease-in-out infinite alternate;
  filter: drop-shadow(0 0 4px var(--glow-color, #2cf7fe));
}

.bottom-right-highlight {
  animation: glowPulse 2s ease-in-out infinite alternate 1s;
  filter: drop-shadow(0 0 4px var(--glow-color, #2cf7fe));
}

.border-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  padding: 25px 20px 15px 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes dashMove {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 15;
  }
}

@keyframes glowPulse {
  0% {
    opacity: 0.6;
    stroke-width: var(--border-width, 2px);
  }
  100% {
    opacity: 1;
    stroke-width: calc(var(--border-width, 2px) + 2px);
  }
}

.border-box-2:hover .main-border {
  opacity: 1;
}

.border-box-2:hover .dashed-decoration {
  animation-duration: 1s;
}

.border-box-2:hover .top-left-highlight,
.border-box-2:hover .bottom-right-highlight {
  animation-duration: 1.5s;
  filter: drop-shadow(0 0 8px var(--glow-color, #2cf7fe));
}
</style>
