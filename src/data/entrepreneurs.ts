// 全景式创业叙事 - 6 位创始人数据
// 内容为公开资料综合梳理,仅做信息密度优化

export interface FundingRound {
  round: string;            // 轮次: 天使/A/B/C...
  year: number;
  amount: string;           // 金额
  investors: string[];      // 投资人
  valuation?: string;       // 估值(可选)
  note?: string;            // 备注
}

export interface Milestone {
  year: number;
  title: string;
  desc: string;
}

export interface FirstFunding {
  year: number;
  amount: string;
  investors: string[];
  reason: string;           // 为什么投/怎么拿到的
}

export interface Entrepreneur {
  id: string;
  order: string;            // "01" - "06"
  name: string;
  company: string;
  industry: string;         // 赛道
  founded: number;          // 创立年份
  listed: string;           // 上市状态
  birth: string;            // 出生年份与籍贯
  headline: string;         // 一句话主题
  tagline: string;          // 短标语
  color: string;            // 该人物专属强调色
  stats: { label: string; value: string }[];   // 关键数据牌
  experience: string[];     // 个人经历
  firstFunding: FirstFunding;
  fundingTimeline: FundingRound[];
  milestones: Milestone[];
  lessons: string[];        // 三条教训
}

export const entrepreneurs: Entrepreneur[] = [
  {
    id: 'wu-xinhong',
    order: '01',
    name: '吴欣鸿',
    company: '美图秀秀',
    industry: '工具 × 影像美学',
    founded: 2008,
    listed: '港股 1357.HK · 2016',
    birth: '1981 · 福建泉州',
    headline: '工具型产品的「审美红利」',
    tagline: '让普通人一键变美',
    color: '#c9a961',
    stats: [
      { label: '累计融资', value: '约 25 亿' },
      { label: '上市估值', value: '约 360 亿港币' },
      { label: '应用月活', value: '约 2.5 亿' },
    ],
    experience: [
      '1981 年生于福建泉州一个普通家庭,自小爱折腾,初中起自学 Photoshop 和网页制作。',
      '高中时已经靠给企业做网站赚钱,2002 年高考前选择休学创业,母亲一度以为他「走火入魔」。',
      '2003 年创立「极致图片工坊」,主打非专业用户也能修图——这是美图秀秀最早的雏形。',
      '2006 年靠一款「火星文输入法」一夜成名,这款小工具让他赚到了人生第一个百万,也让他意识到:年轻人需要的不是「有用的产品」,而是「有面子的产品」。',
      '2008 年正式推出「美图秀秀」,把专业修图变成「一键磨皮、瘦脸、滤镜」,精准踩中社交网络兴起后第一波颜值经济的红利。',
    ],
    firstFunding: {
      year: 2008,
      amount: '未披露 · 数百万元级',
      investors: ['蔡文胜(隆领投资)'],
      reason: '蔡文胜是吴欣鸿多年的「带头大哥」,从他做域名生意起就相互扶持。蔡文胜看中的不是商业模式,而是「这个 25 岁的年轻人,能 24 小时盯着服务器,3 个月迭代 18 个版本」的狠劲。',
    },
    fundingTimeline: [
      { round: '天使', year: 2008, amount: '未披露', investors: ['蔡文胜 · 隆领投资'], note: '兄长式输血' },
      { round: 'A 轮', year: 2011, amount: '数千万', investors: ['IDG 资本', 'A8 音乐'], note: 'PC 端用户破亿' },
      { round: 'B 轮', year: 2013, amount: '数亿元', investors: ['IDG 资本', '启明创投', '华夏基金'], note: '移动端发力' },
      { round: 'C 轮', year: 2014, amount: '数亿美元', investors: ['IDG · 启明 · 老虎基金'], valuation: '超 30 亿美元' },
      { round: '战略', year: 2015, amount: '数亿元', investors: ['富士康 · 京东方'], note: '为美图手机铺路' },
      { round: 'IPO', year: 2016, amount: '——', investors: ['港交所 1357.HK'], valuation: '约 360 亿港币' },
    ],
    milestones: [
      { year: 2008, title: '美图秀秀正式上线', desc: '主打一键式修图,90 天用户突破 100 万。' },
      { year: 2011, title: '移动端转型', desc: 'Android 与 iOS 双端发力,登顶摄影类 App 榜首。' },
      { year: 2013, title: '美图手机立项', desc: '硬件梦开始,但也埋下后续的亏损隐患。' },
      { year: 2016, title: '港交所敲钟', desc: '成为「中国图片美化第一股」,市值巅峰 360 亿港币。' },
      { year: 2018, title: '手机业务交小米', desc: '硬件梦碎,转回软件与影像 SaaS。' },
      { year: 2020, title: '影像 SaaS 转型', desc: '推出美图宜肤、美图设计室等 B 端产品。' },
      { year: 2024, title: 'All in AIGC', desc: '发布「美图奇想大模型」,营收重回百亿规模。' },
    ],
    lessons: [
      '工具可以 IPO,但很难成为巨头——美图用 16 年才把命运重新拽回增长。',
      '「审美」是最容易被低估的产品能力,也是最长情的护城河。',
      '当流量红利见顶,创始人必须亲自下场做转型——吴欣鸿回到了工位。',
    ],
  },
  {
    id: 'shen-peng',
    order: '02',
    name: '沈鹏',
    company: '水滴公司',
    industry: '保险 × 大病众筹',
    founded: 2016,
    listed: '美股 WDH · 2021',
    birth: '1987 · 山东临沂',
    headline: '互联网保险的「信任难题」',
    tagline: '用善意起家,在监管中长大',
    color: '#b94a3d',
    stats: [
      { label: '累计融资', value: '约 40 亿' },
      { label: '上市首日', value: '约 50 亿美元' },
      { label: '累计捐款人', value: '约 3.5 亿' },
    ],
    experience: [
      '1987 年生于山东临沂,大学没毕业就开始折腾:卖过保险、摆过地摊,被美团创始人王兴看中是 2010 年。',
      '加入美团后,沈鹏一路做到全国业务负责人,编号第 10 号员工——他亲眼见证了一家 30 人的小公司如何血战到 3 万人的「地推铁军」。',
      '2015 年底母亲查出癌症,水滴互助在病床前立项。',
      '2016 年 5 月正式创办水滴公司,带着一整支从美团、阿里、腾讯出来的人马。',
      '他没有把水滴筹当成「慈善项目」,而是用「保险+众筹+医疗」的组合,把「救急救穷」做成了一条业务流。',
    ],
    firstFunding: {
      year: 2016,
      amount: '5000 万人民币',
      investors: ['美团 · 王兴(个人)', 'IDG 资本', '真格基金', '点亮资本'],
      reason: '王兴「投人不投赛道」是 VC 圈的佳话。沈鹏拿着 BP 去找王兴,王兴只问了一句:「你能组到一支像美团那样的地推团队吗?」沈鹏说能——这是打动王兴的最后一根稻草。',
    },
    fundingTimeline: [
      { round: '天使', year: 2016, amount: '5000 万', investors: ['美团 · 王兴(个人)', 'IDG', '真格', '点亮'], note: '美团式信任' },
      { round: 'A 轮', year: 2017, amount: '1.6 亿', investors: ['腾讯 · 蓝驰创投'], note: '腾讯入局' },
      { round: 'A+ 轮', year: 2018, amount: '数亿', investors: ['中金 · 蓝驰'], note: '保险牌照筹备' },
      { round: 'B 轮', year: 2019, amount: '近 10 亿', investors: ['博裕 · 腾讯领投', '中金'], valuation: '约 30 亿美元' },
      { round: 'C 轮', year: 2020, amount: '数亿美元', investors: ['瑞士再保险 · 腾讯'], note: '国际化战略' },
      { round: 'IPO', year: 2021, amount: '——', investors: ['纽交所 WDH'], valuation: '约 50 亿美元' },
    ],
    milestones: [
      { year: 2016, title: '水滴筹上线', desc: '凭借美团式地推,3 个月铺满全国 30 城。' },
      { year: 2017, title: '水滴保上线', desc: '切入互联网保险经纪,成为第二增长曲线。' },
      { year: 2018, title: '德云社事件', desc: '众筹信任危机爆发,水滴首次遭遇全网质疑。' },
      { year: 2019, title: '暂停地推', desc: '向合规转身,主动撤掉 70% 城市推广点。' },
      { year: 2021, title: '纽交所上市', desc: '中国「保险科技第一股」,首日市值约 50 亿美元。' },
      { year: 2022, title: '股价腰斩', desc: '中概股退市风波叠加监管,跌去 90% 市值。' },
      { year: 2024, title: '盈利转向', desc: '开始聚焦高利润保险,关闭低效筹款业务。' },
    ],
    lessons: [
      '信任经济的护城河是「合规」,不是「流量」——一次危机就能烧光十年品牌。',
      '「前美团人」是把双刃剑:能复制执行力,也容易在公益场景里用力过猛。',
      'IPO 不是终点,中概股的系统性风险,所有「赚美股钱」的人都得算清楚。',
    ],
  },
  {
    id: 'zhou-feng',
    order: '03',
    name: '周峰',
    company: '鱼泡直聘',
    industry: '招聘 × 蓝领赛道',
    founded: 2018,
    listed: '未上市',
    birth: '1986 · 四川成都',
    headline: '蓝领招聘的「脏活赛道」',
    tagline: '把工地搬进手机',
    color: '#2f4a3a',
    stats: [
      { label: '累计融资', value: '数亿元' },
      { label: '用户规模', value: '超 1.2 亿' },
      { label: '月活用户', value: '约 4500 万' },
    ],
    experience: [
      '1986 年生于四川成都,父母在建筑工地做工,周峰从小跟着在工地上混,对「找活儿难、招人难」这件事有切肤之痛。',
      '大学毕业后做过工地管理、劳务派遣,2010 年开始在 PC 端做「建筑招工」网站,十年磨一剑,见过太多行业冷暖。',
      '2018 年把 PC 业务全部砍掉,All in 移动端,「鱼泡直聘」正式立项——他赌的是:4 亿蓝领才是中国劳动力市场被忽视的那 90%。',
      '他用「免费发、免费聊、不收中介费」撬动第一批用户,把工地搬进微信群,把工头变成「蓝领版 KOL」。',
      '周峰说自己最骄傲的事是:「让一个工人在工地上,能用三分钟找到下一份工。」',
    ],
    firstFunding: {
      year: 2019,
      amount: '数千万元',
      investors: ['顺为资本 · 梅花创投'],
      reason: '顺为的判断是:中国白领招聘已经有 BOSS 直聘,但 4 亿蓝领依然是「电话+告示」的市场,周峰既有地推经验,又懂工地,这种「接地气」的创始人在成都很难找。',
    },
    fundingTimeline: [
      { round: '种子', year: 2018, amount: '数百万', investors: ['天使投资人'], note: 'MVP 验证' },
      { round: 'Pre-A', year: 2019, amount: '数千万', investors: ['顺为资本', '梅花创投'], note: '雷军系入局' },
      { round: 'A 轮', year: 2020, amount: '数亿元', investors: ['顺为 · 不惑创投', '梅花'], note: '下沉市场扩张' },
      { round: 'B 轮', year: 2022, amount: '数亿元', investors: ['君联资本 · 钟鼎资本'], note: '技工 + 蓝领全覆盖' },
      { round: 'C 轮', year: 2024, amount: '数亿元', investors: ['蓝驰创投 · 顺为'], note: '押注出海与 AI 匹配' },
    ],
    milestones: [
      { year: 2018, title: '鱼泡直聘正式上线', desc: '砍掉 PC 业务,All in 移动端。' },
      { year: 2020, title: '突破 1000 万月活', desc: '抓住蓝领「找活」刚需,跑通商业模式。' },
      { year: 2022, title: '技工与蓝领双轨', desc: '上探到月薪 1.5 万的技工市场,反攻 BOSS 直聘盲区。' },
      { year: 2023, title: '出海试水', desc: '把「中国蓝领模式」复制到东南亚与中东。' },
      { year: 2024, title: 'AI 智能匹配', desc: '用大模型重写「工头—工人」的撮合逻辑。' },
    ],
    lessons: [
      '越是「脏活赛道」,越需要创始人亲自下场——周峰到现在还跑工地。',
      '「免费」是蓝领赛道的最强武器,但「免费」要建立在低履约成本之上。',
      '做下沉市场,得学会用「老乡带老乡」撬动规模,而不是烧钱投放。',
    ],
  },
  {
    id: 'wang-ning',
    order: '04',
    name: '王宁',
    company: '泡泡玛特',
    industry: 'IP × 潮玩',
    founded: 2010,
    listed: '港股 09992.HK · 2020',
    birth: '1987 · 河南郑州',
    headline: 'IP 商业的「无中生有」',
    tagline: '为一代人造一个「精神玩伴」',
    color: '#7c4a8c',
    stats: [
      { label: '累计融资', value: '约 20 亿' },
      { label: '上市市值', value: '约 1500 亿港币' },
      { label: '会员数', value: '超 4600 万' },
    ],
    experience: [
      '1987 年生于河南郑州,父母是普通工人,从小爱逛各种「杂货市场」,对「小物件的生意」有天然的敏感。',
      '2009 年大学毕业后在北京做过 4 年「格子店」,把全世界的小玩意搬到中国商场里,赚到第一桶金。',
      '2010 年在北京中关村开出第一家「泡泡玛特」,最初只是「日本杂货+潮流单品」的集合店,既不性感,也不暴利。',
      '2014-2015 年公司一度濒临破产,SKU 杂乱、库存高企,王宁咬着牙把全国店铺从 36 家砍到 20 多家。',
      '2015 年底去香港出差,在 LOG-ON 看到 Sonny Angel 系列,回来后立即决定「聚焦 IP 盲盒」——这是泡泡玛特的命运转折点。',
      '2016 年与香港设计师王信明(Kenny Wong)签下 Molly 的独家授权,从此踏上「IP 商业」的不归路。',
    ],
    firstFunding: {
      year: 2015,
      amount: '数千万元',
      investors: ['华兴新经济基金'],
      reason: '华兴看中的不是王宁的财务数字,而是「这个河南男生对 IP 生意有审美直觉」,他能在 10 个杂货里挑出那 1 个会爆的——这是「华兴对消费品的审美判断」。',
    },
    fundingTimeline: [
      { round: 'Pre-A', year: 2016, amount: '数千万', investors: ['华兴新经济基金'], note: '盲盒战略启动' },
      { round: 'A 轮', year: 2017, amount: '数千万', investors: ['黑蚁资本'], note: 'Molly 单品爆红' },
      { round: 'B 轮', year: 2018, amount: '数亿', investors: ['红杉中国 · 华兴 · 启明'], valuation: '约 25 亿美元', note: '签约更多 IP' },
      { round: 'Pre-IPO', year: 2019, amount: '1 亿美元', investors: ['红杉 · 黑蚁 · 蜂巧'], note: '为上市铺路' },
      { round: 'IPO', year: 2020, amount: '——', investors: ['港交所 09992.HK'], valuation: '约 1100 亿港币' },
    ],
    milestones: [
      { year: 2010, title: '北京中关村开店', desc: '首家泡泡玛特是「日本杂货集合店」。' },
      { year: 2015, title: '砍 SKU 战略', desc: '从 1 万 SKU 砍到几十个 IP,押注盲盒。' },
      { year: 2016, title: '签下 Molly', desc: '与设计师王信明签约,IP 商业化起飞。' },
      { year: 2017, title: '潮玩展举办', desc: '首届北京国际潮玩展,亚文化破圈。' },
      { year: 2020, title: '港交所敲钟', desc: '首日股价翻倍,市值破千亿港币。' },
      { year: 2021, title: '股价高点', desc: '总市值一度逼近 1500 亿港币。' },
      { year: 2023, title: '海外扩张', desc: '东南亚、北美、欧洲门店全面铺开。' },
    ],
    lessons: [
      '「无中生有」是 IP 商业的核心能力——Molly 之前没人相信一个撅嘴小女孩能卖 100 亿。',
      '审美是 founder 的「隐性资产」,王宁的杂货店经验,在潮玩时代终于兑现。',
      '消费品 IPO 后,「下一个爆款 IP」会变成最难的事——这是泡泡玛特必须跨过的下一关。',
    ],
  },
  {
    id: 'zhang-junjie',
    order: '05',
    name: '张俊杰',
    company: '霸王茶姬',
    industry: '新茶饮 × 东方审美',
    founded: 2017,
    listed: '美股 CHA · 2025',
    birth: '1993 · 云南昆明',
    headline: '新茶饮的「农村包围城市」',
    tagline: '在县城卖东方茶',
    color: '#3b6b5b',
    stats: [
      { label: '累计融资', value: '数亿美元' },
      { label: '全球门店', value: '超 6000 家' },
      { label: '月均 GMV', value: '超 30 亿元' },
    ],
    experience: [
      '1993 年生于云南昆明,父母是普通工薪族,高中时就在昆明夜市摆摊卖奶茶,2014 年开了第一家「皇茶」小店。',
      '2017 年把「皇茶」升级为「霸王茶姬」,主打「原叶鲜奶茶 + 东方美学」,把茶饮做成「东方星巴克」的雏形。',
      '一开始在云南、广西等二三线城市开店,「绕开喜茶、奈雪的主战场」,在县城里积累品牌势能。',
      '2019 年拿到第一笔机构投资,开始大举扩张,2021 年门店突破 500 家,2023 年突破 3000 家。',
      '2024 年单店年 GMV 突破千万,被业内称为「最会挣钱的茶饮品牌」,估值一度突破 50 亿美元。',
      '2025 年 4 月在纳斯达克上市,首日股价大涨,市值约 60 亿美元。',
    ],
    firstFunding: {
      year: 2019,
      amount: '数千万元',
      investors: ['复星集团 · XVC'],
      reason: '复星看中的是「在喜茶、奈雪围城里,用东方茶+县城策略撕开一条新路」的差异化,XVC 看中的是「创始人对单店模型的极致打磨」——单店日销 1000 杯时,张俊杰依然亲自盯茶汤温度。',
    },
    fundingTimeline: [
      { round: '天使', year: 2018, amount: '数千万', investors: ['XVC · 复星'], note: '县城拓店启动' },
      { round: 'A 轮', year: 2021, amount: '数亿美元', investors: ['XVC · 复星 · 弘毅'], valuation: '约 20 亿美元', note: '门店破 500' },
      { round: 'B 轮', year: 2023, amount: '数亿美元', investors: ['红杉 · XVC · 复星'], valuation: '约 30 亿美元', note: '门店破 3000' },
      { round: 'C 轮', year: 2024, amount: '数亿美元', investors: ['XVC · 红杉'], valuation: '约 50 亿美元', note: '出海启动' },
      { round: 'IPO', year: 2025, amount: '——', investors: ['纳斯达克 CHA'], valuation: '约 60 亿美元' },
    ],
    milestones: [
      { year: 2014, title: '开第一家奶茶店', desc: '在昆明夜市摆摊,17 岁的张俊杰拿到第一桶金。' },
      { year: 2017, title: '品牌升级', desc: '皇茶改名霸王茶姬,定位「东方茶」。' },
      { year: 2019, title: '机构化', desc: 'XVC、复星入局,正式开启扩张。' },
      { year: 2021, title: '门店破 500', desc: '成为新茶饮第二梯队的领跑者。' },
      { year: 2023, title: '门店破 3000', desc: '超越奈雪、逼近喜茶规模。' },
      { year: 2024, title: '出海加速', desc: '东南亚、北美市场铺开,海外门店超 200 家。' },
      { year: 2025, title: '纳斯达克上市', desc: '「东方茶第一股」,市值约 60 亿美元。' },
    ],
    lessons: [
      '在巨头林立的市场里,「差异化」比「高端」更值钱——县城包围城市是经典战略。',
      '「单店模型」是新茶饮的命门,张俊杰把每杯茶的成本控制到极致。',
      '「东方审美」是一种被低估的产品力,它能让新茶饮摆脱同质化。',
    ],
  },
  {
    id: 'cheng-wei',
    order: '06',
    name: '程维',
    company: '滴滴出行',
    industry: '出行 × 平台经济',
    founded: 2012,
    listed: '美股 DIDI · 2021',
    birth: '1983 · 江西上饶',
    headline: '平台经济的「烧钱修罗场」',
    tagline: '从 80 万到 800 亿美金',
    color: '#4a6c8c',
    stats: [
      { label: '累计融资', value: '约 350 亿美元' },
      { label: '上市市值', value: '约 700 亿美元' },
      { label: '日均订单', value: '约 3000 万' },
    ],
    experience: [
      '1983 年生于江西上饶,父母是国营工厂的工人,家里条件普通。',
      '北京化工大学毕业后做了 8 年保险销售,业绩从垫底干到区域销冠,2005 年被朋友推荐进阿里,从此踏入互联网。',
      '在阿里 B2B 一干就是 8 年,做到区域经理、最年轻 P8 之一,「地推、烧钱、血战」的阿里基因刻进骨髓。',
      '2012 年因为打不到出租车,灵感突发,找到前阿里同事王刚,借了 80 万启动资金,「滴滴」立项——这一年他 29 岁。',
      '他用 4 个月跑通北京 189 家出租车公司,签下 1000 多名司机,2012 年底就拿到了 A 轮 300 万美元。',
    ],
    firstFunding: {
      year: 2012,
      amount: '70 万人民币',
      investors: ['王刚(前阿里同事,天使投资人)'],
      reason: '这是一个「投人不投赛道」的天使样板:王刚和程维都在阿里 B2B 干过,他相信「程维这样在阿里血战出来的、做过地推的 28 岁年轻人,做打车,一定做得成」——70 万是「投给一个 28 岁的人」。',
    },
    fundingTimeline: [
      { round: '天使', year: 2012, amount: '70 万', investors: ['王刚'], note: '从同事变投资人' },
      { round: 'A 轮', year: 2012, amount: '300 万美元', investors: ['金沙江创投'], note: '朱啸虎入局' },
      { round: 'B 轮', year: 2013, amount: '1500 万美元', investors: ['腾讯领投'], note: '微信支付入场' },
      { round: 'C 轮', year: 2014, amount: '1 亿美元', investors: ['腾讯 · DST'], note: '补贴战启动' },
      { round: 'D 轮', year: 2015, amount: '数亿美元', investors: ['中投 · 淡马锡'], valuation: '165 亿美元', note: '合并快的' },
      { round: '战略', year: 2016, amount: '——', investors: ['苹果 · 软银 · 阿里'], note: '收购 Uber 中国' },
      { round: 'E 轮', year: 2017, amount: '数亿美元', investors: ['软银 · 招商银行'], note: '国际化 + 自动驾驶' },
      { round: 'IPO', year: 2021, amount: '——', investors: ['纽交所 DIDI'], valuation: '约 700 亿美元' },
    ],
    milestones: [
      { year: 2012, title: '滴滴立项', desc: '4 个月跑通北京出租车公司,签 1000 司机。' },
      { year: 2013, title: '补贴大战', desc: '腾讯入局,与快的展开 5 亿红包大战。' },
      { year: 2015, title: '合并快的', desc: '阿里腾讯从血战到联姻,程维任 CEO。' },
      { year: 2016, title: '收购 Uber 中国', desc: '结束中国出行战争,程维 33 岁登顶。' },
      { year: 2018, title: '顺风车危机', desc: '两起安全事件,公司全面整改,顺风车下线 1 年。' },
      { year: 2021, title: '纽交所上市', desc: '首日市值约 700 亿美元,中概股最大 IPO。' },
      { year: 2022, title: '美股退市', desc: '受中概股退市令影响,转回港股。' },
      { year: 2024, title: '重启增长', desc: '国际化 + 自动驾驶 + 跑腿,重新进入第二曲线。' },
    ],
    lessons: [
      '平台经济是「赢者通吃」,但也是「监管重锤」——必须学会与监管共舞。',
      '「烧钱」能烧出规模,烧不出护城河——滴滴用 8 年才学会合规。',
      '中概股的「出生地」决定命运——美国上市,赚的是中国市场的钱,代价是政策风险。',
    ],
  },
];
