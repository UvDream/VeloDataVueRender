// 地图区域配置
export interface MapRegionConfig {
    name: string
    label: string
    level: 'country' | 'province' | 'city' | 'district'  // 新增区县层级
    parent?: string  // 新增父级字段
}

// 中国省份和主要城市列表
export const mapRegions: MapRegionConfig[] = [
    // 国家级
    { name: 'china', label: '中国', level: 'country' },
    
    // 省级
    { name: 'beijing', label: '北京', level: 'province', parent: 'china' },
    { name: 'tianjin', label: '天津', level: 'province', parent: 'china' },
    { name: 'hebei', label: '河北', level: 'province', parent: 'china' },
    { name: 'shanxi', label: '山西', level: 'province', parent: 'china' },
    { name: 'neimenggu', label: '内蒙古', level: 'province', parent: 'china' },
    { name: 'liaoning', label: '辽宁', level: 'province', parent: 'china' },
    { name: 'jilin', label: '吉林', level: 'province', parent: 'china' },
    { name: 'heilongjiang', label: '黑龙江', level: 'province', parent: 'china' },
    { name: 'shanghai', label: '上海', level: 'province', parent: 'china' },
    { name: 'jiangsu', label: '江苏', level: 'province', parent: 'china' },
    { name: 'zhejiang', label: '浙江', level: 'province', parent: 'china' },
    { name: 'anhui', label: '安徽', level: 'province', parent: 'china' },
    { name: 'fujian', label: '福建', level: 'province', parent: 'china' },
    { name: 'jiangxi', label: '江西', level: 'province', parent: 'china' },
    { name: 'shandong', label: '山东', level: 'province', parent: 'china' },
    { name: 'henan', label: '河南', level: 'province', parent: 'china' },
    { name: 'hubei', label: '湖北', level: 'province', parent: 'china' },
    { name: 'hunan', label: '湖南', level: 'province', parent: 'china' },
    { name: 'guangdong', label: '广东', level: 'province', parent: 'china' },
    { name: 'guangxi', label: '广西', level: 'province', parent: 'china' },
    { name: 'hainan', label: '海南', level: 'province', parent: 'china' },
    { name: 'chongqing', label: '重庆', level: 'province', parent: 'china' },
    { name: 'sichuan', label: '四川', level: 'province', parent: 'china' },
    { name: 'guizhou', label: '贵州', level: 'province', parent: 'china' },
    { name: 'yunnan', label: '云南', level: 'province', parent: 'china' },
    { name: 'xizang', label: '西藏', level: 'province', parent: 'china' },
    { name: 'shaanxi', label: '陕西', level: 'province', parent: 'china' },
    { name: 'gansu', label: '甘肃', level: 'province', parent: 'china' },
    { name: 'qinghai', label: '青海', level: 'province', parent: 'china' },
    { name: 'ningxia', label: '宁夏', level: 'province', parent: 'china' },
    { name: 'xinjiang', label: '新疆', level: 'province', parent: 'china' },
    { name: 'taiwan', label: '台湾', level: 'province', parent: 'china' },
    { name: 'hongkong', label: '香港', level: 'province', parent: 'china' },
    { name: 'macao', label: '澳门', level: 'province', parent: 'china' },

    // 城市级（全国所有地级市）
    // 河北省（11个）
    { name: 'shijiazhuang', label: '石家庄市', level: 'city', parent: 'hebei' },
    { name: 'tangshan', label: '唐山市', level: 'city', parent: 'hebei' },
    { name: 'qinhuangdao', label: '秦皇岛市', level: 'city', parent: 'hebei' },
    { name: 'handan', label: '邯郸市', level: 'city', parent: 'hebei' },
    { name: 'xingtai', label: '邢台市', level: 'city', parent: 'hebei' },
    { name: 'baoding', label: '保定市', level: 'city', parent: 'hebei' },
    { name: 'zhangjiakou', label: '张家口市', level: 'city', parent: 'hebei' },
    { name: 'chengde', label: '承德市', level: 'city', parent: 'hebei' },
    { name: 'cangzhou', label: '沧州市', level: 'city', parent: 'hebei' },
    { name: 'langfang', label: '廊坊市', level: 'city', parent: 'hebei' },
    { name: 'hengshui', label: '衡水市', level: 'city', parent: 'hebei' },
    
    // 山西省（11个）
    { name: 'taiyuan', label: '太原市', level: 'city', parent: 'shanxi' },
    { name: 'datong', label: '大同市', level: 'city', parent: 'shanxi' },
    { name: 'yangquan', label: '阳泉市', level: 'city', parent: 'shanxi' },
    { name: 'changzhi', label: '长治市', level: 'city', parent: 'shanxi' },
    { name: 'jincheng', label: '晋城市', level: 'city', parent: 'shanxi' },
    { name: 'shuozhou', label: '朔州市', level: 'city', parent: 'shanxi' },
    { name: 'jinzhong', label: '晋中市', level: 'city', parent: 'shanxi' },
    { name: 'yuncheng', label: '运城市', level: 'city', parent: 'shanxi' },
    { name: 'xinzhou', label: '忻州市', level: 'city', parent: 'shanxi' },
    { name: 'linfen', label: '临汾市', level: 'city', parent: 'shanxi' },
    { name: 'lvliang', label: '吕梁市', level: 'city', parent: 'shanxi' },
    
    // 内蒙古（12个）
    { name: 'huhehaote', label: '呼和浩特市', level: 'city', parent: 'neimenggu' },
    { name: 'baotou', label: '包头市', level: 'city', parent: 'neimenggu' },
    { name: 'wuhai', label: '乌海市', level: 'city', parent: 'neimenggu' },
    { name: 'chifeng', label: '赤峰市', level: 'city', parent: 'neimenggu' },
    { name: 'tongliao', label: '通辽市', level: 'city', parent: 'neimenggu' },
    { name: 'eerduosi', label: '鄂尔多斯市', level: 'city', parent: 'neimenggu' },
    { name: 'hulunbeier', label: '呼伦贝尔市', level: 'city', parent: 'neimenggu' },
    { name: 'bayannaoer', label: '巴彦淖尔市', level: 'city', parent: 'neimenggu' },
    { name: 'wulanchabu', label: '乌兰察布市', level: 'city', parent: 'neimenggu' },
    { name: 'xingan', label: '兴安盟', level: 'city', parent: 'neimenggu' },
    { name: 'xilingol', label: '锡林郭勒盟', level: 'city', parent: 'neimenggu' },
    { name: 'alxa', label: '阿拉善盟', level: 'city', parent: 'neimenggu' },
    
    // 辽宁省（14个）
    { name: 'shenyang', label: '沈阳市', level: 'city', parent: 'liaoning' },
    { name: 'dalian', label: '大连市', level: 'city', parent: 'liaoning' },
    { name: 'anshan', label: '鞍山市', level: 'city', parent: 'liaoning' },
    { name: 'fushun', label: '抚顺市', level: 'city', parent: 'liaoning' },
    { name: 'benxi', label: '本溪市', level: 'city', parent: 'liaoning' },
    { name: 'dandong', label: '丹东市', level: 'city', parent: 'liaoning' },
    { name: 'jinzhou', label: '锦州市', level: 'city', parent: 'liaoning' },
    { name: 'yingkou', label: '营口市', level: 'city', parent: 'liaoning' },
    { name: 'fuxin', label: '阜新市', level: 'city', parent: 'liaoning' },
    { name: 'liaoyang', label: '辽阳市', level: 'city', parent: 'liaoning' },
    { name: 'panjin', label: '盘锦市', level: 'city', parent: 'liaoning' },
    { name: 'tieling', label: '铁岭市', level: 'city', parent: 'liaoning' },
    { name: 'chaoyang', label: '朝阳市', level: 'city', parent: 'liaoning' },
    { name: 'huludao', label: '葫芦岛市', level: 'city', parent: 'liaoning' },
    
    // 吉林省（9个）
    { name: 'changchun', label: '长春市', level: 'city', parent: 'jilin' },
    { name: 'jilin', label: '吉林市', level: 'city', parent: 'jilin' },
    { name: 'siping', label: '四平市', level: 'city', parent: 'jilin' },
    { name: 'liaoyuan', label: '辽源市', level: 'city', parent: 'jilin' },
    { name: 'tonghua', label: '通化市', level: 'city', parent: 'jilin' },
    { name: 'baishan', label: '白山市', level: 'city', parent: 'jilin' },
    { name: 'songyuan', label: '松原市', level: 'city', parent: 'jilin' },
    { name: 'baicheng', label: '白城市', level: 'city', parent: 'jilin' },
    { name: 'yanbian', label: '延边朝鲜族自治州', level: 'city', parent: 'jilin' },
    
    // 黑龙江省（13个）
    { name: 'haerbin', label: '哈尔滨市', level: 'city', parent: 'heilongjiang' },
    { name: 'qiqihaer', label: '齐齐哈尔市', level: 'city', parent: 'heilongjiang' },
    { name: 'jixi', label: '鸡西市', level: 'city', parent: 'heilongjiang' },
    { name: 'hegang', label: '鹤岗市', level: 'city', parent: 'heilongjiang' },
    { name: 'shuangyashan', label: '双鸭山市', level: 'city', parent: 'heilongjiang' },
    { name: 'daqing', label: '大庆市', level: 'city', parent: 'heilongjiang' },
    { name: 'yichun_hlj', label: '伊春市', level: 'city', parent: 'heilongjiang' },
    { name: 'jiamusi', label: '佳木斯市', level: 'city', parent: 'heilongjiang' },
    { name: 'qitaihe', label: '七台河市', level: 'city', parent: 'heilongjiang' },
    { name: 'mudanjiang', label: '牡丹江市', level: 'city', parent: 'heilongjiang' },
    { name: 'heihe', label: '黑河市', level: 'city', parent: 'heilongjiang' },
    { name: 'suihua', label: '绥化市', level: 'city', parent: 'heilongjiang' },
    { name: 'daxinganling', label: '大兴安岭地区', level: 'city', parent: 'heilongjiang' },
    
    // 江苏省（13个）
    { name: 'nanjing', label: '南京市', level: 'city', parent: 'jiangsu' },
    { name: 'wuxi', label: '无锡市', level: 'city', parent: 'jiangsu' },
    { name: 'xuzhou', label: '徐州市', level: 'city', parent: 'jiangsu' },
    { name: 'changzhou', label: '常州市', level: 'city', parent: 'jiangsu' },
    { name: 'suzhou', label: '苏州市', level: 'city', parent: 'jiangsu' },
    { name: 'nantong', label: '南通市', level: 'city', parent: 'jiangsu' },
    { name: 'lianyungang', label: '连云港市', level: 'city', parent: 'jiangsu' },
    { name: 'huaian', label: '淮安市', level: 'city', parent: 'jiangsu' },
    { name: 'yancheng', label: '盐城市', level: 'city', parent: 'jiangsu' },
    { name: 'yangzhou', label: '扬州市', level: 'city', parent: 'jiangsu' },
    { name: 'zhenjiang', label: '镇江市', level: 'city', parent: 'jiangsu' },
    { name: 'taizhou_js', label: '泰州市', level: 'city', parent: 'jiangsu' },
    { name: 'suqian', label: '宿迁市', level: 'city', parent: 'jiangsu' },
    
    // 浙江省（11个）
    { name: 'hangzhou', label: '杭州市', level: 'city', parent: 'zhejiang' },
    { name: 'ningbo', label: '宁波市', level: 'city', parent: 'zhejiang' },
    { name: 'wenzhou', label: '温州市', level: 'city', parent: 'zhejiang' },
    { name: 'jiaxing', label: '嘉兴市', level: 'city', parent: 'zhejiang' },
    { name: 'huzhou', label: '湖州市', level: 'city', parent: 'zhejiang' },
    { name: 'shaoxing', label: '绍兴市', level: 'city', parent: 'zhejiang' },
    { name: 'jinhua', label: '金华市', level: 'city', parent: 'zhejiang' },
    { name: 'quzhou', label: '衢州市', level: 'city', parent: 'zhejiang' },
    { name: 'zhoushan', label: '舟山市', level: 'city', parent: 'zhejiang' },
    { name: 'taizhou_zj', label: '台州市', level: 'city', parent: 'zhejiang' },
    { name: 'lishui', label: '丽水市', level: 'city', parent: 'zhejiang' },

    // 安徽省（16个）
    { name: 'hefei', label: '合肥市', level: 'city', parent: 'anhui' },
    { name: 'wuhu', label: '芜湖市', level: 'city', parent: 'anhui' },
    { name: 'bengbu', label: '蚌埠市', level: 'city', parent: 'anhui' },
    { name: 'huainan', label: '淮南市', level: 'city', parent: 'anhui' },
    { name: 'maanshan', label: '马鞍山市', level: 'city', parent: 'anhui' },
    { name: 'huaibei', label: '淮北市', level: 'city', parent: 'anhui' },
    { name: 'tongling', label: '铜陵市', level: 'city', parent: 'anhui' },
    { name: 'anqing', label: '安庆市', level: 'city', parent: 'anhui' },
    { name: 'huangshan', label: '黄山市', level: 'city', parent: 'anhui' },
    { name: 'chuzhou', label: '滁州市', level: 'city', parent: 'anhui' },
    { name: 'fuyang', label: '阜阳市', level: 'city', parent: 'anhui' },
    { name: 'suzhou_ah', label: '宿州市', level: 'city', parent: 'anhui' },
    { name: 'luan', label: '六安市', level: 'city', parent: 'anhui' },
    { name: 'bozhou', label: '亳州市', level: 'city', parent: 'anhui' },
    { name: 'chizhou', label: '池州市', level: 'city', parent: 'anhui' },
    { name: 'xuancheng', label: '宣城市', level: 'city', parent: 'anhui' },

    // 福建省（9个）
    { name: 'fuzhou', label: '福州市', level: 'city', parent: 'fujian' },
    { name: 'xiamen', label: '厦门市', level: 'city', parent: 'fujian' },
    { name: 'putian', label: '莆田市', level: 'city', parent: 'fujian' },
    { name: 'sanming', label: '三明市', level: 'city', parent: 'fujian' },
    { name: 'quanzhou', label: '泉州市', level: 'city', parent: 'fujian' },
    { name: 'zhangzhou', label: '漳州市', level: 'city', parent: 'fujian' },
    { name: 'nanping', label: '南平市', level: 'city', parent: 'fujian' },
    { name: 'longyan', label: '龙岩市', level: 'city', parent: 'fujian' },
    { name: 'ningde', label: '宁德市', level: 'city', parent: 'fujian' },

    // 江西省（11个）
    { name: 'nanchang', label: '南昌市', level: 'city', parent: 'jiangxi' },
    { name: 'jingdezhen', label: '景德镇市', level: 'city', parent: 'jiangxi' },
    { name: 'pingxiang', label: '萍乡市', level: 'city', parent: 'jiangxi' },
    { name: 'jiujiang', label: '九江市', level: 'city', parent: 'jiangxi' },
    { name: 'xinyu', label: '新余市', level: 'city', parent: 'jiangxi' },
    { name: 'yingtan', label: '鹰潭市', level: 'city', parent: 'jiangxi' },
    { name: 'ganzhou', label: '赣州市', level: 'city', parent: 'jiangxi' },
    { name: 'jian', label: '吉安市', level: 'city', parent: 'jiangxi' },
    { name: 'yichun_jx', label: '宜春市', level: 'city', parent: 'jiangxi' },
    { name: 'fuzhou_jx', label: '抚州市', level: 'city', parent: 'jiangxi' },
    { name: 'shangrao', label: '上饶市', level: 'city', parent: 'jiangxi' },

    // 山东省（16个）
    { name: 'jinan', label: '济南市', level: 'city', parent: 'shandong' },
    { name: 'qingdao', label: '青岛市', level: 'city', parent: 'shandong' },
    { name: 'zibo', label: '淄博市', level: 'city', parent: 'shandong' },
    { name: 'zaozhuang', label: '枣庄市', level: 'city', parent: 'shandong' },
    { name: 'dongying', label: '东营市', level: 'city', parent: 'shandong' },
    { name: 'yantai', label: '烟台市', level: 'city', parent: 'shandong' },
    { name: 'weifang', label: '潍坊市', level: 'city', parent: 'shandong' },
    { name: 'jining', label: '济宁市', level: 'city', parent: 'shandong' },
    { name: 'taian', label: '泰安市', level: 'city', parent: 'shandong' },
    { name: 'weihai', label: '威海市', level: 'city', parent: 'shandong' },
    { name: 'rizhao', label: '日照市', level: 'city', parent: 'shandong' },
    { name: 'linyi', label: '临沂市', level: 'city', parent: 'shandong' },
    { name: 'dezhou', label: '德州市', level: 'city', parent: 'shandong' },
    { name: 'liaocheng', label: '聊城市', level: 'city', parent: 'shandong' },
    { name: 'binzhou', label: '滨州市', level: 'city', parent: 'shandong' },
    { name: 'heze', label: '菏泽市', level: 'city', parent: 'shandong' },

    // 河南省（17个）
    { name: 'zhengzhou', label: '郑州市', level: 'city', parent: 'henan' },
    { name: 'kaifeng', label: '开封市', level: 'city', parent: 'henan' },
    { name: 'luoyang', label: '洛阳市', level: 'city', parent: 'henan' },
    { name: 'pingdingshan', label: '平顶山市', level: 'city', parent: 'henan' },
    { name: 'anyang', label: '安阳市', level: 'city', parent: 'henan' },
    { name: 'hebi', label: '鹤壁市', level: 'city', parent: 'henan' },
    { name: 'xinxiang', label: '新乡市', level: 'city', parent: 'henan' },
    { name: 'jiaozuo', label: '焦作市', level: 'city', parent: 'henan' },
    { name: 'puyang', label: '濮阳市', level: 'city', parent: 'henan' },
    { name: 'xuchang', label: '许昌市', level: 'city', parent: 'henan' },
    { name: 'luohe', label: '漯河市', level: 'city', parent: 'henan' },
    { name: 'sanmenxia', label: '三门峡市', level: 'city', parent: 'henan' },
    { name: 'nanyang', label: '南阳市', level: 'city', parent: 'henan' },
    { name: 'shangqiu', label: '商丘市', level: 'city', parent: 'henan' },
    { name: 'xinyang', label: '信阳市', level: 'city', parent: 'henan' },
    { name: 'zhoukou', label: '周口市', level: 'city', parent: 'henan' },
    { name: 'zhumadian', label: '驻马店市', level: 'city', parent: 'henan' },

    // 湖北省（13个）
    { name: 'wuhan', label: '武汉市', level: 'city', parent: 'hubei' },
    { name: 'huangshi', label: '黄石市', level: 'city', parent: 'hubei' },
    { name: 'shiyan', label: '十堰市', level: 'city', parent: 'hubei' },
    { name: 'yichang', label: '宜昌市', level: 'city', parent: 'hubei' },
    { name: 'xiangyang', label: '襄阳市', level: 'city', parent: 'hubei' },
    { name: 'ezhou', label: '鄂州市', level: 'city', parent: 'hubei' },
    { name: 'jingmen', label: '荆门市', level: 'city', parent: 'hubei' },
    { name: 'xiaogan', label: '孝感市', level: 'city', parent: 'hubei' },
    { name: 'jingzhou', label: '荆州市', level: 'city', parent: 'hubei' },
    { name: 'huanggang', label: '黄冈市', level: 'city', parent: 'hubei' },
    { name: 'xianning', label: '咸宁市', level: 'city', parent: 'hubei' },
    { name: 'suizhou', label: '随州市', level: 'city', parent: 'hubei' },
    { name: 'enshi', label: '恩施土家族苗族自治州', level: 'city', parent: 'hubei' },

    // 湖南省（14个）
    { name: 'changsha', label: '长沙市', level: 'city', parent: 'hunan' },
    { name: 'zhuzhou', label: '株洲市', level: 'city', parent: 'hunan' },
    { name: 'xiangtan', label: '湘潭市', level: 'city', parent: 'hunan' },
    { name: 'hengyang', label: '衡阳市', level: 'city', parent: 'hunan' },
    { name: 'shaoyang', label: '邵阳市', level: 'city', parent: 'hunan' },
    { name: 'yueyang', label: '岳阳市', level: 'city', parent: 'hunan' },
    { name: 'changde', label: '常德市', level: 'city', parent: 'hunan' },
    { name: 'zhangjiajie', label: '张家界市', level: 'city', parent: 'hunan' },
    { name: 'yiyang', label: '益阳市', level: 'city', parent: 'hunan' },
    { name: 'chenzhou', label: '郴州市', level: 'city', parent: 'hunan' },
    { name: 'yongzhou', label: '永州市', level: 'city', parent: 'hunan' },
    { name: 'huaihua', label: '怀化市', level: 'city', parent: 'hunan' },
    { name: 'loudi', label: '娄底市', level: 'city', parent: 'hunan' },
    { name: 'xiangxi', label: '湘西土家族苗族自治州', level: 'city', parent: 'hunan' },

    // 广东省（21个）
    { name: 'guangzhou', label: '广州市', level: 'city', parent: 'guangdong' },
    { name: 'shaoguan', label: '韶关市', level: 'city', parent: 'guangdong' },
    { name: 'shenzhen', label: '深圳市', level: 'city', parent: 'guangdong' },
    { name: 'zhuhai', label: '珠海市', level: 'city', parent: 'guangdong' },
    { name: 'shantou', label: '汕头市', level: 'city', parent: 'guangdong' },
    { name: 'foshan', label: '佛山市', level: 'city', parent: 'guangdong' },
    { name: 'jiangmen', label: '江门市', level: 'city', parent: 'guangdong' },
    { name: 'zhanjiang', label: '湛江市', level: 'city', parent: 'guangdong' },
    { name: 'maoming', label: '茂名市', level: 'city', parent: 'guangdong' },
    { name: 'zhaoqing', label: '肇庆市', level: 'city', parent: 'guangdong' },
    { name: 'huizhou', label: '惠州市', level: 'city', parent: 'guangdong' },
    { name: 'meizhou', label: '梅州市', level: 'city', parent: 'guangdong' },
    { name: 'shanwei', label: '汕尾市', level: 'city', parent: 'guangdong' },
    { name: 'heyuan', label: '河源市', level: 'city', parent: 'guangdong' },
    { name: 'yangjiang', label: '阳江市', level: 'city', parent: 'guangdong' },
    { name: 'qingyuan', label: '清远市', level: 'city', parent: 'guangdong' },
    { name: 'dongguan', label: '东莞市', level: 'city', parent: 'guangdong' },
    { name: 'zhongshan', label: '中山市', level: 'city', parent: 'guangdong' },
    { name: 'chaozhou', label: '潮州市', level: 'city', parent: 'guangdong' },
    { name: 'jieyang', label: '揭阳市', level: 'city', parent: 'guangdong' },
    { name: 'yunfu', label: '云浮市', level: 'city', parent: 'guangdong' },

    // 广西壮族自治区（14个）
    { name: 'nanning', label: '南宁市', level: 'city', parent: 'guangxi' },
    { name: 'liuzhou', label: '柳州市', level: 'city', parent: 'guangxi' },
    { name: 'guilin', label: '桂林市', level: 'city', parent: 'guangxi' },
    { name: 'wuzhou', label: '梧州市', level: 'city', parent: 'guangxi' },
    { name: 'beihai', label: '北海市', level: 'city', parent: 'guangxi' },
    { name: 'fangchenggang', label: '防城港市', level: 'city', parent: 'guangxi' },
    { name: 'qinzhou', label: '钦州市', level: 'city', parent: 'guangxi' },
    { name: 'guigang', label: '贵港市', level: 'city', parent: 'guangxi' },
    { name: 'yulin_gx', label: '玉林市', level: 'city', parent: 'guangxi' },
    { name: 'baise', label: '百色市', level: 'city', parent: 'guangxi' },
    { name: 'hezhou', label: '贺州市', level: 'city', parent: 'guangxi' },
    { name: 'hechi', label: '河池市', level: 'city', parent: 'guangxi' },
    { name: 'laibin', label: '来宾市', level: 'city', parent: 'guangxi' },
    { name: 'chongzuo', label: '崇左市', level: 'city', parent: 'guangxi' },

    // 海南省（4个地级市）
    { name: 'haikou', label: '海口市', level: 'city', parent: 'hainan' },
    { name: 'sanya', label: '三亚市', level: 'city', parent: 'hainan' },
    { name: 'sansha', label: '三沙市', level: 'city', parent: 'hainan' },
    { name: 'danzhou', label: '儋州市', level: 'city', parent: 'hainan' },

    // 四川省（21个）
    { name: 'chengdu', label: '成都市', level: 'city', parent: 'sichuan' },
    { name: 'zigong', label: '自贡市', level: 'city', parent: 'sichuan' },
    { name: 'panzhihua', label: '攀枝花市', level: 'city', parent: 'sichuan' },
    { name: 'luzhou', label: '泸州市', level: 'city', parent: 'sichuan' },
    { name: 'deyang', label: '德阳市', level: 'city', parent: 'sichuan' },
    { name: 'mianyang', label: '绵阳市', level: 'city', parent: 'sichuan' },
    { name: 'guangyuan', label: '广元市', level: 'city', parent: 'sichuan' },
    { name: 'suining', label: '遂宁市', level: 'city', parent: 'sichuan' },
    { name: 'neijiang', label: '内江市', level: 'city', parent: 'sichuan' },
    { name: 'leshan', label: '乐山市', level: 'city', parent: 'sichuan' },
    { name: 'nanchong', label: '南充市', level: 'city', parent: 'sichuan' },
    { name: 'meishan', label: '眉山市', level: 'city', parent: 'sichuan' },
    { name: 'yibin', label: '宜宾市', level: 'city', parent: 'sichuan' },
    { name: 'guangan', label: '广安市', level: 'city', parent: 'sichuan' },
    { name: 'dazhou', label: '达州市', level: 'city', parent: 'sichuan' },
    { name: 'yaan', label: '雅安市', level: 'city', parent: 'sichuan' },
    { name: 'bazhong', label: '巴中市', level: 'city', parent: 'sichuan' },
    { name: 'ziyang', label: '资阳市', level: 'city', parent: 'sichuan' },
    { name: 'aba', label: '阿坝藏族羌族自治州', level: 'city', parent: 'sichuan' },
    { name: 'ganzi', label: '甘孜藏族自治州', level: 'city', parent: 'sichuan' },
    { name: 'liangshan', label: '凉山彝族自治州', level: 'city', parent: 'sichuan' },

    // 贵州省（9个）
    { name: 'guiyang', label: '贵阳市', level: 'city', parent: 'guizhou' },
    { name: 'liupanshui', label: '六盘水市', level: 'city', parent: 'guizhou' },
    { name: 'zunyi', label: '遵义市', level: 'city', parent: 'guizhou' },
    { name: 'anshun', label: '安顺市', level: 'city', parent: 'guizhou' },
    { name: 'bijie', label: '毕节市', level: 'city', parent: 'guizhou' },
    { name: 'tongren', label: '铜仁市', level: 'city', parent: 'guizhou' },
    { name: 'qianxinan', label: '黔西南布依族苗族自治州', level: 'city', parent: 'guizhou' },
    { name: 'qiandongnan', label: '黔东南苗族侗族自治州', level: 'city', parent: 'guizhou' },
    { name: 'qiannan', label: '黔南布依族苗族自治州', level: 'city', parent: 'guizhou' },

    // 云南省（16个）
    { name: 'kunming', label: '昆明市', level: 'city', parent: 'yunnan' },
    { name: 'qujing', label: '曲靖市', level: 'city', parent: 'yunnan' },
    { name: 'yuxi', label: '玉溪市', level: 'city', parent: 'yunnan' },
    { name: 'baoshan', label: '保山市', level: 'city', parent: 'yunnan' },
    { name: 'zhaotong', label: '昭通市', level: 'city', parent: 'yunnan' },
    { name: 'lijiang', label: '丽江市', level: 'city', parent: 'yunnan' },
    { name: 'puer', label: '普洱市', level: 'city', parent: 'yunnan' },
    { name: 'lincang', label: '临沧市', level: 'city', parent: 'yunnan' },
    { name: 'chuxiong', label: '楚雄彝族自治州', level: 'city', parent: 'yunnan' },
    { name: 'honghe', label: '红河哈尼族彝族自治州', level: 'city', parent: 'yunnan' },
    { name: 'wenshan', label: '文山壮族苗族自治州', level: 'city', parent: 'yunnan' },
    { name: 'xishuangbanna', label: '西双版纳傣族自治州', level: 'city', parent: 'yunnan' },
    { name: 'dali', label: '大理白族自治州', level: 'city', parent: 'yunnan' },
    { name: 'dehong', label: '德宏傣族景颇族自治州', level: 'city', parent: 'yunnan' },
    { name: 'nujiang', label: '怒江傈僳族自治州', level: 'city', parent: 'yunnan' },
    { name: 'diqing', label: '迪庆藏族自治州', level: 'city', parent: 'yunnan' },

    // 西藏自治区（7个）
    { name: 'lasa', label: '拉萨市', level: 'city', parent: 'xizang' },
    { name: 'rikaze', label: '日喀则市', level: 'city', parent: 'xizang' },
    { name: 'changdu', label: '昌都市', level: 'city', parent: 'xizang' },
    { name: 'linzhi', label: '林芝市', level: 'city', parent: 'xizang' },
    { name: 'shannan', label: '山南市', level: 'city', parent: 'xizang' },
    { name: 'naqu', label: '那曲市', level: 'city', parent: 'xizang' },
    { name: 'ali', label: '阿里地区', level: 'city', parent: 'xizang' },

    // 陕西省（10个）
    { name: 'xian', label: '西安市', level: 'city', parent: 'shaanxi' },
    { name: 'tongchuan', label: '铜川市', level: 'city', parent: 'shaanxi' },
    { name: 'baoji', label: '宝鸡市', level: 'city', parent: 'shaanxi' },
    { name: 'xianyang', label: '咸阳市', level: 'city', parent: 'shaanxi' },
    { name: 'weinan', label: '渭南市', level: 'city', parent: 'shaanxi' },
    { name: 'yanan', label: '延安市', level: 'city', parent: 'shaanxi' },
    { name: 'hanzhong', label: '汉中市', level: 'city', parent: 'shaanxi' },
    { name: 'yulin_sx', label: '榆林市', level: 'city', parent: 'shaanxi' },
    { name: 'ankang', label: '安康市', level: 'city', parent: 'shaanxi' },
    { name: 'shangluo', label: '商洛市', level: 'city', parent: 'shaanxi' },

    // 甘肃省（14个）
    { name: 'lanzhou', label: '兰州市', level: 'city', parent: 'gansu' },
    { name: 'jiayuguan', label: '嘉峪关市', level: 'city', parent: 'gansu' },
    { name: 'jinchang', label: '金昌市', level: 'city', parent: 'gansu' },
    { name: 'baiyin', label: '白银市', level: 'city', parent: 'gansu' },
    { name: 'tianshui', label: '天水市', level: 'city', parent: 'gansu' },
    { name: 'wuwei', label: '武威市', level: 'city', parent: 'gansu' },
    { name: 'zhangye', label: '张掖市', level: 'city', parent: 'gansu' },
    { name: 'pingliang', label: '平凉市', level: 'city', parent: 'gansu' },
    { name: 'jiuquan', label: '酒泉市', level: 'city', parent: 'gansu' },
    { name: 'qingyang', label: '庆阳市', level: 'city', parent: 'gansu' },
    { name: 'dingxi', label: '定西市', level: 'city', parent: 'gansu' },
    { name: 'longnan', label: '陇南市', level: 'city', parent: 'gansu' },
    { name: 'linxia', label: '临夏回族自治州', level: 'city', parent: 'gansu' },
    { name: 'gannan', label: '甘南藏族自治州', level: 'city', parent: 'gansu' },

    // 青海省（8个）
    { name: 'xining', label: '西宁市', level: 'city', parent: 'qinghai' },
    { name: 'haidong', label: '海东市', level: 'city', parent: 'qinghai' },
    { name: 'haibei', label: '海北藏族自治州', level: 'city', parent: 'qinghai' },
    { name: 'huangnan', label: '黄南藏族自治州', level: 'city', parent: 'qinghai' },
    { name: 'hainan_qh', label: '海南藏族自治州', level: 'city', parent: 'qinghai' },
    { name: 'guoluo', label: '果洛藏族自治州', level: 'city', parent: 'qinghai' },
    { name: 'yushu', label: '玉树藏族自治州', level: 'city', parent: 'qinghai' },
    { name: 'haixi', label: '海西蒙古族藏族自治州', level: 'city', parent: 'qinghai' },

    // 宁夏回族自治区（5个）
    { name: 'yinchuan', label: '银川市', level: 'city', parent: 'ningxia' },
    { name: 'shizuishan', label: '石嘴山市', level: 'city', parent: 'ningxia' },
    { name: 'wuzhong', label: '吴忠市', level: 'city', parent: 'ningxia' },
    { name: 'guyuan', label: '固原市', level: 'city', parent: 'ningxia' },
    { name: 'zhongwei', label: '中卫市', level: 'city', parent: 'ningxia' },

    // 新疆维吾尔自治区（14个地级市+5个自治州）
    { name: 'wulumuqi', label: '乌鲁木齐市', level: 'city', parent: 'xinjiang' },
    { name: 'kelamayi', label: '克拉玛依市', level: 'city', parent: 'xinjiang' },
    { name: 'tulufan', label: '吐鲁番市', level: 'city', parent: 'xinjiang' },
    { name: 'hami', label: '哈密市', level: 'city', parent: 'xinjiang' },
    { name: 'changji', label: '昌吉回族自治州', level: 'city', parent: 'xinjiang' },
    { name: 'boertala', label: '博尔塔拉蒙古自治州', level: 'city', parent: 'xinjiang' },
    { name: 'bayinguoleng', label: '巴音郭楞蒙古自治州', level: 'city', parent: 'xinjiang' },
    { name: 'akesu', label: '阿克苏地区', level: 'city', parent: 'xinjiang' },
    { name: 'kezilesukeerkezi', label: '克孜勒苏柯尔克孜自治州', level: 'city', parent: 'xinjiang' },
    { name: 'kashi', label: '喀什地区', level: 'city', parent: 'xinjiang' },
    { name: 'hetian', label: '和田地区', level: 'city', parent: 'xinjiang' },
    { name: 'yili', label: '伊犁哈萨克自治州', level: 'city', parent: 'xinjiang' },
    { name: 'tacheng', label: '塔城地区', level: 'city', parent: 'xinjiang' },
    { name: 'aletai', label: '阿勒泰地区', level: 'city', parent: 'xinjiang' },
]

// 主要城市地图数据配置（省份下的城市数据）
export const cityMapData: Record<string, Array<{ name: string; value: number }>> = {
    'beijing': [
        { name: '东城区', value: 95 },
        { name: '西城区', value: 88 },
        { name: '朝阳区', value: 92 },
        { name: '丰台区', value: 78 },
        { name: '石景山区', value: 65 },
        { name: '海淀区', value: 98 },
        { name: '门头沟区', value: 45 },
        { name: '房山区', value: 52 },
        { name: '通州区', value: 68 },
        { name: '顺义区', value: 58 },
        { name: '昌平区', value: 72 },
        { name: '大兴区', value: 63 },
        { name: '怀柔区', value: 38 },
        { name: '平谷区', value: 35 },
        { name: '密云区', value: 42 },
        { name: '延庆区', value: 28 },
    ],
    'shanghai': [
        { name: '黄浦区', value: 96 },
        { name: '徐汇区', value: 89 },
        { name: '长宁区', value: 85 },
        { name: '静安区', value: 92 },
        { name: '普陀区', value: 78 },
        { name: '虹口区', value: 82 },
        { name: '杨浦区', value: 88 },
        { name: '闵行区', value: 75 },
        { name: '宝山区', value: 68 },
        { name: '嘉定区', value: 72 },
        { name: '浦东新区', value: 94 },
        { name: '金山区', value: 55 },
        { name: '松江区', value: 69 },
        { name: '青浦区', value: 62 },
        { name: '奉贤区', value: 58 },
        { name: '崇明区', value: 45 },
    ],
    'guangdong': [
        { name: '广州市', value: 95 },
        { name: '深圳市', value: 98 },
        { name: '珠海市', value: 78 },
        { name: '汕头市', value: 65 },
        { name: '佛山市', value: 82 },
        { name: '韶关市', value: 52 },
        { name: '湛江市', value: 58 },
        { name: '肇庆市', value: 55 },
        { name: '江门市', value: 68 },
        { name: '茂名市', value: 48 },
        { name: '惠州市', value: 72 },
        { name: '梅州市', value: 45 },
        { name: '汕尾市', value: 42 },
        { name: '河源市', value: 38 },
        { name: '阳江市', value: 46 },
        { name: '清远市', value: 41 },
        { name: '东莞市', value: 88 },
        { name: '中山市', value: 75 },
        { name: '潮州市', value: 52 },
        { name: '揭阳市', value: 48 },
        { name: '云浮市', value: 35 },
    ],
    'jiangsu': [
        { name: '南京市', value: 92 },
        { name: '无锡市', value: 85 },
        { name: '徐州市', value: 68 },
        { name: '常州市', value: 78 },
        { name: '苏州市', value: 95 },
        { name: '南通市', value: 72 },
        { name: '连云港市', value: 55 },
        { name: '淮安市', value: 58 },
        { name: '盐城市', value: 62 },
        { name: '扬州市', value: 69 },
        { name: '镇江市', value: 65 },
        { name: '泰州市', value: 63 },
        { name: '宿迁市', value: 52 },
    ],
    'zhejiang': [
        { name: '杭州市', value: 96 },
        { name: '宁波市', value: 88 },
        { name: '温州市', value: 82 },
        { name: '嘉兴市', value: 75 },
        { name: '湖州市', value: 68 },
        { name: '绍兴市', value: 78 },
        { name: '金华市', value: 72 },
        { name: '衢州市', value: 58 },
        { name: '舟山市', value: 65 },
        { name: '台州市', value: 69 },
        { name: '丽水市', value: 55 },
    ]
}

// 城市的区县数据配置
export const districtMapData: Record<string, Array<{ name: string; value: number }>> = {
    // 南京市各区
    'nanjing': [
        { name: '玄武区', value: 95 },
        { name: '秦淮区', value: 88 },
        { name: '建邺区', value: 92 },
        { name: '鼓楼区', value: 90 },
        { name: '浦口区', value: 75 },
        { name: '栖霞区', value: 78 },
        { name: '雨花台区', value: 82 },
        { name: '江宁区', value: 85 },
        { name: '六合区', value: 65 },
        { name: '溧水区', value: 68 },
        { name: '高淳区', value: 62 },
    ],
    // 苏州市各区
    'suzhou': [
        { name: '虎丘区', value: 88 },
        { name: '吴中区', value: 85 },
        { name: '相城区', value: 82 },
        { name: '姑苏区', value: 92 },
        { name: '工业园区', value: 95 },
        { name: '高新区', value: 90 },
        { name: '常熟市', value: 78 },
        { name: '张家港市', value: 80 },
        { name: '昆山市', value: 88 },
        { name: '太仓市', value: 75 },
    ],
    // 杭州市各区
    'hangzhou': [
        { name: '上城区', value: 95 },
        { name: '拱墅区', value: 88 },
        { name: '西湖区', value: 92 },
        { name: '滨江区', value: 98 },
        { name: '萧山区', value: 85 },
        { name: '余杭区', value: 82 },
        { name: '临平区', value: 78 },
        { name: '钱塘区', value: 80 },
        { name: '富阳区', value: 72 },
        { name: '临安区', value: 68 },
        { name: '桐庐县', value: 65 },
        { name: '淳安县', value: 58 },
        { name: '建德市', value: 62 },
    ],
    // 广州市各区
    'guangzhou': [
        { name: '荔湾区', value: 88 },
        { name: '越秀区', value: 95 },
        { name: '海珠区', value: 90 },
        { name: '天河区', value: 98 },
        { name: '白云区', value: 82 },
        { name: '黄埔区', value: 85 },
        { name: '番禺区', value: 80 },
        { name: '花都区', value: 75 },
        { name: '南沙区', value: 78 },
        { name: '从化区', value: 65 },
        { name: '增城区', value: 68 },
    ],
    // 深圳市各区
    'shenzhen': [
        { name: '罗湖区', value: 88 },
        { name: '福田区', value: 95 },
        { name: '南山区', value: 98 },
        { name: '宝安区', value: 85 },
        { name: '龙岗区', value: 82 },
        { name: '盐田区', value: 78 },
        { name: '龙华区', value: 88 },
        { name: '坪山区', value: 75 },
        { name: '光明区', value: 72 },
    ],
    // 北京市各区
    'beijing': [
        { name: '东城区', value: 95 },
        { name: '西城区', value: 88 },
        { name: '朝阳区', value: 92 },
        { name: '丰台区', value: 78 },
        { name: '石景山区', value: 65 },
        { name: '海淀区', value: 98 },
        { name: '门头沟区', value: 45 },
        { name: '房山区', value: 52 },
        { name: '通州区', value: 68 },
        { name: '顺义区', value: 58 },
        { name: '昌平区', value: 72 },
        { name: '大兴区', value: 63 },
        { name: '怀柔区', value: 38 },
        { name: '平谷区', value: 35 },
        { name: '密云区', value: 42 },
        { name: '延庆区', value: 28 },
    ],
    // 上海市各区
    'shanghai': [
        { name: '黄浦区', value: 96 },
        { name: '徐汇区', value: 89 },
        { name: '长宁区', value: 85 },
        { name: '静安区', value: 92 },
        { name: '普陀区', value: 78 },
        { name: '虹口区', value: 82 },
        { name: '杨浦区', value: 88 },
        { name: '闵行区', value: 75 },
        { name: '宝山区', value: 68 },
        { name: '嘉定区', value: 72 },
        { name: '浦东新区', value: 94 },
        { name: '金山区', value: 55 },
        { name: '松江区', value: 69 },
        { name: '青浦区', value: 62 },
        { name: '奉贤区', value: 58 },
        { name: '崇明区', value: 45 },
    ],
    // 天津市各区
    'tianjin': [
        { name: '和平区', value: 92 },
        { name: '河东区', value: 85 },
        { name: '河西区', value: 88 },
        { name: '南开区', value: 90 },
        { name: '河北区', value: 78 },
        { name: '红桥区', value: 75 },
        { name: '东丽区', value: 68 },
        { name: '西青区', value: 72 },
        { name: '津南区', value: 65 },
        { name: '北辰区', value: 70 },
        { name: '武清区', value: 73 },
        { name: '宝坻区', value: 60 },
        { name: '滨海新区', value: 95 },
        { name: '宁河区', value: 55 },
        { name: '静海区', value: 58 },
        { name: '蓟州区', value: 52 },
    ],
    // 重庆市各区县
    'chongqing': [
        { name: '万州区', value: 75 },
        { name: '涪陵区', value: 72 },
        { name: '渝中区', value: 95 },
        { name: '大渡口区', value: 78 },
        { name: '江北区', value: 92 },
        { name: '沙坪坝区', value: 88 },
        { name: '九龙坡区', value: 85 },
        { name: '南岸区', value: 90 },
        { name: '北碚区', value: 80 },
        { name: '綦江区', value: 65 },
        { name: '大足区', value: 68 },
        { name: '渝北区', value: 93 },
        { name: '巴南区', value: 82 },
        { name: '黔江区', value: 60 },
        { name: '长寿区', value: 70 },
        { name: '江津区', value: 75 },
        { name: '合川区', value: 72 },
        { name: '永川区', value: 78 },
        { name: '南川区', value: 65 },
        { name: '璧山区', value: 80 },
        { name: '铜梁区', value: 68 },
        { name: '潼南区', value: 62 },
        { name: '荣昌区', value: 70 },
        { name: '开州区', value: 58 },
        { name: '梁平区', value: 60 },
        { name: '武隆区', value: 55 },
    ],
    // 成都市各区县
    'chengdu': [
        { name: '锦江区', value: 95 },
        { name: '青羊区', value: 92 },
        { name: '金牛区', value: 88 },
        { name: '武侯区', value: 90 },
        { name: '成华区', value: 85 },
        { name: '龙泉驿区', value: 78 },
        { name: '青白江区', value: 68 },
        { name: '新都区', value: 75 },
        { name: '温江区', value: 72 },
        { name: '双流区', value: 82 },
        { name: '郫都区', value: 80 },
        { name: '新津区', value: 70 },
        { name: '金堂县', value: 62 },
        { name: '大邑县', value: 58 },
        { name: '蒲江县', value: 55 },
        { name: '都江堰市', value: 73 },
        { name: '彭州市', value: 68 },
        { name: '邛崃市', value: 65 },
        { name: '崇州市', value: 67 },
        { name: '简阳市', value: 70 },
    ],
}

// 获取本地地图 JSON 文件路径
export function getMapJsonPath(name: string): string {
    return `/map/${name}.json`
}

// 根据区域名称获取配置
export function getMapRegionByName(name: string): MapRegionConfig | undefined {
    return mapRegions.find(r => r.name === name)
}

// 获取地图选项列表（用于 Select 组件）
export function getMapRegionOptions() {
    return mapRegions.map(r => ({
        value: r.name,
        label: r.label
    }))
}

// 根据层级获取地图选项
export function getMapRegionOptionsByLevel(level: 'country' | 'province' | 'city' | 'district') {
    return mapRegions
        .filter(r => r.level === level)
        .map(r => ({
            value: r.name,
            label: r.label
        }))
}

// 获取省份的城市数据
export function getCityDataByProvince(provinceName: string): Array<{ name: string; value: number }> {
    return cityMapData[provinceName] || []
}

// 获取城市的区县数据
export function getDistrictDataByCity(cityName: string): Array<{ name: string; value: number }> {
    return districtMapData[cityName] || []
}

// 检查是否有城市级数据
export function hasCityData(provinceName: string): boolean {
    return !!cityMapData[provinceName]
}

// 检查是否有区县级数据
export function hasDistrictData(cityName: string): boolean {
    return !!districtMapData[cityName]
}

// 获取所有有城市数据的省份
export function getProvincesWithCityData(): MapRegionConfig[] {
    return mapRegions.filter(r => r.level === 'province' && hasCityData(r.name))
}

// 获取所有有区县数据的城市
export function getCitiesWithDistrictData(): MapRegionConfig[] {
    return mapRegions.filter(r => r.level === 'city' && hasDistrictData(r.name))
}

// 根据父级获取子级选项
export function getChildRegionOptions(parentName: string): Array<{ value: string; label: string }> {
    return mapRegions
        .filter(r => r.parent === parentName)
        .map(r => ({
            value: r.name,
            label: r.label
        }))
}

// 获取省份下的城市选项
export function getCityOptionsByProvince(provinceName: string): Array<{ value: string; label: string }> {
    return mapRegions
        .filter(r => r.level === 'city' && r.parent === provinceName)
        .map(r => ({
            value: r.name,
            label: r.label
        }))
}

// 获取城市地图的级联选择器选项（省-市结构）
export function getCityMapCascaderOptions() {
    // 获取所有省份
    const provinces = mapRegions.filter(r => r.level === 'province')
    
    return provinces.map(province => {
        // 获取该省份下的所有城市（不限制是否有区县数据）
        const cities = mapRegions
            .filter(r => r.level === 'city' && r.parent === province.name)
        
        // 如果省份本身是直辖市（如北京、上海、天津、重庆），也加入选项
        const options: Array<{ value: string; label: string }> = []
        
        // 直辖市：省份本身就是城市
        if (province.name === 'beijing' || province.name === 'tianjin' || 
            province.name === 'shanghai' || province.name === 'chongqing') {
            options.push({
                value: province.name,
                label: province.label
            })
        }
        
        // 添加该省份下的城市
        cities.forEach(city => {
            options.push({
                value: city.name,
                label: city.label
            })
        })
        
        // 只返回有城市数据的省份
        if (options.length > 0) {
            return {
                value: province.name,
                label: province.label,
                children: options
            }
        }
        
        return null
    }).filter(Boolean) as Array<{ value: string; label: string; children: Array<{ value: string; label: string }> }>
}

// 根据城市名称获取其省份和城市的级联路径
export function getCityMapCascaderPath(cityName: string): [string, string] | null {
    const city = mapRegions.find(r => r.name === cityName)
    if (!city) return null
    
    // 如果是直辖市（level为province），返回自己作为省和市
    if (city.level === 'province') {
        return [cityName, cityName]
    }
    
    // 如果是城市，返回其父级省份和自己
    if (city.level === 'city' && city.parent) {
        return [city.parent, cityName]
    }
    
    return null
}
