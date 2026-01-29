<template>
    <div class="fullscreen-button" :class="positionClass" @click="toggleFullscreen">
        <div class="button-icon">
            <svg v-if="!isFullscreen" width="24" height="24" viewBox="0 0 24 24">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                    fill="currentColor" />
            </svg>
            <svg v-else width="24" height="24" viewBox="0 0 24 24">
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                    fill="currentColor" />
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ComponentItem } from '../../types'

export interface FullscreenButtonProps {
    item: ComponentItem
}

const props = defineProps<FullscreenButtonProps>()

const isFullscreen = ref(false)
const positionClass = ref(props.item.props.position || 'top-right')

const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
        isFullscreen.value = true
    } else {
        document.exitFullscreen()
        isFullscreen.value = false
    }
}
</script>

<style scoped lang="less">
.fullscreen-button {
    position: fixed;
    z-index: 9999;
    width: 40px;
    height: 40px;
    background: rgba(64, 158, 255, 0.2);
    border: 1px solid #409eff;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.fullscreen-button:hover {
    background: rgba(64, 158, 255, 0.4);
    box-shadow: 0 0 12px rgba(64, 158, 255, 0.6);
    transform: scale(1.1);
}

.button-icon {
    color: #409eff;
    display: flex;
    align-items: center;
    justify-content: center;
}

.top-left {
    top: 20px;
    left: 20px;
}

.top-right {
    top: 20px;
    right: 20px;
}

.bottom-left {
    bottom: 20px;
    left: 20px;
}

.bottom-right {
    bottom: 20px;
    right: 20px;
}

.center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.center:hover {
    transform: translate(-50%, -50%) scale(1.1);
}
</style>
