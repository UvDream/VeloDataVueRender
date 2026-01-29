<template>
  <div ref="containerRef" class="border-box-1" :style="containerStyle">
    <!-- 主边框 -->
    <svg class="main-border" :width="width" :height="height">
      <polygon fill="transparent" :stroke="borderColor" :stroke-width="borderWidth" :points="mainPolygonPoints" />
    </svg>

    <!-- 左上角装饰 -->
    <svg class="border-item left-top" :width="width" :height="height">
      <polygon class="corner-main" :fill="borderColor" :points="cornerPolygonPoints" />
      <polygon class="corner-small" :fill="glowColor" :points="smallPolygonPoints" />
      <polygon class="animation-bar" :fill="borderColor" :points="animationBarPoints" />
    </svg>

    <!-- 右上角装饰 -->
    <svg class="border-item right-top" :width="width" :height="height">
      <g :transform="`translate(${String(width)}, 0) scale(-1, 1)`">
        <polygon class="corner-main" :fill="borderColor" :points="cornerPolygonPoints" />
        <polygon class="corner-small" :fill="glowColor" :points="smallPolygonPoints" />
        <polygon class="animation-bar" :fill="borderColor" :points="animationBarPoints" />
      </g>
    </svg>

    <!-- 左下角装饰 -->
    <svg class="border-item left-bottom" :width="width" :height="height">
      <g :transform="`translate(0, ${String(height)}) scale(1, -1)`">
        <polygon class="corner-main" :fill="borderColor" :points="cornerPolygonPoints" />
        <polygon class="corner-small" :fill="glowColor" :points="smallPolygonPoints" />
        <polygon class="animation-bar" :fill="borderColor" :points="animationBarPoints" />
      </g>
    </svg>

    <!-- 右下角装饰 -->
    <svg class="border-item right-bottom" :width="width" :height="height">
      <g :transform="`translate(${String(width)}, ${String(height)}) scale(-1, -1)`">
        <polygon class="corner-main" :fill="borderColor" :points="cornerPolygonPoints" />
        <polygon class="corner-small" :fill="glowColor" :points="smallPolygonPoints" />
        <polygon class="animation-bar" :fill="borderColor" :points="animationBarPoints" />
      </g>
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

export interface BorderBox1Props {
  item: ComponentItem
}

const props = defineProps<BorderBox1Props>()

const containerRef = ref<HTMLDivElement | null>(null)
const width = ref(300)
const height = ref(200)

const config = computed(() => props.item.props || {})
const borderColor = computed(() => config.value.borderColor || '#4fd2dd')
const glowColor = computed(() => config.value.glowColor || '#235fa7')
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

const mainPolygonPoints = computed(() => {
  const w = width.value
  const h = height.value
  const offset = 10
  const corner = 24
  return `${offset},${corner + 3} ${offset},${h - corner - 3} ${offset + 3},${h - corner} ${offset + 3},${h - corner + 3} ${corner},${h - offset} ${corner + 3},${h - offset} ${w - corner - 3},${h - offset} ${w - corner},${h - corner + 3} ${w - corner},${h - corner} ${w - offset},${h - corner - 3} ${w - offset},${corner + 3} ${w - corner},${corner} ${w - corner},${corner - 3} ${w - corner - 3},${offset} ${corner + 3},${offset} ${corner},${corner - 3} ${corner},${corner} ${offset + 3},${corner + 3} ${offset + 3},${corner}`
})

const cornerPolygonPoints = "6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63"
const smallPolygonPoints = "27.6,4.8 38.4,4.8 35.4,7.8 30.6,7.8"
const animationBarPoints = "9,54 9,63 7.2,66 7.2,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54"
</script>

<style scoped lang="less">
.border-box-1 {
  position: relative;
  overflow: hidden;
}

.main-border {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
}

.border-item {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  pointer-events: none;
}

.corner-main {
  animation: cornerPulse 0.5s infinite alternate;
}

.corner-small {
  animation: cornerSmallPulse 0.5s infinite alternate;
}

.animation-bar {
  animation: barAnimation 1.5s infinite;
}

.border-content {
  position: relative;
  z-index: 3;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes cornerPulse {
  0% {
    fill: var(--border-color, #4fd2dd);
    opacity: 1;
  }

  50% {
    fill: var(--glow-color, #235fa7);
    opacity: 0.8;
  }

  100% {
    fill: var(--border-color, #4fd2dd);
    opacity: 1;
  }
}

@keyframes cornerSmallPulse {
  0% {
    fill: var(--glow-color, #235fa7);
    opacity: 1;
  }

  50% {
    fill: var(--border-color, #4fd2dd);
    opacity: 0.8;
  }

  100% {
    fill: var(--glow-color, #235fa7);
    opacity: 1;
  }
}

@keyframes barAnimation {
  0% {
    fill: var(--border-color, #4fd2dd);
    opacity: 1;
  }

  33% {
    fill: var(--glow-color, #235fa7);
    opacity: 0.8;
  }

  66% {
    fill: transparent;
    opacity: 0.3;
  }

  100% {
    fill: var(--border-color, #4fd2dd);
    opacity: 1;
  }
}

.border-box-1:hover .corner-main {
  animation-duration: 0.3s;
}

.border-box-1:hover .corner-small {
  animation-duration: 0.3s;
}

.border-box-1:hover .animation-bar {
  animation-duration: 1s;
}
</style>
