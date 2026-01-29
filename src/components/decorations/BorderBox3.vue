<template>
  <div ref="containerRef" class="border-box-3" :style="containerStyle">
    <svg :width="width" :height="height">
      <defs>
        <!-- 定义边框路径 -->
        <path :id="pathId" :d="borderPath" fill="transparent" />

        <!-- 定义径向渐变 -->
        <radialGradient :id="gradientId" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="1" />
          <stop offset="100%" stop-color="#fff" stop-opacity="0" />
        </radialGradient>

        <!-- 定义遮罩 -->
        <mask :id="maskId">
          <circle cx="0" cy="0" r="150" :fill="`url(#${gradientId})`">
            <animateMotion :dur="`${animationDuration}s`" :path="borderPath" rotate="auto" repeatCount="indefinite" />
          </circle>
        </mask>
      </defs>

      <!-- 背景填充 -->
      <polygon fill="#00000000" :points="polygonPoints" />

      <!-- 基础边框 -->
      <use :stroke="borderColor" :stroke-width="borderWidth" :xlink:href="`#${pathId}`" />

      <!-- 动画光效边框 -->
      <use class="glow-line" :stroke="glowColor" :stroke-width="borderWidth + 2" :xlink:href="`#${pathId}`" :mask="`url(#${maskId})`">
        <animate attributeName="stroke-dasharray" :from="`0, ${pathLength}`" :to="`${pathLength}, 0`"
          :dur="`${animationDuration}s`" repeatCount="indefinite" />
      </use>
    </svg>

    <!-- 内容区域 -->
    <div class="border-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { ComponentItem } from '../../types'

export interface BorderBox3Props {
  item: ComponentItem
}

const props = defineProps<BorderBox3Props>()

const containerRef = ref<HTMLDivElement | null>(null)
const width = ref(300)
const height = ref(200)

const config = computed(() => props.item.props || {})
const borderColor = computed(() => config.value.borderColor || '#235fa7')
const glowColor = computed(() => config.value.glowColor || '#4fd2dd')
const borderWidth = computed(() => config.value.borderWidth || 1)
const animationDuration = computed(() => config.value.animationDuration || 3)

const randomId = Math.random().toString(36).substring(2, 9)
const pathId = `border-box-3-path-${randomId}`
const gradientId = `border-box-3-gradient-${randomId}`
const maskId = `border-box-3-mask-${randomId}`

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

const borderPath = computed(() => {
  const w = width.value
  const h = height.value
  const offset = 2.5
  return `M${offset}, ${offset} L${w - offset}, ${offset} L${w - offset}, ${h - offset} L${offset}, ${h - offset} L${offset}, ${offset}`
})

const polygonPoints = computed(() => {
  const w = width.value
  const h = height.value
  const offset = 5
  return `${offset}, ${offset} ${w - offset}, ${offset} ${w - offset} ${h - offset} ${offset}, ${h - offset}`
})

const pathLength = computed(() => {
  return 2 * (width.value + height.value) - 20
})
</script>

<style scoped>
.border-box-3 {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.border-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.glow-line {
  animation-timing-function: linear;
  filter: drop-shadow(0 0 3px var(--glow-color, #4fd2dd));
}
</style>
