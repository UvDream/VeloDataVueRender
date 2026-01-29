# 本地测试指南

## 方式1：npm link（推荐用于开发调试）

### 步骤1：在 VeloDataVueRender 项目中创建链接
```bash
cd /Users/wangzhongjie/Desktop/wzj/react/VeloDataVueRender
npm link
```

### 步骤2：在测试项目中使用链接
```bash
cd /path/to/VeloDataTestVue
npm link velo-data-vue-render
```

### 步骤3：在测试项目中使用

#### **默认导入（推荐）**
```vue
<script setup>
import VeloRenderer from 'velo-data-vue-render'
import 'velo-data-vue-render/dist/style.css'

const dashboardData = {
  config: {
    width: 1920,
    height: 1080,
    backgroundColor: '#0a0e27'
  },
  components: [
    {
      id: '1',
      type: 'singleLineChart',
      props: {
        chartTitle: '测试折线图',
        xAxisData: ['周一', '周二', '周三', '周四', '周五'],
        seriesData: [120, 200, 150, 80, 70]
      },
      style: {
        x: 100,
        y: 100,
        width: 600,
        height: 400
      }
    }
  ]
}
</script>

<template>
  <VeloRenderer :data="dashboardData" />
</template>
```

#### **具名导入**
```vue
<script setup>
import { VeloRenderer } from 'velo-data-vue-render'
import 'velo-data-vue-render/dist/style.css'
// ... 其余代码相同
</script>
```

---

## 方式2：直接引用 dist 文件（快速测试）

在测试项目的 `vite.config.js` 中添加别名：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'velo-data-vue-render': resolve(__dirname, '../VeloDataVueRender/dist/velo-data-vue-render.es.js')
    }
  }
})
```

然后正常使用即可。

---

## 方式3：创建本地测试页面（无需额外项目）

在 VeloDataVueRender 项目中创建 `example/` 目录进行测试：

```bash
# 在 VeloDataVueRender 根目录
mkdir -p example/src
```

创建 `example/index.html`、`example/src/main.ts`、`example/src/App.vue` 等测试文件。

---

## 常见问题

### 1. 报错：does not provide an export named 'default'
✅ **已修复**！重新构建后即可。

### 2. 样式不显示
确保导入了 CSS：
```js
import 'velo-data-vue-render/dist/style.css'
```

### 3. npm link 失败
尝试以下命令：
```bash
# 清除旧链接
npm unlink velo-data-vue-render

# 在 VeloDataVueRender 项目
npm link

# 在测试项目
npm link velo-data-vue-render
```

### 4. 修改代码后不生效
每次修改后需要重新构建：
```bash
cd /Users/wangzhongjie/Desktop/wzj/react/VeloDataVueRender
npm run build
```

---

## 测试数据示例

### 多图表示例
```javascript
const dashboardData = {
  config: {
    width: 1920,
    height: 1080,
    backgroundColor: '#0a0e27',
    chartTheme: {
      type: 'preset',
      presetName: 'blue'
    }
  },
  components: [
    // 折线图
    {
      id: 'chart1',
      type: 'singleLineChart',
      props: {
        chartTitle: '月度销售额趋势',
        xAxisData: ['1月', '2月', '3月', '4月', '5月', '6月'],
        seriesData: [820, 932, 901, 934, 1290, 1330]
      },
      style: { x: 50, y: 50, width: 800, height: 400 }
    },
    
    // 柱状图
    {
      id: 'chart2',
      type: 'singleBarChart',
      props: {
        chartTitle: '产品销量排行',
        xAxisData: ['产品A', '产品B', '产品C', '产品D', '产品E'],
        seriesData: [320, 302, 301, 334, 390]
      },
      style: { x: 900, y: 50, width: 800, height: 400 }
    },
    
    // 饼图
    {
      id: 'chart3',
      type: 'pieChart',
      props: {
        chartTitle: '市场份额',
        pieData: [
          { name: '直接访问', value: 335 },
          { name: '邮件营销', value: 310 },
          { name: '联盟广告', value: 234 },
          { name: '视频广告', value: 135 },
          { name: '搜索引擎', value: 1548 }
        ]
      },
      style: { x: 50, y: 500, width: 600, height: 500 }
    },
    
    // 雷达图
    {
      id: 'chart4',
      type: 'radarChart',
      props: {
        chartTitle: '产品能力评估',
        radarIndicators: [
          { name: '性能', max: 100 },
          { name: '稳定性', max: 100 },
          { name: '易用性', max: 100 },
          { name: '功能', max: 100 },
          { name: '成本', max: 100 }
        ],
        radarData: [[85, 90, 75, 88, 70]]
      },
      style: { x: 700, y: 500, width: 600, height: 500 }
    },
    
    // 文本组件
    {
      id: 'text1',
      type: 'text',
      props: {
        text: '数据大屏标题',
        fontSize: 48,
        fontWeight: 'bold'
      },
      style: {
        x: 760,
        y: 0,
        width: 400,
        height: 60,
        color: '#ffffff'
      }
    }
  ]
}
```

---

## 开发建议

1. **监听模式**：建议配置 `npm run dev` 监听文件变化自动构建
2. **热重载**：测试项目使用 Vite 开发服务器可实现热重载
3. **调试**：使用浏览器开发工具查看组件渲染和控制台日志
