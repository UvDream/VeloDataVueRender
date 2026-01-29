<template>
  <div class="flip-card" :style="{ width: width + 'px', height: height + 'px' }">
    <!-- 上半部分 - 当前数字 -->
    <div class="flip-card-upper" :style="cardStyle">
      <div class="flip-card-number">{{ digit.current }}</div>
    </div>

    <!-- 下半部分 - 当前数字 -->
    <div class="flip-card-lower" :style="cardStyle">
      <div class="flip-card-number">{{ digit.current }}</div>
    </div>

    <!-- 翻动的上半部分 -->
    <template v-if="digit.flipping">
      <div class="flip-card-upper-flip" :style="cardStyle">
        <div class="flip-card-number">{{ digit.current }}</div>
      </div>

      <div class="flip-card-lower-flip" :style="cardStyle">
        <div class="flip-card-number">{{ digit.next }}</div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface DigitState {
  current: number
  next: number
  flipping: boolean
}

const props = defineProps<{
  digit: DigitState
  width: number
  height: number
  fontSize: number
  background: string
  textColor: string
}>()

const cardStyle = computed(() => ({
  background: props.background,
  color: props.textColor,
  fontSize: props.fontSize + 'px',
}))
</script>

<style scoped lang="less">
.flip-card {
  position: relative;
  perspective: 1000px;
  border-radius: 8px;
  overflow: hidden;
}

.flip-card-upper,
.flip-card-lower,
.flip-card-upper-flip,
.flip-card-lower-flip {
  position: absolute;
  left: 0;
  right: 0;
  height: 50%;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(64, 158, 255, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1.5px solid rgba(64, 158, 255, 0.8);
}

.flip-card-upper,
.flip-card-upper-flip {
  top: 0;
  border-radius: 8px 8px 0 0;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
  z-index: 2;
}

.flip-card-upper::after,
.flip-card-upper-flip::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
}

.flip-card-lower,
.flip-card-lower-flip {
  bottom: 0;
  border-radius: 0 0 8px 8px;
  border-top: 0.5px solid rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.flip-card-number {
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.flip-card-upper .flip-card-number,
.flip-card-upper-flip .flip-card-number {
  top: 0;
  height: 200%;
}

.flip-card-lower .flip-card-number,
.flip-card-lower-flip .flip-card-number {
  bottom: 0;
  height: 200%;
}

.flip-card-upper-flip {
  transform-origin: bottom;
  animation: flipDown 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 3;
}

.flip-card-lower-flip {
  transform-origin: top;
  animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
}

@keyframes flipDown {
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(-180deg);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
