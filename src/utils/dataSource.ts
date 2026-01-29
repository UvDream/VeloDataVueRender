import type { DataSourceConfig } from '../types'

// 接口响应基础结构
export interface ApiResponse<T = any> {
    code: number
    data: T
    message?: string
}

// 根据路径获取嵌套对象的值
function getValueByPath(obj: any, path: string): any {
    if (!path) return obj
    return path.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : undefined
    }, obj)
}

// 获取图表数据
export async function fetchChartData(dataSource: DataSourceConfig): Promise<any> {
    if (dataSource.type === 'mock') {
        // 返回模拟数据
        return getMockData()
    }

    if (dataSource.type === 'api' && dataSource.apiConfig) {
        const { url, method, headers, params, body, dataPath } = dataSource.apiConfig
        
        if (!url) {
            throw new Error('接口地址不能为空')
        }
        
        try {
            // 构建请求配置
            const requestConfig: RequestInit = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                }
            }

            // 处理请求参数
            let requestUrl = url
            if (method === 'GET' && params) {
                const searchParams = new URLSearchParams()
                Object.entries(params).forEach(([key, value]) => {
                    searchParams.append(key, String(value))
                })
                requestUrl += `?${searchParams.toString()}`
            }

            // 处理请求体
            if ((method === 'POST' || method === 'PUT') && body) {
                requestConfig.body = JSON.stringify(body)
            }

            // 发送请求
            const response = await fetch(requestUrl, requestConfig)
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result: ApiResponse = await response.json()
            
            // 检查业务状态码
            if (result.code !== 200) {
                throw new Error(result.message || '接口返回错误')
            }

            // 根据数据路径提取数据
            const data = dataPath ? getValueByPath(result, dataPath) : result.data
            
            return data
        } catch (error) {
            console.error('获取接口数据失败:', error)
            // 接口失败时返回模拟数据作为兜底
            return getMockData()
        }
    }

    return getMockData()
}

// 获取模拟数据
function getMockData() {
    return {
        xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        seriesData: [
            { name: '访问量', data: [120, 132, 101, 134, 90, 230, 210] },
            { name: '订单量', data: [220, 182, 191, 234, 290, 330, 310] }
        ]
    }
}

// 数据刷新管理器
class DataRefreshManager {
    private timers: Map<string, any> = new Map()

    // 设置自动刷新
    setAutoRefresh(componentId: string, dataSource: DataSourceConfig, callback: (data: any) => void) {
        // 清除之前的定时器
        this.clearAutoRefresh(componentId)

        if (dataSource.type === 'api' && dataSource.apiConfig?.refreshInterval && dataSource.apiConfig.refreshInterval > 0) {
            const timer = setInterval(async () => {
                try {
                    const data = await fetchChartData(dataSource)
                    callback(data)
                } catch (error) {
                    console.error('自动刷新数据失败:', error)
                }
            }, dataSource.apiConfig.refreshInterval * 1000)

            this.timers.set(componentId, timer)
        }
    }

    // 清除自动刷新
    clearAutoRefresh(componentId: string) {
        const timer = this.timers.get(componentId)
        if (timer) {
            clearInterval(timer)
            this.timers.delete(componentId)
        }
    }

    // 清除所有定时器
    clearAll() {
        this.timers.forEach(timer => clearInterval(timer))
        this.timers.clear()
    }
}

export const dataRefreshManager = new DataRefreshManager()

// 接口返回数据示例
export const API_RESPONSE_EXAMPLES = {
    // 折线图/柱状图数据示例
    chartData: {
        code: 200,
        data: {
            xAxisData: ['1月', '2月', '3月', '4月', '5月', '6月'],
            seriesData: [
                { name: '销售额', data: [1200, 1500, 1800, 1600, 2000, 2200] },
                { name: '利润', data: [400, 500, 600, 550, 700, 800] }
            ]
        },
        message: 'success'
    },
    
    // 饼图数据示例
    pieData: {
        code: 200,
        data: [
            { name: '搜索引擎', value: 1048 },
            { name: '直接访问', value: 735 },
            { name: '邮件营销', value: 580 },
            { name: '联盟广告', value: 484 },
            { name: '视频广告', value: 300 }
        ],
        message: 'success'
    },

    // 地图数据示例
    mapData: {
        code: 200,
        data: [
            { name: '北京', value: 100 },
            { name: '上海', value: 90 },
            { name: '广东', value: 85 },
            { name: '浙江', value: 75 },
            { name: '江苏', value: 70 }
        ],
        message: 'success'
    },

    // 嵌套数据路径示例
    nestedData: {
        code: 200,
        data: {
            result: {
                chartInfo: {
                    xAxisData: ['Q1', 'Q2', 'Q3', 'Q4'],
                    seriesData: [
                        { name: '收入', data: [1000, 1200, 1500, 1800] }
                    ]
                }
            }
        },
        message: 'success'
    }
}