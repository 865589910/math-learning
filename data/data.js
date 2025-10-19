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
            { word: '行', pinyin: 'háng', explanation: '横排叫做行，从左到右的一排。', type: 'single' },
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
            { word: '长', pinyin: 'cháng', explanation: '两端之间的距离大，跟"短"相对。', type: 'single' },
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
            { word: '厘米', pinyin: 'lí mǐ', explanation: '长度单位，一米等于一百厘米。用cm表示。', type: 'phrase' },
            { word: '米', pinyin: 'mǐ', explanation: '长度单位，一米等于一百厘米。用m表示。', type: 'single' },
            { word: '元', pinyin: 'yuán', explanation: '货币单位，一元等于十角。', type: 'single' },
            { word: '角', pinyin: 'jiǎo', explanation: '货币单位，一角等于十分，十角等于一元。', type: 'single' },
            { word: '分', pinyin: 'fēn', explanation: '货币单位，十分等于一角。也可以表示时间单位，六十分等于一小时。', type: 'single' },
            { word: '时', pinyin: 'shí', explanation: '时间单位"小时"的简称，一小时等于六十分。', type: 'single' },
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
            { word: '大于', pinyin: 'dà yú', explanation: '一个数比另一个数大，用符号">"表示。例如：5>3。', type: 'phrase' },
            { word: '小于', pinyin: 'xiǎo yú', explanation: '一个数比另一个数小，用符号"<"表示。例如：3<5。', type: 'phrase' },
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
            { word: '最大', pinyin: 'zuì dà', explanation: '在几个数或物体中，哪个是最大的。', type: 'phrase' },
            { word: '最小', pinyin: 'zuì xiǎo', explanation: '在几个数或物体中，哪个是最小的。', type: 'phrase' },
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
            { word: '长方体', pinyin: 'cháng fāng tǐ', explanation: '像砖头、盒子一样的立体图形。', type: 'phrase' },
            { word: '正方体', pinyin: 'zhèng fāng tǐ', explanation: '像骰子一样，六个面都是正方形的立体图形。', type: 'phrase' },
            { word: '圆柱', pinyin: 'yuán zhù', explanation: '像柱子一样，上下两个面是圆形的立体图形。', type: 'phrase' },
            { word: '球', pinyin: 'qiú', explanation: '圆圆的，可以滚动的立体图形，像皮球。', type: 'single' },
            { word: '三棱柱', pinyin: 'sān léng zhù', explanation: '有三个长方形面和两个三角形面的立体图形。', type: 'phrase' }
        ]
    },

    // 三、基础知识点
    section3: {
        fillMethods: [
            { word: '加数+加数=和', pinyin: 'jiā shù jiā jiā shù děng yú hé', explanation: '加法算式：两个加数相加等于和。', type: 'sentence' },
            { word: '和-加数=加数', pinyin: 'hé jiǎn jiā shù děng yú jiā shù', explanation: '用和减去一个加数，就能得到另一个加数。', type: 'sentence' },
            { word: '被减数-减数=差', pinyin: 'bèi jiǎn shù jiǎn jiǎn shù děng yú chā', explanation: '减法算式：被减数减去减数等于差。', type: 'sentence' },
            { word: '被减数-差=减数', pinyin: 'bèi jiǎn shù jiǎn chā děng yú jiǎn shù', explanation: '用被减数减去差，就能得到减数。', type: 'sentence' },
            { word: '减数+差=被减数', pinyin: 'jiǎn shù jiā chā děng yú bèi jiǎn shù', explanation: '减数加上差，就能得到被减数。', type: 'sentence' },
            { word: '乘数×乘数=积', pinyin: 'chéng shù chéng chéng shù děng yú jī', explanation: '乘法算式：两个乘数相乘等于积。', type: 'sentence' },
            { word: '积÷乘数=乘数', pinyin: 'jī chú chéng shù děng yú chéng shù', explanation: '用积除以一个乘数，就能得到另一个乘数。', type: 'sentence' },
            { word: '被除数÷除数=商', pinyin: 'bèi chú shù chú chú shù děng yú shāng', explanation: '除法算式：被除数除以除数等于商。', type: 'sentence' },
            { word: '被除数÷商=除数', pinyin: 'bèi chú shù chú shāng děng yú chú shù', explanation: '用被除数除以商，就能得到除数。', type: 'sentence' },
            { word: '除数×商=被除数', pinyin: 'chú shù chéng shāng děng yú bèi chú shù', explanation: '除数乘以商，就能得到被除数。', type: 'sentence' }
        ],
        comparisonRules: [
            { word: '加数变大和变大', pinyin: 'jiā shù biàn dà hé biàn dà', explanation: '加法运算中，一个加数变大，另一个加数不变，和也会变大。', type: 'sentence' },
            { word: '加数变小和变小', pinyin: 'jiā shù biàn xiǎo hé biàn xiǎo', explanation: '加法运算中，一个加数减小，另一个加数不变，和也会变小。', type: 'sentence' },
            { word: '加数一增一减和不变', pinyin: 'jiā shù yī zēng yī jiǎn hé bù biàn', explanation: '加法运算中，一个加数减几，另一个加数加回同样的数，和不变。', type: 'sentence' },
            { word: '被减数变大差变大', pinyin: 'bèi jiǎn shù biàn dà chā biàn dà', explanation: '减法运算中，被减数变大，减数不变，差也会变大。', type: 'sentence' },
            { word: '减数变大差变小', pinyin: 'jiǎn shù biàn dà chā biàn xiǎo', explanation: '减法运算中，被减数不变，减数变大，差会变小。', type: 'sentence' },
            { word: '被减数减数同增减差不变', pinyin: 'bèi jiǎn shù jiǎn shù tóng zēng jiǎn chā bù biàn', explanation: '减法运算中，被减数和减数同时加几或者减几，差不变。', type: 'sentence' },
            { word: '乘数变大积变大', pinyin: 'chéng shù biàn dà jī biàn dà', explanation: '乘法运算中，一个乘数变大，另一个乘数不变，积也会变大。', type: 'sentence' },
            { word: '乘数变小积变小', pinyin: 'chéng shù biàn xiǎo jī biàn xiǎo', explanation: '乘法运算中，一个乘数减小，另一个乘数不变，积也会变小。', type: 'sentence' }
        ],
        hundredTable: [
            { word: '往上减10', pinyin: 'wǎng shàng jiǎn shí', explanation: '在百数表中，往上一格减10。', type: 'phrase' },
            { word: '往下加10', pinyin: 'wǎng xià jiā shí', explanation: '在百数表中，往下一格加10。', type: 'phrase' },
            { word: '往左减1', pinyin: 'wǎng zuǒ jiǎn yī', explanation: '在百数表中，往左一格减1。', type: 'phrase' },
            { word: '往右加1', pinyin: 'wǎng yòu jiā yī', explanation: '在百数表中，往右一格加1。', type: 'phrase' }
        ]
    },

    // 四、常见应用题型
    section4: {
        additionProblems: [
            {
                word: '一共',
                pinyin: 'yī gòng',
                explanation: '关键词"一共"表示把两个或多个数合起来。\n\n例题1：小明有5块糖，小华有3块糖。他们一共有多少块糖？\n分析：把小明的糖和小华的糖合起来。\n算式：5 + 3 = 8 (块)\n\n例题2：妈妈买了7个苹果和4个梨。水果一共有多少个？\n分析：把苹果和梨的数量加起来。\n算式：7 + 4 = 11 (个)',
                type: 'phrase'
            },
            {
                word: '合起来',
                pinyin: 'hé qǐ lái',
                explanation: '关键词"合起来"表示把不同的部分合并成一个整体。\n\n例题1：小芳有2支红色铅笔和6支蓝色铅笔。把它们合起来，一共有多少支铅笔？\n分析：把红色铅笔和蓝色铅笔合并。\n算式：2 + 6 = 8 (支)\n\n例题2：公园里有5只白鸽子、3只灰鸽子和2只花鸽子。所有鸽子合起来有多少只？\n分析：把三种颜色的鸽子都加起来。\n算式：5 + 3 + 2 = 10 (只)',
                type: 'phrase'
            },
            {
                word: '飞来了',
                pinyin: 'fēi lái le',
                explanation: '关键词"飞（走、游、跑）来了"表示原来有一些，后来又增加了一些。\n\n例题1：树上原来有5只小鸟，过了一会儿，又飞来了3只。现在树上一共有多少只小鸟？\n分析：原来的加上后来的。\n算式：5 + 3 = 8 (只)\n\n例题2：停车场的第一排原来有4辆小汽车，后来又开来了5辆。现在第一排一共有多少辆小汽车？\n分析：原来的车加上新来的车。\n算式：4 + 5 = 9 (辆)',
                type: 'phrase'
            },
            {
                word: '增加',
                pinyin: 'zēng jiā',
                explanation: '关键词"增加、多了"表示在原有基础上又添加了一些。\n\n例题1：小丽做了7道题，老师说她还需要增加3道。她一共需要做多少道题？\n分析：原来的数量加上增加的数量。\n算式：7 + 3 = 10 (道)\n\n例题2：公交车上第一站有8个人，第二站上车的人多了5个。现在车上有多少人？\n分析：第一站的人数加上第二站增加的人数。\n算式：8 + 5 = 13 (人)',
                type: 'phrase'
            }
        ],
        subtractionProblems: [
            {
                word: '还剩',
                pinyin: 'hái shèng',
                explanation: '关键词"还剩、剩下"表示从总数中去掉一部分，求剩余部分。\n\n例题：小明有10个糖果，吃了3个，还剩多少个？\n分析：从总数中去掉吃掉的部分。\n算式：10 - 3 = 7 (个)',
                type: 'phrase'
            },
            {
                word: '比…多',
                pinyin: 'bǐ duō',
                explanation: '关键词"比…多"，要求较小的数时用减法。\n\n例题：小红有15本故事书，比小明多5本，小明有多少本？\n分析：小红的书比小明多，所以小明的少，用小红的减去多的部分。\n算式：15 - 5 = 10 (本)',
                type: 'phrase'
            },
            {
                word: '花了',
                pinyin: 'huā le',
                explanation: '关键词"花了、用掉"表示从总数中去掉一部分。\n\n例题：小丽有20元钱，买了一个书包，花了15元，还剩多少钱？\n分析：从总钱数中减去花掉的钱。\n算式：20 - 15 = 5 (元)',
                type: 'phrase'
            },
            {
                word: '送给',
                pinyin: 'sòng gěi',
                explanation: '关键词"送给、拿走"表示从总数中拿走一部分。\n\n例题：小刚有18支铅笔，送给小明5支，送给小红3支，还剩多少支？\n分析：从总数中减去送出去的。\n算式：18 - 5 - 3 = 10 (支)',
                type: 'phrase'
            },
            {
                word: '飞走了',
                pinyin: 'fēi zǒu le',
                explanation: '关键词"飞走了、游走了、开走了"表示离开了一部分。\n\n例题：小华有30个气球，飞走了12个，又飞走了8个，还剩多少个？\n分析：从总数中连续减去飞走的。\n算式：30 - 12 - 8 = 10 (个)',
                type: 'phrase'
            },
            {
                word: '比…少',
                pinyin: 'bǐ shǎo',
                explanation: '关键词"比…少"，求较少的数时也用减法。\n\n例题：小明有25个苹果，比小红多10个，小红有多少个苹果？\n分析：小明比小红多，说明小红少，用小明的减去多的部分。\n算式：25 - 10 = 15 (个)',
                type: 'phrase'
            }
        ],
        multiplicationProblems: [
            {
                word: '每',
                pinyin: 'měi',
                explanation: '关键词"每"表示每一个或每一份的数量相同，用乘法计算。\n\n例题1：每个盘子有3个苹果，有5个盘子，一共有多少个苹果？\n分析：求5个3是多少，也就是5个相同加数3的和。\n算式：3 × 5 = 15 (个)\n\n例题2：每行有6棵树，有4行，一共有多少棵树？\n分析：求4个6是多少。\n算式：6 × 4 = 24 (棵)',
                type: 'single'
            },
            {
                word: '倍',
                pinyin: 'bèi',
                explanation: '关键词"倍"表示一个数是另一个数的几倍，用乘法计算。\n\n例题：小明有4个苹果，小红的苹果是小明的3倍，小红有多少个苹果？\n分析：求4的3倍是多少，就是3个4。\n算式：4 × 3 = 12 (个)',
                type: 'single'
            },
            {
                word: '每个',
                pinyin: 'měi gè',
                explanation: '关键词"每个、每天、每盒"表示每一个的数量，用乘法。\n\n例题1：每个小朋友有5支铅笔，有6个小朋友，一共有多少支铅笔？\n分析：求6个5是多少。\n算式：5 × 6 = 30 (支)\n\n例题2：小丽每天读3页书，一周（7天）读了多少页？\n分析：求7个3是多少。\n算式：3 × 7 = 21 (页)',
                type: 'phrase'
            }
        ],
        divisionProblems: [
            {
                word: '平均分',
                pinyin: 'píng jūn fēn',
                explanation: '关键词"平均分"表示把一个总数平均分成若干份，求每份是多少，或能分成几份。\n\n例题1：有12个苹果，平均分给4个小朋友，每个小朋友分到多少个？\n分析：把12平均分成4份，求每份是多少。\n算式：12 ÷ 4 = 3 (个)\n\n例题2：有20个气球，平均分给5个小朋友，每个小朋友分到多少个？\n分析：把20平均分成5份。\n算式：20 ÷ 5 = 4 (个)',
                type: 'phrase'
            },
            {
                word: '每几个装一',
                pinyin: 'měi jǐ gè zhuāng yī',
                explanation: '关键词"每…装一篮、每…捆成一捆"表示求一个数里有几个另一个数。\n\n例题1：有18个香蕉，每3个装一篮，需要多少个篮子？\n分析：求18里面有几个3。\n算式：18 ÷ 3 = 6 (个)\n\n例题2：有24本书，每6本捆成一捆，可以捆成多少捆？\n分析：求24里面有几个6。\n算式：24 ÷ 6 = 4 (捆)',
                type: 'phrase'
            }
        ]
    }
};