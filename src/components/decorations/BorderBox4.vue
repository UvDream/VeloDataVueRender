<template>
  <div class="border-box-4" :style="containerStyle">
    <div class="border-line-top"></div>
    <div class="border-line-bottom"></div>
    <div class="corner-highlight tl"></div>
    <div class="corner-highlight tr"></div>
    <div class="corner-highlight bl"></div>
    <div class="corner-highlight br"></div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentItem } from '../../types'

export interface BorderBox4Props {
  item: ComponentItem
}

const props = defineProps<BorderBox4Props>()

const glowColor = computed(() => props.item.props.glowColor || '#409eff')
const borderColor = computed(() => props.item.props.borderColor || '#409eff')

const containerStyle = computed(() => ({
  '--glow-color': glowColor.value,
  '--border-color': borderColor.value,
  background: 'rgba(10, 14, 39, 0.4)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${borderColor.value}44`,
  boxShadow: `inset 0 0 20px ${glowColor.value}22, 0 0 10px ${glowColor.value}11`,
}))
</script>

<style scoped lang="less">
.border-box-4 {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.border-line-top,
.border-line-bottom {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--glow-color), transparent);
  opacity: 0.6;
}

.border-line-top {
  top: 0;
  animation: slideTop 3s linear infinite;
}

.border-line-bottom {
  bottom: 0;
  animation: slideBottom 3s linear infinite;
}

@keyframes slideTop {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes slideBottom {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.corner-highlight {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 2px solid var(--glow-color);
  opacity: 0.8;
  filter: drop-shadow(0 0 5px var(--glow-color));
}

.tl { top: 0; left: 0; border-right: none; border-bottom: none; }
.tr { top: 0; right: 0; border-left: none; border-bottom: none; }
.bl { bottom: 0; left: 0; border-right: none; border-top: none; }
.br { bottom: 0; right: 0; border-left: none; border-top: none; }

.content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>
