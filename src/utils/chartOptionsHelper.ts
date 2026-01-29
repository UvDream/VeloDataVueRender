import type { ComponentItem, CanvasConfig } from '../types'
import { getChartOption } from './chartOptions'

/**
 * 获取主题颜色
 */
function getThemeColors(chartTheme?: CanvasConfig['chartTheme']): string[] | undefined {
    if (chartTheme?.type === 'preset' && chartTheme.presetName) {
        return getPresetThemeColors(chartTheme.presetName)
    }
    if (chartTheme?.type === 'custom' && chartTheme.customColors) {
        return chartTheme.customColors
    }
    return undefined
}

/**
 * 获取预设主题颜色
 */
function getPresetThemeColors(presetName: string): string[] {
    const presets: Record<string, string[]> = {
        default: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        blue: ['#00d4ff', '#0099ff', '#0066ff', '#0033ff', '#0000ff', '#3333ff', '#6666ff', '#9999ff', '#ccccff'],
        green: ['#00ff00', '#33ff33', '#66ff66', '#99ff99', '#00cc00', '#009900', '#006600', '#003300', '#ccffcc'],
        purple: ['#9a60b4', '#8a4daa', '#7a3a9f', '#6a2795', '#5a148a', '#4a0176', '#3a005b', '#2a0041', '#ccaadd'],
        warm: ['#ff6b6b', '#ee5a6f', '#f06595', '#cc5de8', '#be4bdb', '#f59f00', '#fab005', '#ffd43b', '#ff922b'],
        cool: ['#22b8cf', '#3bc9db', '#66d9e8', '#99e9f2', '#74c0fc', '#748ffc', '#5f3dc4', '#495057', '#adb5bd']
    }
    return presets[presetName] || presets.default
}

// ============ 图表构建函数 ============

export function buildSingleLineChartOption(props: ComponentItem['props'], chartTheme?: CanvasConfig['chartTheme']): Record<string, any> {
    return getChartOption('singleLineChart', props, getThemeColors(chartTheme))
}

export function buildDoubleLineChartOption(props: ComponentItem['props'], chartTheme?: CanvasConfig['chartTheme']): Record<string, any> {
    return getChartOption('doubleLineChart', props, getThemeColors(chartTheme))
}

export function buildSingleBarChartOption(props: ComponentItem['props'], chartTheme?: CanvasConfig['chartTheme']): Record<string, any> {
    return getChartOption('singleBarChart', props, getThemeColors(chartTheme))
}

export function buildDoubleBarChartOption(props: ComponentItem['props'], chartTheme?: CanvasConfig['chartTheme']): Record<string, any> {
    return getChartOption('doubleBarChart', props, getThemeColors(chartTheme))
}

export function buildHorizontalBarChartOption(props: ComponentItem['props'], chartTheme?: CanvasConfig['chartTheme']): Record<string, any> {
    return getChartOption('horizontalBarChart', props, getThemeColors(chartTheme))
}

export function buildPieChartOption(props: ComponentItem['props'], chartTheme?: CanvasConfig['chartTheme']): Record<string, any> {
    return getChartOption('pieChart', props, getThemeColors(chartTheme))
}

export function buildHalfPieChartOption(props: ComponentItem['props'], chartTheme?: CanvasConfig['chartTheme']): Record<string, any> {
    return getChartOption('halfPieChart', props, getThemeColors(chartTheme))
}

export function buildGaugeChartOption(props: ComponentItem['props'], chartTheme?: CanvasConfig['chartTheme']): Record<string, any> {
    return getChartOption('gaugeChart', props, getThemeColors(chartTheme))
}

export function buildRadarChartOption(props: ComponentItem['props'], chartTheme?: CanvasConfig['chartTheme']): Record<string, any> {
    return getChartOption('radarChart', props, getThemeColors(chartTheme))
}

export function buildScatterChartOption(props: ComponentItem['props'], chartTheme?: CanvasConfig['chartTheme']): Record<string, any> {
    return getChartOption('scatterChart', props, getThemeColors(chartTheme))
}

export function buildFunnelChartOption(props: ComponentItem['props'], chartTheme?: CanvasConfig['chartTheme']): Record<string, any> {
    return getChartOption('funnelChart', props, getThemeColors(chartTheme))
}

// 重新导出所有函数
export {
    getChartOption,
    getCalendarOption,
    createChartOptionKey,
    getCachedChartOption
} from './chartOptions'
