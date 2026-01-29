<template>
  <div
    class="velo-renderer-container"
    :class="className"
    :style="containerStyle"
  >
    <div
      ref="canvasRef"
      class="velo-renderer-canvas"
      :style="canvasStyle"
    >
      <!-- 只渲染顶层组件，子组件由 LayoutCell 渲染 -->
      <RendererItem
        v-for="item in topLevelComponents"
        :key="item.id"
        :item="item"
        :all-components="components"
        :chart-theme="config?.chartTheme"
        @click="handleComponentClick(item.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type CSSProperties } from 'vue'
import type { CanvasConfig, ComponentItem } from '../types'
import RendererItem from './RendererItem.vue'

/** 编辑器导出的完整数据结构 */
export interface VeloDataSchema {
  /** 画布配置 */
  canvasConfig: CanvasConfig
  /** 组件列表 */
  components: ComponentItem[]
}

export interface VeloRendererProps {
  /** 
   * 方式1: 直接传入编辑器导出的完整JSON数据 
   * 推荐使用此方式
   */
  data?: VeloDataSchema

  /** 
   * 方式2: 分别传入画布配置和组件列表 (向后兼容)
   */
  config?: CanvasConfig
  components?: ComponentItem[]

  /** 是否自动缩放适应屏幕 */
  autoScale?: boolean
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  style?: CSSProperties
}

const props = withDefaults(defineProps<VeloRendererProps>(), {
  autoScale: true,
  className: '',
  style: () => ({})
})

const emit = defineEmits<{
  componentClick: [id: string]
}>()

// 从data或单独的config/components中提取数据
const config = computed(() => props.data?.canvasConfig || props.config)
const components = computed(() => props.data?.components || props.components || [])

// 验证必需的数据
if (!config.value) {
  console.error('VeloRenderer: 缺少必需的数据。请传入 data 或 config+components')
}

const canvasRef = ref<HTMLDivElement>()
const scale = ref(1)

// 计算顶层组件（没有 parentId 的组件）
const topLevelComponents = computed(() => {
  return components.value.filter(item => item.visible !== false && !item.parentId)
})

// 自动缩放计算
const calculateScale = () => {
  if (!props.autoScale || !config.value) return

  const canvasWidth = config.value.width || 1920
  const canvasHeight = config.value.height || 1080
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  // 计算缩放比例，保持宽高比
  const scaleX = windowWidth / canvasWidth
  const scaleY = windowHeight / canvasHeight
  const newScale = Math.min(scaleX, scaleY, 1) // 最大不超过1

  scale.value = newScale
}

// 生成背景样式
const getBackgroundStyle = (): CSSProperties => {
  if (!config.value) return {}

  const baseStyle: CSSProperties = {
    backgroundColor: config.value.backgroundColor || '#000000',
  }

  // 只有当背景类型为图片且有背景图片时才应用背景图片样式
  if (config.value.backgroundType === 'image' && config.value.backgroundImage) {
    const opacity = config.value.backgroundImageOpacity ?? 1
    const mode = config.value.backgroundImageMode || 'cover'

    switch (mode) {
      case 'tile':
        baseStyle.backgroundImage = `url(${config.value.backgroundImage})`
        baseStyle.backgroundRepeat = 'repeat'
        baseStyle.backgroundSize = 'auto'
        baseStyle.backgroundPosition = 'top left'
        baseStyle.opacity = opacity
        break
      case 'stretch':
        baseStyle.backgroundImage = `url(${config.value.backgroundImage})`
        baseStyle.backgroundRepeat = 'no-repeat'
        baseStyle.backgroundSize = '100% 100%'
        baseStyle.backgroundPosition = 'center'
        baseStyle.opacity = opacity
        break
      case 'cover':
        baseStyle.backgroundImage = `url(${config.value.backgroundImage})`
        baseStyle.backgroundRepeat = 'no-repeat'
        baseStyle.backgroundSize = 'cover'
        baseStyle.backgroundPosition = 'center'
        baseStyle.opacity = opacity
        break
      case 'contain':
        baseStyle.backgroundImage = `url(${config.value.backgroundImage})`
        baseStyle.backgroundRepeat = 'no-repeat'
        baseStyle.backgroundSize = 'contain'
        baseStyle.backgroundPosition = 'center'
        baseStyle.opacity = opacity
        break
      case 'center':
        baseStyle.backgroundImage = `url(${config.value.backgroundImage})`
        baseStyle.backgroundRepeat = 'no-repeat'
        baseStyle.backgroundSize = 'auto'
        baseStyle.backgroundPosition = 'center'
        baseStyle.opacity = opacity
        break
    }
  }

  return baseStyle
}

// 容器样式
const containerStyle = computed<CSSProperties>(() => ({
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...props.style
}))

// 画布样式
const canvasStyle = computed<CSSProperties>(() => ({
  width: `${config.value?.width || 1920}px`,
  height: `${config.value?.height || 1080}px`,
  position: 'relative',
  transform: props.autoScale ? `scale(${scale.value})` : undefined,
  transformOrigin: 'center center',
  ...getBackgroundStyle(),
}))

// 处理组件点击
const handleComponentClick = (id: string) => {
  emit('componentClick', id)
}

onMounted(() => {
  if (props.autoScale) {
    calculateScale()
    window.addEventListener('resize', calculateScale)
  }
})

onUnmounted(() => {
  if (props.autoScale) {
    window.removeEventListener('resize', calculateScale)
  }
})
</script>

<style scoped>
.velo-renderer-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.velo-renderer-canvas {
  position: relative;
}
</style>
