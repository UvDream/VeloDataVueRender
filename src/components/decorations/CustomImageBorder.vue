<template>
    <div class="custom-image-border" :style="borderStyle">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentItem } from '../../types'

export interface CustomImageBorderProps {
    item: ComponentItem
}

const props = defineProps<CustomImageBorderProps>()

const borderStyle = computed(() => {
    const borderImage = props.item.props.customBorderImage
    const slice = props.item.props.borderImageSlice || 30
    const width = props.item.props.borderImageWidth || 10
    const repeat = props.item.props.borderImageRepeat || 'stretch'

    if (borderImage) {
        return {
            borderImage: `url(${borderImage}) ${slice} ${repeat}`,
            borderWidth: `${width}px`,
            borderStyle: 'solid',
        }
    }

    return {
        border: '2px solid #409eff',
    }
})
</script>

<style scoped lang="less">
.custom-image-border {
    position: relative;
    width: 100%;
    height: 100%;
}

.content {
    width: 100%;
    height: 100%;
    padding: 10px;
}
</style>
