<template>
  <div class="border-box-5" :style="containerStyle">
    <!-- 装饰角 - 使用SVG以获得更精确的图形 -->
    <div class="corner-group">
      <div v-for="pos in positions" :key="pos" :class="['decoration-corner', pos]">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <path d="M 2 20 L 2 2 L 20 2" fill="none" :stroke="glowColor" stroke-width="3" />
          <path d="M 10 10 L 10 15 L 15 15 L 15 10 Z" :fill="glowColor" class="pulse-dot" />
        </svg>
      </div>
    </div>

    <!-- 扫描线 -->
    <div class="scan-line horizontal"></div>
    <div class="scan-line vertical"></div>

    <!-- 基础框线 -->
    <div class="main-frame"></div>

    <!-- 内容区域 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentItem } from '../../types'

export interface BorderBox5Props {
  item: ComponentItem
}

const props = defineProps<BorderBox5Props>()

const glowColor = computed(() => props.item.props.glowColor || '#00f2ff')
const borderColor = computed(() => props.item.props.borderColor || 'rgba(0, 242, 255, 0.3)')

const positions = ['tl', 'tr', 'bl', 'br']

const containerStyle = computed(() => ({
  '--glow-color': glowColor.value,
  '--border-color': borderColor.value,
}))
</script>

<style scoped>
.border-box-5 {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(0, 20, 40, 0.2);
}

.main-frame {
  position: absolute;
  inset: 5px;
  border: 1px solid var(--border-color);
  box-shadow: inset 0 0 15px rgba(0, 242, 255, 0.1);
  pointer-events: none;
}

.decoration-corner {
  position: absolute;
  width: 40px;
  height: 40px;
  z-index: 2;
  pointer-events: none;
}

.decoration-corner.tl { top: 0; left: 0; }
.decoration-corner.tr { top: 0; right: 0; transform: rotate(90deg); }
.decoration-corner.bl { bottom: 0; left: 0; transform: rotate(-90deg); }
.decoration-corner.br { bottom: 0; right: 0; transform: rotate(180deg); }

.pulse-dot {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

.scan-line {
  position: absolute;
  background: linear-gradient(90deg, transparent, var(--glow-color), transparent);
  opacity: 0.4;
  pointer-events: none;
  z-index: 1;
}

.scan-line.horizontal {
  width: 100%;
  height: 1px;
  top: 0;
  animation: scanH 4s linear infinite;
}

.scan-line.vertical {
  width: 1px;
  height: 100%;
  left: 0;
  background: linear-gradient(180deg, transparent, var(--glow-color), transparent);
  animation: scanV 6s linear infinite;
}

@keyframes scanH {
  0% { top: 0; opacity: 0; }
  10%, 90% { opacity: 0.4; }
  100% { top: 100%; opacity: 0; }
}

@keyframes scanV {
  0% { left: 0; opacity: 0; }
  10%, 90% { opacity: 0.4; }
  100% { left: 100%; opacity: 0; }
}

.content {
  position: relative;
  z-index: 3;
  width: 100%;
  height: 100%;
  padding: 25px;
  box-sizing: border-box;
}
</style>
