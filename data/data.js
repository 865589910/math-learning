// 所有学习数据
const learningData = {
    // 一、核心概念字
    section1: {
        numbers: [
            { word: '零', pinyin: 'líng', explanation: '数字0，表示没有或者什么都不存在。例如：0个苹果就是一个苹果也没有。', type: 'single' },
            { word: '一', pinyin: 'yī', explanation: '数字1，最小的自然数。例如：1个人、1本书。', type: 'single' },
            { word: '二', pinyin: 'èr', explanation: '数字2，表示两个。例如：2只手、2只眼睛。', type: 'single' },
            { word: '三', pinyin: 'sān', explanation: '数字3，表示三个。例如：3支铅笔、3个人。', type: 'single' },
            { word: '四', pinyin: 'sì', explanation: '数字4，表示四个。例如：4条腿、4个角。', type: 'single' },
            { word: '五', pinyin: 'wǔ', explanation: '数字5，表示五个。例如：1只手有5个手指。', type: 'single' },
            { word: '六', pinyin: 'liù', explanation: '数字6，表示六个。例如：6朵花、6个苹果。', type: 'single' },
            { word: '七', pinyin: 'qī', explanation: '数字7，表示七个。例如：1个星期有7天。', type: 'single' },
            { word: '八', pinyin: 'bā', explanation: '数字8，表示八个。例如：8颗糖、8只小鸟。', type: 'single' },
            { word: '九', pinyin: 'jiǔ', explanation: '数字9，表示九个。例如：9朵云、9辆车。', type: 'single' },
            { word: '十', pinyin: 'shí', explanation: '数字10，表示十个，是两位数的开始。例如：10根手指。', type: 'single' },
            { word: '个', pinyin: 'gè', explanation: '数位，从右边数起的第一位。例如：25的个位是5。', type: 'single' },
            { word: '百', pinyin: 'bǎi', explanation: '百位，表示一百。例如：一百个人、两百本书。', type: 'single' },
            { word: '千', pinyin: 'qiān', explanation: '千位，表示一千。例如：一千米、两千元。', type: 'single' },
            { word: '万', pinyin: 'wàn', explanation: '万位，表示一万。例如：一万元、两万人。', type: 'single' }
        ],
        operations: [
            { word: '加', pinyin: 'jiā', explanation: '把两个数合并成一个数的运算。加数+加数=和。例如：3+2=5。', type: 'single' },
            { word: '减', pinyin: 'jiǎn', explanation: '从一个数中去掉一部分求剩下多少的运算。被减数-减数=差。例如：5-2=3。', type: 'single' },
            { word: '乘', pinyin: 'chéng', explanation: '求几个相同加数的和的简便运算。乘数×乘数=积。例如：3×2=6。', type: 'single' },
            { word: '除', pinyin: 'chú', explanation: '平均分物品的运算。被除数÷除数=商。例如：6÷2=3。', type: 'single' },
            { word: '差', pinyin: 'chā', explanation: '减法的结果叫做差。例如：5-2=3，3就是差。', type: 'single' },
            { word: '和', pinyin: 'hé', explanation: '加法的结果叫做和。例如：3+2=5，5就是和。', type: 'single' },
            { word: '积', pinyin: 'jī', explanation: '乘法的结果叫做积。例如：3×2=6，6就是积。', type: 'single' },
            { word: '商', pinyin: 'shāng', explanation: '除法的结果叫做商。例如：6÷2=3，3就是商。', type: 'single' },
            { word: '＋', pinyin: 'jiā hào', explanation: '加号，表示加法运算的符号。', type: 'single' },
            { word: '－', pinyin: 'jiǎn hào', explanation: '减号，表示减法运算的符号。', type: 'single' },
            { word: '×', pinyin: 'chéng hào', explanation: '乘号，表示乘法运算的符号。', type: 'single' },
            { word: '÷', pinyin: 'chú hào', explanation: '除号，表示除法运算的符号。', type: 'single' },
            { word: '加数', pinyin: 'jiā shù', explanation: '加法算式中相加的数。例如：3+5=8，3和5都是加数。', type: 'phrase' },
            { word: '被减数', pinyin: 'bèi jiǎn shù', explanation: '减法算式中被减去的数。例如：10-3=7，10是被减数。', type: 'phrase' },
            { word: '减数', pinyin: 'jiǎn shù', explanation: '减法算式中减去的数。例如：10-3=7，3是减数。', type: 'phrase' },
            { word: '乘数', pinyin: 'chéng shù', explanation: '乘法算式中相乘的数。例如：4×2=8，4和2都是乘数。', type: 'phrase' },
            { word: '被除数', pinyin: 'bèi chú shù', explanation: '除法算式中被分的数。例如：12÷3=4，12是被除数。', type: 'phrase' },
            { word: '除数', pinyin: 'chú shù', explanation: '除法算式中去分的数。例如：12÷3=4，3是除数。', type: 'phrase' },
            { word: '=', pinyin: 'děng hào', explanation: '等号，表示左边的数等于右边的数。', type: 'single' },
            { word: '>', pinyin: 'dà yú hào', explanation: '大于号，表示左边的数大于右边的数。', type: 'single' },
            { word: '<', pinyin: 'xiǎo yú hào', explanation: '小于号，表示左边的数小于右边的数。', type: 'single' },
            { word: '算式', pinyin: 'suàn shì', explanation: '用数字和运算符号组成的式子。例如：3+5=8。', type: 'phrase' },
            { word: '计算', pinyin: 'jì suàn', explanation: '根据算式求出答案。', type: 'phrase' }
        ],
        positions: [
            { word: '行', pinyin: 'háng', explanation: '横排叫做行（háng），从左到右的一排。注意：行是多音字，表示“行列”时读háng，表示“行走”时读xíng。', type: 'single' },
            { word: '列', pinyin: 'liè', explanation: '竖排叫做列，从上到下的一排。', type: 'single' },
            { word: '排', pinyin: 'pái', explanation: '按顺序站成一行或多行。', type: 'single' },
            { word: '上', pinyin: 'shàng', explanation: '位置在高处，跟"下"相对。', type: 'single' },
            { word: '下', pinyin: 'xià', explanation: '位置在低处，跟"上"相对。', type: 'single' },
            { word: '左', pinyin: 'zuǒ', explanation: '方向，面向南时，东的一边。', type: 'single' },
            { word: '右', pinyin: 'yòu', explanation: '方向，面向南时，西的一边。', type: 'single' },
            { word: '前', pinyin: 'qián', explanation: '方向，正对着的方向。', type: 'single' },
            { word: '后', pinyin: 'hòu', explanation: '方向，背对着的方向。', type: 'single' },
            { word: '东', pinyin: 'dōng', explanation: '方向，太阳升起的一边。', type: 'single' },
            { word: '西', pinyin: 'xī', explanation: '方向，太阳落下的一边。', type: 'single' },
            { word: '南', pinyin: 'nán', explanation: '方向，早晨面对太阳时右手的一边。', type: 'single' },
            { word: '北', pinyin: 'běi', explanation: '方向，早晨面对太阳时左手的一边。', type: 'single' },
            { word: '里', pinyin: 'lǐ', explanation: '在内部，在里面。', type: 'single' },
            { word: '内', pinyin: 'nèi', explanation: '在里面，跟"外"相对。', type: 'single' },
            { word: '外', pinyin: 'wài', explanation: '在外面，跟"内"相对。', type: 'single' }
        ],
        comparisons: [
            { word: '大', pinyin: 'dà', explanation: '指面积、体积、容量、数量、强度、力量超过一般或超过所比较的对象。', type: 'single' },
            { word: '小', pinyin: 'xiǎo', explanation: '指面积、体积、容量、数量、强度、力量不及一般或不及所比较的对象。', type: 'single' },
            { word: '多', pinyin: 'duō', explanation: '数量大，跟"少"相对。', type: 'single' },
            { word: '少', pinyin: 'shǎo', explanation: '数量小，跟"多"相对。', type: 'single' },
            { 
                word: '长', 
                pinyin: 'cháng', 
                explanation: '两端之间的距离大，跟"短"相对。', 
                examples: [
                    {
                        question: '一个长方体的盒子，长10厘米，宽5厘米，高3厘米，它的长比宽多多少厘米？',
                        analysis: '题目需要求两个长度的差值。',
                        formula: '10 - 5 = 5',
                        answer: '它的长比宽多5厘米。'
                    },
                    {
                        question: '一个正方形的边长是8厘米，它的周长是多少厘米？',
                        analysis: '题目需要计算正方形四条边的总长度。',
                        formula: '8 × 4 = 32',
                        answer: '它的周长是32厘米。'
                    }
                ],
                type: 'single' 
            },
            { word: '短', pinyin: 'duǎn', explanation: '两端之间的距离小，跟"长"相对。', type: 'single' },
            { word: '高', pinyin: 'gāo', explanation: '从下到上的距离大，跟"矮"相对。', type: 'single' },
            { word: '矮', pinyin: 'ǎi', explanation: '从下到上的距离小，跟"高"相对。', type: 'single' },
            { word: '轻', pinyin: 'qīng', explanation: '重量小，跟"重"相对。', type: 'single' },
            { word: '重', pinyin: 'zhòng', explanation: '重量大，跟"轻"相对。', type: 'single' },
            { word: '厚', pinyin: 'hòu', explanation: '扁平物体上下两面之间的距离大，跟"薄"相对。', type: 'single' },
            { word: '薄', pinyin: 'báo', explanation: '扁平物体上下两面之间的距离小，跟"厚"相对。', type: 'single' },
            { word: '快', pinyin: 'kuài', explanation: '速度大，跟"慢"相对。', type: 'single' },
            { word: '慢', pinyin: 'màn', explanation: '速度小，跟"快"相对。', type: 'single' }
        ],
        units: [
            { 
                word: '厘米', 
                pinyin: 'lí mǐ', 
                explanation: '长度单位，一米等于一百厘米。用cm表示。', 
                examples: [
                    {
                        question: '一支铅笔长15厘米，一把尺子长20厘米，铅笔比尺子短多少厘米？',
                        analysis: '题目需要求两个长度的差值。',
                        formula: '20 - 15 = 5',
                        answer: '铅笔比尺子短5厘米。'
                    }
                ],
                type: 'phrase' 
            },
            { 
                word: '米', 
                pinyin: 'mǐ', 
                explanation: '长度单位，一米等于一百厘米。用m表示。', 
                examples: [
                    {
                        question: '一根绳子长1米，用去了60厘米，还剩多少厘米？',
                        analysis: '题目需要先统一单位，再进行计算。',
                        formula: '1米 = 100厘米，100 - 60 = 40',
                        answer: '还嚐40厘米。'
                    }
                ],
                type: 'single' 
            },
            { word: '元', pinyin: 'yuán', explanation: '货币单位，一元等于十角。', type: 'single' },
            { word: '角', pinyin: 'jiǎo', explanation: '货币单位，一角等于十分，十角等于一元。', type: 'single' },
            { 
                word: '分', 
                pinyin: 'fēn', 
                explanation: '货币单位，十分等于一角。也可以表示时间单位，六十分等于一小时。', 
                examples: [
                    {
                        question: '上课时间是40分钟，课间休息10分钟，上课加课间一共是多少分钟？',
                        analysis: '题目要求将两个时间单位相加。',
                        formula: '40 + 10 = 50',
                        answer: '一共50分钟。'
                    }
                ],
                type: 'single' 
            },
            { 
                word: '时', 
                pinyin: 'shí', 
                explanation: '时间单位"小时"的简称，一小时等于六十分。', 
                examples: [
                    {
                        question: '钟面上，时针指到3，分针指刃12，现在是几时？',
                        analysis: '题目要求学生认读时钟。',
                        formula: '时针指到3，分针指刃12',
                        answer: '现在是3时。'
                    },
                    {
                        question: '小明早上8时上学，下午4时放学，他一天在学校多少小时？',
                        analysis: '题目要求计算两个时间点之间的时间间隔。',
                        formula: '下午4时就是16时，16 - 8 = 8',
                        answer: '他一天在学校8小时。'
                    },
                    {
                        question: '小红晚上7时开始写作业，写1小时，几点写完作业？',
                        analysis: '题目要求在开始时间上加上经过的时间。',
                        formula: '7时 + 1小时 = 8时',
                        answer: '头8点写完作业。'
                    }
                ],
                type: 'single' 
            },
            { word: '秒', pinyin: 'miǎo', explanation: '时间单位，六十秒等于一分。', type: 'single' },
            { word: '克', pinyin: 'kè', explanation: '重量单位，一千克等于一千克。用g表示。', type: 'single' },
            { word: '千克', pinyin: 'qiān kè', explanation: '重量单位，一千克等于一千克。也叫公斤，用kg表示。', type: 'phrase' }
        ],
        quantifiers: [
            { word: '个', pinyin: 'gè', explanation: '量词，用于没有专用量词的名词。例如：3个人、2个苹果。', type: 'single' },
            { word: '位', pinyin: 'wèi', explanation: '量词，用于人（含敬意）。例如：一位老师、两位客人。', type: 'single' },
            { word: '名', pinyin: 'míng', explanation: '量词，用于人。例如：三名学生、五名工人。', type: 'single' },
            { word: '人', pinyin: 'rén', explanation: '量词，用于计算人数。例如：10个人、20个人。', type: 'single' },
            { word: '只', pinyin: 'zhī', explanation: '量词，用于动物、器具等。例如：一只小鸟、两只手。', type: 'single' },
            { word: '辆', pinyin: 'liàng', explanation: '量词，用于车。例如：一辆汽车、三辆自行车。', type: 'single' },
            { word: '块', pinyin: 'kuài', explanation: '量词，用于块状或某些片状的东西。例如：一块糖、两块橡皮。', type: 'single' },
            { word: '瓶', pinyin: 'píng', explanation: '量词，用于瓶装的东西。例如：一瓶水、两瓶牛奶。', type: 'single' },
            { word: '支', pinyin: 'zhī', explanation: '量词，用于细长的东西。例如：一支笔、三支铅笔。', type: 'single' },
            { word: '本', pinyin: 'běn', explanation: '量词，用于书、本子等。例如：一本书、两本作业本。', type: 'single' },
            { word: '颗', pinyin: 'kē', explanation: '量词，用于圆形或粒状的东西。例如：一颗星星、两颗糖。', type: 'single' },
            { word: '张', pinyin: 'zhāng', explanation: '量词，用于纸、桌子等平面的东西。例如：一张纸、两张桌子。', type: 'single' },
            { word: '把', pinyin: 'bǎ', explanation: '量词，用于有把手的东西。例如：一把尺子、两把椅子。', type: 'single' },
            { word: '棵', pinyin: 'kē', explanation: '量词，用于植物。例如：一棵树、三棵白菜。', type: 'single' },
            { word: '盒', pinyin: 'hé', explanation: '量词，用于盒装的东西。例如：一盒饼干、两盒巧克力。', type: 'single' },
            { word: '箱', pinyin: 'xiāng', explanation: '量词，用于箱装的东西。例如：一箱苹果、两箱牛奶。', type: 'single' },
            { word: '盘', pinyin: 'pán', explanation: '量词，用于盘装的东西。例如：一盘菜、两盘水果。', type: 'single' },
            { word: '堆', pinyin: 'duī', explanation: '量词，用于堆在一起的东西。例如：一堆沙子、两堆土。', type: 'single' },
            { word: '粒', pinyin: 'lì', explanation: '量词，用于颗粒状的东西。例如：一粒米、两粒种子。', type: 'single' },
            { word: '串', pinyin: 'chuàn', explanation: '量词，用于连成串的东西。例如：一串葡萄、两串气球。', type: 'single' },
            { word: '架', pinyin: 'jià', explanation: '量词，用于有支架的东西。例如：一架飞机、两架钢琴。', type: 'single' },
            { word: '艘', pinyin: 'sōu', explanation: '量词，用于船。例如：一艘船、两艘轮船。', type: 'single' },
            { word: '拃', pinyin: 'zhǎ', explanation: '量词，张开大拇指和中指（或小指）量长度，叫一拃。', type: 'single' },
            { word: '步', pinyin: 'bù', explanation: '量词，用于测量距离。例如：走10步。', type: 'single' },
            { word: '庹', pinyin: 'tuǒ', explanation: '量词，两臂伸开的长度叫一庹。', type: 'single' },
            { word: '倍', pinyin: 'bèi', explanation: '量词，表示一个数是另一个数的几倍。例如：6是3的2倍。', type: 'single' }
        ]
    },

    // 二、核心概念词
    section2: {
        questionTypes: [
            { word: '填一填', pinyin: 'tián yī tián', explanation: '在空格或括号里填写合适的数字、符号或文字。', type: 'phrase' },
            { word: '算一算', pinyin: 'suàn yī suàn', explanation: '计算题目中的算式，得出答案。', type: 'phrase' },
            { word: '写一写', pinyin: 'xiě yī xiě', explanation: '把数字、算式或答案写下来。', type: 'phrase' },
            { word: '画一画', pinyin: 'huà yī huà', explanation: '用画图的方式表示题目或答案。', type: 'phrase' },
            { word: '读一读', pinyin: 'dú yī dú', explanation: '把数字、算式或题目读出来。', type: 'phrase' },
            { word: '选一选', pinyin: 'xuǎn yī xuǎn', explanation: '从给出的选项中选择正确的答案。', type: 'phrase' },
            { word: '做一做', pinyin: 'zuò yī zuò', explanation: '动手完成题目要求的操作。', type: 'phrase' },
            { word: '分一分', pinyin: 'fēn yī fēn', explanation: '把物品按照一定的标准分成几部分。', type: 'phrase' },
            { word: '圈一圈', pinyin: 'quān yī quān', explanation: '用圆圈把符合要求的答案圈出来。', type: 'phrase' },
            { word: '摆一摆', pinyin: 'bǎi yī bǎi', explanation: '用实物或学具摆出题目要求的样子。', type: 'phrase' },
            { word: '拨一拨', pinyin: 'bō yī bō', explanation: '用手拨动计数器等工具进行操作。', type: 'phrase' },
            { word: '涂颜色', pinyin: 'tú yán sè', explanation: '用彩色笔给图形或答案涂上颜色。', type: 'phrase' },
            { word: '找规律', pinyin: 'zhǎo guī lǜ', explanation: '找出数字、图形或事物变化的规律。', type: 'phrase' },
            { word: '列竖式', pinyin: 'liè shù shì', explanation: '用竖式的方法写出计算过程。', type: 'phrase' },
            { word: '口算', pinyin: 'kǒu suàn', explanation: '不用笔算，用心算的方法得出答案。', type: 'phrase' },
            { word: '解决问题', pinyin: 'jiě jué wèn tí', explanation: '通过分析和计算，解答应用题。', type: 'phrase' },
            { word: '列式计算', pinyin: 'liè shì jì suàn', explanation: '写出算式并计算出结果。', type: 'phrase' },
            { word: '找信息', pinyin: 'zhǎo xìn xī', explanation: '从题目或图中找出有用的数学信息。', type: 'phrase' },
            { word: '提问题', pinyin: 'tí wèn tí', explanation: '根据给出的信息，提出数学问题。', type: 'phrase' },
            { word: '看图列式', pinyin: 'kàn tú liè shì', explanation: '看图片，根据图意列出算式。', type: 'phrase' }
        ],
        basicConcepts: [
            { 
                word: '大于', 
                pinyin: 'dà yú', 
                explanation: '一个数比另一个数大，用符号">"表示。例如：5>3。', 
                examples: [
                    {
                        question: '在"□"里填上">"或"<"：8□5',
                        analysis: '题目要求比较8和5的大小。',
                        formula: '8 > 5',
                        answer: '8 > 5。'
                    }
                ],
                type: 'phrase' 
            },
            { 
                word: '小于', 
                pinyin: 'xiǎo yú', 
                explanation: '一个数比另一个数小，用符号"<"表示。例如：3<5。', 
                examples: [
                    {
                        question: '在"□"里填上">"或"<"：3□7',
                        analysis: '题目要求比较3和7的大小。',
                        formula: '3 < 7',
                        answer: '3 < 7。'
                    },
                    {
                        question: '小明有10支铅笔，小红有7支铅笔，小明比小红多几支铅笔？',
                        analysis: '题目中的关键词是"比……多"，表示需要求两个数量之间的差。',
                        formula: '10 - 7 = 3',
                        answer: '小明比小红多3支铅笔。'
                    }
                ],
                type: 'phrase' 
            },
            { word: '等于', pinyin: 'děng yú', explanation: '两个数相等，用符号"="表示。例如：3+2=5。', type: 'phrase' },
            { word: '一共', pinyin: 'yī gòng', explanation: '总共、全部加起来。常用于加法问题。', type: 'phrase' },
            { word: '还有', pinyin: 'hái yǒu', explanation: '剩下的、另外还有的。', type: 'phrase' },
            { word: '剩下', pinyin: 'shèng xià', explanation: '用掉一部分后还留下的。常用于减法问题。', type: 'phrase' },
            { word: '几个', pinyin: 'jǐ gè', explanation: '询问数量是多少，表示不确定的数目。', type: 'phrase' },
            { word: '第几', pinyin: 'dì jǐ', explanation: '询问顺序位置，表示排在第几位。', type: 'phrase' },
            { word: '数数', pinyin: 'shǔ shù', explanation: '按顺序一个一个地数。', type: 'phrase' },
            { word: '顺着数', pinyin: 'shùn zhe shǔ', explanation: '从小到大按顺序数。例如：1、2、3、4...', type: 'phrase' },
            { word: '倒着数', pinyin: 'dào zhe shǔ', explanation: '从大到小按顺序数。例如：10、9、8、7...', type: 'phrase' },
            { word: '从左往右', pinyin: 'cóng zuǒ wǎng yòu', explanation: '方向，从左边到右边。', type: 'phrase' },
            { word: '从上往下', pinyin: 'cóng shàng wǎng xià', explanation: '方向，从上面到下面。', type: 'phrase' },
            { word: '相邻数', pinyin: 'xiāng lín shù', explanation: '紧挨着的数。例如：5的相邻数是4和6。', type: 'phrase' },
            { word: '组成', pinyin: 'zǔ chéng', explanation: '几个数合起来成为一个数。例如：10由1和9组成。', type: 'phrase' },
            { word: '数位', pinyin: 'shù wèi', explanation: '一个数中，每个数字所占的位置。如个位、十位、百位。', type: 'phrase' },
            { word: '位数', pinyin: 'wèi shù', explanation: '一个数有几位数字。例如：25是两位数。', type: 'phrase' },
            { word: '写数', pinyin: 'xiě shù', explanation: '用数字把数写出来。', type: 'phrase' },
            { word: '读数', pinyin: 'dú shù', explanation: '用汉字把数字读出来。', type: 'phrase' },
            { word: '单数', pinyin: 'dān shù', explanation: '不能被2整除的数，如1、3、5、7、9。', type: 'phrase' },
            { word: '双数', pinyin: 'shuāng shù', explanation: '能被2整除的数，如2、4、6、8、10。', type: 'phrase' },
            { word: '奇数', pinyin: 'jī shù', explanation: '同"单数"，不能被2整除的数。', type: 'phrase' },
            { word: '偶数', pinyin: 'ǒu shù', explanation: '同"双数"，能被2整除的数。', type: 'phrase' },
            { word: '规律', pinyin: 'guī lǜ', explanation: '事物之间的内在联系，表现出来的规则性。', type: 'phrase' },
            { word: '整时', pinyin: 'zhěng shí', explanation: '整点的时间，如1时、2时、3时等。', type: 'phrase' },
            { word: '大小', pinyin: 'dà xiǎo', explanation: '比较两个数或物体哪个大、哪个小。', type: 'phrase' },
            { word: '多少', pinyin: 'duō shǎo', explanation: '询问数量，或比较数量的多与少。', type: 'phrase' },
            { word: '长短', pinyin: 'cháng duǎn', explanation: '比较两个物体哪个长、哪个短。', type: 'phrase' },
            { word: '平均分', pinyin: 'píng jūn fēn', explanation: '把物品分成几份，每份数量相等。', type: 'phrase' },
            { word: '乘法口诀', pinyin: 'chéng fǎ kǒu jué', explanation: '帮助记忆乘法的口诀表，如"二二得四"。', type: 'phrase' },
            { 
                word: '最大', 
                pinyin: 'zuì dà', 
                explanation: '在几个数或物体中，哪个是最大的。', 
                examples: [
                    {
                        question: '在5、9、3、7四个数中，最大的是几？',
                        analysis: '题目要求在"四个数"中找出最大的。',
                        formula: '比较四个数的大小，9 > 7 > 5 > 3',
                        answer: '最大的是9。'
                    },
                    {
                        question: '把下面的数按从小到大的顺序排列：9、4、7、1',
                        analysis: '题目要求按"从小到大"排列。',
                        formula: '比较四个数的大小，1 < 4 < 7 < 9',
                        answer: '1、4、7、9。'
                    }
                ],
                type: 'phrase' 
            },
            { 
                word: '最小', 
                pinyin: 'zuì xiǎo', 
                explanation: '在几个数或物体中，哪个是最小的。', 
                examples: [
                    {
                        question: '在5、9、3、7四个数中，最小的是几？',
                        analysis: '题目要求在"四个数"中找出最小的。',
                        formula: '比较四个数的大小，9 > 7 > 5 > 3',
                        answer: '最小的是3。'
                    }
                ],
                type: 'phrase' 
            },
            { word: '连加', pinyin: 'lián jiā', explanation: '连续进行加法运算。例如：3+2+1=6。', type: 'phrase' },
            { word: '连减', pinyin: 'lián jiǎn', explanation: '连续进行减法运算。例如：10-3-2=5。', type: 'phrase' },
            { word: '混合运算', pinyin: 'hùn hé yùn suàn', explanation: '一个算式里有加减或加减乘除的运算。', type: 'phrase' },
            { word: '分与和', pinyin: 'fēn yǔ hé', explanation: '一个数可以分成两个数，两个数可以合成一个数。', type: 'phrase' },
            { word: '凑十法', pinyin: 'còu shí fǎ', explanation: '计算方法，把数凑成10再计算。例如：8+5=8+2+3=13。', type: 'phrase' },
            { word: '破十法', pinyin: 'pò shí fǎ', explanation: '计算方法，把10分开来计算。例如：13-8=13-3-5=5。', type: 'phrase' },
            { word: '平十法', pinyin: 'píng shí fǎ', explanation: '计算方法，利用10来计算。', type: 'phrase' },
            { word: '画图法', pinyin: 'huà tú fǎ', explanation: '用画图的方式帮助理解和解决问题。', type: 'phrase' },
            { word: '线段', pinyin: 'xiàn duàn', explanation: '两个端点之间直的部分，可以测量长度。', type: 'phrase' },
            { word: '长度', pinyin: 'cháng dù', explanation: '物体从一端到另一端的距离。', type: 'phrase' },
            { word: '重量', pinyin: 'zhòng liàng', explanation: '物体有多重。', type: 'phrase' },
            { word: '测量', pinyin: 'cè liáng', explanation: '用工具量出长度、重量等。', type: 'phrase' },
            { word: '猜测', pinyin: 'cāi cè', explanation: '根据已知信息推测、估计。', type: 'phrase' },
            { word: '估计', pinyin: 'gū jì', explanation: '大概推算、粗略计算。', type: 'phrase' },
            { word: '合适', pinyin: 'hé shì', explanation: '符合要求、恰当。', type: 'phrase' },
            { word: '对半', pinyin: 'duì bàn', explanation: '平均分成两份，每份数量相等。', type: 'phrase' },
            { word: '购物', pinyin: 'gòu wù', explanation: '买东西。', type: 'phrase' },
            { word: '付给', pinyin: 'fù gěi', explanation: '把钱交给对方。', type: 'phrase' },
            { word: '找回', pinyin: 'zhǎo huí', explanation: '买东西后退回的钱。', type: 'phrase' },
            { word: '售出', pinyin: 'shòu chū', explanation: '卖出去。', type: 'phrase' },
            { word: '购买', pinyin: 'gòu mǎi', explanation: '买进来。', type: 'phrase' }
        ],
        items: [
            { word: '积木', pinyin: 'jī mù', explanation: '儿童玩具，可以拼搭成各种形状。', type: 'phrase' },
            { word: '拼图', pinyin: 'pīn tú', explanation: '把分散的图片拼成完整图画的玩具。', type: 'phrase' },
            { word: '玩具汽车', pinyin: 'wán jù qì chē', explanation: '汽车模型玩具。', type: 'phrase' },
            { word: '玩具飞机', pinyin: 'wán jù fēi jī', explanation: '飞机模型玩具。', type: 'phrase' },
            { word: '气球', pinyin: 'qì qiú', explanation: '充气的彩色球状玩具。', type: 'phrase' },
            { word: '风筝', pinyin: 'fēng zhēng', explanation: '在空中飞的玩具，用线牵着。', type: 'phrase' },
            { word: '毽子', pinyin: 'jiàn zi', explanation: '用脚踢的玩具，有羽毛和铜钱。', type: 'phrase' },
            { word: '坦克', pinyin: 'tǎn kè', explanation: '一种装甲战车，也指坦克玩具。', type: 'phrase' },
            { word: '火车', pinyin: 'huǒ chē', explanation: '在铁轨上行驶的交通工具。', type: 'phrase' },
            { word: '船', pinyin: 'chuán', explanation: '在水上航行的交通工具。', type: 'single' }
        ],
        animals: [
            { word: '小鸡', pinyin: 'xiǎo jī', explanation: '鸡的幼崽，喜欢吃虫子和米。', type: 'phrase' },
            { word: '小鸭', pinyin: 'xiǎo yā', explanation: '鸭子的幼崽，会游泳。', type: 'phrase' },
            { word: '兔子', pinyin: 'tù zi', explanation: '耳朵长、尾巴短的小动物，喜欢吃萝卜和青菜。', type: 'phrase' },
            { word: '小猫', pinyin: 'xiǎo māo', explanation: '猫的幼崽，会抓老鼠。', type: 'phrase' },
            { word: '小狗', pinyin: 'xiǎo gǒu', explanation: '狗的幼崽，是人类的好朋友。', type: 'phrase' },
            { word: '小鸟', pinyin: 'xiǎo niǎo', explanation: '会飞的小动物，有羽毛和翅膀。', type: 'phrase' },
            { word: '青蛙', pinyin: 'qīng wā', explanation: '会跳的两栖动物，喜欢吃害虫。', type: 'phrase' },
            { word: '猴子', pinyin: 'hóu zi', explanation: '聪明的动物，会爬树，喜欢吃香蕉。', type: 'phrase' },
            { word: '企鹅', pinyin: 'qǐ é', explanation: '生活在南极的鸟类，不会飞但会游泳。', type: 'phrase' },
            { word: '小鱼', pinyin: 'xiǎo yú', explanation: '生活在水里的小动物，用鳃呼吸。', type: 'phrase' }
        ],
        foods: [
            { word: '苹果', pinyin: 'píng guǒ', explanation: '圆形的水果，有红色、绿色等颜色。', type: 'phrase' },
            { word: '香蕉', pinyin: 'xiāng jiāo', explanation: '弯弯的黄色水果，味道香甜。', type: 'phrase' },
            { word: '桃子', pinyin: 'táo zi', explanation: '粉红色的水果，有毛茸茸的外皮。', type: 'phrase' },
            { word: '橘子', pinyin: 'jú zi', explanation: '橙色的水果，可以剥皮吃。', type: 'phrase' },
            { word: '草莓', pinyin: 'cǎo méi', explanation: '红色的小水果，外面有小籽。', type: 'phrase' },
            { word: '西瓜', pinyin: 'xī guā', explanation: '夏天的水果，外面是绿色，里面是红色。', type: 'phrase' },
            { word: '葡萄', pinyin: 'pú tao', explanation: '一串一串的小圆水果，有紫色、绿色等。', type: 'phrase' },
            { word: '糖果', pinyin: 'táng guǒ', explanation: '甜甜的零食，有各种颜色和形状。', type: 'phrase' },
            { word: '蛋糕', pinyin: 'dàn gāo', explanation: '松软香甜的点心，过生日时吃。', type: 'phrase' },
            { word: '面包', pinyin: 'miàn bāo', explanation: '用面粉烤制的食品。', type: 'phrase' },
            { word: '牛奶', pinyin: 'niú nǎi', explanation: '白色的饮料，营养丰富。', type: 'phrase' },
            { word: '薯片', pinyin: 'shǔ piàn', explanation: '薄薄的油炸土豆片，很脆。', type: 'phrase' },
            { word: '巧克力', pinyin: 'qiǎo kè lì', explanation: '棕色的甜食，味道浓郁。', type: 'phrase' }
        ],
        planeShapes: [
            { word: '长方形', pinyin: 'cháng fāng xíng', explanation: '有四条边，对边相等，四个角都是直角的图形。', type: 'phrase' },
            { word: '正方形', pinyin: 'zhèng fāng xíng', explanation: '有四条边，四条边都相等，四个角都是直角的图形。', type: 'phrase' },
            { word: '圆', pinyin: 'yuán', explanation: '没有角，边是弯曲的圆形。', type: 'single' },
            { word: '三角形', pinyin: 'sān jiǎo xíng', explanation: '有三条边、三个角的图形。', type: 'phrase' },
            { word: '平行四边形', pinyin: 'píng xíng sì biān xíng', explanation: '有四条边，对边平行且相等的图形。', type: 'phrase' }
        ],
        solidShapes: [
            { word: '长方体', pinyin: 'cháng fāng tǐ', explanation: '有六个面，相对两面一个样。', type: 'phrase' },
            { word: '正方体', pinyin: 'zhèng fāng tǐ', explanation: '像骰子一样，六个面都是正方形的立体图形。', type: 'phrase' },
            { word: '圆柱', pinyin: 'yuán zhù', explanation: '像柱子一样，上下两个面是圆形的立体图形。', type: 'phrase' },
            { word: '球', pinyin: 'qiú', explanation: '圆圆的，可以滚动的立体图形，像皮球。', type: 'single' },
            { word: '三棱柱', pinyin: 'sān léng zhù', explanation: '有三个长方形面和两个三角形面的立体图形。', type: 'phrase' }
        ]
    },

    // 三、基础知识点
    section3: {
        fillMethods: [
            { 
                word: '加数+加数=和', 
                pinyin: 'jiā shù jiā jiā shù děng yú hé', 
                explanation: '加法算式：两个加数相加等于和。',
                examples: [
                    {
                        question: '8 + 7 = ⚪，求⚪',
                        analysis: '这是一个基本的加法运算，两个加数是8和7，直接相加即可得到和。',
                        formula: '8 + 7 = 15',
                        answer: '⚪ = 15'
                    }
                ],
                type: 'sentence' 
            },
            { 
                word: '和-加数=加数', 
                pinyin: 'hé jiǎn jiā shù děng yú jiā shù', 
                explanation: '用和减去一个加数，就能得到另一个加数。',
                examples: [
                    {
                        question: '8 + ⚪ = 16，求⚪',
                        analysis: '已知和是16，一个加数是8，求另一个加数。用和减去已知的加数。',
                        formula: '16 - 8 = 8',
                        answer: '⚪ = 8'
                    }
                ],
                type: 'sentence' 
            },
            { 
                word: '被减数-减数=差', 
                pinyin: 'bèi jiǎn shù jiǎn jiǎn shù děng yú chā', 
                explanation: '减法算式：被减数减去减数等于差。',
                examples: [
                    {
                        question: '15 - 6 = ⚪，求⚪',
                        analysis: '这是一个基本的减法运算，被减数是15，减数是6，直接相减即可得到差。',
                        formula: '15 - 6 = 9',
                        answer: '⚪ = 9'
                    }
                ],
                type: 'sentence' 
            },
            { 
                word: '被减数-差=减数', 
                pinyin: 'bèi jiǎn shù jiǎn chā děng yú jiǎn shù', 
                explanation: '用被减数减去差，就能得到减数。',
                examples: [
                    {
                        question: '15 - ⚪ = 9，求⚪',
                        analysis: '已知被减数是15，差是9，求减数。用被减数减去差。',
                        formula: '15 - 9 = 6',
                        answer: '⚪ = 6'
                    }
                ],
                type: 'sentence' 
            },
            { 
                word: '减数+差=被减数', 
                pinyin: 'jiǎn shù jiā chā děng yú bèi jiǎn shù', 
                explanation: '减数加上差，就能得到被减数。',
                examples: [
                    {
                        question: '⚪ - 6 = 9，求⚪',
                        analysis: '已知减数是6，差是9，求被减数。用减数加上差。',
                        formula: '6 + 9 = 15',
                        answer: '⚪ = 15'
                    }
                ],
                type: 'sentence' 
            },
            { 
                word: '乘数×乘数=积', 
                pinyin: 'chéng shù chéng chéng shù děng yú jī', 
                explanation: '乘法算式：两个乘数相乘等于积。',
                examples: [
                    {
                        question: '6 × 7 = ⚪，求⚪',
                        analysis: '这是一个基本的乘法运算，两个乘数是6和7，直接相乘即可得到积。',
                        formula: '6 × 7 = 42',
                        answer: '⚪ = 42'
                    }
                ],
                type: 'sentence' 
            },
            { 
                word: '积÷乘数=乘数', 
                pinyin: 'jī chú chéng shù děng yú chéng shù', 
                explanation: '用积除以一个乘数，就能得到另一个乘数。',
                examples: [
                    {
                        question: '6 × ⚪ = 42，求⚪',
                        analysis: '已知积是42，一个乘数是6，求另一个乘数。用积除以已知的乘数。',
                        formula: '42 ÷ 6 = 7',
                        answer: '⚪ = 7'
                    }
                ],
                type: 'sentence' 
            },
            { 
                word: '被除数÷除数=商', 
                pinyin: 'bèi chú shù chú chú shù děng yú shāng', 
                explanation: '除法算式：被除数除以除数等于商。',
                examples: [
                    {
                        question: '24 ÷ 6 = ⚪，求⚪',
                        analysis: '这是一个基本的除法运算，被除数是24，除数是6，直接相除即可得到商。',
                        formula: '24 ÷ 6 = 4',
                        answer: '⚪ = 4'
                    }
                ],
                type: 'sentence' 
            },
            { 
                word: '被除数÷商=除数', 
                pinyin: 'bèi chú shù chú shāng děng yú chú shù', 
                explanation: '用被除数除以商，就能得到除数。',
                examples: [
                    {
                        question: '24 ÷ ⚪ = 4，求⚪',
                        analysis: '已知被除数是24，商是4，求除数。用被除数除以商。',
                        formula: '24 ÷ 4 = 6',
                        answer: '⚪ = 6'
                    }
                ],
                type: 'sentence' 
            },
            { 
                word: '除数×商=被除数', 
                pinyin: 'chú shù chéng shāng děng yú bèi chú shù', 
                explanation: '除数乘以商，就能得到被除数。',
                examples: [
                    {
                        question: '⚪ ÷ 6 = 4，求⚪',
                        analysis: '已知除数是6，商是4，求被除数。用除数乘以商。',
                        formula: '6 × 4 = 24',
                        answer: '⚪ = 24'
                    }
                ],
                type: 'sentence' 
            }
        ],
        comparisonRules: [
            { 
                word: '加数变大和变大', 
                pinyin: 'jiā shù biàn dà hé biàn dà', 
                explanation: '加法运算中，一个加数变大，另一个加数不变，和也会变大。',
                examples: [
                    {
                        question: '8 + 6 ⭕ 5 + 6，在⭕里填大于号或小于号',
                        analysis: '一个加数6不变，另一个加数8比5大，所以和变大，前面更大。',
                        formula: '8 + 6 = 14，5 + 6 = 11，14 > 11',
                        answer: '填大于号：8 + 6 > 5 + 6'
                    }
                ],
                type: 'sentence' 
            },
            { 
                word: '加数变小和变小', 
                pinyin: 'jiā shù biàn xiǎo hé biàn xiǎo', 
                explanation: '加法运算中，一个加数减小，另一个加数不变，和也会变小。',
                examples: [
                    {
                        question: '8 + 6 ⭕ 5 + 6，在⭕里填大于号或小于号',
                        analysis: '一个加数6不变，另一个加数8变小成5，所以和变小，前面更大。',
                        formula: '8 + 6 = 14，5 + 6 = 11，14 > 11',
                        answer: '填大于号：8 + 6 > 5 + 6'
                    }
                ],
                type: 'sentence' 
            },
            { 
                word: '加数一增一减和不变', 
                pinyin: 'jiā shù yī zēng yī jiǎn hé bù biàn', 
                explanation: '加法运算中，一个加数减几，另一个加数加回同样的数，和不变。',
                examples: [
                    {
                        question: '8 + 7 ⭕ 6 + 9，在⭕里填大于号、小于号或等号',
                        analysis: '8减2变成6，7加2变成9，一个减2，另一个加2，所以和不变。',
                        formula: '8 + 7 = 15，6 + 9 = 15，15 = 15',
                        answer: '填等号：8 + 7 = 6 + 9'
                    }
                ],
                type: 'sentence' 
            },
            { 
                word: '被减数变大差变大', 
                pinyin: 'bèi jiǎn shù biàn dà chā biàn dà', 
                explanation: '减法运算中，被减数变大，减数不变，差也会变大。',
                examples: [
                    {
                        question: '10 - 4 ⭕ 8 - 4，在⭕里填大于号或小于号',
                        analysis: '减数4不变，被减数10比8大，所以差变大，前面更大。',
                        formula: '10 - 4 = 6，8 - 4 = 4，6 > 4',
                        answer: '填大于号：10 - 4 > 8 - 4'
                    }
                ],
                type: 'sentence' 
            },
            { 
                word: '减数变大差变小', 
                pinyin: 'jiǎn shù biàn dà chā biàn xiǎo', 
                explanation: '减法运算中，被减数不变，减数变大，差会变小。',
                examples: [
                    {
                        question: '12 - 5 ⭕ 12 - 7，在⭕里填大于号或小于号',
                        analysis: '被减数12不变，减数5变大成7，所以差变小，后面更小。',
                        formula: '12 - 5 = 7，12 - 7 = 5，7 > 5',
                        answer: '填大于号：12 - 5 > 12 - 7'
                    }
                ],
                type: 'sentence' 
            },
            { 
                word: '被减数减数同增减差不变', 
                pinyin: 'bèi jiǎn shù jiǎn shù tóng zēng jiǎn chā bù biàn', 
                explanation: '减法运算中，被减数和减数同时加几或者减几，差不变。',
                examples: [
                    {
                        question: '10 - 6 ⭕ 12 - 8，在⭕里填大于号、小于号或等号',
                        analysis: '10加2变成12，6也加2变成8，被减数和减数同时加2，所以差不变。',
                        formula: '10 - 6 = 4，12 - 8 = 4，4 = 4',
                        answer: '填等号：10 - 6 = 12 - 8'
                    }
                ],
                type: 'sentence' 
            },
            { 
                word: '乘数变大积变大', 
                pinyin: 'chéng shù biàn dà jī biàn dà', 
                explanation: '乘法运算中，一个乘数变大，另一个乘数不变，积也会变大。',
                examples: [
                    {
                        question: '6 × 5 ⭕ 6 × 3，在⭕里填大于号或小于号',
                        analysis: '一个乘数6不变，另一个乘数5比3大，所以积变大，前面更大。',
                        formula: '6 × 5 = 30，6 × 3 = 18，30 > 18',
                        answer: '填大于号：6 × 5 > 6 × 3'
                    }
                ],
                type: 'sentence' 
            },
            { 
                word: '乘数变小积变小', 
                pinyin: 'chéng shù biàn xiǎo jī biàn xiǎo', 
                explanation: '乘法运算中，一个乘数减小，另一个乘数不变，积也会变小。',
                examples: [
                    {
                        question: '4 × 7 ⭕ 4 × 9，在⭕里填大于号或小于号',
                        analysis: '一个乘数4不变，另一个乘数7比9小，所以积变小，后面更小。',
                        formula: '4 × 7 = 28，4 × 9 = 36，28 < 36',
                        answer: '填小于号：4 × 7 < 4 × 9'
                    }
                ],
                type: 'sentence' 
            }
        ],
        hundredTable: [
            { 
                word: '往上减10', 
                pinyin: 'wǎng shàng jiǎn shí', 
                explanation: '在百数表中，往上一格减10。',
                examples: [
                    {
                        question: '在百数表中，从45往上移动一格到达的数是⭕，求⭕',
                        analysis: '在百数表中，往上移动一格，数字会减少10。从45往上移动一格。',
                        formula: '45 - 10 = 35',
                        answer: '⭕ = 35'
                    }
                ],
                type: 'phrase' 
            },
            { 
                word: '往下加10', 
                pinyin: 'wǎng xià jiā shí', 
                explanation: '在百数表中，往下一格加10。',
                examples: [
                    {
                        question: '在百数表中，从28往下移动一格到达的数是⭕，求⭕',
                        analysis: '在百数表中，往下移动一格，数字会增加10。从28往下移动一格。',
                        formula: '28 + 10 = 38',
                        answer: '⭕ = 38'
                    }
                ],
                type: 'phrase' 
            },
            { 
                word: '往左减1', 
                pinyin: 'wǎng zuǒ jiǎn yī', 
                explanation: '在百数表中，往左一格减1。',
                examples: [
                    {
                        question: '在百数表中，从56往左移动一格到达的数是⭕，求⭕',
                        analysis: '在百数表中，往左移动一格，数字会减少1。从56往左移动一格。',
                        formula: '56 - 1 = 55',
                        answer: '⭕ = 55'
                    }
                ],
                type: 'phrase' 
            },
            { 
                word: '往右加1', 
                pinyin: 'wǎng yòu jiā yī', 
                explanation: '在百数表中，往右一格加1。',
                examples: [
                    {
                        question: '在百数表中，从72往右移动一格到达的数是⭕，求⭕',
                        analysis: '在百数表中，往右移动一格，数字会增加1。从72往右移动一格。',
                        formula: '72 + 1 = 73',
                        answer: '⭕ = 73'
                    }
                ],
                type: 'phrase' 
            },
            { 
                word: '百数表3×3练习', 
                pinyin: 'bǎi shù biǎo sān chéng sān liàn xí', 
                explanation: '给出中心数字，根据百数表规律求周围全8个数字。规律：往上减10，往下加10，往左减1，往右加1。',
                examples: [
                    {
                        question: '填写下面百数表3×3表格，中心是45，求周围的数',
                        analysis: '从中心数45开始：<br>左上：45-10-1=34；上方：45-10=35；右上：45-10+1=36<br>左侧：45-1=44；中心：45；右侧：45+1=46<br>左下：45+10-1=54；下方：45+10=55；右下：45+10+1=56',
                        formula: '',
                        answer: '',
                        gridData: {
                            center: 45,
                            grid: [
                                [34, 35, 36],
                                [44, 45, 46],
                                [54, 55, 56]
                            ]
                        }
                    },
                    {
                        question: '填写下面百数表3×3表格，中心是28，求周围的数',
                        analysis: '从中心数28开始：<br>左上：28-10-1=17；上方：28-10=18；右上：28-10+1=19<br>左侧：28-1=27；中心：28；右侧：28+1=29<br>左下：28+10-1=37；下方：28+10=38；右下：28+10+1=39',
                        formula: '',
                        answer: '',
                        gridData: {
                            center: 28,
                            grid: [
                                [17, 18, 19],
                                [27, 28, 29],
                                [37, 38, 39]
                            ]
                        }
                    },
                    {
                        question: '填写下面百数表3×3表格，中心是63，求周围的数',
                        analysis: '从中心数63开始：<br>左上：63-10-1=52；上方：63-10=53；右上：63-10+1=54<br>左侧：63-1=62；中心：63；右侧：63+1=64<br>左下：63+10-1=72；下方：63+10=73；右下：63+10+1=74',
                        formula: '',
                        answer: '',
                        gridData: {
                            center: 63,
                            grid: [
                                [52, 53, 54],
                                [62, 63, 64],
                                [72, 73, 74]
                            ]
                        }
                    }
                ],
                type: 'sentence' 
            }
        ]
    },

    // 四、常见应用题型
    section4: {
        additionProblems: [
            {
                word: '一共/总共/共有',
                pinyin: 'yī gòng / zǒng gòng / gòng yǒu',
                explanation: '表示求和的最常见、最核心的关键词。通常出现在问题的结尾，用于询问所有部分合并后的总数量。',
                examples: [
                    {
                        question: '哥哥有10块糖，弟弟有6块糖，兄弟两人一共有多少块糖？',
                        analysis: '题目中的关键词是“一共”，表示需要将哥哥和弟弟的糖果数量合并起来。这是一个典型的求总数问题，需要将两个加数相加。',
                        formula: '10 + 6 = 16',
                        answer: '兄弟两人一共有16块糖。'
                    },
                    {
                        question: '幼儿园老师买了18个苹果，又买了14个梨，老师一共买了多少个水果？',
                        analysis: '此题的关键词是“一共”，表示需要将两次购买的水果数量相加。虽然苹果和梨是不同种类的水果，但题目问的是“水果”的总数，因此需要将18和14相加。',
                        formula: '18 + 14 = 32',
                        answer: '老师一共买了32个水果。'
                    },
                    {
                        question: '小明上午写了12个大字，下午写的和上午的同样多。这一天小明共写了多少个大字？',
                        analysis: '题目中的“共”与“一共”含义相同，表示求总和。已知上午写了12个，下午写的和上午同样多，即下午也写了12个。因此，需要将这两个相同的数量相加。',
                        formula: '12 + 12 = 24',
                        answer: '这一天小明共写了24个大字。'
                    }
                ],
                type: 'phrase'
            },
            {
                word: '和',
                pinyin: 'hé',
                explanation: '数学术语中专门用来表示加法运算结果的词。通常以“求……和……的和”或“……与……的和是多少”的形式出现。',
                examples: [
                    {
                        question: '7与5的和是多少？',
                        analysis: '题目直接询问“和”，这是一个明确的加法指令。学生需要将7哅5这两个数相加。',
                        formula: '7 + 5 = 12',
                        answer: '7与5的和是12。'
                    },
                    {
                        question: '两个加数都是4，和是多少？',
                        analysis: '题目中给出了两个加数，并且这两个加数是相同的。学生需要理解“和”的含义，并将4与4相加。',
                        formula: '4 + 4 = 8',
                        answer: '和是8。'
                    },
                    {
                        question: '一个加数是9，另一个加数是7，它们的和是多少？',
                        analysis: '题目明确给出了两个加数，并询问它们的“和”。这是一个标准的加法问题，学生只需将两个数相加即可。',
                        formula: '9 + 7 = 16',
                        answer: '它们的和是16。'
                    }
                ],
                type: 'single'
            },
            {
                word: '增加/添上',
                pinyin: 'zēng jiā / tiān shàng',
                explanation: '这类关键词描述的是一个动态的、使数量变多的过程。强调的是在原有数量的基础上，又加入了新的数量。',
                examples: [
                    {
                        question: '书架上有20本书，又增加了15本，现在书架上有多少本书？',
                        analysis: '题目中的“增加了”表示在原有数量的基础上进行加法运算。需要将原有的20本和新增加的15本相加。',
                        formula: '20 + 15 = 35',
                        answer: '现在书架上有35本书。'
                    },
                    {
                        question: '鱼缸里有8条金鱼，妈妈又添上了5条，现在鱼缸里有多少条金鱼？',
                        analysis: '“添上了”与“增加了”含义相同，都表示在原有数量上加上一部分。需要将8哅5相加。',
                        formula: '8 + 5 = 13',
                        answer: '现在鱼缸里有13条金鱼。'
                    },
                    {
                        question: '停车场原来有12辆汽车，又开来了8辆，现在停车场有多少辆汽车？',
                        analysis: '“开来了”表示数量的增加，与“增加”和“添上”的数学意义相同。需要将原有的12辆和新开来的8辆相加。',
                        formula: '12 + 8 = 20',
                        answer: '现在停车场有20辆汿车。'
                    }
                ],
                type: 'phrase'
            },
            {
                word: '合起来',
                pinyin: 'hé qǐ lái',
                explanation: '与“一共”意义相近，都强调将多个部分合并成一个整体。通常用于描述将分散的物品或数量聚集在一起的动作。',
                examples: [
                    {
                        question: '篮子里有7个苹果，又放进去了5个苹果，现在篮子里的苹果合起来有多少个？',
                        analysis: '题目中的“合起来”表示将原有的苹果和新放进去的苹果数量相加。这是一个典型的加法问题。',
                        formula: '7 + 5 = 12',
                        answer: '现在篮子里的苹果合起来有12个。'
                    },
                    {
                        question: '一班有25名学生，二班有28名学生，两个班的学生合起来有多少人？',
                        analysis: '“合起来”在这里表示将两个班级的学生人数相加，以求得总人数。',
                        formula: '25 + 28 = 53',
                        answer: '两个班的学生合起来有53人。'
                    },
                    {
                        question: '小明上午读了15页书，下午读了20页书，他今天合起来读了多少页书？',
                        analysis: '题目要求将上午和下午读的页数相加，用“合起来”来引导加法运算。',
                        formula: '15 + 20 = 35',
                        answer: '他今天合起来读了35页书。'
                    }
                ],
                type: 'phrase'
            },
            {
                word: '倒入',
                pinyin: 'dào rù',
                explanation: '通常出现在与液体或颗粒状物品相关的应用题中，描述的是一个将一部分物品加入到另一部分中的过程。',
                examples: [
                    {
                        question: '一个桶里原来有5升油，又倒入了3升油，现在桶里有多少升油？',
                        analysis: '题目中的“倒入”表示将两部分油合并，因此需要进行加法运算。',
                        formula: '5 + 3 = 8',
                        answer: '现在桶里有8升油。'
                    },
                    {
                        question: '妈妈往锅里倒了2碗水，又倒了1碗水，锅里合起来有多少碗水？',
                        analysis: '“倒了”与“倒入”含义相同，都表示数量的增加。需要将两次倒的水量相加。',
                        formula: '2 + 1 = 3',
                        answer: '锅里合起来有3碗水。'
                    },
                    {
                        question: '一个空瓶子里先倒入了250毫升果汁，又倒入了350毫升果汁，现在瓶子里有多少毫升果汁？',
                        analysis: '题目描述了两次“倒入”果汁的过程，要求计算总量，因此需要将两次倒入的量相加。',
                        formula: '250 + 350 = 600',
                        answer: '现在瓶子里有600毫升果汁。'
                    }
                ],
                type: 'phrase'
            },
            {
                word: '飞来了',
                pinyin: 'fēi lái le',
                explanation: '关键词"飞（走、游、跑）来了"表示原来有一些，后来又增加了一些，用加法计算。',
                examples: [
                    {
                        question: '池塘里原来有5只鸭子，又游来了4只鸭子，现在池塘里有多少只鸭子？',
                        analysis: '题目中的"游来了"表示鸭子的数量增加了，因此需要进行加法运算。',
                        formula: '5 + 4 = 9',
                        answer: '现在池塘里有9只鸭子。'
                    },
                    {
                        question: '草地上有7只蝴蝶，又飞来了6只蝴蝶，现在草地上一共有多少只蝴蝶？',
                        analysis: '"飞来了"表示数量的增加，与"一共"共同指示进行加法运算。',
                        formula: '7 + 6 = 13',
                        answer: '现在草地上一共有13只蝴蝶。'
                    },
                    {
                        question: '停车场里停着8辆汽车，又开来了5辆汽车，现在停车场里有多少辆汽车？',
                        analysis: '"开来了"与"飞来"、"游来"类似，都表示数量的增加，需要进行加法运算。',
                        formula: '8 + 5 = 13',
                        answer: '现在停车场里有13辆汽车。'
                    }
                ],
                type: 'phrase'
            },
            {
                word: '增加',
                pinyin: 'zēng jiā',
                explanation: '关键词"增加、多了"表示在原有基础上又添加了一些，用加法计算。',
                examples: [
                    {
                        question: '书架上有20本书，又增加了15本，现在书架上有多少本书？',
                        analysis: '题目中的"增加了"表示在原有数量的基础上进行加法运算。需要将原有20本和新增加的15本相加。',
                        formula: '20 + 15 = 35',
                        answer: '现在书架上有35本书。'
                    },
                    {
                        question: '鱼缸里有8条金鱼，妈妈又添上了5条，现在鱼缸里有多少条金鱼？',
                        analysis: '"添上了"与"增加了"含义相同，都表示在原有数量上加上一部分。需要8和5相加。',
                        formula: '8 + 5 = 13',
                        answer: '现在鱼缸里有13条金鱼。'
                    },
                    {
                        question: '停车圼原来有12辆汽车，又开来了8辆，现在停车圼有多少辆汽车？',
                        analysis: '"开来了"表示数量的增加，与"增加"和"添上"的数学意义相同。需要将原有12辆和新开来的8辆相加。',
                        formula: '12 + 8 = 20',
                        answer: '现在停车圼有20辆汽车。'
                    }
                ],
                type: 'phrase'
            }
        ],
        subtractionProblems: [
            {
                word: '还剩/剩下',
                pinyin: 'hái shèng / shèng xià',
                explanation: '表示求剩余数量的最常见、最核心的关键词。这些词语通常出现在描述从一个整体中去掉一部分后的情境中。',
                examples: [
                    {
                        question: '妈妈拿15元去买菜，花了8元，还剩多少元？',
                        analysis: '题目中的"还剩"是减法的关键词，表示需要用原有的钱减去买菜花掉的钱。',
                        formula: '15 - 8 = 7',
                        answer: '还剩7元。'
                    },
                    {
                        question: '树上有52只桃子，摘掉一些后还剩下19只，一共摘掉了多少只桃子？',
                        analysis: '这道题的关键词是"还剩下"，但它出现在题干的描述中，表示剩余的数量。问题问的是"摘掉了多少"，即求去掉的部分。因此，需要用总数（52只）减去剩余的数量（19只）。',
                        formula: '52 - 19 = 33',
                        answer: '一共摘掉了33只桃子。'
                    },
                    {
                        question: '老师有30本数学书，分给8个人，每人分了3本，现在老师还有几本数学书？',
                        analysis: '题目中的"还有"与"还剩"含义相同，是减法的关键词。需要先计算出分出去的总本数（8人×3本/人=24本），然后用原有的30本减去分出去的24本。',
                        formula: '30 - (8 × 3) = 30 - 24 = 6',
                        answer: '现在老师还有6本数学书。'
                    }
                ],
                type: 'phrase'
            },
            {
                word: '比……多/比……少',
                pinyin: 'bǐ duō / bǐ shǎo',
                explanation: '用于比较两个数量大小的关键词，它们指示了需要求两个数之间的差值。',
                examples: [
                    {
                        question: '明明练习写字，第一天写了25个大字，第二天写了28个，第二天比第一天多写了多少个？',
                        analysis: '题目中的"比……多"是减法的关键词，表示求两个数量之间的差。需要用较大的数（28个）减去较小的数（25个）。',
                        formula: '28 - 25 = 3',
                        answer: '第二天比第一天多写了3个。'
                    },
                    {
                        question: '一支铅笔5角钱，一块橡皮是8角钱，一支铅笔比一块橡皮便宜多少钱？',
                        analysis: '"便宜多少钱"与"少多少钱"含义相同，是减法的关键词。需要用较大的数（8角）减去较小的数（5角）。',
                        formula: '8 - 5 = 3',
                        answer: '一支铅笔比一块橡皮便宜3角钱。'
                    },
                    {
                        question: '妈妈吃了12个荔枝，爸爸吃了15个荔枝，爸爸比妈妈多吃了多少个荔枝？',
                        analysis: '题目中的"比……多"表示求两个数量之间的差。需要用较大的数（15个）减去较小的数（12个）。',
                        formula: '15 - 12 = 3',
                        answer: '爸爸比妈妈多吃了3个荔枝。'
                    }
                ],
                type: 'phrase'
            },
            {
                word: '多多少/少多少',
                pinyin: 'duō duō shǎo / shǎo duō shǎo',
                explanation: '是"比……多"和"比……少"的另一种表达方式，它们更直接地询问两个数量之间的差值。',
                examples: [
                    {
                        question: '小红有5本书，小明有8本书，小红比小明少几本书？',
                        analysis: '题目中的"少几本"是减法的关键词，表示求两个数量之间的差。需要用较大的数（8本）减去较小的数（5本）。',
                        formula: '8 - 5 = 3',
                        answer: '小红比小明少3本书。'
                    },
                    {
                        question: '小华有7支彩色笔，小明比小华多2支。请问小明有多少支彩色笔？',
                        analysis: '这道题的关键词是"比……多"，但它出现在题干的描述中，表示两个数量之间的关系。已知小华有7支，小明比小华多2支，因此需要用7加上2来求出小明的数量。',
                        formula: '7 + 2 = 9',
                        answer: '小明有9支彩色笔。'
                    },
                    {
                        question: '小英做了20朵花，小云做了9朵，小云最少再做（）朵才能超过小英。',
                        analysis: '这道题的关键词是"超过"，表示要比小英的20朵还要多。要求"最少"再做多少朵，就是比20朵多1朵。因此，需要先求出小云比小英少做多少朵（20-9=11朵），然后再加上1朵。',
                        formula: '(20 - 9) + 1 = 11 + 1 = 12',
                        answer: '小云最少再做12朵才能超过小英。'
                    }
                ],
                type: 'phrase'
            },
            {
                word: '减少/用去',
                pinyin: 'jiǎn shǎo / yòng qù',
                explanation: '这类关键词描述的是一个动态的、使数量变少的过程。它们与静态的"还剩"不同，强调的是在原有数量的基础上，去掉了新的数量。',
                examples: [
                    {
                        question: '工厂原来有100个工人，现在有80个工人，减少了多少个工人？',
                        analysis: '这道题的关键词是"减少"，表示需要用原来的工人数减去现在的工人数。',
                        formula: '100 - 80 = 20',
                        answer: '减少了20个工人。'
                    },
                    {
                        question: '一瓶果汁有500毫升，喝去了200毫升，还剩多少毫升？',
                        analysis: '这道题的关键词是"喝去"，与"用去"意思相同，表示需要用总量减去喝掉的部分。',
                        formula: '500 - 200 = 300',
                        answer: '还剩300毫升。'
                    }
                ],
                type: 'phrase'
            },
            {
                word: '相差',
                pinyin: 'xiāng chā',
                explanation: '是一个专门用于描述两个数量之间差异的词语。它直接指向求差值的运算。',
                examples: [
                    {
                        question: '小芳跳了50下，小刚跳了17下，小芳比小刚多跳了多少下？',
                        analysis: '题目中的"多跳了多少下"与"相差多少"含义相同，是减法的关键词。需要用较大的数（50下）减去较小的数（17下）。',
                        formula: '50 - 17 = 33',
                        answer: '小芳比小刚多跳了33下。'
                    },
                    {
                        question: '小红踢了50下，小亮踢了74下，小红比小亮少踢了多少下？',
                        analysis: '题目中的"少踢了多少下"与"相差多少"含义相同，是减法的关键词。需要用较大的数（74下）减去较小的数（50下）。',
                        formula: '74 - 50 = 24',
                        answer: '小红比小亮少踢了24下。'
                    },
                    {
                        question: '鸭比鹅多4只，鸭比鸡少15只，鸡和鹅相差多少只？',
                        analysis: '这道题需要理清三种动物之间的数量关系。根据"鸭比鹅多4只"，可以得出：鸭=鹅+4。根据"鸭比鸡少15只"，可以得出：鸭=鸡-15。因此，鹅+4=鸡-15，从而得出鸡和鹅的相差数是4+15=19只。',
                        formula: '4 + 15 = 19',
                        answer: '鸡和鹅相吂19只。'
                    }
                ],
                type: 'phrase'
            },
            {
                word: '飞走/游走',
                pinyin: 'fēi zǒu / yóu zǒu',
                explanation: '"飞走"、"游走"等动词通常出现在描述动物或物体离开的趣味应用题中。这些词语描述的是一个使总数减少的动作。',
                examples: [
                    {
                        question: '树上原来有9只鸟，飞走了4只，现在树上还剩多少只鸟？',
                        analysis: '题目中的"飞走"表示数量的减少，因此需要用总数（9只）减去飞走的部分（4只）。',
                        formula: '9 - 4 = 5',
                        answer: '现在树上还剩5只鸟。'
                    },
                    {
                        question: '池塘里有12条鱼，游走了5条，现在池塘里还剩多少条鱼？',
                        analysis: '题目中的"游走"表示数量的减少，因此需要用总数（12条）减去游走的部分（5条）。',
                        formula: '12 - 5 = 7',
                        answer: '现在池塘里还剩7条鱼。'
                    }
                ],
                type: 'phrase'
            }
        ],
        multiplicationProblems: [
            {
                word: '每……有……/每',
                pinyin: 'měi yǒu / měi',
                explanation: '是乘法应用题中最典型的句式结构，它清晰地给出了“每份的数量”和“份数”。',
                examples: [
                    {
                        question: '每盒有6支铅笔，3盒一共有多少支铅笔？',
                        analysis: '这道题的关键词是"每……有……"，表示有3个6，需要用乘法来计算。',
                        formula: '6 × 3 = 18',
                        answer: '3盒一共有18支铅笔。'
                    },
                    {
                        question: '每个小朋友分到4个苹果，5个小朋友一共分到多少个苹果？',
                        analysis: '这道题的关键词是"每个"，与"每"意思相同，表示有5个4，需要用乘法来计算。',
                        formula: '4 × 5 = 20',
                        answer: '5个小朋友一共分到20个苹果。'
                    }
                ],
                type: 'phrase'
            },
            {
                word: '倍',
                pinyin: 'bèi',
                explanation: '是描述两个数量之间倍数关系的关键词。在二年级上册，学生主要学习“求一个数的几倍是多少”这类问题。',
                examples: [
                    {
                        question: '小华有4元钱，小丽的钱是小华的3倍，小丽有多少元钱？',
                        analysis: '这道题的关键词是"倍"，表示小丽的钱有3个4元那么多，需要用乘法来计算。',
                        formula: '4 × 3 = 12',
                        answer: '小丽有12元钱。'
                    },
                    {
                        question: '一辆小汽车可以坐5个人，一辆大客车可以坐的人数是小汽车的6倍，大客车可以坐多少人？',
                        analysis: '这道题的关键词是"倍"，表示大客车可以坐的人数有6个5人那么多，需要用乘法来计算。',
                        formula: '5 × 6 = 30',
                        answer: '大客车可以址30人。'
                    }
                ],
                type: 'single'
            },
            {
                word: '积',
                pinyin: 'jī',
                explanation: '是数学术语中专门用来表示乘法运算结果的词。在应用题中，它通常以“求……和……的积”或“……与……的积是多少”的形式出现。',
                examples: [
                    {
                        question: '计算4周6的积。',
                        analysis: '题目明确要求"求积"，这是乘法运算的直接指令。学生需要将两个因数相乘。',
                        formula: '4 × 6 = 24',
                        answer: '4周6的积是24。'
                    },
                    {
                        question: '两个因数都是5，积是多少？',
                        analysis: '题目中给出了两个因数，并且这两个因数是相同的。学生需要理解“积”的含义，并将5与5相乘。',
                        formula: '5 × 5 = 25',
                        answer: '积是25。'
                    }
                ],
                type: 'single'
            },
            {
                word: '几个几',
                pinyin: 'jǐ gè jǐ',
                explanation: '是乘法意义的直接描述。例如，“3个5是多少？”或“4个6相加的和是多少？”这类问题直接揭示了乘法的本质——重复相加。',
                examples: [
                    {
                        question: '4个6是多少？',
                        analysis: '这道题直接给出了“几个几”的形式，需要用乘法来计算。',
                        formula: '6 × 4 = 24',
                        answer: '4个6是24。'
                    },
                    {
                        question: '5个7相加的和是多少？',
                        analysis: '这道题的关键词是“相加”，但—5个7”的形式暗示了可以用乘法来简便计算。',
                        formula: '7 × 5 = 35',
                        answer: '5个7相加的和是35。'
                    }
                ],
                type: 'phrase'
            },
            {
                word: '一共（乘法情境）',
                pinyin: 'yī gòng',
                explanation: '在乘法中，“一共”通常与“每”或“倍”等词语同时出现，表示求几个相同加数的总和。',
                examples: [
                    {
                        question: '每排有5个同学，一共有4排，一共有多少个同学？',
                        analysis: '这道题的关键词是“一共”，表示有4个5，需要用乘法来计算。',
                        formula: '5 × 4 = 20',
                        answer: '一共有20个同学。'
                    }
                ],
                type: 'phrase'
            }
        ],
        divisionProblems: [
            {
                word: '平均分',
                pinyin: 'píng jūn fēn',
                explanation: '关键词"平均分"表示把一个总数平均分成若干份，求每份是多少，或能分成几份。',
                examples: [
                    {
                        question: '有12个苹果，平均分给4个小朋友，每个小朋友分到多少个？',
                        analysis: '把12平均分成4份，求每份是多少。',
                        formula: '12 ÷ 4 = 3',
                        answer: '每个小朋友分到3个苹果。'
                    },
                    {
                        question: '有20个气球，平均分给5个小朋友，每个小朋友分到多少个？',
                        analysis: '把20平均分成5份。',
                        formula: '20 ÷ 5 = 4',
                        answer: '每个小朋友分到4个气球。'
                    }
                ],
                type: 'phrase'
            },
            {
                word: '每几个装一',
                pinyin: 'měi jǐ gè zhuāng yī',
                explanation: '关键词"每…装一篮、每…捆成一捆"表示求一个数里有几个另一个数。',
                examples: [
                    {
                        question: '有18个香蕉，每3个装一篮，需要多少个篮子？',
                        analysis: '求18里面有几个3。',
                        formula: '18 ÷ 3 = 6',
                        answer: '需要6个篮子。'
                    },
                    {
                        question: '有24本书，每6本捆成一捆，可以捆成多少捆？',
                        analysis: '求24里面有几个6。',
                        formula: '24 ÷ 6 = 4',
                        answer: '可以捆成4捆。'
                    }
                ],
                type: 'phrase'
            },
            {
                word: '商',
                pinyin: 'shāng',
                explanation: '是数学术语中专门用来表示除法运算结果的词。在应用题中，它通常以"求……除以……的商"或"……除以……，商是多少"的形式出现。',
                examples: [
                    {
                        question: '21除以7，商是多少？',
                        analysis: '题目直接要求"求商"，这是除法运算的直接指令。',
                        formula: '21 ÷ 7 = 3',
                        answer: '商是3。'
                    }
                ],
                type: 'single'
            },
            {
                word: '平均每个是几',
                pinyin: 'píng jūn měi gè shì jǐ',
                explanation: '是等分除的另一种提问方式，直接询问在平均分的情况下，每一份的数量是多少。',
                examples: [
                    {
                        question: '有20个橙子，平均分成4份，每份有多少个橙子？',
                        analysis: '这道题的关键词是"每份有多少个橙子"，与"每个是几"意思相同，表示需要求每份的数量。',
                        formula: '20 ÷ 4 = 5',
                        answer: '每份有5个橙子。'
                    }
                ],
                type: 'phrase'
            },
            {
                word: '能分几份',
                pinyin: 'néng fēn jǐ fèn',
                explanation: '是包含除的另一种提问方式，询问在给定每份数量的情况下，能分成多少份。',
                examples: [
                    {
                        question: '有30个同学，每6个同学一组，能分成几组？',
                        analysis: '这道题的关键词是"能分成几组"，与"能分几份"意思相同，表示需要求30里面有几个6。',
                        formula: '30 ÷ 6 = 5',
                        answer: '能分成5组。'
                    },
                    {
                        question: '有24支铅笔，每个小朋友分4支，能分给几个小朋友？',
                        analysis: '这道题的关键词是"能分给几个"，表示需要求24里面有几个4。',
                        formula: '24 ÷ 4 = 6',
                        answer: '能分给6个小朋友。'
                    }
                ],
                type: 'phrase'
            }
        ],
        confusingKeywords: [
            {
                word: '“一共”的加法与乘法情境',
                pinyin: 'yī gòng de jiā fǎ yǔ chéng fǎ qíng jìng',
                explanation: '“一共”是应用题中出现频率极高的词语，它通常表示求总数。然而，根据题目情境的不同，“一共”可能指向加法运算，也可能指向乘法运算。',
                examples: [
                    {
                        question: '篮子里有7个红苹果周5个青苹果，一共有多少个苹果？（加法情境）',
                        analysis: '这道题的关键词是“一共”，表示需要将红苹果和青苹果这两个不同的部分合并起来。',
                        formula: '7 + 5 = 12',
                        answer: '一共12个苹果。'
                    },
                    {
                        question: '每排有5个同学，一共有4排，一共有多少个同学？（乘法情境）',
                        analysis: '这道题的关键词是“一共”，表示有4个5，需要用乘法来计算。',
                        formula: '5 × 4 = 20',
                        answer: '一共20个同学。'
                    }
                ],
                type: 'phrase'
            },
            {
                word: '“比……多”与“比……少”',
                pinyin: 'bǐ duō yǔ bǐ shǎo',
                explanation: '“比……多”和“比……少”是描述两个数量之间大小关系的常用词汇，它们在应用题中通常与加法或减法运算相关联。',
                examples: [
                    {
                        question: '小红有10支铅笔，小明比小红多3支，小明有多少支铅笔？（求大数）',
                        analysis: '这道题的关键词是“比……多”，表示小明的铅笔数比小红的多，需要用加法来计算。',
                        formula: '10 + 3 = 13',
                        answer: '小明有13支铅笔。'
                    },
                    {
                        question: '小红有10支铅笔，小明有7支铅笔，小红比小明多几支铅笔？（求相差数）',
                        analysis: '这道题的关键词是“比……多”，表示需要求两个数量的差值，需要用减法来计算。',
                        formula: '10 - 7 = 3',
                        answer: '小红比小明多3支铅笔。'
                    },
                    {
                        question: '小红有10支铅笔，小明比小红少3支，小明有多少支铅笔？（求小数）',
                        analysis: '这道题的关键词是“比……少”，表示小明的铅笔数比小红的少，需要用减法来计算。',
                        formula: '10 - 3 = 7',
                        answer: '小明有7支铅笔。'
                    },
                    {
                        question: '小红有10支铅笔，小明有7支铅笔，小明比小红少几支铅笔？（求相差数）',
                        analysis: '这道题的关键词是“比……少”，表示需要求两个数量的差值，需要用减法来计算。',
                        formula: '10 - 7 = 3',
                        answer: '小明比小红少3支铅笔。'
                    }
                ],
                type: 'phrase'
            },
            {
                word: '“还剩”与“用去”',
                pinyin: 'hái shèng yǔ yòng qù',
                explanation: '“还剩”和“用去”是减法应用题中常见的关键词，它们都描述了数量的减少，但所求的对象不同。',
                examples: [
                    {
                        question: '盘子里有12个苹果，吃了5个，还剩下几个？（求剩余部分）',
                        analysis: '这道题的关键词是“剩下”，与“还剩”意思相同，表示需要用总数减去吃掉的部分。',
                        formula: '12 - 5 = 7',
                        answer: '还剩下7个苹果。'
                    },
                    {
                        question: '一瓶果汁有500毫升，喝去了200毫升，还剩多少毫升？（求减少的部分）',
                        analysis: '这道题的关键词是“喝去”，与“用去”意思相同，表示需要用总量减去喝掉的部分。',
                        formula: '500 - 200 = 300',
                        answer: '还剩300毫升。'
                    }
                ],
                type: 'phrase'
            }
        ]
    }
};