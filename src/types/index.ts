// 组件类型枚举
export type ComponentType =
    // 图表类 - ECharts
    | 'singleLineChart' | 'doubleLineChart' | 'singleBarChart' | 'doubleBarChart' | 'horizontalBarChart' | 'pieChart' | 'halfPieChart' | 'funnelChart' | 'wordCloudChart' | 'gaugeChart' | 'radarChart' | 'scatterChart' | 'mapChart' | 'cityMapChart' | 'calendarChart' | 'treeChart' | 'sankeyChart'
    // 组件库 - Antd
    | 'text' | 'button' | 'input' | 'select' | 'switch' | 'progress' | 'tag' | 'badge' | 'avatar' | 'card' | 'table' | 'scrollRankList' | 'carouselList'
    // 小组件  // 装饰组件
    | 'borderBox1'
    | 'borderBox2'
    | 'borderBox3'
    | 'borderBox4'
    | 'borderBox5'
    | 'decoration1'
    | 'decoration2'
    | 'fullscreenButton' | 'gradientText' | 'futuristicTitle' | 'flipCountdown' | 'customImageBorder'
    // 图片
    | 'image' | 'carousel'
    // 图标
    | 'icon'
    // 容器
    | 'container'
    // 布局组件
    | 'layoutTwoColumn' | 'layoutThreeColumn' | 'layoutHeader' | 'layoutSidebar' | 'layoutCell'
    // 3D组件
    | 'threeEarth' | 'threeParticles' | 'threeCube' | 'threeDNA' | 'threeWave' | 'threeTorus' | 'threeGalaxy' | 'threeTunnel' | 'threeMatrix' | 'threePlasma'
    // 特效文字
    | 'gradientText'
    // 倒计时
    | 'flipCountdown'
    // 科技标题
    | 'futuristicTitle'

// 组件分类
export type ComponentCategory = 'chart' | 'component' | 'widget' | 'image' | 'icon' | '3d' | 'recent' | 'favorite'

// 组件样式
export interface ComponentStyle {
    x: number
    y: number
    width: number
    height: number
    backgroundColor?: string
    color?: string
    fontSize?: number
    borderRadius?: number
    borderWidth?: number
    borderColor?: string
    opacity?: number
    zIndex?: number
}

// 图表轴配置
export interface ChartAxisConfig {
    show?: boolean
    type?: 'value' | 'category' | 'time' | 'log'
    name?: string
    nameLocation?: 'start' | 'middle' | 'end'
    nameTextStyle?: {
        color?: string
        fontSize?: number
        fontWeight?: string
    }
    nameGap?: number
    position?: 'top' | 'bottom' | 'left' | 'right'
    // 轴线
    axisLine?: {
        show?: boolean
        lineStyle?: {
            color?: string
            width?: number
            type?: 'solid' | 'dashed' | 'dotted'
        }
    }
    // 刻度线
    axisTick?: {
        show?: boolean
        lineStyle?: {
            color?: string
            width?: number
        }
    }
    // 轴标签
    axisLabel?: {
        show?: boolean
        color?: string
        fontSize?: number
        fontWeight?: string
        rotate?: number
        margin?: number
    }
    // 分割线
    splitLine?: {
        show?: boolean
        lineStyle?: {
            color?: string
            width?: number
            type?: 'solid' | 'dashed' | 'dotted'
            opacity?: number
        }
    }
    // 分割区域
    splitArea?: {
        show?: boolean
        areaStyle?: {
            color?: string[]
            opacity?: number
        }
    }
}

// 图表系列符号配置
export interface ChartSymbolConfig {
    show?: boolean
    type?: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none'
    size?: number
    color?: string
    borderColor?: string
    borderWidth?: number
    opacity?: number
}

// 图表图例配置
export interface ChartLegendConfig {
    show?: boolean
    orient?: 'horizontal' | 'vertical' // 布局方向
    position?: 'top' | 'bottom' | 'left' | 'right' // 简化版位置
    align?: 'left' | 'center' | 'right' // 对齐方式 (alignment within the position) -> ECharts uses left/top/right/bottom combination. 
    // Let's simplify for user: Position (Top/Bottom/Left/Right) + Alignment (Start/Center/End) is complex to map directly.
    // ECharts has left/top/right/bottom. 
    // Let's use:
    // left: 'left' | 'center' | 'right' | number
    // top: 'top' | 'middle' | 'bottom' | number
    left?: string
    top?: string
    textStyle?: {
        color?: string
        fontSize?: number
        fontWeight?: string
    }
}


// 数据源配置
export interface DataSourceConfig {
    type: 'mock' | 'api' // 数据源类型：模拟数据或接口数据
    // 接口配置
    apiConfig?: {
        url?: string // 接口地址
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE' // 请求方法
        headers?: Record<string, string> // 请求头
        params?: Record<string, any> // 请求参数
        body?: Record<string, any> // 请求体（POST/PUT时使用）
        dataPath?: string // 数据路径，如 'data' 或 'data.list'
        refreshInterval?: number // 自动刷新间隔（秒），0表示不自动刷新
    }
}

// 组件属性（根据类型不同有不同属性）
export interface ComponentProps {
    // 通用属性
    content?: string
    subContent?: string

    // 文本组件属性
    fontSize?: number
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
    color?: string
    textAlign?: 'left' | 'center' | 'right' | 'justify'
    textDecoration?: 'none' | 'underline' | 'overline' | 'line-through'
    textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
    fontStyle?: 'normal' | 'italic' | 'oblique'
    letterSpacing?: number
    lineHeight?: number
    textShadow?: boolean
    shadowColor?: string
    shadowBlur?: number
    shadowOffsetX?: number
    shadowOffsetY?: number
    opacity?: number
    backgroundColor?: string
    borderRadius?: number
    borderWidth?: number
    borderColor?: string
    padding?: number

    // 按钮属性
    buttonType?: 'primary' | 'default' | 'dashed' | 'link'
    disabled?: boolean
    loading?: boolean
    block?: boolean
    danger?: boolean

    // 输入框属性
    placeholder?: string
    allowClear?: boolean
    showCount?: boolean
    maxLength?: number
    inputType?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'

    // 标签属性
    tagColor?: string
    closable?: boolean
    icon?: string

    // 图片属性
    src?: string
    alt?: string

    // 图表属性
    chartType?: 'line' | 'bar' | 'pie'
    chartData?: unknown
    chartOption?: unknown
    // 图表轴配置
    xAxisConfig?: ChartAxisConfig
    yAxisConfig?: ChartAxisConfig
    // 折线图符号配置
    symbolConfig?: ChartSymbolConfig

    // 图标属性
    iconType?: string

    // 装饰边框属性
    borderStyle?: number
    glowColor?: string
    cornerSize?: number
    animationDuration?: number

    // 全屏按钮属性
    buttonSize?: number
    iconSize?: number
    buttonColor?: string
    hoverColor?: string
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'left' | 'right'
    customIcon?: string
    showText?: boolean

    // 自定义图片边框属性
    customBorderImage?: string // 边框图片URL或base64
    borderImageSlice?: number // 边框图片切片大小
    borderImageWidth?: number // 边框图片宽度
    borderImageRepeat?: 'stretch' | 'repeat' | 'round' | 'space' // 边框图片重复方式
    borderImageOutset?: number // 边框图片外延
    borderImageOpacity?: number // 边框图片透明度
    borderImageMode?: 'border' | 'background' | 'frame' // 边框模式：边框、背景、相框

    // 科技标题属性
    titleColor?: string

    // 进度条
    percent?: number
    progressType?: 'line' | 'circle' | 'dashboard'
    status?: 'success' | 'exception' | 'normal' | 'active'
    showInfo?: boolean
    progressStrokeColor?: string | Record<string, string>
    progressSize?: 'default' | 'small'

    // 按钮扩展属性
    buttonText?: string
    btnSize?: 'small' | 'middle' | 'large'
    ghost?: boolean

    // 输入框扩展属性
    value?: string
    readonly?: boolean
    inputSize?: 'small' | 'middle' | 'large'

    // 选择器属性
    selectSize?: 'small' | 'middle' | 'large'
    mode?: 'multiple' | 'tags'
    showSearch?: boolean
    options?: Array<{ label: string; value: any }>

    // 开关属性
    switchSize?: 'default' | 'small'
    checkedChildren?: string
    unCheckedChildren?: string

    // Badge 徽标属性
    badgeCount?: number
    showDot?: boolean
    badgeColor?: string
    showZero?: boolean

    // Avatar 头像属性
    avatarSize?: number | 'small' | 'default' | 'large'
    avatarShape?: 'circle' | 'square'

    // Card 卡片属性
    cardTitle?: string
    cardBordered?: boolean
    cardHoverable?: boolean

    // Table 表格属性
    tableBordered?: boolean
    tableSize?: 'small' | 'middle' | 'large'
    tablePagination?: boolean

    // 装饰组件属性
    gradientStart?: string
    gradientEnd?: string
    subtitle?: string
    targetTime?: number | string

    // 布局组件属性
    leftWidth?: string
    rightWidth?: string
    headerHeight?: string
    sidebarWidth?: string
    gap?: number

    // 表格属性
    tableColumns?: Array<{ title: string; dataIndex: string; key: string }>
    tableData?: Array<Record<string, any>>

    // 图表数据
    chartTitle?: string
    // 数据源配置
    dataSource?: DataSourceConfig
    xAxisData?: string[]
    seriesData?: Array<{
        name: string;
        data: any[];
        // 系列特定的符号配置
        symbolConfig?: ChartSymbolConfig;
    }>
    pieData?: Array<{ name: string; value: number }>
    funnelData?: Array<{ name: string; value: number }>
    wordCloudData?: Array<{ name: string; value: number }>
    singleData?: number
    legend?: ChartLegendConfig

    // 下拉选择选项
    selectOptions?: Array<{ label: string; value: string }>

    // 开关
    checked?: boolean

    // 雷达图配置
    radarConfig?: {
        shape?: 'polygon' | 'circle' // 雷达图形状
        radius?: number // 半径百分比
        indicator?: Array<{ name: string; max: number }> // 指示器
        axisLine?: {
            show?: boolean
            lineStyle?: {
                color?: string
                width?: number
            }
        }
        splitLine?: {
            show?: boolean
            lineStyle?: {
                color?: string
                width?: number
            }
        }
        splitArea?: {
            show?: boolean
            areaStyle?: {
                color?: string[]
            }
        }
        axisName?: {
            color?: string
            fontSize?: number
            fontWeight?: string
        }
    }
    radarSeriesConfig?: {
        areaStyle?: {
            show?: boolean
            opacity?: number
        }
        lineStyle?: {
            width?: number
        }
        symbol?: string
        symbolSize?: number
    }

    // 饼图配置
    pieConfig?: {
        radius?: [string, string] // 内外半径 ['40%', '70%']
        center?: [string, string] // 圆心位置 ['50%', '50%']
        roseType?: false | 'radius' | 'area' // 玫瑰图类型
        borderRadius?: number // 扇区圆角
        borderWidth?: number // 扇区边框宽度
        borderColor?: string // 扇区边框颜色
        label?: {
            show?: boolean
            position?: 'outside' | 'inside' | 'center'
            color?: string
            fontSize?: number
            formatter?: string // '{b}: {d}%'
        }
        labelLine?: {
            show?: boolean
            length?: number
            length2?: number
            lineStyle?: {
                color?: string
                width?: number
            }
        }
        itemStyle?: {
            shadowBlur?: number
            shadowColor?: string
        }
    }

    // 地图属性
    mapRegion?: string // 地图区域：china, beijing, shanghai 等（支持省份和城市）
    mapData?: Array<{ name: string; value: number }> // 地图数据

    // 城市地图属性
    provinceName?: string // 省份名称（旧版本兼容）
    showCityData?: boolean // 是否显示城市数据（旧版本兼容）
    mapType?: 'province' | 'city' // 地图类型：省份城市地图 或 城市区县地图
    selectedProvince?: string // 选择的省份（用于城市区县地图）
    showBuiltinData?: boolean // 是否显示内置数据
    colorScheme?: 'blue' | 'green' | 'red' | 'purple' | 'orange' // 颜色主题

    // 日历热力图属性
    calendarYear?: number // 年份
    calendarData?: Array<[string, number]> // 日历数据 [['2024-01-01', 100], ...]
    calendarColors?: string[] // 热力颜色数组，从浅到深
    calendarCellSize?: number // 单元格大小
    calendarLang?: 'zh' | 'en' // 语言
    calendarMonthLabel?: {
        show?: boolean
        color?: string
        fontSize?: number
    }
    calendarDayLabel?: {
        show?: boolean
        color?: string
        fontSize?: number
        firstDay?: number // 0-周日开始，1-周一开始
    }
    calendarYearLabel?: {
        show?: boolean
        color?: string
        fontSize?: number
    }

    // 滚动排名列表属性
    rankListData?: Array<{ name: string; value: number }> // 排名数据
    rankListConfig?: {
        rowHeight?: number // 行高
        barHeight?: number // 进度条高度
        barColor?: string // 进度条颜色
        barBgColor?: string // 进度条背景色
        textColor?: string // 文字颜色
        valueColor?: string // 数值颜色
        fontSize?: number // 字体大小
        showIndex?: boolean // 显示序号
        indexColor?: string // 序号颜色
        scrollSpeed?: number // 滚动速度(ms)
        showBar?: boolean // 显示进度条
    }

    // 轮播列表属性
    carouselListData?: Array<Record<string, any>> // 列表数据
    carouselListConfig?: {
        columns?: Array<{ title: string; key: string; width?: number }> // 列配置
        rowHeight?: number // 行高
        headerHeight?: number // 表头高度
        headerBgColor?: string // 表头背景色
        headerTextColor?: string // 表头文字颜色
        rowBgColor?: string // 行背景色
        rowAltBgColor?: string // 交替行背景色
        textColor?: string // 文字颜色
        fontSize?: number // 字体大小
        scrollSpeed?: number // 滚动速度(ms)
        showHeader?: boolean // 显示表头
        pageSize?: number // 每页显示行数
    }

    // 轮播图属性
    carouselImages?: string[] // 轮播图片列表（base64或URL）
    carouselConfig?: {
        autoplay?: boolean // 自动播放
        interval?: number // 切换间隔(ms)
        showDots?: boolean // 显示指示点
        showArrows?: boolean // 显示箭头
        effect?: 'slide' | 'fade' // 切换效果
    }

    // 词云配置
    wordCloudConfig?: {
        shape?: 'circle' | 'rect' | 'diamond' | 'triangle' // 形状
        colorScheme?: 'default' | 'blue' | 'green' | 'warm' | 'cool' | 'rainbow' // 颜色方案
        minFontSize?: number // 最小字体
        maxFontSize?: number // 最大字体
        fontFamily?: string // 字体
        fontWeight?: 'normal' | 'bold' // 字体粗细
        rotation?: boolean // 是否旋转
        rotationRange?: [number, number] // 旋转角度范围
        gridSize?: number // 网格大小
    }

    // 树形图配置
    treeData?: any // 树形数据
    treeConfig?: {
        orient?: 'LR' | 'TB' | 'RL' | 'BT' // 布局方向：LR-左右, TB-上下, RL-右左, BT-下上
        top?: string | number // 上边距
        left?: string | number // 左边距
        bottom?: string | number // 下边距
        right?: string | number // 右边距
        symbolSize?: number // 节点大小
        expandAndCollapse?: boolean // 是否支持展开收起
        animationDuration?: number // 动画时长
        animationDurationUpdate?: number // 更新动画时长
        initialTreeDepth?: number // 初始展开层级，-1表示全部展开
        label?: {
            show?: boolean // 显示标签
            position?: 'left' | 'right' | 'top' | 'bottom' | 'inside' | 'insideLeft' | 'insideRight' | 'insideTop' | 'insideBottom'
            verticalAlign?: 'top' | 'middle' | 'bottom'
            align?: 'left' | 'center' | 'right'
            fontSize?: number // 字体大小
            color?: string // 字体颜色
            fontWeight?: 'normal' | 'bold' // 字体粗细
            backgroundColor?: string // 背景色
            borderColor?: string // 边框颜色
            borderWidth?: number // 边框宽度
            borderRadius?: number // 边框圆角
            padding?: number | [number, number] | [number, number, number, number] // 内边距
        }
        leaves?: {
            label?: {
                show?: boolean
                position?: 'left' | 'right' | 'top' | 'bottom' | 'inside'
                verticalAlign?: 'top' | 'middle' | 'bottom'
                align?: 'left' | 'center' | 'right'
                fontSize?: number
                color?: string
                fontWeight?: 'normal' | 'bold'
            }
        }
        itemStyle?: {
            color?: string // 节点颜色
            borderColor?: string // 节点边框颜色
            borderWidth?: number // 节点边框宽度
        }
        lineStyle?: {
            color?: string // 连线颜色
            width?: number // 连线宽度
            curveness?: number // 连线弯曲度
        }
        emphasis?: {
            itemStyle?: {
                color?: string // 高亮节点颜色
                borderColor?: string // 高亮节点边框颜色
                borderWidth?: number // 高亮节点边框宽度
            }
            lineStyle?: {
                color?: string // 高亮连线颜色
                width?: number // 高亮连线宽度
            }
        }
    }

    // 桑基图配置
    sankeyData?: {
        nodes?: Array<{ name: string; value?: number }> // 节点数据
        links?: Array<{ source: string | number; target: string | number; value: number }> // 连接数据
    }
    sankeyConfig?: {
        orient?: 'horizontal' | 'vertical' // 布局方向
        nodeWidth?: number // 节点宽度
        nodeGap?: number // 节点间距
        layoutIterations?: number // 布局迭代次数
        nodeAlign?: 'justify' | 'left' | 'right' | 'center' // 节点对齐方式
        draggable?: boolean // 是否可拖拽
        focusNodeAdjacency?: boolean | 'inEdges' | 'outEdges' | 'allEdges' // 高亮相邻节点
        levels?: Array<{
            depth?: number // 层级深度
            itemStyle?: {
                color?: string // 节点颜色
                borderColor?: string // 边框颜色
                borderWidth?: number // 边框宽度
            }
            lineStyle?: {
                color?: string // 连线颜色
                opacity?: number // 透明度
            }
            label?: {
                color?: string // 标签颜色
                fontSize?: number // 字体大小
            }
        }>
        label?: {
            show?: boolean // 显示标签
            position?: 'inside' | 'outside' | 'left' | 'right' | 'top' | 'bottom'
            color?: string // 字体颜色
            fontSize?: number // 字体大小
            fontWeight?: 'normal' | 'bold' // 字体粗细
            formatter?: string // 格式化字符串
        }
        itemStyle?: {
            color?: string // 节点颜色
            borderColor?: string // 节点边框颜色
            borderWidth?: number // 节点边框宽度
            borderRadius?: number // 节点圆角
            opacity?: number // 透明度
        }
        lineStyle?: {
            color?: string // 连线颜色
            opacity?: number // 连线透明度
            curveness?: number // 连线弯曲度
        }
        emphasis?: {
            itemStyle?: {
                color?: string // 高亮节点颜色
                borderColor?: string // 高亮边框颜色
                borderWidth?: number // 高亮边框宽度
            }
            lineStyle?: {
                opacity?: number // 高亮连线透明度
            }
            label?: {
                color?: string // 高亮标签颜色
                fontSize?: number // 高亮字体大小
            }
        }
    }

    // 布局组件配置
    layoutConfig?: {
        direction?: 'horizontal' | 'vertical' // 布局方向：水平(左右) 或 垂直(上下)
        gap?: number // 栏间距
        cells?: Array<{
            flex?: number // 所占比例 (flex-grow)
            width?: string // 固定宽度 (如 '200px', '30%')
            height?: string // 固定高度
            backgroundColor?: string // 背景色
            layoutMode?: 'fill' | 'free' // 布局模式：自动填充(fill) 或 自由布局(free)
        }>
    }

    // 渐变文字配置
    gradientType?: 'linear' | 'radial' // 渐变类型：线性或径向
    gradientAngle?: number // 线性渐变角度 (0-360)
    gradientColors?: string[] // 渐变颜色数组
    textStroke?: boolean // 是否显示文字描边
    strokeColor?: string // 描边颜色
    strokeWidth?: number // 描边宽度

    // 倒计时配置
    countdownMode?: 'target' | 'duration' // 倒计时模式：目标时间 或 时长
    targetDate?: string // 目标日期时间
    countdownDuration?: number // 倒计时时长（秒）
    showDays?: boolean // 显示天数
    showHours?: boolean // 显示小时
    showMinutes?: boolean // 显示分钟
    showSeconds?: boolean // 显示秒数
    cardBgOpacity?: number // 卡片背景透明度
    cardColorType?: 'solid' | 'gradient' // 卡片颜色类型：纯色 或 渐变
    cardSolidColor?: string // 卡片纯色
    cardGradientStart?: string // 卡片渐变起始色
    cardGradientEnd?: string // 卡片渐变结束色
    textColor?: string // 文字颜色
    labelColor?: string // 标签颜色
    showLabels?: boolean // 显示标签
    separator?: string // 分隔符
}

// 画布上的组件项
export interface ComponentItem {
    id: string
    type: ComponentType
    name: string
    props: ComponentProps
    style: ComponentStyle
    visible: boolean
    locked: boolean
    // 布局嵌套支持
    parentId?: string      // 父布局组件ID
    cellIndex?: number     // 所在布局单元格索引 (0, 1, 2...)
    // 组合支持
    groupId?: string       // 组合ID，同一组合的组件有相同的groupId
    isGroup?: boolean      // 是否为组合（组合中的主组件标记）
}

// 吸附线
export interface SnapLine {
    type: 'v' | 'h'  // 垂直或水平
    position: number // 位置坐标
}

export interface CanvasConfig {
    width: number
    height: number
    backgroundColor: string
    name: string
    // 背景类型：纯色或图片
    backgroundType?: 'color' | 'image'
    // 背景图片配置
    backgroundImage?: string // 图片URL或base64格式的图片数据
    backgroundImageMode?: 'tile' | 'stretch' | 'cover' | 'contain' | 'center' // 背景图片模式
    backgroundImageOpacity?: number // 背景图片透明度 0-1
    // 图表主题配置
    chartTheme?: {
        type: 'preset' | 'custom' // 主题类型：预设或自定义
        presetName?: string // 预设主题名称
        customColors?: string[] // 自定义颜色数组
    }
}

// 编辑器状态
export interface EditorState {
    components: ComponentItem[]
    selectedId: string | null
    selectedIds: string[] // 多选ID列表
    scale: number // 画布缩放比例
    snapLines: SnapLine[] // 当前显示的吸附辅助线
    canvasConfig: CanvasConfig // 画布配置
    zenMode?: boolean // 禅模式
    showComponentPanel?: boolean // 显示组件面板
    showLayerPanel?: boolean // 显示图层面板
    showPropertyPanel?: boolean // 显示属性面板
}

// 编辑器 Action 类型
export type EditorAction =
    | { type: 'SYNC_STATE'; payload: EditorState }
    | { type: 'ADD_COMPONENT'; payload: ComponentItem }
    | { type: 'UPDATE_COMPONENT'; payload: { id: string; updates: Partial<ComponentItem> } }
    | { type: 'DELETE_COMPONENT'; payload: string }
    | { type: 'DELETE_COMPONENTS'; payload: string[] }
    | { type: 'SELECT_COMPONENT'; payload: string | null }
    | { type: 'SELECT_COMPONENTS'; payload: string[] }
    | { type: 'MOVE_COMPONENT'; payload: { id: string; x: number; y: number } }
    | { type: 'REORDER_LAYERS'; payload: ComponentItem[] }
    | { type: 'TOGGLE_VISIBILITY'; payload: string }
    | { type: 'TOGGLE_LOCK'; payload: string }
    | { type: 'SET_SCALE'; payload: number }
    | { type: 'SET_SNAP_LINES'; payload: SnapLine[] }
    | { type: 'SET_CANVAS_CONFIG'; payload: Partial<CanvasConfig> }
    | { type: 'GROUP_COMPONENTS'; payload: string[] }
    | { type: 'UNGROUP_COMPONENTS'; payload: string }
    | { type: 'TOGGLE_ZEN_MODE'; payload: boolean }
    | { type: 'TOGGLE_PANEL'; payload: 'component' | 'layer' | 'property' }
    | { type: 'IMPORT_PROJECT'; payload: { canvasConfig: CanvasConfig; components: ComponentItem[] } }

// 拖拽项类型
export interface DragItem {
    type: 'NEW_COMPONENT' | 'CANVAS_COMPONENT'
    componentType?: ComponentType
    id?: string
}

// 组件库项配置
export interface ComponentConfig {
    type: ComponentType
    name: string
    icon: any
    category: ComponentCategory
    defaultProps: ComponentProps
    defaultStyle: Partial<ComponentStyle>
}

