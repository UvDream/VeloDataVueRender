<template>
  <div class="border-box-1">
    <svg class="border-box-svg" :width="width" :height="height">
      <!-- 四个角 -->
      <polyline
        class="corner corner-top-left"
        :points="`0,${cornerSize} 0,0 ${cornerSize},0`"
      />
      <polyline
        class="corner corner-top-right"
        :points="`${width - cornerSize},0 ${width},0 ${width},${cornerSize}`"
      />
      <polyline
        class="corner corner-bottom-right"
        :points="`${width},${height - cornerSize} ${width},${height} ${width - cornerSize},${height}`"
      />
      <polyline
        class="corner corner-bottom-left"
        :points="`${cornerSize},${height} 0,${height} 0,${height - cornerSize}`"
      />

      <!-- 中间装饰线 -->
      <line
        class="deco-line"
        :x1="cornerSize * 2"
        :y1="0"
        :x2="width - cornerSize * 2"
        :y2="0"
      />
      <line
        class="deco-line"
        :x1="width"
        :y1="cornerSize * 2"
        :x2="width"
        :y2="height - cornerSize * 2"
      />
      <line
        class="deco-line"
        :x1="cornerSize * 2"
        :y1="height"
        :x2="width - cornerSize * 2"
        :y2="height"
      />
      <line
        class="deco-line"
        :x1="0"
        :y1="cornerSize * 2"
        :x2="0"
        :y2="height - cornerSize * 2"
      />
    </svg>
    <div class="border-box-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentItem } from '../../types'

export interface BorderBox1Props {
  item: ComponentItem
}

const props = defineProps<BorderBox1Props>()

const width = computed(() => props.item.style.width)
const height = computed(() => props.item.style.height)
const cornerSize = computed(() => props.item.props.cornerSize || 10)
</script>

<style scoped>
.border-box-1 {
  position: relative;
  width: 100%;
  height: 100%;
}

.border-box-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.corner {
  fill: none;
  stroke: #00d4ff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  animation: glow 2s ease-in-out infinite;
}

.deco-line {
  stroke: rgba(0, 212, 255, 0.3);
  stroke-width: 1;
  stroke-dasharray: 5, 5;
  animation: dash 20s linear infinite;
}

.border-box-content {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}

@keyframes glow {
  0%, 100% {
    opacity: 1;
    filter: drop-shadow(0 0 5px #00d4ff);
  }
  50% {
    opacity: 0.7;
    filter: drop-shadow(0 0 10px #00d4ff);
  }
}

@keyframes dash {
  to {
    stroke-dashoffset: -100;
  }
}
</style>
