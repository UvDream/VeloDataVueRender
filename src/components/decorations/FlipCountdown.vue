<template>
  <div class="flip-countdown" :style="containerStyle">
    <!-- Days -->
    <template v-if="showDays">
      <div class="flip-unit">
        <div class="flip-cards">
          <FlipCard v-for="(digit, index) in daysDigits" :key="'d' + index" :digit="digit" :width="cardWidth"
            :height="cardHeight" :font-size="fontSize" :background="cardBackground" :text-color="textColor" />
        </div>
        <div v-if="showLabels" class="flip-label" :style="{ color: labelColor }">天</div>
      </div>
      <div v-if="showHours || showMinutes || showSeconds" class="flip-separator" :style="{ color: textColor }">
        {{ separator }}
      </div>
    </template>

    <!-- Hours -->
    <template v-if="showHours">
      <div class="flip-unit">
        <div class="flip-cards">
          <FlipCard v-for="(digit, index) in hoursDigits" :key="'h' + index" :digit="digit" :width="cardWidth"
            :height="cardHeight" :font-size="fontSize" :background="cardBackground" :text-color="textColor" />
        </div>
        <div v-if="showLabels" class="flip-label" :style="{ color: labelColor }">时</div>
      </div>
      <div v-if="showMinutes || showSeconds" class="flip-separator" :style="{ color: textColor }">
        {{ separator }}
      </div>
    </template>

    <!-- Minutes -->
    <template v-if="showMinutes">
      <div class="flip-unit">
        <div class="flip-cards">
          <FlipCard v-for="(digit, index) in minutesDigits" :key="'m' + index" :digit="digit" :width="cardWidth"
            :height="cardHeight" :font-size="fontSize" :background="cardBackground" :text-color="textColor" />
        </div>
        <div v-if="showLabels" class="flip-label" :style="{ color: labelColor }">分</div>
      </div>
      <div v-if="showSeconds" class="flip-separator" :style="{ color: textColor }">
        {{ separator }}
      </div>
    </template>

    <!-- Seconds -->
    <template v-if="showSeconds">
      <div class="flip-unit">
        <div class="flip-cards">
          <FlipCard v-for="(digit, index) in secondsDigits" :key="'s' + index" :digit="digit" :width="cardWidth"
            :height="cardHeight" :font-size="fontSize" :background="cardBackground" :text-color="textColor" />
        </div>
        <div v-if="showLabels" class="flip-label" :style="{ color: labelColor }">秒</div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import type { ComponentItem } from '../../types'
import FlipCard from './FlipCard.vue'

interface DigitState {
  current: number
  next: number
  flipping: boolean
}

export interface FlipCountdownProps {
  item: ComponentItem
}

const props = defineProps<FlipCountdownProps>()

// Props extraction from item
const config = computed(() => props.item.props || {})
const countdownMode = computed(() => config.value.countdownMode || 'target')
const targetDate = computed(() => config.value.targetTime || config.value.targetDate || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString())
const countdownDuration = computed(() => config.value.countdownDuration || 3600)
const showDays = computed(() => config.value.showDays !== false)
const showHours = computed(() => config.value.showHours !== false)
const showMinutes = computed(() => config.value.showMinutes !== false)
const showSeconds = computed(() => config.value.showSeconds !== false)
const cardWidth = computed(() => config.value.cardWidth || 60)
const cardHeight = computed(() => config.value.cardHeight || 80)
const fontSize = computed(() => config.value.fontSize || 48)
const cardColorType = computed(() => config.value.cardColorType || 'gradient')
const cardSolidColor = computed(() => config.value.cardSolidColor || '#2a4a6a')
const cardGradientStart = computed(() => config.value.cardGradientStart || '#2a4a6a')
const cardGradientEnd = computed(() => config.value.cardGradientEnd || '#0a2a4a')
const textColor = computed(() => config.value.textColor || '#ffffff')
const labelColor = computed(() => config.value.labelColor || 'rgba(255, 255, 255, 0.6)')
const showLabels = computed(() => config.value.showLabels !== false)
const separator = computed(() => config.value.separator || ':')

// State
const daysDigits = ref<DigitState[]>([
  { current: 0, next: 0, flipping: false },
  { current: 0, next: 0, flipping: false }
])
const hoursDigits = ref<DigitState[]>([
  { current: 0, next: 0, flipping: false },
  { current: 0, next: 0, flipping: false }
])
const minutesDigits = ref<DigitState[]>([
  { current: 0, next: 0, flipping: false },
  { current: 0, next: 0, flipping: false }
])
const secondsDigits = ref<DigitState[]>([
  { current: 0, next: 0, flipping: false },
  { current: 0, next: 0, flipping: false }
])

const prevTime = ref({ d: 0, h: 0, m: 0, s: 0 })
const startTime = ref<number | null>(null)
let timer: any = null

const cardBackground = computed(() => {
  if (cardColorType.value === 'solid') {
    return cardSolidColor.value
  }
  return `linear-gradient(180deg, ${cardGradientStart.value} 0%, ${cardGradientEnd.value} 100%)`
})

const containerStyle = computed(() => ({
  // Any specific container styles if needed
}))

const updateDigitsState = (
  value: number,
  prevValue: number,
  digitsRef: any
) => {
  const currentStr = String(prevValue).padStart(2, '0')
  const nextStr = String(value).padStart(2, '0')

  for (let i = 0; i < 2; i++) {
    const currentDigit = parseInt(currentStr[i])
    const nextDigit = parseInt(nextStr[i])

    if (currentDigit !== nextDigit) {
      digitsRef.value[i] = {
        current: currentDigit,
        next: nextDigit,
        flipping: true
      }

      setTimeout(() => {
        digitsRef.value[i] = {
          current: nextDigit,
          next: nextDigit,
          flipping: false
        }
      }, 600)
    }
  }
}

const calculateTime = () => {
  let diff: number

  if (countdownMode.value === 'duration') {
    if (startTime.value === null) {
      startTime.value = Date.now()
    }
    const elapsed = Math.floor((Date.now() - startTime.value) / 1000)
    diff = Math.max(0, countdownDuration.value - elapsed) * 1000
  } else {
    const now = Date.now()
    const target = typeof targetDate.value === 'number' ? targetDate.value : new Date(targetDate.value).getTime()
    diff = Math.max(0, target - now)
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24))
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const s = Math.floor((diff % (1000 * 60)) / 1000)

  const prev = prevTime.value

  if (d !== prev.d) updateDigitsState(d, prev.d, daysDigits)
  if (h !== prev.h) updateDigitsState(h, prev.h, hoursDigits)
  if (m !== prev.m) updateDigitsState(m, prev.m, minutesDigits)
  if (s !== prev.s) updateDigitsState(s, prev.s, secondsDigits)

  prevTime.value = { d, h, m, s }
}

onMounted(() => {
  calculateTime()
  timer = setInterval(calculateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

watch([countdownMode, countdownDuration, targetDate], () => {
  if (countdownMode.value === 'duration') {
    startTime.value = null
  }
  calculateTime()
})
</script>

<style scoped lang="less">
.flip-countdown {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Arial', sans-serif;
  user-select: none;
}

.flip-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.flip-cards {
  display: flex;
  gap: 4px;
}

.flip-label {
  font-size: 14px;
  font-weight: normal;
}

.flip-separator {
  font-size: 32px;
  font-weight: bold;
  margin: 0 4px;
  align-self: center;
  margin-bottom: 20px;
}
</style>
