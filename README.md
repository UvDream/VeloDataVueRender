# VeloData Vue Renderer

<div align="center">

[![npm version](https://img.shields.io/npm/v/velo-data-vue-render.svg)](https://www.npmjs.com/package/velo-data-vue-render)
[![license](https://img.shields.io/npm/l/velo-data-vue-render.svg)](https://github.com/UvDream/velo-data-vue-render/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dm/velo-data-vue-render.svg)](https://www.npmjs.com/package/velo-data-vue-render)

**一个强大的 Vue 3 大屏可视化渲染器组件**

支持图表、3D效果、UI组件、装饰元素等50+组件类型

[文档](https://github.com/UvDream/velo-data-vue-render#readme) | [示例](https://github.com/UvDream/velo-data-vue-render/tree/main/examples) | [VisualizationDashboard编辑器](https://visualization-dashboard-sooty.vercel.app/)

</div>

## ✨ 特性

- 📊 **17种图表组件** - 基于ECharts的折线图、柱状图、饼图、地图等
- 🎨 **13种UI组件** - Ant Design Vue组件封装,适配大屏主题
- 🌟 **10种3D组件** - Three.js 3D地球、粒子系统、动画效果
- 🔲 **布局组件** - 灵活的多栏布局系统
- 📡 **数据源支持** - Mock数据和API接口,支持自动刷新
- 📱 **响应式** - 自动缩放适配不同屏幕尺寸
- 🎭 **主题系统** - 内置多种图表主题
- ⚡ **高性能** - 懒加载和优化的渲染性能
- 📦 **TypeScript** - 完整的类型定义
- 🎯 **Vue 3** - 基于 Composition API 构建

## 📦 安装

```bash
npm install velo-data-vue-render
# 或
yarn add velo-data-vue-render
# 或
pnpm add velo-data-vue-render
```

## 🚀 快速开始

### 方式1: 直接传入JSON数据 (推荐)

最简单的使用方式 - 直接导入编辑器导出的JSON文件:

```vue
<script setup lang="ts">
import { VeloRenderer } from 'velo-data-vue-render'
import 'velo-data-vue-render/dist/style.css'
import dashboardData from './dashboard.json'
</script>

<template>
  <VeloRenderer :data="dashboardData" />
</template>
```

JSON数据格式 (从VisualizationDashboard导出):
```json
{
  "canvasConfig": {
    "width": 1920,
    "height": 1080,
    "backgroundColor": "#0a0e27",
    "name": "我的大屏"
  },
  "components": [
    {
      "id": "1",
      "type": "text",
      "name": "标题",
      "props": { "content": "数据大屏", "fontSize": 48 },
      "style": { "x": 100, "y": 50, "width": 400, "height": 80 },
      "visible": true,
      "locked": false
    }
  ]
}
```

### 方式2: 分别传入配置 (向后兼容)

如果需要动态构建配置:

```vue
<script setup lang="ts">
import { VeloRenderer } from 'velo-data-vue-render'
import 'velo-data-vue-render/dist/style.css'

const config = {
  width: 1920,
  height: 1080,
  backgroundColor: '#0a0e27',
  name: '我的大屏',
}

const components = [
  {
    id: '1',
    type: 'text',
    name: '标题',
    props: {
      content: '数据大屏',
      fontSize: 48,
      color: '#ffffff',
    },
    style: {
      x: 100,
      y: 50,
      width: 400,
      height: 80,
    },
    visible: true,
    locked: false,
  },
  {
    id: '2',
    type: 'singleLineChart',
    name: '折线图',
    props: {
      chartTitle: '销售趋势',
      xAxisData: ['1月', '2月', '3月', '4月', '5月'],
      seriesData: [
        {
          name: '销售额',
          data: [120, 200, 150, 80, 70],
        },
      ],
    },
    style: {
      x: 100,
      y: 150,
      width: 600,
      height: 400,
    },
    visible: true,
    locked: false,
  },
]
</script>

<template>
  <VeloRenderer :config="config" :components="components" :auto-scale="true" />
</template>
```

### 使用API数据源

```vue
<script setup lang="ts">
const components = [
  {
    id: '1',
    type: 'pieChart',
    name: '销售占比',
    props: {
      chartTitle: '产品销售占比',
      dataSource: {
        type: 'api',
        apiConfig: {
          url: 'https://api.example.com/sales',
          method: 'GET',
          refreshInterval: 30, // 30秒自动刷新
          dataPath: 'data.pieData', // 数据路径
        },
      },
    },
    style: {
      x: 100,
      y: 100,
      width: 500,
      height: 400,
    },
    visible: true,
    locked: false,
  },
]
</script>
```

### 使用VisualizationDashboard编辑器

最佳实践是使用 [VisualizationDashboard编辑器](https://visualization-dashboard-sooty.vercel.app/) 可视化创建大屏,然后导出JSON配置:

```vue
<script setup lang="ts">
import { VeloRenderer } from 'velo-data-vue-render'
import dashboardConfig from './dashboard-config.json'
</script>

<template>
  <VeloRenderer
    :config="dashboardConfig.canvasConfig"
    :components="dashboardConfig.components"
    :auto-scale="true"
  />
</template>
```

## 📚 API

### VeloRenderer Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `data` | `VeloDataSchema` | - | 完整数据（推荐方式） |
| `config` | `CanvasConfig` | - | 画布配置 |
| `components` | `ComponentItem[]` | - | 组件列表 |
| `autoScale` | `boolean` | `true` | 是否自动缩放适应屏幕 |
| `className` | `string` | `''` | 自定义类名 |
| `style` | `CSSProperties` | `{}` | 自定义样式 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `componentClick` | `(id: string)` | 组件点击事件 |

## 🎨 支持的组件类型

### 图表组件 (17种)

- `singleLineChart` / `doubleLineChart` - 折线图
- `singleBarChart` / `doubleBarChart` - 柱状图
- `horizontalBarChart` - 横向柱状图
- `pieChart` / `halfPieChart` - 饼图/半环形图
- `gaugeChart` - 仪表盘
- `radarChart` - 雷达图
- `scatterChart` - 散点图
- `funnelChart` - 漏斗图
- `wordCloudChart` - 词云图
- `mapChart` / `cityMapChart` - 地图
- `calendarChart` - 日历热力图
- `treeChart` - 树形图
- `sankeyChart` - 桑基图

### UI组件 (13种)

- `text` - 文本
- `button` - 按钮
- `input` - 输入框
- `select` - 选择器
- `switch` - 开关
- `progress` - 进度条
- `tag` - 标签
- `badge` - 徽标
- `avatar` - 头像
- `card` - 卡片
- `table` - 表格
- `scrollRankList` - 滚动排名列表
- `carouselList` - 轮播列表

### 3D组件 (10种)

- `threeEarth` - 3D地球
- `threeParticles` - 粒子背景
- `threeCube` - 3D魔方
- `threeDNA` - DNA螺旋
- `threeWave` - 3D波浪
- `threeTorus` - 3D环形
- `threeGalaxy` - 星系
- `threeTunnel` - 时空隧道
- `threeMatrix` - 矩阵雨
- `threePlasma` - 等离子球

### 装饰组件

- `borderBox1/2/3` - 科技边框
- `decoration1/2` - 装饰元素
- `gradientText` - 渐变文字
- `flipCountdown` - 翻转倒计时
- `futuristicTitle` - 科技标题
- `fullscreenButton` - 全屏按钮
- `customImageBorder` - 自定义图片边框

### 布局组件

- `layoutTwoColumn` - 两栏布局
- `layoutThreeColumn` - 三栏布局
- `layoutHeader` - 头部布局
- `layoutSidebar` - 侧栏布局

### 媒体组件

- `image` - 图片
- `carousel` - 轮播图

## 🔧 高级用法

### 自定义组件点击事件

```vue
<script setup lang="ts">
const handleComponentClick = (id: string) => {
  console.log('点击了组件:', id)
  // 处理点击事件,如跳转详情页
}
</script>

<template>
  <VeloRenderer
    :config="config"
    :components="components"
    @component-click="handleComponentClick"
  />
</template>
```

### 禁用自动缩放

```vue
<template>
  <VeloRenderer
    :config="config"
    :components="components"
    :auto-scale="false"
  />
</template>
```

### 自定义容器样式

```vue
<template>
  <VeloRenderer
    :config="config"
    :components="components"
    class-name="my-dashboard"
    :style="{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }"
  />
</template>
```

## 🌐 浏览器支持

- Chrome ≥ 88
- Firefox ≥ 85
- Safari ≥ 14
- Edge ≥ 88

## 📝 许可证

MIT © ShutDown

## 🙏 致谢

- [Vue 3](https://vuejs.org/)
- [ECharts](https://echarts.apache.org/)
- [Ant Design Vue](https://antdv.com/)
- [Three.js](https://threejs.org/)
- [VisualizationDashboard](https://visualization-dashboard-sooty.vercel.app/)

## 🔗 相关链接

- [VisualizationDashboard编辑器](https://visualization-dashboard-sooty.vercel.app/)
- [问题反馈](https://github.com/UvDream/velo-data-vue-render/issues)
- [变更日志](https://github.com/UvDream/velo-data-vue-render/releases)

## 📅 开发状态

**当前版本**: 0.0.1 (开发中)

**已实现组件**:
- ✅ 核心渲染器
- ✅ Text (文本组件)
- ✅ SingleLineChart (单折线图)
- ✅ BorderBox1 (科技边框1)

**开发路线图**:
- 🔄 第二阶段: 完成所有图表组件 (17种)
- ⏳ 第三阶段: 完成UI和3D组件 (23种)
- ⏳ 第四阶段: 完成装饰和布局组件 (15种)
- ⏳ 第五阶段: 测试和正式发布
