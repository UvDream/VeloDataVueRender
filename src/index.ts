// 主渲染器组件
import VeloRendererComponent from './components/VeloRenderer.vue'

// 具名导出
export { VeloRendererComponent as VeloRenderer }
export type { VeloDataSchema } from './components/VeloRenderer.vue'

// 默认导出（支持 import VeloRenderer from 'velo-data-vue-render'）
export default VeloRendererComponent

// 类型导出
export type {
    // 核心类型
    ComponentType,
    ComponentCategory,
    ComponentItem,
    ComponentStyle,
    ComponentProps,
    CanvasConfig,
    DataSourceConfig,
    // 图表配置类型
    ChartAxisConfig,
    ChartSymbolConfig,
    ChartLegendConfig,
} from './types'

// 样式
import './styles/index.less'
