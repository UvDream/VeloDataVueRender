<template>
    <div class="velo-image" :style="containerStyle">
        <a-image :src="imageSrc" :alt="imageAlt" :preview="previewEnabled" :fallback="fallbackSrc" :style="imageStyle"
            class="velo-image-inner" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Image as AImage } from 'ant-design-vue'
import type { ComponentItem } from '../../types'

export interface ImageProps {
    item: ComponentItem
}

const props = defineProps<ImageProps>()

// 图片源
const imageSrc = computed(() => props.item.props.src || '')
const imageAlt = computed(() => props.item.props.alt || '图片')
const previewEnabled = computed(() => props.item.props.preview ?? true)
const fallbackSrc = computed(() => props.item.props.fallback || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="rgba(0,0,0,0.5)" font-family="sans-serif" font-size="18" dy="10" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E加载失败%3C/text%3E%3C/svg%3E')

// 图片适配模式
const objectFit = computed(() => props.item.props.objectFit || 'contain')

// 容器样式
const containerStyle = computed(() => ({
    width: '100%',
    height: '100%',
    overflow: 'hidden',
}))

// 图片样式
const imageStyle = computed(() => ({
    width: '100%',
    height: '100%',
    objectFit: objectFit.value,
    display: 'block',
}))
</script>

<style scoped lang="less">
.velo-image {
    width: 100%;
    height: 100%;
}

.velo-image-inner {
    width: 100%;
    height: 100%;
}

:deep(.ant-image) {
    width: 100%;
    height: 100%;
    display: block;
}

:deep(.ant-image-img) {
    display: block;
}
</style>
