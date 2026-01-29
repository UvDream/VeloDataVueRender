<template>
  <div
    class="text-component"
    :style="textStyle"
  >
    {{ item.props.content }}
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import type { ComponentItem } from '../../types'

export interface TextProps {
  item: ComponentItem
}

const props = defineProps<TextProps>()

const textStyle = computed<CSSProperties>(() => {
  const { props: itemProps } = props.item
  return {
    fontSize: itemProps.fontSize ? `${itemProps.fontSize}px` : undefined,
    fontWeight: itemProps.fontWeight,
    color: itemProps.color,
    textAlign: itemProps.textAlign,
    textDecoration: itemProps.textDecoration,
    textTransform: itemProps.textTransform,
    fontStyle: itemProps.fontStyle,
    letterSpacing: itemProps.letterSpacing ? `${itemProps.letterSpacing}px` : undefined,
    lineHeight: itemProps.lineHeight,
    textShadow: itemProps.textShadow
      ? `${itemProps.shadowOffsetX || 0}px ${itemProps.shadowOffsetY || 0}px ${itemProps.shadowBlur || 0}px ${itemProps.shadowColor || 'rgba(0,0,0,0.5)'}`
      : undefined,
    opacity: itemProps.opacity,
    backgroundColor: itemProps.backgroundColor,
    borderRadius: itemProps.borderRadius ? `${itemProps.borderRadius}px` : undefined,
    borderWidth: itemProps.borderWidth ? `${itemProps.borderWidth}px` : undefined,
    borderColor: itemProps.borderColor,
    borderStyle: itemProps.borderWidth ? 'solid' : undefined,
    padding: itemProps.padding ? `${itemProps.padding}px` : undefined,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: itemProps.textAlign === 'center' ? 'center' : itemProps.textAlign === 'right' ? 'flex-end' : 'flex-start',
    boxSizing: 'border-box',
  }
})
</script>

<style scoped>
.text-component {
  word-wrap: break-word;
  word-break: break-word;
}
</style>
