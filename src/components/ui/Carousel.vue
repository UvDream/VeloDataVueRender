<template>
    <div class="velo-carousel">
        <a-carousel v-if="images.length > 0" :autoplay="autoplay" :autoplaySpeed="interval" :dots="showDots"
            :dotPosition="dotPosition" :effect="effect">
            <template v-if="showArrows" #prevArrow>
                <div class="carousel-arrow carousel-arrow-prev">
                    <LeftOutlined />
                </div>
            </template>
            <template v-if="showArrows" #nextArrow>
                <div class="carousel-arrow carousel-arrow-next">
                    <RightOutlined />
                </div>
            </template>
            <div v-for="(image, index) in images" :key="index" class="carousel-item">
                <img :src="image" :alt="`轮播图 ${index + 1}`" class="carousel-image" />
            </div>
        </a-carousel>
        <div v-else class="carousel-placeholder">
            暂无图片
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Carousel as ACarousel } from 'ant-design-vue'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import type { ComponentItem } from '../../types'

export interface CarouselProps {
    item: ComponentItem
}

const props = defineProps<CarouselProps>()

// 轮播图配置
const images = computed(() => props.item.props.carouselImages || [])
const config = computed(() => props.item.props.carouselConfig || {})

const autoplay = computed(() => config.value.autoplay ?? true)
const interval = computed(() => config.value.interval || 3000)
const showDots = computed(() => config.value.showDots ?? true)
const showArrows = computed(() => config.value.showArrows ?? true)
const effect = computed(() => {
    const e = config.value.effect
    // Map our simplified API to Ant Design's API
    if (e === 'slide') return 'scrollx'
    if (e === 'fade') return 'fade'
    return 'scrollx' // default
})
const dotPosition = computed(() => config.value.dotPosition || 'bottom')

</script>

<style scoped>
.velo-carousel {
    width: 100%;
    height: 100%;
}

:deep(.ant-carousel) {
    width: 100%;
    height: 100%;
}

:deep(.slick-slider),
:deep(.slick-list),
:deep(.slick-track) {
    height: 100%;
}

.carousel-item {
    width: 100%;
    height: 100%;
    display: flex !important;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.carousel-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.5);
    font-size: 16px;
}

.carousel-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s;
    z-index: 10;
}

.carousel-arrow:hover {
    background: rgba(0, 0, 0, 0.7);
}

.carousel-arrow-prev {
    left: 20px;
}

.carousel-arrow-next {
    right: 20px;
}

:deep(.slick-dots) {
    bottom: 20px;
}

:deep(.slick-dots li button) {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
}

:deep(.slick-dots li.slick-active button) {
    background: #fff;
}
</style>
