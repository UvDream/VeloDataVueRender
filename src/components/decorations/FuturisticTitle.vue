<template>
  <div class="futuristic-title-wrapper">
    <svg class="futuristic-title-bg" viewBox="0 0 800 80" preserveAspectRatio="none">
      <defs>
        <linearGradient :id="`titleGradient-${randomId}`" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" :stop-color="titleGradientColor1" stop-opacity="0.1" />
          <stop offset="50%" :stop-color="titleGradientColor1" stop-opacity="0.3" />
          <stop offset="100%" :stop-color="titleGradientColor1" stop-opacity="0.1" />
        </linearGradient>
      </defs>

      <!-- Main Body -->
      <path d="M 50 10 L 750 10 L 780 40 L 750 70 L 50 70 L 20 40 Z" :fill="`url(#titleGradient-${randomId})`"
        :stroke="titleColor" stroke-width="1" opacity="0.6" />

      <!-- Top Border Accents -->
      <path d="M 100 10 L 700 10" :stroke="titleColor" stroke-width="2" opacity="0.8" />

      <!-- Bottom Main Border -->
      <path d="M 80 70 L 720 70" :stroke="titleColor" stroke-width="3" />

      <!-- Left Decoration -->
      <path d="M 20 40 L 40 40 L 50 30" fill="none" :stroke="titleColor" stroke-width="2" />
      <path d="M 20 40 L 40 40 L 50 50" fill="none" :stroke="titleColor" stroke-width="2" />

      <!-- Right Decoration -->
      <path d="M 780 40 L 760 40 L 750 30" fill="none" :stroke="titleColor" stroke-width="2" />
      <path d="M 780 40 L 760 40 L 750 50" fill="none" :stroke="titleColor" stroke-width="2" />

      <!-- Additional Glowing Lines -->
      <path d="M 200 75 L 600 75" :stroke="titleColor" stroke-width="1" stroke-dasharray="100 20" opacity="0.5" />
    </svg>

    <div class="futuristic-title-content">
      <h1 class="main-title" :style="titleStyle">
        {{ content }}
      </h1>
      <div v-if="subContent" class="sub-title" :style="subTitleStyle">
        {{ subContent }}
      </div>
    </div>

    <div class="glow-effect" :style="{ boxShadow: `0 0 20px ${titleColor}33` }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentItem } from '../../types'

export interface FuturisticTitleProps {
  item: ComponentItem
}

const props = defineProps<FuturisticTitleProps>()

const randomId = Math.random().toString(36).substring(2, 9)

const content = computed(() => props.item.props.content || '可视化大数据展示平台')
const subContent = computed(() => props.item.props.subtitle || props.item.props.subContent)
const titleColor = computed(() => props.item.props.titleColor || '#00ccff')
const fontSize = computed(() => props.item.props.fontSize || 24)

const titleGradientColor1 = computed(() => titleColor.value)

const titleStyle = computed(() => ({
  color: titleColor.value,
  fontSize: `${fontSize.value}px`,
  textShadow: `0 0 10px ${titleColor.value}80`
}))

const subTitleStyle = computed(() => ({
  color: titleColor.value,
  opacity: 0.7
}))
</script>

<style scoped>
.futuristic-title-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
}

.futuristic-title-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.futuristic-title-content {
  position: relative;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 60px;
}

.main-title {
  margin: 0;
  padding: 0;
  font-weight: bold;
  letter-spacing: 4px;
  font-family: 'Inter', 'PingFang SC', sans-serif;
  white-space: nowrap;
}

.sub-title {
  margin-top: 4px;
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-family: 'Arial', sans-serif;
}

.glow-effect {
  position: absolute;
  bottom: 10%;
  width: 60%;
  height: 2px;
  background: transparent;
  z-index: 1;
  pointer-events: none;
}
</style>
