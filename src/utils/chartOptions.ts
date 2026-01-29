import type { ComponentItem } from '../types'
import { CALENDAR_MONTH_NAMES, CALENDAR_DAY_NAMES } from '../config/constants'

/**
 * 构建轴配置
 */
const buildAxisConfig = (axisConfig: any, defaultType: string, defaultData?: any[]) => {
    const config: any = {
        type: axisConfig?.type || defaultType,
        show: axisConfig?.show !== false,
        name: axisConfig?.name,
        nameLocation: axisConfig?.nameLocation,
        nameGap: axisConfig?.nameGap,
        position: axisConfig?.position,
    }

    // 名称文本样式
    if (axisConfig?.nameTextStyle) {
        config.nameTextStyle = {
            color: axisConfig.nameTextStyle.color || '#fff',
            fontSize: axisConfig.nameTextStyle.fontSize || 12,
            fontWeight: axisConfig.nameTextStyle.fontWeight || 'normal',
        }
    }

    // 轴线
    if (axisConfig?.axisLine) {
        config.axisLine = {
            show: axisConfig.axisLine.show !== false,
            lineStyle: {
                color: axisConfig.axisLine.lineStyle?.color || '#ccc',
                width: axisConfig.axisLine.lineStyle?.width || 1,
                type: axisConfig.axisLine.lineStyle?.type || 'solid',
            }
        }
    }

    // 刻度线
    if (axisConfig?.axisTick) {
        config.axisTick = {
            show: axisConfig.axisTick.show !== false,
            lineStyle: {
                color: axisConfig.axisTick.lineStyle?.color || '#ccc',
                width: axisConfig.axisTick.lineStyle?.width || 1,
            }
        }
    }

    // 轴标签
    if (axisConfig?.axisLabel) {
        config.axisLabel = {
            show: axisConfig.axisLabel.show !== false,
            color: axisConfig.axisLabel.color || '#fff',
            fontSize: axisConfig.axisLabel.fontSize || 12,
            fontWeight: axisConfig.axisLabel.fontWeight || 'normal',
            rotate: axisConfig.axisLabel.rotate || 0,
            margin: axisConfig.axisLabel.margin || 8,
        }
    }

    // 分割线
    if (axisConfig?.splitLine) {
        config.splitLine = {
            show: axisConfig.splitLine.show !== false,
            lineStyle: {
                color: axisConfig.splitLine.lineStyle?.color || '#333',
                width: axisConfig.splitLine.lineStyle?.width || 1,
                type: axisConfig.splitLine.lineStyle?.type || 'solid',
                opacity: axisConfig.splitLine.lineStyle?.opacity || 1,
            }
        }
    }

    // 分割区域
    if (axisConfig?.splitArea) {
        config.splitArea = {
            show: axisConfig.splitArea.show !== false,
            areaStyle: {
                color: axisConfig.splitArea.areaStyle?.color || ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
                opacity: axisConfig.splitArea.areaStyle?.opacity || 0.3,
            }
        }
    }

    // 数据
    if (defaultData) {
        config.data = defaultData
    }

    return config
}

/**
 * 构建系列数据
 */
const buildSeriesData = (type: string, props: ComponentItem['props']) => {
    const commonSeries = props.seriesData?.map(s => {
        const baseSeries = {
            ...s,
            type: (type === 'singleLineChart' || type === 'doubleLineChart') ? 'line' :
                (type === 'singleBarChart' || type === 'doubleBarChart' || type === 'horizontalBarChart') ? 'bar' :
                    type === 'scatterChart' ? 'scatter' :
                        type === 'radarChart' ? 'radar' : 'line'
        }

        // 为折线图添加符号配置
        if (type === 'singleLineChart' || type === 'doubleLineChart') {
            const symbolConfig = s.symbolConfig || props.symbolConfig
            if (symbolConfig) {
                return {
                    ...baseSeries,
                    showSymbol: symbolConfig.show !== false,
                    symbol: symbolConfig.type || 'circle',
                    symbolSize: symbolConfig.size || 4,
                    symbolRotate: symbolConfig.type === 'arrow' ? 0 : undefined,
                    itemStyle: {
                        color: symbolConfig.color || '#c23531',
                        borderColor: symbolConfig.borderColor || '#fff',
                        borderWidth: symbolConfig.borderWidth || 1,
                        opacity: symbolConfig.opacity || 1
                    }
                }
            }
        }

        // 为散点图也支持符号配置
        if (type === 'scatterChart') {
            const symbolConfig = s.symbolConfig || props.symbolConfig
            if (symbolConfig) {
                return {
                    ...baseSeries,
                    symbol: symbolConfig.type && symbolConfig.type !== 'none' ? symbolConfig.type : 'circle',
                    symbolSize: symbolConfig.size || 10,
                    itemStyle: {
                        color: symbolConfig.color || '#c23531',
                        borderColor: symbolConfig.borderColor || '#fff',
                        borderWidth: symbolConfig.borderWidth || 0,
                        opacity: symbolConfig.opacity || 1
                    }
                }
            }
        }

        return baseSeries
    }) || []

    // Fallback demos if no data provided
    if (commonSeries.length === 0) {
        if (type === 'singleLineChart' || type === 'doubleLineChart') {
            commonSeries.push({ name: 'Demo', data: [150, 230, 224, 218, 135, 147, 260], type: 'line', smooth: true } as any)
        }
        if (type === 'singleBarChart' || type === 'doubleBarChart' || type === 'horizontalBarChart') {
            commonSeries.push({ name: 'Demo', data: [120, 200, 150, 80, 70, 110, 130], type: 'bar' } as any)
        }
        if (type === 'scatterChart') {
            commonSeries.push({ name: 'Demo', data: [[10, 20], [20, 30], [30, 50], [40, 60], [50, 80], [60, 90]], type: 'scatter' } as any)
        }
    }

    return commonSeries
}

/**
 * 获取图表配置
 * @param type 图表类型
 * @param props 组件属性
 * @param themeColors 主题颜色数组（可选）
 * @returns ECharts 配置对象
 */
export function getChartOption(type: string, props: ComponentItem['props'], themeColors?: string[]): Record<string, any> {
    const baseOption = {
        backgroundColor: 'transparent',
        color: themeColors, // 应用主题颜色
        title: props.chartTitle ? { text: props.chartTitle, left: 'center', textStyle: { color: '#fff' } } : undefined,
        grid: {
            top: props.chartTitle ? 40 : 30,
            right: props.legend?.show && props.legend.orient === 'vertical' && props.legend.left === 'right' ? 100 : 20,
            bottom: props.legend?.show && props.legend.top === 'bottom' ? 60 : 30,
            left: props.legend?.show && props.legend.orient === 'vertical' && props.legend.left === 'left' ? 100 : 40,
        },
        tooltip: { trigger: 'axis' },
        legend: props.legend?.show ? {
            show: true,
            orient: props.legend.orient || 'horizontal',
            left: props.legend.left || 'center',
            top: props.legend.top || 'top',
            textStyle: {
                color: props.legend.textStyle?.color || '#fff',
                fontSize: props.legend.textStyle?.fontSize || 12,
                fontWeight: props.legend.textStyle?.fontWeight || 'normal',
            },
        } : { show: false },
    }

    const xAxis = buildAxisConfig(props.xAxisConfig, 'category', props.xAxisData || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
    const yAxis = buildAxisConfig(props.yAxisConfig, 'value')
    const commonSeries = buildSeriesData(type, props)

    switch (type) {
        case 'singleLineChart':
        case 'doubleLineChart':
            return { ...baseOption, xAxis, yAxis, series: commonSeries }
            
        case 'singleBarChart':
        case 'doubleBarChart':
            return { ...baseOption, xAxis, yAxis, series: commonSeries }
            
        case 'horizontalBarChart':
            return {
                ...baseOption,
                xAxis: buildAxisConfig(props.xAxisConfig, 'value'),
                yAxis: buildAxisConfig(props.yAxisConfig, 'category', props.xAxisData || ['产品A', '产品B', '产品C', '产品D', '产品E']),
                series: commonSeries
            }
            
        case 'scatterChart':
            return {
                ...baseOption,
                xAxis: {},
                yAxis: {},
                series: commonSeries.length ? commonSeries : [{
                    type: 'scatter',
                    data: [[10, 20], [20, 30], [30, 50], [40, 60], [50, 80], [60, 90]],
                }],
            }
            
        case 'radarChart':
            return buildRadarOption(baseOption, props)
            
        case 'pieChart':
            return buildPieOption(baseOption, props, false)
            
        case 'halfPieChart':
            return buildPieOption(baseOption, props, true)
            
        case 'funnelChart':
            return buildFunnelOption(baseOption, props)
            
        case 'gaugeChart':
            return {
                ...baseOption,
                series: [{
                    type: 'gauge',
                    progress: { show: true },
                    detail: { formatter: '{value}%' },
                    data: [{ value: props.singleData ?? 70 }],
                }],
            }

        case 'treeChart':
            return buildTreeOption(baseOption, props)

        case 'sankeyChart':
            return buildSankeyOption(baseOption, props)

        default:
            return baseOption
    }
}

/**
 * 构建雷达图配置
 */
function buildRadarOption(baseOption: any, props: ComponentItem['props']) {
    const radarConfig = props.radarConfig || {}
    const radarSeriesConfig = props.radarSeriesConfig || {}
    const radarIndicator = radarConfig.indicator || [
        { name: '销售', max: 100 },
        { name: '管理', max: 100 },
        { name: '技术', max: 100 },
        { name: '客服', max: 100 },
        { name: '研发', max: 100 },
    ]

    const radarSeriesData = props.seriesData?.map(s => ({
        name: s.name,
        value: Array.isArray(s.data[0]) ? s.data[0] : s.data,
        areaStyle: radarSeriesConfig.areaStyle?.show ? {
            opacity: radarSeriesConfig.areaStyle?.opacity || 0.3
        } : undefined,
        lineStyle: {
            width: radarSeriesConfig.lineStyle?.width || 2
        },
        symbol: radarSeriesConfig.symbol || 'circle',
        symbolSize: radarSeriesConfig.symbolSize || 6,
    })) || [{ value: [80, 60, 90, 70, 85], name: '默认' }]

    return {
        ...baseOption,
        radar: {
            shape: radarConfig.shape || 'polygon',
            radius: `${radarConfig.radius || 65}%`,
            indicator: radarIndicator,
            axisLine: {
                show: radarConfig.axisLine?.show !== false,
                lineStyle: {
                    color: radarConfig.axisLine?.lineStyle?.color || 'rgba(255,255,255,0.3)',
                    width: radarConfig.axisLine?.lineStyle?.width || 1,
                }
            },
            splitLine: {
                show: radarConfig.splitLine?.show !== false,
                lineStyle: {
                    color: radarConfig.splitLine?.lineStyle?.color || 'rgba(255,255,255,0.3)',
                    width: radarConfig.splitLine?.lineStyle?.width || 1,
                }
            },
            splitArea: {
                show: radarConfig.splitArea?.show !== false,
                areaStyle: {
                    color: radarConfig.splitArea?.areaStyle?.color || ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.05)']
                }
            },
            axisName: {
                color: radarConfig.axisName?.color || '#fff',
                fontSize: radarConfig.axisName?.fontSize || 12,
                fontWeight: radarConfig.axisName?.fontWeight || 'normal',
            }
        },
        series: [{
            type: 'radar',
            data: radarSeriesData,
        }],
    }
}

/**
 * 构建饼图配置
 */
function buildPieOption(baseOption: any, props: ComponentItem['props'], isHalf: boolean) {
    const pieConfig = props.pieConfig || {}
    
    return {
        ...baseOption,
        tooltip: { trigger: 'item' },
        series: [{
            type: 'pie',
            radius: pieConfig.radius || (isHalf ? ['40%', '70%'] : ['0%', '70%']),
            center: pieConfig.center || (isHalf ? ['50%', '70%'] : ['50%', '50%']),
            ...(isHalf ? { startAngle: 180, endAngle: 360 } : {}),
            roseType: pieConfig.roseType || false,
            itemStyle: {
                borderRadius: pieConfig.borderRadius || 0,
                borderWidth: pieConfig.borderWidth || 0,
                borderColor: pieConfig.borderColor || '#000',
                shadowBlur: pieConfig.itemStyle?.shadowBlur || 0,
                shadowColor: pieConfig.itemStyle?.shadowColor || 'rgba(0,0,0,0.5)',
            },
            label: {
                show: pieConfig.label?.show !== false,
                position: pieConfig.label?.position || 'outside',
                color: pieConfig.label?.color || '#fff',
                fontSize: pieConfig.label?.fontSize || 12,
                formatter: pieConfig.label?.formatter || '{b}: {d}%',
            },
            labelLine: {
                show: pieConfig.labelLine?.show !== false,
                length: pieConfig.labelLine?.length || 10,
                length2: pieConfig.labelLine?.length2 || 10,
                lineStyle: {
                    color: pieConfig.labelLine?.lineStyle?.color || '#fff',
                    width: pieConfig.labelLine?.lineStyle?.width || 1,
                }
            },
            data: props.pieData || [
                { value: 1048, name: 'A' },
                { value: 735, name: 'B' },
                { value: 580, name: 'C' },
                { value: 484, name: 'D' },
            ],
        }],
    }
}

/**
 * 构建树形图配置
 */
function buildTreeOption(baseOption: any, props: ComponentItem['props']) {
    const treeConfig = props.treeConfig || {}
    
    // 默认树形数据
    const defaultTreeData = {
        name: '根节点',
        children: [
            {
                name: '分支1',
                children: [
                    { name: '叶子1-1', value: 10 },
                    { name: '叶子1-2', value: 15 },
                    { name: '叶子1-3', value: 8 }
                ]
            },
            {
                name: '分支2',
                children: [
                    { name: '叶子2-1', value: 12 },
                    { name: '叶子2-2', value: 20 },
                    {
                        name: '子分支2-3',
                        children: [
                            { name: '叶子2-3-1', value: 5 },
                            { name: '叶子2-3-2', value: 7 }
                        ]
                    }
                ]
            },
            {
                name: '分支3',
                children: [
                    { name: '叶子3-1', value: 18 },
                    { name: '叶子3-2', value: 9 }
                ]
            }
        ]
    }

    return {
        ...baseOption,
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            formatter: (params: any) => {
                return `${params.name}${params.value ? `: ${params.value}` : ''}`
            }
        },
        series: [{
            type: 'tree',
            data: [props.treeData || defaultTreeData],
            top: treeConfig.top || '10%',
            left: treeConfig.left || '10%',
            bottom: treeConfig.bottom || '10%',
            right: treeConfig.right || '10%',
            symbolSize: treeConfig.symbolSize || 7,
            orient: treeConfig.orient || 'LR', // LR: 左右, TB: 上下, RL: 右左, BT: 下上
            expandAndCollapse: treeConfig.expandAndCollapse !== false,
            animationDuration: treeConfig.animationDuration || 550,
            animationDurationUpdate: treeConfig.animationDurationUpdate || 750,
            initialTreeDepth: treeConfig.initialTreeDepth || -1, // -1 表示展开所有层级
            label: {
                show: treeConfig.label?.show !== false,
                position: treeConfig.label?.position || 'left',
                verticalAlign: treeConfig.label?.verticalAlign || 'middle',
                align: treeConfig.label?.align || 'right',
                fontSize: treeConfig.label?.fontSize || 12,
                color: treeConfig.label?.color || '#fff',
                fontWeight: treeConfig.label?.fontWeight || 'normal',
                backgroundColor: treeConfig.label?.backgroundColor || 'transparent',
                borderColor: treeConfig.label?.borderColor || 'transparent',
                borderWidth: treeConfig.label?.borderWidth || 0,
                borderRadius: treeConfig.label?.borderRadius || 0,
                padding: treeConfig.label?.padding || [2, 4]
            },
            leaves: {
                label: {
                    show: treeConfig.leaves?.label?.show !== false,
                    position: treeConfig.leaves?.label?.position || 'right',
                    verticalAlign: treeConfig.leaves?.label?.verticalAlign || 'middle',
                    align: treeConfig.leaves?.label?.align || 'left',
                    fontSize: treeConfig.leaves?.label?.fontSize || 12,
                    color: treeConfig.leaves?.label?.color || '#fff',
                    fontWeight: treeConfig.leaves?.label?.fontWeight || 'normal'
                }
            },
            itemStyle: {
                color: treeConfig.itemStyle?.color || '#1890ff',
                borderColor: treeConfig.itemStyle?.borderColor || '#fff',
                borderWidth: treeConfig.itemStyle?.borderWidth || 1
            },
            lineStyle: {
                color: treeConfig.lineStyle?.color || '#ccc',
                width: treeConfig.lineStyle?.width || 1,
                curveness: treeConfig.lineStyle?.curveness || 0.5
            },
            emphasis: {
                focus: 'descendant',
                itemStyle: {
                    color: treeConfig.emphasis?.itemStyle?.color || '#ff7875',
                    borderColor: treeConfig.emphasis?.itemStyle?.borderColor || '#fff',
                    borderWidth: treeConfig.emphasis?.itemStyle?.borderWidth || 2
                },
                lineStyle: {
                    color: treeConfig.emphasis?.lineStyle?.color || '#ff7875',
                    width: treeConfig.emphasis?.lineStyle?.width || 2
                }
            }
        }]
    }
}
/**
 * 构建桑基图配置
 */
function buildSankeyOption(baseOption: any, props: ComponentItem['props']) {
    const sankeyConfig = props.sankeyConfig || {}
    
    // 默认桑基图数据
    const defaultSankeyData = {
        nodes: [
            { name: '农业' },
            { name: '工业' },
            { name: '服务业' },
            { name: '出口' },
            { name: '消费' },
            { name: '投资' },
            { name: 'GDP' }
        ],
        links: [
            { source: '农业', target: 'GDP', value: 10 },
            { source: '工业', target: 'GDP', value: 40 },
            { source: '服务业', target: 'GDP', value: 50 },
            { source: 'GDP', target: '出口', value: 20 },
            { source: 'GDP', target: '消费', value: 60 },
            { source: 'GDP', target: '投资', value: 20 }
        ]
    }

    const sankeyData = props.sankeyData || defaultSankeyData

    return {
        ...baseOption,
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            formatter: (params: any) => {
                if (params.dataType === 'edge') {
                    return `${params.data.source} → ${params.data.target}<br/>数值: ${params.data.value}`
                } else {
                    return `${params.name}<br/>数值: ${params.value || '—'}`
                }
            }
        },
        series: [{
            type: 'sankey',
            data: sankeyData.nodes || [],
            links: sankeyData.links || [],
            orient: sankeyConfig.orient || 'horizontal',
            nodeWidth: sankeyConfig.nodeWidth || 20,
            nodeGap: sankeyConfig.nodeGap || 8,
            layoutIterations: sankeyConfig.layoutIterations || 32,
            nodeAlign: sankeyConfig.nodeAlign || 'justify',
            draggable: sankeyConfig.draggable !== false,
            focusNodeAdjacency: sankeyConfig.focusNodeAdjacency || 'allEdges',
            levels: sankeyConfig.levels || [],
            label: {
                show: sankeyConfig.label?.show !== false,
                position: sankeyConfig.label?.position || 'right',
                color: sankeyConfig.label?.color || '#fff',
                fontSize: sankeyConfig.label?.fontSize || 12,
                fontWeight: sankeyConfig.label?.fontWeight || 'normal',
                formatter: sankeyConfig.label?.formatter || '{b}'
            },
            itemStyle: {
                color: sankeyConfig.itemStyle?.color,
                borderColor: sankeyConfig.itemStyle?.borderColor || '#fff',
                borderWidth: sankeyConfig.itemStyle?.borderWidth || 1,
                borderRadius: sankeyConfig.itemStyle?.borderRadius || 0,
                opacity: sankeyConfig.itemStyle?.opacity || 0.7
            },
            lineStyle: {
                color: sankeyConfig.lineStyle?.color || 'gradient',
                opacity: sankeyConfig.lineStyle?.opacity || 0.2,
                curveness: sankeyConfig.lineStyle?.curveness || 0.5
            },
            emphasis: {
                itemStyle: {
                    color: sankeyConfig.emphasis?.itemStyle?.color,
                    borderColor: sankeyConfig.emphasis?.itemStyle?.borderColor || '#fff',
                    borderWidth: sankeyConfig.emphasis?.itemStyle?.borderWidth || 2
                },
                lineStyle: {
                    opacity: sankeyConfig.emphasis?.lineStyle?.opacity || 0.6
                },
                label: {
                    color: sankeyConfig.emphasis?.label?.color,
                    fontSize: sankeyConfig.emphasis?.label?.fontSize
                }
            }
        }]
    }
}

function buildFunnelOption(baseOption: any, props: ComponentItem['props']) {
    return {
        ...baseOption,
        tooltip: { trigger: 'item', formatter: '{b}: {c}' },
        series: [{
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
                show: true,
                position: 'inside',
                color: '#fff',
                fontSize: 12,
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1,
            },
            data: props.funnelData || [
                { value: 100, name: '展示' },
                { value: 80, name: '点击' },
                { value: 60, name: '访问' },
                { value: 40, name: '咨询' },
                { value: 20, name: '订单' }
            ],
        }],
    }
}

/**
 * 获取日历热力图配置
 */
export function getCalendarOption(props: ComponentItem['props']): Record<string, any> {
    const year = props.calendarYear || new Date().getFullYear()
    const data = props.calendarData || []
    const colors = props.calendarColors || ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']
    const cellSize = props.calendarCellSize || 15
    const lang = props.calendarLang || 'zh'

    const monthNameMap = CALENDAR_MONTH_NAMES
    const dayNameMap = CALENDAR_DAY_NAMES

    const showLegend = props.legend?.show !== false
    const legendOrient = props.legend?.orient || 'horizontal'
    const legendLeft = props.legend?.left || 'center'
    const legendTop = props.legend?.top || 'bottom'

    // 根据图例位置调整日历位置
    let calendarTop = 40
    let calendarBottom = 20
    let calendarLeft = 50
    let calendarRight = 30

    if (showLegend) {
        if (legendTop === 'top') {
            calendarTop = 70
        } else if (legendTop === 'bottom') {
            calendarBottom = 50
        }

        if (legendOrient === 'vertical') {
            if (legendLeft === 'left') {
                calendarLeft = 100
            } else if (legendLeft === 'right') {
                calendarRight = 100
            }
        }
    }

    // 构建 visualMap 配置
    const visualMapConfig: any = showLegend ? {
        min: 0,
        max: 100,
        calculable: true,
        orient: legendOrient,
        inRange: { color: colors },
        textStyle: {
            color: props.legend?.textStyle?.color || '#fff',
            fontSize: props.legend?.textStyle?.fontSize || 12,
            fontWeight: props.legend?.textStyle?.fontWeight || 'normal'
        }
    } : { show: false }

    // 设置图例位置
    if (showLegend) {
        if (legendOrient === 'horizontal') {
            visualMapConfig.left = legendLeft
            if (legendTop === 'top') {
                visualMapConfig.top = 10
            } else if (legendTop === 'bottom') {
                visualMapConfig.bottom = 10
            } else {
                visualMapConfig.top = 'middle'
            }
        } else {
            visualMapConfig.top = legendTop === 'middle' ? 'center' : legendTop
            if (legendLeft === 'left') {
                visualMapConfig.left = 10
            } else if (legendLeft === 'right') {
                visualMapConfig.right = 10
            } else {
                visualMapConfig.left = 'center'
            }
        }
    }

    return {
        backgroundColor: 'transparent',
        title: props.chartTitle ? {
            text: props.chartTitle,
            left: 'center',
            textStyle: { color: '#fff', fontSize: 16 }
        } : undefined,
        tooltip: {
            formatter: (params: any) => `${params.value[0]}: ${params.value[1]}`
        },
        visualMap: visualMapConfig,
        calendar: {
            top: calendarTop,
            left: calendarLeft,
            right: calendarRight,
            bottom: calendarBottom,
            cellSize: ['auto', cellSize],
            range: year,
            itemStyle: {
                borderWidth: 2,
                borderColor: '#1a1a1a'
            },
            yearLabel: {
                show: props.calendarYearLabel?.show !== false,
                color: props.calendarYearLabel?.color || '#fff',
                fontSize: props.calendarYearLabel?.fontSize || 14
            },
            monthLabel: {
                show: props.calendarMonthLabel?.show !== false,
                color: props.calendarMonthLabel?.color || '#fff',
                fontSize: props.calendarMonthLabel?.fontSize || 12,
                nameMap: monthNameMap[lang]
            },
            dayLabel: {
                show: props.calendarDayLabel?.show !== false,
                color: props.calendarDayLabel?.color || '#fff',
                fontSize: props.calendarDayLabel?.fontSize || 12,
                firstDay: props.calendarDayLabel?.firstDay ?? 1,
                nameMap: dayNameMap[lang]
            },
            splitLine: {
                lineStyle: { color: '#333' }
            }
        },
        series: [{
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: data
        }]
    }
}

/**
 * 创建图表配置的缓存 key
 */
export function createChartOptionKey(type: string, props: ComponentItem['props']): string {
    return JSON.stringify({ type, props })
}

// 简单的图表配置缓存
const chartOptionCache = new Map<string, { option: any; timestamp: number }>()
const CACHE_TTL = 5000 // 5秒缓存

/**
 * 获取缓存的图表配置
 */
export function getCachedChartOption(type: string, props: ComponentItem['props'], themeColors?: string[]): Record<string, any> {
    const key = createChartOptionKey(type, props) + (themeColors ? JSON.stringify(themeColors) : '')
    const cached = chartOptionCache.get(key)
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.option
    }
    
    const option = getChartOption(type, props, themeColors)
    chartOptionCache.set(key, { option, timestamp: Date.now() })
    
    // 限制缓存大小
    if (chartOptionCache.size > 100) {
        const firstKey = chartOptionCache.keys().next().value
        if (firstKey) chartOptionCache.delete(firstKey)
    }
    
    return option
}
