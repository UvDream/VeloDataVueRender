<template>
  <div class="renderer-item" :style="itemStyle" @click.stop="handleClick">
    <component :is="componentMap[item.type]" v-if="componentMap[item.type]" :item="item" :all-components="allComponents"
      :chart-theme="chartTheme" />
    <div v-else class="component-placeholder">
      {{ item.type }} (未实现)
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import type { ComponentItem, ComponentType, CanvasConfig } from '../types'

// 导入已实现的组件
// UI组件
import Text from './ui/Text.vue'
import Button from './ui/Button.vue'
import Input from './ui/Input.vue'
import Select from './ui/Select.vue'
import Switch from './ui/Switch.vue'
import Progress from './ui/Progress.vue'
import Tag from './ui/Tag.vue'
import Badge from './ui/Badge.vue'
import Avatar from './ui/Avatar.vue'
import Card from './ui/Card.vue'
import Table from './ui/Table.vue'
import ScrollRankList from './ui/ScrollRankList.vue'
import CarouselList from './ui/CarouselList.vue'
import Image from './ui/Image.vue'
import Carousel from './ui/Carousel.vue'
import Icon from './ui/Icon.vue'
import Container from './ui/Container.vue'

// 图表组件
import SingleLineChart from './charts/SingleLineChart.vue'
import DoubleLineChart from './charts/DoubleLineChart.vue'
import SingleBarChart from './charts/SingleBarChart.vue'
import DoubleBarChart from './charts/DoubleBarChart.vue'
import HorizontalBarChart from './charts/HorizontalBarChart.vue'
import PieChart from './charts/PieChart.vue'
import HalfPieChart from './charts/HalfPieChart.vue'
import GaugeChart from './charts/GaugeChart.vue'
import RadarChart from './charts/RadarChart.vue'
import ScatterChart from './charts/ScatterChart.vue'
import FunnelChart from './charts/FunnelChart.vue'
import WordCloudChart from './charts/WordCloudChart.vue'
import CalendarChart from './charts/CalendarChart.vue'
import MapChart from './charts/MapChart.vue'
import CityMapChart from './charts/CityMapChart.vue'
import TreeChart from './charts/TreeChart.vue'
import SankeyChart from './charts/SankeyChart.vue'

// 装饰组件
import BorderBox1 from './decorations/BorderBox1.vue'
import BorderBox2 from './decorations/BorderBox2.vue'
import BorderBox3 from './decorations/BorderBox3.vue'
import BorderBox4 from './decorations/BorderBox4.vue'
import BorderBox5 from './decorations/BorderBox5.vue'
import Decoration1 from './decorations/Decoration1.vue'
import Decoration2 from './decorations/Decoration2.vue'
import FullscreenButton from './decorations/FullscreenButton.vue'
import GradientText from './decorations/GradientText.vue'
import FuturisticTitle from './decorations/FuturisticTitle.vue'
import FlipCountdown from './decorations/FlipCountdown.vue'
import CustomImageBorder from './decorations/CustomImageBorder.vue'

// 布局组件
import LayoutTwoColumn from './layouts/LayoutTwoColumn.vue'
import LayoutThreeColumn from './layouts/LayoutThreeColumn.vue'
import LayoutHeader from './layouts/LayoutHeader.vue'
import LayoutSidebar from './layouts/LayoutSidebar.vue'
import LayoutCell from './layouts/LayoutCell.vue'

export interface RendererItemProps {
  item: ComponentItem
  allComponents: ComponentItem[]
  chartTheme?: CanvasConfig['chartTheme']
}

const props = defineProps<RendererItemProps>()

const emit = defineEmits<{
  click: []
}>()

// 组件映射表
const componentMap: Partial<Record<ComponentType, any>> = {
  // UI组件
  text: Text,
  button: Button,
  input: Input,
  select: Select,
  switch: Switch,
  progress: Progress,
  tag: Tag,
  badge: Badge,
  avatar: Avatar,
  card: Card,
  table: Table,
  scrollRankList: ScrollRankList,
  carouselList: CarouselList,
  image: Image,
  carousel: Carousel,
  icon: Icon,
  container: Container,

  // 图表组件
  singleLineChart: SingleLineChart,
  doubleLineChart: DoubleLineChart,
  singleBarChart: SingleBarChart,
  doubleBarChart: DoubleBarChart,
  horizontalBarChart: HorizontalBarChart,
  pieChart: PieChart,
  halfPieChart: HalfPieChart,
  gaugeChart: GaugeChart,
  radarChart: RadarChart,
  scatterChart: ScatterChart,
  funnelChart: FunnelChart,
  wordCloudChart: WordCloudChart,
  calendarChart: CalendarChart,
  mapChart: MapChart,
  cityMapChart: CityMapChart,
  treeChart: TreeChart,
  sankeyChart: SankeyChart,

  // 装饰组件
  borderBox1: BorderBox1,
  borderBox2: BorderBox2,
  borderBox3: BorderBox3,
  borderBox4: BorderBox4,
  borderBox5: BorderBox5,
  decoration1: Decoration1,
  decoration2: Decoration2,
  fullscreenButton: FullscreenButton,
  gradientText: GradientText,
  futuristicTitle: FuturisticTitle,
  flipCountdown: FlipCountdown,
  customImageBorder: CustomImageBorder,

  // 布局组件
  layoutTwoColumn: LayoutTwoColumn,
  layoutThreeColumn: LayoutThreeColumn,
  layoutHeader: LayoutHeader,
  layoutSidebar: LayoutSidebar,
  layoutCell: LayoutCell,
}

// 生成组件样式
const itemStyle = computed<CSSProperties>(() => {
  const { style } = props.item

  // 如果组件在布局容器内（有 parentId），使用静态定位和100%宽高
  if (props.item.parentId) {
    return {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: style.backgroundColor,
      color: style.color,
      fontSize: style.fontSize ? `${style.fontSize}px` : undefined,
      borderRadius: style.borderRadius ? `${style.borderRadius}px` : undefined,
      borderWidth: style.borderWidth ? `${style.borderWidth}px` : undefined,
      borderColor: style.borderColor,
      borderStyle: style.borderWidth ? 'solid' : undefined,
      opacity: style.opacity,
      zIndex: style.zIndex,
    }
  }

  // 否则使用绝对定位（画布根组件）
  return {
    position: 'absolute',
    left: `${style.x}px`,
    top: `${style.y}px`,
    width: `${style.width}px`,
    height: `${style.height}px`,
    backgroundColor: style.backgroundColor,
    color: style.color,
    fontSize: style.fontSize ? `${style.fontSize}px` : undefined,
    borderRadius: style.borderRadius ? `${style.borderRadius}px` : undefined,
    borderWidth: style.borderWidth ? `${style.borderWidth}px` : undefined,
    borderColor: style.borderColor,
    borderStyle: style.borderWidth ? 'solid' : undefined,
    opacity: style.opacity,
    zIndex: style.zIndex,
  }
})

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.renderer-item {
  box-sizing: border-box;
}

.component-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px dashed rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}
</style>
